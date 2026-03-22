import { Suspense } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeContent } from "@/components/HomeContent";
import { HomeSkeleton } from "@/components/HomeSkeleton";
import { products } from "@/lib/products";

type CategoryFilter = "all" | "sneakers" | "apparel";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const initialCategory: CategoryFilter =
    params.category === "sneakers" || params.category === "apparel"
      ? params.category
      : "all";

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <SiteHeader />

      <main>
        <Suspense fallback={<HomeSkeleton />}>
          <HomeContent
            products={products}
            initialCategory={initialCategory}
          />
        </Suspense>
      </main>

      <footer className="border-t border-white/[0.06] py-14">
        <div className="mx-auto max-w-[1400px] px-5 text-center text-xs leading-relaxed text-neutral-600 sm:px-8 lg:px-12">
          <p className="text-neutral-500">
            Free shipping on all orders · Pan-India
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} STYLEOS ·{" "}
            <Link
              href="/about"
              className="text-neutral-500 underline-offset-4 transition hover:text-white hover:underline"
            >
              About
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
