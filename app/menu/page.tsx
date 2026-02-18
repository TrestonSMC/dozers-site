"use client";

import Script from "next/script";
import Link from "next/link";
import Image from "next/image";

const TOP_CROP_PX = 0; // ✅ start here (try 30–60). If it still clips, LOWER it.

export default function MenuPage() {
  return (
    <div className="relative min-h-screen bg-[#0d1117] text-gray-100 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('/images/background-texture.jpg')] bg-cover opacity-40" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117]/70 to-[#0d1117]/95" />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-6 backdrop-blur-md bg-[#0d1117]/70 border-b border-[#29C3FF]/20 z-50">
        <Link href="/" aria-label="Home">
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Logo"
            width={140}
            height={60}
            priority
          />
        </Link>

        <Link
          href="/"
          className="text-[#29C3FF] px-5 py-2 rounded-full border border-[#29C3FF]/50 hover:bg-[#29C3FF]/20 transition"
        >
          Home
        </Link>
      </header>

      <main className="pt-32 pb-16 px-6 md:px-16 relative z-20">
        <h1 className="text-center text-5xl md:text-6xl font-[Playfair_Display] font-bold text-white mb-10">
          Our Menu
        </h1>

        {/* Frame */}
        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117]">
          <div style={{ background: "#0d1117" }}>
            <div
              style={{
                transform: `translateY(-${TOP_CROP_PX}px)`,
                paddingBottom: `${TOP_CROP_PX}px`,
              }}
            >
              <div id="1tmd-3" className="w-full" />
            </div>
          </div>
        </div>

        {/* Menu Pro embed */}
        <Script src="https://imenupro.com/!1tmd-3" strategy="afterInteractive" />

        {/* Global fixes */}
        <style jsx global>{`
          html,
          body {
            background: #0d1117;
          }

          /* remove any default spacing around injected menu */
          #1tmd-3,
          #1tmd-3 * {
            box-sizing: border-box;
          }

          /* these selectors may or may not exist depending on their embed,
             but harmless if they don't */
          #1tmd-3 .imp-menu,
          #1tmd-3 .imp-menu * {
            margin-top: 0 !important;
          }

          #1tmd-3 .imp-title-heading,
          #1tmd-3 .imp-heading {
            padding-top: 0 !important;
          }
        `}</style>
      </main>

      <footer className="text-center text-gray-400 py-6 border-t border-[#29C3FF]/30 relative z-20">
        © 2025 Dozers Grill • All Rights Reserved
      </footer>
    </div>
  );
}




