import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Industry Nights in Mesa (Mon–Thurs) | Dozers Grill",
  description:
    "Dozers Grill hosts Industry Nights in Mesa, AZ Monday–Thursday (11PM–2AM). Service industry specials, a comfortable restaurant–bar vibe, and late-night energy in East Mesa.",
};

export default function IndustryNightsMesaAZPage() {
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
          {/* Gold wrap */}
          <div className="bg-[#111827]/70 border border-[#F59E0B]/30 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-[0_0_60px_-15px_rgba(245,158,11,0.35)]">
            <header className="mb-10">
              <p className="text-[#29C3FF] uppercase tracking-widest text-xs mb-3">
                Dozers Insider
              </p>

              <h1 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.28)]">
                Industry Nights in Mesa, AZ (Mon–Thurs): Service Industry Specials
                at Dozers Grill
              </h1>

              <p className="text-gray-300 mt-6 text-lg leading-relaxed">
                If you work in the service industry, you already know: your
                “weekend” isn’t always Friday. That’s why Dozers Grill runs{" "}
                <strong>Industry Nights in Mesa</strong> Monday through Thursday —
                a restaurant–bar first environment made for the people who keep
                the city moving.
              </p>
            </header>

            <article className="space-y-10">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Industry Nights: Monday–Thursday
                </h2>

                <p className="text-gray-300 leading-relaxed">
                  Whether you’re coming off a shift or linking with coworkers,
                  Industry Nights are built for the after-work reset: good food,
                  great drinks, and an atmosphere that’s social without being
                  chaotic.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  The Late-Night Window (11PM–2AM)
                </h2>

                <p className="text-gray-300 leading-relaxed">
                  This is the “reverse happy hour” style window — Monday through
                  Thursday from <strong>11PM to 2AM</strong>. It’s built for
                  after-shift crews, late-night regulars, and anyone who wants
                  real food and a good vibe without the chaos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  A Restaurant–Bar That Gets It
                </h2>

                <p className="text-gray-300 leading-relaxed">
                  Dozers isn’t “just a bar” and it isn’t “just food.” It’s the
                  balance — a place where the kitchen matters as much as the bar.
                  That’s why Industry Nights work here.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Make It a Routine
                </h2>

                <p className="text-gray-300 leading-relaxed">
                  The best part about Industry Nights is consistency. Pick a
                  night, bring your people, and make it a regular spot — because
                  it’s built for connection and comfort.
                </p>

                <p className="text-gray-300 leading-relaxed mt-4">
                  For daytime deals, our{" "}
                  <Link
                    href="/blog/lunch-specials-mesa-az"
                    className="text-[#29C3FF] hover:text-[#F59E0B] underline underline-offset-4 transition font-semibold"
                  >
                    Lunch Specials
                  </Link>{" "}
                  are also a solid move.
                </p>
              </section>
            </article>

            {/* Footer info only (no buttons) */}
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