import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import {
  FiArchive, FiBarChart2, FiClock, FiFileText, FiLogOut,
  FiMenu, FiSearch, FiShield, FiTrendingUp, FiUsers, FiX,
} from "react-icons/fi";
import ProfileAnalyzer from "./ProfileAnalyzer";
import GigSEO from "./GigSEO";
import ProposalGenerator from "./ProposalGenerator";
import Profile from "./Profile";
import History from "./History";
import Pricing from "./Pricing";
import { useAuth } from "../contexts/AuthContext";
import StatsCard from "../components/dashboard/StatsCard";
import { showError, showSuccess } from "../lib/toast";
import { getUserDisplayName } from "../lib/getCurrentUser";
import useHistory from "../hooks/useHistory";
import { getRemainingUses } from "../lib/usage";

const navItems = [
  { name: "Dashboard", icon: FiBarChart2, to: "/dashboard" },
  { name: "Profile Analyzer", icon: FiShield, to: "/dashboard/profile-analyzer" },
  { name: "Gig SEO", icon: FiTrendingUp, to: "/dashboard/gig-seo" },
  { name: "Proposal Generator", icon: FiFileText, to: "/dashboard/proposal-generator" },
  { name: "History", icon: FiArchive, to: "/dashboard/history" },
  { name: "Profile", icon: FiUsers, to: "/dashboard/profile" },
  { name: "Pricing", icon: FiFileText, to: "/dashboard/pricing" },
];

