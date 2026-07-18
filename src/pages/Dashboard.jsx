import { useState } from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FiMenu,
  FiX,
  FiSearch,
  FiShield,
  FiBarChart2,
  FiFileText,
  FiLogOut,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";

import ProfileAnalyzer from "./ProfileAnalyzer";
import GigSEO from "./GigSEO";
import ProposalGenerator from "./ProposalGenerator";
import { useAuth } from "../contexts/AuthContext";
import StatsCard from "../components/dashboard/StatsCard";

const navItems = [
  {
    name: "Dashboard",
    icon: FiBarChart2,
    to: "/dashboard",
  },
  {
    name: "Profile Analyzer",
    icon: FiShield,
    to: "/dashboard/profile-analyzer",
  },
  {
    name: "Gig SEO",
    icon: FiTrendingUp,
    to: "/dashboard/gig-seo",
  },
  {
    name: "Proposal Generator",
    icon: FiFileText,
    to: "/dashboard/proposal-generator",
  },
];

const featureCards = [
  {
    title: "Profile Analyzer",
    description:
      "Review your profile strengths and improve your gig conversions with AI-backed recommendations.",
    icon: FiShield,
    to: "/dashboard/profile-analyzer",
    action: "Analyze Profile",
  },
  {
    title: "Gig SEO",
    description:
      "Optimize your Fiverr and Upwork gigs using keyword recommendations.",
    icon: FiTrendingUp,
    to: "/dashboard/gig-seo",
    action: "Optimize Gig",
  },
  {
    title: "Proposal Generator",
    description:
      "Generate professional proposals tailored to each client's project.",
    icon: FiFileText,
    to: "/dashboard/proposal-generator",
    action: "Generate Proposal",
  },
];

const recentActivities = [
  {
    title: "Profile analyzed",
    time: "2 minutes ago",
  },
  {
    title: "Proposal generated",
    time: "15 minutes ago",
  },
  {
    title: "Gig SEO optimized",
    time: "1 hour ago",
  },
  {
    title: "Logged into dashboard",
    time: "Today",
  },
];

