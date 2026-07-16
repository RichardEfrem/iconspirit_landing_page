"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const empty = { name: "", email: "", phone: "", message: "", company: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("sent");
        setForm(empty);
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  };

  const field =
    "w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-muted focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20 disabled:opacity-60";

  return (
    <section id="contact" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Left: pitch + details */}
        <div>
          <Reveal as="p" className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-clay">
            Get Started
          </Reveal>
          <Reveal as="h2" className="text-3xl leading-tight sm:text-4xl">
            Tell us your dream house — and let&apos;s make it happen.
          </Reveal>
          <Reveal as="p" delay={80} className="mt-5 max-w-md leading-relaxed text-ink-soft">
            Konsultasikan setiap keinginan dan mimpi Anda, dan kami akan bantu
            mewujudkannya. Send us a message and we&apos;ll get back to you shortly.
          </Reveal>

          <Reveal delay={140} className="mt-10 space-y-5">
            <ContactRow label="WhatsApp / Phone" value={site.phoneDisplay} href={`tel:+${site.whatsapp}`} />
            <ContactRow label="Email" value={site.email} href={`mailto:${site.email}`} />
            <ContactRow
              label="Studio"
              value={`${site.address.street}, ${site.address.locality}`}
            />
            <ContactRow label="Instagram" value="@iconspirit.indonesia" href={site.instagram} external />
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={120}>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-line bg-cream/60 p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-xl">Request a consultation</h3>
            <p className="mt-1 text-sm text-muted">
              And don&apos;t just dream — make it happen with us.
            </p>

            <div className="mt-6 space-y-4">
              <input
                required
                type="text"
                placeholder="Your name"
                autoComplete="name"
                disabled={status === "sending"}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
              />
              <input
                required
                type="email"
                placeholder="Email address"
                autoComplete="email"
                disabled={status === "sending"}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
              />
              <input
                required
                type="text"
                inputMode="tel"
                placeholder="Phone / WhatsApp"
                autoComplete="tel"
                disabled={status === "sending"}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={field}
              />
              <textarea
                rows={5}
                placeholder="Tell us about your space or project…"
                disabled={status === "sending"}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={field}
              />

              {/* Honeypot — hidden from users, catches bots */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="hidden"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-clay px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-clay-dark disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>

              {status === "sent" && (
                <p className="rounded-xl bg-clay/10 px-4 py-3 text-center text-sm text-clay-dark">
                  Your quote request has been sent successfully. Thank you!
                </p>
              )}
              {status === "error" && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                  {error}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = <span className="text-ink transition-colors group-hover:text-clay">{value}</span>;
  return (
    <div className="group">
      <p className="text-xs font-medium uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-1 text-lg">
        {href ? (
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {content}
          </a>
        ) : (
          content
        )}
      </p>
    </div>
  );
}
