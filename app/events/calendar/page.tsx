"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const eventColors = ["#29C3FF", "#F59E0B", "#10B981", "#EC4899", "#3B82F6", "#F97316"];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

// Key by LOCAL date (so it matches what users expect on the calendar)
function ymdLocal(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

// Monday-start week
function startOfWeekMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay(); // 0=Sun..6=Sat
  const diff = (day === 0 ? 6 : day - 1); // how many days since Monday
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  // Build a full 6-week grid (42 days), including spillover days
  const { gridStart, gridDays } = useMemo(() => {
    const firstOfMonth = new Date(year, month, 1);
    const start = startOfWeekMonday(firstOfMonth);

    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }

    return { gridStart: start, gridDays: days };
  }, [month, year]);

  const gridEndExclusive = useMemo(() => {
    const d = new Date(gridStart);
    d.setDate(d.getDate() + 42);
    return d;
  }, [gridStart]);

  // Fetch events for the visible grid range (and auto-refresh)
  useEffect(() => {
    let cancelled = false;

    const loadEvents = async () => {
      try {
        // Use UTC ISO strings for the API, but the range itself is based on visible LOCAL grid dates
        const start = new Date(Date.UTC(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate()));
        const end = new Date(
          Date.UTC(gridEndExclusive.getFullYear(), gridEndExclusive.getMonth(), gridEndExclusive.getDate())
        );

        const qs = new URLSearchParams({
          start: start.toISOString(),
          end: end.toISOString(),
        });

        const res = await fetch(`/api/events?${qs.toString()}`, { cache: "no-store" });
        const data = await res.json();

        const sorted = (data.events ?? []).sort(
          (a: any, b: any) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
        );

        if (!cancelled) setEvents(sorted);
      } catch {
        if (!cancelled) setEvents([]);
      }
    };

    loadEvents();
    const id = setInterval(loadEvents, 120_000); // refresh every 2 mins

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [gridStart, gridEndExclusive]);

  // Group by date key (YYYY-MM-DD local)
  const eventsByDate: Record<string, any[]> = useMemo(() => {
    const map: Record<string, any[]> = {};
    events.forEach((ev, idx) => {
      const d = new Date(ev.rawDate);
      const key = ymdLocal(d);
      if (!map[key]) map[key] = [];
      map[key].push({
        ...ev,
        color: eventColors[idx % eventColors.length],
      });
    });
    return map;
  }, [events]);

  // Navigation
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));

  const monthLabel = currentMonth.toLocaleString("en-US", { month: "long" });

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

      {/* TITLE */}
      <section className="text-center pt-40 pb-10 relative z-10">
        <h1 className="text-6xl font-[Playfair_Display] font-bold drop-shadow-[0_0_30px_rgba(41,195,255,0.5)]">
          Full Event Calendar
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Automatically updated from Dozers’ 7shifts schedule.
        </p>
      </section>

      {/* MONTH SWITCHER */}
      <div className="flex justify-center items-center gap-6 text-xl font-semibold relative z-10 mb-10">
        <button onClick={prevMonth} className="px-4 py-2 hover:text-[#29C3FF] transition">
          ← Prev
        </button>

        <span className="text-3xl drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          {monthLabel} {year}
        </span>

        <button onClick={nextMonth} className="px-4 py-2 hover:text-[#29C3FF] transition">
          Next →
        </button>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-7 gap-4 max-w-6xl mx-auto px-6 relative z-10 mb-20">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            className="text-center text-gray-300 font-semibold border-b border-[#29C3FF]/30 pb-2"
          >
            {d}
          </div>
        ))}

        {gridDays.map((dateObj, i) => {
          const key = ymdLocal(dateObj);
          const dayEvents = eventsByDate[key] || [];

          const isToday =
            key === ymdLocal(new Date());

          const isInCurrentMonth = dateObj.getMonth() === month && dateObj.getFullYear() === year;

          return (
            <div
              key={`${key}-${i}`}
              className={`min-h-[120px] rounded-xl p-3 border border-white/10 bg-[#111827]/60 backdrop-blur-md transition hover:scale-[1.02] shadow-[0_0_15px_rgba(0,0,0,0.4)]
                ${isToday ? "ring-2 ring-[#29C3FF] shadow-[0_0_25px_#29C3FF]" : ""}
                ${!isInCurrentMonth ? "opacity-60" : ""}
              `}
            >
              <p
                className={`font-semibold mb-2 ${
                  isToday
                    ? "text-[#29C3FF] font-bold drop-shadow-[0_0_12px_rgba(41,195,255,0.9)]"
                    : isInCurrentMonth
                      ? "text-gray-300"
                      : "text-gray-400"
                }`}
              >
                {dateObj.getDate()}
              </p>

              {dayEvents.map((ev, idx) => (
                <button
                  key={`${ev.id}-${idx}`}
                  onClick={() => setSelectedEvent(ev)}
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

      {/* MOBILE LIST */}
      <div className="md:hidden px-6 relative z-10">
        {gridDays
          .filter((d) => d.getMonth() === month && d.getFullYear() === year)
          .flatMap((d) => (eventsByDate[ymdLocal(d)] ?? []))
          .map((ev, i) => {
            const d = new Date(ev.rawDate);
            const color = ev.color || eventColors[i % eventColors.length];

            return (
              <button
                key={`${ev.id}-${i}`}
                onClick={() => setSelectedEvent(ev)}
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

                <h2 className="text-xl font-semibold mb-1" style={{ color }}>
                  {ev.title}
                </h2>

                <p className="text-gray-400">{ev.time}</p>
              </button>
            );
          })}
      </div>

      {/* MODAL */}
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



