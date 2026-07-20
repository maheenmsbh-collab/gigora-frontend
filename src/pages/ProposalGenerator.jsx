import { useState } from "react";
import ResultCard from "../components/ResultCard";
import Spinner from "../components/Spinner";
import { generateProposal } from "../lib/api";
import { FiCopy, FiDownload } from "react-icons/fi";
import { showSuccess, showError } from "../lib/toast";

export default function ProposalGenerator() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [tone, setTone] = useState("Professional");

  const [status, setStatus] = useState("idle");
  const [proposal, setProposal] = useState(null);

  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event) => {
  event.preventDefault();

  setProposal(null);

  if (!jobTitle.trim() || !jobDescription.trim()) {
    showError("Please enter both a job title and description.");
    return;
  }

  setStatus("loading");

  try {
    const response = await generateProposal({
      jobTitle,
      jobDescription,
      skills,
    });

    setProposal(response);

    showSuccess("Proposal generated successfully!");
  } catch {
    showError(
      "Unable to generate a proposal right now."
    );
  } finally {
    setStatus("idle");
  }
};
  async function copyProposal() {
    if (!proposal) return;

    await navigator.clipboard.writeText(proposal.proposal);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  function downloadProposal() {
    if (!proposal) return;

    const blob = new Blob([proposal.proposal], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "proposal.txt";

    link.click();

    URL.revokeObjectURL(url);
  }

  const wordCount = proposal
    ? proposal.proposal
        .trim()
        .split(/\s+/).length
    : 0;

  return (
    <div className="space-y-8">

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">

        <div className="mb-8">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Proposal Generator
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            AI Proposal Writer
          </h1>

          <p className="mt-2 text-slate-600">
            Generate professional freelance proposals in seconds.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Job Title
              </label>

              <input
                value={jobTitle}
                onChange={(e) =>
                  setJobTitle(e.target.value)
                }
                placeholder="Shopify Store Optimization"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />

              <p className="mt-1 text-xs text-slate-500">
                {jobTitle.length}/80 characters
              </p>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Skills
              </label>

              <input
                value={skills}
                onChange={(e) =>
                  setSkills(e.target.value)
                }
                placeholder="React, SEO, Shopify"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Tone
            </label>

            <select
              value={tone}
              onChange={(e) =>
                setTone(e.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <option>Professional</option>
              <option>Friendly</option>
              <option>Confident</option>
              <option>Formal</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Job Description
            </label>

            <textarea
              rows={7}
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              placeholder="Paste the client's project here..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            />

            <p className="mt-1 text-xs text-slate-500">
              {jobDescription.length}/2000 characters
            </p>

          </div>

       

          <button
            disabled={status === "loading"}
            className="rounded-2xl bg-slate-900 px-7 py-3 font-semibold text-white hover:bg-slate-800"
          >
            {status === "loading"
              ? <Spinner label="Generating Proposal..." />
              : "Generate Proposal"}
          </button>

        </form>

      </section>
            {status === "loading" && (
        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-md">
          <div className="flex flex-col items-center justify-center gap-5">
            <Spinner label="AI is writing your proposal..." />
            <p className="text-sm text-slate-500">
              This usually takes a few seconds.
            </p>
          </div>
        </section>
      )}

      {proposal && (
        <ResultCard
          title={proposal.title}
          value={`${wordCount} words`}
        >
          <div className="flex flex-wrap gap-3">

            <button
              onClick={copyProposal}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <FiCopy />
              {copied ? "Copied!" : "Copy Proposal"}
            </button>

            <button
              onClick={downloadProposal}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              <FiDownload />
              Download TXT
            </button>

          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">

            {proposal.proposal.split("\n").map((line, index) => (
              <p
                key={index}
                className="mb-4 whitespace-pre-wrap leading-7 text-slate-700"
              >
                {line}
              </p>
            ))}

          </div>
        </ResultCard>
      )}

      {!proposal &&
        status === "idle" &&
       (
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <div className="mx-auto max-w-md">

              <div className="mb-5 text-6xl">
                ✍️
              </div>

              <h2 className="text-2xl font-semibold text-slate-800">
                No Proposal Generated Yet
              </h2>

              <p className="mt-3 text-slate-500">
                Fill in the project information above and let AI
                generate a professional proposal for you.
              </p>

            </div>

          </section>
        )}

    </div>
  );
}