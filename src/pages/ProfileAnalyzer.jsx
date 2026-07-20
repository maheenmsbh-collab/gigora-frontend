import { useState } from 'react';
import ResultCard from '../components/ResultCard';
import Spinner from '../components/Spinner';
import { analyzeProfile } from '../lib/api';
import { showSuccess, showError } from "../lib/toast";
import { useAuth } from "../contexts/AuthContext";
import { saveProfileAnalysis } from "../lib/history";

const experienceOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const platformOptions = ['Fiverr', 'Upwork', 'Freelancer'];

export default function ProfileAnalyzer() {
  const { user } = useAuth();
  const [profileUrl, setProfileUrl] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('Intermediate');
  const [platform, setPlatform] = useState('Fiverr');
  const [status, setStatus] = useState('idle');
  const [results, setResults] = useState(null);
  // const [error, setError] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!profileUrl.trim() || !skills.trim()) {
    showError("Profile URL and skills are required.");
    return;
  }

  setStatus("loading");
  setResults(null);

  try {
    const analysis = await analyzeProfile({
      profileUrl,
      skills,
      experience,
      platform,
    });

    setResults(analysis);

    // Save the full result for the user, while the history card shows a concise preview.
    if (user?.id) {
      try {
        await saveProfileAnalysis(user.id, {
          profileUrl,
          overallScore: analysis.overallScore,
          analysis,
        });
      } catch {
        showError("Analysis completed, but it could not be saved to history.");
      }
    }
    showSuccess("Profile analyzed successfully!");
  } catch {
    showError(
      "Unable to analyze your profile at this time. Please try again later."
    );
  } finally {
    setStatus("idle");
  }
};

  return (
    <div className="space-y-6 py-6 lg:py-6">
      <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-md sm:p-6">
        <div className="mb-4">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 mb-2">Profile Analyzer</p>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl mb-2">Analyze your profile in seconds</h1>
          <p className="text-sm leading-6 text-slate-600">
            Use the profiler to review your marketplace listing for Fiverr, Upwork, or Freelancer. Get instant strengths, weaknesses, and AI-backed suggestions.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Profile URL</span>
              <input
                value={profileUrl}
                onChange={(event) => setProfileUrl(event.target.value)}
                placeholder="https://www.example.com/profile"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                type="url"
                aria-label="Profile URL"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Skills</span>
              <input
                value={skills}
                onChange={(event) => setSkills(event.target.value)}
                placeholder="e.g. UX design, copywriting, marketing"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                type="text"
                aria-label="Skills"
                required
              />
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Experience level</span>
              <select
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                aria-label="Experience level"
              >
                {experienceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Target platform</span>
              <select
                value={platform}
                onChange={(event) => setPlatform(event.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                aria-label="Target platform"
              >
                {platformOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

        

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'loading' ? <Spinner label="Analyzing profile" /> : 'Analyze Profile'}
          </button>
        </form>
      </section>

      {results && (
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <ResultCard title="Overall score" value={`${results.overallScore}%`}>
              <p className="text-sm text-slate-700">Your profile is well positioned for visibility and conversion. Review the suggestions to make it stronger.</p>
            </ResultCard>

            <div className="grid gap-6 lg:grid-cols-2">
              <ResultCard title="Strengths">
                <ul className="space-y-3">
                  {results.strengths.map((item) => (
                    <li key={item} className="list-disc pl-4 text-slate-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </ResultCard>
              <ResultCard title="Weaknesses">
                <ul className="space-y-3">
                  {results.weaknesses.map((item) => (
                    <li key={item} className="list-disc pl-4 text-slate-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </ResultCard>
            </div>
          </div>

          <ResultCard title="AI suggestions">
            <ol className="space-y-3 text-slate-700">
              {results.suggestions.map((suggestion) => (
                <li key={suggestion} className="list-decimal pl-4">
                  {suggestion}
                </li>
              ))}
            </ol>
          </ResultCard>

          <ResultCard title="Profile completion" value={`${results.completion}%`} className="bg-slate-50">
            <p className="text-sm text-slate-700">Your profile is nearly complete. Add the remaining details to achieve a perfect score.</p>
          </ResultCard>
        </section>
      )}
    </div>
  );
}
