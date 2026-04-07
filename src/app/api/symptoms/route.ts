import { NextResponse } from 'next/server';

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://localhost:8000';

/**
 * Symptom Analysis Route — Proxies through FastAPI backend.
 * Pipeline: Cache → Local KB → Rate Limit → Gemini API
 * Fallback: Direct Gemini call if FastAPI is unreachable.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { symptomText, region, isHindi } = body;

    // --- Try FastAPI backend first ---
    try {
      const backendResponse = await fetch(`${FASTAPI_URL}/api/symptoms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptomText, region, isHindi }),
        signal: AbortSignal.timeout(15000), // 15s timeout
      });

      if (backendResponse.ok) {
        const data = await backendResponse.json();
        console.log(`✅ FastAPI response — source: ${data.source || 'unknown'}`);
        return NextResponse.json(data);
      }

      // Rate limited
      if (backendResponse.status === 429) {
        const errorData = await backendResponse.json();
        return NextResponse.json(errorData, { status: 429 });
      }

      console.warn(`⚠ FastAPI returned ${backendResponse.status}, falling back to Gemini...`);
    } catch (backendError) {
      console.warn('⚠ FastAPI unreachable, falling back to direct Gemini call...', backendError);
    }

    // --- Fallback: Direct Gemini API call ---
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_KEY_HERE') {
      return NextResponse.json(
        { error: 'API key not configured. Please add GEMINI_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    const langInstructions = isHindi
      ? "IMPORTANT: You MUST return all text fields entirely in strictly Devanagari Hindi (e.g., 'वायरल बुखार', 'आराम करें'). Do NOT use English."
      : "IMPORTANT: You MUST return all text fields entirely in English.";

    const prompt = `
You are HealthSathi, an advanced AI health companion specifically designed for the Indian population.
Analyze these user symptoms: 
Text: "${symptomText || 'None provided'}"
Affected Body Region: "${region || 'None provided'}"

Take into account common Indian seasonal diseases (like Dengue, Malaria, Typhoid, Viral Fever, Gastroenteritis) if the symptoms match.

${langInstructions}

You must return ONLY a JSON object with the following schema:
{
  "urgencyLevel": "emergency" | "urgent" | "soon" | "homeCare",
  "possibleCauses": [
    {
      "name": "Name of the condition",
      "description": "Short description of why it fits",
      "likelihood": "high" | "medium" | "low"
    }
  ],
  "homeCareTips": [
    "Tip 1", "Tip 2"
  ],
  "doctorNotes": [
    "Note 1 on when/why to see a doctor", "Note 2"
  ],
  "redFlags": [
    "Critical symptom 1", "Critical symptom 2"
  ],
  "disclaimer": "This is an AI generated response and not medical advice.",
  "confidence": 85
}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini Native REST Error:", errorText);
      throw new Error(`Gemini API returned ${response.status}: ${errorText}`);
    }

    const json = await response.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const data = JSON.parse(rawText);
    data.source = "gemini_direct_fallback";

    return NextResponse.json(data);

  } catch (error: unknown) {
    console.error("Symptom Analysis Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze symptoms';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
