"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="relative bg-[#0d1117] text-gray-100 overflow-x-hidden">

      {/* 🔹 Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover brightness-[0.8] contrast-[1.05] z-0"
      >
        <source
          src="https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-videos/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* 🔹 Dark gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#0d1117]/40 to-[#0d1117]/90 z-0" />

      {/* 🔹 Header (same as home page) */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-5 z-50 backdrop-blur-md bg-[#0d1117]/70 border-b border-[#29C3FF]/20">
        <Link href="/">
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Grill Logo"
            width={140}
            height={60}
            className="drop-shadow-[0_0_20px_rgba(41,195,255,0.4)] cursor-pointer"
          />
        </Link>

        <Link href="/">
          <button className="text-white border border-[#29C3FF]/40 px-4 py-2 rounded-md hover:bg-[#29C3FF]/10 transition">
            Home
          </button>
        </Link>
      </header>

      {/* Page Content */}
      <div className="relative z-10 px-6 py-40 max-w-6xl mx-auto">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-5xl md:text-7xl font-[Playfair_Display] font-bold text-center text-white drop-shadow-[0_0_35px_rgba(245,158,11,0.6)] mb-16"
        >
          Visit Dozers Grill
        </motion.h1>

        {/* CONTENT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#111827]/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_0_25px_-5px_rgba(41,195,255,0.3)] p-10 max-w-4xl mx-auto"
        >
          {/* ADDRESS */}
          <h2 className="text-3xl font-[Playfair_Display] mb-6 text-white drop-shadow-[0_0_25px_rgba(41,195,255,0.5)] text-center">
            Location & Hours
          </h2>

          <div className="text-center text-lg text-gray-300 mb-10">
            <p>7012 E Hampton Ave, Mesa, AZ 85209</p>
            <p className="mt-2">(602) 694-5551</p>
            <p className="mt-2 font-medium text-white">Open Daily: 10 AM – 2 AM</p>
            <p className="mt-1 text-gray-400 text-sm">
              Kitchen Hours: Mon–Thurs 4pm–10pm • Fri–Sun 10am–10pm
            </p>
          </div>

          {/* MAP */}
          <div className="rounded-xl overflow-hidden border border-[#29C3FF]/30 shadow-[0_0_25px_-5px_rgba(41,195,255,0.4)]">
            <iframe
              title="Dozers Grill Map"
              src="https://www.google.com/maps?q=Dozers+Grill+Mesa+AZ&hl=en&z=15&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* FOOTER */}
      <footer className="py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md text-center text-gray-400">
        © 2025 Dozers Grill • All Rights Reserved
      </footer>
    </div>
  );
}




