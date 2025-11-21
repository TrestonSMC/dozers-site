"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ===============================
// TYPES – Fixes TypeScript error
// ===============================
type MenuItem = {
  name: string;
  price: number | string;
  desc: string;
  photo?: string;
};

type MenuSection = {
  title: string;
  color: string;
  items: MenuItem[];
};

// ⭐ FOOD PHOTOS
const foodPhotos = {
  mac: "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Food%20Item%202.png",
  artichoke: "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Food%20item%203.png",
  elote: "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Food%20item%204.png",
  hummus: "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Food%20Item%201.png",
};

// ===============================
// ⭐ FINAL MENU (Ordered Correctly)
// ===============================
const menuSections: MenuSection[] = [
  // ======================
  // APPETIZERS
  // ======================
  {
    title: "Appetizers",
    color: "#29C3FF",
    items: [
      {
        name: "Baked Feta",
        price: 14,
        desc: "Feta baked until golden brown topped with Kalamata olives, cucumber, sundried tomato, red onion, drizzled w/ fig balsamic reduction.",
      },
      {
        name: "Spinach Artichoke Dip",
        price: 12,
        desc: "Baked with mozzarella on top served with warmed pita bread.",
        photo: foodPhotos.artichoke,
      },
      {
        name: "Baked Elote Dip",
        price: 12,
        desc: "Fresh roasted corn mixed with our homemade elote cheese sauce served with tortilla chips.",
        photo: foodPhotos.elote,
      },
      {
        name: "Nachos",
        price: 14,
        desc: "Tortilla chips w/ three cheeses, lettuce, tomato, black olives & diced tomatoes. Served with sour cream & homemade guacamole.",
      },
      {
        name: "Smoked Paprika Parmesan Hummus",
        price: 12,
        desc: "Served with fresh vegetables for dipping and warmed pita bread.",
        photo: foodPhotos.hummus,
      },
      {
        name: "Fresh Guacamole",
        price: 13,
        desc: "Fresh avocado mixed with red onion, roma tomatoes & diced jalapeños. Finished w/ pomegranate seeds & cotija.",
      },
      {
        name: "Quesadilla",
        price: 10,
        desc: "12-inch flour tortilla filled w/ cheddar jack & chopped bacon, served with sour cream.",
      },
    ],
  },

  // ======================
  // PANINIS
  // ======================
  {
    title: "Paninis",
    color: "#EC4899",
    items: [
      {
        name: "Caprese Panini",
        price: 13,
        desc: "Fresh mozzarella, sliced tomatoes, artichoke, pesto & roasted garlic aioli pressed until golden brown.",
      },
      {
        name: "Italian Stallion",
        price: 15,
        desc: "Prosciutto, capicolla, salami, pepperjack cheese & roasted garlic aioli pressed until golden brown.",
      },
      {
        name: "Turkey Bacon Ranch",
        price: 13,
        desc: "Turkey, bacon, tomato & cheddar cheese with ranch spread. Pressed until golden brown.",
      },
      {
        name: "Around the World",
        price: 13,
        desc: "Spinach artichoke dip spread, turkey, salami, Gruyere & sundried tomato. Pressed until golden brown.",
      },
      {
        name: "My Little Piggy",
        price: 14,
        desc: "Ham, bacon, salami, pepperjack cheese, mustard & pickle pressed until golden brown.",
      },
      {
        name: "Roast Beef & Havarti",
        price: 15,
        desc: "Roast beef, pickles, red onion & horseradish aioli pressed until golden brown.",
      },
      {
        name: "Grilled Cheese w/ Bacon",
        price: 12,
        desc: "Cheddar, Gruyere, pepperjack & bacon pressed until golden brown.",
      },
      {
        name: "Pesto Panini",
        price: 13,
        desc: "Pesto spread, hot Italian sausage, peppers, onions & pepper jack cheese pressed until golden brown.",
      },
    ],
  },

  // ======================
  // PASTAS
  // ======================
  {
    title: "Pastas",
    color: "#3B82F6",
    items: [
      {
        name: "Baked Gnocchi",
        price: 14,
        desc: "Potato dumpling pasta with hot Italian sausage, peppers, onions & marinara. Topped with mozzarella & baked. Served w/ ciabatta.",
      },
      {
        name: "Baked Meatball Pasta",
        price: 15,
        desc: "All beef meatballs, cavatappi pasta & marinara topped with mozzarella & baked. Served w/ ciabatta.",
      },
      {
        name: "Pesto Chicken Pasta",
        price: 14,
        desc: "Cavatappi pasta, pesto cream sauce, onions, sundried tomatoes, chicken & mozzarella. Baked & served w/ ciabatta.",
      },
      {
        name: "Baked Mac & Cheese",
        price: 10,
        desc: "Three cheese mac topped with sharp cheddar & breadcrumbs. Served w/ toasted ciabatta.",
        photo: foodPhotos.mac,
      },
    ],
  },

  // ======================
  // ENTREES
  // ======================
  {
    title: "Entrees",
    color: "#EF4444",
    items: [
      {
        name: "Slow Roasted Baby Back Ribs",
        price: "18 / 26",
        desc: "¼ rack or ½ rack served with mashed potatoes & gravy and coleslaw.",
      },
      {
        name: "Pulled Pork Sandwich",
        price: 12,
        desc: "Slow roasted pork shoulder tossed in North Carolina BBQ sauce on brioche. Served with potato salad or coleslaw.",
      },
      {
        name: "Baked Meatball Sub",
        price: 15,
        desc: "All beef meatballs in house marinara, topped with mozzarella & baked inside a hoagie roll.",
      },
    ],
  },

  // ======================
  // SALADS
  // ======================
  {
    title: "Salads",
    color: "#10B981",
    items: [
      {
        name: "Caesar Salad",
        price: 10,
        desc: "Romaine lettuce tossed with Caesar dressing, topped with shaved Parmesan and croutons.",
      },
      {
        name: "Cobb Salad",
        price: 12,
        desc: "Iceberg lettuce, tomatoes, cucumbers, egg, bacon & blue cheese. Served with balsamic vinaigrette.",
      },
      {
        name: "Greek Salad",
        price: 12,
        desc: "Romaine, cucumbers, feta, tomato, olives, red onion & sundried tomatoes with balsamic vinaigrette.",
      },
      {
        name: "Add Chicken",
        price: 6,
        desc: "Add chicken to any salad.",
      },
    ],
  },

  // ======================
  // SIDES
  // ======================
  {
    title: "Sides",
    color: "#FBBF24",
    items: [
      { name: "Mashed Potatoes & Gravy", price: 3, desc: "" },
      { name: "Coleslaw", price: 3, desc: "" },
      { name: "Potato Salad", price: 3, desc: "" },
      { name: "Side Salad", price: 4, desc: "" },
      { name: "Chips", price: 2, desc: "" },
    ],
  },
];

