import Image from "next/image";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative aspect-4/5 overflow-hidden rounded-2xl">
          <Image
            src="/images/projects/graha-family/03.webp"
            alt="Detail interior dan furniture custom rumah oleh IconSpirit Indonesia"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <div>
          <Reveal as="p" className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-clay">
            About IconSpirit
          </Reveal>
          <Reveal as="h2" className="text-3xl leading-tight sm:text-4xl">
            Everything starts from an idea. The idea starts from a little conversation.
          </Reveal>
          <Reveal as="p" delay={80} className="mt-6 text-lg leading-relaxed text-ink-soft">
            Established since {site.established}, IconSpirit Indonesia has grown into a
            trusted interior contractor with a simple vision: to realise your dream
            interior without compromise on design, functionality, quality, or comfort.
          </Reveal>
          <Reveal as="p" delay={140} className="mt-4 leading-relaxed text-muted">
            From the earliest planning stages through execution, completion, and
            long-term maintenance, we stay with you the whole way — so you don&apos;t have
            to be afraid to dream.
          </Reveal>

          <Reveal delay={200} className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            <div>
              <p className="font-display text-3xl text-clay">{site.homesBuilt}</p>
              <p className="mt-1 text-sm text-muted">Homes delivered</p>
            </div>
            <div>
              <p className="font-display text-3xl text-clay">{new Date().getFullYear() - site.established}+</p>
              <p className="mt-1 text-sm text-muted">Years of craft</p>
            </div>
            <div>
              <p className="font-display text-3xl text-clay">100%</p>
              <p className="mt-1 text-sm text-muted">Custom made</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
