import { HiChartBar, HiSearch, HiSparkles } from 'react-icons/hi';

const features = [
  {
    title: 'Profile Analyzer',
    description: 'Review your freelancer profile with AI suggestions that strengthen your positioning and awards.',
    icon: HiChartBar,
  },
  {
    title: 'Gig SEO',
    description: 'Optimize gig titles, descriptions, and keywords to rank higher and attract more relevant clients.',
    icon: HiSearch,
  },
  {
    title: 'Proposal Generator',
    description: 'Generate persuasive proposals tailored to each opportunity so you win more responses.',
    icon: HiSparkles,
  },
];

export default function SolutionSection() {
  return (
    <section className="mt-24" id="features">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1A56DB]">Solution</p>
        <h2 className="mt-4 text-3xl font-bold text-[#111827] sm:text-4xl">
          AI tools designed for freelance success
        </h2>
        <p className="mt-4 text-base leading-7 text-[#6B7280]">
          Gigora combines effortless automation with smart optimization so you can focus on delivering great work.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#EFF6FF] text-2xl text-[#1A56DB]">
                <Icon />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#1E3A5F]">{feature.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#6B7280]">{feature.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
