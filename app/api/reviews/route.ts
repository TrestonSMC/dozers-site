import { NextResponse } from "next/server";

// 🔹 Google Place ID for Dozers Grill
const PLACE_ID = "ChIJKafbhzmvK4cRlN9PfXk0fV8";

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("❌ Missing GOOGLE_MAPS_API_KEY in environment variables.");
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    // ✅ Request review data from Google Places API
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,reviews,rating,user_ratings_total&key=${apiKey}`
    );

    const data = await res.json();

    if (!data?.result?.reviews) {
      return NextResponse.json({ reviews: [] });
    }

    // ✅ Map to simplified structure
    const reviews = data.result.reviews.slice(0, 5).map((r: any) => ({
      author: r.author_name,
      text: r.text,
      rating: r.rating,
      time: new Date(r.time * 1000).toLocaleDateString(),
      profile: r.profile_photo_url,
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

