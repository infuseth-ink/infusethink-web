import Image from 'next/image';
import { Button } from '@infuseth-ink/shared-ui';

/* HERO
   Changes from previous version (design_handoff_v1_polish):
   - h1 dropped from font-black (Fraunces 900) to font-bold (700). Both
     surfaces are now using Fraunces' opsz axis (see app/layout.tsx),
     so the same family auto-tunes for display sizes — Black weight is
     overkill and reads aggressive against the gentle tea metaphor.
   - Subhead trimmed: the second sentence ("Sip your first cup — or
     share your brew with the world") used two metaphor verbs in one
     breath. The CTA pair (Start learning / Start teaching) already
     does the audience pivot more clearly. Subhead is now one tight
     value-prop sentence.
   - CTA labels switched to sentence case ("Start learning" /
     "Start teaching") to match the rest of the site's casing rule.
   - Buttons swapped to the new `marketing` and `glass` variants so the
     gold CTA carries a proper surface-adaptive shadow and the glass
     CTA actually reads as actionable.
*/
export default function HeroSection() {
  return (
    <section
      className="min-block-130 relative flex items-center overflow-hidden"
      style={{ backgroundColor: '#0d1f12' }}
    >
      {/* ── Background gradient mesh ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gold orb — upper right */}
        <div
          className="-inset-e-24 -inset-bs-24 block-150 inline-150 absolute rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(225,193,84,0.48) 0%, rgba(201,168,61,0.22) 40%, rgba(71,144,95,0.08) 65%, transparent 75%)',
          }}
        />
        {/* Deep green bloom — lower left */}
        <div
          className="-inset-s-48 -inset-be-48 block-140 inline-140 absolute rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(47,99,65,0.75) 0%, transparent 65%)',
          }}
        />
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #e1c154 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 130% 130% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>

      {/* ── Hero illustration — desktop only ── */}
      <div className="inset-e-0 inset-bs-1/2 -translate-y-2/5 block-150 inline-150 pointer-events-none absolute z-10 hidden md:block">
        <Image
          src="/images/hero-2.png"
          alt="A visual metaphor for learning — leaves, books, light"
          fill
          sizes="600px"
          className="object-contain"
          style={{ mixBlendMode: 'screen' }}
          priority
        />
      </div>

      <div className="pbs-28 pbe-20 inline-full max-inline-6xl lg:pbs-36 lg:pbe-28 relative z-10 mx-auto px-6">
        <div className="max-inline-xl lg:max-inline-2xl flex flex-col gap-7">
          <h1 className="font-display whitespace-nowrap text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            Infuse thoughts, <span className="text-brand-gold">ink futures.</span>
          </h1>

          <p className="max-inline-lg text-lg/relaxed text-white/70 sm:text-xl">
            Learn anything in 3-minute microlessons that accumulate into real skills over time.
          </p>

          <div className="pbs-2 flex flex-wrap gap-4">
            <Button variant="marketing" size="xl" shape="pill">
              Start learning{' '}
              <span data-arrow aria-hidden>
                →
              </span>
            </Button>
            <Button variant="glass" size="xl" shape="pill">
              Start teaching
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
