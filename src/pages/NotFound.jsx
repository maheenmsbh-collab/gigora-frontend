import { Link } from "react-router-dom";
import { FiCompass } from "react-icons/fi";

export default function NotFound() {
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><section className="max-w-md rounded-3xl bg-white p-8 text-center shadow-md"><FiCompass className="mx-auto h-12 w-12 text-indigo-600" /><p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">404</p><h1 className="mt-2 text-2xl font-bold text-slate-900">Page not found</h1><p className="mt-3 text-slate-600">The page you requested does not exist or may have moved.</p><Link to="/dashboard" className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Back to Dashboard</Link></section></main>;
}
