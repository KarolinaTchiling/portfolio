import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";


export const metadata: Metadata = {
  title: "MIRRO's Sets",
  description: "MIRRO's Sets",
  icons: [
    {
      rel: "icon",
      url: "/icon-dj.svg",
    },
    {
      rel: "apple-touch-icon",
      url: "/icon-dj.svg",
    },
  ],
};

export default function DjLayout({ children }: { children: React.ReactNode }) {
  return <>{children}       
         <Analytics />
        <SpeedInsights />
        </>;
}
