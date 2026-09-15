/**
 * Public base URL of the site, used for robots.txt and the sitemap.
 * Override with SITE_URL when deploying to a different domain.
 */
export const siteUrl = (
  process.env.SITE_URL ?? "https://khorsrenewables.com"
).replace(/\/$/, "");
