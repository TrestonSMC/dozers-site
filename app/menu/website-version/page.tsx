// app/menu/page.tsx
import { getMenuFromSheet } from "@/lib/menu";
import MenuClient from "./MenuClient";

export default async function Page() {
  const categories = await getMenuFromSheet();
  return <MenuClient categories={categories} />;
}






