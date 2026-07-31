"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const jobs = [
  {
    title: "Barback",
    description:
      "Help keep the bar stocked, organized, and running smoothly during every shift.",
    link: "https://jobs.7shifts.com/62f61f95-273c-4665-a04b-849a99b06f80",
    color: "#29C3FF",
  },
  {
    title: "Line Cook / Prep Cook",
    description:
      "Prepare great food, maintain a clean station, and support a fast-moving kitchen team.",
    link: "https://jobs.7shifts.com/b02a205b-ef82-4a16-b174-a04e262ad638",
    color: "#F59E0B",
  },
  {
    title: "Server",
    description:
      "Create a welcoming guest experience through attentive, friendly, and dependable service.",
    link: "https://jobs.7shifts.com/e382ff70-a549-4bac-a926-23753237f434",
    color: "#10B981",
  },
  {
    title: "Bartender",
    description:
      "Serve quality drinks, connect with guests, and help create the energy that defines Dozers.",
    link: "https://jobs.7shifts.com/f5ec69ce-87bb-4b6e-9e9c-d9736cd5aa59",
    color: "#A855F7",
  },
];

const fitItems = [
  "Show up ready to work",
  "Treat people with respect",
  "Talk to people directly, not behind their backs",
  "Take responsibility for your actions",
  "Help your teammates without being asked",
  "Stay calm when things get busy",
  "Take pride in doing things well",
  "Want to grow and get better",
];

const notFitItems = [
  "Gossip, complain, or stir up drama",
  "Blame others for your mistakes",
  "Make excuses instead of owning your actions",
  "Bring hostility, attitude, or ego",
  "Expect others to carry your weight",
  "Can’t handle feedback",
  "Don’t want to work with people of different ages or backgrounds",
];

