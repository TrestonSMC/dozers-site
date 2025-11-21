import { NextResponse } from "next/server";
import ical from "ical";
import { recurringEvents } from "./recurring";

const ICS_URL =
  "https://app.7shifts.com/page/calendar/events/389947/85956d78425eba68b8843bedc8ecbf98.ics";

// ⭐ Generate recurring events for the next 6 months
function generateRecurringEvents() {
  const today = new Date();
  const events: any[] = [];

  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const date = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    recurringEvents.forEach((rec) => {
      // Loop all days in month
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const d = new Date(year, month, day);
        if (d.getDay() === rec.dayOfWeek) {
          // Build datetime + time
          const [h, m] = rec.time.split(":").map(Number);
          d.setHours(h, m, 0, 0);

          events.push({
            id: `${rec.title}-${year}-${month + 1}-${day}`,
            title: rec.title,
            desc: rec.desc,
            rawDate: d.toISOString(),
            time: d.toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }),
          });
        }
      }
    });
  }

  return events;
}

export async function GET() {
  try {
    // ⭐ 1. Get recurring events first
    const recurring = generateRecurringEvents();

    // ⭐ 2. Fetch ICS from 7shifts
    const res = await fetch(ICS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/calendar",
      },
    });

    const text = await res.text();
    const parsed = ical.parseICS(text);

    const icsEvents: any[] = [];

    for (const key in parsed) {
      const ev = parsed[key];
      if (!ev || ev.type !== "VEVENT") continue;

      const title = ev.summary || "";
      const lower = title.toLowerCase();

      // ❌ BLOCK staff / birthdays / work
      if (
        lower.includes("birthday") ||
        lower.includes("anniversary") ||
        lower.includes("work") ||
        lower.includes("shift") ||
        lower.includes("staff") ||
        lower.includes("pto") ||
        lower.includes("vacation") ||
        lower.includes("availability") ||
        lower.includes("unavailability") ||
        lower.includes("meeting") ||
        lower.includes("manager") ||
        lower.includes("interview") ||
        lower.includes("call in") ||
        lower.includes("call-in") ||
        lower.includes("on call")
      ) {
        continue;
      }

      // ⭐ SAFE DATE PARSING
      let start: Date | null = null;
      try {
        const rawStart: any = ev.start ?? null;
        start = rawStart ? new Date(rawStart) : null;
      } catch {
        start = null;
      }
      if (!start || isNaN(start.getTime())) continue;

      const cleanDesc = (ev.description || "").replace(/\\n/g, "\n");

      icsEvents.push({
        id: ev.uid || crypto.randomUUID(),
        title,
        desc: cleanDesc,
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

    // ⭐ 3. Merge ICS + Recurring
    const merged = [...recurring, ...icsEvents];

    // ⭐ 4. Remove duplicates
    const unique = merged.reduce((acc, event) => {
      if (!acc.some((e: { title: any; rawDate: any; }) => e.title === event.title && e.rawDate === event.rawDate)) {
        acc.push(event);
      }
      return acc;
    }, [] as any[]);

    // ⭐ 5. Sort by date
    unique.sort(
      (a: { rawDate: string | number | Date; }, b: { rawDate: string | number | Date; }) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
    );

    return NextResponse.json({ events: unique });
  } catch (err) {
    console.error("ICS ERROR:", err);
    return NextResponse.json({ events: [] });
  }
}













