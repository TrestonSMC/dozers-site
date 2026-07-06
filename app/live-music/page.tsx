"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const liveShows = [
  {
    day: "11",
    month: "JULY",
    weekday: "Saturday",
    title: "Worlds Smallest Quartet",
    date: "Saturday, July 11th",
    time: "3:00 PM",
    desc: "Kick off the afternoon with live local music, cold drinks, and Dozer’s weekend energy.",
    tags: ["Afternoon Show", "No Cover", "Local Talent"],
    accent: "#F59E0B",
    image: "/images/live-music/wsq.jpg",
  },
  {
    day: "11",
    month: "JULY",
    weekday: "Saturday",
    title: "Doc Baldi",
    date: "Saturday, July 11th",
    time: "7:00 PM",
    desc: "Keep the night going with a high-energy evening set on the Stage @ Dozer’s.",
    tags: ["Evening Show", "Cold Drinks", "Good Times"],
    accent: "#29C3FF",
    image: "/images/live-music/doc-baldi.jpg",
  },
  {
    day: "18",
    month: "JULY",
    weekday: "Saturday",
    title: "Ian Eric",
    date: "Saturday, July 18th",
    time: "3:00 PM",
    desc: "Arizona Avenue brings live music, familiar favorites, and weekend patio vibes.",
    tags: ["Live Band", "Patio Vibes", "Weekend"],
    accent: "#10B981",
    image: "/images/live-music/ian-eric.jpg",
  },
  {
    day: "18",
    month: "JULY",
    weekday: "Saturday",
    title: "The Swing Jugs",
    date: "Saturday, July 18th",
    time: "7:00 PM",
    desc: "An evening show built for drinks, dinner, and hanging out with your crew.",
    tags: ["Evening Show", "Dinner & Drinks", "Local Talent"],
    accent: "#F59E0B",
    image: "/images/live-music/the-swinging-jugs.jpg",
  },
  {
    day: "25",
    month: "JULY",
    weekday: "Saturday",
    title: "Velvet Crush",
    date: "Saturday, July 25th",
    time: "3:00 PM",
    desc: "Feel-good music and afternoon energy to start your Saturday right.",
    tags: ["Afternoon Show", "Local Music", "Dozer’s Stage"],
    accent: "#29C3FF",
    image: "/images/live-music/velvet-crush.jpg",
  },
  {
    day: "25",
    month: "JULY",
    weekday: "Saturday",
    title: "Stereo Head",
    date: "Saturday, July 25th",
    time: "7:00 PM",
    desc: "Jake Dean takes the stage for a Saturday night set at Dozer’s Grill.",
    tags: ["Saturday Night", "Cold Drinks", "No Cover"],
    accent: "#10B981",
    image: "/images/live-music/stereo-head.jpg",
  },
  {
    day: "1st",
    month: "August",
    weekday: "Saturday",
    title: "Grunge Sponges",
    date: "Saturday, August 1st",
    time: "3:00 PM",
    desc: "Classic sounds, cold drinks, and a laid-back afternoon at Dozer’s.",
    tags: ["Classic Hits", "Afternoon Show", "Cold Drinks"],
    accent: "#F59E0B",
    image: "/images/live-music/grunge-sponges.jpg",
  },
  {
    day: "1st",
    month: "August",
    weekday: "Saturday",
    title: "Mike Malecker",
    date: "Saturday, August 1st",
    time: "7:00 PM",
    desc: "Cold Drinks, Entertainment, and good vibes to start your weekend off right.",
    tags: ["Trio", "Evening Show", "Good Times"],
    accent: "#29C3FF",
    image: "/images/live-music/mike-malecker.jpg",
  },
];