function DashboardOverview() {
  return (
    <div className="space-y-8">

      {/* Hero */}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-md">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="max-w-2xl">

            <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">
              Dashboard Overview
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Welcome back 👋
            </h1>

            <p className="mt-4 text-slate-600 leading-7">
              Track your freelance growth, analyze profiles,
              optimize gigs and generate winning proposals —
              all from one workspace.
            </p>

          </div>

          <Link
            to="/dashboard/profile-analyzer"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 font-semibold text-white transition hover:bg-slate-800"
          >
            Get Started
          </Link>

        </div>

      </section>

      {/* Stats */}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Profiles Analyzed"
          value="24"
          subtitle="This week"
          icon={FiUsers}
          color="bg-indigo-600"
        />

        <StatsCard
          title="SEO Optimizations"
          value="18"
          subtitle="Completed"
          icon={FiTrendingUp}
          color="bg-emerald-600"
        />

        <StatsCard
          title="Proposals"
          value="42"
          subtitle="Generated"
          icon={FiFileText}
          color="bg-orange-500"
        />

        <StatsCard
          title="Success Rate"
          value="94%"
          subtitle="AI Score"
          icon={FiCheckCircle}
          color="bg-cyan-600"
        />

      </section>

      {/* Feature Cards */}

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {featureCards.map((card) => {

          const Icon = card.icon;

          return (

            <article
              key={card.title}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition"
            >

              <div>

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">

                  <Icon className="h-6 w-6" />

                </div>

                <h3 className="text-xl font-semibold text-slate-900">

                  {card.title}

                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">

                  {card.description}

                </p>

              </div>

              <Link
                to={card.to}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                {card.action}
              </Link>

            </article>

          );

        })}

      </section>

      {/* Bottom Section */}

      <section className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">

          <h3 className="text-xl font-semibold">
            Quick Actions
          </h3>

          <div className="mt-5 space-y-3">

            <Link
              to="/dashboard/profile-analyzer"
              className="block rounded-xl bg-indigo-50 p-4 hover:bg-indigo-100"
            >
              Analyze Profile
            </Link>

            <Link
              to="/dashboard/gig-seo"
              className="block rounded-xl bg-emerald-50 p-4 hover:bg-emerald-100"
            >
              Optimize Gig
            </Link>

            <Link
              to="/dashboard/proposal-generator"
              className="block rounded-xl bg-orange-50 p-4 hover:bg-orange-100"
            >
              Generate Proposal
            </Link>

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">

          <h3 className="text-xl font-semibold">
            Recent Activity
          </h3>

          <div className="mt-5 space-y-4">

            {recentActivities.map((item) => (

              <div key={item.title}>

                <p className="font-medium text-slate-800">

                  {item.title}

                </p>

                <p className="text-sm text-slate-500">

                  {item.time}

                </p>

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white">

          <p className="uppercase tracking-[0.3em] text-xs">
            AI TIP
          </p>

          <h3 className="mt-4 text-2xl font-bold">

            Today's Recommendation

          </h3>

          <p className="mt-4 leading-7 text-indigo-100">

            Personalized proposals receive significantly higher
            response rates. Mention one measurable achievement
            whenever possible.

          </p>

        </div>

      </section>

    </div>
  );
}
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      <div className="lg:flex lg:h-screen">

        {/* Mobile Overlay */}

        <div
          className={`fixed inset-0 bg-black/50 transition lg:hidden ${
            sidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}

        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-slate-950 text-white transition duration-300 lg:relative lg:translate-x-0 ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex h-full flex-col p-6">

            <div className="mb-10">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold">

                  G

                </div>

                <div>

                  <p className="text-sm text-slate-400">

                    Welcome to

                  </p>

                  <h2 className="text-xl font-bold">

                    Gigora

                  </h2>

                </div>

              </div>

            </div>

            <nav className="space-y-3">

              {navItems.map((item) => {

                const Icon = item.icon;

                return (

                  <NavLink
                    key={item.name}
                    to={item.to}
                    end={item.to === "/dashboard"}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >

                    <Icon className="h-5 w-5" />

                    {item.name}

                  </NavLink>

                );

              })}

            </nav>

            <div className="mt-auto">

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >

                <FiLogOut className="h-5 w-5" />

                Logout

              </button>

            </div>

          </div>

        </aside>

        {/* Main */}

        <div className="flex flex-1 flex-col">

          {/* Header */}

          <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-100/90 backdrop-blur">

            <div className="flex flex-col gap-4 p-4 sm:px-6">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <button
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow lg:hidden"
                    onClick={() =>
                      setSidebarOpen(!sidebarOpen)
                    }
                  >

                    {sidebarOpen ? (
                      <FiX />
                    ) : (
                      <FiMenu />
                    )}

                  </button>

                  <h2 className="text-xl font-semibold">

                    Dashboard

                  </h2>

                </div>

                <div className="flex items-center gap-3">

                  <div className="hidden rounded-xl bg-white px-4 py-2 shadow md:block">

                    {displayName}

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 font-bold text-white">

                    {avatarLetter}

                  </div>

                </div>

              </div>

              <div className="relative max-w-md">

                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search workspace..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

            </div>

          </header>

          {/* Content */}

          <main className="flex-1 overflow-y-auto p-6">

            <Routes>

              <Route
                index
                element={<DashboardOverview />}
              />

              <Route
                path="profile-analyzer"
                element={<ProfileAnalyzer />}
              />

              <Route
                path="gig-seo"
                element={<GigSEO />}
              />

              <Route
                path="proposal-generator"
                element={<ProposalGenerator />}
              />

              <Route
                path="*"
                element={
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                }
              />

            </Routes>

            <footer className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">

              <p>

                Gigora AI Workspace

              </p>

              <p className="mt-2">

                Built with React • Tailwind CSS • Supabase • Gemini AI

              </p>

            </footer>

          </main>

        </div>

      </div>

    </div>
  );
}