function DashboardOverview() {
  const { user } = useAuth();
  const { items, isLoading } = useHistory(user?.id);
  const greetingName = getUserDisplayName(user);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [uses, setUses] = useState(getRemainingUses);
  useEffect(() => { const update = () => setUses(getRemainingUses()); window.addEventListener("gigora-usage-change", update); return () => window.removeEventListener("gigora-usage-change", update); }, []);
  useEffect(() => { if (uses === 0) setShowUpgrade(true); }, [uses]);
  const counts = useMemo(() => ({ proposal: items.filter((item) => item.type === "proposal").length, gigseo: items.filter((item) => item.type === "gigseo").length, analysis: items.filter((item) => item.type === "analysis").length }), [items]);
  const recentItems = useMemo(() => [...items].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3), [items]);
  const quickActions = [
    { label: "Analyze Profile", to: "/dashboard/profile-analyzer", icon: FiShield, color: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700" },
    { label: "Optimize Gig", to: "/dashboard/gig-seo", icon: FiTrendingUp, color: "bg-emerald-50 hover:bg-emerald-100 text-emerald-700" },
    { label: "Write Proposal", to: "/dashboard/proposal-generator", icon: FiFileText, color: "bg-orange-50 hover:bg-orange-100 text-orange-700" },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Dashboard Overview</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              {`Good Morning, ${greetingName} 👋`}
            </h1>
            <p className="mt-4 leading-7 text-slate-600">Track your freelance growth, analyze profiles, optimize gigs and generate winning proposals — all from one workspace.</p>
          </div>
          <Link to="/dashboard/profile-analyzer" className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 font-semibold text-white transition hover:bg-slate-800">Get Started</Link>
        </div>
      </section>

      <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-900"><div className="flex flex-wrap items-center justify-between gap-3"><span><strong>{uses} of 5</strong> free uses remaining today</span>{uses === 0 && <button type="button" onClick={() => setShowUpgrade(true)} className="min-h-12 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white">Upgrade to Pro</button>}</div></section>
      <section className="grid gap-5 md:grid-cols-3">
        <StatsCard title="Total Proposals" value={isLoading ? "-" : counts.proposal} subtitle="Saved" icon={FiFileText} color="bg-orange-500" />
        <StatsCard title="Total SEO" value={isLoading ? "-" : counts.gigseo} subtitle="Saved" icon={FiTrendingUp} color="bg-emerald-600" />
        <StatsCard title="Profile Score" value={isLoading ? "-" : (counts.analysis ? Math.round(items.filter((item) => item.type === "analysis").reduce((total, item) => total + (item.overall_score || 0), 0) / counts.analysis) : 0)} subtitle="Average" icon={FiUsers} color="bg-indigo-600" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <h3 className="text-xl font-semibold">Quick Actions</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return <Link key={action.label} to={action.to} className={`flex items-center gap-3 rounded-xl p-4 text-sm font-medium transition ${action.color}`}><Icon className="h-5 w-5" />{action.label}</Link>;
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <h3 className="text-xl font-semibold">Recent History</h3>
          <div className="mt-5 space-y-3">
            {recentItems.length ? recentItems.map((item) => <div key={`${item.type}-${item.id}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"><div className="flex min-w-0 items-center gap-3"><FiClock className="h-5 w-5 shrink-0 text-indigo-600" /><div className="min-w-0"><p className="truncate font-medium text-slate-800">{item.title}</p><p className="truncate text-sm text-slate-500">{item.preview}</p></div></div><Link to="/dashboard/history" className="min-h-12 rounded-lg border px-3 py-2 text-sm">View</Link></div>) : <div className="py-8 text-center text-slate-500"><FiClock className="mx-auto h-9 w-9 text-slate-300" /><p className="mt-3 text-sm">No recent history yet.</p></div>}
          </div>
        </div>

      </section>
      {showUpgrade && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><h2 className="text-xl font-bold">Daily free limit reached</h2><p className="mt-2 text-slate-600">Upgrade to Pro for unlimited uses.</p><div className="mt-6 flex justify-end gap-3"><button onClick={() => setShowUpgrade(false)} className="rounded-lg px-4 py-2">Close</button><Link to="/dashboard/pricing" onClick={() => setShowUpgrade(false)} className="rounded-lg bg-indigo-600 px-4 py-2 text-white">View Pricing</Link></div></div></div>}
    </div>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const displayName = getUserDisplayName(user);
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("Logged out successfully.");
      navigate("/login");
    } catch { showError("Unable to log out right now."); }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="lg:flex lg:h-screen">
        <div className={`fixed inset-0 bg-black/50 transition lg:hidden ${sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setSidebarOpen(false)} />
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-slate-950 text-white transition duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex h-full flex-col p-6">
            <div className="mb-10 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold">G</div><div><p className="text-sm text-slate-400">Welcome to</p><h2 className="text-xl font-bold">Gigora</h2></div></div>
            <nav className="space-y-3">{navItems.map((item) => { const Icon = item.icon; return <NavLink key={item.name} to={item.to} end={item.to === "/dashboard"} onClick={() => setSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}><Icon className="h-5 w-5" />{item.name}</NavLink>; })}</nav>
            <div className="mt-auto"><button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"><FiLogOut className="h-5 w-5" />Logout</button></div>
          </div>
        </aside>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-100/90 backdrop-blur"><div className="flex flex-col gap-4 p-4 sm:px-6"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <FiX /> : <FiMenu />}</button><h2 className="text-xl font-semibold">Dashboard</h2></div><div className="flex items-center gap-3"><div className="hidden rounded-xl bg-white px-4 py-2 shadow md:block">{displayName}</div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 font-bold text-white">{avatarLetter}</div></div></div><div className="relative max-w-md"><FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search workspace..." className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></div></div></header>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6"><Routes><Route index element={<DashboardOverview />} /><Route path="profile-analyzer" element={<ProfileAnalyzer />} /><Route path="gig-seo" element={<GigSEO />} /><Route path="proposal-generator" element={<ProposalGenerator />} /><Route path="history" element={<History />} /><Route path="profile" element={<Profile />} /><Route path="pricing" element={<Pricing />} /><Route path="*" element={<Navigate to="/dashboard" replace />} /></Routes><footer className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500"><p>Gigora AI Workspace</p></footer></main>
        </div>
      </div>
    </div>
  );
}
