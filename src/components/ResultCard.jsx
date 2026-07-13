export default function ResultCard({ title, value, children, className = '' }) {
  return (
    <div className={`rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] ${className}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {value && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
            {value}
          </span>
        )}
      </div>
      <div className="space-y-4 text-sm leading-6 text-slate-600">{children}</div>
    </div>
  );
}
