"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import BottomNav from "@/components/shared/BottomNav";
import LanguageToggle from "@/components/shared/LanguageToggle";

import {
    Mic,
    Send,
    ArrowLeft,
    Share2,
    Bookmark,
    AlertTriangle,
    Home as HomeIcon,
    Stethoscope,
    ShieldCheck,
    Activity,
    ChevronDown,
    Sparkles,
    MicOff,
    Phone,
    MapPin,
    X,
    UserCircle,
    MessageSquare,
    Search,
} from "lucide-react";
import Link from "next/link";
import type { BodyRegion, UrgencyLevel } from "@/types";
import { detectEmergency } from "@/lib/emergency";
import {
    trackSymptomCheck,
    trackSymptomResult,
    trackEmergencyTriggered,
} from "@/lib/analytics";

const bodyRegions: {
    key: BodyRegion;
    x: number;
    y: number;
    w: number;
    h: number;
}[] = [
        { key: "head", x: 42, y: 2, w: 16, h: 12 },
        { key: "eyes", x: 44, y: 7, w: 12, h: 4 },
        { key: "ears", x: 38, y: 7, w: 6, h: 5 },
        { key: "throat", x: 44, y: 14, w: 12, h: 5 },
        { key: "chest", x: 38, y: 20, w: 24, h: 14 },
        { key: "upperBack", x: 40, y: 22, w: 20, h: 10 },
        { key: "stomach", x: 40, y: 35, w: 20, h: 14 },
        { key: "lowerBack", x: 40, y: 42, w: 20, h: 8 },
        { key: "arms", x: 24, y: 22, w: 14, h: 22 },
        { key: "hands", x: 20, y: 44, w: 12, h: 10 },
        { key: "legs", x: 36, y: 52, w: 28, h: 30 },
        { key: "feet", x: 36, y: 82, w: 28, h: 12 },
    ];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDemoResult(region: BodyRegion | null, text: string, isHindi: boolean) {
    const t = text.toLowerCase();

    // ===== Stomach / pet dard — includes Indian diseases (Dengue, Typhoid) weighted for monsoon season =====
    if (region === "stomach" || t.includes("pet") || t.includes("stomach") || t.includes("पेट") || t.includes("acidity") || t.includes("gas") || t.includes("bukhar") || t.includes("fever") || t.includes("बुखार") || t.includes("dengue") || t.includes("डेंगू") || t.includes("malaria") || t.includes("मलेरिया") || t.includes("typhoid") || t.includes("टाइफ़ाइड")) {
        // Detect if fever-related to weight Indian diseases higher
        const hasFever = t.includes("fever") || t.includes("bukhar") || t.includes("बुखार") || t.includes("dengue") || t.includes("malaria") || t.includes("typhoid") || t.includes("डेंगू") || t.includes("मलेरिया") || t.includes("टाइफ़ाइड");
        return {
            urgencyLevel: (hasFever ? "urgent" : "soon") as UrgencyLevel,
            possibleCauses: hasFever ? [
                { name: isHindi ? "डेंगू बुखार" : "Dengue Fever", description: isHindi ? "मच्छर से फैलने वाला वायरल बुखार — तेज़ बुखार, शरीर/जोड़ों में तेज़ दर्द, प्लेटलेट्स गिरना (मानसून में ज़्यादा)" : "Mosquito-borne viral fever — high temperature, severe body/joint pain, platelet drop (monsoon peak season)", likelihood: "high" as const },
                { name: isHindi ? "मलेरिया" : "Malaria", description: isHindi ? "प्लास्मोडियम परजीवी — ठंड लगकर बुखार, पसीना, सिरदर्द (बारिश के मौसम में आम)" : "Plasmodium parasite — chills then fever then sweating cycle, headache (common in rainy season)", likelihood: "medium" as const },
                { name: isHindi ? "टाइफ़ाइड" : "Typhoid Fever", description: isHindi ? "दूषित पानी/खाने से — लगातार बुखार, पेट दर्द, कमज़ोरी" : "Contaminated food/water — sustained fever, abdominal pain, weakness", likelihood: "medium" as const },
                { name: isHindi ? "वायरल बुखार" : "Viral Fever", description: isHindi ? "मौसमी वायरल इन्फेक्शन — बुखार, बदन दर्द, थकान" : "Seasonal viral infection — fever, body ache, fatigue", likelihood: "low" as const },
            ] : [
                { name: isHindi ? "गैस्ट्राइटिस" : "Gastritis", description: isHindi ? "पेट की अंदरूनी परत में सूजन — मसालेदार खाने से" : "Inflammation of stomach lining — from spicy food", likelihood: "high" as const },
                { name: isHindi ? "एसिडिटी" : "Acid Reflux (GERD)", description: isHindi ? "पेट का एसिड ऊपर आना, सीने में जलन" : "Stomach acid rises up, causes heartburn", likelihood: "medium" as const },
                { name: isHindi ? "इरिटेबल बाउल सिंड्रोम (IBS)" : "Irritable Bowel Syndrome (IBS)", description: isHindi ? "पेट में ऐंठन, गैस, और मल त्याग में बदलाव" : "Abdominal cramps, gas, and irregular bowel movements", likelihood: "low" as const },
            ],
            homeCareTips: hasFever ? (isHindi
                ? ["ज़्यादा से ज़्यादा पानी, ORS, नारियल पानी पिएँ", "Paracetamol 500mg — दिन में 3 बार (खाने के बाद)", "शरीर को गीले कपड़े से पोंछें — बुखार कम करने के लिए", "मच्छरदानी लगाकर सोएँ", "प्लेटलेट्स कम हों तो पपीते के पत्ते का रस पिएँ", "⚠️ खून का टेस्ट (CBC + Dengue NS1 + Widal) तुरंत कराएँ"]
                : ["Drink plenty of water, ORS, coconut water — stay hydrated", "Paracetamol 500mg — 3 times a day (after meals)", "Sponge body with wet cloth to reduce fever", "Sleep under mosquito net", "Papaya leaf juice may help if platelets are low", "⚠️ Get blood test immediately (CBC + Dengue NS1 + Widal)"]
            ) : (isHindi
                ? ["हल्का और सादा खाना खाएँ — खिचड़ी, दही, केला", "तेल, मसाला, चाय-कॉफ़ी से बचें", "गुनगुना पानी पिएँ — 8-10 गिलास", "जीरे का पानी या अजवाइन चबाएँ", "ज़रूरत हो तो Antacid (Gelusil/Digene) लें"]
                : ["Eat light bland food — khichdi, yogurt, banana", "Avoid oil, spices, tea, and coffee", "Drink warm water — 8-10 glasses daily", "Try cumin water or ajwain (carom seeds)", "Take Antacid (Gelusil/Digene) if needed"]
            ),
            doctorNotes: hasFever ? (isHindi
                ? ["तेज़ बुखार 2 दिन से — 102-104°F", "शरीर और जोड़ों में तेज़ दर्द", "भूख नहीं लग रही, कमज़ोरी", "रैश/लाल दाने दिख रहे हैं"]
                : ["High fever for 2 days — 102-104°F", "Severe body and joint pain", "Loss of appetite, weakness", "Rash/red spots appearing on skin"]
            ) : (isHindi
                ? ["पेट दर्द खाने के बाद बढ़ता है", "दर्द की तीव्रता 5/10", "गैस और bloating की शिकायत", "1 हफ़्ते से समस्या"]
                : ["Stomach pain worsens after eating", "Pain severity 5/10", "Complaint of gas and bloating", "Problem since 1 week"]
            ),
            redFlags: hasFever ? (isHindi
                ? ["प्लेटलेट्स 50,000 से नीचे → तुरंत अस्पताल", "मसूड़ों या नाक से खून", "बुखार 104°F से ऊपर — 2 दिन से", "पेशाब बहुत कम या बंद"]
                : ["Platelets below 50,000 → rush to hospital", "Bleeding from gums or nose", "Fever above 104°F for 2+ days", "Very low or no urine output"]
            ) : (isHindi
                ? ["अगर खून की उल्टी हो या मल में खून", "अगर दर्द बहुत तेज़ और अचानक", "अगर बुखार 101°F से ऊपर", "अगर 2 दिन से मल त्याग न हो"]
                : ["Blood in vomit or stool", "Very severe and sudden pain", "Fever above 101°F", "No bowel movement for 2+ days"]
            ),
        };
    }

    // ===== Chest =====
    if (region === "chest" || t.includes("chest") || t.includes("chhati") || t.includes("सीने") || t.includes("छाती")) {
        return {
            urgencyLevel: "urgent" as UrgencyLevel,
            possibleCauses: [
                { name: isHindi ? "मांसपेशी खिंचाव" : "Muscle Strain", description: isHindi ? "छाती की मांसपेशियों में खिंचाव" : "Strain in chest muscles due to exertion", likelihood: "high" as const },
                { name: isHindi ? "एसिड रिफ़्लक्स (GERD)" : "Acid Reflux (GERD)", description: isHindi ? "पेट का एसिड ऊपर आना — जलन" : "Stomach acid rising up — burning sensation", likelihood: "medium" as const },
                { name: isHindi ? "चिंता / एंग्ज़ाइटी" : "Anxiety / Panic Attack", description: isHindi ? "तनाव से सीने में दबाव और साँस में दिक्कत" : "Stress causing chest tightness and breathlessness", likelihood: "medium" as const },
            ],
            homeCareTips: isHindi
                ? ["शांत बैठें और गहरी साँस लें", "ढीले कपड़े पहनें", "गुनगुना पानी पिएँ", "एसिडिटी हो तो Antacid लें"]
                : ["Sit calmly and take deep breaths", "Wear loose clothing", "Drink lukewarm water", "Take Antacid if acidity is suspected"],
            doctorNotes: isHindi
                ? ["सीने में दर्द", "साँस लेने पर दर्द की स्थिति", "दबाने पर tender"]
                : ["Chest pain reported", "Pain on breathing noted", "Tender on palpation"],
            redFlags: isHindi
                ? ["⚠️ बाएँ हाथ/जबड़े में दर्द → तुरंत 108 कॉल करें", "साँस लेने में बहुत तकलीफ़", "पसीना और चक्कर आए", "दर्द 20 मिनट से ज़्यादा रहे"]
                : ["⚠️ Pain in left arm/jaw → Call 108 immediately", "Severe difficulty breathing", "Sweating and dizziness", "Pain lasting more than 20 minutes"],
        };
    }

    // ===== Throat =====
    if (region === "throat" || t.includes("throat") || t.includes("gala") || t.includes("गला") || t.includes("cough") || t.includes("khansi") || t.includes("खाँसी")) {
        return {
            urgencyLevel: "homecare" as UrgencyLevel,
            possibleCauses: [
                { name: isHindi ? "गले का संक्रमण" : "Pharyngitis", description: isHindi ? "वायरल इन्फेक्शन से गले में खराश" : "Viral infection causing sore throat", likelihood: "high" as const },
                { name: isHindi ? "टॉन्सिलाइटिस" : "Tonsillitis", description: isHindi ? "टॉन्सिल्स में सूजन — निगलने में दर्द" : "Swollen tonsils — pain while swallowing", likelihood: "medium" as const },
                { name: isHindi ? "एलर्जी" : "Allergy", description: isHindi ? "धूल या मौसम बदलने से खराश" : "Irritation from dust or weather change", likelihood: "low" as const },
            ],
            homeCareTips: isHindi
                ? ["गर्म पानी में नमक डालकर गरारे — दिन में 3-4 बार", "शहद-अदरक की चाय पिएँ", "ठंडी चीज़ें बंद करें", "हल्दी वाला दूध (Golden Milk) पिएँ", "Strepsils या Vicks गोली चूसें"]
                : ["Gargle with warm salt water — 3-4 times a day", "Drink honey-ginger tea", "Avoid cold food and drinks", "Drink turmeric milk (Golden Milk)", "Suck on Strepsils or Vicks lozenges"],
            doctorNotes: isHindi
                ? ["गले में खराश 2 दिन से", "निगलने में हल्का दर्द", "बुखार नहीं है"]
                : ["Sore throat for 2 days", "Mild pain while swallowing", "No fever"],
            redFlags: isHindi
                ? ["बुखार 101°F से ऊपर", "5 दिन से ज़्यादा खराश", "साँस लेने में तकलीफ़", "गर्दन में गाँठ"]
                : ["Fever above 101°F", "Sore throat lasting 5+ days", "Difficulty breathing", "Lump in neck"],
        };
    }

    // ===== Eyes =====
    if (region === "eyes" || t.includes("eye") || t.includes("aankh") || t.includes("आँख")) {
        return {
            urgencyLevel: "homecare" as UrgencyLevel,
            possibleCauses: [
                { name: isHindi ? "आई स्ट्रेन / डिजिटल थकान" : "Digital Eye Strain", description: isHindi ? "स्क्रीन ज़्यादा देखने से थकान" : "Fatigue from excessive screen use", likelihood: "high" as const },
                { name: isHindi ? "ड्राई आई" : "Dry Eyes", description: isHindi ? "आँखों में नमी की कमी — जलन" : "Lack of moisture in eyes — burning", likelihood: "medium" as const },
                { name: isHindi ? "कॉन्जंक्टिवाइटिस" : "Conjunctivitis (Pink Eye)", description: isHindi ? "आँख का संक्रमण — लालिमा" : "Eye infection — redness and discharge", likelihood: "low" as const },
            ],
            homeCareTips: isHindi
                ? ["20-20-20 Rule: हर 20 min में 20 sec 20 ft दूर देखें", "स्क्रीन brightness कम करें", "ठंडे पानी से आँखें धोएँ", "Artificial tears — दिन में 3-4 बार"]
                : ["20-20-20 Rule: Every 20 min, look 20 ft away for 20 sec", "Reduce screen brightness", "Wash eyes with cold water", "Use artificial tears — 3-4 times daily"],
            doctorNotes: isHindi
                ? ["आँखों में दर्द/थकान", "डिजिटल स्क्रीन का ज़्यादा use"]
                : ["Eye pain/fatigue reported", "Excessive digital screen usage"],
            redFlags: isHindi
                ? ["अचानक दिखना बंद हो", "लगातार पानी या पस आए", "लालिमा और दर्द बढ़े"]
                : ["Sudden vision loss", "Continuous watering or pus discharge", "Increasing redness and pain"],
        };
    }

    // ===== Legs / joints =====
    if (region === "legs" || region === "feet" || t.includes("leg") || t.includes("ghutna") || t.includes("joint") || t.includes("घुटना") || t.includes("पैर")) {
        return {
            urgencyLevel: "soon" as UrgencyLevel,
            possibleCauses: [
                { name: isHindi ? "मांसपेशी ऐंठन" : "Muscle Cramps", description: isHindi ? "dehydration या थकान से ऐंठन" : "Cramping from dehydration or fatigue", likelihood: "high" as const },
                { name: isHindi ? "जोड़ों का दर्द" : "Joint Pain (Arthralgia)", description: isHindi ? "घुटने/टखने में दर्द — उम्र या चोट से" : "Knee/ankle pain — from age or injury", likelihood: "medium" as const },
                { name: isHindi ? "साइटिका" : "Sciatica", description: isHindi ? "कमर से पैर तक नस में दर्द" : "Nerve pain radiating from lower back to leg", likelihood: "low" as const },
            ],
            homeCareTips: isHindi
                ? ["गर्म सिकाई — 15-20 मिनट", "हल्की stretching करें", "ज़्यादा पानी पिएँ", "Combiflam/Ibuprofen दर्द ज़्यादा हो तो"]
                : ["Hot compress — 15-20 minutes", "Light stretching exercises", "Drink more water", "Combiflam/Ibuprofen if pain is severe"],
            doctorNotes: isHindi
                ? ["पैर/घुटने में दर्द", "चलने पर बढ़ता है"]
                : ["Leg/knee pain reported", "Worsens with walking"],
            redFlags: isHindi
                ? ["पैर में सूजन और लालिमा", "पैर हिलाने में असमर्थ", "तेज़ और अचानक दर्द"]
                : ["Swelling and redness in leg", "Unable to move the leg", "Severe and sudden pain"],
        };
    }

    // ===== Back =====
    if (region === "upperBack" || region === "lowerBack" || t.includes("back") || t.includes("kamar") || t.includes("कमर") || t.includes("पीठ")) {
        return {
            urgencyLevel: "soon" as UrgencyLevel,
            possibleCauses: [
                { name: isHindi ? "मांसपेशी खिंचाव" : "Muscle Strain", description: isHindi ? "गलत posture से कमर दर्द" : "Back pain from poor posture", likelihood: "high" as const },
                { name: isHindi ? "स्लिप डिस्क" : "Herniated Disc", description: isHindi ? "रीढ़ की डिस्क पर दबाव" : "Pressure on spinal disc", likelihood: "medium" as const },
                { name: isHindi ? "किडनी समस्या" : "Kidney Issue", description: isHindi ? "कमर के पीछे गहरा दर्द" : "Deep pain behind the lower back", likelihood: "low" as const },
            ],
            homeCareTips: isHindi
                ? ["सीधा बैठें, एक position में ज़्यादा देर न रहें", "गर्म सिकाई 20 min, दिन में 2-3 बार", "हल्के back stretches करें", "सख़्त गद्दे पर सोएँ", "Diclofenac gel लगाएँ"]
                : ["Sit upright, don't stay in one position too long", "Hot compress 20 min, 2-3 times daily", "Do light back stretches", "Sleep on a firm mattress", "Apply Diclofenac gel"],
            doctorNotes: isHindi
                ? ["कमर दर्द", "बैठने से बढ़ता है"]
                : ["Lower back pain reported", "Worsens with prolonged sitting"],
            redFlags: isHindi
                ? ["पैर सुन्न हो जाएँ", "पेशाब में दिक्कत", "1 हफ़्ते से ज़्यादा दर्द रहे"]
                : ["Numbness in legs", "Difficulty urinating", "Pain lasting more than 1 week"],
        };
    }

    // ===== Default — headache =====
    return {
        urgencyLevel: "soon" as UrgencyLevel,
        possibleCauses: [
            { name: isHindi ? "माइग्रेन" : "Migraine", description: isHindi ? "एक तरफ़ सिर में तेज़ दर्द — 4-72 घंटे" : "Intense one-sided headache — lasts 4-72 hours", likelihood: "high" as const },
            { name: isHindi ? "तनाव सिरदर्द" : "Tension Headache", description: isHindi ? "सिर के दोनों तरफ़ दबाव — तनाव/थकान से" : "Pressure on both sides — from stress/fatigue", likelihood: "medium" as const },
            { name: isHindi ? "साइनस" : "Sinusitis", description: isHindi ? "नाक बंद + माथे के पास दर्द" : "Nasal congestion + pain near forehead", likelihood: "low" as const },
        ],
        homeCareTips: isHindi
            ? ["अंधेरे शांत कमरे में आराम करें", "माथे पर ठंडा कपड़ा रखें", "ज़्यादा पानी पिएँ — 8 गिलास", "दर्द ज़्यादा हो तो Paracetamol 500mg लें"]
            : ["Rest in a dark, quiet room", "Place a cold cloth on your forehead", "Drink plenty of water — 8 glasses", "Take Paracetamol 500mg if pain is severe"],
        doctorNotes: isHindi
            ? ["सिर दर्द सुबह से, दायीं तरफ़ ज़्यादा", "तीव्रता 7/10", "रोशनी से बढ़ता है", "2 हफ़्ते में 3 बार हुआ"]
            : ["Headache since morning, worse on right side", "Severity 7/10", "Aggravated by light", "Occurred 3 times in 2 weeks"],
        redFlags: isHindi
            ? ["बुखार 102°F से ऊपर", "गर्दन अकड़ जाए", "देखने में धुंधलापन", "उल्टी रुके नहीं"]
            : ["Fever above 102°F", "Stiff neck", "Blurred vision", "Persistent vomiting"],
    };
}


