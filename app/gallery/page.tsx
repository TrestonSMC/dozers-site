"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [glowColor, setGlowColor] = useState("#29C3FF");

  // 🪣 Supabase public gallery folder
  const supabaseBase =
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/gallery";

  // 🎥 Supabase hero background video
  const supabaseVideo =
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-videos/hero.mp4";

  // 🌈 Glow palette
  const glowPalette = ["#29C3FF", "#F59E0B", "#8B5CF6", "#10B981"];

  useEffect(() => {
    // Only 4 photos
    setImages(["gallery1.png", "gallery2.png", "gallery3.png", "gallery4.png"]);
  }, []);

  const nextImage = () => {
    setCurrent((prev) => {
      const next = prev === images.length - 1 ? 0 : prev + 1;
      setGlowColor(glowPalette[next % glowPalette.length]);
      return next;
    });
  };

  const prevImage = () => {
    setCurrent((prev) => {
      const next = prev === 0 ? images.length - 1 : prev - 1;
      setGlowColor(glowPalette[next % glowPalette.length]);
      return next;
    });
  };

  const cacheBuster = `?v=${Date.now()}`;

  return (
    <div className="relative bg-[#0d1117] text-gray-100 min-h-screen overflow-hidden flex flex-col">
      {/* 🎥 Hero Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover brightness-[0.6] blur-sm contrast-[1.05] z-0"
      >
        <source src={supabaseVideo} type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-[#0d1117]/60 to-[#0d1117]/90 z-0" />

      {/* 🔹 Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-[#0d1117]/70 backdrop-blur-md border-b border-[#29C3FF]/30 z-50">
        <Link href="/">
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Grill Logo"
            width={140}
            height={60}
            className="drop-shadow-[0_0_15px_rgba(41,195,255,0.4)] cursor-pointer"
          />
        </Link>
        <Link
          href="/"
          className="text-sm uppercase tracking-wider text-gray-300 border border-[#29C3FF]/40 px-4 py-2 rounded-md hover:bg-[#29C3FF]/10 hover:text-[#F59E0B] transition"
        >
          Home
        </Link>
      </header>

      {/* 🔹 Header Text */}
      <section className="pt-32 pb-10 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-[Playfair_Display] font-bold text-white drop-shadow-[0_0_35px_rgba(245,158,11,0.6)]">
          The Gallery
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed mt-6 max-w-2xl mx-auto px-6">
          A glimpse inside Dozers Grill — the food, the games, and the nightlife. Explore the
          atmosphere that makes Dozers a true experience.
        </p>
      </section>

      {/* 🔹 Main Image */}
      <section className="relative flex justify-center items-center px-6 md:px-20 z-10">
        <motion.div
          key={current}
          animate={{
            boxShadow: [
              `0 0 40px 0 ${glowColor}40`,
              `0 0 70px 0 ${glowColor}80`,
              `0 0 40px 0 ${glowColor}40`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full max-w-5xl h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-[#29C3FF]/30 bg-black/40 backdrop-blur-sm"
          style={{
            boxShadow: `0 0 40px -10px ${glowColor}`,
            transition: "box-shadow 0.6s ease-in-out",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={`${supabaseBase}/${images[current]}${cacheBuster}`}
                alt={`Gallery image ${current + 1}`}
                fill
                priority
                className="object-cover rounded-2xl"
              />
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition"
          >
            <ChevronRight size={28} />
          </button>
        </motion.div>
      </section>

      {/* 🔹 Thumbnails */}
      <section className="mt-10 px-6 md:px-20 pb-20 relative z-10">
        <div className="flex justify-center flex-wrap gap-4 max-w-5xl mx-auto">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setCurrent(i);
                setGlowColor(glowPalette[i % glowPalette.length]);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border-2 transition ${
                current === i
                  ? "border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={`${supabaseBase}/${img}${cacheBuster}`}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* 🔹 Footer */}
      <footer className="py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/90 backdrop-blur-md text-center text-gray-400 mt-auto relative z-10">
        © 2025 Dozers Grill • All Rights Reserved
      </footer>
    </div>
  );
}




