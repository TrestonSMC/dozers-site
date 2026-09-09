"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Save,
  Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type GalleryImage = {
  id: string;
  image_url: string;
  caption: string | null;
  alt_text: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
};

const supabase = createClient();

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [altText, setAltText] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadImages = async () => {
    setLoading(true);
    setError("");

    const { data, error: loadError } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (loadError) {
      setError(loadError.message);
      setImages([]);
    } else {
      setImages((data as GalleryImage[]) ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    setMessage("");

    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("The image must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const uploadImage = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Choose an image before uploading.");
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    const extension =
      selectedFile.name.split(".").pop()?.toLowerCase() ||
      "jpg";

    const storagePath = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery-images")
      .upload(storagePath, selectedFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: selectedFile.type,
      });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("gallery-images")
      .getPublicUrl(storagePath);

    const nextSortOrder =
      images.length > 0
        ? Math.max(...images.map((image) => image.sort_order)) + 1
        : 0;

    const { error: insertError } = await supabase
      .from("gallery_images")
      .insert({
        image_url: publicUrlData.publicUrl,
        caption: caption.trim() || null,
        alt_text:
          altText.trim() ||
          caption.trim() ||
          "Dozers Grill gallery image",
        is_published: isPublished,
        sort_order: nextSortOrder,
      });

    if (insertError) {
      await supabase.storage
        .from("gallery-images")
        .remove([storagePath]);

      setError(insertError.message);
      setUploading(false);
      return;
    }

    setSelectedFile(null);
    setCaption("");
    setAltText("");
    setIsPublished(true);
    setMessage("Gallery image uploaded successfully.");

    const fileInput = document.getElementById(
      "gallery-file"
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }

    await loadImages();
    setUploading(false);
  };

  const updateLocalImage = (
    id: string,
    changes: Partial<GalleryImage>
  ) => {
    setImages((current) =>
      current.map((image) =>
        image.id === id
          ? {
              ...image,
              ...changes,
            }
          : image
      )
    );
  };

  const saveImage = async (image: GalleryImage) => {
    setWorkingId(image.id);
    setError("");
    setMessage("");

    const { error: updateError } = await supabase
      .from("gallery_images")
      .update({
        caption: image.caption?.trim() || null,
        alt_text:
          image.alt_text?.trim() ||
          image.caption?.trim() ||
          "Dozers Grill gallery image",
        sort_order: Number(image.sort_order) || 0,
      })
      .eq("id", image.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage("Gallery image updated.");
      await loadImages();
    }

    setWorkingId(null);
  };

  const togglePublished = async (
    image: GalleryImage
  ) => {
    setWorkingId(image.id);
    setError("");
    setMessage("");

    const nextPublishedValue = !image.is_published;

    const { error: updateError } = await supabase
      .from("gallery_images")
      .update({
        is_published: nextPublishedValue,
      })
      .eq("id", image.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      updateLocalImage(image.id, {
        is_published: nextPublishedValue,
      });

      setMessage(
        nextPublishedValue
          ? "Image published."
          : "Image hidden from the website."
      );
    }

    setWorkingId(null);
  };

  const getStoragePath = (imageUrl: string) => {
    const marker = "/gallery-images/";
    const markerIndex = imageUrl.indexOf(marker);

    if (markerIndex === -1) {
      return null;
    }

    return decodeURIComponent(
      imageUrl.slice(markerIndex + marker.length)
    );
  };

  const deleteImage = async (
    image: GalleryImage
  ) => {
    const confirmed = window.confirm(
      "Delete this image permanently? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setWorkingId(image.id);
    setError("");
    setMessage("");

    const storagePath = getStoragePath(image.image_url);

    const { error: deleteRowError } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", image.id);

    if (deleteRowError) {
      setError(deleteRowError.message);
      setWorkingId(null);
      return;
    }

    if (storagePath) {
      const { error: storageError } =
        await supabase.storage
          .from("gallery-images")
          .remove([storagePath]);

      if (storageError) {
        console.error(
          "GALLERY STORAGE DELETE ERROR:",
          storageError
        );
      }
    }

    setImages((current) =>
      current.filter((item) => item.id !== image.id)
    );

    setMessage("Gallery image deleted.");
    setWorkingId(null);
  };

  return (
    <div className="mx-auto min-w-0 max-w-7xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#29C3FF] sm:text-sm">
          Website Content
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Gallery Manager
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
          Upload, edit, publish, reorder, and remove photos
          from the Dozers website gallery.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          {message}
        </div>
      )}

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#29C3FF]/10 text-[#29C3FF]">
            <ImagePlus className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Upload New Photo
            </h2>

            <p className="text-sm text-gray-500">
              JPG, PNG, or WebP up to 10 MB
            </p>
          </div>
        </div>

        <form
          onSubmit={uploadImage}
          className="mt-6 grid gap-5"
        >
          <div>
            <label
              htmlFor="gallery-file"
              className="mb-2 block text-sm font-semibold text-gray-300"
            >
              Image
            </label>

            <input
              id="gallery-file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="block w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-[#29C3FF] file:px-4 file:py-2 file:font-semibold file:text-[#071018]"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="gallery-caption"
                className="mb-2 block text-sm font-semibold text-gray-300"
              >
                Caption
              </label>

              <input
                id="gallery-caption"
                value={caption}
                onChange={(event) =>
                  setCaption(event.target.value)
                }
                placeholder="Optional photo caption"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#29C3FF]/60"
              />
            </div>

            <div>
              <label
                htmlFor="gallery-alt"
                className="mb-2 block text-sm font-semibold text-gray-300"
              >
                Image description
              </label>

              <input
                id="gallery-alt"
                value={altText}
                onChange={(event) =>
                  setAltText(event.target.value)
                }
                placeholder="Describe the photo for accessibility"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#29C3FF]/60"
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(event) =>
                setIsPublished(event.target.checked)
              }
              className="h-4 w-4 accent-[#29C3FF]"
            />

            Publish on the website immediately
          </label>

          <button
            type="submit"
            disabled={uploading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#29C3FF] px-5 py-3 font-bold text-[#071018] transition hover:bg-[#77d9ff] disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
          >
            {uploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <ImagePlus className="h-5 w-5" />
                Upload Photo
              </>
            )}
          </button>
        </form>
      </section>

      <section className="mt-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">
              Gallery Photos
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {images.length}{" "}
              {images.length === 1 ? "image" : "images"}
            </p>
          </div>

          <button
            type="button"
            onClick={loadImages}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-[#29C3FF]/40 hover:text-[#29C3FF]"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
            <Loader2 className="h-7 w-7 animate-spin text-[#29C3FF]" />
          </div>
        ) : images.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-5 text-center">
            <ImagePlus className="h-10 w-10 text-gray-600" />

            <p className="mt-4 font-semibold text-gray-300">
              No gallery images yet
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Upload the first photo using the form above.
            </p>
          </div>
        ) : (
          <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {images.map((image) => {
              const isWorking = workingId === image.id;

              return (
                <article
                  key={image.id}
                  className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
                    <img
                      src={image.image_url}
                      alt={
                        image.alt_text ||
                        image.caption ||
                        "Dozers Grill gallery image"
                      }
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute left-3 top-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          image.is_published
                            ? "bg-emerald-500/90 text-white"
                            : "bg-black/80 text-gray-300"
                        }`}
                      >
                        {image.is_published
                          ? "Published"
                          : "Hidden"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 p-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Caption
                      </label>

                      <input
                        value={image.caption ?? ""}
                        onChange={(event) =>
                          updateLocalImage(image.id, {
                            caption: event.target.value,
                          })
                        }
                        placeholder="Optional caption"
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-[#29C3FF]/60"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Image description
                      </label>

                      <input
                        value={image.alt_text ?? ""}
                        onChange={(event) =>
                          updateLocalImage(image.id, {
                            alt_text: event.target.value,
                          })
                        }
                        placeholder="Describe this image"
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-[#29C3FF]/60"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Display order
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={image.sort_order}
                        onChange={(event) =>
                          updateLocalImage(image.id, {
                            sort_order:
                              Number(event.target.value) ||
                              0,
                          })
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-[#29C3FF]/60"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={isWorking}
                      onClick={() => saveImage(image)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#29C3FF] px-4 py-2.5 text-sm font-bold text-[#071018] transition hover:bg-[#77d9ff] disabled:opacity-50"
                    >
                      {isWorking ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}

                      Save Changes
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        disabled={isWorking}
                        onClick={() =>
                          togglePublished(image)
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-[#29C3FF]/40 hover:text-[#29C3FF] disabled:opacity-50"
                      >
                        {image.is_published ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}

                        {image.is_published
                          ? "Hide"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        disabled={isWorking}
                        onClick={() => deleteImage(image)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 px-3 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}