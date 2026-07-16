// Central place for all brand / contact constants used across the site.
export const site = {
  name: "IconSpirit Indonesia",
  shortName: "IconSpirit",
  tagline: "Interior Contractor & Custom Furniture",
  established: 2003,
  homesBuilt: "200+",
  // Update this once the domain is live.
  url: "https://iconspiritindonesia.com",
  // Indonesian-first description — this is the language customers actually search in.
  description:
    "IconSpirit Indonesia — kontraktor interior & furniture custom terpercaya sejak 2003. Jasa desain interior, pembuatan furniture custom, dan renovasi untuk rumah serta ruang komersial di Surabaya dan seluruh Indonesia. Konsultasi gratis.",
  // Primary city + region for local SEO.
  city: "Surabaya",
  serviceAreas: ["Surabaya", "Sidoarjo", "Gresik", "Jawa Timur", "Indonesia"],
  keywords: [
    "kontraktor interior Surabaya",
    "jasa interior Surabaya",
    "furniture custom Surabaya",
    "jasa desain interior",
    "interior rumah minimalis",
    "kitchen set custom",
    "lemari custom Surabaya",
    "interior apartemen Surabaya",
    "kontraktor furniture Indonesia",
    "jasa renovasi interior",
    "desain interior rumah mewah",
    "IconSpirit Indonesia",
  ],
  address: {
    street: "Jl. Raya Bringkang No. 788",
    locality: "Karanganyar, Mojotengah",
    region: "Jawa Timur",
    country: "ID",
  },
  phoneDisplay: "0895-7036-88888",
  // International format for wa.me / tel: links (leading 0 -> 62)
  whatsapp: "62895703688888",
  email: "customersupport@iconspiritindonesia.com",
  emailAlt: "office.iconspirit@yahoo.com",
  instagram: "https://www.instagram.com/iconspirit.indonesia",
  // Company profile video (YouTube). Loaded only on click — see Stats.tsx.
  youtubeId: "rA-JuonxbS4",
} as const;

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

/** Build a pre-filled WhatsApp chat link. */
export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
