"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EventsPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // 🌐 Supabase base URL
  const supabaseBase =
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-videos";

  // 🎉 Events List
  const events = [
    {
      id: "geeks",
      title: "Geeks Who Drink",
      color: "#8B5CF6",
      desc: "A lively team trivia night where drinks flow and minds race. Bring your crew, battle across themed rounds, and win great bar prizes.",
      time: "Thursdays • 7PM – 10PM",
      video: `${supabaseBase}/geeks.mp4`,
    },
    {
      id: "tournaments",
      title: "Daily Tournaments",
      color: "#F59E0B",
      desc: "Compete daily in pool and dart tournaments. Casual or competitive — there’s action for everyone, every day.",
      time: "Every Day • Sign-ups at 6PM",
      video: `${supabaseBase}/daily-tournaments.mp4`,
    },
    {
      id: "karaoke",
      title: "Karaoke Night",
      color: "#EC4899",
      desc: "Grab the mic, pick your song, and sing your heart out! A night of music, fun, and good vibes.",
      time: "Wednesdays • 7PM",
    },
    {
      id: "poker",
      title: "Free Poker Night",
      color: "#10B981",
      desc: "No buy-in required — play Texas Hold’em for bar prizes and bragging rights with the Dozers crew.",
      time: "Fridays • 7PM",
    },
    {
      id: "bingo",
      title: "Bingo Night",
      color: "#3B82F6",
      desc: "Classic Bingo hosted every Monday night. Great prizes, drink specials, and laughs all around.",
      time: "Mondays • 7PM",
    },
    {
      id: "family",
      title: "Family Night",
      color: "#F97316",
      desc: "Bring the whole crew for $20 table time, great eats, and relaxed Sunday fun.",
      time: "Sundays • 5–9PM",
    },
  ];

  // 🎬 Handle play/pause per video
  const handlePlay = (id: string) => {
    if (activeVideo && activeVideo !== id) {
      const prev = document.getElementById(activeVideo) as HTMLVideoElement;
      if (prev) prev.pause();
    }

    const vid = document.getElementById(id) as HTMLVideoElement;
    if (!vid) return;

    if (activeVideo === id) {
      vid.pause();
      setActiveVideo(null);
    } else {
      vid.muted = false;
      vid.play();
      setActiveVideo(id);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-gray-100 overflow-hidden">
      {/* 🔹 Background */}
      <div className="fixed inset-0 bg-[url('/images/events-bg.jpg')] bg-cover bg-center opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117]/70 via-[#0d1117]/80 to-[#0d1117]/95 pointer-events-none" />

      {/* 🔹 Navigation */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-50 backdrop-blur-md bg-[#0d1117]/70 border-b border-[#29C3FF]/20">
        <Link href="/" className="flex items-center gap-3">
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
          className="text-[#29C3FF] border border-[#29C3FF]/50 px-6 py-2 rounded-full text-sm uppercase tracking-wider hover:bg-[#29C3FF]/20 hover:shadow-[0_0_20px_#29C3FF] transition"
        >
          Home
        </Link>
      </header>

      {/* 🔹 Page Header */}
      <section className="relative text-center py-40 z-10">
        <h1 className="text-6xl font-[Playfair_Display] font-bold text-white drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]">
          Dozers Grill Event Calendar
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Weekly events, prizes, and good vibes — all week long.
        </p>
      </section>

      {/* 🔹 Main Content */}
      <main className="relative z-10 px-6 md:px-20 pb-32">
        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          {events.map((event, i) => {
            const hasVideo = !!event.video;
            const reverse = i % 2 === 1;

            return (
              <div
                key={event.id}
                className={`relative flex flex-col ${
                  reverse ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-6 border border-white/10 bg-[#111827]/70 
                rounded-2xl p-6 backdrop-blur-md 
                shadow-[0_0_25px_-5px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.25)] 
                transition-all duration-500 hover:scale-[1.02]`}
                style={{
                  borderColor: `${event.color}40`,
                  boxShadow: `0 0 25px -6px ${event.color}`,
                }}
              >
                {/* 🎥 Video Section */}
                {hasVideo && (
                  <div className="flex-shrink-0 w-full md:w-[280px] aspect-[9/16] overflow-hidden rounded-xl border border-white/10 relative">
                    <video
                      id={event.id}
                      playsInline
                      loop
                      preload="auto"
                      muted
                      crossOrigin="anonymous"
                      controls={false}
                      className="w-full h-full object-cover rounded-xl cursor-pointer transition-transform duration-500 hover:scale-105"
                      onClick={() => handlePlay(event.id)}
                    >
                      <source src={event.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* ▶️ Overlay Button */}
                    {activeVideo !== event.id && (
                      <button
                        onClick={() => handlePlay(event.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition hover:bg-black/40"
                      >
                        <div
                          className="p-4 rounded-full border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                          style={{
                            backgroundColor: `${event.color}CC`,
                            boxShadow: `0 0 20px ${event.color}`,
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            stroke="none"
                            className="w-10 h-10"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </button>
                    )}
                  </div>
                )}

                {/* 📝 Text */}
                <div className="flex-1 text-center md:text-left">
                  <h2
                    className="text-3xl font-semibold mb-2"
                    style={{ color: event.color }}
                  >
                    {event.title}
                  </h2>
                  <p className="text-gray-400 mb-2 italic">{event.time}</p>
                  <p className="text-gray-300 leading-relaxed">{event.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 🔹 Footer */}
      <footer className="py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md relative z-10 text-gray-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <p>© 2025 Dozers Grill • All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
