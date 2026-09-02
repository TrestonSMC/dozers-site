import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  MousePointerClick,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getAnalyticsDashboard,
  type AnalyticsDashboardData,
} from "@/lib/google-analytics";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function percentChange(
  current: number,
  previous: number
) {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return ((current - previous) / previous) * 100;
}

function formatAnalyticsDate(value: string) {
  if (value.length !== 8) {
    return value;
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6)) - 1;
  const day = Number(value.slice(6, 8));

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(year, month, day));
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: authData } =
    await supabase.auth.getClaims();

  if (!authData?.claims) {
    redirect("/admin/login");
  }

  let analytics: AnalyticsDashboardData | null = null;
  let analyticsError = false;

  try {
    analytics = await getAnalyticsDashboard();
  } catch (error) {
    analyticsError = true;

    console.error(
      "GOOGLE ANALYTICS ERROR:",
      error
    );
  }

  const visitorChange = analytics
    ? percentChange(
        analytics.visitors,
        analytics.previousVisitors
      )
    : 0;

  const pageViewChange = analytics
    ? percentChange(
        analytics.pageViews,
        analytics.previousPageViews
      )
    : 0;

  const stats = [
    {
      name: "Visitors",
      value: analytics
        ? formatNumber(analytics.visitors)
        : "—",
      change: analytics
        ? `${Math.abs(visitorChange).toFixed(1)}%`
        : "Unavailable",
      positive: visitorChange >= 0,
      icon: Users,
    },
    {
      name: "Page Views",
      value: analytics
        ? formatNumber(analytics.pageViews)
        : "—",
      change: analytics
        ? `${Math.abs(pageViewChange).toFixed(1)}%`
        : "Unavailable",
      positive: pageViewChange >= 0,
      icon: Eye,
    },
    {
      name: "Active Now",
      value: analytics
        ? formatNumber(analytics.realtimeUsers)
        : "—",
      change: "Real-time",
      positive: true,
      icon: Activity,
    },
    {
      name: "Engagement Rate",
      value: analytics
        ? `${analytics.engagementRate.toFixed(1)}%`
        : "—",
      change: analytics
        ? `${formatNumber(
            analytics.sessions
          )} sessions`
        : "Unavailable",
      positive: true,
      icon: MousePointerClick,
    },
  ];

  const maxDailyVisitors = Math.max(
    ...(analytics?.dailyTraffic.map(
      (day) => day.visitors
    ) ?? [1]),
    1
  );

  const maxSourceSessions = Math.max(
    ...(analytics?.trafficSources.map(
      (source) => source.sessions
    ) ?? [1]),
    1
  );

  const totalDeviceUsers =
    analytics?.devices.reduce(
      (total, device) => total + device.users,
      0
    ) ?? 0;

  return (
    <div className="mx-auto min-w-0 max-w-7xl overflow-x-hidden">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#29C3FF] sm:text-sm sm:tracking-[0.25em]">
            Google Analytics
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Website Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
            See how people are finding and using the
            Dozers website.
          </p>
        </div>

        <div className="w-fit shrink-0 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-gray-300">
          Last 30 days
        </div>
      </div>

      {analyticsError && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
          <p className="font-semibold text-red-200">
            Google Analytics could not be loaded
          </p>

          <p className="mt-1 text-sm text-red-200/70">
            Check the server logs for the exact Google
            API error.
          </p>
        </div>
      )}

      <section className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          const ChangeIcon = stat.positive
            ? ArrowUpRight
            : ArrowDownRight;

          return (
            <article
              key={stat.name}
              className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#29C3FF]/10 text-[#29C3FF]">
                  <Icon className="h-5 w-5" />
                </div>

                <span
                  className={`flex min-w-0 items-center truncate text-xs ${
                    stat.positive
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  <ChangeIcon className="mr-1 h-3.5 w-3.5 shrink-0" />
                  {stat.change}
                </span>
              </div>

              <p className="mt-5 text-sm text-gray-400">
                {stat.name}
              </p>

              <p className="mt-1 truncate text-3xl font-bold">
                {stat.value}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <article className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6">
          <div>
            <h2 className="text-lg font-bold">
              Daily Visitors
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Active website users during the last 30
              days.
            </p>
          </div>

          {analytics &&
          analytics.dailyTraffic.length > 0 ? (
            <div className="mt-8 w-full max-w-full overflow-x-auto overscroll-x-contain rounded-xl">
              <div className="flex h-72 w-max min-w-[760px] items-end gap-2 rounded-xl border border-white/5 bg-black/20 px-4 pb-12 pt-8">
                {analytics.dailyTraffic.map((day) => {
                  const height = Math.max(
                    (day.visitors /
                      maxDailyVisitors) *
                      100,
                    day.visitors > 0 ? 4 : 1
                  );

                  return (
                    <div
                      key={day.date}
                      className="group relative flex h-full min-w-[18px] flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-[#147aa2] to-[#29C3FF] transition group-hover:brightness-125"
                        style={{
                          height: `${height}%`,
                        }}
                      />

                      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-2 py-1 text-xs text-white shadow-xl group-hover:block">
                        {day.visitors} visitors
                      </div>

                      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-gray-600">
                        {formatAnalyticsDate(day.date)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mt-8 flex h-72 w-full items-center justify-center rounded-xl border border-white/5 bg-black/20 px-5 text-center text-sm text-gray-500">
              No daily traffic has been recorded yet.
            </div>
          )}

          {analytics &&
            analytics.dailyTraffic.length > 0 && (
              <p className="mt-3 text-center text-xs text-gray-600 sm:hidden">
                Swipe the graph to see more days
              </p>
            )}
        </article>

        <article className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            Traffic Sources
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            How visitors found the website.
          </p>

          <div className="mt-6 space-y-5">
            {analytics?.trafficSources.length ? (
              analytics.trafficSources.map(
                (source) => {
                  const width =
                    (source.sessions /
                      maxSourceSessions) *
                    100;

                  return (
                    <div
                      key={source.source}
                      className="min-w-0"
                    >
                      <div className="mb-2 flex min-w-0 items-center justify-between gap-4 text-sm">
                        <span className="min-w-0 truncate text-gray-300">
                          {source.source}
                        </span>

                        <span className="shrink-0 font-semibold text-white">
                          {formatNumber(
                            source.sessions
                          )}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-[#29C3FF]"
                          style={{
                            width: `${width}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <p className="text-sm text-gray-500">
                No traffic-source data available.
              </p>
            )}
          </div>
        </article>
      </section>

      <section className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
        <article className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            Most Viewed Pages
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            The pages receiving the most website
            traffic.
          </p>

          <div className="mt-6 divide-y divide-white/10">
            {analytics?.topPages.length ? (
              analytics.topPages.map(
                (page, index) => (
                  <div
                    key={`${page.path}-${index}`}
                    className="flex min-w-0 items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-gray-200">
                        {page.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-600">
                        {page.path}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-bold">
                        {formatNumber(page.views)}
                      </p>

                      <p className="text-xs text-gray-600">
                        views
                      </p>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-sm text-gray-500">
                No page-view data available.
              </p>
            )}
          </div>
        </article>

        <article className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            Devices
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            Devices visitors use to view the website.
          </p>

          <div className="mt-6 space-y-4">
            {analytics?.devices.length ? (
              analytics.devices.map((device) => {
                const percentage =
                  totalDeviceUsers > 0
                    ? (device.users /
                        totalDeviceUsers) *
                      100
                    : 0;

                return (
                  <div
                    key={device.device}
                    className="min-w-0 rounded-xl border border-white/[0.07] bg-black/20 p-4"
                  >
                    <div className="flex min-w-0 items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate font-semibold capitalize text-gray-200">
                          {device.device}
                        </p>

                        <p className="mt-1 text-xs text-gray-600">
                          {formatNumber(device.users)}{" "}
                          users
                        </p>
                      </div>

                      <p className="shrink-0 text-xl font-bold text-[#29C3FF]">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">
                No device data available.
              </p>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}