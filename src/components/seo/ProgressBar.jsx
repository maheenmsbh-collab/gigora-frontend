export default function ProgressBar({ value }) {
  const progress = Math.max(0, Math.min(100, value));

  let color = "bg-red-500";

  if (progress >= 80) {
    color = "bg-emerald-500";
  } else if (progress >= 60) {
    color = "bg-yellow-500";
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-slate-600">
        <span>SEO Score</span>
        <span>{progress}/100</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}