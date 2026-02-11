import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const bucket = "dozers-gallery";
  const folder = "gallery";

  const { data, error } = await supabase.storage.from(bucket).list(folder, {
    limit: 200,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    return NextResponse.json({ images: [], error: error.message }, { status: 200 });
  }

  const images =
    (data || [])
      .filter((f) => f.name)
      .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f.name))
      .map((f) => f.name);

  return NextResponse.json({ images });
}
