import Script from "next/script";
import type { Tracking } from "@/lib/campaigns";

/**
 * Renders the one tracking code that belongs to this campaign page.
 *
 * Google Ads / GA4 pages get gtag.js; Facebook and Instagram pages get the Meta
 * Pixel. Each platform has its own id, so the four landing URLs report to four
 * separate tracking codes. Nothing is rendered when a platform has no id set.
 */
export default function TrackingScripts({
  tracking,
}: {
  tracking: Tracking | null;
}) {
  if (!tracking) return null;

  if (tracking.provider === "google") {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${tracking.id}`}
          strategy="afterInteractive"
        />
        <Script id="khors-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${tracking.id}');`}
        </Script>
      </>
    );
  }

  return (
    <Script id="khors-meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${tracking.id}');
fbq('track', 'PageView');`}
    </Script>
  );
}
