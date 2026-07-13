export default function Spinner({ label = 'Loading...' }) {
  return (
    <div className="inline-flex items-center gap-3 text-sm font-semibold text-slate-100">
      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-500" />
      <span>{label}</span>
    </div>
  );
}
