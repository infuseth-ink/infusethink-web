import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-130 items-center overflow-hidden"
      style={{ backgroundColor: '#0d1f12' }}
    >
      {/* ── Background gradient mesh ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gold orb — upper right */}
        <div
          className="absolute -top-24 -right-24 h-150 w-150 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(225,193,84,0.48) 0%, rgba(201,168,61,0.22) 40%, rgba(71,144,95,0.08) 65%, transparent 75%)',
          }}
        />
        {/* Deep green bloom — lower left */}
        <div
          className="absolute -bottom-48 -left-48 h-140 w-140 rounded-full blur-3xl"
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
      <div className="pointer-events-none absolute top-1/2 right-0 z-10 hidden h-150 w-150 -translate-y-2/5 md:block">
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

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="flex max-w-xl flex-col gap-7 lg:max-w-2xl">
          <h1 className="font-display text-3xl leading-[1.1] font-black whitespace-nowrap text-white sm:text-4xl lg:text-5xl">
            Infuse thoughts, <span className="text-brand-gold">ink futures.</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-white/70 sm:text-xl">
            Learn anything in 3-minute microlessons that accumulate into real skills over time. Sip
            your first cup — or share your brew with the world.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              size="lg"
              className="h-auto rounded-full px-8 py-3 text-base font-bold shadow-lg shadow-black/20 transition-all hover:scale-[1.03] hover:brightness-90"
              style={{ backgroundColor: '#e1c154', color: '#1a2e20' }}
            >
              Start Learning
            </Button>
            <Button
              size="lg"
              className="h-auto rounded-full px-8 py-3 text-base font-semibold backdrop-blur-sm transition-all hover:scale-[1.03] hover:brightness-110"
              style={{
                border: '1px solid rgba(255,255,255,0.35)',
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.08)',
              }}
            >
              Start Teaching
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
