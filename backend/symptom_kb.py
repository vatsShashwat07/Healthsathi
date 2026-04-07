"""
HealthSathi — Local Symptom Knowledge Base
30+ common Indian diseases with keyword matching.
Returns same JSON schema as Gemini API response.
"""

from typing import Optional

# ============================================================
# DISEASE DATABASE — India-focused common conditions
# ============================================================
DISEASES = [
    {
        "keywords_en": ["fever", "high temperature", "bukhar", "badan garam", "tapman"],
        "keywords_hi": ["बुखार", "तेज़ बुखार", "शरीर गरम", "तापमान"],
        "name_en": "Viral Fever",
        "name_hi": "वायरल बुखार",
        "desc_en": "Common viral infection causing high temperature, body aches, and fatigue",
        "desc_hi": "वायरल संक्रमण जिससे तेज़ बुखार, बदन दर्द और थकान होती है",
        "urgency": "soon",
        "likelihood": "high",
        "homeCare_en": [
            "Rest and drink plenty of fluids (ORS, coconut water, nimbu paani)",
            "Take Paracetamol (Crocin/Dolo 650) for fever — max 4 times/day",
            "Use cold water sponging on forehead if temp > 102°F",
            "Eat light food — khichdi, dal chawal, moong dal soup"
        ],
        "homeCare_hi": [
            "आराम करें और खूब पानी पिएं (ORS, नारियल पानी, नींबू पानी)",
            "बुखार के लिए पैरासिटामोल (क्रोसिन/डोलो 650) लें — दिन में अधिकतम 4 बार",
            "तापमान 102°F से अधिक होने पर ठंडे पानी से माथे पर स्पंजिंग करें",
            "हल्का खाना खाएं — खिचड़ी, दाल चावल, मूंग दाल सूप"
        ],
        "doctorNotes_en": [
            "See a doctor if fever persists beyond 3 days",
            "Get CBC and Dengue NS1 test if fever is very high with body pain"
        ],
        "doctorNotes_hi": [
            "अगर बुखार 3 दिन से ज़्यादा रहे तो डॉक्टर को दिखाएं",
            "बहुत तेज़ बुखार और बदन दर्द हो तो CBC और डेंगू NS1 टेस्ट करवाएं"
        ],
        "redFlags_en": ["Fever above 104°F", "Severe headache with stiff neck", "Rash or red spots on skin", "Bleeding from nose or gums"],
        "redFlags_hi": ["बुखार 104°F से ऊपर", "गर्दन अकड़ के साथ तेज़ सिरदर्द", "शरीर पर रैश या लाल दाने", "नाक या मसूड़ों से खून"]
    },
    {
        "keywords_en": ["headache", "head pain", "sir dard", "sir me dard", "sar dard", "migraine"],
        "keywords_hi": ["सिरदर्द", "सर दर्द", "सिर में दर्द", "माइग्रेन"],
        "name_en": "Tension Headache / Migraine",
        "name_hi": "तनाव सिरदर्द / माइग्रेन",
        "desc_en": "Headache caused by stress, dehydration, eye strain, or migraine",
        "desc_hi": "तनाव, पानी की कमी, आँखों पर ज़ोर या माइग्रेन से होने वाला सिरदर्द",
        "urgency": "homeCare",
        "likelihood": "high",
        "homeCare_en": [
            "Drink 2-3 glasses of water — dehydration is the #1 cause",
            "Rest in a dark, quiet room for 30 minutes",
            "Take Paracetamol or Ibuprofen if needed",
            "Apply balm (Zandu/Tiger Balm) on forehead and temples"
        ],
        "homeCare_hi": [
            "2-3 गिलास पानी पिएं — पानी की कमी सबसे बड़ा कारण है",
            "अंधेरे, शांत कमरे में 30 मिनट आराम करें",
            "ज़रूरत हो तो पैरासिटामोल या इबुप्रोफेन लें",
            "माथे और कनपटियों पर बाम (ज़ंडू/टाइगर बाम) लगाएं"
        ],
        "doctorNotes_en": ["Visit doctor if headaches occur daily for a week", "Get eye checkup if headache worsens while reading/screen use"],
        "doctorNotes_hi": ["अगर एक हफ़्ते तक रोज़ सिरदर्द हो तो डॉक्टर को दिखाएं", "पढ़ने/स्क्रीन पर काम करते समय सिरदर्द बढ़े तो आँखें चेक करवाएं"],
        "redFlags_en": ["Sudden severe headache (worst of your life)", "Headache with vision changes or confusion", "Headache after head injury"],
        "redFlags_hi": ["अचानक बहुत तेज़ सिरदर्द (जीवन का सबसे बुरा)", "आँखों में धुंधलापन या भ्रम के साथ सिरदर्द", "सिर पर चोट लगने के बाद सिरदर्द"]
    },
    {
        "keywords_en": ["stomach pain", "pet dard", "pet me dard", "abdominal pain", "tummy ache", "stomach ache"],
        "keywords_hi": ["पेट दर्द", "पेट में दर्द", "पेट में ऐंठन"],
        "name_en": "Gastritis / Indigestion",
        "name_hi": "गैस्ट्राइटिस / अपच",
        "desc_en": "Stomach inflammation or indigestion from spicy food, acidity, or infection",
        "desc_hi": "मसालेदार खाने, एसिडिटी या संक्रमण से पेट में सूजन या अपच",
        "urgency": "homeCare",
        "likelihood": "high",
        "homeCare_en": [
            "Drink warm water with ajwain (carom seeds) or jeera (cumin)",
            "Take antacid — Gelusil/Digene after meals",
            "Avoid spicy, oily, and fried food for 2-3 days",
            "Eat light — dalia, khichdi, curd rice"
        ],
        "homeCare_hi": [
            "अजवाइन या जीरे वाला गर्म पानी पिएं",
            "खाने के बाद एंटासिड — जेलुसिल/डाइजीन लें",
            "2-3 दिन तक मसालेदार, तेल वाला और तला हुआ खाना न खाएं",
            "हल्का खाएं — दलिया, खिचड़ी, दही चावल"
        ],
        "doctorNotes_en": ["See doctor if pain persists beyond 48 hours", "Get tested if you notice blood in stool"],
        "doctorNotes_hi": ["48 घंटे से ज़्यादा दर्द रहे तो डॉक्टर को दिखाएं", "मल में खून दिखे तो जाँच करवाएं"],
        "redFlags_en": ["Severe pain in lower right abdomen (appendicitis risk)", "Vomiting blood", "Black or bloody stools"],
        "redFlags_hi": ["दाईं ओर नीचे तेज़ दर्द (अपेंडिसाइटिस का खतरा)", "खून की उल्टी", "काला या खूनी मल"]
    },
    {
        "keywords_en": ["cold", "cough", "sardi", "khansi", "runny nose", "sneezing", "naak se paani", "naak beh rahi", "sore throat", "gala kharab"],
        "keywords_hi": ["सर्दी", "खांसी", "ज़ुकाम", "नाक बहना", "छींक", "गला खराब", "गले में दर्द"],
        "name_en": "Common Cold / Upper Respiratory Infection",
        "name_hi": "सामान्य सर्दी-ज़ुकाम",
        "desc_en": "Viral infection of nose and throat causing congestion, cough, and sneezing",
        "desc_hi": "नाक और गले का वायरल संक्रमण जिससे जमाव, खांसी और छींकें आती हैं",
        "urgency": "homeCare",
        "likelihood": "high",
        "homeCare_en": [
            "Drink warm water, haldi doodh (turmeric milk), or ginger tea",
            "Steam inhalation 2-3 times a day with Vicks/eucalyptus",
            "Gargle with warm salt water for sore throat",
            "Take Cetirizine for sneezing and runny nose"
        ],
        "homeCare_hi": [
            "गर्म पानी, हल्दी दूध या अदरक की चाय पिएं",
            "विक्स/नीलगिरी के साथ दिन में 2-3 बार भाप लें",
            "गले में दर्द के लिए गर्म नमक के पानी से गरारे करें",
            "छींक और नाक बहने के लिए सेटिरिज़ीन लें"
        ],
        "doctorNotes_en": ["See doctor if cough lasts more than 2 weeks", "Visit if you develop high fever with colored phlegm"],
        "doctorNotes_hi": ["खांसी 2 हफ्ते से ज़्यादा रहे तो डॉक्टर को दिखाएं", "तेज़ बुखार और रंगीन बलगम आए तो जाएं"],
        "redFlags_en": ["Difficulty breathing", "Coughing blood", "Fever above 103°F for 3+ days"],
        "redFlags_hi": ["साँस लेने में कठिनाई", "खांसी में खून", "3+ दिन तक 103°F से ऊपर बुखार"]
    },
    {
        "keywords_en": ["diarrhea", "loose motion", "dast", "pet kharab", "ulti", "vomiting", "food poisoning", "dehydration"],
        "keywords_hi": ["दस्त", "लूज़ मोशन", "उल्टी", "पेट खराब", "फूड पॉइज़निंग", "डिहाइड्रेशन"],
        "name_en": "Gastroenteritis / Food Poisoning",
        "name_hi": "गैस्ट्रोएंटेराइटिस / फूड पॉइज़निंग",
        "desc_en": "Stomach infection causing loose motions and vomiting, often from contaminated food/water",
        "desc_hi": "दूषित खाने/पानी से पेट का संक्रमण जिससे दस्त और उल्टी होती है",
        "urgency": "soon",
        "likelihood": "high",
        "homeCare_en": [
            "Drink ORS (Electral/Enerzal) every 30 minutes — most important!",
            "Eat BRAT diet: Banana, Rice, Apple, Toast",
            "Take Norfloxacin + Tinidazole (OfloxTZ) if bacterial suspected",
            "Avoid milk, spicy food, and caffeinated drinks"
        ],
        "homeCare_hi": [
            "हर 30 मिनट में ORS (इलेक्ट्रॉल/एनर्ज़ल) पिएं — सबसे ज़रूरी!",
            "BRAT डाइट खाएं: केला, चावल, सेब, टोस्ट",
            "बैक्टीरियल लगे तो नॉरफ्लॉक्सासिन + टिनिडाज़ोल (OfloxTZ) लें",
            "दूध, मसालेदार खाना और कैफीन वाले पेय से बचें"
        ],
        "doctorNotes_en": ["See doctor if diarrhea lasts more than 2 days", "Urgent if child or elderly is affected"],
        "doctorNotes_hi": ["दस्त 2 दिन से ज़्यादा रहे तो डॉक्टर को दिखाएं", "बच्चा या बुज़ुर्ग हो तो तुरंत जाएं"],
        "redFlags_en": ["Blood in stool", "Signs of severe dehydration (no urination, dry mouth)", "High fever with chills"],
        "redFlags_hi": ["मल में खून", "गंभीर डिहाइड्रेशन के लक्षण (पेशाब न आना, मुँह सूखना)", "तेज़ बुखार और ठंड लगना"]
    },
    {
        "keywords_en": ["dengue", "dengue fever", "platelet", "joint pain with fever", "bone breaking fever"],
        "keywords_hi": ["डेंगू", "डेंगू बुखार", "प्लेटलेट", "जोड़ों में दर्द और बुखार"],
        "name_en": "Dengue Fever",
        "name_hi": "डेंगू बुखार",
        "desc_en": "Mosquito-borne viral disease with high fever, severe joint pain, and risk of low platelets",
        "desc_hi": "मच्छर से फैलने वाला वायरल रोग — तेज़ बुखार, जोड़ों में तेज़ दर्द और प्लेटलेट गिरने का ख़तरा",
        "urgency": "urgent",
        "likelihood": "medium",
        "homeCare_en": [
            "Complete bed rest — absolutely no physical exertion",
            "Drink papaya leaf juice — may help increase platelets",
            "Take ONLY Paracetamol — DO NOT take Aspirin or Ibuprofen",
            "Drink coconut water, ORS, and plenty of fluids"
        ],
        "homeCare_hi": [
            "पूरा बेड रेस्ट — बिल्कुल शारीरिक मेहनत न करें",
            "पपीते के पत्ते का जूस पिएं — प्लेटलेट बढ़ाने में मदद कर सकता है",
            "सिर्फ पैरासिटामोल लें — एस्पिरिन या इबुप्रोफेन बिल्कुल न लें",
            "नारियल पानी, ORS और खूब तरल पदार्थ पिएं"
        ],
        "doctorNotes_en": ["Get CBC test done daily to monitor platelet count", "Hospitalization needed if platelets drop below 50,000"],
        "doctorNotes_hi": ["प्लेटलेट काउंट के लिए रोज़ CBC टेस्ट करवाएं", "प्लेटलेट 50,000 से नीचे जाएं तो अस्पताल में भर्ती ज़रूरी"],
        "redFlags_en": ["Bleeding from nose, gums, or under skin", "Severe abdominal pain", "Persistent vomiting", "Platelet count below 20,000"],
        "redFlags_hi": ["नाक, मसूड़ों या त्वचा के नीचे से खून बहना", "पेट में तेज़ दर्द", "लगातार उल्टी", "प्लेटलेट 20,000 से नीचे"]
    },
    {
        "keywords_en": ["malaria", "chills", "shivering", "fever with chills", "thandi lag rahi", "kaanp raha"],
        "keywords_hi": ["मलेरिया", "ठंड लगना", "काँपना", "बुखार के साथ ठंड", "थर-थर काँपना"],
        "name_en": "Malaria",
        "name_hi": "मलेरिया",
        "desc_en": "Mosquito-borne parasitic infection causing cyclic fever with severe chills and sweating",
        "desc_hi": "मच्छर से फैलने वाला संक्रमण — बार-बार बुखार, तेज़ ठंड और पसीना",
        "urgency": "urgent",
        "likelihood": "medium",
        "homeCare_en": [
            "Keep the patient warm during chills, cool during fever",
            "Give ORS and fluids to prevent dehydration",
            "Take Paracetamol for fever — avoid self-medication with antimalarials",
            "Use mosquito net and repellent to prevent spread"
        ],
        "homeCare_hi": [
            "ठंड लगने पर गर्म रखें, बुखार में ठंडक दें",
            "डिहाइड्रेशन से बचने के लिए ORS और तरल पदार्थ दें",
            "बुखार के लिए पैरासिटामोल दें — खुद मलेरिया की दवा न लें",
            "मच्छरदानी और रिपेलेंट इस्तेमाल करें"
        ],
        "doctorNotes_en": ["Get Malaria Rapid Test (mRDT) or blood smear immediately", "Doctor will prescribe ACT (Artemisinin Combination Therapy)"],
        "doctorNotes_hi": ["तुरंत मलेरिया रैपिड टेस्ट (mRDT) या ब्लड स्मीयर करवाएं", "डॉक्टर ACT (आर्टेमिसिनिन कॉम्बिनेशन थेरेपी) देंगे"],
        "redFlags_en": ["Confusion or altered consciousness", "Severe anemia (extreme weakness)", "Dark/cola colored urine", "Jaundice (yellow eyes)"],
        "redFlags_hi": ["भ्रम या होश में कमी", "गंभीर एनीमिया (बहुत ज़्यादा कमज़ोरी)", "गहरे रंग का पेशाब", "पीलिया (आँखें पीली)"]
    },
    {
        "keywords_en": ["typhoid", "continuous fever", "lagatar bukhar", "week fever"],
        "keywords_hi": ["टाइफाइड", "लगातार बुखार", "एक हफ्ते से बुखार"],
        "name_en": "Typhoid Fever",
        "name_hi": "टाइफाइड बुखार",
        "desc_en": "Bacterial infection from contaminated food/water causing persistent high fever",
        "desc_hi": "दूषित खाने/पानी से बैक्टीरियल संक्रमण — लगातार तेज़ बुखार",
        "urgency": "urgent",
        "likelihood": "medium",
        "homeCare_en": [
            "Complete bed rest for at least 1-2 weeks",
            "Drink boiled/filtered water only",
            "Eat soft, easily digestible food — avoid raw vegetables",
            "Take Paracetamol for fever control"
        ],
        "homeCare_hi": [
            "कम से कम 1-2 हफ्ते पूरा बेड रेस्ट",
            "सिर्फ उबला/फ़िल्टर किया पानी पिएं",
            "नरम, आसानी से पचने वाला खाना खाएं — कच्ची सब्ज़ियों से बचें",
            "बुखार नियंत्रण के लिए पैरासिटामोल लें"
        ],
        "doctorNotes_en": ["Get Widal test or Typhidot test done", "Antibiotics (Azithromycin/Cefixime) necessary — doctor prescription required"],
        "doctorNotes_hi": ["विडाल टेस्ट या टायफिडॉट टेस्ट करवाएं", "एंटीबायोटिक्स ज़रूरी — डॉक्टर की पर्ची ज़रूरी"],
        "redFlags_en": ["Intestinal bleeding (blood in stool)", "Severe abdominal distension", "Mental confusion"],
        "redFlags_hi": ["आंतों से खून बहना (मल में खून)", "पेट में तेज़ सूजन", "मानसिक भ्रम"]
    },
    {
        "keywords_en": ["back pain", "kamar dard", "lower back", "peeth dard", "spine pain"],
        "keywords_hi": ["कमर दर्द", "पीठ दर्द", "कमर में दर्द", "रीढ़ में दर्द"],
        "name_en": "Lower Back Pain",
        "name_hi": "कमर दर्द",
        "desc_en": "Muscle strain or postural issue causing lower back discomfort",
        "desc_hi": "मांसपेशियों में खिंचाव या ग़लत बैठने से कमर में दर्द",
        "urgency": "homeCare",
        "likelihood": "high",
        "homeCare_en": [
            "Apply hot water bag or warm compress for 15-20 min",
            "Take Ibuprofen (Brufen) or Diclofenac gel for pain relief",
            "Do gentle stretching — cat-cow pose, knee-to-chest stretch",
            "Use firm mattress, avoid soft bed"
        ],
        "homeCare_hi": [
            "गर्म पानी की बोतल या गर्म सिकाई 15-20 मिनट करें",
            "दर्द के लिए इबुप्रोफेन या डाइक्लोफेनाक जेल लगाएं",
            "हल्की स्ट्रेचिंग करें — कैट-काउ पोज़, घुटने-से-छाती स्ट्रेच",
            "सख्त गद्दे पर सोएं, नरम बिस्तर से बचें"
        ],
        "doctorNotes_en": ["See doctor if pain radiates down the leg (sciatica)", "Get X-ray if pain persists beyond 2 weeks"],
        "doctorNotes_hi": ["अगर दर्द टांग तक जाए (साइटिका) तो डॉक्टर दिखाएं", "2 हफ्ते से ज़्यादा दर्द रहे तो X-ray करवाएं"],
        "redFlags_en": ["Loss of bladder/bowel control", "Numbness in legs", "Pain after a fall or accident"],
        "redFlags_hi": ["पेशाब/मल पर नियंत्रण खोना", "टांगों में सुन्नपन", "गिरने या दुर्घटना के बाद दर्द"]
    },
    {
        "keywords_en": ["acidity", "gas", "bloating", "heartburn", "acid reflux", "seene me jalan", "pet me gas", "khatta dkar"],
        "keywords_hi": ["एसिडिटी", "गैस", "पेट फूलना", "सीने में जलन", "खट्टी डकार"],
        "name_en": "Acid Reflux / Gas",
        "name_hi": "एसिडिटी / गैस",
        "desc_en": "Excess stomach acid causing burning sensation, bloating, and discomfort",
        "desc_hi": "पेट में ज़्यादा एसिड से जलन, फूलना और बेचैनी",
        "urgency": "homeCare",
        "likelihood": "high",
        "homeCare_en": [
            "Drink cold milk or coconut water for instant relief",
            "Chew saunf (fennel seeds) or eat banana after meals",
            "Take Pantoprazole (Pan-D) before breakfast",
            "Avoid tea/coffee on empty stomach"
        ],
        "homeCare_hi": [
            "तुरंत राहत के लिए ठंडा दूध या नारियल पानी पिएं",
            "खाने के बाद सौंफ चबाएं या केला खाएं",
            "नाश्ते से पहले पैंटोप्राज़ोल (Pan-D) लें",
            "खाली पेट चाय/कॉफ़ी न पिएं"
        ],
        "doctorNotes_en": ["See doctor if heartburn occurs daily for 2+ weeks", "Get endoscopy if symptoms don't respond to antacids"],
        "doctorNotes_hi": ["2+ हफ्ते रोज़ जलन हो तो डॉक्टर दिखाएं", "एंटासिड से आराम न मिले तो एंडोस्कोपी करवाएं"],
        "redFlags_en": ["Difficulty swallowing", "Unexplained weight loss", "Vomiting blood or black material"],
        "redFlags_hi": ["निगलने में कठिनाई", "बिना कारण वज़न कम होना", "खून या काले रंग की उल्टी"]
    },
    {
        "keywords_en": ["skin rash", "itching", "khujli", "allergy", "red spots", "dane", "pimples", "acne", "daad"],
        "keywords_hi": ["खुजली", "एलर्जी", "लाल दाने", "दाद", "मुहांसे", "चकत्ते"],
        "name_en": "Skin Allergy / Dermatitis",
        "name_hi": "त्वचा एलर्जी / डर्माटाइटिस",
        "desc_en": "Allergic skin reaction causing rash, itching, and redness",
        "desc_hi": "एलर्जी से त्वचा पर रैश, खुजली और लालिमा",
        "urgency": "homeCare",
        "likelihood": "high",
        "homeCare_en": [
            "Take Cetirizine (Alerid/Cetzine) once daily for itching",
            "Apply Calamine lotion or Candid-B cream on affected area",
            "Avoid scratching — keep nails short",
            "Wear loose cotton clothes, avoid synthetic fabric"
        ],
        "homeCare_hi": [
            "खुजली के लिए दिन में एक बार सेटिरिज़ीन (अलेरिड/सेटज़ीन) लें",
            "प्रभावित जगह पर कैलामाइन लोशन या कैंडिड-B क्रीम लगाएं",
            "खुजाएं नहीं — नाखून छोटे रखें",
            "ढीले सूती कपड़े पहनें, सिंथेटिक कपड़ों से बचें"
        ],
        "doctorNotes_en": ["See dermatologist if rash spreads or has pus", "Get allergy test if recurring"],
        "doctorNotes_hi": ["रैश फैलने या पस होने पर त्वचा विशेषज्ञ दिखाएं", "बार-बार हो तो एलर्जी टेस्ट करवाएं"],
        "redFlags_en": ["Swelling of face/lips/tongue (anaphylaxis risk)", "Fever with widespread rash", "Blisters or peeling skin"],
        "redFlags_hi": ["चेहरे/होंठों/जीभ में सूजन (एनाफिलेक्सिस का खतरा)", "बुखार के साथ पूरे शरीर पर रैश", "फफोले या त्वचा का छिलना"]
    },
    {
        "keywords_en": ["eye pain", "aankh dard", "red eye", "aankh laal", "eye infection", "conjunctivitis", "watery eyes", "aankh se paani"],
        "keywords_hi": ["आँख में दर्द", "आँख लाल", "आँख का इन्फेक्शन", "कंजक्टिवाइटिस", "आँख से पानी"],
        "name_en": "Conjunctivitis / Eye Infection",
        "name_hi": "कंजक्टिवाइटिस / आँख का संक्रमण",
        "desc_en": "Eye infection causing redness, discharge, and irritation",
        "desc_hi": "आँख का संक्रमण जिससे लालिमा, डिस्चार्ज और जलन होती है",
        "urgency": "soon",
        "likelihood": "high",
        "homeCare_en": [
            "Wash eyes with clean, cold water frequently",
            "Use prescribed antibiotic eye drops (Moxifloxacin)",
            "Don't touch or rub eyes — wash hands frequently",
            "Wear dark glasses outdoors to reduce irritation"
        ],
        "homeCare_hi": [
            "बार-बार साफ़ ठंडे पानी से आँखें धोएं",
            "डॉक्टर द्वारा बताई एंटीबायोटिक आई ड्रॉप्स (मॉक्सीफ्लॉक्सासिन) डालें",
            "आँखें न छुएं — बार-बार हाथ धोएं",
            "बाहर जाते समय काला चश्मा पहनें"
        ],
        "doctorNotes_en": ["See eye doctor if symptoms worsen after 3 days", "Don't self-medicate with steroid eye drops"],
        "doctorNotes_hi": ["3 दिन बाद भी बिगड़े तो आँखों के डॉक्टर दिखाएं", "खुद स्टेरॉयड आई ड्रॉप्स न डालें"],
        "redFlags_en": ["Sudden vision loss", "Severe eye pain with nausea", "Pus or thick discharge from eye"],
        "redFlags_hi": ["अचानक दृष्टि खोना", "मतली के साथ तेज़ आँख दर्द", "आँख से पस या गाढ़ा डिस्चार्ज"]
    },
    {
        "keywords_en": ["diabetes", "sugar", "thirst", "frequent urination", "sugar high", "blood sugar"],
        "keywords_hi": ["शुगर", "मधुमेह", "डायबिटीज़", "बार-बार पेशाब", "प्यास ज़्यादा"],
        "name_en": "Diabetes Symptoms",
        "name_hi": "मधुमेह / शुगर के लक्षण",
        "desc_en": "Signs of high blood sugar including excessive thirst, urination, and fatigue",
        "desc_hi": "हाई ब्लड शुगर के संकेत — ज़्यादा प्यास, बार-बार पेशाब और थकान",
        "urgency": "soon",
        "likelihood": "medium",
        "homeCare_en": [
            "Check fasting blood sugar — normal is below 100 mg/dL",
            "Reduce sugar, white rice, maida, and processed food",
            "Walk 30 minutes daily — even after dinner helps",
            "Drink methi (fenugreek) water in morning on empty stomach"
        ],
        "homeCare_hi": [
            "फास्टिंग ब्लड शुगर चेक करें — सामान्य 100 mg/dL से कम",
            "चीनी, सफ़ेद चावल, मैदा और प्रोसेस्ड फ़ूड कम करें",
            "रोज़ 30 मिनट चलें — डिनर के बाद भी फ़ायदेमंद",
            "सुबह खाली पेट मेथी का पानी पिएं"
        ],
        "doctorNotes_en": ["Get HbA1c test for 3-month average sugar level", "See endocrinologist for proper management plan"],
        "doctorNotes_hi": ["3 महीने के औसत शुगर के लिए HbA1c टेस्ट करवाएं", "सही इलाज के लिए एंडोक्राइनोलॉजिस्ट दिखाएं"],
        "redFlags_en": ["Sudden weight loss with increased thirst", "Fruity breath odor (diabetic ketoacidosis)", "Numbness or tingling in feet"],
        "redFlags_hi": ["प्यास बढ़ने के साथ अचानक वज़न कम", "साँस में फल जैसी गंध (डायबिटिक कीटोएसिडोसिस)", "पैरों में सुन्नपन या झनझनाहट"]
    },
    {
        "keywords_en": ["bp", "blood pressure", "high bp", "low bp", "chakkar", "dizziness", "giddy"],
        "keywords_hi": ["बीपी", "ब्लड प्रेशर", "हाई बीपी", "लो बीपी", "चक्कर", "सिर घूमना"],
        "name_en": "Blood Pressure Issues",
        "name_hi": "ब्लड प्रेशर की समस्या",
        "desc_en": "High or low blood pressure causing dizziness, headache, or fatigue",
        "desc_hi": "हाई या लो ब्लड प्रेशर से चक्कर, सिरदर्द या थकान",
        "urgency": "soon",
        "likelihood": "medium",
        "homeCare_en": [
            "Check BP at home or nearby pharmacy — note readings",
            "Reduce salt intake — avoid pickles, papad, processed food",
            "For low BP: drink salted lemonade, eat raisins soaked overnight",
            "Practice deep breathing — 5 minutes daily reduces BP"
        ],
        "homeCare_hi": [
            "घर पर या नज़दीकी फार्मेसी में BP चेक करें — रीडिंग नोट करें",
            "नमक कम खाएं — अचार, पापड़, प्रोसेस्ड फूड से बचें",
            "लो BP के लिए: नमक नींबू पानी पिएं, रातभर भिगोई किशमिश खाएं",
            "गहरी साँस लें — रोज़ 5 मिनट BP कम करता है"
        ],
        "doctorNotes_en": ["See doctor if BP consistently above 140/90", "Regular monitoring needed if on BP medication"],
        "doctorNotes_hi": ["BP लगातार 140/90 से ऊपर हो तो डॉक्टर दिखाएं", "BP की दवा ले रहे हों तो नियमित जाँच ज़रूरी"],
        "redFlags_en": ["BP above 180/120 (hypertensive crisis)", "Sudden severe headache with blurred vision", "Chest pain with high BP"],
        "redFlags_hi": ["BP 180/120 से ऊपर (हाइपरटेंसिव क्राइसिस)", "धुंधली दृष्टि के साथ अचानक तेज़ सिरदर्द", "हाई BP के साथ सीने में दर्द"]
    },
    {
        "keywords_en": ["knee pain", "joint pain", "ghutne me dard", "jodon me dard", "arthritis"],
        "keywords_hi": ["घुटने में दर्द", "जोड़ों में दर्द", "गठिया"],
        "name_en": "Joint Pain / Arthritis",
        "name_hi": "जोड़ों में दर्द / गठिया",
        "desc_en": "Joint inflammation causing pain, stiffness, and swelling",
        "desc_hi": "जोड़ों में सूजन से दर्द, अकड़न और सूजन",
        "urgency": "homeCare",
        "likelihood": "high",
        "homeCare_en": [
            "Apply Diclofenac gel (Voveran/Volini) on the joint",
            "Hot fomentation for 15 min, 2-3 times daily",
            "Take Calcium + Vitamin D supplements daily",
            "Do gentle exercises — avoid stairs if knee pain"
        ],
        "homeCare_hi": [
            "जोड़ पर डाइक्लोफेनाक जेल (वोवेरान/वोलिनी) लगाएं",
            "दिन में 2-3 बार 15 मिनट गर्म सिकाई करें",
            "रोज़ कैल्शियम + विटामिन D सप्लीमेंट लें",
            "हल्की एक्सरसाइज़ करें — घुटने में दर्द हो तो सीढ़ियों से बचें"
        ],
        "doctorNotes_en": ["See orthopedic if pain limits daily activities", "Get X-ray and uric acid test"],
        "doctorNotes_hi": ["रोज़मर्रा के काम में दिक्कत हो तो ऑर्थोपेडिक दिखाएं", "X-ray और यूरिक एसिड टेस्ट करवाएं"],
        "redFlags_en": ["Joint suddenly hot, red, and extremely swollen", "Fever with joint pain", "Unable to bear weight on the joint"],
        "redFlags_hi": ["जोड़ अचानक गर्म, लाल और बहुत सूजा हुआ", "जोड़ दर्द के साथ बुखार", "जोड़ पर वज़न न सह पाना"]
    },
    {
        "keywords_en": ["urinary", "burning urine", "uti", "peshab me jalan", "peshab me dard", "frequent pee"],
        "keywords_hi": ["पेशाब में जलन", "पेशाब में दर्द", "यूटीआई", "बार-बार पेशाब"],
        "name_en": "Urinary Tract Infection (UTI)",
        "name_hi": "मूत्र मार्ग संक्रमण (UTI)",
        "desc_en": "Bacterial infection in the urinary tract causing burning and frequent urination",
        "desc_hi": "मूत्र मार्ग में बैक्टीरियल संक्रमण — जलन और बार-बार पेशाब",
        "urgency": "soon",
        "likelihood": "high",
        "homeCare_en": [
            "Drink 3-4 liters of water daily to flush bacteria",
            "Drink cranberry juice or barley water",
            "Don't hold urine — urinate frequently",
            "Maintain hygiene — wipe front to back"
        ],
        "homeCare_hi": [
            "बैक्टीरिया को बाहर निकालने के लिए रोज़ 3-4 लीटर पानी पिएं",
            "क्रैनबेरी जूस या जौ का पानी पिएं",
            "पेशाब न रोकें — बार-बार जाएं",
            "साफ़-सफ़ाई रखें"
        ],
        "doctorNotes_en": ["Get urine culture test for proper antibiotic", "See doctor if symptoms don't improve in 2 days"],
        "doctorNotes_hi": ["सही एंटीबायोटिक के लिए यूरिन कल्चर टेस्ट करवाएं", "2 दिन में सुधार न हो तो डॉक्टर दिखाएं"],
        "redFlags_en": ["Blood in urine", "Fever with back/flank pain (kidney infection)", "Unable to urinate at all"],
        "redFlags_hi": ["पेशाब में खून", "पीठ/बगल में दर्द के साथ बुखार (किडनी इन्फेक्शन)", "पेशाब आना बंद"]
    },
    {
        "keywords_en": ["anxiety", "tension", "stress", "neend nahi", "insomnia", "depression", "sad", "panic", "ghabrahat"],
        "keywords_hi": ["चिंता", "तनाव", "स्ट्रेस", "नींद नहीं", "अनिद्रा", "डिप्रेशन", "उदासी", "घबराहट"],
        "name_en": "Anxiety / Stress / Sleep Issues",
        "name_hi": "चिंता / तनाव / नींद की समस्या",
        "desc_en": "Mental health concerns including anxiety, stress, and insomnia",
        "desc_hi": "मानसिक स्वास्थ्य — चिंता, तनाव और अनिद्रा",
        "urgency": "soon",
        "likelihood": "high",
        "homeCare_en": [
            "Practice deep breathing — 4-7-8 technique before bed",
            "Limit screen time 1 hour before sleep",
            "Walk or exercise for 30 min daily — natural mood booster",
            "Drink warm milk with haldi before bed"
        ],
        "homeCare_hi": [
            "गहरी साँस लें — सोने से पहले 4-7-8 तकनीक",
            "सोने से 1 घंटा पहले स्क्रीन टाइम बंद करें",
            "रोज़ 30 मिनट चलें या एक्सरसाइज करें — प्राकृतिक मूड बूस्टर",
            "सोने से पहले हल्दी वाला गर्म दूध पिएं"
        ],
        "doctorNotes_en": ["See a psychiatrist if symptoms persist for 2+ weeks", "iCall helpline: 9152987821 (free counseling)"],
        "doctorNotes_hi": ["2+ हफ्ते से लक्षण हों तो मनोचिकित्सक दिखाएं", "iCall हेल्पलाइन: 9152987821 (मुफ़्त काउंसलिंग)"],
        "redFlags_en": ["Thoughts of self-harm or suicide — call 988/iCall immediately", "Panic attacks with chest pain", "Complete inability to sleep for 3+ days"],
        "redFlags_hi": ["आत्महत्या या खुद को नुकसान पहुँचाने के विचार — तुरंत 988/iCall कॉल करें", "सीने में दर्द के साथ पैनिक अटैक", "3+ दिन तक नींद न आना"]
    },
    {
        "keywords_en": ["toothache", "tooth pain", "daant dard", "daant me dard", "cavity", "swollen gums"],
        "keywords_hi": ["दाँत दर्द", "दाँत में दर्द", "कैविटी", "मसूड़ों में सूजन"],
        "name_en": "Toothache / Dental Problem",
        "name_hi": "दाँत दर्द / दंत समस्या",
        "desc_en": "Tooth pain from cavity, infection, or gum disease",
        "desc_hi": "कैविटी, इन्फेक्शन या मसूड़ों की बीमारी से दाँत दर्द",
        "urgency": "soon",
        "likelihood": "high",
        "homeCare_en": [
            "Rinse with warm salt water every 2 hours",
            "Apply clove oil (laung ka tel) on affected tooth",
            "Take Ibuprofen (Brufen 400) for pain",
            "Avoid very hot, cold, or sweet foods"
        ],
        "homeCare_hi": [
            "हर 2 घंटे गर्म नमक पानी से कुल्ला करें",
            "प्रभावित दाँत पर लौंग का तेल लगाएं",
            "दर्द के लिए इबुप्रोफेन (ब्रूफेन 400) लें",
            "बहुत गर्म, ठंडा या मीठा खाने से बचें"
        ],
        "doctorNotes_en": ["See dentist within 2-3 days", "Don't delay if swelling is spreading to face/neck"],
        "doctorNotes_hi": ["2-3 दिन में दंत चिकित्सक दिखाएं", "सूजन चेहरे/गर्दन तक फैले तो देरी न करें"],
        "redFlags_en": ["Facial swelling", "Fever with tooth pain", "Difficulty opening mouth or swallowing"],
        "redFlags_hi": ["चेहरे में सूजन", "दाँत दर्द के साथ बुखार", "मुँह खोलने या निगलने में कठिनाई"]
    },
]

