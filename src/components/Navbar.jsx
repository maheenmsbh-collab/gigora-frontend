import { useState } from 'react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Login', href: '#login' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <a href="#top" className="text-2xl font-semibold tracking-[0.22em] text-[#1A56DB]">
          GIGORA
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#1E3A5F] md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors duration-200 hover:text-[#1A56DB]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#1E3A5F] transition-colors duration-200 hover:text-[#1A56DB]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            className="rounded-full bg-[#1A56DB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1639b0]"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((state) => !state)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-[#1E3A5F] transition hover:border-[#1A56DB] hover:text-[#1A56DB] md:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-2xl">{open ? '×' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium text-[#1E3A5F]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-2xl px-4 py-3 transition-colors duration-200 hover:bg-[#EFF6FF] hover:text-[#1A56DB]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="rounded-full bg-[#1A56DB] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#1639b0]"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
