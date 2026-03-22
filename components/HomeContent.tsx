"use client";

import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";
import {
  FILTER_COLOR_OPTIONS,
  PRICE_BUCKETS,
  matchesPriceBucket,
  type PriceBucketId,
} from "@/lib/product-meta";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type CategoryFilter = "all" | "sneakers" | "apparel";

const filters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sneakers", label: "Sneakers" },
  { id: "apparel", label: "Apparel" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeContent({
  products,
  initialCategory = "all",
}: {
  products: Product[];
  initialCategory?: CategoryFilter;
}) {
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [priceBucket, setPriceBucket] = useState<PriceBucketId>("any");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const c = searchParams.get("category");
    if (c === "sneakers" || c === "apparel") setCategory(c);
    else setCategory("all");
  }, [searchParams]);

  function setFilter(id: CategoryFilter) {
    setCategory(id);
    if (id === "all") {
      router.replace(pathname, { scroll: false });
    } else {
      router.replace(`${pathname}?category=${id}`, { scroll: false });
    }
  }

  const toggleColor = useCallback((color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color],
    );
  }, []);

  const clearShopFilters = useCallback(() => {
    setPriceBucket("any");
    setSelectedColors([]);
  }, []);

  const featured = useMemo(
    () => products.filter((p) => p.featured),
    [products],
  );

  const filtered = useMemo(() => {
    let list =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);
    list = list.filter((p) => matchesPriceBucket(p.price, priceBucket));
    if (selectedColors.length > 0) {
      const set = new Set(selectedColors);
      list = list.filter((p) => p.colors.some((c) => set.has(c)));
    }
    return list;
  }, [products, category, priceBucket, selectedColors]);

  const filterAnimKey = `${category}-${priceBucket}-${[...selectedColors].sort().join(",")}`;

  const hasExtraFilters =
    priceBucket !== "any" || selectedColors.length > 0;

  const t = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease };

  const stagger = reduceMotion ? 0 : 0.06;

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[min(88vh,900px)] flex-col justify-end overflow-hidden border-b border-white/[0.06] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28"
        aria-label="Hero"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(255,255,255,0.09),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_80%_60%,rgba(120,120,120,0.06),transparent_50%)]"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: reduceMotion ? 0 : 0.05 }}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-neutral-500"
          >
            India · Premium marketplace
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: reduceMotion ? 0 : 0.12 }}
            className="font-display mt-6 max-w-4xl text-[clamp(2.75rem,8vw,5.5rem)] font-semibold uppercase leading-[0.92] tracking-[0.02em] text-white"
          >
            The edit.
            <span className="mt-2 block text-neutral-500">Wear the moment.</span>
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: reduceMotion ? 0 : 0.22 }}
            className="mt-8 max-w-md text-base leading-relaxed text-neutral-400 sm:text-lg"
          >
            Curated sneakers and streetwear with direct links to India’s
            leading retailers — minimal, fast, and built for the drop.
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: reduceMotion ? 0 : 0.3 }}
            className="mt-10"
          >
            <a
              href="#shop"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/[0.08]"
            >
              Shop collection
              <span aria-hidden className="text-xl leading-none">
                ↓
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section
        className="border-b border-white/[0.06] py-20 sm:py-24 lg:py-28"
        aria-labelledby="featured-heading"
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={t}
            className="mb-12 flex flex-col gap-2 sm:mb-14 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Featured
              </p>
              <h2
                id="featured-heading"
                className="font-display mt-2 text-3xl font-semibold uppercase tracking-[0.04em] text-white sm:text-4xl"
              >
                Selected drops
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-500 lg:text-right">
              Hand-picked pieces — limited noise, maximum impact.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: stagger, delayChildren: 0.05 },
              },
            }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-4 xl:gap-8"
          >
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
              >
                <ProductCard product={p} imagePriority={i < 2} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Shop + filters */}
      <section
        id="shop"
        className="scroll-mt-24 border-t border-white/[0.04] py-20 sm:py-24 lg:py-28"
        aria-labelledby="shop-heading"
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Catalogue
              </p>
              <h2
                id="shop-heading"
                className="font-display mt-2 text-3xl font-semibold uppercase tracking-[0.04em] text-white sm:text-4xl lg:text-5xl"
              >
                Shop all
              </h2>
              <p className="mt-3 text-sm text-neutral-500">
                {filtered.length} product{filtered.length === 1 ? "" : "s"}
              </p>
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter by category"
            >
              {filters.map(({ id, label }) => {
                const active = category === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(id)}
                    className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                      active
                        ? "bg-white text-black"
                        : "border border-white/12 bg-transparent text-neutral-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-16">
            <aside className="space-y-10 lg:sticky lg:top-32 lg:self-start">
              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  Price
                </h3>
                <div className="mt-4 flex flex-col gap-2">
                  {PRICE_BUCKETS.map(({ id, label }) => {
                    const active = priceBucket === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPriceBucket(id)}
                        className={`rounded-xl px-4 py-2.5 text-left text-sm transition ${
                          active
                            ? "bg-white/[0.1] text-white"
                            : "text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-300"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  Color
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {FILTER_COLOR_OPTIONS.map((color) => {
                    const active = selectedColors.includes(color);
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => toggleColor(color)}
                        className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition ${
                          active
                            ? "border-white bg-white text-black"
                            : "border-white/12 text-neutral-500 hover:border-white/25 hover:text-neutral-300"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
              {hasExtraFilters ? (
                <button
                  type="button"
                  onClick={clearShopFilters}
                  className="text-xs font-medium text-neutral-500 underline-offset-4 transition hover:text-white hover:underline"
                >
                  Clear price & color
                </button>
              ) : null}
            </aside>

            <div className="min-w-0">
              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-16 text-center text-neutral-500"
                  >
                    No products match these filters.
                  </motion.p>
                ) : (
                  <motion.div
                    key={filterAnimKey}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-3 xl:gap-12"
                  >
                    {filtered.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.45,
                          delay: reduceMotion ? 0 : i * 0.03,
                          ease,
                        }}
                      >
                        <ProductCard product={p} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
