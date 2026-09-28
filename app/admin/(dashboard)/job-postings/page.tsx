"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type JobPosting = {
  id: string;
  title: string;
  description: string;
  application_url: string;
  color: string;
  is_visible: boolean;
  sort_order: number;
};

export default function JobPostingsPage() {
  const supabase = useMemo(() => createClient(), []);

  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError("");

    const { data, error: loadError } = await supabase
      .from("job_postings")
      .select(
        "id, title, description, application_url, color, is_visible, sort_order"
      )
      .order("sort_order", { ascending: true });

    if (loadError) {
      setError(`Could not load job postings: ${loadError.message}`);
      setLoading(false);
      return;
    }

    setJobs((data ?? []) as JobPosting[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void loadJobs();
  }, [loadJobs]);

  async function toggleVisibility(job: JobPosting) {
    const nextVisible = !job.is_visible;

    setUpdatingId(job.id);
    setError("");

    const { error: updateError } = await supabase
      .from("job_postings")
      .update({
        is_visible: nextVisible,
        updated_at: new Date().toISOString(),
      })
      .eq("id", job.id);

    if (updateError) {
      setError(
        `Could not update ${job.title}: ${updateError.message}`
      );
      setUpdatingId(null);
      return;
    }

    setJobs((currentJobs) =>
      currentJobs.map((currentJob) =>
        currentJob.id === job.id
          ? {
              ...currentJob,
              is_visible: nextVisible,
            }
          : currentJob
      )
    );

    setUpdatingId(null);
  }

  const visibleCount = jobs.filter(
    (job) => job.is_visible
  ).length;

  const hiddenCount = jobs.length - visibleCount;

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#29C3FF]">
          Website Content
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Job Postings
        </h1>

        <p className="mt-2 max-w-2xl text-gray-400">
          Control which open positions appear on the Dozers
          Careers page. Applications are still handled through
          7shifts.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-medium text-gray-500">
            Total Positions
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {jobs.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#10B981]/20 bg-[#10B981]/[0.05] p-5">
          <p className="text-sm font-medium text-[#10B981]">
            Visible
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {visibleCount}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <p className="text-sm font-medium text-gray-500">
            Hidden
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {hiddenCount}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="mt-8 flex min-h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-3 text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin text-[#29C3FF]" />
            Loading job postings...
          </div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
          <BriefcaseBusiness className="mx-auto h-10 w-10 text-gray-600" />

          <h2 className="mt-4 text-xl font-bold">
            No Job Postings
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            No positions were found in the job_postings table.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {jobs.map((job) => {
            const updating = updatingId === job.id;

            return (
              <article
                key={job.id}
                className={`overflow-hidden rounded-2xl border bg-white/[0.04] transition ${
                  job.is_visible
                    ? "border-white/10"
                    : "border-white/[0.06] opacity-70"
                }`}
              >
                <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* Job info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{
                          backgroundColor: job.color,
                          boxShadow: `0 0 12px ${job.color}`,
                        }}
                      />

                      <h2 className="text-xl font-bold text-white sm:text-2xl">
                        {job.title}
                      </h2>

                      {job.is_visible ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/25 bg-[#10B981]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#10B981]">
                          <Eye className="h-3.5 w-3.5" />
                          Visible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                          <EyeOff className="h-3.5 w-3.5" />
                          Hidden
                        </span>
                      )}
                    </div>

                    <p className="mt-3 max-w-3xl leading-relaxed text-gray-400">
                      {job.description}
                    </p>

                    <a
                      href={job.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#29C3FF] transition hover:text-[#62d3ff]"
                    >
                      View 7shifts Posting
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Visibility control */}
                  <div className="shrink-0">
                    <button
                      type="button"
                      disabled={updating}
                      onClick={() => toggleVisibility(job)}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${
                        job.is_visible
                          ? "border border-white/10 bg-white/[0.04] text-gray-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                          : "bg-[#29C3FF] text-[#071016] hover:bg-[#62d3ff]"
                      }`}
                    >
                      {updating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : job.is_visible ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Hide from Website
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Show on Website
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Status bar */}
                <div
                  className="h-1 w-full opacity-80"
                  style={{
                    backgroundColor: job.is_visible
                      ? job.color
                      : "#374151",
                  }}
                />
              </article>
            );
          })}
        </div>
      )}

      {/* Explanation */}
      <div className="mt-8 rounded-2xl border border-[#29C3FF]/15 bg-[#29C3FF]/[0.04] p-5 sm:p-6">
        <h3 className="font-bold text-white">
          How Job Visibility Works
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Hiding a position only removes it from the Dozers
          website. It does not delete or close the position in
          7shifts. You can make the position visible again at any
          time.
        </p>
      </div>
    </div>
  );
}