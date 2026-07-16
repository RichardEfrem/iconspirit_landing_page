// Project data. Photos live in /public/images/projects/<slug>/NN.webp
// (01 is the cover). Categories drive the gallery filter.
// Copy is placeholder-friendly — edit freely, it won't break the layout.

export type Category = "Residential" | "Commercial";

export interface Project {
  slug: string;
  name: string;
  location: string;
  categories: Category[];
  blurb: string;
  /** Number of photos available in /public/images/projects/<slug>/ (01..NN). */
  photoCount: number;
}

export const projects: Project[] = [
  {
    slug: "citraland",
    name: "Citraland",
    location: "CitraLand, Surabaya",
    categories: ["Residential"],
    blurb:
      "A full custom interior for a family home — warm timber tones, clean lines, and built-in cabinetry tailored to every room.",
    photoCount: 5,
  },
  {
    slug: "graha-family",
    name: "Graha Family",
    location: "Graha Family, Surabaya",
    categories: ["Residential"],
    blurb:
      "A whole-home fit-out balancing classic detailing with modern comfort, crafted room by room to the owner's brief.",
    photoCount: 10,
  },
  {
    slug: "lunesse",
    name: "Lunesse",
    location: "Surabaya",
    categories: ["Residential", "Commercial"],
    blurb:
      "An elegant, minimalist scheme spanning both living and commercial spaces, unified by a refined material palette.",
    photoCount: 4,
  },
  {
    slug: "mansion-nine",
    name: "Mansion Nine",
    location: "Surabaya",
    categories: ["Residential"],
    blurb:
      "Contemporary interiors with bespoke joinery and a considered mix of texture, light, and tone.",
    photoCount: 4,
  },
  {
    slug: "pakuwon",
    name: "Pakuwon",
    location: "Pakuwon, Surabaya",
    categories: ["Residential"],
    blurb:
      "A comfortable, functional home interior — custom furniture designed to make the most of every dimension.",
    photoCount: 4,
  },
];

/** Ordered list of image paths for a project. */
export function projectPhotos(p: Project): string[] {
  return Array.from({ length: p.photoCount }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `/images/projects/${p.slug}/${n}.webp`;
  });
}

export function projectCover(p: Project): string {
  return `/images/projects/${p.slug}/01.webp`;
}
