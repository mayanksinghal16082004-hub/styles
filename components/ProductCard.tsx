"use client";

import Image from "next/image";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { formatInr } from "@/lib/format-inr";

export function ProductCard({
  product,
  imagePriority,
}: {
  product: Product;
  imagePriority?: boolean;
}) {
  const { addItem } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.02] shadow-lg shadow-black/40 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-white/[0.12] hover:shadow-2xl hover:shadow-black/70 hover:ring-1 hover:ring-white/10">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          priority={imagePriority ?? product.id === "1"}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7 lg:p-8">
        <div className="space-y-2">
          <h3 className="font-display text-xl font-medium uppercase leading-tight tracking-[0.02em] text-white sm:text-2xl">
            {product.name}
          </h3>
          <p className="text-lg font-medium tracking-tight text-neutral-300">
            {formatInr(product.price)}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {product.colors.map((c) => (
              <span
                key={c}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-500"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-transparent px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white/40 hover:bg-white/[0.06]"
          >
            Add to Cart
          </button>
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-neutral-200"
          >
            Buy Now
          </a>
        </div>
      </div>
    </article>
  );
}
