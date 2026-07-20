import { useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Gigora anything about freelancing..."
          rows={1}
          disabled={disabled}
          className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
          aria-label="Chat message"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <FiSend className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-slate-400">Enter to send · Shift + Enter for a new line</p>
    </div>
  );
}
