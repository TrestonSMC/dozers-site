"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type MenuItem = {
  name: string;
  price?: string;
  desc?: string;
};

type MenuSection = {
  title: string;
  color: string;
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    title: "Bar Bites",
    color: "#29C3FF",
    items: [
      { name: 'Personal Pizza 8"', price: "$10", desc: "Cheese, Pepperoni, Ham, or Bacon" },
      { name: 'Hot Dog 6"', price: "$8", desc: "100% Beef" },
      { name: "Chili Cheese Dog", price: "$10" },
      { name: "Bowl of Chili & Cheese", price: "$10" },
      { name: "Fries, Tots, or Rings Basket", price: "$10" },
      { name: "Chili Cheese Fries or Tots Basket", price: "$12" },
      { name: "Pretzel with Mustard or Cheese", price: "$8" },
      { name: "Mozzarella Sticks", price: "$10" },
      { name: "Southwest Egg Rolls", price: "$10" },
      { name: "Chips & Salsa", price: "$8" },
      { name: "Cheese Quesadilla", price: "$8", desc: "Add Chicken +$2" },
    ],
  },
  {
    title: "Salad Rack",
    color: "#F59E0B",
    items: [
      { name: "Cobb", price: "$16", desc: "Romaine lettuce with egg, bacon, ham, cucumber, tomato, cheese & croutons" },
      { name: "Off The Hook", price: "$15", desc: "Crab cake salad with tomato, cucumber, lemon wedge" },
      { name: "Meat Lovers", price: "$15", desc: "Chicken, pepperoni, ham, turkey, lettuce & cheese" },
      { name: "Crispy Chicken", price: "$14", desc: "Lettuce, tomato, cucumber, croutons, shredded cheese" },
      { name: "Classic Caesar", price: "$12", desc: "Romaine, parmesan, seasoned croutons, Caesar dressing" },
      { name: "House", price: "$12", desc: "Lettuce, tomato, cucumber, mixed cheese, seasoned croutons" },
    ],
  },
  {
    title: "Hand Helds",
    color: "#EC4899",
    items: [
      { name: "Classic Cheeseburger", price: "$14", desc: "Lettuce, tomato, cheese" },
      { name: "Bacon Cheeseburger", price: "$16", desc: "Lettuce, tomato, cheese" },
      { name: "Club", price: "$16", desc: "Ham, turkey, bacon, lettuce, tomato, cheese" },
      { name: "Ham or Turkey with Cheese", price: "$12", desc: "Lettuce, tomato, mayo" },
      { name: "Crabby Patty", price: "$15", desc: "Crab cake, lettuce, tomato, mayo" },
      { name: "BLT", price: "$12", desc: "Bacon, lettuce, tomato, mayo" },
      { name: "Chicken Parm", price: "$15", desc: "Breaded chicken, marinara, parmesan" },
      { name: "Meatball Sub", price: "$15", desc: "Meatballs, marinara, parmesan" },
      { name: "Crispy Chicken", price: "$12", desc: "Lettuce, tomato, mayo (try with Wing Sauce!)" },
      { name: "PB & J", price: "$10", desc: "Served with fries or side pockets" },
    ],
  },
  {
    title: "Wings",
    color: "#10B981",
    items: [
      { name: "Bone-in, Boneless, or Strips", price: "$15", desc: "Combo Basket with Side Pocket +$3" },
      { name: "Sauces", desc: "Sweet Baby Rays BBQ, Sweet Red Chili, Teriyaki, Franks Buffalo Mild/Hot, Extra Hot, Carolina Reaper" },
      { name: "Dry Rubs", desc: "Lemon Pepper, Salt & Pepper, BBQ Spice, or Naked" },
    ],
  },
  {
    title: "Side Pockets",
    color: "#8B5CF6",
    items: [
      { name: "Fries, Tater Tots, Onion Rings" },
      { name: "Bag of Chips or Cookies" },
    ],
  },
  {
    title: "Drinks",
    color: "#F97316",
    items: [
      { name: "Soda / Tea", price: "$3", desc: "Coke, Diet Coke, Dr. Pepper, Rootbeer, Tea, Sweet Tea" },
      { name: "Refills", price: "$2" },
      { name: "Pitcher of Soda", price: "$8" },
      { name: "Energy Drinks", price: "$5" },
      { name: "Coffee", price: "$3" },
    ],
  },
  {
    title: "Sweet Spot",
    color: "#F43F5E",
    items: [
      { name: "Ice Cream Sundae", price: "$7" },
      { name: "Dippin’ Dots", price: "$5" },
      { name: "Rootbeer Float", price: "$7" },
      { name: "Bar Snack Variety", price: "$2–$5" },
    ],
  },
];

export default function MenuPage() {
  return (
    <div className="relative min-h-screen bg-[#0d1117] text-gray-100 overflow-hidden z-0">
      {/* 🔹 Background */}
      <div className="fixed inset-0 bg-[url('/images/background-texture.jpg')] bg-cover bg-center opacity-50 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117]/60 via-[#0d1117]/85 to-[#0d1117]/95 pointer-events-none z-10" />

      {/* 🔹 Top Navigation */}
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

      {/* 🔹 Main */}
      <main className="relative z-20 pt-32">
        {/* Header */}
        <section className="relative py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-[Playfair_Display] font-bold text-white drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]"
          >
            Our Menu
          </motion.h1>
          <p className="text-gray-400 mt-4 text-lg">
            Dive into Dozers favorites — made fresh and served late.
          </p>
        </section>

        {/* Menu Grid */}
        <section className="relative px-6 md:px-16 pb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {menuSections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
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
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium text-white">{item.name}</span>
                        {item.price && (
                          <span
                            className="font-semibold ml-3"
                            style={{ color: section.color }}
                          >
                            {item.price}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Button */}
        <div className="text-center pb-16">
          <Button
            variant="outline"
            className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] hover:scale-105 transition-transform rounded-full px-8 py-4 text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top
          </Button>
        </div>
      </main>

      {/* 🔹 Footer */}
      <footer className="py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md relative z-10 text-gray-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <p>© 2025 Dozers Grill • All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}


