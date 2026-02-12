"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type EventType = "tournament" | "league" | "special";

export default function SubmitEventPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const [form, setForm] = useState({
    // Date / time
    dateRange: "",
    startTime: "",
    endTime: "",
    daysOfWeek: "",

    // Type
    eventType: "special" as EventType,

    // Notes
    notes: "",

    // Contact info
    requestedBy: "",
    requestDate: "",
    phone: "",
    email: "",

    // Tables / attendance / fees
    tableSize: "7ft" as "7ft" | "9ft",
    numberOfTables: "",
    estimatedAttendance: "",
    greenFees: "",

    // Special request
    specialRequest: "",
  });

  const canSubmit = useMemo(() => {
    // keep this light: require a few basics
    return (
      form.dateRange.trim().length > 0 &&
      form.startTime.trim().length > 0 &&
      form.endTime.trim().length > 0 &&
      form.requestedBy.trim().length > 0 &&
      (form.phone.trim().length > 0 || form.email.trim().length > 0)
    );
  }, [form]);

  const update = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setStatusMsg("");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      setStatus("error");
      setStatusMsg(
        "Please fill in Date/Range, Start/End time, Requested By, and at least a Phone or Email."
      );
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setStatusMsg("");

    try {
      // You can wire this to Supabase or email later.
      // Create an API route at: app/api/submit-event/route.ts
      const res = await fetch("/api/submit-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Request failed");
      }

      setStatus("success");
      setStatusMsg("Submitted! Dozers will review and follow up soon.");
      setForm({
        dateRange: "",
        startTime: "",
        endTime: "",
        daysOfWeek: "",
        eventType: "special",
        notes: "",
        requestedBy: "",
        requestDate: "",
        phone: "",
        email: "",
        tableSize: "7ft",
        numberOfTables: "",
        estimatedAttendance: "",
        greenFees: "",
        specialRequest: "",
      });
    } catch (err: any) {
      setStatus("error");
      setStatusMsg(
        err?.message?.slice(0, 160) ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const FieldLabel = ({
    children,
    optional,
  }: {
    children: React.ReactNode;
    optional?: boolean;
  }) => (
    <div className="mb-2 flex items-center justify-between">
      <span className="text-sm font-semibold tracking-wide text-white/90">
        {children}
      </span>
      {optional && (
        <span className="text-xs text-white/40 tracking-wider uppercase">
          Optional
        </span>
      )}
    </div>
  );

  const inputBase =
    "w-full rounded-xl bg-[#0d1117]/70 border border-[#29C3FF]/20 px-4 py-3 text-sm text-white/90 placeholder:text-white/30 outline-none focus:border-[#29C3FF]/55 focus:shadow-[0_0_25px_-10px_rgba(41,195,255,0.8)] transition";

  const cardBase =
    "rounded-2xl border bg-[#111827]/70 backdrop-blur-md p-6 md:p-8 shadow-[0_0_35px_-20px_rgba(41,195,255,0.35)]";

  return (
    <div className="relative bg-[#0d1117] text-gray-100 overflow-x-hidden min-h-screen">
      {/* Soft background overlay (matches homepage vibe) */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#0d1117]/35 to-[#0d1117]/90 z-0" />

      {/* Header (same style) */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-5 z-50 backdrop-blur-md bg-[#0d1117]/70 border-b border-[#29C3FF]/20">
        <Link href="/" className="flex items-center gap-3">
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
          className="text-white border border-[#29C3FF]/40 px-4 py-2 rounded-md hover:bg-[#29C3FF]/10 transition"
        >
          {menuOpen ? "Close ✕" : "Menu ☰"}
        </button>

        {menuOpen && (
          <div className="absolute top-full right-8 mt-2 w-56 bg-[#111827]/95 border border-[#29C3FF]/30 rounded-xl shadow-lg backdrop-blur-lg z-50">
            <ul className="flex flex-col text-center py-3 text-sm uppercase tracking-wider">
              {["about", "gallery", "events", "contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item}`}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-3 hover:bg-[#29C3FF]/10 text-gray-300 hover:text-[#F59E0B] transition"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/submit-event"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full py-3 hover:bg-[#29C3FF]/10 text-gray-300 hover:text-[#10B981] transition"
                >
                  Submit Event
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Page */}
      <main className="relative z-10 pt-[120px] pb-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-6xl font-[Playfair_Display] font-bold text-white drop-shadow-[0_0_30px_rgba(245,158,11,0.45)]">
              Submit an Event
            </h1>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Fill this out to request a tournament, league night, or special
              event at Dozers. We’ll review it and follow up.
            </p>
          </motion.div>

          <form onSubmit={submit} className="grid lg:grid-cols-2 gap-8">
            {/* Left column: Date / Type / Contact / Tables */}
            <div className={`${cardBase} border-[#29C3FF]/20`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-[Playfair_Display] text-white drop-shadow-[0_0_18px_rgba(41,195,255,0.35)]">
                  Event Details
                </h2>
                <span className="text-xs uppercase tracking-widest text-white/40">
                  Dozer’s Event Form
                </span>
              </div>

              {/* Date/Date Range */}
              <div className="mb-6">
                <FieldLabel>Date / Date Range</FieldLabel>
                <input
                  className={inputBase}
                  value={form.dateRange}
                  onChange={(e) => update("dateRange", e.target.value)}
                  placeholder='Example: "Feb 22, 2026" or "Feb 22–24, 2026"'
                />
              </div>

              {/* Start/End Time */}
              <div className="mb-6 grid md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Start Time</FieldLabel>
                  <input
                    className={inputBase}
                    value={form.startTime}
                    onChange={(e) => update("startTime", e.target.value)}
                    placeholder='Example: "7:00 PM"'
                  />
                </div>
                <div>
                  <FieldLabel>End Time</FieldLabel>
                  <input
                    className={inputBase}
                    value={form.endTime}
                    onChange={(e) => update("endTime", e.target.value)}
                    placeholder='Example: "11:30 PM"'
                  />
                </div>
              </div>

              {/* Days of week */}
              <div className="mb-8">
                <FieldLabel optional>Day(s) of the week</FieldLabel>
                <input
                  className={inputBase}
                  value={form.daysOfWeek}
                  onChange={(e) => update("daysOfWeek", e.target.value)}
                  placeholder='Example: "Mon–Thu" or "Friday"'
                />
              </div>

              {/* Type Select */}
              <div className="mb-8">
                <FieldLabel>Select One</FieldLabel>
                <div className="grid sm:grid-cols-3 gap-3">
                  {(
                    [
                      { key: "tournament", label: "Tournament" },
                      { key: "league", label: "League" },
                      { key: "special", label: "Special Event" },
                    ] as const
                  ).map((t) => {
                    const active = form.eventType === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => update("eventType", t.key)}
                        className={[
                          "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                          active
                            ? "border-[#10B981]/60 bg-[#10B981]/10 text-[#10B981] shadow-[0_0_24px_-10px_rgba(16,185,129,0.9)]"
                            : "border-[#29C3FF]/20 bg-[#0d1117]/60 text-white/70 hover:bg-white/5 hover:border-[#29C3FF]/45",
                        ].join(" ")}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white/90 mb-4">
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <FieldLabel>Requested By</FieldLabel>
                    <input
                      className={inputBase}
                      value={form.requestedBy}
                      onChange={(e) => update("requestedBy", e.target.value)}
                      placeholder="Name / Organization"
                    />
                  </div>

                  <div>
                    <FieldLabel optional>Date</FieldLabel>
                    <input
                      className={inputBase}
                      value={form.requestDate}
                      onChange={(e) => update("requestDate", e.target.value)}
                      placeholder='Example: "02/11/2026"'
                    />
                  </div>

                  <div>
                    <FieldLabel>Phone</FieldLabel>
                    <input
                      className={inputBase}
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(###) ###-####"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FieldLabel>Email</FieldLabel>
                    <input
                      className={inputBase}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="name@email.com"
                    />
                    <p className="mt-2 text-xs text-white/40">
                      Provide at least a phone or email so Dozers can follow up.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tables needed / Attendance / Fees */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white/90 mb-4">
                  Tables / Attendance / Fees
                </h3>

                {/* Tables Needed (7ft / 9ft) */}
                <div className="mb-4">
                  <FieldLabel optional>Tables Needed</FieldLabel>
                  <div className="grid grid-cols-2 gap-3">
                    {(["7ft", "9ft"] as const).map((sz) => {
                      const active = form.tableSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => update("tableSize", sz)}
                          className={[
                            "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                            active
                              ? "border-[#29C3FF]/60 bg-[#29C3FF]/10 text-[#29C3FF] shadow-[0_0_24px_-10px_rgba(41,195,255,0.9)]"
                              : "border-[#29C3FF]/20 bg-[#0d1117]/60 text-white/70 hover:bg-white/5 hover:border-[#29C3FF]/45",
                          ].join(" ")}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <FieldLabel optional>Number of Tables</FieldLabel>
                    <input
                      className={inputBase}
                      value={form.numberOfTables}
                      onChange={(e) => update("numberOfTables", e.target.value)}
                      placeholder="0"
                      inputMode="numeric"
                    />
                  </div>

                  <div>
                    <FieldLabel optional>Estimated Attendance</FieldLabel>
                    <input
                      className={inputBase}
                      value={form.estimatedAttendance}
                      onChange={(e) =>
                        update("estimatedAttendance", e.target.value)
                      }
                      placeholder="0"
                      inputMode="numeric"
                    />
                  </div>

                  <div>
                    <FieldLabel optional>Green Fees</FieldLabel>
                    <input
                      className={inputBase}
                      value={form.greenFees}
                      onChange={(e) => update("greenFees", e.target.value)}
                      placeholder='Example: "$10"'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Notes / Special Request */}
            <div className={`${cardBase} border-[#F59E0B]/20`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-[Playfair_Display] text-white drop-shadow-[0_0_18px_rgba(245,158,11,0.35)]">
                  Notes & Requests
                </h2>
                <span className="text-xs uppercase tracking-widest text-white/40">
                  Details
                </span>
              </div>

              {/* Notes */}
              <div className="mb-8">
                <FieldLabel optional>Notes</FieldLabel>
                <textarea
                  className={`${inputBase} min-h-[220px] resize-none`}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Anything Dozers should know (setup, format, prize details, etc.)"
                />
              </div>

              {/* Special Request */}
              <div className="mb-10">
                <FieldLabel optional>Special Request</FieldLabel>
                <textarea
                  className={`${inputBase} min-h-[160px] resize-none`}
                  value={form.specialRequest}
                  onChange={(e) => update("specialRequest", e.target.value)}
                  placeholder="Example: reserved section, sound setup, food package, sponsor signage, etc."
                />
              </div>

              {/* Status */}
              {status !== "idle" && (
                <div
                  className={[
                    "mb-6 rounded-xl border px-4 py-3 text-sm",
                    status === "success"
                      ? "border-[#10B981]/40 bg-[#10B981]/10 text-[#10B981]"
                      : "border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#F59E0B]",
                  ].join(" ")}
                >
                  {statusMsg}
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link href="/events" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto border border-[#29C3FF]/40 bg-transparent text-white hover:bg-[#29C3FF]/10 px-8 py-4 rounded-full">
                    Back to Events
                  </Button>
                </Link>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-10 py-4 rounded-full text-lg tracking-wider hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
                >
                  {submitting ? "Submitting..." : "Submit Event"}
                </Button>
              </div>

              <p className="mt-4 text-xs text-white/35">
                Office Use Only fields can be added later (internal approval,
                pricing, or staff notes).
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 md:px-10 border-t border-[#29C3FF]/30 bg-[#0d1117]/80 backdrop-blur-md text-center text-gray-400">
        © 2025 Dozers Grill • All Rights Reserved
      </footer>
    </div>
  );
}
