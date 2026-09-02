"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  ImagePlus,
  Music2,
  Save,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const accentColors = [
  { name: "Blue", value: "#29C3FF" },
  { name: "Gold", value: "#F59E0B" },
  { name: "Green", value: "#10B981" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
  { name: "Red", value: "#EF4444" },
];

export default function NewLiveMusicPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [poster, setPoster] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handlePosterChange(file: File | null) {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPoster(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    let uploadedPosterPath = "";

    try {
      const form = new FormData(event.currentTarget);

      const title = String(
        form.get("title") || ""
      ).trim();

      const showDate = String(
        form.get("show_date") || ""
      );

      const showTime = String(
        form.get("show_time") || ""
      );

      const description = String(
        form.get("description") || ""
      ).trim();

      const tags = String(form.get("tags") || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const accentColor = String(
        form.get("accent_color") || "#29C3FF"
      );

      const isPublished =
        form.get("is_published") === "on";

      if (!title || !showDate || !showTime) {
        throw new Error(
          "Band name, show date, and show time are required."
        );
      }

      if (!poster) {
        throw new Error("Please choose a poster image.");
      }

      if (poster.size > 10 * 1024 * 1024) {
        throw new Error(
          "The poster must be smaller than 10 MB."
        );
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(poster.type)) {
        throw new Error(
          "The poster must be a JPG, PNG, or WebP image."
        );
      }

      const extension =
        poster.name
          .split(".")
          .pop()
          ?.toLowerCase() || "jpg";

      uploadedPosterPath =
        `${showDate}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } =
        await supabase.storage
          .from("live-music-posters")
          .upload(uploadedPosterPath, poster, {
            cacheControl: "3600",
            upsert: false,
            contentType: poster.type,
          });

      if (uploadError) {
        throw new Error(
          `Poster upload failed: ${uploadError.message}`
        );
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("live-music-posters")
        .getPublicUrl(uploadedPosterPath);

      const { error: insertError } = await supabase
        .from("live_music_shows")
        .insert({
          title,
          show_date: showDate,
          show_time: showTime,
          description,
          tags,
          accent_color: accentColor,
          poster_url: publicUrl,
          is_published: isPublished,
        });

      if (insertError) {
        throw new Error(
          `Show could not be saved: ${insertError.message}`
        );
      }

      router.push("/admin/live-music");
      router.refresh();
    } catch (submitError) {
      if (uploadedPosterPath) {
        await supabase.storage
          .from("live-music-posters")
          .remove([uploadedPosterPath]);
      }

      setError(
        submitError instanceof Error
          ? submitError.message
          : "The live show could not be saved."
      );

      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href="/admin/live-music"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-[#29C3FF]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Live Music
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#29C3FF]">
          Website Content
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Add Live Show
        </h1>

        <p className="mt-2 text-gray-400">
          Add the performer, schedule, details, and poster.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <div className="mb-6 flex items-center gap-2">
              <Music2 className="h-5 w-5 text-[#29C3FF]" />
              <h2 className="text-lg font-bold">
                Show Information
              </h2>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-gray-300"
                >
                  Band or performer
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Example: Velvet Crush"
                  className="admin-input"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="show_date"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-300"
                  >
                    <CalendarDays className="h-4 w-4 text-[#29C3FF]" />
                    Show date
                  </label>

                  <input
                    id="show_date"
                    name="show_date"
                    type="date"
                    required
                    className="admin-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="show_time"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-300"
                  >
                    <Clock className="h-4 w-4 text-[#29C3FF]" />
                    Show time
                  </label>

                  <input
                    id="show_time"
                    name="show_time"
                    type="time"
                    required
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-gray-300"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Tell guests what to expect."
                  className="admin-input resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="tags"
                  className="mb-2 block text-sm font-semibold text-gray-300"
                >
                  Tags
                </label>

                <input
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="No Cover, Live Band, Saturday Night"
                  className="admin-input"
                />

                <p className="mt-2 text-xs text-gray-600">
                  Separate each tag with a comma.
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-gray-300">
                  Accent color
                </p>

                <div className="flex flex-wrap gap-3">
                  {accentColors.map((color) => (
                    <label
                      key={color.value}
                      className="cursor-pointer"
                      title={color.name}
                    >
                      <input
                        type="radio"
                        name="accent_color"
                        value={color.value}
                        defaultChecked={
                          color.value === "#29C3FF"
                        }
                        className="peer sr-only"
                      />

                      <span
                        className="block h-10 w-10 rounded-full border-2 border-transparent transition peer-checked:scale-110 peer-checked:border-white"
                        style={{
                          backgroundColor: color.value,
                          boxShadow:
                            `0 0 18px ${color.value}70`,
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4">
                <div>
                  <p className="font-semibold text-gray-200">
                    Publish immediately
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Published shows appear publicly.
                  </p>
                </div>

                <input
                  name="is_published"
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-[#29C3FF]"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <ImagePlus className="h-5 w-5 text-[#29C3FF]" />

              <h2 className="text-lg font-bold">
                Show Poster
              </h2>
            </div>

            <label className="group flex min-h-[500px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/20 bg-black/20 transition hover:border-[#29C3FF]/60">
              {preview ? (
                <img
                  src={preview}
                  alt="Poster preview"
                  className="max-h-[700px] w-full object-contain"
                />
              ) : (
                <div className="p-8 text-center">
                  <ImagePlus className="mx-auto h-10 w-10 text-gray-600 transition group-hover:text-[#29C3FF]" />

                  <p className="mt-4 font-semibold text-gray-300">
                    Choose a poster
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    JPG, PNG, or WebP up to 10 MB
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                required
                className="sr-only"
                onChange={(event) =>
                  handlePosterChange(
                    event.target.files?.[0] ?? null
                  )
                }
              />
            </label>
          </section>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Link
            href="/admin/live-music"
            className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-gray-300 transition hover:bg-white/[0.05]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-[#29C3FF] px-6 py-3 font-bold text-[#071016] transition hover:bg-[#62d3ff] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {submitting
              ? "Saving..."
              : "Save Live Show"}
          </button>
        </div>
      </form>
    </div>
  );
}