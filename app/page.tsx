"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ⭐ Dynamic events
  const [events, setEvents] = useState<any[]>([]);

  // ⭐ Dynamic reviews
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // ⭐ FILTER: Show 4 & 5 star reviews only
  const fourAndFiveStarReviews = reviews.filter((r) => Number(r.rating) >= 4);

  const supabaseBase =
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-videos";

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.muted = false;
      video.play();
      setIsPlaying(true);
    }
  };

  // ⭐ Load events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();

        const all = data.events || [];
        const now = new Date();

        // ⭐ ONLY future events
        const upcoming = all.filter((ev: any) => {
          if (!ev.rawDate) return false;
          const d = new Date(ev.rawDate);
          return d >= now;
        });

        // ⭐ Sort future events by date
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

  // ⭐ Load reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data?.reviews || []);
      } catch {
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  // ⭐ Colors to rotate for event cards
  const eventColors = ["#29C3FF", "#F59E0B", "#10B981"];

  return (
    <div className="relative bg-[#0d1117] text-gray-100 overflow-x-hidden">
      {/* Background video */}
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

      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-5 z-50 backdrop-blur-md bg-[#0d1117]/70 border-b border-[#29C3FF]/20">
        <Image
          src="/images/dozers-logo.png"
          alt="Dozers Grill Logo"
          width={140}
          height={60}
          className="drop-shadow-[0_0_20px_rgba(41,195,255,0.4)]"
        />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white border border-[#29C3FF]/40 px-4 py-2 rounded-md hover:bg-[#29C3FF]/10 transition"
        >
          {menuOpen ? "Close ✕" : "Menu ☰"}
        </button>

        {menuOpen && (
          <div className="absolute top-full right-8 mt-2 w-56 bg-[#111827]/95 border border-[#29C3FF]/30 rounded-xl shadow-lg backdrop-blur-lg z-50">
            <ul className="flex flex-col text-center py-3 text-sm uppercase tracking-wider">
              {["about", "gallery", "events", "contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item}`}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-3 hover:bg-[#29C3FF]/10 text-gray-300 hover:text-[#F59E0B] transition"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* HERO */}
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

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="relative py-24 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10 border-t border-[#10B981]/20 bg-[#111827]/70 backdrop-blur-md overflow-hidden"
      >
        <div className="flex-1 text-center md:text-left z-10">
          <h2 className="text-4xl font-[Playfair_Display] mb-6 text-white drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">
            The Experience
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Step into Dozers Grill, a full-service restaurant and bar where great
            food, drink specials, and handcrafted cocktails set the stage. Paired
            with a vibrant atmosphere, weekly events, and recurring nights, every
            visit feels familiar — and never the same.
          </p>

          <Link href="/gallery">
            <Button className="border-0 text-white bg-gradient-to-r from-[#10B981] to-[#29C3FF] px-8 py-4 rounded-full text-lg tracking-wider hover:scale-105 transition-transform shadow-[0_0_25px_-5px_rgba(16,185,129,0.6)]">
              View Photo Gallery
            </Button>
          </Link>
        </div>

        <div className="relative flex-1 z-10 w-full">
          <div className="relative rounded-lg overflow-hidden shadow-[0_0_40px_-5px_rgba(16,185,129,0.5)] border border-[#10B981]/20">
            <video
              ref={videoRef}
              loop
              playsInline
              preload="auto"
              className="w-full h-auto rounded-lg cursor-pointer"
              onClick={toggleVideo}
            >
              <source src={`${supabaseBase}/experience.mp4`} type="video/mp4" />
            </video>
            {!isPlaying && (
              <button
                onClick={toggleVideo}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm hover:bg-black/30 transition"
              >
                <div className="p-4 rounded-full border border-white/30 shadow-[0_0_25px_rgba(16,185,129,0.6)] bg-[#10B981]/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    className="w-10 h-10"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* EVENTS — ONLY FUTURE EVENTS */}
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
                    <h3 className="text-2xl font-semibold mb-2" style={{ color }}>
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

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* VIEW ALL EVENTS */}
              <Link href="/events">
                <Button className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-4 rounded-full text-lg tracking-wider hover:scale-105 transition-transform">
                  View All Events
                </Button>
              </Link>

              {/* SUBMIT EVENT */}
              <Link href="/submit-event">
                <Button className="border border-[#10B981] text-[#10B981] bg-transparent px-10 py-4 rounded-full text-lg tracking-wider hover:bg-[#10B981]/10 hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)]">
                  Submit an Event
                </Button>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* LOCATION */}
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

            <Button className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-8 py-4 rounded-full hover:scale-105 transition-transform">
              Get Directions
            </Button>
          </div>

          {/* Map */}
          <div className="flex-1 w-full rounded-2xl overflow-hidden border border-[#29C3FF]/30 shadow-[0_0_25px_-5px_rgba(41,195,255,0.4)]">
            <iframe
              title="Dozers Grill Map"
              src="https://www.google.com/maps?q=Dozers+Grill+Mesa+AZ&hl=en&z=15&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 px-6 md:px-20 text-center border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md">
        <h2 className="text-4xl font-[Playfair_Display] text-white mb-10 drop-shadow-[0_0_25px_rgba(41,195,255,0.5)]">
          Top Customer Reviews
        </h2>

        {loadingReviews ? (
          <p className="text-gray-400">Loading reviews...</p>
        ) : fourAndFiveStarReviews.length === 0 ? (
          <p className="text-gray-500 text-sm">No top reviews yet</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {fourAndFiveStarReviews.map((r, i) => (
              <motion.div
                key={i}
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
                      className="w-10 h-10 rounded-full border border-[#29C3FF]/40 mb-2"
                    />
                  )}
                  <p className="text-[#29C3FF] font-semibold">{r.author}</p>
                  {r.time && <p className="text-gray-500 text-xs">{r.time}</p>}
                </div>

                <div className="flex justify-center text-[#F59E0B] mb-3 text-sm">
                  {"★".repeat(Number(r.rating))}
                </div>

                <p className="text-gray-300 italic leading-relaxed">“{r.text}”</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER (UPDATED: Privacy + SMS Terms links) */}
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


















































