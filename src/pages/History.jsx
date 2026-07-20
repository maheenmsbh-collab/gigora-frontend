import { useMemo, useState } from "react";
import { FiAlertCircle, FiChevronLeft, FiChevronRight, FiCopy, FiFileText, FiMessageCircle, FiSearch, FiShield, FiTrash2, FiX } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import useHistory from "../hooks/useHistory";
import { showError, showSuccess } from "../lib/toast";

const PAGE_SIZE = 10;
const tabs = [
  { id: "all", label: "All" },
  { id: "proposal", label: "Proposals" },
  { id: "analysis", label: "Profile Analysis" },
  { id: "chat", label: "AI Chats" },
];

const typeDetails = {
  proposal: { icon: FiFileText, label: "Proposal", color: "bg-orange-100 text-orange-600" },
  analysis: { icon: FiShield, label: "Analysis", color: "bg-indigo-100 text-indigo-600" },
  chat: { icon: FiMessageCircle, label: "AI Chat", color: "bg-violet-100 text-violet-600" },
};

const formatDate = (value) => new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
const getContent = (item) => item.type === "proposal" ? item.proposal : item.type === "analysis" ? JSON.stringify(item.analysis, null, 2) : item.response;

function HistorySkeleton() {
  return <div className="space-y-4">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"><div className="h-5 w-1/3 rounded bg-slate-200" /><div className="mt-4 h-4 w-2/3 rounded bg-slate-100" /><div className="mt-3 h-4 w-1/2 rounded bg-slate-100" /></div>)}</div>;
}

export default function History() {
  const { user } = useAuth();
  const { items, isLoading, error, refresh, removeItem } = useHistory(user?.id);
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    return items
      .filter((item) => activeTab === "all" || item.type === activeTab)
      .filter((item) => !searchTerm || `${item.title} ${item.preview}`.toLowerCase().includes(searchTerm))
      .sort((first, second) => sortOrder === "newest" ? new Date(second.created_at) - new Date(first.created_at) : new Date(first.created_at) - new Date(second.created_at));
  }, [activeTab, items, query, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const visibleItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeTab = (tab) => { setActiveTab(tab); setPage(1); };
  const copyItem = async (item) => {
    try { await navigator.clipboard.writeText(getContent(item)); showSuccess("Copied to clipboard."); }
    catch { showError("Unable to copy this item."); }
  };
  const deleteItem = async (item) => {
    if (!window.confirm(`Delete this ${typeDetails[item.type].label.toLowerCase()}? This cannot be undone.`)) return;
    try { await removeItem(item); setSelectedItem(null); showSuccess("History item deleted."); }
    catch { showError("Unable to delete this item."); }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8"><p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Saved Data</p><h1 className="mt-2 text-3xl font-bold text-slate-900">History</h1><p className="mt-2 text-slate-600">Review your saved proposals, profile analyses, and AI conversations.</p></section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">{tabs.map((tab) => <button key={tab.id} type="button" onClick={() => changeTab(tab.id)} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${activeTab === tab.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{tab.label}</button>)}</div>
          <div className="flex flex-col gap-3 sm:flex-row"><div className="relative"><FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search saved history..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 sm:w-64" /></div><select value={sortOrder} onChange={(event) => { setSortOrder(event.target.value); setPage(1); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500"><option value="newest">Newest</option><option value="oldest">Oldest</option></select></div>
        </div>
      </section>

      {isLoading ? <HistorySkeleton /> : error ? <section className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center"><FiAlertCircle className="mx-auto h-9 w-9 text-red-500" /><h2 className="mt-3 font-semibold text-red-900">Unable to load saved history</h2><p className="mt-2 text-sm text-red-700">Please check your connection and try again.</p><button onClick={refresh} className="mt-5 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white">Try Again</button></section> : visibleItems.length ? <div className="space-y-4">{visibleItems.map((item) => { const details = typeDetails[item.type]; const Icon = details.icon; return <article key={`${item.type}-${item.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div className="flex min-w-0 gap-3"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${details.color}`}><Icon className="h-5 w-5" /></div><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{details.label}</p><h2 className="mt-1 truncate font-semibold text-slate-900">{item.title}</h2><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.preview}</p><p className="mt-2 text-xs text-slate-400">{formatDate(item.created_at)}</p></div></div><div className="flex shrink-0 gap-2"><button type="button" onClick={() => setSelectedItem(item)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">View</button><button type="button" onClick={() => copyItem(item)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" aria-label="Copy"><FiCopy /></button><button type="button" onClick={() => deleteItem(item)} className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50" aria-label="Delete"><FiTrash2 /></button></div></div></article>; })}</div> : <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><FiFileText className="mx-auto h-12 w-12 text-slate-300" /><h2 className="mt-4 text-xl font-semibold text-slate-800">No saved history yet.</h2><p className="mt-2 text-sm text-slate-500">Generated proposals, analyses, and AI chats will appear here.</p></section>}

      {filteredItems.length > PAGE_SIZE && <div className="flex items-center justify-center gap-4"><button disabled={page === 1} onClick={() => setPage((currentPage) => currentPage - 1)} className="rounded-xl border border-slate-200 p-2 disabled:opacity-40"><FiChevronLeft /></button><span className="text-sm text-slate-600">Page {page} of {totalPages}</span><button disabled={page === totalPages} onClick={() => setPage((currentPage) => currentPage + 1)} className="rounded-xl border border-slate-200 p-2 disabled:opacity-40"><FiChevronRight /></button></div>}

      {selectedItem && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onMouseDown={() => setSelectedItem(null)}><section className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl" onMouseDown={(event) => event.stopPropagation()}><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-indigo-600">{typeDetails[selectedItem.type].label}</p><h2 className="mt-1 text-xl font-semibold text-slate-900">{selectedItem.title}</h2></div><button onClick={() => setSelectedItem(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><FiX /></button></div><pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{getContent(selectedItem)}</pre></section></div>}
    </div>
  );
}