// ===============================
// PAGE COMPONENT
// ===============================

export default function MenuPage() {
  return (
    <div className="relative min-h-screen bg-[#0d1117] text-gray-100">
      {/* Background Layers */}
      <div className="fixed inset-0 bg-[url('/images/background-texture.jpg')] bg-cover opacity-40" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117]/70 to-[#0d1117]/95" />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 backdrop-blur-md bg-[#0d1117]/70 border-b border-[#29C3FF]/20 z-50">
        <Link href="/">
          <Image src="/images/dozers-logo.png" alt="Dozers Logo" width={140} height={60} />
        </Link>
        <Link
          href="/"
          className="text-[#29C3FF] px-6 py-2 rounded-full border border-[#29C3FF]/50 hover:bg-[#29C3FF]/20 transition"
        >
          Home
        </Link>
      </header>

      {/* Main */}
      <main className="pt-32 pb-24 relative z-20 px-6 md:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-6xl font-[Playfair_Display] font-bold text-white mb-12"
        >
          Our Menu
        </motion.h1>

        {/* MENU GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          {menuSections.map((section) => (
            <div
              key={section.title}
              className="p-8 rounded-2xl backdrop-blur-md bg-[#111827]/70 border"
              style={{ borderColor: `${section.color}60` }}
            >
              <h2
                className="text-2xl font-semibold mb-6 uppercase tracking-wider border-b pb-3"
                style={{
                  color: section.color,
                  borderColor: `${section.color}40`,
                }}
              >
                {section.title}
              </h2>

              <div className="space-y-8">
                {section.items.map((item, i) => (
                  <div key={i}>
                    {/* Name + Price */}
                    <div className="flex justify-between text-white font-semibold text-lg">
                      <span>{item.name}</span>
                      <span className="text-[#29C3FF]">${item.price}</span>
                    </div>

                    {/* Description */}
                    {item.desc && (
                      <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                    )}

                    {/* Photo */}
                    {item.photo && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-[#29C3FF]/40">
                        <Image
                          src={item.photo}
                          alt={item.name}
                          width={900}
                          height={700}
                          className="w-full h-64 object-contain bg-black"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-400 py-6 border-t border-[#29C3FF]/30 mt-10">
        © 2025 Dozers Grill • All Rights Reserved
      </footer>
    </div>
  );
}





