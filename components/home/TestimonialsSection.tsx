// ⚠️ ALL TESTIMONIALS BELOW ARE FICTIONAL — FOR DESIGN PURPOSES ONLY
// Remove before launch or replace with real user quotes

const testimonials = [
  {
    quote:
      "I've tried every learning app out there. infuseth.ink is the first one that actually fits into my commute without making my brain hurt.",
    name: 'Priya M.',
    role: 'Product designer, London',
    avatar: 'PM',
  },
  {
    quote:
      'I published my first micro-course on sourdough fermentation in a weekend. Three hundred steeps later, I still get messages about it.',
    name: 'Carlos R.',
    role: 'Hobby baker & weekend teacher',
    avatar: 'CR',
  },
  {
    quote:
      "The AI coach caught a gap in my understanding of async/await that I'd been papering over for two years. A bit embarrassing, but also kind of amazing.",
    name: 'Anika T.',
    role: 'Junior software engineer',
    avatar: 'AT',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#0d1f12] px-6 py-24">
      <div className="mx-auto max-inline-6xl">
        {/* Section label */}
        <p className="text-brand-gold/60 mbe-4 text-center text-xs font-bold tracking-[0.2em] uppercase">
          What learners say
        </p>
        <h2 className="font-display mbe-16 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Sipped by curious minds.
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map(({ quote, name, role, avatar }) => (
            <figure
              key={name}
              className="flex flex-col gap-6 rounded-2xl p-8"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(225,193,84,0.10)',
              }}
            >
              {/* Quote mark */}
              <span className="font-display text-brand-gold/30 text-5xl leading-none">&ldquo;</span>

              <blockquote className="flex-1 text-base/relaxed text-white/75">{quote}</blockquote>

              <figcaption className="flex items-center gap-3">
                {/* Avatar initials */}
                <div
                  className="flex shrink-0 items-center justify-center rounded-full text-sm font-bold text-[#1a2e20] block-10 inline-10"
                  style={{ backgroundColor: '#e1c154' }}
                >
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{name}</p>
                  <p className="text-xs text-white/50">{role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mbs-10 text-center text-xs text-white/25">
          ✦ Fictional testimonials — placeholder copy only, not real user reviews ✦
        </p>
      </div>
    </section>
  );
}
