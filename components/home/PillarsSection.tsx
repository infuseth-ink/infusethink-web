import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Pillar {
  imageSrc: string;
  imageAlt: string;
  tagline: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    imageSrc: '/images/pillar-1.png',
    imageAlt: 'A teabag steeping in a cup',
    tagline: 'Teabag-sized lessons',
    description:
      'Each lesson takes 3 minutes or less to read or watch. No fluff, no filler, no information overload. Just the right-size to be absorbed.',
  },
  {
    imageSrc: '/images/pillar-2.png',
    imageAlt: 'A tree of teacups representing skill progression',
    tagline: 'Boost with every cup',
    description:
      "Each lesson unlocks the next. Keep going and you'll reach Zen — real, working expertise in whatever you choose to master.",
  },
  {
    imageSrc: '/images/pillar-3.png',
    imageAlt: 'A friendly character pouring tea with an AI sparkle',
    tagline: 'Never brew or sip alone',
    description:
      'Your agentic assistant is always ready to help — absorb a lesson, ask pertinent questions, get quizzed, or accelerate brewing of your own lessons.',
  },
];

export default function PillarsSection() {
  return (
    <section className="bg-brand-parchment flex-1 px-6 py-24">
      <div className="mx-auto max-inline-6xl">
        <p className="text-brand-green mbe-4 text-center text-lg font-bold tracking-[0.2em] uppercase opacity-70">
          Three pillars
        </p>
        <h2 className="font-display text-foreground mbe-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          We want your learning to be simple, effective, healthy, and fun — like sipping a perfect
          cup of tea.
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map(({ imageSrc, imageAlt, tagline, description }) => (
            <Card
              key={tagline}
              className="group border-border bg-card relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="bg-brand-green group-hover:bg-brand-gold transition-colors duration-300 block-1 inline-full" />

              <CardHeader className="p-0">
                {/* Image slot — place generated PNG at /public{imageSrc} */}
                <div className="from-brand-green/10 to-brand-gold/15 relative mbe-6 aspect-square overflow-hidden bg-linear-to-br inline-full">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardTitle className="font-display text-foreground px-8 pbe-2 text-center text-xl/snug font-bold tracking-tight">
                  {tagline}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-8 pbs-2 pbe-8">
                <CardDescription className="text-muted-foreground text-center text-base/relaxed">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
