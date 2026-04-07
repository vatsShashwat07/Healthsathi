"""
HealthSathi — FastAPI Backend Pipeline
Smart symptom analysis with caching, rate limiting, and local KB.
"""

import os
import json
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional

from cache import symptom_cache
from rate_limiter import rate_limiter
from symptom_kb import match_symptoms

load_dotenv()

app = FastAPI(
    title="HealthSathi Backend",
    description="Smart symptom analysis pipeline with caching & local KB",
    version="1.0.0",
)

# CORS — allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = "gemini-2.5-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"


# ============================================================
# Request / Response Models
# ============================================================
class SymptomRequest(BaseModel):
    symptomText: str = ""
    region: Optional[str] = None
    isHindi: bool = False


# ============================================================
# Health Check
# ============================================================
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "HealthSathi Backend",
        "cache_stats": symptom_cache.get_stats(),
    }


# ============================================================
# Main Symptoms Endpoint
# ============================================================
@app.post("/api/symptoms")
async def analyze_symptoms(req: SymptomRequest, request: Request):
    """
    Smart symptom analysis pipeline:
    1. Check cache → instant response
    2. Check local KB → free response
    3. Rate limit check → prevent abuse
    4. Fallback to Gemini API → cache & return
    """
    symptom_text = req.symptomText.strip()
    region = req.region or ""
    is_hindi = req.isHindi

    if not symptom_text and not region:
        return JSONResponse(
            status_code=400,
            content={"error": "Please provide symptoms or select a body region"},
        )

    # --- Step 1: Cache Check ---
    cache_key = symptom_cache.make_key(symptom_text, region, is_hindi)
    cached = symptom_cache.get(cache_key)
    if cached:
        print(f"✅ CACHE HIT — key={cache_key[:8]}... | Saved 1 API call!")
        return JSONResponse(content={**cached, "source": "cache"})

    # --- Step 2: Local Knowledge Base ---
    local_result = match_symptoms(symptom_text, region, is_hindi)
    if local_result:
        print(f"📚 LOCAL KB MATCH — {local_result['possibleCauses'][0]['name']}")
        # Cache the local result too
        symptom_cache.set(cache_key, local_result)
        return JSONResponse(content=local_result)

    # --- Step 3: Rate Limit Check ---
    client_ip = request.client.host if request.client else "unknown"
    allowed, info = rate_limiter.check(client_ip)
    if not allowed:
        print(f"🚫 RATE LIMITED — IP={client_ip} | reason={info['reason']}")
        return JSONResponse(
            status_code=429,
            content={
                "error": "Rate limit exceeded. Please try again later.",
                "error_hi": "अनुरोध सीमा पार हो गई। कृपया बाद में प्रयास करें।",
                "retry_after": info.get("retry_after", 60),
            },
            headers={"Retry-After": str(info.get("retry_after", 60))},
        )

    # --- Step 4: Gemini API Fallback ---
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your_key_here":
        return JSONResponse(
            status_code=500,
            content={"error": "Gemini API key not configured in backend/.env"},
        )

    lang_instructions = (
        "IMPORTANT: You MUST return all text fields entirely in strictly Devanagari Hindi. Do NOT use English."
        if is_hindi
        else "IMPORTANT: You MUST return all text fields entirely in English."
    )

    prompt = f"""You are HealthSathi, an advanced AI health companion specifically designed for the Indian population.
Analyze these user symptoms: 
Text: "{symptom_text or 'None provided'}"
Affected Body Region: "{region or 'None provided'}"

Take into account common Indian seasonal diseases (like Dengue, Malaria, Typhoid, Viral Fever, Gastroenteritis) if the symptoms match.

{lang_instructions}

You must return ONLY a JSON object with the following schema:
{{
  "urgencyLevel": "emergency" | "urgent" | "soon" | "homeCare",
  "possibleCauses": [
    {{
      "name": "Name of the condition",
      "description": "Short description of why it fits",
      "likelihood": "high" | "medium" | "low"
    }}
  ],
  "homeCareTips": ["Tip 1", "Tip 2"],
  "doctorNotes": ["Note 1", "Note 2"],
  "redFlags": ["Critical symptom 1", "Critical symptom 2"],
  "disclaimer": "This is an AI generated response and not medical advice.",
  "confidence": 85
}}"""

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{GEMINI_URL}?key={GEMINI_API_KEY}",
                json={
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {
                        "temperature": 0.2,
                        "responseMimeType": "application/json",
                    },
                },
            )

        if response.status_code != 200:
            print(f"❌ GEMINI ERROR — {response.status_code}: {response.text[:200]}")
            return JSONResponse(
                status_code=502,
                content={"error": f"Gemini API returned {response.status_code}"},
            )

        gemini_data = response.json()
        raw_text = (
            gemini_data.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "{}")
        )
        result = json.loads(raw_text)
        result["source"] = "gemini_api"

        # Cache the Gemini result
        symptom_cache.set(cache_key, result)
        print(f"🤖 GEMINI API CALL — cached as key={cache_key[:8]}...")

        return JSONResponse(content=result)

    except json.JSONDecodeError as e:
        print(f"❌ JSON PARSE ERROR — {e}")
        return JSONResponse(
            status_code=500,
            content={"error": "Failed to parse Gemini response"},
        )
    except httpx.TimeoutException:
        print("❌ GEMINI TIMEOUT")
        return JSONResponse(
            status_code=504,
            content={"error": "Gemini API request timed out"},
        )
    except Exception as e:
        print(f"❌ UNEXPECTED ERROR — {e}")
        return JSONResponse(
            status_code=500,
            content={"error": str(e)},
        )


# ============================================================
# Cache Stats Endpoint (for monitoring)
# ============================================================
@app.get("/api/stats")
async def get_stats():
    return {
        "cache": symptom_cache.get_stats(),
        "service": "HealthSathi Backend v1.0",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
