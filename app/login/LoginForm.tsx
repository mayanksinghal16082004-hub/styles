"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Mode = "signin" | "signup";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    urlError === "auth" ? "Something went wrong. Try again." : null,
  );
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const supabase = createClient();

    if (mode === "signin") {
      const { error: signError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (signError) {
        setError(signError.message);
        return;
      }
      router.push("/");
      router.refresh();
      return;
    }

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    if (data.session) {
      router.push("/");
      router.refresh();
      return;
    }
    setInfo(
      "Check your email for a confirmation link to finish signing up.",
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Account
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
      </div>

      <div className="mb-6 flex rounded-xl border border-white/[0.08] p-1">
        <button
          type="button"
          onClick={() => {
            setMode("signin");
            setError(null);
            setInfo(null);
          }}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
            mode === "signin"
              ? "bg-white text-black"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setError(null);
            setInfo(null);
          }}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
            mode === "signup"
              ? "bg-white text-black"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-500"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/[0.1] bg-black/50 px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-500"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/[0.1] bg-black/50 px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
            placeholder="••••••••"
          />
        </div>

        {error ? (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        {info ? (
          <p className="text-sm text-emerald-400/90" role="status">
            {info}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold tracking-wide text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Please wait…"
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-500">
        <Link href="/" className="text-neutral-400 underline-offset-4 hover:text-white hover:underline">
          ← Back to shop
        </Link>
      </p>
    </div>
  );
}


<button
  onClick={async () => {
    await fetch("https://hook.eu1.make.com/jipd6lnnj7n1lmib9ot9w2lj4kuzolho", {
      method: "POST"
    });

    alert("Sent 🚀");
  }}
  style={{
    marginTop: "20px",
    padding: "10px 20px",
    background: "white",
    color: "black",
    borderRadius: "8px"
  }}
>
  Test Automation
</button>