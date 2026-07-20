export default function SkeletonCard({ className = "" }) {
  return <div className={`animate-pulse rounded-3xl border border-slate-200 bg-white p-6 ${className}`}><div className="h-4 w-2/5 rounded bg-slate-200" /><div className="mt-4 h-8 w-1/3 rounded bg-slate-100" /><div className="mt-4 h-3 w-3/4 rounded bg-slate-100" /></div>;
}
