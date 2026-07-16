import Reveal from "./Reveal";

const services = [
  {
    title: "Customized Product Solutions",
    body: "Custom furniture manufactured to your exact room dimensions, with designs crafted to maximise efficiency and match your style down to the last detail.",
    num: "01",
  },
  {
    title: "Manufacturing Excellence",
    body: "A team of professional experts handles the whole manufacturing process using high-quality modern technology, delivering products that exceed expectations.",
    num: "02",
  },
  {
    title: "Customer Care",
    body: "Long-term maintenance and reliable, sustainable support tailored to your needs — because a great interior deserves to be looked after.",
    num: "03",
  },
  {
    title: "Highly Experienced",
    body: "Working alongside consultants across classic, minimalist, American, and other styles — deep experience for interiors of every character.",
    num: "04",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-cream-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal as="p" className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-clay">
            What We Do
          </Reveal>
          <Reveal as="h2" className="text-3xl leading-tight sm:text-4xl">
            End-to-end interior craftsmanship
          </Reveal>
          <Reveal as="p" delay={80} className="mt-4 leading-relaxed text-ink-soft">
            Jasa kontraktor interior, desain, dan furniture custom untuk rumah dan
            ruang komersial di Surabaya dan seluruh Indonesia.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 80}
              className="group bg-cream p-8 transition-colors hover:bg-cream-deep sm:p-10"
            >
              <span className="font-display text-2xl text-sand transition-colors group-hover:text-clay">
                {s.num}
              </span>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
