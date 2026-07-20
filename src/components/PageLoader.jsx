export default function PageLoader({ label = "Loading your workspace..." }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4" role="status" aria-live="polite">
      <div className="flex items-center gap-3 rounded-3xl bg-white px-6 py-4 text-sm font-medium text-slate-700 shadow-md">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
        {label}
      </div>
    </main>
  );
}
