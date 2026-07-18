export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color = "bg-indigo-500",
}) {
  const Icon = icon;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color} text-white`}
        >
          <Icon size={26} />
        </div>
      </div>
    </div>
  );
}