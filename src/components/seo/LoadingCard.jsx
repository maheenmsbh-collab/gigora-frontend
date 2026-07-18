import Spinner from "../Spinner";

export default function LoadingCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
      <div className="flex flex-col items-center justify-center gap-5">

        <Spinner label="Analyzing SEO..." />

        <div className="w-full max-w-sm overflow-hidden rounded-full bg-slate-200">
          <div className="h-3 w-2/3 animate-pulse rounded-full bg-indigo-600" />
        </div>

        <p className="text-center text-sm text-slate-500">
          Our AI is analyzing your gig title, keywords,
          readability and search ranking...
        </p>

      </div>
    </div>
  );
}