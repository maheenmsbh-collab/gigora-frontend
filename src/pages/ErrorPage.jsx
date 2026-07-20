import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

export default function ErrorPage({ title = "Something went wrong", message = "Please try again or return to your workspace." }) {
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><section className="max-w-md rounded-3xl bg-white p-8 text-center shadow-md"><FiAlertCircle className="mx-auto h-12 w-12 text-red-500" /><h1 className="mt-5 text-2xl font-bold text-slate-900">{title}</h1><p className="mt-3 text-slate-600">{message}</p><Link to="/dashboard" className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Go to Dashboard</Link></section></main>;
}
