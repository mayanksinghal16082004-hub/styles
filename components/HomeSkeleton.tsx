/** Lightweight placeholder while home shell hydrates (useSearchParams). */
export function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-[#030303]">
      <div className="min-h-[min(88vh,900px)] border-b border-white/[0.06] bg-[#050505]" />
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12">
        <div className="mb-12 h-8 w-48 animate-pulse rounded bg-white/[0.06]" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-[1.75rem] bg-white/[0.04]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
