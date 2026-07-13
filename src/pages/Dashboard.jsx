import { useState } from 'react';
import { NavLink, Routes, Route, Navigate, Link } from 'react-router-dom';
import { FiMenu, FiX, FiSearch, FiShield, FiBarChart2, FiFileText, FiLogOut, FiTrendingUp } from 'react-icons/fi';
import ProfileAnalyzer from './ProfileAnalyzer';
import GigSEO from './GigSEO';
import ProposalGenerator from './ProposalGenerator';

const navItems = [
  { name: 'Dashboard', icon: FiBarChart2, to: '/dashboard' },
  { name: 'Profile Analyzer', icon: FiShield, to: '/dashboard/profile-analyzer' },
  { name: 'Gig SEO', icon: FiTrendingUp, to: '/dashboard/gig-seo' },
  { name: 'Proposal Generator', icon: FiFileText, to: '/dashboard/proposal-generator' },
];

const featureCards = [
  {
    title: 'Profile Analyzer',
    description: 'Review your profile strengths and improve your gig conversions with data-backed recommendations.',
    icon: FiShield,
    to: '/dashboard/profile-analyzer',
    action: 'Analyze profile',
  },
  {
    title: 'Gig SEO',
    description: 'Optimize your gig listings for search visibility and attract higher quality buyers on the platform.',
    icon: FiTrendingUp,
    to: '/dashboard/gig-seo',
    action: 'Generate suggestions',
  },
  {
    title: 'Proposal Generator',
    description: 'Create professional proposals quickly with templates tailored for freelance services.',
    icon: FiFileText,
    to: '/dashboard/proposal-generator',
    action: 'Write proposal',
  },
];

function DashboardOverview() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-md sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Dashboard overview</p>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Manage your freelance growth in one place</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Navigate profile insights, gig optimization, and winning proposal tools with a clean workflow.
            </p>
          </div>
          <div className="flex shrink-0">
            <Link
              to="/dashboard/profile-analyzer"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
              aria-label="Get started"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-5 shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{card.description}</p>
                </div>
              </div>
              <Link
                to={card.to}
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
                aria-label={`Go to ${card.title}`}
              >
                {card.action}
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="lg:flex lg:h-screen">
        <div
          className={`fixed inset-0 bg-slate-950/50 transition duration-300 lg:hidden ${
            sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-slate-950 text-slate-100 transition duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex h-full flex-col px-6 py-8">
            <div className="mb-10 flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-white">G</div>
              <div>
                <p className="text-sm text-slate-300">Welcome to</p>
                <h1 className="text-xl font-semibold text-white">Gigora</h1>
              </div>
            </div>

            <nav className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    end={item.to === '/dashboard'}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        isActive ? 'bg-white/10 text-white shadow-lg' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-auto pt-6">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10"
              >
                <FiLogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200/10 bg-slate-100/95 backdrop-blur-xl">
            <div className="flex flex-col gap-3 px-4 py-3 sm:px-6">
              <div className="flex w-full items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 lg:hidden"
                    onClick={() => setSidebarOpen((open) => !open)}
                    aria-expanded={sidebarOpen}
                    aria-label={sidebarOpen ? 'Close navigation panel' : 'Open navigation panel'}
                  >
                    {sidebarOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
                  </button>
                  <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 md:block">
                    Maheen
                  </div>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-white">M</div>
                </div>
              </div>

              <div className="w-full">
                <div className="relative w-full max-w-full md:max-w-[380px]">
                  <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search workspace"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    aria-label="Search workspace"
                  />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <Routes>
                <Route index element={<DashboardOverview />} />
                <Route path="profile-analyzer" element={<ProfileAnalyzer />} />
                <Route path="gig-seo" element={<GigSEO />} />
                <Route path="proposal-generator" element={<ProposalGenerator />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
