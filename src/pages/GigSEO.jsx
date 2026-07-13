import { useState } from 'react';
import ResultCard from '../components/ResultCard';
import Spinner from '../components/Spinner';
import { suggestGigSEO } from '../lib/api';

export default function GigSEO() {
  const [gigTitle, setGigTitle] = useState('');
  const [gigDescription, setGigDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [status, setStatus] = useState('idle');
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuggestions(null);

    if (!gigTitle.trim() || !gigDescription.trim()) {
      setError('Please enter both a gig title and description.');
      return;
    }

    setStatus('loading');

    try {
      const response = await suggestGigSEO({ gigTitle, gigDescription, keywords });
      setSuggestions(response);
    } catch {
      setError('Unable to generate SEO suggestions right now. Please try again later.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="space-y-6 py-6 lg:py-8">
      <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-md sm:p-6">
        <div className="mb-4">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 mb-2 ">Gig SEO</p>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Generate high-impact SEO suggestions</h1>
          <p className="text-sm leading-6 text-slate-600">
            Optimize your gig listing for search visibility with keyword suggestions and stronger positioning.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Gig Title</span>
              <input
                value={gigTitle}
                onChange={(event) => setGigTitle(event.target.value)}
                placeholder="e.g. I will design a high-converting landing page"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                type="text"
                aria-label="Gig title"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Keywords</span>
              <input
                value={keywords}
                onChange={(event) => setKeywords(event.target.value)}
                placeholder="e.g. landing page, conversion, web design"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                type="text"
                aria-label="Keywords"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Gig Description</span>
            <textarea
              value={gigDescription}
              onChange={(event) => setGigDescription(event.target.value)}
              placeholder="Enter the details of what you offer and the value you deliver."
              className="mt-3 min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              aria-label="Gig description"
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
            className="inline-flex h-12 items-center justify-center rounded-3xl bg-slate-950 px-6 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'loading' ? <Spinner label="Generating suggestions" /> : 'Generate SEO Suggestions'}
          </button>
        </form>
      </section>

      {suggestions && (
        <section className="grid gap-6 lg:grid-cols-2">
          <ResultCard title="Optimized headline" value="SEO ready">
            <p className="text-slate-700">{suggestions.headline}</p>
          </ResultCard>

          <ResultCard title="SEO suggestions">
            <ol className="space-y-3 text-slate-700">
              {suggestions.suggestions.map((suggestion) => (
                <li key={suggestion} className="list-decimal pl-4">
                  {suggestion}
                </li>
              ))}
            </ol>
          </ResultCard>
        </section>
      )}
    </div>
  );
}
