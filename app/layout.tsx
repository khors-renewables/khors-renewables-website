import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ConsultationProvider } from "@/components/consultation/ConsultationContext";
import ConsultationModal from "@/components/consultation/ConsultationModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khors Renewables | Cut your electricity bills by up to 95%",
  description:
    "Khors Renewables installs high quality solar solutions that cut electricity bills by up to 95%. Expert installation, maximum savings, a greener planet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <ConsultationProvider>
          {children}
          <ConsultationModal />
        </ConsultationProvider>
      </body>
    </html>
  );
}
