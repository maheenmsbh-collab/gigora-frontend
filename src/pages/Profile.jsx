import { useAuth } from "../contexts/AuthContext";
import { getUserDisplayName } from "../lib/getCurrentUser";

const formatDate = (value) => value ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value)) : "Not available";

export default function Profile() {
  const { user, loading } = useAuth();
  const name = getUserDisplayName(user);
  const isPro = user?.user_metadata?.plan === "pro";
  if (loading) return <div className="animate-pulse space-y-4"><div className="h-28 rounded-2xl bg-slate-200" /><div className="h-48 rounded-2xl bg-slate-200" /></div>;
  return <div className="mx-auto max-w-3xl space-y-6"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Account</p><div className="mt-3 flex flex-wrap items-center gap-3"><h1 className="text-3xl font-bold text-slate-900">{name}</h1>{isPro && <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">PRO</span>}</div></section><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><dl className="space-y-5"><div className="flex flex-col gap-1 border-b border-slate-100 pb-5 sm:flex-row sm:justify-between"><dt className="text-sm text-slate-500">Name</dt><dd className="font-medium">{name}</dd></div><div className="flex flex-col gap-1 border-b border-slate-100 pb-5 sm:flex-row sm:justify-between"><dt className="text-sm text-slate-500">Email</dt><dd className="font-medium">{user?.email || "Not available"}</dd></div><div className="flex flex-col gap-1 border-b border-slate-100 pb-5 sm:flex-row sm:justify-between"><dt className="text-sm text-slate-500">Plan</dt><dd>{isPro ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">PRO</span> : <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">FREE</span>}</dd></div><div className="flex flex-col gap-1 sm:flex-row sm:justify-between"><dt className="text-sm text-slate-500">Join date</dt><dd className="font-medium">{formatDate(user?.created_at)}</dd></div></dl></section></div>;
}
