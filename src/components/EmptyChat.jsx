import { FiMessageCircle } from "react-icons/fi";

export default function EmptyChat() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
        <FiMessageCircle className="h-8 w-8" />
      </div>
      <h2 className="mt-5 text-xl font-semibold text-slate-900">How can Gigora help?</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">Ask for help with proposals, profile improvements, gig ideas, or your freelance workflow.</p>
    </div>
  );
}
