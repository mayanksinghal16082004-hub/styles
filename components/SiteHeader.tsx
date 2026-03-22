import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { CartNavLink } from "@/components/CartNavLink";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:gap-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-display shrink-0 text-xl font-semibold uppercase tracking-[0.2em] text-white sm:text-2xl"
        >
          STYLEOS
        </Link>
        <nav aria-label="Main" className="min-w-0 flex-1">
          <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs font-medium text-neutral-400 sm:justify-center sm:gap-x-6 sm:text-sm lg:gap-x-8">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/?category=sneakers#shop"
                className="transition hover:text-white"
              >
                Sneakers
              </Link>
            </li>
            <li>
              <Link
                href="/?category=apparel#shop"
                className="transition hover:text-white"
              >
                Apparel
              </Link>
            </li>
            <li>
              <Link href="/orders" className="transition hover:text-white">
                Orders
              </Link>
            </li>
            <li className="flex items-center sm:ml-1">
              <CartNavLink />
            </li>
            <li className="sm:ml-0">
              {user ? (
                <form action={signOut}>
                  <button
                    type="submit"
                    className="rounded-lg border border-white/20 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white/40 hover:bg-white/[0.06]"
                  >
                    Logout
                  </button>
                </form>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex rounded-lg border border-white/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-neutral-200"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
