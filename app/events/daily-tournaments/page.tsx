"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function DailyTournamentsPage() {
  return (
    <div className="relative bg-[#0d1117] text-gray-100 overflow-x-hidden min-h-screen">
      {/* 🔹 Background Image */}
      <Image
        src="/images/pool-tables.jpg"
        alt="Dozers Pool Tables"
        fill
        className="object-cover brightness-[0.7] contrast-[1.1] -z-10"
      />

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/60 via-[#0d1117]/70 to-[#0d1117]/90 backdrop-blur-md -z-10" />

      {/* HEADER */}
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
          href="/events"
          className="text-white border border-[#29C3FF]/40 px-4 py-2 rounded-md hover:bg-[#29C3FF]/10 transition"
        >
          Back to Events
        </Link>
      </header>

      {/* CONTENT */}
      <section className="relative z-10 pt-32 pb-24 px-6 md:px-20 max-w-6xl mx-auto text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-[Playfair_Display] font-bold text-white mb-8 drop-shadow-[0_0_35px_rgba(245,158,11,0.6)] text-center"
        >
          Daily Tournaments at Dozers Grill
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-12"
        >
          Join our daily pool and dart tournaments for a chance to win cash prizes, bar tabs, and Dozers merch!  
          Whether you’re a casual player or a competitive shark, there’s always room for one more at the tables.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* INFO CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#111827]/70 backdrop-blur-md border border-[#29C3FF]/30 rounded-2xl p-8 shadow-[0_0_30px_-6px_rgba(41,195,255,0.4)]"
          >
            <h2 className="text-3xl font-semibold mb-4 text-[#F59E0B]">Tournaments Every Day</h2>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li>• Pool and Dart tournaments daily starting at 6 PM</li>
              <li>• Sign-ups open 1 hour before start time</li>
              <li>• Entry fee includes table time and a drink special</li>
              <li>• Top 3 players win bar tabs and merch rewards</li>
            </ul>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-[0_0_35px_-5px_rgba(245,158,11,0.4)] border border-[#F59E0B]/20"
          >
            <Image
              src="/images/tournament-night.jpg"
              alt="Tournament Night"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* EXTRA INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-gray-300 text-center"
        >
          <h3 className="text-2xl font-semibold text-[#29C3FF] mb-4">The Details</h3>
          <p className="max-w-2xl mx-auto leading-relaxed">
            Registration is first-come, first-served — arrive early to secure your spot!  
            All skill levels welcome, singles and teams both encouraged.  
            Enjoy music, food, and cold drinks all night long while you compete in our signature Dozers showdowns.
          </p>
          <Link href="/events">
            <Button className="mt-10 bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] border-0 text-white px-10 py-4 rounded-full hover:scale-105 transition-transform">
              Back to Events
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md text-center text-gray-400">
        © 2025 Dozers Grill • All Rights Reserved
      </footer>
    </div>
  );
}
