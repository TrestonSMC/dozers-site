import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata
export const metadata: Metadata = {
  title: "Dozers Grill | Food • Drinks • Events • Mesa, AZ",
  description:
    "Official website for Dozers Grill in Mesa, AZ — great food, drinks, atmosphere, and weekly events.",
  keywords:
    "Dozers Grill, Mesa AZ, Restaurant, Bar, Food, Drinks, Events",

  openGraph: {
    title: "Dozers Grill | Mesa, AZ",
    description:
      "Great food, drinks, and weekly events at Dozers Grill in Mesa, AZ.",
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
      "Visit Dozers Grill — great food, drinks, and a fun atmosphere.",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GRW9K2620D
"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GRW9K2620D', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


