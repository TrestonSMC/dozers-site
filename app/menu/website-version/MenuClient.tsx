"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { MenuCategory, MenuRow } from "@/lib/menu";

// ⭐ Featured photos by category name (add more anytime)
const featuredPhotosByCategory: Record<string, string> = {
  Appetizers:
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Baked%20Feta.png",
  Paninis:
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Pesto%20Panini.png",
  Pastas:
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Mac%20N%20Chz.png",
  Entrees:
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Ribs.png",
  Salads:
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Greek%20Salad.png",
};

// 🎨 Colors by category name (fallback cycles palette for new categories)
const fixedColors: Record<string, string> = {
  Appetizers: "#29C3FF",
  Paninis: "#EC4899",
  Pastas: "#3B82F6",
  Entrees: "#EF4444",
  Salads: "#10B981",
  Sides: "#FBBF24",
};

const palette = [
  "#29C3FF",
  "#EC4899",
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#FBBF24",
  "#A78BFA",
  "#FB7185",
  "#34D399",
  "#60A5FA",
];

function pickColor(categoryName: string, index: number) {
  return fixedColors[categoryName] ?? palette[index % palette.length];
}

function formatPrice(price?: string | null) {
  if (!price) return null;
  const v = String(price).trim();
  if (!v) return null;

  // plain number?
  if (/^\$?\d+(\.\d+)?$/.test(v)) {
    const n = Number(v.replace("$", ""));
    return Number.isFinite(n) ? `$${Math.round(n)}` : v;
  }

  // e.g. "18 / 26"
  if (v.includes("/")) {
    return `$${v.replace(/^\$/, "").replace(/\s+/g, " ")}`;
  }

  return v.startsWith("$") ? v : `$${v}`;
}

function isNote(row: MenuRow) {
  return row.type === "note";
}

function badgeEmoji(badge?: string) {
  const b = (badge ?? "").trim().toLowerCase();
  if (!b) return null;
  if (b === "contains_nuts") return " 🌰";
  if (b === "spicy") return " 🌶️";
  if (b === "popular") return " ⭐";
  if (b === "new") return " 🆕";
  return null;
}

export default function MenuClient({ categories }: { categories: MenuCategory[] }) {
  return (
    <div className="relative min-h-screen bg-[#0d1117] text-gray-100">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('/images/background-texture.jpg')] bg-cover opacity-40" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117]/70 to-[#0d1117]/95" />

      {/* Header (toggles removed — keeping this page as internal/backup) */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-6 backdrop-blur-md bg-[#0d1117]/70 border-b border-[#29C3FF]/20 z-50">
        <Link href="/">
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Logo"
            width={140}
            height={60}
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-xs tracking-wider uppercase text-white/50 border border-white/20 px-3 py-1 rounded-full">
            Internal Version
          </span>

          <Link
            href="/"
            className="text-[#29C3FF] px-5 py-2 rounded-full border border-[#29C3FF]/50 hover:bg-[#29C3FF]/20 transition"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24 relative z-20 px-6 md:px-16">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-6xl font-[Playfair_Display] font-bold text-white mb-12"
        >
          Our Menu
        </motion.h1>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          {categories.map((section, idx) => {
            const color = pickColor(section.name, idx);
            const featuredPhoto = featuredPhotosByCategory[section.name];

            const notes = section.rows.filter(isNote);
            const items = section.rows.filter((r) => !isNote(r));

            return (
              <div
                key={section.name}
                className="p-8 rounded-2xl backdrop-blur-md bg-[#111827]/70 border"
                style={{ borderColor: `${color}60` }}
              >
                {/* SECTION HEADER */}
                <h2
                  className="text-2xl font-semibold mb-4 uppercase tracking-wider border-b pb-3"
                  style={{ color, borderColor: `${color}40` }}
                >
                  {section.name}
                </h2>

                {/* Notes */}
                {notes.length > 0 && (
                  <div className="mb-6 space-y-2 text-center text-xs tracking-wide text-gray-300/90">
                    {notes.map((n, i) => (
                      <div key={i}>{n.description || n.name}</div>
                    ))}
                  </div>
                )}

                {/* Featured Photo */}
                {featuredPhoto && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-[#29C3FF]/40">
                    <Image
                      src={featuredPhoto}
                      alt={`${section.name} Featured`}
                      width={900}
                      height={700}
                      className="w-full h-64 object-cover bg-black"
                    />
                  </div>
                )}

                {/* Items */}
                <div className="space-y-8">
                  {items.map((item, i) => {
                    const price = formatPrice(item.price);

                    return (
                      <div key={`${item.name ?? "item"}-${i}`}>
                        <div className="flex justify-between text-white font-semibold text-lg">
                          <span>
                            {item.name}
                            {badgeEmoji(item.badge)}
                          </span>
                          {price && <span className="text-[#29C3FF]">{price}</span>}
                        </div>

                        {item.description && (
                          <p className="text-gray-400 text-sm mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="text-center text-gray-400 py-6 border-t border-[#29C3FF]/30 mt-10 relative z-20">
        © 2025 Dozers Grill • All Rights Reserved
      </footer>
    </div>
  );
}


