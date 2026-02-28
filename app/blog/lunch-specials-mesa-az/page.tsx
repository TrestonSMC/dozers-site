import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Lunch Specials in Mesa, AZ | Dozers Grill",
  description:
    "Looking for lunch specials in Mesa, AZ? Dozers Grill offers paninis, salads, or pastas — plus a free appetizer. Perfect for a fast, full lunch break in East Mesa.",
};

export default function LunchSpecialsMesaAZPage() {
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
          
          {/* Gold Wrap */}
          <div className="bg-[#111827]/70 border border-[#F59E0B]/30 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-[0_0_60px_-15px_rgba(245,158,11,0.35)]">

            <header className="mb-10">
              <p className="text-[#29C3FF] uppercase tracking-widest text-xs mb-3">
                Dozers Insider
              </p>

              <h1 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.28)]">
                Lunch Specials in Mesa, AZ: Dozers Grill Lunch Deals That Actually Fill You Up
              </h1>

              <p className="text-gray-300 mt-6 text-lg leading-relaxed">
                If you’re searching for <strong>lunch specials in Mesa, AZ</strong>, you’re
                probably looking for something simple: good food, quick service, and a deal
                that feels worth it. That’s exactly what we built our lunch specials for at{" "}
                <span className="text-white font-semibold">Dozers Grill</span> in East Mesa.
              </p>
            </header>

            <article className="space-y-10">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  A Lunch Special Built for Real People
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Dozers is a restaurant–bar first environment — and lunch is a
                  big part of that. Whether you’re on a tight break, meeting
                  coworkers, or just hungry, our lunch specials are designed to
                  be fast, satisfying, and consistent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  What’s Included in the Lunch Special
                </h2>

                <div className="rounded-2xl border border-[#29C3FF]/20 bg-[#0d1117]/40 backdrop-blur-md p-6 shadow-[0_0_25px_-12px_rgba(41,195,255,0.25)]">
                  <p className="text-gray-200 font-semibold mb-3">Choose from:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Paninis</li>
                    <li>Salads</li>
                    <li>Pastas</li>
                  </ul>

                  <p className="text-gray-200 font-semibold mt-6 mb-2">
                    And the best part:
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    You get a{" "}
                    <span className="text-white font-semibold">
                      free appetizer
                    </span>{" "}
                    with your lunch special.
                  </p>
                </div>

                <p className="text-gray-300 leading-relaxed mt-6">
                  It’s the kind of lunch deal that makes you want to come back —
                  because it’s not just “cheap.” It’s solid.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  A Great East Mesa Lunch Spot for Workdays
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Dozers Grill is in East Mesa and built for a comfortable lunch:
                  plenty of seating, an easy vibe, and a menu that works whether
                  you’re dining solo or coming in with a crew.
                </p>

                <p className="text-gray-300 leading-relaxed mt-4">
                  Want to plan your next visit? Check our{" "}
                  <Link
                    href="/events"
                    className="text-[#29C3FF] hover:text-[#F59E0B] underline underline-offset-4 transition font-semibold"
                  >
                    upcoming events
                  </Link>{" "}
                  or explore the{" "}
                  <Link
                    href="/menu"
                    className="text-[#29C3FF] hover:text-[#F59E0B] underline underline-offset-4 transition font-semibold"
                  >
                    full menu
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Looking for More Deals?
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  If lunch isn’t your window, we also run specials during{" "}
                  <Link
                    href="/blog/industry-nights-mesa-az"
                    className="text-[#29C3FF] hover:text-[#F59E0B] underline underline-offset-4 transition font-semibold"
                  >
                    Industry Nights (Mon–Thurs)
                  </Link>
                  .
                </p>
              </section>
            </article>

            <div className="mt-14 pt-8 border-t border-[#29C3FF]/20 text-gray-300">
              <p>
                <span className="text-white font-semibold">Dozers Grill</span> •
                7012 E Hampton Ave, Mesa, AZ 85209
              </p>
              <p className="mt-2">(602) 694-5551</p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}