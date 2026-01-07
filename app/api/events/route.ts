import { NextResponse } from "next/server";
import ical from "ical";

export const dynamic = "force-dynamic";

// 7shifts ICS feed
const ICS_URL =
  "https://app.7shifts.com/page/calendar/events/389947/85956d78425eba68b8843bedc8ecbf98";

// Block staff-only / internal items
const BLOCK_KEYWORDS = [
  "work anniversary",
  "anniversary",
  "birthday",
  "staff",
  "meeting",
  "mgr",
  "manager",
  "shift",
  "training",
];

// Detect employee names like "Miles King"
const isEmployeeName = (text: string) =>
  /^[A-Z][a-z]+\s[A-Z][a-z]+/.test(text.trim());

export async function GET() {
  try {
    const res = await fetch(ICS_URL, {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const text = await res.text();
    const parsed = ical.parseICS(text);

    const events: any[] = [];

    for (const key in parsed) {
      const ev = parsed[key];
      if (!ev || ev.type !== "VEVENT") continue;

      const title = (ev.summary || "").trim();
      const lower = title.toLowerCase();

      // ❌ Block employee names
      if (isEmployeeName(title)) continue;

      // ❌ Block staff / internal keywords
      if (BLOCK_KEYWORDS.some((word) => lower.includes(word))) continue;

      // ❌ Must have a valid start date
      if (!ev.start) continue;
      const start = new Date(ev.start as any);
      if (isNaN(start.getTime())) continue;

      events.push({
        id: ev.uid || crypto.randomUUID(),
        title,
        desc: (ev.description || "").replace(/\\n/g, "\n"),
        rawDate: start.toISOString(),
        time: start.toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      });
    }

    // Sort by date
    events.sort(
      (a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
    );

    return NextResponse.json({ events });
  } catch (err) {
    console.error("ICS ERROR:", err);
    return NextResponse.json({ events: [] });
  }
}


