/* ===== Emergency Overlay Component ===== */
function EmergencyOverlay({
    keyword,
    isHindi,
    onDismiss,
}: {
    keyword: string;
    isHindi: boolean;
    onDismiss: () => void;
}) {
    return (
        <div className="emergency-overlay">
            <div className="max-w-lg mx-auto px-6 text-center text-white space-y-6">
                {/* Header */}
                <div className="relative">
                    <button
                        onClick={onDismiss}
                        className="absolute -top-2 right-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                    >
                        <X size={18} />
                    </button>
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 animate-pulse-gentle">
                        <AlertTriangle size={36} />
                    </div>
                    <h1 className="text-2xl font-extrabold">
                        {isHindi ? "🚨 इमरजेंसी — तुरंत कॉल करें!" : "🚨 Emergency — Call Now!"}
                    </h1>
                    <p className="text-white/70 text-sm mt-2">
                        {isHindi
                            ? `"${keyword}" का पता चला — यह गंभीर हो सकता है`
                            : `"${keyword}" detected — this could be serious`}
                    </p>
                </div>

                {/* Call 108 — Primary */}
                <a
                    href="tel:108"
                    className="btn-emergency-bypass flex items-center justify-center gap-3 !rounded-2xl"
                >
                    <Phone size={22} />
                    <div className="text-left">
                        <p className="text-lg font-extrabold">108 — Ambulance</p>
                        <p className="text-xs text-white/70 font-medium">
                            {isHindi ? "मुफ़्त • 24/7 • सबसे तेज़" : "Free • 24/7 • Fastest"}
                        </p>
                    </div>
                </a>

                {/* Call 112 */}
                <a
                    href="tel:112"
                    className="btn w-full text-white text-base gap-3 !rounded-2xl !min-h-[52px]"
                    style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
                >
                    <Phone size={18} />
                    <div className="text-left">
                        <p className="font-bold">112 — Emergency Helpline</p>
                        <p className="text-xs text-white/60">
                            {isHindi ? "पुलिस + फ़ायर + एम्बुलेंस" : "Police + Fire + Ambulance"}
                        </p>
                    </div>
                </a>

                {/* Bottom actions */}
                <div className="flex gap-3 pt-2">
                    <button
                        className="btn flex-1 text-white text-sm gap-2 !rounded-xl !min-h-[44px]"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                        <MapPin size={16} />
                        {isHindi ? "नज़दीकी अस्पताल" : "Nearby Hospital"}
                    </button>
                    <button
                        onClick={onDismiss}
                        className="btn flex-1 text-white text-sm gap-2 !rounded-xl !min-h-[44px]"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                        <X size={16} />
                        {isHindi ? "बंद करें" : "Dismiss"}
                    </button>
                </div>

                <p className="text-white/40 text-xs mt-4">
                    {isHindi
                        ? "⚠ यह डॉक्टर की सलाह का विकल्प नहीं है। गंभीर लक्षणों में तुरंत 108 कॉल करें।"
                        : "⚠ This is not a substitute for medical advice. Call 108 immediately for serious symptoms."}
                </p>
            </div>
        </div>
    );
}

