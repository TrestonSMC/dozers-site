import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Music2,
  Plus,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ShowActions from "./show-actions";

type LiveMusicShow = {
  id: string;
  title: string;
  show_date: string;
  show_time: string;
  description: string;
  tags: string[];
  accent_color: string;
  poster_url: string;
  is_published: boolean;
  sort_order: number;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  const date = new Date();

  date.setHours(Number(hours), Number(minutes), 0, 0);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminLiveMusicPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("live_music_shows")
    .select(
      `
        id,
        title,
        show_date,
        show_time,
        description,
        tags,
        accent_color,
        poster_url,
        is_published,
        sort_order
      `
    )
    .order("show_date", { ascending: true })
    .order("show_time", { ascending: true });

  const shows = (data ?? []) as LiveMusicShow[];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#29C3FF]">
            Website Content
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Live Music
          </h1>

          <p className="mt-2 text-gray-400">
            Add shows, upload posters, and control what
            appears on the public website.
          </p>
        </div>

        <Link
          href="/admin/live-music/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#29C3FF] px-5 py-3 font-bold text-[#071016] transition hover:bg-[#62d3ff]"
        >
          <Plus className="h-5 w-5" />
          Add Live Show
        </Link>
      </div>

      {error && (
        <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
          <p className="font-semibold text-red-200">
            The live shows could not be loaded.
          </p>

          <p className="mt-1 text-sm text-red-200/70">
            {error.message}
          </p>
        </div>
      )}

      {!error && shows.length === 0 && (
        <section className="mt-8 flex min-h-96 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#29C3FF]/10 text-[#29C3FF]">
            <Music2 className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-xl font-bold">
            No managed shows yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
            Add the first show to test the poster upload
            and publishing system.
          </p>

          <Link
            href="/admin/live-music/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-[#29C3FF]/40 hover:text-[#29C3FF]"
          >
            <Plus className="h-4 w-4" />
            Add the first show
          </Link>
        </section>
      )}

      {!error && shows.length > 0 && (
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {shows.length}{" "}
              {shows.length === 1 ? "show" : "shows"}
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {shows.map((show) => (
              <article
                key={show.id}
                className="overflow-hidden rounded-2xl border bg-white/[0.04]"
                style={{
                  borderColor: `${show.accent_color}45`,
                  boxShadow:
                    `0 0 30px -20px ${show.accent_color}`,
                }}
              >
                <div className="grid min-h-72 sm:grid-cols-[190px_1fr]">
                  <div className="relative min-h-64 bg-black/30 sm:min-h-full">
                    {show.poster_url ? (
                      <img
                        src={show.poster_url}
                        alt={`${show.title} poster`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-64 items-center justify-center">
                        <Music2 className="h-9 w-9 text-gray-700" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            color: show.accent_color,
                            borderColor:
                              `${show.accent_color}50`,
                            backgroundColor:
                              `${show.accent_color}12`,
                          }}
                        >
                          {show.is_published
                            ? "Published"
                            : "Draft"}
                        </span>

                        <h2 className="mt-3 text-2xl font-bold text-white">
                          {show.title}
                        </h2>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[#29C3FF]" />
                        {formatDate(show.show_date)}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#29C3FF]" />
                        {formatTime(show.show_time)}
                      </div>
                    </div>

                    {show.description && (
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                        {show.description}
                      </p>
                    )}

                    {show.tags?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {show.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-wider text-gray-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-5">
                      <ShowActions
                        id={show.id}
                        title={show.title}
                        isPublished={show.is_published}
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}