"use client";

import { formatInr } from "@/lib/format-inr";
import { useOrderHistory } from "@/context/order-history-context";
import Link from "next/link";

export function OrdersPageContent() {
  const { orders } = useOrderHistory();

  if (orders.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Orders
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold uppercase tracking-[0.04em] sm:text-4xl">
          Order history
        </h1>
        <p className="mt-6 text-neutral-400">
          No orders yet. When you place an order from your bag, it appears here
          on this device.
        </p>
        <Link
          href="/cart"
          className="mt-8 inline-flex rounded-full border border-white/20 px-7 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-white/40 hover:bg-white/[0.06]"
        >
          Go to cart
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
        Orders
      </p>
      <h1 className="font-display mt-3 text-3xl font-semibold uppercase tracking-[0.04em] sm:text-4xl">
        Order history
      </h1>
      <p className="mt-3 text-sm text-neutral-500">
        Saved on this browser · Free shipping on every order
      </p>

      <ul className="mt-12 space-y-6">
        {orders.map((order) => (
          <li
            key={order.id}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <time
                dateTime={order.createdAt}
                className="text-sm text-neutral-400"
              >
                {new Date(order.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </time>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/90">
                {order.shipping === "free" ? "Free shipping" : ""}
              </span>
            </div>
            <p className="mt-3 font-display text-xl font-semibold uppercase tracking-wide">
              {formatInr(order.total, true)}
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              {order.items.reduce((n, l) => n + l.quantity, 0)} items
              {order.items[0] ? ` · ${order.items[0].name}` : ""}
              {order.items.length > 1
                ? ` · +${order.items.length - 1} more`
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
