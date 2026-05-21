import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Live Music in Mesa AZ | Dozers Grill",
  description:
    "Live music is coming to Dozers Grill in Mesa, AZ. Enjoy local bands, cold drinks, great food, pool tables, and weekend entertainment.",
};

export default function LiveMusicMesa() {
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
              Live Music is Coming to Dozers Grill in Mesa, AZ
            </h1>

            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Mesa nights are about to get louder. Dozers Grill is bringing{" "}
              <strong>live music to the stage</strong>, creating the perfect
              mix of great food, cold drinks, sports, pool tables, and local
              entertainment under one roof.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Whether you're looking for a casual night out, a place to grab
              drinks with friends, or a new local music spot in Mesa, Dozers is
              building the kind of atmosphere that keeps people coming back.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              A New Live Music Destination in Mesa
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              At Dozers Grill, we’ve always focused on creating a true
              neighborhood atmosphere. Now we’re taking it even further with
              live local entertainment.
            </p>

            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Live local bands</li>
              <li>Acoustic sets</li>
              <li>Weekend performances</li>
              <li>High-energy evening shows</li>
              <li>Relaxed afternoon music vibes</li>
            </ul>

            <p className="text-gray-300 mb-6 leading-relaxed">
              From laid-back afternoons to packed Saturday nights, live music
              at Dozers is designed to bring energy without losing the relaxed
              neighborhood feel people already love.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              Great Food, Drinks, and Live Entertainment
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              The best live music venues are about more than just the music.
              At Dozers Grill, guests can enjoy a complete restaurant and bar
              experience while listening to local artists.
            </p>

            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Fresh food and bar favorites</li>
              <li>Ice-cold beer and cocktails</li>
              <li>Pool tables</li>
              <li>Sports on TV</li>
              <li>A full restaurant and bar atmosphere</li>
            </ul>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Whether you're stopping by for dinner or staying all night for
              the music, Dozers offers a complete night out experience in Mesa.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              Supporting Local Artists and Local Energy
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              One of the best parts of live music nights at Dozers is the
              opportunity to support local talent. We’re excited to feature
              artists and bands from around the Valley while giving Mesa locals
              a fun, welcoming place to discover new music.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#29C3FF]">
              The Perfect Weekend Spot in Mesa
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              If you’ve been searching for:
            </p>

            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Live music in Mesa, AZ</li>
              <li>Bars with live bands near you</li>
              <li>Weekend nightlife in Mesa</li>
              <li>Restaurants with live entertainment</li>
              <li>Local music venues in East Mesa</li>
            </ul>

            <p className="text-gray-300 mb-10 leading-relaxed">
              Dozers Grill is becoming one of Mesa’s newest spots for live
              music, great food, and good vibes all together.
            </p>

            <div className="border-t border-[#29C3FF]/20 pt-8 text-gray-400 text-sm">
              <p>📍 7012 E Hampton Ave, Mesa, AZ</p>
              <p>📞 (602) 694-5551</p>

              <div className="flex flex-wrap gap-4 mt-4">
                <Link
                  href="/live-music"
                  className="text-[#29C3FF] hover:text-[#F59E0B] underline inline-block"
                >
                  View Live Music Schedule →
                </Link>

                <Link
                  href="/menu"
                  className="text-[#29C3FF] hover:text-[#F59E0B] underline inline-block"
                >
                  View Our Menu →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}