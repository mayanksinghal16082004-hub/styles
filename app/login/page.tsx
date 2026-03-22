import { SiteHeader } from "@/components/SiteHeader";
import { LoginForm } from "./LoginForm";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — STYLEOS",
  description: "Sign in or create a STYLEOS account.",
};

function LoginFormFallback() {
  return (
    <div className="h-[420px] w-full max-w-md animate-pulse rounded-2xl border border-white/[0.08] bg-white/[0.02]" />
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-4 py-16 sm:px-6">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
