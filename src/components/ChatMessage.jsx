import { FiCpu, FiUser } from "react-icons/fi";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <FiCpu className="h-5 w-5" />
        </div>
      )}

      <div className={`max-w-[85%] sm:max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm whitespace-pre-wrap ${isUser ? "rounded-tr-md bg-slate-900 text-white" : "rounded-tl-md border border-slate-200 bg-white text-slate-700"}`}>
          {message.text}
        </div>
        <p className="mt-1 px-1 text-xs text-slate-400">
          {new Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            minute: "2-digit",
          }).format(message.createdAt)}
        </p>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-600">
          <FiUser className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
