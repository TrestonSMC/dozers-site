import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Restaurant & Bar in Mesa AZ | Dozers Grill",
  description:
    "Looking for a restaurant and bar in Mesa, AZ? Dozers Grill offers fresh food, craft drinks, happy hour specials, and a lively atmosphere open until 2 AM.",
};

export default function RestaurantBarMesa() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-gray-100">

      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-5 z-50 backdrop-blur-md bg-[#0d1117]/80 border-b border-[#29C3FF]/20">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Grill Logo"
            width={140}
            height={60}
            className="drop-shadow-[0_0_20px_rgba(41,195,255,0.4)] cursor-pointer"
            priority
          />
        </Link>

        <Link href="/">
          <Button className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-6 py-3 rounded-full hover:scale-105 transition-transform">
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Content */}
      <div className="pt-40 md:pt-44 pb-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">

          {/* GOLD GLOW WRAP */}
          <div className="bg-[#111827]/70 border border-[#F59E0B]/30 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-[0_0_60px_-15px_rgba(245,158,11,0.35)]">

            <h1 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold mb-8 text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]">
              Dozers Grill: A Restaurant–Bar First Environment in Mesa, AZ
            </h1>

            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              At Dozers, we’re not just a restaurant. We’re not just a bar.
              We’re a <strong>restaurant–bar first environment in Mesa, Arizona</strong> —
              built to bring great food, great drinks, and great people together under one roof.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              What Does “Restaurant–Bar First” Mean?
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              It means balance. You can walk in for a full sit-down dinner,
              a casual lunch with coworkers, happy hour appetizers,
              game night drinks — or all of the above — and it all feels natural.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              At Dozers Grill, the kitchen and the bar are equally important.
              The food isn’t secondary to the drinks — and the drinks aren’t
              an afterthought to the food. They work together.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              Energy Without the Chaos
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              We’ve created a Mesa restaurant and bar that has energy —
              but not noise for the sake of noise.
            </p>

            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>TVs for the big games</li>
              <li>A lively bar crowd</li>
              <li>Music that sets the vibe</li>
              <li>Comfortable seating for dining</li>
            </ul>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Whether you're here for paninis and appetizers during happy hour
              or staying late for drinks with friends, the environment adjusts
              to the moment.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              Designed for Every Occasion
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Families can enjoy dinner. Couples can have a relaxed date night.
              Friends can grab drinks after work. Regulars can post up at the bar.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              If you’ve been searching for:
            </p>

            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>A restaurant and bar near you</li>
              <li>A late-night restaurant in Mesa</li>
              <li>A Mesa happy hour destination</li>
              <li>A spot for dinner and drinks in East Mesa</li>
            </ul>

            <p className="text-gray-300 mb-10 leading-relaxed">
              Dozers Grill delivers both sides of the experience.
            </p>

            <div className="border-t border-[#29C3FF]/20 pt-8 text-gray-400 text-sm">
              <p>📍 7012 E Hampton Ave, Mesa, AZ</p>
              <p>📞 (602) 694-5551</p>
              <Link
                href="/menu"
                className="text-[#29C3FF] hover:text-[#F59E0B] underline mt-4 inline-block"
              >
                View Our Menu →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}