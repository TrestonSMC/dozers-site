"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { INSIDER_POSTS } from "@/lib/dozers-insider";
import { createClient } from "@/lib/supabase/client";

type Review = {
  author: string;
  rating: number;
  text: string;
  time?: string;
  profile?: string;
};

type HomepageLiveShow = {
  id: string;
  title: string;
  show_date: string;
  show_time: string;
};

type HomepageSchedule = {
  date: string;
  acts: {
    time: string;
    name: string;
  }[];
};

type ContactItem =
  | {
      label: string;
      description: string;
      email: string;
      href?: never;
      action?: never;
    }
  | {
      label: string;
      description: string;
      href: string;
      action: string;
      email?: never;
    };

const CONTACT_ITEMS: ContactItem[] = [
  {
    label: "Events",
    description:
      "Upcoming events, private gatherings, and event questions.",
    email: "events@dozersgrill.com",
  },
  {
    label: "Employment",
    description:
      "View employment opportunities and apply to join the Dozers team.",
    href: "/careers",
    action: "View Careers",
  },
  {
    label: "Live Entertainment",
    description:
      "Bands, performers, booking, and stage inquiries.",
    email: "stage@dozersgrill.com",
  },
  {
    label: "Accounts Payable",
    description:
      "Vendor invoices and accounts payable inquiries.",
    email: "ap@dozersgrill.com",
  },
];

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatHomepageDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  const day = date.getDate();

  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);

  const month = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(date);

  return `${weekday} ${month} ${day}${getOrdinalSuffix(day)}`;
}

