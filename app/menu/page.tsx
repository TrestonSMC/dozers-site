"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ⭐ Photos mapped to menu sections (Option B)
const sectionPhotos: Record<string, any[]> = {
  "From the Oven": [
    {
      name: "Baked Mac and Cheese",
      img: "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Food%20Item%202.png",
    },
    {
      name: "Spinach Artichoke Dip",
      img: "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Food%20item%203.png",
    },
    {
      name: "Baked Elote Dip and Chips",
      img: "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Food%20item%204.png",
    },
  ],
  "From the Cooler": [
    {
      name: "Smoked Paprika Parmesan Hummus",
      img: "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-gallery/Menu/Food%20Item%201.png",
    },
  ],
};

// ⭐ Menu Data
const menu = [
  {
    title: "From the Oven",
    color: "#29C3FF",
    items: [
      "Slow Roasted Baby Back Ribs with Coleslaw and Mashed Potatoes with Gravy",
      "Pulled Pork Sandwich with Coleslaw and Potato Salad",
      "Baked Mac and Cheese",
      "Baked Elote Dip with Tortillas",
      "Spinach Artichoke Dip with Pita",
      "Baked Feta with Balsamic Reduction, Kalamata Olives, Cucumbers, Red Onion & Sundried Tomato",
      "Baked Gnocchi with Hot Italian Sausage, Peppers & Onions",
      "Nachos with Three Cheeses, Lettuce, Tomato, Onion, Black Olives, Sour Cream & Guacamole",
    ],
  },
  {
    title: "From the Pan",
    color: "#F59E0B",
    items: [
      "Pesto Pasta with Chicken, Cavatappi Pasta, Onions & Sundried Tomatoes",
      "Meatball Pasta with Cavatappi Pasta, Marinara, Fresh Basil",
    ],
  },
  {
    title: "From the Press",
    color: "#EC4899",
    items: [
      "Caprese Panini with Pesto, Artichoke & Roasted Garlic Aioli",
      "Italian Stallion (Capricola, Salami, Prosciutto)",
      "Turkey Bacon Ranch Panini",
      "Turkey, Spinach Artichoke Spread, Sundried Tomato, Salami & Gruyere",
      "My Little Piggy (Ham, Bacon, Salami, Mustard, Pickle)",
      "Roast Beef with Havarti, Pickles, Red Onions & Horseradish Aioli",
      "Grilled Cheese with Bacon or Ham",
      "Pesto Panini with Hot Italian Sausage, Peppers & Onions",
      "Quesadilla with Bacon & Two Cheeses",
    ],
  },
  {
    title: "From the Cooler",
    color: "#10B981",
    items: [
      "Caesar Salad",
      "Cobb Salad",
      "Greek Salad",
      "House Salad",
      "Off The Hook Crab Cake Salad",
      "Smoked Paprika Parmesan Hummus with Pita & Veggies",
      "Fresh Guacamole with Pomegranate Seeds & Tortilla Chips",
    ],
  },
];

// ⭐ Insert photos into their sections naturally
function buildSectionContent(section: any) {
  const content: any[] = [];
  const photos = sectionPhotos[section.title] || [];

  let photoIndex = 0;
  const frequency = Math.ceil(section.items.length / (photos.length + 1));

  section.items.forEach((item: string, i: number) => {
    // Insert a photo every few items
    if (photoIndex < photos.length && i % frequency === 0 && i !== 0) {
      content.push({ type: "photo", ...photos[photoIndex] });
      photoIndex++;
    }

    // Normal menu item
    content.push({ type: "item", text: item });
  });

  // Add leftover photo at end if needed
  while (photoIndex < photos.length) {
    content.push({ type: "photo", ...photos[photoIndex] });
    photoIndex++;
  }

  return content;
}

export default function MenuPage() {
  return (
    <div className="relative min-h-screen bg-[#0d1117] text-gray-100 overflow-hidden z-0">
      
      {/* Background */}
      <div className="fixed inset-0 bg-[url('/images/background-texture.jpg')] bg-cover bg-center opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117]/70 via-[#0d1117]/80 to-[#0d1117]/95 pointer-events-none z-10" />

      {/* Header */}
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

      {/* MAIN */}
      <main className="relative z-20 pt-32 pb-32">
        
        {/* Page Title */}
        <section className="relative py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-[Playfair_Display] font-bold text-white drop-shadow-[0_0_30px_rgba(41,195,255,0.6)]"
          >
            Our Menu
          </motion.h1>

          <p className="text-gray-400 mt-3 text-lg">
            Fresh favorites from the kitchen — crafted with flavor.
          </p>

          <p className="text-[#29C3FF] mt-3 text-lg tracking-wide font-semibold drop-shadow-[0_0_12px_rgba(41,195,255,0.7)]">
            This Monday 11/17 lunch will now be available
          </p>
        </section>

        {/* MENU SECTIONS */}
        <section className="px-6 md:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
            {menu.map((section) => {
              const content = buildSectionContent(section);

              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl p-8 backdrop-blur-md border bg-[#111827]/70"
                  style={{
                    borderColor: `${section.color}60`,
                    boxShadow: `0 0 25px -6px ${section.color}`,
                  }}
                >
                  <h2
                    className="text-2xl font-semibold mb-5 uppercase tracking-wider border-b pb-3"
                    style={{
                      color: section.color,
                      borderColor: `${section.color}40`,
                    }}
                  >
                    {section.title}
                  </h2>

                  <div className="space-y-6">
                    {content.map((entry, i) =>
                      entry.type === "item" ? (
                        <p key={i} className="text-white font-medium">
                          {entry.text}
                        </p>
                      ) : (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6 }}
                          className="rounded-xl overflow-hidden shadow-lg border border-[#29C3FF]/40 bg-[#111827]/70 backdrop-blur-md"
                        >
                          <div className="w-full h-[260px] bg-black">
                            <Image
                              src={entry.img}
                              alt={entry.name}
                              width={500}
                              height={400}
                              className="object-contain w-full h-full"
                            />
                          </div>

                          <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-white">
                              {entry.name}
                            </h3>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 text-gray-400 text-center">
        © 2025 Dozers Grill • All Rights Reserved
      </footer>
    </div>
  );
}




