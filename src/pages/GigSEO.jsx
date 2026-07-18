// import { useState } from 'react';
// import ResultCard from '../components/ResultCard';
// import Spinner from '../components/Spinner';
// import { suggestGigSEO } from '../lib/api';

// export default function GigSEO() {
//   const [gigTitle, setGigTitle] = useState('');
//   const [gigDescription, setGigDescription] = useState('');
//   const [keywords, setKeywords] = useState('');
//   const [status, setStatus] = useState('idle');
//   const [suggestions, setSuggestions] = useState(null);
//   const [error, setError] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setSuggestions(null);

//     if (!gigTitle.trim() || !gigDescription.trim()) {
//       setError('Please enter both a gig title and description.');
//       return;
//     }

//     setStatus('loading');

//     try {
//       const response = await suggestGigSEO({ gigTitle, gigDescription, keywords });
//       setSuggestions(response);
//     } catch {
//       setError('Unable to generate SEO suggestions right now. Please try again later.');
//     } finally {
//       setStatus('idle');
//     }
//   };

//   return (
//     <div className="space-y-6 py-6 lg:py-5">
//       <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-md sm:p-6">
//         <div className="mb-4">
//           <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 mb-2 ">Gig SEO</p>
//           <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Generate high-impact SEO suggestions</h1>
//           <p className="text-sm leading-6 text-slate-600">
//             Optimize your gig listing for search visibility with keyword suggestions and stronger positioning.
//           </p>
//         </div>

//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div className="grid gap-6 lg:grid-cols-2">
//             <label className="block">
//               <span className="text-sm font-medium text-slate-700">Gig Title</span>
//               <input
//                 value={gigTitle}
//                 onChange={(event) => setGigTitle(event.target.value)}
//                 placeholder="e.g. I will design a high-converting landing page"
//                 className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                 type="text"
//                 aria-label="Gig title"
//                 required
//               />
//             </label>
//             <label className="block">
//               <span className="text-sm font-medium text-slate-700">Keywords</span>
//               <input
//                 value={keywords}
//                 onChange={(event) => setKeywords(event.target.value)}
//                 placeholder="e.g. landing page, conversion, web design"
//                 className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                 type="text"
//                 aria-label="Keywords"
//               />
//             </label>
//           </div>
//           <label className="block">
//             <span className="text-sm font-medium text-slate-700">Gig Description</span>
//             <textarea
//               value={gigDescription}
//               onChange={(event) => setGigDescription(event.target.value)}
//               placeholder="Enter the details of what you offer and the value you deliver."
//               className="mt-3 min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//               aria-label="Gig description"
//               required
//             />
//           </label>

//           {error && (
//             <div className="rounded-3xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert" aria-live="assertive">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={status === 'loading'}
//             className="inline-flex h-12 items-center justify-center rounded-3xl bg-slate-950 px-6 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             {status === 'loading' ? <Spinner label="Generating suggestions" /> : 'Generate SEO Suggestions'}
//           </button>
//         </form>
//       </section>

//       {suggestions && (
//         <section className="grid gap-6 lg:grid-cols-2">
//           <ResultCard title="Optimized headline" value="SEO ready">
//             <p className="text-slate-700">{suggestions.headline}</p>
//           </ResultCard>

//           <ResultCard title="SEO suggestions">
//             <ol className="space-y-3 text-slate-700">
//               {suggestions.suggestions.map((suggestion) => (
//                 <li key={suggestion} className="list-decimal pl-4">
//                   {suggestion}
//                 </li>
//               ))}
//             </ol>
//           </ResultCard>
//         </section>
//       )}
//     </div>
//   );
// }
import { useState } from "react";

import ResultCard from "../components/ResultCard";
import LoadingCard from "../components/seo/LoadingCard";
import SEOScoreCard from "../components/seo/SEOScoreCard";
import CharacterCounter from "../components/seo/CharacterCounter";
import KeywordChip from "../components/seo/KeywordChip";
import CopyButton from "../components/seo/CopyButton";

import { suggestGigSEO } from "../lib/api";

