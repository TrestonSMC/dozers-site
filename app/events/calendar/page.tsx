"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Glow colors for events
const eventColors = ["#29C3FF", "#F59E0B", "#10B981", "#EC4899", "#3B82F6", "#F97316"];

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null); // ⭐ MODAL STATE

  // ⭐ Fetch events (with rawDate)
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();

        const sorted = data.events.sort(
          (a: any, b: any) =>
            new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
        );

        setEvents(sorted);
      } catch {
        setEvents([]);
      }
    };

    loadEvents();
  }, []);

  // ------------------------
  // ⭐ Month Calculations
  // ------------------------
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const days = getDaysInMonth(month, year);

  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // ------------------------
  // ⭐ Sort events into days
  // ------------------------
  const eventsByDay: Record<number, any[]> = {};

  events.forEach((event, eventIndex) => {
    const date = new Date(event.rawDate);
    if (date.getMonth() === month && date.getFullYear() === year) {
      const day = date.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push({
        ...event,
        color: eventColors[eventIndex % eventColors.length]
      });
    }
  });

  // ⭐ Month Navigation
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-gray-100">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[url('/images/events-bg.jpg')] bg-cover bg-center opacity-25 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117]/80 to-[#0d1117]/95 pointer-events-none" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-50 bg-[#0d1117]/70 backdrop-blur-md border-b border-[#29C3FF]/20">
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
          href="/events"
          className="text-[#29C3FF] border border-[#29C3FF]/50 px-6 py-2 rounded-full text-sm uppercase tracking-wider hover:bg-[#29C3FF]/20 transition hover:shadow-[0_0_20px_#29C3FF]"
        >
          Back to Events
        </Link>
      </header>

      {/* PAGE TITLE */}
      <section className="text-center pt-40 pb-10 relative z-10">
        <h1 className="text-6xl font-[Playfair_Display] font-bold drop-shadow-[0_0_30px_rgba(41,195,255,0.5)]">
          Full Event Calendar
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Automatically updated from Dozers’ official 7shifts schedule.
        </p>
      </section>

      {/* MONTH SWITCHER */}
      <div className="flex justify-center items-center gap-6 text-xl font-semibold relative z-10 mb-10">
        <button
          onClick={prevMonth}
          className="px-4 py-2 hover:text-[#29C3FF] transition"
        >
          ← Prev
        </button>

        <span className="text-3xl drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          {currentMonth.toLocaleString("en-US", { month: "long" })} {year}
        </span>

        <button
          onClick={nextMonth}
          className="px-4 py-2 hover:text-[#29C3FF] transition"
        >
          Next →
        </button>
      </div>

      {/* DESKTOP GRID VIEW */}
      <div className="hidden md:grid grid-cols-7 gap-4 max-w-6xl mx-auto px-6 relative z-10 mb-20">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-gray-300 font-semibold border-b border-[#29C3FF]/30 pb-2"
          >
            {d}
          </div>
        ))}

        {[...Array(firstDayOfWeek)].map((_, i) => (
          <div key={`empty-${i}`} className="p-3 rounded-xl"></div>
        ))}

        {[...Array(days)].map((_, i) => {
          const day = i + 1;
          const dayEvents = eventsByDay[day] || [];

          return (
            <div
              key={day}
              className="min-h-[120px] rounded-xl p-3 border border-white/10 bg-[#111827]/60 backdrop-blur-md hover:scale-[1.02] transition shadow-[0_0_15px_rgba(0,0,0,0.4)]"
            >
              <p className="text-gray-300 font-semibold mb-2">{day}</p>

              {dayEvents.map((ev, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEvent(ev)} // ⭐ OPEN MODAL
                  className="text-left w-full text-xs px-2 py-1 rounded-md mb-1 transition hover:opacity-80"
                  style={{
                    backgroundColor: `${ev.color}30`,
                    borderLeft: `3px solid ${ev.color}`,
                    boxShadow: `0 0 10px ${ev.color}60`,
                  }}
                >
                  {ev.title}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {/* MOBILE LIST VIEW */}
      <div className="md:hidden px-6 relative z-10">
        {events
          .filter((ev) => {
            const d = new Date(ev.rawDate);
            return d.getMonth() === month && d.getFullYear() === year;
          })
          .map((ev, i) => {
            const d = new Date(ev.rawDate);
            const color = eventColors[i % eventColors.length];

            return (
              <button
                key={ev.id}
                onClick={() => setSelectedEvent(ev)} // ⭐ OPEN MODAL
                className="mb-6 p-4 w-full text-left rounded-xl border border-white/10 bg-[#111827]/70 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]"
                style={{
                  borderColor: `${color}40`,
                  boxShadow: `0 0 25px -6px ${color}`,
                }}
              >
                <p className="text-[#29C3FF] text-sm mb-1">
                  {d.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                <h2
                  className="text-xl font-semibold mb-1"
                  style={{ color }}
                >
                  {ev.title}
                </h2>

                <p className="text-gray-400">{ev.time}</p>
              </button>
            );
          })}
      </div>

      {/* ⭐ EVENT MODAL ⭐ */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-8 max-w-md w-[90%] text-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-3 text-[#29C3FF] drop-shadow-[0_0_10px_rgba(41,195,255,0.6)]">
              {selectedEvent.title}
            </h2>

            <p className="text-gray-300 mb-2 font-medium">
              {new Date(selectedEvent.rawDate).toLocaleString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>

            {selectedEvent.desc && (
              <p className="text-gray-400 whitespace-pre-line mb-6">
                {selectedEvent.desc}
              </p>
            )}

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-2 rounded-xl bg-[#29C3FF]/20 border border-[#29C3FF]/40 hover:bg-[#29C3FF]/30 transition text-[#29C3FF] font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          © 2025 Dozers Grill • All Rights Reserved
        </div>
      </footer>
    </div>
  );
}


