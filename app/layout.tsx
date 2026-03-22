import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Oswald } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import { OrderHistoryProvider } from "@/context/order-history-context";
import { PromoBar } from "@/components/PromoBar";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STYLEOS — Indian Streetwear & Sneakers",
  description:
    "Curated sneakers and apparel. Shop drops via Nike India, Crepdog Crew, VegNonVeg & Superkicks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${oswald.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] font-sans text-white antialiased">
        <CartProvider>
          <OrderHistoryProvider>
            <PromoBar />
            {children}
          </OrderHistoryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
