import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — STYLEOS",
  description:
    "STYLEOS is a curated Indian streetwear marketplace — minimal, fast, partner-powered.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
          About
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold uppercase tracking-[0.04em] sm:text-5xl">
          We connect you to the drop.
        </h1>
        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-neutral-400">
          <p>
            STYLEOS is a curated storefront for sneakers and streetwear in
            India. We surface products in a clean, editorial layout and link you
            straight to trusted retailers — including Nike India, Crepdog Crew,
            VegNonVeg, and Superkicks.
          </p>
          <p>
            We are not a reseller: checkout happens on our partners’ sites. Our
            job is discovery — fewer tabs, less noise, and a premium reading
            experience on every visit.
          </p>
          <p>
            Built for collectors, commuters, and anyone who cares how their
            grid looks on the way to the next release.
          </p>
        </div>
        <Link
          href="/#shop"
          className="mt-12 inline-flex rounded-full border border-white/20 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white/35 hover:bg-white/[0.08]"
        >
          Browse shop
        </Link>
      </main>
    </div>
  );
}
