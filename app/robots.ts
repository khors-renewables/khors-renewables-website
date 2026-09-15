import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Search engines are kept away from the hidden campaign landing pages under
 * /lp/. Ad and social crawlers are allowed through on purpose: Google Ads needs
 * to fetch a landing page for policy checks, and Facebook/Twitter need it for
 * link previews on the ads themselves.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/lp/"],
      },
      {
        userAgent: [
          "AdsBot-Google",
          "AdsBot-Google-Mobile",
          "facebookexternalhit",
          "Twitterbot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