function formatHomepageTime(value: string) {
  const [hours, minutes] = value.split(":");
  const date = new Date();

  date.setHours(Number(hours), Number(minutes), 0, 0);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: Number(minutes) === 0 ? undefined : "2-digit",
  })
    .format(date)
    .replace(" ", "");
}

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [liveMusicSchedule, setLiveMusicSchedule] = useState<
    HomepageSchedule[]
  >([]);

  const supabase = useMemo(() => createClient(), []);

  const getRating = (rating: any) => {
    if (typeof rating === "number") {
      return rating;
    }

    if (typeof rating === "string") {
      const match = rating.match(/\d+(\.\d+)?/);
      return match ? Number(match[0]) : 0;
    }

    return 0;
  };

  const fourAndFiveStarReviews = reviews.filter(
    (review) => getRating(review.rating) >= 4
  );

  const supabaseBase =
    "https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-videos";

  useEffect(() => {
    async function loadLiveMusic() {
      const { data, error } = await supabase
        .from("live_music_shows")
        .select(`
          id,
          title,
          show_date,
          show_time
        `)
        .eq("is_published", true)
        .gte("show_date", getTodayDate())
        .order("show_date", { ascending: true })
        .order("show_time", { ascending: true });

      if (error) {
        console.error("HOMEPAGE LIVE MUSIC ERROR:", error);
        setLiveMusicSchedule([]);
        return;
      }

      const groupedShows = new Map<string, HomepageLiveShow[]>();

      for (const show of (data ?? []) as HomepageLiveShow[]) {
        const existing = groupedShows.get(show.show_date) ?? [];

        existing.push(show);
        groupedShows.set(show.show_date, existing);
      }

      const schedule = Array.from(groupedShows.entries())
        .slice(0, 4)
        .map(([date, shows]) => ({
          date: formatHomepageDate(date),
          acts: shows.map((show) => ({
            time: formatHomepageTime(show.show_time),
            name: show.title,
          })),
        }));

      setLiveMusicSchedule(schedule);
    }

    loadLiveMusic();
  }, [supabase]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events", {
          cache: "no-store",
        });

        const data = await response.json();
        const all = data.events || [];
        const now = new Date();

        const upcoming = all.filter((event: any) => {
          if (!event.rawDate) {
            return false;
          }

          return new Date(event.rawDate) >= now;
        });

        upcoming.sort(
          (
            first: { rawDate: string | number | Date },
            second: { rawDate: string | number | Date }
          ) =>
            new Date(first.rawDate).getTime() -
            new Date(second.rawDate).getTime()
        );

        setEvents(upcoming);
      } catch {
        setEvents([]);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Reviews API failed with status ${response.status}`
          );
        }

        const data = await response.json();

        console.log("REVIEWS API RESPONSE:", data);

        const incomingReviews =
          data?.reviews ||
          data?.result?.reviews ||
          data?.data?.reviews ||
          [];

        const normalizedReviews: Review[] = incomingReviews
          .map((review: any) => ({
            author:
              review.author ||
              review.author_name ||
              review.name ||
              "Guest",
            rating: getRating(review.rating),
            text: review.text || review.review || "",
            time:
              review.time ||
              review.relative_time_description ||
              "",
            profile:
              review.profile ||
              review.profile_photo_url ||
              "",
          }))
          .filter(
            (review: Review) =>
              review.text && review.rating > 0
          );

        setReviews(normalizedReviews);
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  const eventColors = ["#29C3FF", "#F59E0B", "#10B981"];
  const insiderScrollRef = useRef<HTMLDivElement>(null);

  const scrollInsider = (direction: "left" | "right") => {
    const element = insiderScrollRef.current;

    if (!element) {
      return;
    }

    const amount = Math.max(
      280,
      Math.floor(element.clientWidth * 0.75)
    );

    element.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative overflow-x-hidden bg-[#0d1117] text-gray-100">
      <style>{`
        .dozers-insider-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .dozers-insider-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 h-full w-full object-cover brightness-[0.8] contrast-[1.05]"
      >
        <source
          src={`${supabaseBase}/hero.mp4`}
          type="video/mp4"
        />
      </video>

      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#0d1117]/40 to-[#0d1117]/90" />

      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#29C3FF]/20 bg-[#0d1117]/70 px-8 py-5 backdrop-blur-md">
        <Link href="/" aria-label="Dozers Grill Home">
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Grill Logo"
            width={140}
            height={60}
            className="drop-shadow-[0_0_20px_rgba(41,195,255,0.4)]"
          />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md border border-[#29C3FF]/40 px-4 py-2 text-white transition hover:bg-[#29C3FF]/10"
        >
          {menuOpen ? "Close ✕" : "Menu ☰"}
        </button>

        {menuOpen && (
          <div className="absolute right-8 top-full z-50 mt-2 w-64 rounded-xl border border-[#29C3FF]/30 bg-[#111827]/95 shadow-lg backdrop-blur-lg">
            <ul className="flex flex-col py-3 text-center text-sm uppercase tracking-wider">
              {[
                { label: "About", href: "/about" },
                { label: "Menu", href: "/menu" },
                { label: "Gallery", href: "/gallery" },
                {
                  label: "Event Submission",
                  href: "/submit-event",
                },
                {
                  label: "Live Music",
                  href: "/live-music",
                },
                { label: "Contact", href: "/contact" },
                { label: "Careers", href: "/careers" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-3 text-gray-300 transition hover:bg-[#29C3FF]/10 hover:text-[#F59E0B]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0d1117]/70 via-transparent to-transparent" />

        <h1 className="z-10 text-5xl font-bold font-[Playfair_Display] text-white drop-shadow-[0_0_35px_rgba(245,158,11,0.6)] md:text-7xl">
          Welcome to Dozers Grill
        </h1>

        <p className="z-10 mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
          Great food, cold drinks, and good company.
          <br />
          Open daily until 2 AM.
        </p>

        <div className="z-10 mt-10">
          <Link href="/menu">
            <Button className="rounded-full border-0 bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-5 text-lg tracking-wider text-white transition-transform hover:scale-105">
              View Menu
            </Button>
          </Link>
        </div>
      </section>

      <section
        id="experience"
        className="relative overflow-hidden border-t border-[#10B981]/20 bg-[#111827]/70 px-6 py-24 backdrop-blur-md md:px-20"
      >
        <div className="z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-[Playfair_Display] text-white drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">
            The Experience
          </h2>

          <p className="mb-8 text-lg leading-relaxed text-gray-300">
            Step into Dozers Grill, a full-service
            restaurant and bar where great food, drink
            specials, and handcrafted cocktails set the
            stage. Paired with a vibrant atmosphere,
            weekly events, and recurring nights, every
            visit feels familiar—and never the same.
          </p>

          <Link href="/gallery">
            <Button className="rounded-full border-0 bg-gradient-to-r from-[#10B981] to-[#29C3FF] px-8 py-4 text-lg tracking-wider text-white shadow-[0_0_25px_-5px_rgba(16,185,129,0.6)] transition-transform hover:scale-105">
              View Photo Gallery
            </Button>
          </Link>
        </div>
      </section>

      <section
        id="live-music"
        className="border-t border-[#F59E0B]/20 bg-[#0d1117]/80 px-6 py-24 backdrop-blur-md md:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#F59E0B]">
              Stage @ Dozers
            </p>

            <h2 className="text-4xl font-[Playfair_Display] text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.45)] md:text-5xl">
              Live Music @ Dozers. Check out our lineup!
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
              Join us for live local music, cold drinks,
              handcrafted cocktails, and weekend energy
              all month long at Dozers Grill.
            </p>
          </div>

          {liveMusicSchedule.length === 0 ? (
            <div className="rounded-2xl border border-[#F59E0B]/20 bg-[#111827]/70 px-6 py-14 text-center shadow-[0_0_30px_-8px_rgba(245,158,11,0.25)]">
              <p className="text-xl font-semibold text-white">
                More live shows coming soon
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Check back soon for the next lineup.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {liveMusicSchedule.map((show, index) => (
                <motion.div
                  key={show.date}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  className="rounded-2xl border border-[#F59E0B]/20 bg-[#111827]/70 p-8 shadow-[0_0_30px_-8px_rgba(245,158,11,0.35)] backdrop-blur-md transition-transform hover:scale-[1.02]"
                >
                  <div className="mb-6">
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#F59E0B]">
                      Live Music
                    </p>

                    <h3 className="text-3xl font-[Playfair_Display] text-white">
                      {show.date}
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {show.acts.map((act) => (
                      <div
                        key={`${act.time}-${act.name}`}
                        className="flex items-center justify-between gap-5 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                      >
                        <span className="whitespace-nowrap font-semibold tracking-wide text-[#29C3FF]">
                          {act.time}
                        </span>

                        <span className="text-right font-medium text-gray-200">
                          {act.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-14 text-center">
            <p className="mb-6 text-sm text-gray-400">
              7012 E Hampton Ave • Mesa, Arizona
            </p>

            <Link href="/live-music">
              <Button className="rounded-full border-0 bg-gradient-to-r from-[#F59E0B] to-[#29C3FF] px-10 py-5 text-lg tracking-wider text-white transition-transform hover:scale-105">
                View Live Music
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="events"
        className="border-t border-[#29C3FF]/20 bg-[#111827]/80 px-6 py-24 text-center backdrop-blur-md md:px-20"
      >
        <h2 className="mb-10 text-4xl font-[Playfair_Display] text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.4)] md:text-5xl">
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <p className="text-sm text-gray-500">
            Events coming soon...
          </p>
        ) : (
          <>
            <div className="mx-auto mb-16 grid max-w-6xl gap-10 md:grid-cols-3">
              {events.slice(0, 3).map((event, index) => {
                const color =
                  eventColors[index % eventColors.length];

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="rounded-xl border bg-[#1a1f2a]/80 p-8 backdrop-blur-md transition-transform hover:scale-[1.02]"
                    style={{
                      borderColor: `${color}40`,
                      boxShadow: `0 0 25px -5px ${color}`,
                    }}
                  >
                    <h3
                      className="mb-2 text-2xl font-semibold"
                      style={{ color }}
                    >
                      {event.title}
                    </h3>

                    <p className="mb-3 text-sm text-gray-400">
                      {event.time}
                    </p>

                    <p className="text-base leading-relaxed text-gray-300">
                      {event.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link href="/events">
                <Button className="rounded-full border-0 bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-4 text-lg tracking-wider text-white transition-transform hover:scale-105">
                  View All Events
                </Button>
              </Link>

              <Link href="/submit-event">
                <Button className="rounded-full border border-[#10B981] bg-transparent px-10 py-4 text-lg tracking-wider text-[#10B981] shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)] transition-transform hover:scale-105 hover:bg-[#10B981]/10">
                  Submit an Event
                </Button>
              </Link>
            </div>
          </>
        )}
      </section>

      <section
        id="contact"
        className="border-t border-[#F59E0B]/20 bg-[#111827]/70 px-6 py-24 backdrop-blur-md md:px-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-[Playfair_Display] text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.4)] md:text-5xl">
              Visit Dozers Grill
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Stop by for great food, cold drinks, live
              music, and events—or contact the
              appropriate Dozers department below.
            </p>
          </div>

          <div className="mb-12 grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center rounded-2xl border border-[#29C3FF]/20 bg-[#0d1117]/50 p-8 shadow-[0_0_25px_-5px_rgba(41,195,255,0.3)]">
              <h3 className="mb-5 text-3xl font-[Playfair_Display] text-white">
                Location & Hours
              </h3>

              <p className="mb-2 text-lg text-gray-300">
                7012 E Hampton Ave
                <br />
                Mesa, AZ 85209
              </p>

              <a
                href="tel:+16026945551"
                className="mb-2 text-lg text-[#29C3FF] transition hover:text-[#F59E0B]"
              >
                (602) 694-5551
              </a>

              <p className="mb-8 text-sm text-gray-400">
                Kitchen: Sun–Thurs 10 AM – 10 PM •
                Fri–Sat 10 AM – 12 AM
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Dozers+Grill+7012+E+Hampton+Ave+Mesa+AZ+85209"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start"
              >
                <Button className="rounded-full border-0 bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-8 py-4 text-white transition-transform hover:scale-105">
                  Get Directions
                </Button>
              </a>
            </div>

            <div className="w-full overflow-hidden rounded-2xl border border-[#29C3FF]/30 shadow-[0_0_25px_-5px_rgba(41,195,255,0.4)]">
              <iframe
                title="Dozers Grill Map"
                src="https://www.google.com/maps?q=Dozers+Grill+Mesa+AZ&hl=en&z=15&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-center text-3xl font-[Playfair_Display] text-white drop-shadow-[0_0_25px_rgba(41,195,255,0.4)]">
              Contact Us
            </h3>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CONTACT_ITEMS.map((contact) => {
                const cardClassName =
                  "group flex min-h-[210px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0d1117]/50 p-6 text-center shadow-[0_0_20px_-8px_rgba(41,195,255,0.4)] transition duration-300 hover:-translate-y-1 hover:border-[#29C3FF]/50 hover:bg-[#29C3FF]/10 hover:shadow-[0_0_25px_-5px_rgba(41,195,255,0.5)]";

                const content = (
                  <>
                    <h4 className="mb-3 text-xl font-semibold text-white transition group-hover:text-[#F59E0B]">
                      {contact.label}
                    </h4>

                    <p className="mb-4 text-sm leading-relaxed text-gray-400">
                      {contact.description}
                    </p>

                    <span className="break-all text-sm font-semibold text-[#29C3FF] transition group-hover:text-white">
                      {contact.href
                        ? contact.action
                        : contact.email}
                    </span>
                  </>
                );

                if (contact.href) {
                  return (
                    <Link
                      key={contact.label}
                      href={contact.href}
                      className={cardClassName}
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <a
                    key={contact.email}
                    href={`mailto:${contact.email}`}
                    className={cardClassName}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#29C3FF]/30 bg-[#0d1117]/80 px-6 py-24 text-center backdrop-blur-md md:px-20">
        <h2 className="mb-10 text-4xl font-[Playfair_Display] text-white drop-shadow-[0_0_25px_rgba(41,195,255,0.5)]">
          Top Customer Reviews
        </h2>

        {loadingReviews ? (
          <p className="text-gray-400">
            Loading reviews...
          </p>
        ) : fourAndFiveStarReviews.length === 0 ? (
          <p className="text-sm text-gray-500">
            No top reviews yet. Check the console for
            the reviews API response.
          </p>
        ) : (
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {fourAndFiveStarReviews
              .slice(0, 6)
              .map((review, index) => (
                <motion.div
                  key={`${review.author}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  className="rounded-2xl border border-[#29C3FF]/20 bg-[#111827]/70 p-6 shadow-[0_0_25px_-5px_rgba(41,195,255,0.3)]"
                >
                  <div className="mb-3 flex flex-col items-center">
                    {review.profile && (
                      <img
                        src={review.profile}
                        alt={review.author}
                        className="mb-2 h-10 w-10 rounded-full border border-[#29C3FF]/40 object-cover"
                      />
                    )}

                    <p className="font-semibold text-[#29C3FF]">
                      {review.author}
                    </p>

                    {review.time && (
                      <p className="text-xs text-gray-500">
                        {review.time}
                      </p>
                    )}
                  </div>

                  <div className="mb-3 flex justify-center text-sm text-[#F59E0B]">
                    {"★".repeat(
                      Math.round(getRating(review.rating))
                    )}
                  </div>

                  <p className="leading-relaxed text-gray-300 italic">
                    “{review.text}”
                  </p>
                </motion.div>
              ))}
          </div>
        )}
      </section>

      <section className="overflow-hidden border-t border-[#10B981]/20 bg-[#111827]/70 px-6 py-20 backdrop-blur-md md:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="text-left">
              <h2 className="text-4xl font-[Playfair_Display] text-white drop-shadow-[0_0_25px_rgba(16,185,129,0.45)]">
                Dozers Insider
              </h2>

              <p className="mt-2 text-sm text-gray-300">
                Local guides, food highlights, and
                what&apos;s going on at Dozers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollInsider("left")}
                aria-label="Scroll left"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#10B981]/30 bg-[#0d1117]/50 shadow-[0_0_18px_-8px_rgba(16,185,129,0.6)] transition hover:bg-[#10B981]/10"
              >
                <span className="text-xl text-white">
                  ‹
                </span>
              </button>

              <button
                onClick={() => scrollInsider("right")}
                aria-label="Scroll right"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#10B981]/30 bg-[#0d1117]/50 shadow-[0_0_18px_-8px_rgba(16,185,129,0.6)] transition hover:bg-[#10B981]/10"
              >
                <span className="text-xl text-white">
                  ›
                </span>
              </button>
            </div>
          </div>

          <div className="relative -mx-6 md:-mx-20">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14 bg-gradient-to-r from-[#111827] via-[#111827] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-gradient-to-l from-[#111827] via-[#111827] to-transparent" />

            <div
              ref={insiderScrollRef}
              className="dozers-insider-scroll flex gap-6 overflow-x-auto scroll-smooth px-6 pb-4 md:px-20"
            >
              {INSIDER_POSTS.map((post, index) => (
                <motion.div
                  key={post.href}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                  }}
                  className="min-w-[280px] rounded-2xl border border-[#10B981]/20 bg-[#1a1f2a]/70 p-7 text-left shadow-[0_0_25px_-8px_rgba(16,185,129,0.45)] backdrop-blur-md transition-transform hover:scale-[1.02] sm:min-w-[340px] md:min-w-[380px]"
                >
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {post.title}
                  </h3>

                  <p className="mb-5 text-sm leading-relaxed text-gray-300">
                    {post.desc}
                  </p>

                  <Link
                    href={post.href}
                    className="inline-flex items-center gap-2 font-semibold text-[#29C3FF] transition hover:text-[#F59E0B]"
                  >
                    Read more
                    <span aria-hidden>→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#29C3FF]/30 bg-[#0d1117]/80 px-6 py-8 text-center text-sm text-gray-400 backdrop-blur-md md:px-10">
        <div className="space-y-3">
          <p>
            © {new Date().getFullYear()} Dozers Grill •
            All Rights Reserved
          </p>

          <div className="flex flex-col items-center justify-center gap-4 text-[#29C3FF] sm:flex-row">
            <Link
              href="/privacy-policy"
              className="underline underline-offset-4 transition hover:text-[#F59E0B]"
            >
              Privacy Policy
            </Link>

            <span className="hidden text-gray-500 sm:block">
              |
            </span>

            <Link
              href="/sms-terms-and-conditions"
              className="underline underline-offset-4 transition hover:text-[#F59E0B]"
            >
              SMS Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}













































