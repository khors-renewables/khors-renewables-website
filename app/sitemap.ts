import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Only the public single-page site is listed. The campaign landing pages under
 * /lp/ are intentionally left out so they stay off search engines' radar.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
