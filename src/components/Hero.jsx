export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 lg:pt-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 sm:px-8 lg:px-10 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-[#EFF6FF] px-4 py-1 text-sm font-semibold uppercase tracking-[0.35em] text-[#1A56DB]">
            AI-powered freelance growth
          </span>
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
            Win Every Gig with AI
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#6B7280]">
            Gigora helps freelancers win more clients using smart AI tools that optimize profiles, rank gigs, and improve proposal success.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#pricing"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#1A56DB] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#1639b0] sm:w-auto"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#1A56DB] bg-white px-8 py-4 text-base font-semibold text-[#1A56DB] transition hover:bg-[#EFF6FF] sm:w-auto"
            >
              Watch Demo
            </a>
          </div>
        </div>

        <div className="relative w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(26,86,219,0.12)] sm:p-10">
          <div className="absolute -right-10 top-8 h-24 w-24 rounded-full bg-[#EFF6FF] blur-2xl" />
          <div className="space-y-8">
            <div className="space-y-4 rounded-[1.5rem] bg-[#EFF6FF] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1A56DB]">Client win rate</p>
              <h2 className="text-3xl font-bold text-[#111827]">Boost your proposal success</h2>
              <p className="text-sm leading-6 text-[#6B7280]">
                Analyze your profile and tailor your applications so more clients say yes to your gigs.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-sm font-semibold text-[#1E3A5F]">AI Profile Scan</p>
                <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                  Get instant feedback on your freelancer profile and recommendations that win attention.
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-sm font-semibold text-[#1E3A5F]">Fast Gig Insights</p>
                <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                  See where your gigs fall short and discover the quick updates that improve visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
