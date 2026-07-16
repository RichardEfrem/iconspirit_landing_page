import Reveal from "./Reveal";
import VideoPlayer from "./VideoPlayer";
import { site } from "@/lib/site";

export default function Stats() {
  return (
    <section className="bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal as="p" className="text-sm font-medium uppercase tracking-[0.25em] text-white/60">
          We&apos;ve Built
        </Reveal>
        <Reveal as="p" className="mt-4 font-display text-6xl leading-none sm:text-8xl">
          {site.homesBuilt}
        </Reveal>
        <Reveal as="p" delay={80} className="mt-4 text-lg tracking-wide text-white/80 sm:text-xl">
          homes and spaces delivered all over Indonesia
        </Reveal>

        <Reveal delay={140} className="mt-14">
          <VideoPlayer videoId={site.youtubeId} poster="/images/video-poster.webp" />
        </Reveal>

        <Reveal as="p" delay={80} className="mt-6 text-sm text-white/50">
          Watch our story — a look at how we bring interiors to life.
        </Reveal>
      </div>
    </section>
  );
}
