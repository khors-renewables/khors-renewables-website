import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CampaignLanding from "@/components/campaign/CampaignLanding";
import { campaignSlugs, getCampaign, getTracking } from "@/lib/campaigns";

/**
 * Hidden campaign landing page — /lp/google, /lp/facebook, /lp/instagram,
 * /lp/youtube.
 *
 * Not linked from the navbar or any page on the site, excluded from the sitemap
 * and disallowed in robots.txt, so it is reachable only by its direct URL. Each
 * URL loads its own platform tracking code and stamps its own code on the lead.
 */

// Only the four campaign slugs exist; anything else 404s instead of rendering.
export const dynamicParams = false;

export function generateStaticParams() {
  return campaignSlugs.map((source) => ({ source }));
}

export const metadata: Metadata = {
  title: "Schedule a Free Solar Consultation | Khors Renewables",
  description:
    "Book a free rooftop solar consultation with Khors Renewables and cut your electricity bills by up to 95%.",
  // Keeps the page out of search results even if the URL is shared publicly.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function CampaignPage({
  params,
}: PageProps<"/lp/[source]">) {
  const { source } = await params;
  const campaign = getCampaign(source);

  if (!campaign) notFound();

  return (
    <CampaignLanding campaign={campaign} tracking={getTracking(campaign.slug)} />
  );
}
