import ProgressBar from "./ProgressBar";

export default function SEOScoreCard({ score }) {
  const getStatus = () => {
    if (score >= 90)
      return {
        text: "Excellent",
        color: "text-emerald-600",
      };

    if (score >= 75)
      return {
        text: "Very Good",
        color: "text-indigo-600",
      };

    if (score >= 60)
      return {
        text: "Needs Improvement",
        color: "text-amber-600",
      };

    return {
      text: "Poor",
      color: "text-red-600",
    };
  };

  const status = getStatus();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            SEO Analysis
          </h2>

          <p className={`mt-1 text-sm font-semibold ${status.color}`}>
            {status.text}
          </p>
        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
          <span className="text-2xl font-bold text-indigo-600">
            {score}
          </span>
        </div>
      </div>

      <ProgressBar value={score} />
    </div>
  );
}