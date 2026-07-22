import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiCopy,
  FiFileText,
  FiMessageCircle,
  FiSearch,
  FiShield,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import { useAuth } from "../contexts/AuthContext";
import useHistory from "../hooks/useHistory";
import { showError, showSuccess } from "../lib/toast";

const PAGE_SIZE = 10;

const tabs = [
  { id: "all", label: "All" },
  { id: "proposal", label: "Proposals" },
  { id: "analysis", label: "Profile Analysis" },
  { id: "gigseo", label: "Gig SEO" },
  { id: "chat", label: "AI Chats" },
];

const typeDetails = {
  proposal: {
    icon: FiFileText,
    label: "Proposal",
    color: "bg-orange-100 text-orange-600",
  },

  analysis: {
    icon: FiShield,
    label: "Analysis",
    color: "bg-indigo-100 text-indigo-600",
  },

  gigseo: {
    icon: FiSearch,
    label: "Gig SEO",
    color: "bg-emerald-100 text-emerald-700",
  },

  chat: {
    icon: FiMessageCircle,
    label: "AI Chat",
    color: "bg-violet-100 text-violet-600",
  },
};

const formatDate = (value) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const getContent = (item) => {
  if (item.type === "proposal") {
    return item.proposal || "";
  }

  if (item.type === "analysis") {
    return JSON.stringify(item.analysis || {}, null, 2);
  }

  if (item.type === "gigseo") {
    return `
Optimized Title:
${item.optimized_title}

SEO Score:
${item.seo_score}

Keywords:
${Array.isArray(item.keywords) ? item.keywords.join(", ") : ""}

Suggestions:

${Array.isArray(item.suggestions)
  ? item.suggestions.join("\n")
  : ""}
`;
  }

  return item.response || "";
};

function HistorySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="h-5 w-1/3 rounded bg-slate-200" />
          <div className="mt-4 h-4 w-2/3 rounded bg-slate-100" />
          <div className="mt-3 h-4 w-1/2 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function History() {
  const { user } = useAuth();

  const {
    items,
    isLoading,
    error,
    refresh,
    removeItem,
  } = useHistory(user?.id);

  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return items
      .filter(
        (item) =>
          activeTab === "all" || item.type === activeTab
      )
      .filter(
        (item) =>
          !searchTerm ||
          `${item.title || ""} ${item.preview || ""} ${JSON.stringify(item)}`
            .toLowerCase()
            .includes(searchTerm)
      )
      .sort((a, b) =>
        sortOrder === "newest"
          ? new Date(b.created_at) - new Date(a.created_at)
          : new Date(a.created_at) - new Date(b.created_at)
      );
  }, [activeTab, items, query, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / PAGE_SIZE)
  );

  const visibleItems = filteredItems.slice(
    (Math.min(page, totalPages) - 1) * PAGE_SIZE,
    Math.min(page, totalPages) * PAGE_SIZE
  );

  function changeTab(tab) {
    setActiveTab(tab);
    setPage(1);
  }

  async function copyItem(item) {
    try {
      const content = getContent(item);

if (!content) {
  showError("Nothing to copy.");
  return;
}

await navigator.clipboard.writeText(content);
      showSuccess("Copied to clipboard.");
    } catch {
      showError("Unable to copy.");
    }
  }

  async function deleteItem(item) {
    if (
      !window.confirm(
        `Delete this ${(typeDetails[item.type]?.label || "item")}?`
      )
    ) {
      return;
    }

    try {
      await removeItem(item);
      setSelectedItem(null);
      setPage((currentPage) => Math.min(currentPage, Math.max(1, Math.ceil((filteredItems.length - 1) / PAGE_SIZE))));
      showSuccess("Deleted successfully.");
    } catch {
      showError("Unable to delete item.");
    }
  }
    return (
    <div className="mx-auto max-w-6xl space-y-6">

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">

        <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">
          Saved Workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          History
        </h1>

        <p className="mt-2 text-slate-600">
          Access every proposal, profile analysis, Gig SEO report and AI
          conversation you've saved.
        </p>

      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex flex-wrap gap-2">

            {tabs.map((tab) => (

              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition

                ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>

            ))}

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="relative">

              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search history..."
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 sm:w-72"
              />

            </div>

            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 px-4 py-2"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>

          </div>

        </div>

      </section>

      {isLoading ? (
        <HistorySkeleton />
      ) : error ? (

        <section className="rounded-3xl border border-red-100 bg-red-50 p-10 text-center">

          <FiAlertCircle className="mx-auto h-10 w-10 text-red-500" />

          <h2 className="mt-4 text-xl font-semibold text-red-700">
            Unable to load history
          </h2>

          <p className="mt-2 text-red-600">
            Please try again.
          </p>

          <button
            onClick={refresh}
            className="mt-6 rounded-xl bg-red-600 px-5 py-2 font-medium text-white"
          >
            Retry
          </button>

        </section>

      ) : visibleItems.length ? (

        <div className="space-y-4">

          {visibleItems.map((item) => {
            const details =
  typeDetails[item.type] || {
    icon: FiFileText,
    label: "History",
    color: "bg-slate-100 text-slate-600",
  };

const Icon = details.icon;

        

            return (

              <article
                key={`${item.type}-${item.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                <div className="flex flex-col gap-5 md:flex-row md:justify-between">

                  <div className="flex gap-4">

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${details.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        {details.label}
                      </p>

                      <h3 className="mt-1 font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                        {(item.preview || "").slice(0, 100)}
                      </p>

                      <p className="mt-3 text-xs text-slate-400">
                        {item.created_at
  ? formatDate(item.created_at)
  : "Unknown date"}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-2 self-start">

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
                    >
                      View
                    </button>

                    <button
                      onClick={() => copyItem(item)}
                      className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50"
                    >
                      <FiCopy />
                    </button>

                    <button
                      onClick={() => deleteItem(item)}
                      className="rounded-xl border border-red-100 p-2 text-red-600 hover:bg-red-50"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </div>

              </article>

            );

          })}

        </div>

      ) : (

        <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center">

          <FiFileText className="mx-auto h-14 w-14 text-slate-300" />

          <h2 className="mt-5 text-2xl font-semibold">
            Nothing Saved Yet
          </h2>

          <p className="mt-3 text-slate-500">
            Your saved proposals, Gig SEO reports, profile analyses and AI chats
            will appear here.
          </p>
          <Link to="/dashboard/proposal-generator" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Start Generating</Link>

        </section>

      )}

      {filteredItems.length > PAGE_SIZE && (

        <div className="flex items-center justify-center gap-4">

          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-xl border border-slate-200 p-2 disabled:opacity-40"
          >
            <FiChevronLeft />
          </button>

          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-xl border border-slate-200 p-2 disabled:opacity-40"
          >
            <FiChevronRight />
          </button>

        </div>

      )}
            {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
          >
            <div className="mb-6 flex items-start justify-between">

              <div>

                <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">
                  {typeDetails[selectedItem.type].label}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {selectedItem.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {formatDate(selectedItem.created_at)}
                </p>

              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-xl p-2 hover:bg-slate-100"
              >
                <FiX className="text-xl" />
              </button>

            </div>

            <button onClick={() => copyItem(selectedItem)} className="mb-5 inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"><FiCopy />Copy</button>

            {/* Proposal */}

            {selectedItem?.type === "proposal" && (
              <div className="rounded-2xl bg-slate-50 p-6">
                <pre className="whitespace-pre-wrap font-sans leading-7 text-slate-700">
                  {selectedItem.proposal || "No proposal found."}
                </pre>
              </div>
            )}

            {/* Profile Analysis */}

            {selectedItem.type === "analysis" && (
              <div className="space-y-6">

                <div className="rounded-2xl border border-slate-200 p-5">

                  <h3 className="font-semibold">
                    Overall Score
                  </h3>

                  <p className="mt-2 text-3xl font-bold text-indigo-600">
                    {selectedItem.overall_score ?? 0}/100
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-6">

                  <pre className="whitespace-pre-wrap text-sm leading-7">
                    {JSON.stringify(
                      selectedItem.analysis,
                      null,
                      2
                    )}
                  </pre>

                </div>

              </div>
            )}

            {/* Gig SEO */}

            {selectedItem.type === "gigseo" && (
              <div className="space-y-6">

                <div className="grid gap-5 md:grid-cols-2">

                  <div className="rounded-2xl border p-5">

                    <p className="text-sm text-slate-500">
                      SEO Score
                    </p>

                    <h3 className="mt-2 text-4xl font-bold text-emerald-600">
                      {selectedItem.seo_score ?? 0}
                    </h3>

                  </div>

                  <div className="rounded-2xl border p-5">

                    <p className="text-sm text-slate-500">
                      Optimized Title
                    </p>

                    <h3 className="mt-2 font-semibold">
                      {selectedItem.optimized_title || "No title"}
                    </h3>

                  </div>

                </div>

                <div className="rounded-2xl border p-5">

                  <h3 className="font-semibold">
                    Keywords
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {(selectedItem.keywords || []).map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
                      >
                        {keyword}
                      </span>
                    ))}

                  </div>

                </div>

                <div className="rounded-2xl border p-5">

                  <h3 className="font-semibold">
                    Suggestions
                  </h3>

                  <ul className="mt-4 list-disc space-y-2 pl-5">

                    {(selectedItem.suggestions || []).map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )}

                  </ul>

                </div>

              </div>
            )}

            {/* AI Chat */}

            {selectedItem.type === "chat" && (
              <div className="space-y-6">

                <div className="rounded-2xl border p-5">

                  <h3 className="font-semibold">
                    Prompt
                  </h3>

                  <p className="mt-3 whitespace-pre-wrap">
                    {selectedItem.prompt}
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-6">

                  <h3 className="mb-4 font-semibold">
                    AI Response
                  </h3>

                  <pre className="whitespace-pre-wrap font-sans leading-7">
                    {selectedItem.response}
                  </pre>

                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
