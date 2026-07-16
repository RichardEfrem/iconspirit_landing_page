import Image from "next/image";
import { site, waLink } from "@/lib/site";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center">
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
      <div className="absolute inset-0 bg-linear-to-r from-ink/80 via-ink/55 to-ink/20" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl py-32 text-white">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-white/80">
            Interior Contractor · Est. {site.established}
          </p>
          <h1 className="font-display text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
            Icon<span className="italic text-sand">Spirit</span>
            <span className="mt-1 block text-3xl font-normal tracking-wide text-white/85 sm:text-4xl lg:text-5xl">
              Indonesia
            </span>
          </h1>
          <p className="mt-6 max-w-xl font-display text-xl italic text-sand/90 sm:text-2xl">
            Interiors crafted around the way you live.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            A trusted interior contractor in Indonesia since {site.established}. We
            design, build, and maintain custom furniture and interiors — prioritising
            design, function, quality, and comfort from first sketch to final detail.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
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
          </div>
        </div>
      </div>
    </section>
  );
}
