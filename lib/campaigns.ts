/**
 * Hidden campaign landing pages.
 *
 * One landing page is served at four URLs — /lp/google, /lp/facebook,
 * /lp/instagram and /lp/youtube. The page content is identical on all four;
 * what differs is the tracking code that fires on the page and the platform
 * code attached to every lead, so a submission can be attributed to the
 * platform that produced it.
 *
 * These routes are intentionally not linked from the navbar or anywhere else on
 * the site, are excluded from the sitemap (app/sitemap.ts), are disallowed for
 * search crawlers (app/robots.ts) and are served with `noindex, nofollow`
 * (app/lp/[source]/page.tsx). They are reachable only by their direct URL.
 */

export const campaignSlugs = [
  "google",
  "facebook",
  "instagram",
  "youtube",
] as const;

export type CampaignSlug = (typeof campaignSlugs)[number];

export type Campaign = {
  slug: CampaignSlug;
  /** Platform name shown in the lead notification email. */
  platform: string;
  /** Short code recorded with the lead so sales can attribute the source. */
  code: string;
};

export const campaigns: Record<CampaignSlug, Campaign> = {
  google: { slug: "google", platform: "Google Ads", code: "KR-GOOGLE" },
  facebook: { slug: "facebook", platform: "Facebook Ads", code: "KR-FACEBOOK" },
  instagram: {
    slug: "instagram",
    platform: "Instagram Ads",
    code: "KR-INSTAGRAM",
  },
  youtube: { slug: "youtube", platform: "YouTube Ads", code: "KR-YOUTUBE" },
};

export function isCampaignSlug(value: string): value is CampaignSlug {
  return (campaignSlugs as readonly string[]).includes(value);
}

export function getCampaign(value: string | undefined): Campaign | null {
  if (!value || !isCampaignSlug(value)) return null;
  return campaigns[value];
}

/** Tracking tag rendered on a campaign page. */
export type Tracking =
  | { provider: "google"; id: string; conversionLabel: string | null }
  | { provider: "meta"; id: string };

// IDs are interpolated into inline <script> tags, so only accept the shapes the
// platforms actually issue. A malformed value is dropped rather than injected.
const GOOGLE_ID = /^(AW|G|GT|UA)-[A-Za-z0-9-]{4,}$/;
const GOOGLE_LABEL = /^[A-Za-z0-9_-]{4,}$/;
const META_ID = /^\d{8,20}$/;

function clean(value: string | undefined, pattern: RegExp): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (!pattern.test(trimmed)) {
    console.warn(`[campaigns] Ignoring tracking id with unexpected format.`);
    return null;
  }
  return trimmed;
}

/**
 * Resolves the tracking code for a campaign from the environment.
 *
 * Server-side only: the values are read from non-public env vars and passed
 * down as props. Returns `null` when a platform has no code configured yet, in
 * which case the page renders without a tag and the lead is still attributed by
 * its campaign code.
 *
 * Values are read when the page is rendered, so a prerendered build needs a
 * rebuild (or restart in dev) after the ids change.
 */
export function getTracking(slug: CampaignSlug): Tracking | null {
  switch (slug) {
    case "google": {
      const id = clean(process.env.TRACKING_GOOGLE_ADS_ID, GOOGLE_ID);
      return id
        ? {
            provider: "google",
            id,
            conversionLabel: clean(
              process.env.TRACKING_GOOGLE_ADS_CONVERSION_LABEL,
              GOOGLE_LABEL
            ),
          }
        : null;
    }
    case "youtube": {
      const id = clean(process.env.TRACKING_YOUTUBE_ADS_ID, GOOGLE_ID);
      return id
        ? {
            provider: "google",
            id,
            conversionLabel: clean(
              process.env.TRACKING_YOUTUBE_ADS_CONVERSION_LABEL,
              GOOGLE_LABEL
            ),
          }
        : null;
    }
    case "facebook": {
      const id = clean(process.env.TRACKING_FACEBOOK_PIXEL_ID, META_ID);
      return id ? { provider: "meta", id } : null;
    }
    case "instagram": {
      const id = clean(process.env.TRACKING_INSTAGRAM_PIXEL_ID, META_ID);
      return id ? { provider: "meta", id } : null;
    }
  }
}
