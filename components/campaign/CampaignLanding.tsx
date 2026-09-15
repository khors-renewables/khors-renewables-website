import Image from "next/image";
import type { Campaign, Tracking } from "@/lib/campaigns";
import CampaignLeadForm from "@/components/campaign/CampaignLeadForm";
import TrackingScripts from "@/components/campaign/TrackingScripts";

/**
 * Standalone campaign landing page.
 *
 * A clean two-panel split: the campaign image fills the entire left half and
 * the form fills the entire right half. No navbar, no footer and no outbound
 * links, so paid traffic lands on a single conversion path and the page stays
 * outside the site's navigation. On phones the panels stack — image on top,
 * form below.
 */
export default function CampaignLanding({
  campaign,
  tracking,
}: {
  campaign: Campaign;
  tracking: Tracking | null;
}) {
  return (
    <>
      <TrackingScripts tracking={tracking} />

      {/* Heights divide by --body-zoom because body is scaled with `zoom`, which
          also scales viewport units — a plain 100dvh would stop 4.5% short and
          leave a white strip at the bottom. */}
      <main className="min-h-[calc(100dvh_/_var(--body-zoom))] bg-white lg:grid lg:h-[calc(100dvh_/_var(--body-zoom))] lg:grid-cols-2 lg:grid-rows-1">
        {/* ---------- Left: campaign image ----------
             The crop is anchored to the top-left on purpose. The photo is ~16:9,
             so a tall panel crops it horizontally and a short/wide one crops it
             vertically — anchoring top-left keeps the KHORS wall logo (upper
             left of the photo) in frame at every size. */}
        <div className="order-1 relative h-[14rem] w-full sm:h-[18rem] md:h-[24rem] lg:h-full lg:min-h-0">
          <Image
            src="/lp/consultant.png"
            alt="Khors Renewables consultant taking a customer call about rooftop solar"
            fill
            priority
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="object-cover object-left-top lg:object-left"
          />
        </div>

        {/* ---------- Right: form (fills the panel) ----------
             Padding grows with the viewport: at the lg breakpoint the panel is
             only ~512px wide, so heavy padding there would squeeze the fields.
             The panel scrolls on its own if the form is taller than the screen. */}
        <div className="order-2 flex items-center justify-center px-[1.25rem] py-[2rem] sm:px-[2rem] md:px-[3rem] lg:h-full lg:min-h-0 lg:overflow-y-auto lg:px-[2.5rem] lg:py-[2.5rem] xl:px-[4rem] 2xl:px-[5rem]">
          <div className="w-full max-w-[34rem]">
            <CampaignLeadForm campaign={campaign} tracking={tracking} />
          </div>
        </div>
      </main>
    </>
  );
}
