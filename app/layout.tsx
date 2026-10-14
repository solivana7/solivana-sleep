import type { Metadata } from "next";
import { Jost, Montserrat } from "next/font/google";
import { Suspense } from "react";
import { PreviewBanner } from "@/components/PreviewBanner";
import "./globals.css";

// Brand fonts — load once, expose as CSS vars for tailwind + globals.css
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoliVana Sleep — Stop tracking bad sleep. Start fixing it.",
  description:
    "CBT-I, real-time audio interventions, and circadian recovery for executives whose nights stopped working.",
  metadataBase: new URL("https://sleep.solivana.io"),
  openGraph: {
    title: "SoliVana Sleep",
    description:
      "Sleep therapy, not sleep tracking. CBT-I + real-time audio interventions for poor sleepers.",
    url: "https://sleep.solivana.io",
    siteName: "SoliVana Sleep",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jost.variable} ${montserrat.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-amber focus:text-ink focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <Suspense fallback={null}>
          {/* Server-rendered, reads the preview cookie. Nothing renders if cookie absent. */}
          <PreviewBanner />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
