// Hierarchy: Course → Chapters → Microlessons
const CHAPTERS = [
  {
    title: 'Coding Fundamentals',
    lessons: ['First Python Program', 'Variables & types', 'Functions & scope', 'Control flow'],
    more: 24,
  },
  {
    title: 'OOP & OOAD',
    lessons: [
      'Classes & instances',
      'Inheritance and polymorphism',
      'Design principles',
      'UML basics',
    ],
    more: 31,
  },
  {
    title: 'Data Structures',
    lessons: ['Lists, tuples & sets', 'Stacks and queues', 'Dicts & hash maps', 'Trees & graphs'],
    more: 38,
  },
  {
    title: 'Design Patterns',
    lessons: [
      'Review of SOLID principles',
      'Strategy pattern',
      'Observer pattern',
      'Factory pattern',
    ],
    more: 27,
  },
];

export default function FeaturedCourseSection() {
  return (
    <section className="bg-brand-parchment px-6 py-4">
      <div className="mx-auto max-inline-6xl">
        <p className="text-brand-green mbe-4 text-center text-xs font-bold tracking-[0.2em] uppercase opacity-70">
          Featured course series
        </p>
        <h2 className="font-display text-foreground mbe-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Software Engineering with Python
        </h2>
        <p className="text-muted-foreground mx-auto mbe-16 text-center text-base/relaxed max-inline-xl">
          One language. No context switching. Go from writing your first function to shipping a real
          API — three minutes at a time. A web detour in JS/TS for web development, then back to
          Python for everything else.
        </p>

        {/* Course card */}
        <div
          className="overflow-hidden rounded-3xl"
          style={{
            border: '1px solid var(--border)',
            backgroundColor: 'var(--card)',
          }}
        >
          {/* Top accent */}
          <div
            className="block-1 inline-full"
            style={{
              background: 'linear-gradient(to right, var(--brand-green), var(--brand-gold))',
            }}
          />

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            {/* Left: meta */}
            <div className="flex flex-col justify-center gap-6 p-10 lg:p-14">
              <div className="flex flex-wrap gap-2">
                {['Python', 'Backend', 'Fullstack', 'Beginner-friendly'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: 'rgba(71,144,95,0.10)',
                      color: 'var(--brand-green-dark)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground text-sm/relaxed">
                Designed for people who want to master one tool deeply rather than juggling a dozen.
                Every concept is a teabag — steep it, absorb it, move on. No Java. No C++. No rabbit
                holes.
              </p>
              <p className="text-muted-foreground text-sm/relaxed">
                The first half of the course focuses core software engineering concepts, while the
                second half is fullstack software engineering. At the end of the series, you&apos;ll
                work on a capstone project of your choice — a web app, a game, a data analysis
                script, or anything else you can dream of.
              </p>

              <div className="text-muted-foreground flex items-center gap-6 text-sm">
                <span>
                  <strong className="text-foreground">48</strong> chapters
                </span>
                <span>
                  <strong className="text-foreground">500+</strong> lessons
                </span>
                <span>
                  <strong className="text-foreground">Free</strong> to start
                </span>
              </div>

              <div className="flex gap-3 pbs-2">
                <button
                  className="rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:brightness-90"
                  style={{ backgroundColor: '#e1c154', color: '#1a2e20' }}
                >
                  Start brewing →
                </button>
                <button
                  className="rounded-full border px-6 py-2.5 text-sm font-semibold transition-all hover:bg-black/5"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  Preview lessons
                </button>
              </div>
            </div>

            {/* Right: chapter → lesson hierarchy */}
            <div className="p-10 lg:p-14" style={{ borderLeft: '1px solid var(--border)' }}>
              <p className="text-muted-foreground mbe-5 text-xs font-bold tracking-widest uppercase">
                Series outline
              </p>
              <ol className="grid grid-cols-2 gap-6">
                {CHAPTERS.map(({ title, lessons, more }, ci) => (
                  <li key={title}>
                    <p className="text-foreground mbe-2 flex items-center gap-2 text-sm font-semibold">
                      <span
                        className="flex shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white block-5 inline-5"
                        style={{ backgroundColor: 'var(--brand-green)' }}
                      >
                        {ci + 1}
                      </span>
                      {title}
                    </p>
                    <ul className="ms-7 flex flex-col gap-1">
                      {lessons.map((lesson) => (
                        <li
                          key={lesson}
                          className="text-muted-foreground flex items-center gap-1.5 text-xs"
                        >
                          <span className="bg-brand-gold/50 shrink-0 rounded-full block-1 inline-1" />
                          {lesson}
                        </li>
                      ))}
                      <li className="text-muted-foreground/50 ms-2.5 mbs-0.5 text-xs">
                        +{more} more lessons
                      </li>
                    </ul>
                  </li>
                ))}
              </ol>
              <p className="text-muted-foreground mbs-6 text-xs">+ 44 more chapters</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
