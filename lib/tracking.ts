import type { Tracking } from "@/lib/campaigns";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Reports a submitted lead to the platform that owns this landing page.
 *
 * Runs in the browser after a successful form post. If the platform tag failed
 * to load (ad blocker, no id configured) this is a no-op — the lead itself is
 * already recorded by the email notification.
 */
export function trackLead(tracking: Tracking | null, campaignCode: string) {
  if (typeof window === "undefined" || !tracking) return;

  if (tracking.provider === "google") {
    if (typeof window.gtag !== "function") return;

    if (tracking.conversionLabel) {
      window.gtag("event", "conversion", {
        send_to: `${tracking.id}/${tracking.conversionLabel}`,
        campaign_code: campaignCode,
      });
      return;
    }

    // No conversion label configured yet: fall back to the standard lead event
    // so the campaign still registers something in Google Analytics/Ads.
    window.gtag("event", "generate_lead", { campaign_code: campaignCode });
    return;
  }

  if (typeof window.fbq !== "function") return;
  window.fbq("track", "Lead", { content_name: campaignCode });
}