const navigation = [
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Live Music", href: "/live-music" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function CareersPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d1117] text-gray-100">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(41,195,255,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_35%)]" />

      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117]/50 via-[#0d1117]/90 to-[#0d1117]" />

      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#29C3FF]/20 bg-[#0d1117]/80 px-8 py-5 backdrop-blur-md">
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
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="rounded-md border border-[#29C3FF]/40 px-4 py-2 text-white transition hover:bg-[#29C3FF]/10"
        >
          {menuOpen ? "Close ✕" : "Menu ☰"}
        </button>

        {menuOpen && (
          <div className="absolute right-8 top-full z-50 mt-2 w-64 rounded-xl border border-[#29C3FF]/30 bg-[#111827]/95 shadow-lg backdrop-blur-lg">
            <ul className="flex flex-col py-3 text-center text-sm uppercase tracking-wider">
              {navigation.map((item) => (
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

      <main className="relative z-10">
        {/* Hero */}
        <section className="flex min-h-[85vh] items-center justify-center px-6 pb-20 pt-36 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-5xl"
          >
            <p className="mb-5 text-sm uppercase tracking-[0.4em] text-[#F59E0B]">
              Join the Dozers Team
            </p>

            <h1 className="font-[Playfair_Display] text-5xl font-bold text-white drop-shadow-[0_0_35px_rgba(41,195,255,0.45)] md:text-7xl">
              Help Us Build Something Better
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
              Before applying, take a few minutes to learn who we are, what we
              expect from our team, and the culture we’re working to build.
            </p>

            <a
              href="#our-culture"
              className="mt-10 inline-flex rounded-full bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-4 text-lg font-semibold text-white transition hover:scale-105"
            >
              Read Our Culture
            </a>
          </motion.div>
        </section>

        {/* Why and Culture Manifesto */}
        <section
          id="our-culture"
          className="scroll-mt-24 border-t border-[#10B981]/20 px-6 py-24 md:px-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#10B981]">
                The Why
              </p>

              <h2 className="font-[Playfair_Display] text-4xl text-white md:text-5xl">
                Why We Exist
              </h2>

              <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-gray-300">
                We exist to give our community a safe, positive place to
                gather—a place for families, friends, and couples to enjoy
                themselves. We’re here to build a team that works hard, treats
                people right, and takes pride in delivering a great experience
                for everyone who walks through the door.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-[#29C3FF]/25 bg-[#111827]/75 p-8 shadow-[0_0_35px_-15px_rgba(41,195,255,0.6)] md:p-12"
            >
              <h2 className="mb-8 font-[Playfair_Display] text-4xl text-white">
                Culture Manifesto
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-gray-300">
                <p>
                  We are building a place where people feel safe, welcome, and
                  respected. A place where families, friends, and couples can
                  relax, have fun, and enjoy good food and good energy.
                </p>

                <p>
                  We show up as decent human beings. We talk to each other
                  honestly. We help each other out. We stay present and take
                  pride in what we do.
                </p>

                <p>
                  We don’t gossip. We don’t blame. We don’t create drama. We
                  don’t bring hostility, cliques, laziness, or excuses into this
                  place. If we mess up, we own it and fix it.
                </p>

                <p>
                  We treat everyone with respect—teammates, guests, and
                  ourselves. We assume good intent. We stay calm. We stay
                  steady. We don’t take our stress out on other people.
                </p>

                <p>
                  We do the right thing even when no one is watching. We take
                  care of the space, the guests, and each other. We pitch in
                  because that’s how a team works.
                </p>

                <p>
                  We don’t tolerate people who refuse to take responsibility for
                  their actions. We don’t tolerate people who make things harder
                  for everyone else. This is a place for grown-ups who want to
                  work, not for drama or ego.
                </p>

                <p>
                  We’re not perfect, but we’re trying—and we expect everyone
                  here to try too. We learn, grow, and support each other so this
                  place can become something we’re proud of.
                </p>

                <p className="border-l-4 border-[#F59E0B] pl-6 text-xl font-semibold text-white">
                  This is who we are becoming. This is the standard. This is the
                  culture we protect.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Culture Fit */}
        <section className="border-t border-white/10 bg-[#111827]/75 px-6 py-24 backdrop-blur-md md:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F59E0B]">
                Culture Fit
              </p>

              <h2 className="font-[Playfair_Display] text-4xl text-white md:text-5xl">
                Is Dozers Right for You?
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-[#10B981]/35 bg-[#0d1117]/75 p-8 shadow-[0_0_30px_-15px_rgba(16,185,129,0.7)]"
              >
                <h3 className="mb-7 text-2xl font-semibold text-[#10B981]">
                  You’ll Fit In Here If You:
                </h3>

                <ul className="space-y-4">
                  {fitItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className="mt-0.5 font-bold text-[#10B981]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-[#F59E0B]/35 bg-[#0d1117]/75 p-8 shadow-[0_0_30px_-15px_rgba(245,158,11,0.7)]"
              >
                <h3 className="mb-7 text-2xl font-semibold text-[#F59E0B]">
                  You Won’t Fit In Here If You:
                </h3>

                <ul className="space-y-4">
                  {notFitItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className="mt-0.5 font-bold text-[#F59E0B]">×</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <p className="mx-auto mt-12 max-w-4xl text-center text-xl leading-relaxed text-white">
              This is a place for adults who want to work hard, be decent, and
              help build something better.
            </p>
          </div>
        </section>

        {/* Leadership */}
        <section className="border-t border-[#A855F7]/20 px-6 py-24 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-5xl rounded-3xl border border-[#A855F7]/30 bg-gradient-to-br from-[#111827]/90 to-[#0d1117]/90 p-8 shadow-[0_0_40px_-18px_rgba(168,85,247,0.7)] md:p-12"
          >
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#A855F7]">
              Leadership
            </p>

            <h2 className="mb-8 font-[Playfair_Display] text-4xl text-white">
              Leaders Set the Tone
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-gray-300">
              <p>
                Leaders here set the tone. How you act is how the team will act.
              </p>

              <p>
                Leaders stay calm, steady, and respectful—even when things get
                stressful. You don’t get to lose your cool, gossip, or avoid
                hard conversations.
              </p>

              <p>
                Leaders talk to people directly. You don’t hint, vent to others,
                or let problems sit. You address issues early, clearly, and with
                respect.
              </p>

              <p>
                Leaders hold the line and protect the vibe. You don’t let drama
                grow, standards slide, or look the other way when someone is
                making things harder for the team.
              </p>

              <p>
                Leaders take responsibility for their own behavior first. You
                ask yourself, “How am I contributing to this?” before pointing
                at anyone else.
              </p>

              <p>
                Leaders show up. You’re present, aware, and involved. You don’t
                disappear, and you don’t micromanage. You support people, guide
                them, and help them get better.
              </p>

              <p>
                Leaders earn trust by being consistent, fair, and honest. You
                don’t play favorites, talk down to people, or make things
                personal.
              </p>

              <p className="border-l-4 border-[#A855F7] pl-6 text-xl font-semibold text-white">
                This is the standard for leadership here. If you want the title,
                you live the behavior.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Open Positions */}
        <section
          id="open-positions"
          className="scroll-mt-24 border-t border-[#F59E0B]/20 bg-[#111827]/70 px-6 py-24 backdrop-blur-md md:px-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#29C3FF]">
                Now Hiring
              </p>

              <h2 className="font-[Playfair_Display] text-4xl text-white md:text-5xl">
                Open Positions
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-gray-300">
                If our culture and standards sound like the right fit, select a
                position to view the full job posting and submit your
                application securely through 7shifts.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {jobs.map((job, index) => (
                <motion.article
                  key={job.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group rounded-2xl border bg-[#0d1117]/75 p-8 backdrop-blur-md transition hover:-translate-y-1"
                  style={{
                    borderColor: `${job.color}55`,
                    boxShadow: `0 0 30px -12px ${job.color}`,
                  }}
                >
                  <div
                    className="mb-6 h-1 w-16 rounded-full"
                    style={{ backgroundColor: job.color }}
                  />

                  <h3 className="mb-4 text-3xl font-semibold text-white">
                    {job.title}
                  </h3>

                  <p className="mb-8 leading-relaxed text-gray-300">
                    {job.description}
                  </p>

                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-[#0d1117] transition group-hover:scale-105"
                    style={{ backgroundColor: job.color }}
                  >
                    Apply Through 7shifts
                    <span aria-hidden="true">→</span>
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-[#29C3FF]/20 bg-[#0d1117]/80 px-6 py-24 text-center backdrop-blur-md">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-[Playfair_Display] text-4xl text-white md:text-5xl">
              Ready to Join the Team?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              If our standards sound like the kind of workplace you want to help
              build, choose an open position and apply today.
            </p>

            <a
              href="#open-positions"
              className="mt-9 inline-flex rounded-full bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-4 text-lg font-semibold text-white transition hover:scale-105"
            >
              View Open Positions
            </a>

            <div className="mt-14 text-gray-300">
              <p className="italic">
                “I look forward to the adventure and having you all by my side.”
              </p>

              <p className="mt-5 font-semibold text-white">Eric Sunman</p>
              <p className="text-sm text-gray-400">
                Owner / General Manager
              </p>
              <p className="text-sm text-gray-400">Dozers Grill</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/90 px-6 py-8 text-center text-sm text-gray-400 backdrop-blur-md">
        <div className="space-y-3">
          <p>© 2026 Dozers Grill • All Rights Reserved</p>

          <div className="flex flex-col items-center justify-center gap-4 text-[#29C3FF] sm:flex-row">
            <Link
              href="/privacy-policy"
              className="underline underline-offset-4 transition hover:text-[#F59E0B]"
            >
              Privacy Policy
            </Link>

            <span className="hidden text-gray-500 sm:block">|</span>

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