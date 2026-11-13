export default function ProductSkeleton() {
  return (
    <div className="rounded-lg bg-white shadow-sm" aria-label="Loading product">
      <div className="h-56 w-full animate-pulse bg-slate-200 p-4" />
      <div className="p-4">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-4 w-24 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-5 w-16 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-10 w-full animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
