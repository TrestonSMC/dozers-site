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

        const upcoming = all
          .filter((ev: any) => ev.rawDate && new Date(ev.rawDate) >= now)
          .sort(
            (a: any, b: any) =>
              new Date(a.rawDate).getTime() -
              new Date(b.rawDate).getTime()
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

      {/* HEADER */}
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

      {/* EVENTS */}
      <section className="py-24 px-6 md:px-20 text-center border-t border-[#29C3FF]/20 bg-[#111827]/80 backdrop-blur-md">
        <h2 className="text-4xl md:text-5xl font-[Playfair_Display] text-white mb-10">
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
                    className="p-8 rounded-xl border bg-[#1a1f2a]/80 backdrop-blur-md"
                    style={{
                      borderColor: `${color}40`,
                      boxShadow: `0 0 25px -5px ${color}`,
                    }}
                  >
                    <h3 className="text-2xl font-semibold mb-2" style={{ color }}>
                      {event.title}
                    </h3>
                    <p className="text-gray-400 mb-3 text-sm">{event.time}</p>
                    <p className="text-gray-300">{event.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <Link href="/events">
              <Button className="bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-4 rounded-full">
                View All Events
              </Button>
            </Link>
          </>
        )}
      </section>

      {/* ⭐⭐⭐⭐⭐ REVIEWS — RESTORED */}
      <section className="py-24 px-6 md:px-20 text-center border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md">
        <h2 className="text-4xl font-[Playfair_Display] text-white mb-10">
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
                <p className="text-[#29C3FF] font-semibold mb-1">{r.author}</p>
                <div className="text-[#F59E0B] mb-3">
                  {"★".repeat(Number(r.rating))}
                </div>
                <p className="text-gray-300 italic">“{r.text}”</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section className="py-24 px-6 md:px-20 border-t border-[#F59E0B]/20 bg-[#111827]/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-4 rounded-full">
              Get Directions
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md text-center text-gray-400">
        © 2025 Dozers Grill • All Rights Reserved
      </footer>
    </div>
  );
}



















































