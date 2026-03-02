// app/api/events/route.ts
import { NextResponse } from "next/server";
import ical from "ical";

export const dynamic = "force-dynamic";
// Extra: ensure Next never revalidates/caches this route
export const revalidate = 0;

const ICS_URL =
  "https://app.7shifts.com/page/calendar/events/389947/85956d78425eba68b8843bedc8ecbf98";

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
  "one on one",
  "1:1",
  "interview",
];

const safeDate = (v: string | null) => {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

function noCacheHeaders() {
  return {
    // Prevent browser + CDN caching
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
    // Some CDNs respect this
    "Surrogate-Control": "no-store",
  };
}

function isBlockedTitle(title: string) {
  const lower = title.toLowerCase();
  if (!title.trim()) return true;
  if (lower.startsWith("cancelled") || lower.startsWith("canceled")) return true;
  if (BLOCK_KEYWORDS.some((w) => lower.includes(w))) return true;
  return false;
}

// Normalize date key format used by node-ical for recurrences
function toRecurrenceKey(d: Date) {
  return d.toISOString();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const now = new Date();
    const start =
      safeDate(searchParams.get("start")) ??
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const end =
      safeDate(searchParams.get("end")) ??
      new Date(now.getFullYear(), now.getMonth() + 12, now.getDate(), 0, 0, 0);

    if (start.getTime() >= end.getTime()) {
      return NextResponse.json(
        { events: [], meta: { start: start.toISOString(), end: end.toISOString(), count: 0, lastUpdated: new Date().toISOString() } },
        { headers: noCacheHeaders() }
      );
    }

    // ✅ Stronger cache-bust (changes every request)
    const icsUrl = `${ICS_URL}${ICS_URL.includes("?") ? "&" : "?"}cb=${Date.now()}-${Math.random()
      .toString(16)
      .slice(2)}`;

    const res = await fetch(icsUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
        // Extra "please don't cache" hints (some servers/CDNs respect these)
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    if (!res.ok) {
      console.error("ICS FETCH ERROR:", res.status, res.statusText);
      return NextResponse.json(
        { events: [], meta: { start: start.toISOString(), end: end.toISOString(), count: 0, lastUpdated: new Date().toISOString() } },
        { headers: noCacheHeaders() }
      );
    }

    const text = await res.text();
    const parsed = ical.parseICS(text);

    const out: any[] = [];

    for (const key in parsed) {
      const ev: any = (parsed as any)[key];
      if (!ev || ev.type !== "VEVENT") continue;

      const title = String(ev.summary || "").trim();
      if (isBlockedTitle(title)) continue;

      const baseDesc = String(ev.description || "").replace(/\\n/g, "\n").trim();

      if (!ev.start) continue;
      const baseStart = new Date(ev.start as any);
      if (Number.isNaN(baseStart.getTime())) continue;

      // ✅ Non-recurring
      if (!ev.rrule) {
        if (baseStart < start || baseStart >= end) continue;

        out.push({
          id: ev.uid || crypto.randomUUID(),
          title,
          desc: baseDesc,
          rawDate: baseStart.toISOString(),
          time: baseStart.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          }),
        });
        continue;
      }

      // ✅ Recurring: expand occurrences in the requested range
      try {
        const between: Date[] = ev.rrule.between(start, end, true);

        for (const occStart of between) {
          // Respect EXDATE
          if (ev.exdate) {
            const k1 = occStart.toISOString();
            const k2 = k1.replace(/[-:]/g, "").split(".")[0] + "Z";
            if (ev.exdate[k1] || ev.exdate[k2]) continue;
          }

          // Check overrides in recurrences (edited single occurrences)
          let instance = ev;
          if (ev.recurrences) {
            const rk1 = toRecurrenceKey(occStart);
            const rk2 = rk1.replace(".000Z", "Z");
            instance = ev.recurrences[rk1] || ev.recurrences[rk2] || ev;
          }

          const instTitle = String(instance.summary || title).trim();
          if (isBlockedTitle(instTitle)) continue;

          const instDesc = String(instance.description || baseDesc)
            .replace(/\\n/g, "\n")
            .trim();

          const startDt = new Date(occStart);
          if (startDt < start || startDt >= end) continue;

          out.push({
            id: `${ev.uid || "event"}-${startDt.toISOString()}`,
            title: instTitle,
            desc: instDesc,
            rawDate: startDt.toISOString(),
            time: startDt.toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }),
          });
        }
      } catch (e) {
        // Fallback if RRULE expansion fails
        if (baseStart >= start && baseStart < end) {
          out.push({
            id: ev.uid || crypto.randomUUID(),
            title,
            desc: baseDesc,
            rawDate: baseStart.toISOString(),
            time: baseStart.toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }),
          });
        }
      }
    }

    out.sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());

    // De-dupe
    const seen = new Set<string>();
    const events = out.filter((e) => {
      const k = `${e.title}__${e.rawDate}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    return NextResponse.json(
      {
        events,
        meta: {
          start: start.toISOString(),
          end: end.toISOString(),
          count: events.length,
          lastUpdated: new Date().toISOString(),
        },
      },
      { headers: noCacheHeaders() }
    );
  } catch (err) {
    console.error("ICS ERROR:", err);
    return NextResponse.json(
      { events: [], meta: { start: "", end: "", count: 0, lastUpdated: new Date().toISOString() } },
      { headers: noCacheHeaders() }
    );
  }
}

























