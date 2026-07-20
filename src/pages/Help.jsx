import { FiMail, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const questions = [
  ["How do I save generated content?", "Proposals, profile analyses, and AI chat responses are automatically saved to History after they complete."],
  ["Where can I edit my account?", "Open Profile from the sidebar to update your name or request a password reset."],
  ["Why is the AI Assistant unavailable?", "Add REACT_APP_GEMINI_API_KEY to your environment file, then restart the app."],
];

export default function Help() {
  return <div className="mx-auto max-w-4xl space-y-6"><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8"><p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Support</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Help Center</h1><p className="mt-2 text-slate-600">Quick answers for using Gigora.</p></section><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2><div className="mt-5 divide-y divide-slate-100">{questions.map(([question, answer]) => <details key={question} className="py-4"><summary className="cursor-pointer font-medium text-slate-800">{question}</summary><p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p></details>)}</div></section><section className="grid gap-4 sm:grid-cols-2"><a href="mailto:support@gigora.app" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"><FiMail className="h-6 w-6 text-indigo-600" /><h2 className="mt-4 font-semibold text-slate-900">Contact Support</h2><p className="mt-2 text-sm text-slate-600">Email us for account or product help.</p></a><Link to="/dashboard/about" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"><FiMessageCircle className="h-6 w-6 text-indigo-600" /><h2 className="mt-4 font-semibold text-slate-900">Documentation</h2><p className="mt-2 text-sm text-slate-600">Learn about Gigora and its technology.</p></Link></section></div>;
}