# Confidence threshold for local match
MIN_KEYWORD_MATCHES = 1


def _normalize(text: str) -> str:
    """Normalize user input for matching."""
    return text.strip().lower().replace(",", " ").replace(".", " ")


def match_symptoms(symptom_text: str, region: Optional[str], is_hindi: bool) -> Optional[dict]:
    """
    Try to match symptoms against our local knowledge base.
    Returns a response dict (same schema as Gemini) or None if no confident match.
    """
    if not symptom_text or len(symptom_text.strip()) < 3:
        return None

    normalized = _normalize(symptom_text)
    best_match = None
    best_score = 0
    all_matches = []

    for disease in DISEASES:
        score = 0
        keywords = disease["keywords_en"] + disease["keywords_hi"]
        for kw in keywords:
            if kw.lower() in normalized:
                score += 1

        if score >= MIN_KEYWORD_MATCHES:
            all_matches.append((disease, score))
            if score > best_score:
                best_score = score
                best_match = disease

    if not best_match:
        return None

    # Sort by score descending, take top 3
    all_matches.sort(key=lambda x: x[1], reverse=True)
    top_matches = all_matches[:3]

    # Build response in same Gemini schema
    possible_causes = []
    for i, (disease, score) in enumerate(top_matches):
        likelihood = "high" if i == 0 else ("medium" if i == 1 else "low")
        possible_causes.append({
            "name": disease["name_hi"] if is_hindi else disease["name_en"],
            "description": disease["desc_hi"] if is_hindi else disease["desc_en"],
            "likelihood": likelihood,
        })

    primary = best_match
    response = {
        "urgencyLevel": primary["urgency"],
        "possibleCauses": possible_causes,
        "homeCareTips": primary["homeCare_hi"] if is_hindi else primary["homeCare_en"],
        "doctorNotes": primary["doctorNotes_hi"] if is_hindi else primary["doctorNotes_en"],
        "redFlags": primary["redFlags_hi"] if is_hindi else primary["redFlags_en"],
        "disclaimer": "यह AI द्वारा उत्पन्न प्रतिक्रिया है, यह चिकित्सा सलाह नहीं है।" if is_hindi else "This is an AI generated response and not medical advice.",
        "confidence": min(60 + best_score * 10, 90),
        "source": "local_kb",
    }

    return response
