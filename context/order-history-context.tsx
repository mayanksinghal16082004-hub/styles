"use client";

import type { CartLine } from "@/context/cart-context";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "styleos_order_history_v1";

export type OrderRecord = {
  id: string;
  createdAt: string;
  items: CartLine[];
  total: number;
  shipping: "free";
};

type OrderHistoryValue = {
  orders: OrderRecord[];
  placeOrder: (items: CartLine[], total: number) => void;
};

const OrderHistoryContext = createContext<OrderHistoryValue | null>(null);

function loadOrders(): OrderRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OrderRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: OrderRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    /* ignore quota */
  }
}

export function OrderHistoryProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Client-only: read persisted orders once after mount (no SSR localStorage).
    queueMicrotask(() => {
      setOrders(loadOrders());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) saveOrders(orders);
  }, [orders, hydrated]);

  const placeOrder = useCallback((items: CartLine[], total: number) => {
    if (items.length === 0) return;
    const order: OrderRecord = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      items: items.map((l) => ({ ...l })),
      total,
      shipping: "free",
    };
    setOrders((prev) => [order, ...prev]);
  }, []);

  const value = useMemo(
    () => ({ orders, placeOrder }),
    [orders, placeOrder],
  );

  return (
    <OrderHistoryContext.Provider value={value}>
      {children}
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistory() {
  const ctx = useContext(OrderHistoryContext);
  if (!ctx) {
    throw new Error("useOrderHistory must be used within OrderHistoryProvider");
  }
  return ctx;
}
