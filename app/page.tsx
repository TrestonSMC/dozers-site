"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { INSIDER_POSTS } from "@/lib/dozers-insider";

type Review = {
  author: string;
  rating: number;
  text: string;
  time?: string;
  profile?: string;
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [events, setEvents] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const getRating = (rating: any) => {
    if (typeof rating === "number") return rating;
    if (typeof rating === "string") {
      const match = rating.match(/\d+(\.\d+)?/);
      return match ? Number(match[0]) : 0;
    }
    return 0;
  };

  const fourAndFiveStarReviews = reviews.filter((r) => getRating(r.rating) >= 4);

  const supabaseBase =
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-videos";

  const liveMusicSchedule = [
    {
      date: "Sat June 6",
      acts: [
        { time: "3PM", name: "Poor Barbie" },
        { time: "7PM", name: "Tim Apple" },
      ],
    },
    {
      date: "Sat June 13",
      acts: [
        { time: "3PM", name: "Arizona Avenue" },
        { time: "7PM", name: "Notes From Neptune" },
      ],
    },
    {
      date: "Sat June 20",
      acts: [
        { time: "3PM", name: "Stilettos" },
        { time: "7PM", name: "Jake Dean" },
      ],
    },
    {
      date: "Sat June 27",
      acts: [
        { time: "3PM", name: "Doc Baldi" },
        { time: "7PM", name: "Harry McGraw Trio" },
      ],
    },
  ];

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        const data = await res.json();

        const all = data.events || [];
        const now = new Date();

        const upcoming = all.filter((ev: any) => {
          if (!ev.rawDate) return false;
          const d = new Date(ev.rawDate);
          return d >= now;
        });

        upcoming.sort(
          (
            a: { rawDate: string | number | Date },
            b: { rawDate: string | number | Date }
          ) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
        );

        setEvents(upcoming);
      } catch {
        setEvents([]);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Reviews API failed with status ${res.status}`);
        }

        const data = await res.json();

        console.log("REVIEWS API RESPONSE:", data);

        const incomingReviews =
          data?.reviews ||
          data?.result?.reviews ||
          data?.data?.reviews ||
          [];

        const normalizedReviews: Review[] = incomingReviews
          .map((r: any) => ({
            author: r.author || r.author_name || r.name || "Guest",
            rating: getRating(r.rating),
            text: r.text || r.review || "",
            time: r.time || r.relative_time_description || "",
            profile: r.profile || r.profile_photo_url || "",
          }))
          .filter((r: Review) => r.text && r.rating > 0);

        setReviews(normalizedReviews);
      } catch (err) {
        console.error("Failed to load reviews:", err);
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  const eventColors = ["#29C3FF", "#F59E0B", "#10B981"];

  const insiderScrollRef = useRef<HTMLDivElement>(null);

  const scrollInsider = (dir: "left" | "right") => {
    const el = insiderScrollRef.current;
    if (!el) return;

    const amount = Math.max(280, Math.floor(el.clientWidth * 0.75));

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative bg-[#0d1117] text-gray-100 overflow-x-hidden">
      <style>{`
        .dozers-insider-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .dozers-insider-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover brightness-[0.8] contrast-[1.05] z-0"
      >
        <source src={`${supabaseBase}/hero.mp4`} type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#0d1117]/40 to-[#0d1117]/90 z-0" />

      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-5 z-50 backdrop-blur-md bg-[#0d1117]/70 border-b border-[#29C3FF]/20">
        <Link href="/" aria-label="Dozers Grill Home">
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Grill Logo"
            width={140}
            height={60}
            className="drop-shadow-[0_0_20px_rgba(41,195,255,0.4)]"
          />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white border border-[#29C3FF]/40 px-4 py-2 rounded-md hover:bg-[#29C3FF]/10 transition"
        >
          {menuOpen ? "Close ✕" : "Menu ☰"}
        </button>

        {menuOpen && (
          <div className="absolute top-full right-8 mt-2 w-64 bg-[#111827]/95 border border-[#29C3FF]/30 rounded-xl shadow-lg backdrop-blur-lg z-50">
            <ul className="flex flex-col text-center py-3 text-sm uppercase tracking-wider">
              {[
                { label: "About", href: "/about" },
                { label: "Menu", href: "/menu" },
                { label: "Gallery", href: "/gallery" },
                { label: "Events", href: "/events" },
                { label: "Live Music", href: "/live-music" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-3 hover:bg-[#29C3FF]/10 text-gray-300 hover:text-[#F59E0B] transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/70 via-transparent to-transparent z-0" />

        <h1 className="text-5xl md:text-7xl font-[Playfair_Display] font-bold text-white drop-shadow-[0_0_35px_rgba(245,158,11,0.6)] z-10">
          Welcome to Dozers Grill
        </h1>

        <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-2xl z-10">
          Great food, cold drinks, and good company.
          <br /> Open daily until 2 AM.
        </p>

        <div className="mt-10 z-10">
          <Link href="/menu">
            <Button className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-5 rounded-full text-lg tracking-wider hover:scale-105 transition-transform">
              View Menu
            </Button>
          </Link>
        </div>
      </section>

      <section
        id="experience"
        className="relative py-24 px-6 md:px-20 border-t border-[#10B981]/20 bg-[#111827]/70 backdrop-blur-md overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center z-10">
          <h2 className="text-4xl font-[Playfair_Display] mb-6 text-white drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">
            The Experience
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Step into Dozers Grill, a full-service restaurant and bar where
            great food, drink specials, and handcrafted cocktails set the stage.
            Paired with a vibrant atmosphere, weekly events, and recurring
            nights, every visit feels familiar — and never the same.
          </p>

          <Link href="/gallery">
            <Button className="border-0 text-white bg-gradient-to-r from-[#10B981] to-[#29C3FF] px-8 py-4 rounded-full text-lg tracking-wider hover:scale-105 transition-transform shadow-[0_0_25px_-5px_rgba(16,185,129,0.6)]">
              View Photo Gallery
            </Button>
          </Link>
        </div>
      </section>

      <section
        id="live-music"
        className="py-24 px-6 md:px-20 border-t border-[#F59E0B]/20 bg-[#0d1117]/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.3em] text-[#F59E0B] text-sm mb-4">
              Stage @ Dozers
            </p>

            <h2 className="text-4xl md:text-5xl font-[Playfair_Display] text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.45)]">
              Live Music Every Saturday In June
            </h2>

            <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
              Join us for live local music, cold drinks, handcrafted cocktails,
              and weekend energy all month long at Dozers Grill.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {liveMusicSchedule.map((show, i) => (
              <motion.div
                key={show.date}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl border border-[#F59E0B]/20 bg-[#111827]/70 backdrop-blur-md p-8 shadow-[0_0_30px_-8px_rgba(245,158,11,0.35)] hover:scale-[1.02] transition-transform"
              >
                <div className="mb-6">
                  <p className="text-[#F59E0B] uppercase tracking-[0.25em] text-xs mb-2">
                    Live Music
                  </p>

                  <h3 className="text-3xl font-[Playfair_Display] text-white">
                    {show.date}
                  </h3>
                </div>

                <div className="space-y-5">
                  {show.acts.map((act) => (
                    <div
                      key={act.name}
                      className="flex items-center justify-between gap-5 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[#29C3FF] font-semibold tracking-wide whitespace-nowrap">
                        {act.time}
                      </span>

                      <span className="text-gray-200 text-right font-medium">
                        {act.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-gray-400 text-sm mb-6">
              7012 E Hampton Ave • Mesa, Arizona
            </p>

            <Link href="/live-music">
              <Button className="border-0 text-white bg-gradient-to-r from-[#F59E0B] to-[#29C3FF] px-10 py-5 rounded-full text-lg tracking-wider hover:scale-105 transition-transform">
                View Live Music
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="events"
        className="py-24 px-6 md:px-20 text-center border-t border-[#29C3FF]/20 bg-[#111827]/80 backdrop-blur-md"
      >
        <h2 className="text-4xl md:text-5xl font-[Playfair_Display] text-white mb-10 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-500 text-sm">Events coming soon...</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-16">
              {events.slice(0, 3).map((event, i) => {
                const color = eventColors[i % eventColors.length];

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-8 rounded-xl border bg-[#1a1f2a]/80 backdrop-blur-md hover:scale-[1.02] transition-transform"
                    style={{
                      borderColor: `${color}40`,
                      boxShadow: `0 0 25px -5px ${color}`,
                    }}
                  >
                    <h3
                      className="text-2xl font-semibold mb-2"
                      style={{ color }}
                    >
                      {event.title}
                    </h3>

                    <p className="text-gray-400 mb-3 text-sm">{event.time}</p>

                    <p className="text-gray-300 text-base leading-relaxed">
                      {event.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/events">
                <Button className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-4 rounded-full text-lg tracking-wider hover:scale-105 transition-transform">
                  View All Events
                </Button>
              </Link>

              <Link href="/submit-event">
                <Button className="border border-[#10B981] text-[#10B981] bg-transparent px-10 py-4 rounded-full text-lg tracking-wider hover:bg-[#10B981]/10 hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)]">
                  Submit an Event
                </Button>
              </Link>
            </div>
          </>
        )}
      </section>

      <section
        id="contact"
        className="py-24 px-6 md:px-20 border-t border-[#F59E0B]/20 bg-[#111827]/70 backdrop-blur-md"
      >
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-[Playfair_Display] mb-6 text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
              Visit Dozers Grill
            </h2>

            <p className="text-gray-300 mb-2 text-lg">
              7012 E Hampton Ave, Mesa, AZ 85209
            </p>

            <p className="text-gray-300 mb-2 text-lg">(602) 694-5551</p>

            <p className="text-gray-400 mb-8 text-sm">
              Kitchen: Sun–Thurs 10 AM – 10 PM • Fri–Sat 10 AM – 12 AM
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Dozers+Grill+7012+E+Hampton+Ave+Mesa+AZ+85209"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-8 py-4 rounded-full hover:scale-105 transition-transform">
                Get Directions
              </Button>
            </a>
          </div>

          <div className="flex-1 w-full rounded-2xl overflow-hidden border border-[#29C3FF]/30 shadow-[0_0_25px_-5px_rgba(41,195,255,0.4)]">
            <iframe
              title="Dozers Grill Map"
              src="https://www.google.com/maps?q=Dozers+Grill+Mesa+AZ&hl=en&z=15&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-20 text-center border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md">
        <h2 className="text-4xl font-[Playfair_Display] text-white mb-10 drop-shadow-[0_0_25px_rgba(41,195,255,0.5)]">
          Top Customer Reviews
        </h2>

        {loadingReviews ? (
          <p className="text-gray-400">Loading reviews...</p>
        ) : fourAndFiveStarReviews.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No top reviews yet. Check the console for the reviews API response.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {fourAndFiveStarReviews.slice(0, 6).map((r, i) => (
              <motion.div
                key={`${r.author}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111827]/70 border border-[#29C3FF]/20 rounded-2xl p-6 shadow-[0_0_25px_-5px_rgba(41,195,255,0.3)]"
              >
                <div className="flex flex-col items-center mb-3">
                  {r.profile && (
                    <img
                      src={r.profile}
                      alt={r.author}
                      className="w-10 h-10 rounded-full border border-[#29C3FF]/40 mb-2 object-cover"
                    />
                  )}

                  <p className="text-[#29C3FF] font-semibold">{r.author}</p>

                  {r.time && <p className="text-gray-500 text-xs">{r.time}</p>}
                </div>

                <div className="flex justify-center text-[#F59E0B] mb-3 text-sm">
                  {"★".repeat(Math.round(getRating(r.rating)))}
                </div>

                <p className="text-gray-300 italic leading-relaxed">
                  “{r.text}”
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="py-20 px-6 md:px-20 border-t border-[#10B981]/20 bg-[#111827]/70 backdrop-blur-md overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
            <div className="text-left">
              <h2 className="text-4xl font-[Playfair_Display] text-white drop-shadow-[0_0_25px_rgba(16,185,129,0.45)]">
                Dozers Insider
              </h2>

              <p className="text-gray-300 mt-2 text-sm">
                Local guides, food highlights, and what&apos;s going on at
                Dozers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollInsider("left")}
                aria-label="Scroll left"
                className="h-11 w-11 rounded-full border border-[#10B981]/30 bg-[#0d1117]/50 hover:bg-[#10B981]/10 transition shadow-[0_0_18px_-8px_rgba(16,185,129,0.6)] flex items-center justify-center"
              >
                <span className="text-white text-xl">‹</span>
              </button>

              <button
                onClick={() => scrollInsider("right")}
                aria-label="Scroll right"
                className="h-11 w-11 rounded-full border border-[#10B981]/30 bg-[#0d1117]/50 hover:bg-[#10B981]/10 transition shadow-[0_0_18px_-8px_rgba(16,185,129,0.6)] flex items-center justify-center"
              >
                <span className="text-white text-xl">›</span>
              </button>
            </div>
          </div>

          <div className="relative -mx-6 md:-mx-20">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-14 z-10 bg-gradient-to-r from-[#111827] via-[#111827] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-14 z-10 bg-gradient-to-l from-[#111827] via-[#111827] to-transparent" />

            <div
              ref={insiderScrollRef}
              className="dozers-insider-scroll flex gap-6 overflow-x-auto scroll-smooth pb-4 px-6 md:px-20"
            >
              {INSIDER_POSTS.map((post, i) => (
                <motion.div
                  key={post.href}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] p-7 rounded-2xl border border-[#10B981]/20 bg-[#1a1f2a]/70 backdrop-blur-md text-left shadow-[0_0_25px_-8px_rgba(16,185,129,0.45)] hover:scale-[1.02] transition-transform"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-5">
                    {post.desc}
                  </p>

                  <Link
                    href={post.href}
                    className="inline-flex items-center gap-2 text-[#29C3FF] hover:text-[#F59E0B] transition font-semibold"
                  >
                    Read more <span aria-hidden>→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md text-center text-gray-400 text-sm">
        <div className="space-y-3">
          <p>© 2025 Dozers Grill • All Rights Reserved</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[#29C3FF]">
            <Link
              href="/privacy-policy"
              className="hover:text-[#F59E0B] underline underline-offset-4 transition"
            >
              Privacy Policy
            </Link>

            <span className="hidden sm:block text-gray-500">|</span>

            <Link
              href="/sms-terms-and-conditions"
              className="hover:text-[#F59E0B] underline underline-offset-4 transition"
            >
              SMS Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}













































