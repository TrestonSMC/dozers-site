"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function getAuthenticatedClient() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/admin/login");
  }

  return supabase;
}

export async function toggleLiveShowPublished(
  formData: FormData
) {
  const supabase = await getAuthenticatedClient();

  const id = String(formData.get("id") || "");
  const currentlyPublished =
    String(formData.get("is_published")) === "true";

  if (!id) {
    return;
  }

  const { error } = await supabase
    .from("live_music_shows")
    .update({
      is_published: !currentlyPublished,
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Could not update the show: ${error.message}`
    );
  }

  revalidatePath("/admin/live-music");
  revalidatePath("/live-music");
}

export async function deleteLiveShow(formData: FormData) {
  const supabase = await getAuthenticatedClient();

  const id = String(formData.get("id") || "");

  if (!id) {
    return;
  }

  const { data: show, error: showError } = await supabase
    .from("live_music_shows")
    .select("poster_url")
    .eq("id", id)
    .single();

  if (showError) {
    throw new Error(
      `Could not find the show: ${showError.message}`
    );
  }

  const { error: deleteError } = await supabase
    .from("live_music_shows")
    .delete()
    .eq("id", id);

  if (deleteError) {
    throw new Error(
      `Could not delete the show: ${deleteError.message}`
    );
  }

  const marker = "/live-music-posters/";
  const posterUrl = show?.poster_url || "";

  if (posterUrl.includes(marker)) {
    const posterPath = decodeURIComponent(
      posterUrl.split(marker)[1]
    );

    await supabase.storage
      .from("live-music-posters")
      .remove([posterPath]);
  }

  revalidatePath("/admin/live-music");
  revalidatePath("/live-music");
}