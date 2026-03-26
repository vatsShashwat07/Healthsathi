// ===== User & Family =====
export interface User {
    id: string;
    phone: string;
    name: string;
    age?: number;
    gender?: "male" | "female" | "other";
    languagePref: "hi" | "en";
    planTier: PlanTier;
    createdAt: string;
}

export type PlanTier = "free" | "plus" | "family";

export interface FamilyMember {
    id: string;
    userId: string;
    name: string;
    relation: RelationType;
    age?: number;
    gender?: "male" | "female" | "other";
    avatar?: string;
}

export type RelationType =
    | "self" | "father" | "mother" | "wife" | "husband"
    | "son" | "daughter" | "brother" | "sister" | "other";

// ===== Symptom Checker =====
export type BodyRegion =
    | "head" | "eyes" | "ears" | "throat" | "chest"
    | "upperBack" | "stomach" | "lowerBack" | "arms"
    | "hands" | "legs" | "feet";

export type UrgencyLevel = "emergency" | "urgent" | "soon" | "homeCare";

export interface SymptomCheck {
    id: string;
    userId: string;
    familyMemberId?: string;
    bodyRegion: BodyRegion;
    inputText: string;
    followUpAnswers?: Record<string, string>;
    aiResponse: SymptomResult;
    createdAt: string;
}

export interface SymptomResult {
    urgencyLevel: UrgencyLevel;
    possibleCauses: Array<{
        name: string;
        description: string;
        likelihood: "high" | "medium" | "low";
    }>;
    homeCareTips: string[];
    doctorNotes: string[];
    redFlags: string[];
    disclaimer: string;
    confidence: number;
}

// ===== Health Records =====
export type RecordType =
    | "lab" | "prescription" | "xray" | "vaccination"
    | "discharge" | "other";

export interface HealthRecord {
    id: string;
    userId: string;
    familyMemberId: string;
    recordType: RecordType;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    extractedData?: ExtractedLabData | ExtractedPrescriptionData;
    notes?: string;
    labName?: string;
    doctorName?: string;
    createdAt: string;
}

export interface ExtractedLabData {
    type: "lab";
    tests: Array<{
        testName: string;
        value: string;
        unit: string;
        referenceRange: string;
        isAbnormal: boolean;
    }>;
    labName?: string;
    date?: string;
}

export interface ExtractedPrescriptionData {
    type: "prescription";
    medicines: Array<{
        name: string;
        genericName?: string;
        dose: string;
        frequency: string;
        duration?: string;
        mealPreference?: "before" | "after" | "with" | "anytime";
    }>;
    doctorName?: string;
    date?: string;
}

// ===== Medicines =====
export type MealPreference = "before" | "after" | "with" | "anytime";
export type DoseFrequency = "OD" | "BD" | "TDS" | "QDS" | "SOS" | "custom";
export type DoseTime = "morning" | "afternoon" | "evening" | "night";
export type DoseStatus = "pending" | "taken" | "missed" | "skipped";

export interface Medicine {
    id: string;
    userId: string;
    familyMemberId: string;
    name: string;
    genericName?: string;
    dose: string;
    frequency: DoseFrequency;
    times: DoseTime[];
    mealPreference: MealPreference;
    quantityRemaining: number;
    refillDate?: string;
    isActive: boolean;
    createdAt: string;
}

export interface MedicineLog {
    id: string;
    medicineId: string;
    scheduledAt: string;
    takenAt?: string;
    status: DoseStatus;
}

// ===== Subscription =====
export interface Subscription {
    id: string;
    userId: string;
    plan: PlanTier;
    razorpaySubscriptionId?: string;
    status: "active" | "cancelled" | "expired" | "trial";
    startsAt: string;
    expiresAt: string;
}

// ===== Plan Limits =====
export interface PlanLimits {
    symptomChecksPerDay: number;
    symptomHistoryDays: number;
    storageBytes: number;
    familyMembers: number;
    aiExtractions: number; // per month
    medicineReminders: number;
    hasPrescriptionScan: boolean;
    hasInteractionChecker: boolean;
    hasRecordSharing: boolean;
    hasBulkDownload: boolean;
    hasAds: boolean;
    supportLevel: "email" | "whatsapp" | "priority";
}

export const PLAN_LIMITS: Record<PlanTier, PlanLimits> = {
    free: {
        symptomChecksPerDay: 3,
        symptomHistoryDays: 7,
        storageBytes: 50 * 1024 * 1024, // 50 MB
        familyMembers: 1,
        aiExtractions: 5,
        medicineReminders: 3,
        hasPrescriptionScan: false,
        hasInteractionChecker: false,
        hasRecordSharing: false,
        hasBulkDownload: false,
        hasAds: true,
        supportLevel: "email",
    },
    plus: {
        symptomChecksPerDay: Infinity,
        symptomHistoryDays: 365,
        storageBytes: 5 * 1024 * 1024 * 1024, // 5 GB
        familyMembers: 4,
        aiExtractions: Infinity,
        medicineReminders: Infinity,
        hasPrescriptionScan: true,
        hasInteractionChecker: true,
        hasRecordSharing: true,
        hasBulkDownload: false,
        hasAds: false,
        supportLevel: "whatsapp",
    },
    family: {
        symptomChecksPerDay: Infinity,
        symptomHistoryDays: Infinity,
        storageBytes: 10 * 1024 * 1024 * 1024, // 10 GB
        familyMembers: 10,
        aiExtractions: Infinity,
        medicineReminders: Infinity,
        hasPrescriptionScan: true,
        hasInteractionChecker: true,
        hasRecordSharing: true,
        hasBulkDownload: true,
        hasAds: false,
        supportLevel: "priority",
    },
};

// ===== Pharmacy / Refill =====
export interface PharmacyOrder {
    id: string;
    userId: string;
    medicineId: string;
    pharmacyName: string;
    orderStatus: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";
    amount: number;
    commission: number;
    trackingUrl?: string;
    createdAt: string;
}
