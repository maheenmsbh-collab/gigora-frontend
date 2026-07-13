export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-[#1E3A5F]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="text-2xl font-semibold tracking-[0.22em] text-[#1A56DB]">GIGORA</p>
          <p className="max-w-md text-sm leading-6 text-[#6B7280]">
            A modern AI landing page for freelancers who want higher conversion and smarter client wins.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
          <a href="#features" className="transition hover:text-[#1A56DB]">
            Features
          </a>
          <a href="#pricing" className="transition hover:text-[#1A56DB]">
            Pricing
          </a>
          <a href="#login" className="transition hover:text-[#1A56DB]">
            Login
          </a>
        </div>
      </div>

      <div className="border-t border-slate-200/80 bg-[#F8FAFF] py-4 text-center text-sm text-[#6B7280]">
        © Mufsa Developers 2026
      </div>
    </footer>
  );
}
