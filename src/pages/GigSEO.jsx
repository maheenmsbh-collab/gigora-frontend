import { useState } from "react";
import { FiCopy, FiRefreshCw, FiTag } from "react-icons/fi";
import Spinner from "../components/Spinner";
import { suggestGigSEO } from "../lib/api";
import { showError, showSuccess } from "../lib/toast";
import { useAuth } from "../contexts/AuthContext";
import { saveGigSEO } from "../lib/history";
import { getRemainingUses } from "../lib/usage";

const TITLE_LIMIT = 80;

function CopyAction({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
      showSuccess(`${label} copied.`);
    } catch {
      showError("Unable to copy.");
    }
  };
  return <button type="button" onClick={copy} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"><FiCopy />{copied ? "Copied" : `Copy ${label}`}</button>;
}

export default function GigSEO() {
  const { user } = useAuth();
  const [gigTitle, setGigTitle] = useState("");
  const [gigDescription, setGigDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  const analyze = async (event) => {
    event?.preventDefault();
    if (!gigTitle.trim() || !gigDescription.trim()) {
      showError("Please enter both the gig title and description.");
      return;
    }
    if (gigTitle.length > TITLE_LIMIT) {
      showError("Gig titles cannot exceed 80 characters.");
      return;
    }
    if (getRemainingUses() === 0) {
      showError("You have reached today's free limit.");
      return;
    }
    setStatus("loading");
    try {
      const response = await suggestGigSEO({ gigTitle, gigDescription, keywords, category });
      setResult(response);
      showSuccess("Gig SEO generated successfully.");

      try {
        if (user?.id) {
          await saveGigSEO(user.id, {
            gigTitle,
            seoScore: response.seoScore,
            optimizedTitle: response.optimizedTitle,
            keywords: response.keywords,
            suggestions: response.suggestions,
          });
          showSuccess("SEO analysis saved to History.");
        }
      } catch {
        showError("Could not save the SEO analysis to History.");
      }
    } catch {
      showError("Unable to analyze your gig right now.");
    } finally {
      setStatus("idle");
    }
  };

  return <div className="mx-auto max-w-5xl space-y-6">
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Gig SEO Optimizer</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Optimize your gig</h1>
      <form onSubmit={analyze} className="mt-7 space-y-5">
        <div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-medium">Gig Title<input value={gigTitle} onChange={(event) => setGigTitle(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500" /></label><label className="text-sm font-medium">Category<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><option>Web Development</option><option>UI/UX</option><option>Graphic Design</option><option>Content Writing</option><option>SEO</option><option>Digital Marketing</option></select></label></div>
        <p className={`-mt-3 text-right text-xs ${gigTitle.length > TITLE_LIMIT ? "font-semibold text-red-600" : "text-slate-500"}`}>{gigTitle.length}/{TITLE_LIMIT} characters</p>
        <label className="block text-sm font-medium">Target Keywords<input value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="React, frontend, website" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
        <label className="block text-sm font-medium">Gig Description<textarea rows={7} value={gigDescription} onChange={(event) => setGigDescription(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
        <button disabled={status === "loading"} className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-60">{status === "loading" ? <Spinner label="Analyzing..." /> : "Analyze SEO"}</button>
      </form>
    </section>
    {result && <section className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2"><article className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-sm text-slate-500">SEO Score</p><div className="mt-4 space-y-4">{[["Title", Math.min(100, 45 + Math.round(result.seoScore * 0.55)), "bg-indigo-500"], ["Tags", Math.min(100, result.keywords.length * 15), "bg-emerald-500"], ["Description", Math.min(100, 35 + Math.round(gigDescription.length / 20)), "bg-amber-500"]].map(([label, score, color]) => <div key={label}><div className="flex justify-between text-sm"><span>{label}</span><span>{score}%</span></div><div className="mt-1 h-3 overflow-hidden rounded-full bg-slate-200"><div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} /></div></div>)}</div></article><article className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-sm text-slate-500">Optimized Title</p><p className="mt-2 font-semibold text-slate-900">{result.optimizedTitle}</p><div className="mt-4"><CopyAction label="Title" value={result.optimizedTitle} /></div></article></div>
      <article className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center gap-2 font-semibold"><FiTag />Keyword validation</div><div className="mt-4 flex flex-wrap gap-2">{result.keywords.map((keyword) => { const isValid = keywords.toLowerCase().split(",").map((item) => item.trim()).includes(keyword.toLowerCase()); return <span key={keyword} className={`rounded-full px-3 py-1 text-sm font-medium ${isValid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{keyword}</span>; })}</div><div className="mt-4"><CopyAction label="Tags" value={result.keywords.join(", ")} /></div></article>
      <article className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-semibold">SEO Suggestions</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">{result.suggestions.map((item) => <li key={item}>{item}</li>)}</ul><div className="mt-4 flex flex-wrap gap-3"><CopyAction label="Description" value={gigDescription} /><button type="button" onClick={analyze} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white"><FiRefreshCw />Regenerate SEO</button></div></article>
    </section>}
  </div>;
}
