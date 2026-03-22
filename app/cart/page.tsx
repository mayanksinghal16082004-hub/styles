import { SiteHeader } from "@/components/SiteHeader";
import { CartPageContent } from "./CartPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart — STYLEOS",
  description: "Review items in your STYLEOS bag.",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <CartPageContent />
    </div>
  );
}
