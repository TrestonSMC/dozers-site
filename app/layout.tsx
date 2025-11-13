import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Fully updated metadata (Next.js 15 compatible)
export const metadata: Metadata = {
  title: "Dozers Grill | Food • Drinks • Events • Mesa, AZ",
  description:
    "Official website for Dozers Grill in Mesa, AZ — great food, drinks, atmosphere, daily tournaments, and events.",
  keywords:
    "Dozers Grill, Mesa AZ, Food, Bar, Restaurant, Pool Hall, Events, Tournaments",

  openGraph: {
    title: "Dozers Grill | Mesa, AZ",
    description:
      "Great food, drinks, and daily events at Dozers Grill in Mesa, AZ.",
    url: "https://dozersgrill.com",
    siteName: "Dozers Grill",
    images: [
      {
        url: "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/gallery/gallery1.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dozers Grill | Mesa, AZ",
    description:
      "Visit Dozers Grill — great food, drinks, tournaments, and a fun atmosphere.",
    images: [
      "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/gallery/gallery1.png",
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

