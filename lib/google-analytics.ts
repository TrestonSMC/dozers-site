import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA_PROPERTY_ID;

function getAnalyticsClient() {
  const clientEmail = process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  if (!propertyId || !clientEmail || !privateKey) {
    throw new Error("Google Analytics environment variables are missing.");
  }

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  });
}

function numberValue(value?: string | null) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export type AnalyticsDashboardData = {
  visitors: number;
  pageViews: number;
  sessions: number;
  engagementRate: number;
  realtimeUsers: number;
  previousVisitors: number;
  previousPageViews: number;

  dailyTraffic: {
    date: string;
    visitors: number;
  }[];

  topPages: {
    title: string;
    path: string;
    views: number;
  }[];

  trafficSources: {
    source: string;
    sessions: number;
  }[];

  devices: {
    device: string;
    users: number;
  }[];
};

export async function getAnalyticsDashboard(): Promise<AnalyticsDashboardData> {
  const analytics = getAnalyticsClient();

  const [
    currentResponse,
    previousResponse,
    dailyResponse,
    pagesResponse,
    sourcesResponse,
    devicesResponse,
    realtimeResponse,
  ] = await Promise.all([
    analytics.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "29daysAgo",
          endDate: "today",
        },
      ],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
        { name: "engagementRate" },
      ],
    }),

    analytics.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "59daysAgo",
          endDate: "30daysAgo",
        },
      ],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
      ],
    }),

    analytics.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "29daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [
        {
          dimension: {
            dimensionName: "date",
          },
          desc: false,
        },
      ],
    }),

    analytics.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "29daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [
        { name: "pageTitle" },
        { name: "pagePath" },
      ],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [
        {
          metric: {
            metricName: "screenPageViews",
          },
          desc: true,
        },
      ],
      limit: 5,
    }),

    analytics.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "29daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [
        {
          metric: {
            metricName: "sessions",
          },
          desc: true,
        },
      ],
      limit: 6,
    }),

    analytics.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "29daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [
        {
          metric: {
            metricName: "activeUsers",
          },
          desc: true,
        },
      ],
    }),

    analytics.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: "activeUsers" }],
    }),
  ]);

  const current = currentResponse[0].rows?.[0];
  const previous = previousResponse[0].rows?.[0];

  return {
    visitors: numberValue(current?.metricValues?.[0]?.value),
    pageViews: numberValue(current?.metricValues?.[1]?.value),
    sessions: numberValue(current?.metricValues?.[2]?.value),
    engagementRate:
      numberValue(current?.metricValues?.[3]?.value) * 100,

    realtimeUsers: numberValue(
      realtimeResponse[0].rows?.[0]?.metricValues?.[0]?.value
    ),

    previousVisitors: numberValue(
      previous?.metricValues?.[0]?.value
    ),

    previousPageViews: numberValue(
      previous?.metricValues?.[1]?.value
    ),

    dailyTraffic:
      dailyResponse[0].rows?.map((row) => ({
        date: row.dimensionValues?.[0]?.value ?? "",
        visitors: numberValue(row.metricValues?.[0]?.value),
      })) ?? [],

    topPages:
      pagesResponse[0].rows?.map((row) => ({
        title:
          row.dimensionValues?.[0]?.value ||
          "Untitled page",
        path:
          row.dimensionValues?.[1]?.value ||
          "/",
        views: numberValue(row.metricValues?.[0]?.value),
      })) ?? [],

    trafficSources:
      sourcesResponse[0].rows?.map((row) => ({
        source:
          row.dimensionValues?.[0]?.value ||
          "Unassigned",
        sessions: numberValue(row.metricValues?.[0]?.value),
      })) ?? [],

    devices:
      devicesResponse[0].rows?.map((row) => ({
        device:
          row.dimensionValues?.[0]?.value ||
          "Unknown",
        users: numberValue(row.metricValues?.[0]?.value),
      })) ?? [],
  };
}