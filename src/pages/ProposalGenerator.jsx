import { useState } from "react";
import { FiCopy, FiDownload, FiRefreshCw, FiSave } from "react-icons/fi";
import { generateProposal } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import { saveProposal } from "../lib/history";
import { showError, showSuccess } from "../lib/toast";
import { getRemainingUses, recordUse } from "../lib/usage";

const tones = ["Professional", "Friendly", "Confident"];
const categories = ["Web Development", "Graphic Design", "Writing", "Marketing", "Mobile Development", "AI/ML", "Other"];

export default function ProposalGenerator() {
  const { user } = useAuth();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skillCategory, setSkillCategory] = useState(categories[0]);
  const [tone, setTone] = useState(tones[0]);
  const [platform, setPlatform] = useState("Fiverr");
  const [status, setStatus] = useState("idle");
  const [proposal, setProposal] = useState(null);
  const [error, setError] = useState("");
  const titleTooLong = jobTitle.length > 80;

  const generate = async (event) => {
    event?.preventDefault();
    if (!jobTitle.trim() || !jobDescription.trim()) return setError("Please enter both a job title and description.");
    if (titleTooLong) return setError("Fiverr titles cannot exceed 80 characters.");
    if (getRemainingUses() === 0) return setError("You have reached today's free limit. Upgrade to Pro to continue.");
    setError(""); setStatus("loading");
    try {
      const response = await generateProposal({ jobTitle, jobDescription, skills: skillCategory, tone, skillCategory, platform });
      setProposal(response); recordUse(); showSuccess("Proposal generated successfully.");
    } catch { setError("Unable to generate a proposal. Please try again."); showError("Unable to generate proposal."); }
    finally { setStatus("idle"); }
  };
  const copy = async () => { try { await navigator.clipboard.writeText(proposal.proposal); showSuccess("Proposal copied."); } catch { showError("Unable to copy proposal."); } };
  const download = () => { const date = new Date().toISOString().slice(0, 10); const url = URL.createObjectURL(new Blob([proposal.proposal], { type: "text/plain" })); const link = document.createElement("a"); link.href = url; link.download = `proposal-${date}.txt`; link.click(); URL.revokeObjectURL(url); showSuccess("Proposal downloaded."); };
  const save = async () => { try { await saveProposal(user.id, { jobTitle: jobTitle.trim(), proposal: proposal.proposal }); showSuccess("Proposal saved to History."); } catch { setError("Unable to save proposal to History."); showError("Unable to save proposal."); } };

  return <div className="mx-auto max-w-5xl space-y-6"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Proposal Generator</p><h1 className="mt-2 text-3xl font-bold">AI Proposal Writer</h1><form onSubmit={generate} className="mt-7 space-y-5"><label className="block text-sm font-medium">Job Title<input value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label><p className={`-mt-3 text-right text-xs ${titleTooLong ? "font-semibold text-red-600" : "text-slate-500"}`}>{jobTitle.length}/80 characters</p><div><p className="text-sm font-medium">Tone</p><div className="mt-2 flex flex-wrap gap-2">{tones.map((item) => <button type="button" key={item} onClick={() => setTone(item)} className={`min-h-12 rounded-xl px-4 py-3 text-sm font-medium ${tone === item ? "bg-purple-600 text-white" : "border border-slate-300 bg-white"}`}>{item}</button>)}</div></div><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-medium">Skill Category<select value={skillCategory} onChange={(event) => setSkillCategory(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">{categories.map((item) => <option key={item}>{item}</option>)}</select></label><div><p className="text-sm font-medium">Platform</p><div className="mt-2 flex rounded-xl border border-slate-200 p-1">{["Fiverr", "Upwork"].map((item) => <button key={item} type="button" onClick={() => setPlatform(item)} className={`min-h-12 flex-1 rounded-lg px-4 text-sm font-medium ${platform === item ? "bg-purple-600 text-white" : "text-slate-600"}`}>{item}</button>)}</div></div></div><label className="block text-sm font-medium">Job Description<textarea rows={7} value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>{error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}<button disabled={status === "loading" || titleTooLong} className="min-h-12 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-60">{status === "loading" ? "Generating..." : "Generate Proposal"}</button></form></section>{status === "loading" && <section className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"><div className="h-5 w-1/3 rounded bg-slate-200" /><div className="mt-4 h-24 rounded bg-slate-100" /></section>}{proposal && <section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold">{proposal.title}</h2><div className="flex flex-wrap gap-2"><button onClick={copy} className="min-h-12 rounded-xl border px-4 py-3"><FiCopy className="inline" /> Copy</button><button onClick={download} className="min-h-12 rounded-xl border px-4 py-3"><FiDownload className="inline" /> Download</button><button onClick={save} className="min-h-12 rounded-xl border px-4 py-3"><FiSave className="inline" /> Save</button><button onClick={generate} className="min-h-12 rounded-xl bg-purple-600 px-4 py-3 text-white"><FiRefreshCw className="inline" /> Regenerate</button></div></div><div className="mt-5 flex flex-wrap gap-2">{proposal.keyPoints.map((point) => <span key={point} className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">{point}</span>)}</div><pre className="mt-5 whitespace-pre-wrap rounded-xl bg-slate-50 p-5 font-sans leading-7 text-slate-700">{proposal.proposal}</pre></section>}</div>;
}
