import { SiteHeader } from "@/components/SiteHeader";
import { OrdersPageContent } from "./OrdersPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders — STYLEOS",
  description: "Your STYLEOS order history on this device.",
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <SiteHeader />
      <OrdersPageContent />
    </div>
  );
}
