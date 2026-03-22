"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useOrderHistory } from "@/context/order-history-context";
import { formatInr } from "@/lib/format-inr";

const FREE_SHIPPING_NOTE =
  "Standard delivery is complimentary on every order, nationwide.";

export function CartPageContent() {
  const router = useRouter();
  const { items, removeItem, total, itemCount, clearCart } = useCart();
  const { placeOrder } = useOrderHistory();

  function handlePlaceOrder() {
    if (items.length === 0) return;
    placeOrder(items, total);
    clearCart();
    router.push("/orders");
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Bag
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold uppercase tracking-[0.04em] sm:text-4xl">
          Your cart
        </h1>
        {itemCount > 0 ? (
          <p className="mt-2 text-sm text-neutral-400">
            {itemCount} {itemCount === 1 ? "item" : "items"} · Free shipping
          </p>
        ) : null}
      </div>

      <div className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
          Free shipping
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          {FREE_SHIPPING_NOTE} Final purchase may be completed on retailer
          sites via Buy Now.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-16 text-center">
          <p className="text-neutral-400">Your cart is empty.</p>
          <Link
            href="/#shop"
            className="mt-6 inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-neutral-200"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((line) => (
              <li
                key={line.id}
                className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:gap-5 sm:p-5"
              >
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-900 sm:h-28 sm:w-24">
                  <Image
                    src={line.image}
                    alt={line.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <h2 className="font-medium text-white">{line.name}</h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      {formatInr(line.price)} × {line.quantity}
                    </p>
                    <p className="mt-2 text-sm font-medium text-neutral-300">
                      {formatInr(line.price * line.quantity, true)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.id)}
                    className="shrink-0 self-start rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 transition hover:border-red-500/40 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-6 border-t border-white/[0.08] pt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                  Estimated total
                </p>
                <p className="font-display mt-1 text-3xl font-semibold uppercase tracking-wide">
                  {formatInr(total, true)}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Shipping: included · ₹0
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="inline-flex justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-black transition hover:bg-neutral-200"
              >
                Place order
              </button>
              <Link
                href="/#shop"
                className="inline-flex justify-center rounded-full border border-white/20 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-white/35 hover:bg-white/[0.05]"
              >
                Continue shopping
              </Link>
            </div>
            <p className="text-xs leading-relaxed text-neutral-600">
              Demo checkout: saves this bag as an order in your browser history.
              Use Buy Now on product cards to shop on partner sites.
            </p>
          </div>
        </>
      )}
    </main>
  );
}
