import Image from "next/image";
import Reveal from "./Reveal";
import { site, waLink } from "@/lib/site";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/hero.webp"
        alt="Interior rumah mewah dengan furniture custom oleh IconSpirit — kontraktor interior Surabaya"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Warm gradient scrim for text legibility */}
      <div className="absolute inset-0 bg-linear-to-r from-ink/85 via-ink/60 to-ink/25" />
      {/* Soft vignette for depth — barely-there darkening at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(28,24,21,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(144,96,63,0.25),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl py-32 text-white">
          <Reveal as="p" className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-white/80">
            Interior Contractor · Est. {site.established}
          </Reveal>

          <Reveal as="h1" delay={100} className="font-display text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
            Icon<span className="italic text-sand">Spirit</span>
            <span className="mt-1 block text-3xl font-normal tracking-wide text-white/85 sm:text-4xl lg:text-5xl">
              Indonesia
            </span>
          </Reveal>

          <Reveal
            as="p"
            delay={220}
            className="mt-6 max-w-xl font-display text-xl italic text-sand/90 sm:text-2xl"
          >
            Interiors crafted around the way you live.
          </Reveal>

          <Reveal as="p" delay={300} className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            A trusted interior contractor in Indonesia since {site.established}. We
            design, build, and maintain custom furniture and interiors — prioritising
            design, function, quality, and comfort from first sketch to final detail.
          </Reveal>

          <Reveal delay={380} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full bg-clay px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-clay-dark"
            >
              Start Your Project
            </a>
            <a
              href={waLink(`Hi ${site.shortName}, I'd like to consult about a project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
