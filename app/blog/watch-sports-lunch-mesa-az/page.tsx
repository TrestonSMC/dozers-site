import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Watch Sports During Lunch in Mesa AZ | Dozers Grill",
  description:
    "Looking for a place to watch sports during lunch in Mesa, AZ? Dozers Grill offers lunch specials, cold drinks, pool tables, and a true neighborhood sports bar atmosphere.",
};

export default function WatchSportsLunchMesa() {
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
          <div className="bg-[#111827]/70 border border-[#F59E0B]/30 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-[0_0_60px_-15px_rgba(245,158,11,0.35)]">
            <h1 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold mb-8 text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]">
              The Best Spot in Mesa to Watch Sports During Lunch
            </h1>

            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              If you're looking for a place in <strong>Mesa, Arizona</strong>{" "}
              where you can grab lunch and watch the game, Dozers Grill has
              quickly become a local favorite.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Whether you're catching a mid-day baseball game, tuning into a
              big soccer match, or keeping an eye on sports highlights while
              you eat, Dozers offers the perfect combination of{" "}
              <strong>great food, cold drinks, and wall-to-wall sports</strong>.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              A Lunch Break That’s Actually Fun
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Most lunch breaks feel rushed — but at Dozers Grill in Mesa,
              lunch can actually be something to look forward to.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Our lunch menu is built for quick, satisfying meals that do not
              sacrifice flavor. Guests can enjoy paninis, salads, and pasta
              dishes, plus a <strong>free appetizer with lunch specials</strong>.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              It’s the perfect place for office workers, construction crews,
              and locals looking for a relaxed lunch spot that still has some
              energy.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              Watch the Game While You Eat
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Dozers isn’t just another restaurant — it’s a true neighborhood
              sports bar atmosphere.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              With multiple TVs around the bar and dining area, you can catch
              live games, highlights, and sports coverage while enjoying your
              meal.
            </p>

            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Mid-day games and highlights</li>
              <li>A casual, sports-friendly atmosphere</li>
              <li>Cold drinks ready to go with lunch</li>
              <li>A true Mesa neighborhood bar feel</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              Pool Tables and a Relaxed Atmosphere
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Lunch at Dozers doesn’t have to end when the meal does.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Many guests stick around to enjoy pool tables, another round of
              drinks, and a laid-back local crowd. It’s the kind of place where
              a quick lunch can turn into a great afternoon.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              A Local Favorite for Lunch and Sports
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Mesa has plenty of places to eat, but not many combine{" "}
              <strong>lunch specials, sports, drinks, and entertainment</strong>{" "}
              under one roof.
            </p>

            <p className="text-gray-300 mb-10 leading-relaxed">
              That’s what makes Dozers Grill a go-to spot for locals who want
              more out of their lunch break.
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