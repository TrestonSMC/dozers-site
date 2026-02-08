"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const supabaseGallery =
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/gallery";

  return (
    <div className="relative bg-[#0d1117] text-gray-100 overflow-x-hidden">
      {/* ======================= BACKGROUND VIDEO ======================= */}
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

      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#0d1117]/40 to-[#0d1117]/90 z-0" />

      {/* ============================= HEADER ============================= */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-5 z-50 backdrop-blur-md bg-[#0d1117]/70 border-b border-[#29C3FF]/20">
        <Link href="/">
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Grill Logo"
            width={140}
            height={60}
            className="drop-shadow-[0_0_20px_rgba(41,195,255,0.4)]"
          />
        </Link>

        <Link
          href="/"
          className="text-white border border-[#29C3FF]/40 px-4 py-2 rounded-md hover:bg-[#29C3FF]/10 transition"
        >
          Home
        </Link>
      </header>

      {/* =============================== HERO =============================== */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 z-10">
        <h1 className="text-5xl md:text-7xl font-[Playfair_Display] font-bold text-white drop-shadow-[0_0_35px_rgba(245,158,11,0.6)]">
          About Dozers Grill
        </h1>

        <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-2xl">
          Great food, cold drinks, and a packed weekly lineup — plus 22 Diamond
          tables, 5 electronic dart boards, leagues, tournaments, and events 7
          days a week!
        </p>

        <Link href="/events" className="mt-10">
          <Button className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-5 rounded-full text-lg tracking-wider hover:scale-105 transition-transform">
            View Events
          </Button>
        </Link>
      </section>

      {/* ========================= STORY SECTION ========================= */}
      <section className="relative py-24 px-6 md:px-20 bg-[#111827]/80 backdrop-blur-md border-t border-[#29C3FF]/20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-[Playfair_Display] mb-6 text-white drop-shadow-[0_0_25px_rgba(41,195,255,0.4)]"
          >
            Where Great Food Meets Great Times
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
          >
            Dozers Grill is a neighborhood bar &amp; restaurant built for good
            meals, cold drinks, and easy nights with friends and family. Catch a
            game, hang at the bar, or jump into the action with darts and our
            Diamond tables — we’ve created a space for everyone.
          </motion.p>
        </div>

        {/* IMAGE + TEXT SPLIT */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-[#29C3FF]/20 shadow-[0_0_25px_-5px_rgba(41,195,255,0.3)]"
          >
            <Image
              src={`${supabaseGallery}/gallery1.png`}
              alt="Dozers Interior"
              width={600}
              height={400}
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            <p className="mb-6">
              From live music and specials to leagues, tournaments, and themed
              nights, Dozers is your go-to spot all week long. Enjoy a full bar,
              great food, and plenty to do — with 22 Diamond tables, 5 electronic
              dart boards, and nonstop entertainment.
            </p>
            <p className="text-gray-400 italic">
              “Come for the food &amp; drinks, stay for the community.”
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================== RATES ============================== */}
      <section className="py-24 px-6 md:px-20 text-center border-t border-[#F59E0B]/20 bg-[#0d1117]/80 backdrop-blur-md">
        <h2 className="text-4xl md:text-5xl font-[Playfair_Display] mb-10 text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
          Our Rates
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Hourly (Sun–Fri) Until 5PM",
              rates: [
                { label: "7FT", value: "$6" },
                { label: "9FT", value: "$7" },
              ],
            },
            {
              title: "Hourly (Sun–Fri) After 5PM",
              rates: [
                { label: "7FT", value: "$12" },
                { label: "9FT", value: "$15" },
              ],
            },
            {
              title: "Hourly Saturday Table",
              rates: [
                { label: "7FT", value: "$12" },
                { label: "9FT", value: "$15" },
              ],
            },
          ].map((rate, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-8 rounded-xl border border-[#29C3FF]/20 bg-[#1a1f2a]/80 backdrop-blur-md shadow-[0_0_20px_-6px_rgba(245,158,11,0.3)]"
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#F59E0B]">
                {rate.title}
              </h3>

              <ul className="space-y-2 text-gray-300 text-lg">
                {rate.rates.map((r, j) => (
                  <li
                    key={j}
                    className="flex justify-between border-b border-gray-700/50 pb-1"
                  >
                    <span>{r.label}</span>
                    <span>{r.value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-400 mt-10 italic">
          Rates subject to change — ask staff for current specials.
        </p>
      </section>

      {/* ============================== CTA =============================== */}
      <section className="py-24 px-6 md:px-20 text-center border-t border-[#29C3FF]/20 bg-[#111827]/70 backdrop-blur-md">
        <h3 className="text-3xl font-[Playfair_Display] mb-6 text-white drop-shadow-[0_0_25px_rgba(41,195,255,0.4)]">
          Ready to Play?
        </h3>

        <Link href="/events">
          <Button className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-5 rounded-full text-lg tracking-wider hover:scale-105 transition-transform">
            See What’s Happening
          </Button>
        </Link>
      </section>

      {/* ============================= FOOTER ============================= */}
      <footer className="py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md text-center text-gray-400">
        © 2025 Dozers Grill • All Rights Reserved
      </footer>
    </div>
  );
}

