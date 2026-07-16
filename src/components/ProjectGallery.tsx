"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  projects,
  projectCover,
  projectPhotos,
  type Category,
  type Project,
} from "@/lib/projects";
import Reveal from "./Reveal";

const filters: ("All" | Category)[] = ["All", "Residential", "Commercial"];

export default function ProjectGallery() {
  const [active, setActive] = useState<"All" | Category>("All");
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  const close = useCallback(() => setLightbox(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((lb) => {
        if (!lb) return lb;
        const total = lb.project.photoCount;
        return { ...lb, index: (lb.index + dir + total) % total };
      });
    },
    [],
  );

  // Keyboard nav + lock scroll while the lightbox is open.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  return (
    <section id="projects" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Reveal as="p" className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-clay">
              Our Works
            </Reveal>
            <Reveal as="h2" className="text-3xl leading-tight sm:text-4xl">
              A selection of homes and spaces we&apos;ve shaped
            </Reveal>
            <Reveal as="p" delay={80} className="mt-4 leading-relaxed text-ink-soft">
              Portofolio proyek desain interior dan furniture custom kami untuk rumah
              dan ruang komersial di Surabaya dan sekitarnya.
            </Reveal>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  active === f
                    ? "bg-clay text-white"
                    : "border border-line text-ink-soft hover:border-clay hover:text-clay"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 3) * 80}
              className="group relative block overflow-hidden rounded-2xl text-left"
            >
              <button
                type="button"
                onClick={() => setLightbox({ project: p, index: 0 })}
                className="block w-full"
                aria-label={`View ${p.name} gallery`}
              >
                <span className="relative block aspect-4/3 overflow-hidden">
                  <Image
                    src={projectCover(p)}
                    alt={`Interior & furniture custom ${p.name}, ${p.location} — proyek IconSpirit Indonesia`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute bottom-0 left-0 w-full p-5 text-white">
                    <span className="block font-display text-xl">{p.name}</span>
                    <span className="mt-0.5 block text-sm text-white/80">{p.location}</span>
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
                    {p.photoCount} photos
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.project.name} gallery`}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8">
            <div>
              <p className="font-display text-lg">{lightbox.project.name}</p>
              <p className="text-sm text-white/70">
                {lightbox.index + 1} / {lightbox.project.photoCount} · {lightbox.project.location}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/80 hover:bg-white/10 hover:text-white"
            >
              &times;
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:left-6"
            >
              ‹
            </button>

            <div className="relative h-full w-full">
              <Image
                src={projectPhotos(lightbox.project)[lightbox.index]}
                alt={`Desain interior ${lightbox.project.name}, ${lightbox.project.location} — foto ${lightbox.index + 1} oleh IconSpirit`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:right-6"
            >
              ›
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto px-5 pb-5 sm:px-8">
            {projectPhotos(lightbox.project).map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightbox({ project: lightbox.project, index: idx })}
                className={`relative h-14 w-20 flex-none overflow-hidden rounded-md ring-2 transition ${
                  idx === lightbox.index ? "ring-clay" : "ring-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
