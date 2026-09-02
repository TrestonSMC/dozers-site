"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Music2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type LiveMusicShow = {
  id: string;
  title: string;
  show_date: string;
  show_time: string;
  description: string;
  tags: string[];
  accent_color: string;
  poster_url: string;
};

function createLocalDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

function formatDay(value: string) {
  return String(createLocalDate(value).getDate());
}

function formatMonth(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
  })
    .format(createLocalDate(value))
    .toUpperCase();
}

function formatWeekday(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(createLocalDate(value));
}

function formatFullDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(createLocalDate(value));
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(":");
  const date = new Date();

  date.setHours(Number(hours), Number(minutes), 0, 0);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(
    2,
    "0"
  );
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function LiveMusicPage() {
  const supabase = useMemo(() => createClient(), []);

  const [shows, setShows] = useState<LiveMusicShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadShows() {
      setLoading(true);
      setLoadError("");

      const { data, error } = await supabase
        .from("live_music_shows")
        .select(
          `
            id,
            title,
            show_date,
            show_time,
            description,
            tags,
            accent_color,
            poster_url
          `
        )
        .eq("is_published", true)
        .gte("show_date", getTodayDate())
        .order("show_date", { ascending: true })
        .order("show_time", { ascending: true });

      if (error) {
        console.error("LIVE MUSIC LOAD ERROR:", error);
        setLoadError(
          "The upcoming lineup could not be loaded."
        );
        setLoading(false);
        return;
      }

      setShows((data ?? []) as LiveMusicShow[]);
      setLoading(false);
    }

    loadShows();
  }, [supabase]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0d1117] text-gray-100">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(41,195,255,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.18),transparent_35%),linear-gradient(to_bottom,#0d1117,#05070a)]" />

      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#29C3FF]/20 bg-[#0d1117]/70 px-6 py-6 backdrop-blur-md md:px-10">
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
          className="rounded-full border border-[#29C3FF]/50 px-5 py-2 text-[#29C3FF] transition hover:bg-[#29C3FF]/20"
        >
          Home
        </Link>
      </header>

      <section className="relative z-10 border-b border-white/10 px-6 pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#F59E0B]">
              Stage @ Dozer’s
            </p>

            <h1 className="text-5xl font-black uppercase leading-none text-white drop-shadow-[0_0_30px_rgba(245,158,11,0.45)] md:text-7xl">
              Live Music
              <span className="block text-[#F59E0B]">
                Every Saturday
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
              Dozer’s Grill brings live local music to
              Mesa every Saturday with afternoon and
              evening performances.
            </p>
          </div>

          <div className="rounded-3xl border border-[#F59E0B]/30 bg-[#111827]/80 p-8 shadow-[0_0_45px_-12px_rgba(245,158,11,0.55)]">
            <Music2 className="mb-6 h-12 w-12 text-[#F59E0B]" />

            <h2 className="mb-4 text-3xl font-[Playfair_Display] text-white">
              Cold Drinks. Good Food. Live Music.
            </h2>

            <p className="leading-relaxed text-gray-300">
              Come early for food and drinks, stay late
              for the music. No complicated plans—just a
              good Saturday at Dozer’s.
            </p>

            <div className="mt-8 space-y-4 text-gray-300">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#29C3FF]" />
                <span>
                  7012 E Hampton Ave, Mesa, AZ 85209
                </span>
              </div>

              <div className="flex gap-3">
                <Clock className="h-5 w-5 shrink-0 text-[#29C3FF]" />
                <span>
                  Afternoon and evening performances
                </span>
              </div>

              <div className="flex gap-3">
                <CalendarDays className="h-5 w-5 shrink-0 text-[#29C3FF]" />
                <span>Live music every Saturday</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="lineup"
        className="relative z-10 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#29C3FF]">
              Upcoming Shows
            </p>

            <h2 className="text-4xl font-[Playfair_Display] text-white md:text-5xl">
              Live Music Lineup
            </h2>
          </div>

          {loading && (
            <div className="flex min-h-80 items-center justify-center rounded-3xl border border-white/10 bg-[#111827]/60">
              <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#29C3FF]" />

                <p className="mt-4 text-sm text-gray-500">
                  Loading upcoming shows...
                </p>
              </div>
            </div>
          )}

          {!loading && loadError && (
            <div className="rounded-3xl border border-red-500/30 bg-red-500/10 px-6 py-12 text-center text-red-200">
              {loadError}
            </div>
          )}

          {!loading &&
            !loadError &&
            shows.length === 0 && (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#111827]/60 px-6 text-center">
                <Music2 className="h-12 w-12 text-[#29C3FF]" />

                <h3 className="mt-5 text-2xl font-bold text-white">
                  More shows coming soon
                </h3>

                <p className="mt-2 max-w-md text-gray-400">
                  Check back soon for the next live music
                  lineup at Dozer’s Grill.
                </p>
              </div>
            )}

          {!loading &&
            !loadError &&
            shows.length > 0 && (
              <div className="space-y-12">
                {shows.map((show, index) => {
                  const accent =
                    show.accent_color || "#29C3FF";

                  return (
                    <motion.article
                      key={show.id}
                      initial={{
                        opacity: 0,
                        y: 22,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.1,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(
                          index * 0.04,
                          0.2
                        ),
                      }}
                      className="grid items-stretch gap-10 overflow-hidden rounded-3xl border bg-[#111827]/75 p-6 backdrop-blur-md md:p-8 lg:grid-cols-[420px_1fr]"
                      style={{
                        borderColor: `${accent}55`,
                        boxShadow:
                          `0 0 45px -14px ${accent}`,
                      }}
                    >
                      <div className="flex flex-col justify-between">
                        <div>
                          <div
                            className="mb-8 inline-flex flex-col rounded-2xl border bg-[#0d1117]/80 px-6 py-5"
                            style={{
                              borderColor:
                                `${accent}80`,
                              boxShadow:
                                `0 0 25px -12px ${accent}`,
                            }}
                          >
                            <span
                              className="text-sm font-bold uppercase tracking-[0.25em]"
                              style={{ color: accent }}
                            >
                              {formatWeekday(
                                show.show_date
                              )}
                            </span>

                            <span
                              className="mt-2 text-lg font-black uppercase"
                              style={{ color: accent }}
                            >
                              {formatMonth(
                                show.show_date
                              )}
                            </span>

                            <span className="mt-2 text-7xl font-black leading-none text-white">
                              {formatDay(show.show_date)}
                            </span>
                          </div>

                          <h3
                            className="mb-6 text-4xl font-black uppercase leading-none md:text-5xl"
                            style={{ color: accent }}
                          >
                            {show.title}
                          </h3>

                          <div className="mb-8 space-y-4 text-gray-300">
                            <div className="flex items-center gap-3">
                              <CalendarDays className="h-5 w-5 shrink-0 text-[#29C3FF]" />

                              <span>
                                {formatFullDate(
                                  show.show_date
                                )}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <Clock className="h-5 w-5 shrink-0 text-[#29C3FF]" />

                              <span>
                                {formatTime(
                                  show.show_time
                                )}
                              </span>
                            </div>
                          </div>

                          {show.description && (
                            <p className="text-lg leading-relaxed text-gray-300">
                              {show.description}
                            </p>
                          )}
                        </div>

                        {show.tags?.length > 0 && (
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
                        )}
                      </div>

                      <div
                        className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-2xl border bg-[#05070a] p-4 md:p-6 lg:min-h-[720px]"
                        style={{
                          borderColor: `${accent}55`,
                          boxShadow:
                            `0 0 40px -14px ${accent}`,
                        }}
                      >
                        <div
                          className="absolute inset-0 scale-110 opacity-30 blur-3xl"
                          style={{
                            background:
                              `radial-gradient(circle, ${accent}55 0%, transparent 70%)`,
                          }}
                        />

                        <div className="relative flex h-full w-full items-center justify-center">
                          <img
                            src={show.poster_url}
                            alt={`${show.title} poster`}
                            loading={
                              index < 2
                                ? "eager"
                                : "lazy"
                            }
                            className="h-auto max-h-[680px] w-auto rounded-xl object-contain shadow-[0_0_40px_rgba(0,0,0,0.55)] lg:max-h-[820px]"
                          />
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070a]/10 via-transparent to-transparent" />
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#10B981]/30 bg-[#111827]/80 p-10 text-center shadow-[0_0_35px_-12px_rgba(16,185,129,0.5)]">
          <h2 className="mb-4 text-4xl font-[Playfair_Display] text-white">
            Make It A Dozer’s Night
          </h2>

          <p className="mb-8 text-gray-300">
            Grab your crew, come hungry, and stay for the
            show.
          </p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Dozers+Grill+7012+E+Hampton+Ave+Mesa+AZ+85209"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="rounded-full border-0 bg-gradient-to-r from-[#10B981] to-[#29C3FF] px-10 py-5 text-lg tracking-wider text-white transition-transform hover:scale-105">
              Get Directions
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}