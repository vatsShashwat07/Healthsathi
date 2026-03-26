/**
 * HealthSathi — Analytics Module
 * 
 * Tracks key user interactions for the free-to-paid conversion funnel.
 * 
 * In development: events are logged to console.
 * In production: integrate PostHog by installing `posthog-js` and setting
 * the NEXT_PUBLIC_POSTHOG_KEY environment variable.
 * 
 * TODO: `npm install posthog-js` and uncomment PostHog integration below.
 */

type EventProperties = Record<string, string | number | boolean>;

function logEvent(name: string, props?: EventProperties) {
    if (typeof window !== "undefined") {
        console.log(`📊 [Analytics] ${name}`, props || "");
    }
}

/** Core tracking function — console only until PostHog is installed */
function track(event: string, properties?: EventProperties) {
    logEvent(event, properties);

    // TODO: Uncomment after `npm install posthog-js`
    // if (process.env.NEXT_PUBLIC_POSTHOG_KEY && typeof window !== "undefined") {
    //   import("posthog-js").then(({ default: posthog }) => {
    //     if (!posthog.__loaded) {
    //       posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    //         api_host: "https://app.posthog.com",
    //         autocapture: false,
    //       });
    //     }
    //     posthog.capture(event, properties);
    //   });
    // }
}

// ===== Symptom Checker Events =====
export function trackSymptomCheck(region: string, language: string) {
    track("symptom_check_started", { region, language });
}

export function trackSymptomResult(region: string, urgencyLevel: string) {
    track("symptom_result_viewed", { region, urgency_level: urgencyLevel });
}

export function trackEmergencyTriggered(keyword: string, language: string) {
    track("emergency_triggered", { keyword, language, critical: true });
}

// ===== Record Events =====
export function trackRecordUpload(type: string) {
    track("record_uploaded", { type });
}

export function trackRecordView(recordId: string) {
    track("record_viewed", { record_id: recordId });
}

// ===== Medicine Events =====
export function trackMedicineTaken(medicineId: string) {
    track("medicine_taken", { medicine_id: medicineId });
}

export function trackRefillOrder(generic: boolean, savings: number) {
    track("refill_ordered", { is_generic: generic, savings_inr: savings });
}

export function trackGenericToggle(enabled: boolean) {
    track("generic_toggle_changed", { enabled });
}

// ===== Free-to-Paid Funnel =====
export function trackFreeLimitHit(feature: string) {
    track("free_limit_hit", { feature });
}

export function trackUpgradePageViewed(source: string) {
    track("upgrade_page_viewed", { source });
}

export function trackPlanSelected(plan: string, price: number) {
    track("plan_selected", { plan, price_inr: price });
}

export function trackPaymentInitiated(plan: string, method: string) {
    track("payment_initiated", { plan, method });
}

// ===== UI Events =====
export function trackLanguageSwitch(to: string) {
    track("language_switched", { to });
}

export function trackPageView(page: string) {
    track("page_viewed", { page });
}

export function trackShareWhatsApp(content: string) {
    track("share_whatsapp", { content_type: content });
}
