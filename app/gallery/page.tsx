"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type GalleryImage = {
  id: string;
  image_url: string;
  caption: string | null;
  alt_text: string | null;
  sort_order: number;
};

const glowPalette = [
  "#29C3FF",
  "#F59E0B",
  "#8B5CF6",
  "#10B981",
];

const supabaseVideo =
  "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-videos/hero.mp4";

export default function GalleryPage() {
  const [images, setImages] = useState<
    GalleryImage[]
  >([]);

  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [galleryError, setGalleryError] =
    useState(false);

  const supabase = createClient();

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      setGalleryError(false);

      const { data, error } = await supabase
        .from("gallery_images")
        .select(
          "id, image_url, caption, alt_text, sort_order"
        )
        .eq("is_published", true)
        .order("sort_order", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "PUBLIC GALLERY ERROR:",
          error
        );

        setImages([]);
        setGalleryError(true);
      } else {
        setImages(
          (data as GalleryImage[]) ?? []
        );

        setCurrent(0);
      }

      setLoading(false);
    };

    loadGallery();
  }, []);

  const hasImages = images.length > 0;

  const currentImage = hasImages
    ? images[current]
    : null;

  const glowColor =
    glowPalette[current % glowPalette.length];

  const nextImage = () => {
    if (!hasImages) {
      return;
    }

    setCurrent((previous) =>
      previous === images.length - 1
        ? 0
        : previous + 1
    );
  };

  const previousImage = () => {
    if (!hasImages) {
      return;
    }

    setCurrent((previous) =>
      previous === 0
        ? images.length - 1
        : previous - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#0d1117] text-gray-100">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 h-full w-full object-cover brightness-[0.6] contrast-[1.05] blur-sm"
      >
        <source
          src={supabaseVideo}
          type="video/mp4"
        />
      </video>

      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/40 via-[#0d1117]/60 to-[#0d1117]/95" />

      {/* Header */}
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#29C3FF]/30 bg-[#0d1117]/80 px-4 py-4 backdrop-blur-md sm:px-8">
        <Link
          href="/"
          aria-label="Dozers Grill Home"
        >
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Grill Logo"
            width={140}
            height={60}
            priority
            className="h-auto w-[115px] cursor-pointer drop-shadow-[0_0_15px_rgba(41,195,255,0.4)] sm:w-[140px]"
          />
        </Link>

        <Link
          href="/"
          className="rounded-md border border-[#29C3FF]/40 px-4 py-2 text-xs uppercase tracking-wider text-gray-300 transition hover:bg-[#29C3FF]/10 hover:text-[#F59E0B] sm:text-sm"
        >
          Home
        </Link>
      </header>

      {/* Heading */}
      <section className="relative z-10 px-5 pb-10 pt-32 text-center sm:pt-36">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#29C3FF] sm:text-sm">
          Inside Dozers
        </p>

        <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_35px_rgba(245,158,11,0.6)] sm:text-5xl md:text-6xl">
          The Gallery
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
          A glimpse inside Dozers Grill — the
          food, the games, and the nightlife.
          Explore the atmosphere that makes Dozers
          a true experience.
        </p>
      </section>

      {/* Main image */}
      <section className="relative z-10 flex items-center justify-center px-4 sm:px-6 md:px-20">
        <motion.div
          animate={
            hasImages
              ? {
                  boxShadow: [
                    `0 0 35px 0 ${glowColor}35`,
                    `0 0 65px 0 ${glowColor}70`,
                    `0 0 35px 0 ${glowColor}35`,
                  ],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative h-[360px] w-full max-w-5xl overflow-hidden rounded-2xl border border-[#29C3FF]/30 bg-black/50 backdrop-blur-sm sm:h-[500px] md:h-[600px]"
        >
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400">
              <Loader2 className="h-7 w-7 animate-spin text-[#29C3FF]" />

              <p className="text-sm">
                Loading gallery...
              </p>
            </div>
          ) : galleryError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <Images className="h-10 w-10 text-red-300/60" />

              <p className="mt-4 font-semibold text-gray-300">
                The gallery could not be loaded.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Please try refreshing the page.
              </p>
            </div>
          ) : !hasImages ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <Images className="h-10 w-10 text-gray-600" />

              <p className="mt-4 font-semibold text-gray-300">
                New photos are coming soon.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Check back for more from Dozers Grill.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage?.id}
                initial={{
                  opacity: 0,
                  scale: 1.02,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImage!.image_url}
                  alt={
                    currentImage!.alt_text ||
                    currentImage!.caption ||
                    "Dozers Grill gallery photo"
                  }
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                {currentImage?.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center sm:p-8">
                    <p className="text-base font-medium text-white drop-shadow-lg sm:text-lg">
                      {currentImage.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {hasImages && (
            <>
              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous gallery image"
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/80 sm:left-4 sm:h-13 sm:w-13"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next gallery image"
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/80 sm:right-4 sm:h-13 sm:w-13"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>

              <div className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                {current + 1} / {images.length}
              </div>
            </>
          )}
        </motion.div>
      </section>

      {/* Thumbnails */}
      {hasImages && (
        <section className="relative z-10 mt-8 px-4 pb-20 sm:mt-10 sm:px-6 md:px-20">
          <div className="mx-auto flex max-w-5xl gap-3 overflow-x-auto overscroll-x-contain pb-3 sm:flex-wrap sm:justify-center sm:gap-4">
            {images.map((image, index) => (
              <motion.button
                key={image.id}
                type="button"
                onClick={() =>
                  selectImage(index)
                }
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                aria-label={`View gallery image ${
                  index + 1
                }`}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-28 sm:w-28 ${
                  current === index
                    ? "border-[#F59E0B] opacity-100 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                    : "border-transparent opacity-65 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={
                    image.alt_text ||
                    image.caption ||
                    `Gallery thumbnail ${
                      index + 1
                    }`
                  }
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-[#29C3FF]/30 bg-[#0d1117]/90 px-6 py-6 text-center text-sm text-gray-400 backdrop-blur-md">
        © {new Date().getFullYear()} Dozers Grill •
        All Rights Reserved
      </footer>
    </div>
  );
}





