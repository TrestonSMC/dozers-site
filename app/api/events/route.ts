import { NextResponse } from "next/server";
import ical from "ical";

const ICS_URL =
  "https://app.7shifts.com/calendar/events/402227/2f0448f8c89dfbcbaca21a035a43436.ics";

export async function GET() {
  if (!ICS_URL) return NextResponse.json({ events: [] });

  try {
    // 7shifts requires headers or it denies access
    const res = await fetch(ICS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/calendar",
      },
    });

    const text = await res.text();
    const parsed = ical.parseICS(text);

    const events: any[] = [];

    for (const key in parsed) {
      const ev = parsed[key];
      if (ev.type === "VEVENT") {
        events.push({
          id:
            ev.uid ||
            ev.summary?.replace(/\s+/g, "-").toLowerCase() ||
            crypto.randomUUID(),
          title: ev.summary || "",
          desc: ev.description || "",
          time: ev.start
            ? new Date(ev.start).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })
            : "",
          color: "#29C3FF",
        });
      }
    }

    return NextResponse.json({ events });
  } catch (error) {
    console.error("ICS ERROR:", error);
    return NextResponse.json({ events: [] });
  }
}
