"use client";

import { Eye, EyeOff, Trash2 } from "lucide-react";
import {
  deleteLiveShow,
  toggleLiveShowPublished,
} from "./actions";

type ShowActionsProps = {
  id: string;
  title: string;
  isPublished: boolean;
};

export default function ShowActions({
  id,
  title,
  isPublished,
}: ShowActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <form action={toggleLiveShowPublished}>
        <input type="hidden" name="id" value={id} />

        <input
          type="hidden"
          name="is_published"
          value={String(isPublished)}
        />

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-[#29C3FF]/40 hover:text-[#29C3FF]"
        >
          {isPublished ? (
            <>
              <EyeOff className="h-4 w-4" />
              Unpublish
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Publish
            </>
          )}
        </button>
      </form>

      <form
        action={deleteLiveShow}
        onSubmit={(event) => {
          const confirmed = window.confirm(
            `Delete "${title}"? This will permanently remove the show and its poster.`
          );

          if (!confirmed) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={id} />

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </form>
    </div>
  );
}