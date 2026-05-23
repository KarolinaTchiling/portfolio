import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const dmMono = DM_Mono({ weight: ['300', '400'], subsets: ['latin'], variable: '--font-body' });


export const metadata: Metadata = {
  title: "Karolina's Portfolio",
  description: "Karolina's Portfolio",
  icons: [
    {
      rel: "icon",
      url: "/icon.svg",
    },
    {
      rel: "apple-touch-icon",
      url: "/icon.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${dmMono.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
