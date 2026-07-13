import { useState } from 'react';
import ResultCard from '../components/ResultCard';
import Spinner from '../components/Spinner';
import { generateProposal } from '../lib/api';

export default function ProposalGenerator() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [status, setStatus] = useState('idle');
  const [proposal, setProposal] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setProposal(null);

    if (!jobTitle.trim() || !jobDescription.trim()) {
      setError('Please enter both a job title and description.');
      return;
    }

    setStatus('loading');

    try {
      const response = await generateProposal({ jobTitle, jobDescription, skills });
      setProposal(response);
    } catch {
      setError('Unable to generate a proposal right now. Please try again later.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="space-y-6 py-6 lg:py-6">
      <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-md sm:p-6">
        <div className="mb-4">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 mb-1.5">Proposal Generator</p>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl mb-1.5">Create professional proposals instantly</h1>
          <p className="text-sm leading-6 text-slate-600">
            Enter a job brief and the key skills you offer, then generate a polished proposal to share with clients.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Job Title</span>
              <input
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="e.g. Shopify Store Optimization"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                type="text"
                aria-label="Job title"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Skills</span>
              <input
                value={skills}
                onChange={(event) => setSkills(event.target.value)}
                placeholder="e.g. content strategy, SEO, landing pages"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                type="text"
                aria-label="Skills"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Job Description</span>
            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Describe the project, deliverables, timeline, and expectations."
              className="mt-3 min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              aria-label="Job description"
              required
            />
          </label>

          {error && (
            <div className="rounded-3xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'loading' ? <Spinner label="Generating proposal" /> : 'Generate Proposal'}
          </button>
        </form>
      </section>

      {proposal && (
        <section className="grid gap-6">
          <ResultCard title={proposal.title}>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-700">
              {proposal.proposal.split('\n').map((line, index) => (
                <p key={index} className={line === '' ? 'mt-4' : 'mt-4'}>
                  {line}
                </p>
              ))}
            </div>
          </ResultCard>
        </section>
      )}
    </div>
  );
}