export default function GigSEO() {
  const [gigTitle, setGigTitle] = useState("");
  const [gigDescription, setGigDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState("");

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setResult(null);

    if (
      !gigTitle.trim() ||
      !gigDescription.trim() ||
      !keywords.trim() ||
      !category
    ) {
      setError("Please fill in every field.");
      return;
    }

    setStatus("loading");

    try {
      const response = await suggestGigSEO({
        gigTitle,
        gigDescription,
        keywords,
        category,
      });

      setResult(response);
    } catch (err) {
      setError("Unable to generate SEO suggestions.");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className="space-y-8">

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">

        <div className="mb-8">

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Gig SEO
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            AI Gig SEO Optimizer
          </h1>

          <p className="mt-2 text-slate-600">
            Improve your Fiverr or Upwork gig with AI-powered SEO suggestions.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">
              Gig Title
            </label>

            <input
              type="text"
              value={gigTitle}
              onChange={(e) => setGigTitle(e.target.value)}
              placeholder="I will design a professional website"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <CharacterCounter
              current={gigTitle.length}
              max={80}
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Gig Description
            </label>

            <textarea
              rows={6}
              value={gigDescription}
              onChange={(e) =>
                setGigDescription(e.target.value)
              }
              placeholder="Describe your service..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <CharacterCounter
              current={gigDescription.length}
              max={1200}
            />

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Keywords
              </label>

              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="react, frontend, website"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >

                <option value="">
                  Select category
                </option>

                <option>Web Development</option>

                <option>Graphic Design</option>

                <option>Digital Marketing</option>

                <option>Writing</option>

                <option>Video Editing</option>

                <option>AI Services</option>

              </select>

            </div>

          </div>

          {error && (

            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>

          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-2xl bg-slate-900 px-7 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Generate SEO Suggestions
          </button>

        </form>

      </section>

      {status === "loading" && <LoadingCard />}
      {result && (
        <div className="grid gap-6 lg:grid-cols-2">

          <SEOScoreCard score={result.seoScore} />

          <ResultCard title="Optimized Gig Title">

            <div className="space-y-4">

              <p className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                {result.optimizedTitle}
              </p>

              <CopyButton text={result.optimizedTitle} />

            </div>

          </ResultCard>

          <ResultCard title="Suggested Keywords">

            <div className="flex flex-wrap gap-3">

              {result.keywords.map((keyword) => (
                <KeywordChip
                  key={keyword}
                  keyword={keyword}
                />
              ))}

            </div>

          </ResultCard>

          <ResultCard title="Strengths">

            <ul className="space-y-3">

              {result.strengths.map((item) => (
                <li
                  key={item}
                  className="flex gap-3"
                >
                  <span className="text-emerald-600 font-bold">
                    ✓
                  </span>

                  <span>{item}</span>

                </li>
              ))}

            </ul>

          </ResultCard>

          <ResultCard title="Areas to Improve">

            <ul className="space-y-3">

              {result.weaknesses.map((item) => (
                <li
                  key={item}
                  className="flex gap-3"
                >
                  <span className="text-red-500 font-bold">
                    •
                  </span>

                  <span>{item}</span>

                </li>
              ))}

            </ul>

          </ResultCard>

          <ResultCard
            title="AI SEO Recommendations"
            className="lg:col-span-2"
          >

            <div className="space-y-5">

              <ol className="space-y-3">

                {result.suggestions.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-4 rounded-2xl bg-slate-50 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                      {index + 1}
                    </span>

                    <span className="text-slate-700">
                      {item}
                    </span>

                  </li>
                ))}

              </ol>

              <CopyButton
                text={result.suggestions.join("\n")}
              />

            </div>

          </ResultCard>

        </div>
      )}

      {!result && status === "idle" && !error && (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">

          <h2 className="text-xl font-semibold text-slate-800">
            No Analysis Yet
          </h2>

          <p className="mt-3 text-slate-500">
            Fill in the form above and generate AI SEO suggestions.
          </p>

        </div>

      )}

    </div>
  );
}