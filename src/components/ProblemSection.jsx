const problems = [
  {
    title: 'No Clients',
    description: 'Your profile is hidden, and the right clients cannot find your gigs online.',
  },
  {
    title: 'Gig not ranking',
    description: 'Your offers are lost in search results because the listing is not optimized for visibility.',
  },
  {
    title: 'Proposals rejected',
    description: 'Your applications miss the mark and fail to convince clients that you are the best choice.',
  },
];

export default function ProblemSection() {
  return (
    <section className="mt-24" id="pricing">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1A56DB]">Problem</p>
        <h2 className="mt-4 text-3xl font-bold text-[#111827] sm:text-4xl">
          The biggest challenges freelancers face
        </h2>
        <p className="mt-4 text-base leading-7 text-[#6B7280]">
          From low client visibility to rejected proposals, these common issues can keep freelance businesses from growing.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((card) => (
          <article
            key={card.title}
            className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-[#1E3A5F]">{card.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[#6B7280]">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
