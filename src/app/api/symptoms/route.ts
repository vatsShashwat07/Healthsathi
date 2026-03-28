import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const { symptomText, region, isHindi } = await req.json();

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
  "urgencyLevel": "normal" | "warning" | "critical",
  "causes": [
    {
      "name": "Name of the condition",
      "description": "Short description of why it fits"
    }
  ],
  "homeCareTips": [
    "Tip 1", "Tip 2"
  ],
  "doctorNotes": "Advice on when and why to see a doctor",
  "redFlags": [
    "Critical symptom 1", "Critical symptom 2"
  ]
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

    return NextResponse.json(data);

  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze symptoms';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
