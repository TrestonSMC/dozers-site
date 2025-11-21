"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  // ⭐ Load all events from API (auto-sorted by date)
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (!data.events) return setEvents([]);

        const now = new Date();

        // ⭐ Filter out past events
        const upcoming = data.events.filter((ev: any) => {
          return new Date(ev.rawDate).getTime() >= now.getTime();
        });

        // ⭐ Sort by date
        const sorted = upcoming.sort(
          (a: any, b: any) =>
            new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
        );

        // ⭐ Only keep the next 7 upcoming events
        setEvents(sorted.slice(0, 7));
      } catch {
        setEvents([]);
      }
    };

    loadEvents();
  }, []);

  // ⭐ Color rotation
  const eventColors = [
    "#29C3FF",
    "#F59E0B",
    "#10B981",
    "#EC4899",
    "#3B82F6",
    "#F97316",
  ];

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-gray-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('/images/events-bg.jpg')] bg-cover bg-center opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117]/70 via-[#0d1117]/80 to-[#0d1117]/95 pointer-events-none" />

      {/* Navigation */}
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

      {/* Page Header */}
      <section className="relative text-center py-40 z-10">
        <h1 className="text-6xl font-[Playfair_Display] font-bold text-white drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]">
          Dozers Grill Weekly Events
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          The next 7 upcoming events — updated automatically.
        </p>
      </section>

      {/* Content */}
      <main className="relative z-10 px-6 md:px-20 pb-24">
        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          {events.length === 0 ? (
            <p className="text-gray-500 text-center text-lg">
              No upcoming events found.
            </p>
          ) : (
            events.map((event: any, i: number) => {
              const reverse = i % 2 === 1;
              const color = eventColors[i % eventColors.length];

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
                    borderColor: `${color}40`,
                    boxShadow: `0 0 25px -6px ${color}`,
                  }}
                >
                  <div className="flex-1 text-center md:text-left">
                    <h2
                      className="text-3xl font-semibold mb-2"
                      style={{ color }}
                    >
                      {event.title}
                    </h2>

                    <p className="text-gray-400 mb-2 italic">
                      {event.time}
                    </p>

                    <p className="text-gray-300 leading-relaxed">
                      {event.desc || "No description available."}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ⭐ View Full Calendar Button */}
        <div className="text-center mt-16">
          <Link href="/events/calendar">
            <Button className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-4 rounded-full text-lg tracking-wider hover:scale-105 transition-transform shadow-[0_0_25px_-5px_rgba(41,195,255,0.5)]">
              View Full Calendar
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md relative z-10 text-gray-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <p>© 2025 Dozers Grill • All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}


