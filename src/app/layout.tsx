import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import PageTexture from "@/components/PageTexture";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const seoTitle = `Kontraktor Interior & Furniture Custom ${site.city} | ${site.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seoTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: seoTitle,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "id_ID",
    images: [{ url: "/images/hero.webp", width: 1200, height: 630, alt: seoTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: site.description,
    images: ["/images/hero.webp"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  name: site.name,
  alternateName: "Icon Spirit",
  image: `${site.url}/images/hero.webp`,
  url: site.url,
  telephone: `+${site.whatsapp}`,
  email: site.email,
  priceRange: "$$",
  foundingDate: String(site.established),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: site.serviceAreas.map((name) => ({ "@type": "City", name })),
  knowsAbout: site.keywords,
  makesOffer: [
    "Jasa Desain Interior",
    "Furniture Custom",
    "Kitchen Set Custom",
    "Renovasi Interior",
    "Interior Rumah & Komersial",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
  sameAs: [site.instagram],
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PageTexture />
        {children}
      </body>
    </html>
  );
}