export default function SymptomsPage() {
    const { t, isHindi } = useLanguage();
    const [selectedRegion, setSelectedRegion] = useState<BodyRegion | null>(null);
    const [symptomText, setSymptomText] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [currentResult, setCurrentResult] = useState<ReturnType<typeof getDemoResult> | null>(null);
    // Emergency detection state
    const [emergencyKeyword, setEmergencyKeyword] = useState<string | null>(null);
    const [showEmergency, setShowEmergency] = useState(false);
    const [showPaywall, setShowPaywall] = useState(false);

    // Usage counter — tracks symptom checks per day in localStorage
    const getUsageCount = useCallback((): number => {
        if (typeof window === "undefined") return 0;
        const stored = localStorage.getItem("hs_symptom_usage");
        if (!stored) return 0;
        const { count, date } = JSON.parse(stored);
        if (date !== new Date().toDateString()) return 0; // Reset daily
        return count;
    }, []);

    const incrementUsage = useCallback((): number => {
        const today = new Date().toDateString();
        const current = getUsageCount();
        const next = current + 1;
        localStorage.setItem("hs_symptom_usage", JSON.stringify({ count: next, date: today }));
        return next;
    }, [getUsageCount]);

    // Check for emergency keywords on text change
    const handleTextChange = useCallback((text: string) => {
        setSymptomText(text);
        const detected = detectEmergency(text);
        if (detected && !showEmergency) {
            setEmergencyKeyword(detected);
            setShowEmergency(true);
            trackEmergencyTriggered(detected, isHindi ? "hi" : "en");
        }
    }, [showEmergency, isHindi]);

    const handleCheck = async () => {
        if (!symptomText.trim() && !selectedRegion) return;

        // Double-check for emergency before submitting
        const detected = detectEmergency(symptomText);
        if (detected) {
            setEmergencyKeyword(detected);
            setShowEmergency(true);
            trackEmergencyTriggered(detected, isHindi ? "hi" : "en");
            return; // Bypass AI
        }

        trackSymptomCheck(selectedRegion || "text", isHindi ? "hi" : "en");

        // Check usage limit (3 checks/day on free plan)
        const usage = getUsageCount();
        if (usage >= 3) {
            setShowPaywall(true);
            return;
        }
        incrementUsage();

        setIsChecking(true);

        try {
            const response = await fetch('/api/symptoms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    symptomText,
                    region: selectedRegion,
                    isHindi
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch AI analysis');
            }

            const result = await response.json();
            setCurrentResult(result);
            setShowResult(true);
            trackSymptomResult(selectedRegion || "text", result.urgencyLevel || "warning");
        } catch (error) {
            console.error("AI Symptom Check Error:", error);
            alert(isHindi ? "AI सर्वर से कनेक्ट नहीं हो सका। कृपया बाद में प्रयास करें या अपनी API Key चेक करें।" : "Failed to connect to AI server. Please check your API key or try again later.");
        } finally {
            setIsChecking(false);
        }
    };

    const handleVoiceInput = () => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognitionConstructor();
            recognition.lang = isHindi ? "hi-IN" : "en-IN";
            recognition.interimResults = false;
            setIsListening(true);
            recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
                const transcript = event.results[0][0].transcript;
                handleTextChange(transcript);
                setIsListening(false);
            };
            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
            recognition.start();
        }
    };

    // ===== EMERGENCY OVERLAY =====
    if (showEmergency && emergencyKeyword) {
        return (
            <EmergencyOverlay
                keyword={emergencyKeyword}
                isHindi={isHindi}
                onDismiss={() => setShowEmergency(false)}
            />
        );
    }

    // ===== PAYWALL MODAL =====
    if (showPaywall) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center px-5" style={{ background: "linear-gradient(180deg, #FFF9F2 0%, #FFFFFF 50%)" }}>
                <div className="card max-w-sm w-full text-center py-10 px-6" style={{ border: "2px solid #FF9933" }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #FF9933, #E67A00)", boxShadow: "0 6px 20px rgba(255,153,51,0.3)" }}>
                        <Sparkles size={28} className="text-white" />
                    </div>
                    <h2 className="text-xl font-extrabold text-text-primary mb-2">
                        {isHindi ? "आज की लिमिट पूरी हो गई!" : "Daily limit reached!"}
                    </h2>
                    <p className="text-sm text-text-muted mb-1">
                        {isHindi ? "मुफ़्त प्लान: 3 लक्षण जाँच/दिन" : "Free plan: 3 symptom checks/day"}
                    </p>
                    <p className="text-sm text-text-muted mb-6">
                        {isHindi ? "अनलिमिटेड जाँच के लिए अपग्रेड करें" : "Upgrade for unlimited checks"}
                    </p>
                    <Link href="/subscription" className="btn-primary w-full text-sm gap-2 mb-3">
                        <Sparkles size={16} />
                        {isHindi ? "साथी प्लस — ₹99/महीना" : "Saathi Plus — ₹99/month"}
                    </Link>
                    <button onClick={() => setShowPaywall(false)} className="text-xs text-text-muted hover:text-text-primary transition-colors">
                        {isHindi ? "बाद में" : "Maybe later"}
                    </button>
                </div>
            </div>
        );
    }

    // ===== RESULT VIEW =====
    if (showResult) {
        return (
            <div className="w-full min-h-screen pb-nav" style={{ background: "linear-gradient(180deg, #FFF9F2 0%, #FFFFFF 50%)" }}>
                <header className="px-5 pt-12 pb-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowResult(false)}
                            className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center"
                            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                        >
                            <ArrowLeft size={18} className="text-text-primary" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-text-primary">{t("symptoms.result")}</h1>
                            <p className="text-xs text-text-muted">
                                {isHindi ? "AI द्वारा विश्लेषण" : "AI-powered analysis"}
                            </p>
                        </div>
                        <div className="ml-auto">
                            <Sparkles size={18} className="text-primary-500 animate-pulse-gentle" />
                        </div>
                    </div>
                </header>

                <div className="px-4 py-2 space-y-4 stagger-children">
                    {/* Urgency Badge */}
                    <div className="urgency-soon rounded-2xl p-5 text-center animate-scale-in">
                        <p className="text-xl font-extrabold">
                            {t(`symptoms.urgencyLevels.${currentResult!.urgencyLevel}`)}
                        </p>
                        <p className="text-xs mt-1 opacity-70">
                            {isHindi ? "AI विश्वास: 87%" : "AI confidence: 87%"}
                        </p>
                    </div>

                    {/* Possible Causes */}
                    <section className="card animate-slide-up">
                        <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #ccfbf1, #cffafe)" }}>
                                <Stethoscope size={14} className="text-teal-700" />
                            </div>
                            {t("symptoms.possibleCauses")}
                        </h3>
                        <div className="space-y-3">
                            {currentResult!.possibleCauses.map((cause, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                                    style={{
                                        background: cause.likelihood === "high" ? "#fef2f2" :
                                            cause.likelihood === "medium" ? "#fffbeb" : "#edfaf4",
                                    }}>
                                    <span className={`badge mt-0.5 ${cause.likelihood === "high" ? "badge-red" :
                                        cause.likelihood === "medium" ? "badge-yellow" : "badge-green"
                                        }`}>
                                        {cause.likelihood === "high" ? (isHindi ? "संभव" : "Likely") :
                                            cause.likelihood === "medium" ? (isHindi ? "हो सकता" : "Possible") :
                                                (isHindi ? "कम संभव" : "Less likely")}
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold">{cause.name}</p>
                                        <p className="text-xs text-text-muted mt-0.5">{cause.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Home Care */}
                    <section className="card animate-slide-up">
                        <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #d3f3e4, #aae8cd)" }}>
                                <HomeIcon size={14} className="text-primary-700" />
                            </div>
                            {t("symptoms.homeCare")}
                        </h3>
                        <ul className="space-y-2.5">
                            {currentResult!.homeCareTips.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    <span className="text-text-primary">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Doctor Notes */}
                    <section className="rounded-2xl p-4 animate-slide-up"
                        style={{ background: "linear-gradient(135deg, #edfaf4, #d3f3e4)", border: "1px solid #72d7ae" }}>
                        <h3 className="text-sm font-bold text-primary-900 mb-3 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #72d7ae, #39c08b)" }}>
                                <ShieldCheck size={14} className="text-primary-900" />
                            </div>
                            {t("symptoms.doctorNotes")}
                        </h3>
                        <ul className="space-y-2">
                            {currentResult!.doctorNotes.map((note, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-primary-900">
                                    <span className="text-primary-500 mt-1">▸</span>
                                    {note}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Red Flags */}
                    <section className="rounded-2xl p-4 animate-slide-up"
                        style={{ background: "linear-gradient(135deg, #fef2f2, #fee2e2)", border: "1px solid #fca5a5" }}>
                        <h3 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-600" />
                            {t("symptoms.redFlags")}
                        </h3>
                        <ul className="space-y-2">
                            {currentResult!.redFlags.map((flag, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-red-800">
                                    <span className="text-red-400 mt-0.5">⚠</span>
                                    {flag}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="disclaimer-banner text-xs">{t("symptoms.disclaimer")}</div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button className="btn-secondary flex-1 text-sm gap-2">
                            <Bookmark size={16} />
                            {t("symptoms.save")}
                        </button>
                        <button className="btn-primary flex-1 text-sm gap-2">
                            <Share2 size={16} />
                            {t("symptoms.shareWhatsApp")}
                        </button>
                    </div>
                </div>
                <BottomNav />
            </div>
        );
    }

    // ===== INPUT VIEW =====
    return (
        <div className="w-full min-h-screen pb-nav">
            {/* Header */}
            <header className="relative px-5 pt-12 pb-6 text-white overflow-hidden">
                <div className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, #993F00, #CC6600, #FF9933)" }} />
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, white, transparent)" }} />

                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold flex items-center gap-2">
                            <Search size={20} />
                            {t("symptoms.title")}
                        </h1>
                        <p className="text-white/60 text-xs mt-1">{t("symptoms.subtitle")}</p>
                    </div>
                    <LanguageToggle />
                </div>
            </header>

            <div className="px-4 -mt-3 relative z-10 space-y-4">
                {/* Family selector */}
                <button className="w-full card flex items-center justify-between py-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #d3f3e4, #aae8cd)" }}>
                            <UserCircle size={18} className="text-primary-700" />
                        </div>
                        <span className="text-sm font-semibold">{isHindi ? "मेरे लिए" : "For myself"}</span>
                    </div>
                    <ChevronDown size={16} className="text-text-muted" />
                </button>

                {/* Body Diagram */}
                <section className="card">
                    <p className="text-xs text-text-muted mb-3 text-center font-medium flex items-center justify-center gap-1.5">
                        <MapPin size={12} />
                        {t("symptoms.tapBody")}
                    </p>
                    <div className="relative mx-auto" style={{ width: "220px", height: "400px" }}>
                        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            {/* Body with gradient fill */}
                            <defs>
                                <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#aae8cd" />
                                    <stop offset="100%" stopColor="#e8eae3" />
                                </linearGradient>
                                <filter id="bodyShadow">
                                    <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.1" />
                                </filter>
                            </defs>
                            <g filter="url(#bodyShadow)">
                                <circle cx="50" cy="10" r="8" fill="url(#bodyGrad)" stroke="#72d7ae" strokeWidth="0.8" />
                                <rect x="47" y="18" width="6" height="4" rx="1.5" fill="url(#bodyGrad)" stroke="#72d7ae" strokeWidth="0.5" />
                                <path d="M38 22 L62 22 L60 50 L40 50 Z" fill="url(#bodyGrad)" stroke="#72d7ae" strokeWidth="0.8" />
                                <path d="M38 22 L28 28 L24 44 L28 44 L32 32 L38 28" fill="url(#bodyGrad)" stroke="#72d7ae" strokeWidth="0.8" />
                                <path d="M62 22 L72 28 L76 44 L72 44 L68 32 L62 28" fill="url(#bodyGrad)" stroke="#72d7ae" strokeWidth="0.8" />
                                <path d="M40 50 L38 76 L34 90 L40 90 L44 76 L46 50" fill="url(#bodyGrad)" stroke="#72d7ae" strokeWidth="0.8" />
                                <path d="M54 50 L56 76 L60 90 L66 90 L62 76 L60 50" fill="url(#bodyGrad)" stroke="#72d7ae" strokeWidth="0.8" />
                            </g>
                            {bodyRegions.map((region) => (
                                <rect
                                    key={region.key}
                                    x={region.x} y={region.y} width={region.w} height={region.h} rx="2"
                                    className={`cursor-pointer transition-all duration-300 ${selectedRegion === region.key
                                        ? "fill-primary-500/30 stroke-primary-600"
                                        : "fill-transparent stroke-transparent hover:fill-primary-500/10"
                                        }`}
                                    strokeWidth="1.2"
                                    onClick={() => setSelectedRegion(region.key)}
                                />
                            ))}
                        </svg>
                        {selectedRegion && (
                            <div className="absolute top-2 right-0 animate-bounce-gentle">
                                <span className="badge-green text-xs gap-1 py-1">
                                    📍 {t(`symptoms.bodyParts.${selectedRegion}`)}
                                </span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Text + Voice input */}
                <section className="card">
                    <p className="text-xs text-text-muted mb-2 font-medium flex items-center gap-1.5">
                        <MessageSquare size={12} />
                        {isHindi ? "हिंदी / English / Hinglish में लिखें या बोलें" : "Type or speak in Hindi / English / Hinglish"}
                    </p>
                    <div className="relative">
                        <textarea
                            value={symptomText}
                            onChange={(e) => handleTextChange(e.target.value)}
                            placeholder={isHindi ? "जैसे: sir mein dard, bukhar, seene mein dard..." : "e.g., headache, fever, chest pain..."}
                            className="input !min-h-[90px] resize-none pr-20 text-sm !rounded-2xl"
                            rows={3}
                        />
                        <div className="absolute bottom-3 right-3">
                            <button
                                onClick={handleVoiceInput}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isListening
                                    ? "bg-red-500 text-white animate-pulse-gentle"
                                    : "text-primary-700 hover:scale-110"
                                    }`}
                                style={!isListening ? { background: "linear-gradient(135deg, #d3f3e4, #aae8cd)" } : {}}
                                aria-label={t("symptoms.voiceInput")}
                            >
                                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                            </button>
                        </div>
                    </div>
                    {isListening && (
                        <p className="text-xs text-red-500 font-medium mt-2 animate-pulse-gentle text-center">
                            🎙 {isHindi ? "बोलिए... सुन रहे हैं" : "Listening..."}
                        </p>
                    )}
                </section>

                {/* Submit */}
                <button
                    onClick={handleCheck}
                    disabled={isChecking || (!symptomText.trim() && !selectedRegion)}
                    className="btn-primary w-full text-base gap-2.5 !py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isChecking ? (
                        <>
                            <Activity size={20} className="animate-pulse" />
                            {t("symptoms.checking")}
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            {t("symptoms.submit")}
                        </>
                    )}
                </button>

                <div className="disclaimer-banner text-xs flex items-start gap-2">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    {t("symptoms.disclaimer")}
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
