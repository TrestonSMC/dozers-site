"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CONTACT_EMAILS = [
  {
    label: "Events & Reservations",
    description:
      "Questions about upcoming events and private gatherings.",
    email: "events@dozersgrill.com",
  },
  {
    label: "Employment Opportunities",
    description:
      "Interested in joining the Dozers Grill team?",
    email: "staffing@dozersgrill.com",
  },
  {
    label: "Bands & Entertainment",
    description:
      "Live music, performers, and entertainment inquiries.",
    email: "stage@dozersgrill.com",
  },
  {
    label: "Vendor Invoices",
    description:
      "Accounts payable and vendor invoice submissions.",
    email: "ap@dozersgrill.com",
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d1117] text-gray-100">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 h-full w-full object-cover brightness-[0.8] contrast-[1.05]"
      >
        <source
          src="https://djethkxabnuydbbnbsgn.supabase.co/storage/v1/object/public/dozers-videos/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#0d1117]/40 to-[#0d1117]/90" />

      {/* Header */}
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#29C3FF]/20 bg-[#0d1117]/70 px-6 py-5 backdrop-blur-md md:px-8">
        <Link
          href="/"
          aria-label="Return to the Dozers Grill homepage"
        >
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Grill Logo"
            width={140}
            height={60}
            className="cursor-pointer drop-shadow-[0_0_20px_rgba(41,195,255,0.4)]"
            priority
          />
        </Link>

        <Link
          href="/"
          className="rounded-md border border-[#29C3FF]/40 px-4 py-2 text-white transition hover:bg-[#29C3FF]/10"
        >
          Home
        </Link>
      </header>

      {/* Page content */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-40">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16 text-center font-[Playfair_Display] text-5xl font-bold text-white drop-shadow-[0_0_35px_rgba(245,158,11,0.6)] md:text-7xl"
        >
          Visit Dozers Grill
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#111827]/70 p-6 shadow-[0_0_25px_-5px_rgba(41,195,255,0.3)] backdrop-blur-md md:p-10"
        >
          {/* Location and hours */}
          <section>
            <h2 className="mb-6 text-center font-[Playfair_Display] text-3xl text-white drop-shadow-[0_0_25px_rgba(41,195,255,0.5)]">
              Location & Hours
            </h2>

            <div className="mb-10 text-center text-lg text-gray-300">
              <p>7012 E Hampton Ave, Mesa, AZ 85209</p>

              <a
                href="tel:+16026945551"
                className="mt-2 inline-block transition hover:text-[#29C3FF]"
              >
                (602) 694-5551
              </a>

              <p className="mt-2 font-medium text-white">
                Open Daily: 10 AM – 2 AM
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Kitchen Hours: Mon–Thurs 4 PM–10 PM •
                Fri–Sun 10 AM–10 PM
              </p>
            </div>
          </section>

          {/* Contact emails */}
          <section className="mb-10">
            <h2 className="mb-6 text-center font-[Playfair_Display] text-3xl text-white drop-shadow-[0_0_25px_rgba(41,195,255,0.5)]">
              Contact Us
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CONTACT_EMAILS.map((contact) => (
                <a
                  key={contact.email}
                  href={`mailto:${contact.email}`}
                  className="group rounded-xl border border-white/10 bg-white/5 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-[#29C3FF]/50 hover:bg-[#29C3FF]/10 hover:shadow-[0_0_20px_-5px_rgba(41,195,255,0.5)]"
                >
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {contact.label}
                  </h3>

                  <p className="mb-3 text-sm leading-relaxed text-gray-400">
                    {contact.description}
                  </p>

                  <p className="break-all text-sm font-medium text-[#29C3FF] transition group-hover:text-white">
                    {contact.email}
                  </p>
                </a>
              ))}
            </div>

            {/* Event submission */}
            <div className="mt-8 rounded-xl border border-[#10B981]/30 bg-[#10B981]/5 p-6 text-center shadow-[0_0_25px_-8px_rgba(16,185,129,0.5)]">
              <h3 className="text-xl font-semibold text-white">
                Want to Host an Event at Dozers?
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
                Send us your event information and our
                team will review the details.
              </p>

              <Link
                href="/submit-event"
                className="mt-5 inline-flex rounded-full border border-[#10B981] bg-[#10B981]/10 px-8 py-4 text-lg font-medium tracking-wider text-[#10B981] shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)] transition hover:scale-105 hover:bg-[#10B981]/20 hover:text-white"
              >
                Submit an Event
              </Link>
            </div>
          </section>

          {/* Map */}
          <section>
            <div className="overflow-hidden rounded-xl border border-[#29C3FF]/30 shadow-[0_0_25px_-5px_rgba(41,195,255,0.4)]">
              <iframe
                title="Dozers Grill location on Google Maps"
                src="https://www.google.com/maps?q=Dozers+Grill+Mesa+AZ&hl=en&z=15&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 px-6 py-6 text-center text-gray-400 backdrop-blur-md md:px-10">
        © {new Date().getFullYear()} Dozers Grill • All
        Rights Reserved
      </footer>
    </div>
  );
}


