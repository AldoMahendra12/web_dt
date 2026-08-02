import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NavBar from "@/components/sections/nav-bar";
import FooterSection from "@/components/sections/footer-section";
import ProgramDetailClient from "@/components/sections/program/ProgramDetailClient";
import { programItems, programCategories } from "@/data/program";

/* =========================================
   Dynamic Metadata
   ========================================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = programItems.find((p) => p.id === id);
  if (!item) return { title: "Program Tidak Ditemukan" };

  return {
    title: `${item.title} - Program Dakwah Tulungagung`,
    description: item.description,
  };
}

/* =========================================
   Static Params (optional, for SSG)
   ========================================= */
export function generateStaticParams() {
  return programItems
    .filter((p) => ["sosial", "pendidikan", "mitra"].includes(p.categoryId))
    .map((p) => ({ id: p.id }));
}

/* =========================================
   Page Component
   ========================================= */
export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = programItems.find((p) => p.id === id);
  const category = item
    ? programCategories.find((c) => c.id === item.categoryId)
    : null;

  if (!item || !["sosial", "pendidikan", "mitra"].includes(item.categoryId)) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <ProgramDetailClient item={item} category={category ?? null} />
      <FooterSection />
    </>
  );
}
