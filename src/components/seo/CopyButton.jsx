import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
        copied
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-900 text-white hover:bg-slate-800"
      }`}
    >
      {copied ? (
        <>
          <FiCheck />
          Copied
        </>
      ) : (
        <>
          <FiCopy />
          Copy
        </>
      )}
    </button>
  );
}