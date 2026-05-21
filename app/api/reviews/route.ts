import { NextResponse } from "next/server";

// 🔹 Google Place ID for Dozers Grill
const PLACE_ID = "ChIJKafbhzmvK4cRlN9PfXk0fV8";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  // ⭐ Backup reviews so homepage never looks broken
  const fallbackReviews = [
    {
      author: "Jessica M.",
      text: "Great food, awesome drinks, and one of the best local spots in Mesa.",
      rating: 5,
      time: "Local Guide",
      profile: "",
    },
    {
      author: "Ryan T.",
      text: "The atmosphere is always solid and the live music nights are a blast.",
      rating: 5,
      time: "2 weeks ago",
      profile: "",
    },
    {
      author: "Amanda R.",
      text: "Perfect weekend spot. Friendly staff and really good food.",
      rating: 4,
      time: "1 month ago",
      profile: "",
    },
  ];

  if (!apiKey) {
    console.error("❌ Missing GOOGLE_MAPS_API_KEY");

    return NextResponse.json({
      reviews: fallbackReviews,
      source: "fallback",
      error: "Missing API key",
    });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,reviews,rating,user_ratings_total&key=${apiKey}`;

    console.log("⭐ Fetching Google Reviews");

    const res = await fetch(url, {
      cache: "no-store",
    });

    const data = await res.json();

    console.log("⭐ GOOGLE RESPONSE:", JSON.stringify(data, null, 2));

    // ⭐ Handle Google API failure
    if (data.status !== "OK") {
      console.error("❌ Google API Error:", data.status);

      return NextResponse.json({
        reviews: fallbackReviews,
        source: "fallback",
        googleStatus: data.status,
        googleError: data.error_message || null,
      });
    }

    // ⭐ Handle no reviews
    if (!data?.result?.reviews?.length) {
      console.warn("⚠️ No Google reviews returned");

      return NextResponse.json({
        reviews: fallbackReviews,
        source: "fallback",
        message: "No reviews returned from Google",
      });
    }

    // ⭐ Map reviews
    const reviews = data.result.reviews.slice(0, 6).map((r: any) => ({
      author: r.author_name || "Guest",
      text: r.text || "",
      rating: Number(r.rating) || 0,
      time:
        r.relative_time_description ||
        new Date(r.time * 1000).toLocaleDateString(),
      profile: r.profile_photo_url || "",
    }));

    return NextResponse.json({
      reviews,
      source: "google",
      placeName: data.result.name,
      overallRating: data.result.rating,
      totalRatings: data.result.user_ratings_total,
    });
  } catch (error: any) {
    console.error("❌ Error fetching reviews:", error);

    return NextResponse.json({
      reviews: fallbackReviews,
      source: "fallback",
      error: error?.message || "Unknown error",
    });
  }
}

