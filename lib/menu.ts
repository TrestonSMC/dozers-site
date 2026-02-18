// lib/menu.ts
import "server-only";

export type MenuRow = {
  category: string;
  type: "item" | "note";
  name?: string;
  description?: string;
  price?: string | null; // supports "18 / 26"
  badge?: string;
  sortCategory?: number | null;
  sortItem?: number | null;
  active: boolean;
};

export type MenuCategory = {
  name: string;
  sort: number;
  rows: MenuRow[];
};

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let cur = "";
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    const next = csv[i + 1];

    if (ch === '"' && next === '"') {
      cur += '"';
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      row.push(cur);
      cur = "";
      continue;
    }
    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && next === "\n") i++;
      row.push(cur);
      if (row.some((c) => c.trim().length)) rows.push(row);
      cur = "";
      row = [];
      continue;
    }
    cur += ch;
  }

  row.push(cur);
  if (row.some((c) => c.trim().length)) rows.push(row);

  return rows;
}

const norm = (s?: string) => (s ?? "").trim();
const upper = (s?: string) => norm(s).toUpperCase();

// Normalize headers to avoid breakage from extra spaces/underscores
const keyify = (s?: string) =>
  upper(s).replace(/\s+/g, " ").replace(/_/g, " ").trim();

const toBool = (s?: string, defaultVal = true) => {
  const v = norm(s).toLowerCase();
  if (!v) return defaultVal;
  return v === "true" || v === "yes" || v === "1";
};

const toNum = (s?: string) => {
  const v = norm(s);
  if (!v) return null;
  const n = Number(v.replace("$", ""));
  return Number.isFinite(n) ? n : null;
};

export async function getMenuFromSheet(): Promise<MenuCategory[]> {
  const url = process.env.MENU_SHEET_CSV_URL;
  if (!url) throw new Error("Missing MENU_SHEET_CSV_URL");

  // ✅ INSTANT UPDATES: disable caching
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Menu CSV fetch failed: ${res.status}`);

  const csv = await res.text();
  const rows = parseCsv(csv);
  if (!rows.length) return [];

  const [header, ...data] = rows;

  const idx = Object.fromEntries(header.map((h, i) => [keyify(h), i]));

  const pick = (aliases: string[]) => {
    for (const a of aliases) {
      const k = keyify(a);
      if (k in idx) return idx[k] as number;
    }
    return -1;
  };

  const col = {
    CATEGORY: pick(["CATEGORY"]),
    TYPE: pick(["TYPE"]),
    NAME: pick(["NAME"]),
    DESCRIPTION: pick(["DESCRIPTION"]),
    PRICE: pick(["PRICE"]),
    BADGE: pick(["BADGE"]),
    SORT_CATEGORY: pick(["SORT CATEGORY", "SORT_CATEGORY"]),
    SORT_ITEM: pick(["SORT ITEM", "SORT_ITEM"]),
    ACTIVE: pick(["ACTIVE (TRUE/FALSE)", "ACTIVE TRUE/FALSE", "ACTIVE"]),
  };

  const get = (r: string[], i: number) => (i >= 0 ? (r[i] ?? "") : "");

  const parsed: MenuRow[] = data
    .map((r) => {
      const category = norm(get(r, col.CATEGORY));
      const typeRaw = norm(get(r, col.TYPE)).toLowerCase();
      const type: "item" | "note" = typeRaw === "note" ? "note" : "item";

      const active = toBool(get(r, col.ACTIVE), true);

      const priceRaw = norm(get(r, col.PRICE));
      const price = priceRaw ? priceRaw.replace(/^\$/, "") : null;

      return {
        category: category || "Menu",
        type,
        name: norm(get(r, col.NAME)) || undefined,
        description: norm(get(r, col.DESCRIPTION)) || undefined,
        price,
        badge: norm(get(r, col.BADGE)) || undefined,
        sortCategory: toNum(get(r, col.SORT_CATEGORY)),
        sortItem: toNum(get(r, col.SORT_ITEM)),
        active,
      };
    })
    .filter((r) => r.active)
    .filter((r) => r.category)
    // if an item row has no name, drop it; notes can be just description
    .filter((r) => r.type === "note" || (r.name && r.name.length > 0));

  const map = new Map<string, MenuCategory>();

  for (const row of parsed) {
    if (!map.has(row.category)) {
      map.set(row.category, {
        name: row.category,
        sort: row.sortCategory ?? 9999,
        rows: [],
      });
    }

    const cat = map.get(row.category)!;

    if (row.sortCategory !== null && row.sortCategory !== undefined) {
      cat.sort = Math.min(cat.sort, row.sortCategory ?? 9999);
    }

    cat.rows.push(row);
  }

  const categories = Array.from(map.values());

  for (const c of categories) {
    c.rows.sort((a, b) => {
      const sa = a.sortItem ?? 9999;
      const sb = b.sortItem ?? 9999;
      if (sa !== sb) return sa - sb;

      // stable-ish fallback order
      const la = (a.name ?? a.description ?? "").toLowerCase();
      const lb = (b.name ?? b.description ?? "").toLowerCase();
      return la.localeCompare(lb);
    });
  }

  categories.sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));

  return categories;
}