export default function LiveMusicPage() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-gray-100 overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(41,195,255,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.18),transparent_35%),linear-gradient(to_bottom,#0d1117,#05070a)]" />

{/* HEADER */}
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

      {/* HERO */}
      <section className="relative z-10 px-6 py-24 md:py-32 border-b border-white/10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.35em] text-[#F59E0B] text-sm mb-5">
              Stage @ Dozer’s
            </p>

            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none text-white drop-shadow-[0_0_30px_rgba(245,158,11,0.45)]">
              Live Music
              <span className="block text-[#F59E0B]">Every Saturday</span>
            </h1>

            <p className="mt-7 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
              Starting in June, Dozer’s Grill is bringing live local music to
              Mesa every Saturday with afternoon and evening performances.
            </p>
          </div>

          <div className="rounded-3xl border border-[#F59E0B]/30 bg-[#111827]/80 p-8 shadow-[0_0_45px_-12px_rgba(245,158,11,0.55)]">
            <Music2 className="h-12 w-12 text-[#F59E0B] mb-6" />
            <h2 className="text-3xl font-[Playfair_Display] text-white mb-4">
              Cold Drinks. Good Food. Live Music.
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Come early for food and drinks, stay late for the music. No
              complicated plans — just a good Saturday at Dozer’s.
            </p>

            <div className="mt-8 space-y-4 text-gray-300">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-[#29C3FF]" />
                <span>7012 E Hampton Ave, Mesa, AZ 85209</span>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-[#29C3FF]" />
                <span>Shows at 3:00 PM and 7:00 PM</span>
              </div>
              <div className="flex gap-3">
                <CalendarDays className="h-5 w-5 text-[#29C3FF]" />
                <span>Every Saturday in June</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LINEUP */}
      <section id="lineup" className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.35em] text-[#29C3FF] text-sm mb-4">
              Upcoming Shows
            </p>
            <h2 className="text-4xl md:text-5xl font-[Playfair_Display] text-white">
              July Lineup
            </h2>
          </div>

          <div className="space-y-12">
            {liveShows.map((show, i) => (
              <motion.article
                key={`${show.title}-${show.time}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="grid lg:grid-cols-[420px_1fr] gap-10 items-stretch rounded-3xl border bg-[#111827]/75 p-6 md:p-8 backdrop-blur-md overflow-hidden"
                style={{
                  borderColor: `${show.accent}55`,
                  boxShadow: `0 0 45px -14px ${show.accent}`,
                }}
              >
                {/* LEFT INFO */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div
                      className="inline-flex flex-col rounded-2xl border px-6 py-5 bg-[#0d1117]/80 mb-8"
                      style={{
                        borderColor: `${show.accent}80`,
                        boxShadow: `0 0 25px -12px ${show.accent}`,
                      }}
                    >
                      <span
                        className="text-sm uppercase tracking-[0.25em] font-bold"
                        style={{ color: show.accent }}
                      >
                        {show.weekday}
                      </span>

                      <span
                        className="text-lg uppercase font-black mt-2"
                        style={{ color: show.accent }}
                      >
                        {show.month}
                      </span>

                      <span className="text-7xl font-black text-white leading-none mt-2">
                        {show.day}
                      </span>
                    </div>

                    <h3
                      className="text-4xl md:text-5xl font-black uppercase leading-none mb-6"
                      style={{ color: show.accent }}
                    >
                      {show.title}
                    </h3>

                    <div className="space-y-4 text-gray-300 mb-8">
                      <div className="flex items-center gap-3">
                        <CalendarDays className="h-5 w-5 text-[#29C3FF]" />
                        <span>{show.date}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-[#29C3FF]" />
                        <span>{show.time}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed text-lg">
                      {show.desc}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {show.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-wider text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BIG POSTER */}
                <div
                  className="relative flex items-center justify-center min-h-[520px] lg:min-h-[720px] rounded-2xl overflow-hidden border bg-[#05070a] p-4 md:p-6"
                  style={{
                    borderColor: `${show.accent}55`,
                    boxShadow: `0 0 40px -14px ${show.accent}`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-30 blur-3xl scale-110"
                    style={{
                      background: `radial-gradient(circle, ${show.accent}55 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={show.image}
                      alt={`${show.title} poster`}
                      width={900}
                      height={1400}
                      className="w-auto h-auto max-h-[680px] lg:max-h-[820px] object-contain rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.55)]"
                      priority={i < 2}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#10B981]/30 bg-[#111827]/80 p-10 text-center shadow-[0_0_35px_-12px_rgba(16,185,129,0.5)]">
          <h2 className="text-4xl font-[Playfair_Display] text-white mb-4">
            Make It A Dozer’s Night
          </h2>
          <p className="text-gray-300 mb-8">
            Grab your crew, come hungry, and stay for the show.
          </p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Dozers+Grill+7012+E+Hampton+Ave+Mesa+AZ+85209"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="border-0 text-white bg-gradient-to-r from-[#10B981] to-[#29C3FF] px-10 py-5 rounded-full text-lg tracking-wider hover:scale-105 transition-transform">
              Get Directions
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}