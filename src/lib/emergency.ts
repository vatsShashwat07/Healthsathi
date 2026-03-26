/**
 * HealthSathi — Emergency Keyword Detection
 * 
 * Hardcoded bypass: if user input matches ANY emergency keyword,
 * skip AI analysis and show immediate 108/112 emergency overlay.
 * 
 * Supports: English, Hindi (Devanagari), Hinglish (Roman Hindi)
 */

// Emergency keywords — categorized by severity
export const EMERGENCY_KEYWORDS: string[] = [
    // === Cardiac / Heart ===
    "heart attack", "cardiac arrest", "chest pain", "chest tightness",
    "seene mein dard", "seene me dard", "sine me dard", "chhati mein dard",
    "dil ka daura", "heart fail",
    "सीने में दर्द", "छाती में दर्द", "दिल का दौरा", "हार्ट अटैक",

    // === Breathing ===
    "can't breathe", "cant breathe", "not breathing", "difficulty breathing",
    "sans nahi aa rahi", "saans nahi", "dum ghut raha", "dam ghut",
    "साँस नहीं आ रही", "सांस नहीं", "दम घुट रहा", "साँस रुक गई",

    // === Stroke / Consciousness ===
    "stroke", "paralysis", "behos", "behosh", "unconscious", "fainted",
    "baichen", "gir gaya", "gir gayi",
    "बेहोश", "लकवा", "स्ट्रोक", "होश नहीं", "गिर गया", "गिर गई",

    // === Severe Bleeding ===
    "heavy bleeding", "bahut khoon", "khoon nikal raha", "khoon beh raha",
    "बहुत खून", "खून निकल रहा", "खून बह रहा", "ज़्यादा खून",

    // === Seizure ===
    "seizure", "convulsion", "daura pad raha", "mirgi", "mirgi ka daura",
    "दौरा पड़ रहा", "मिर्गी", "मिर्गी का दौरा",

    // === Poisoning / Overdose ===
    "poison", "zeher kha liya", "zehar", "dawai zyada kha li", "overdose",
    "ज़हर खा लिया", "दवाई ज़्यादा खा ली", "ओवरडोज़",

    // === Severe Pain / Accident ===
    "accident hua", "accident ho gaya", "haddi toot gayi", "bone broken",
    "एक्सीडेंट", "हड्डी टूट गई", "गंभीर चोट",

    // === Child / Infant ===
    "baccha behosh", "baccha sans nahi le raha", "baby not breathing",
    "बच्चा बेहोश", "बच्चा साँस नहीं ले रहा",

    // === Suicide / Self-harm ===
    "suicide", "kill myself", "marna chahta", "marna chahti", "khudkushi",
    "आत्महत्या", "मरना चाहता", "खुदकुशी",
];

/**
 * Check if the input text contains any emergency keywords.
 * Uses case-insensitive matching and normalized text.
 * 
 * @returns The matched keyword or null
 */
export function detectEmergency(input: string): string | null {
    if (!input || input.trim().length < 3) return null;

    // Normalize: lowercase, remove extra spaces, trim
    const normalized = input
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    for (const keyword of EMERGENCY_KEYWORDS) {
        if (normalized.includes(keyword.toLowerCase())) {
            return keyword;
        }
    }

    return null;
}
