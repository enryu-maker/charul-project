import { SiteNav, Hero, Practice, Services, Stats, WhatWeStandFor, Sectors, CharulEdge, EquipmentFleet, Testimonials, Contact } from "@/components/site/sections";
import { HorizontalProjects } from "@/components/site/horizontal-projects";
import { HorizontalProcess } from "@/components/site/horizontal-process";
import { fetchSiteData } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://charul-project.vercel.app";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Charul Projects",
  url: SITE_URL,
  logo: `${SITE_URL}/charul-logo-light.webp`,
  image: `${SITE_URL}/hero-construction.jpg`,
  description:
    "Turnkey projects, construction management and contracting in Nashik since 1997 - hospitals, MIDC industrial units, homes, wineries and landscapes.",
  email: "info@charulprojects.com",
  telephone: "+91 942 227 2181",
  areaServed: "Nashik, Maharashtra, India",
  sameAs: [
    "https://www.instagram.com/charulprojects",
    "https://www.linkedin.com/in/chinmay-deshpande-aa583375/",
  ],
};

export default async function Home() {
  const data = await fetchSiteData();

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Page 1: Hero, About, Stats, Values */}
      <SiteNav />
      <Hero image={data.home[0]?.image} />
      <Practice items={data.practice} />
      <Stats items={data.stats} />
      <WhatWeStandFor />

      {/* Page 2: Selected Work (Landmark developments) */}
      <HorizontalProjects items={data.projects} />

      {/* Page 3: Sectors we serve & Unparalleled construction expertise */}
      <Sectors />
      <Services items={data.services} />

      {/* Page 4: The Charul edge & Nine stages process */}
      <CharulEdge />
      <HorizontalProcess items={data.process} />

      {/* Page 5: Equipment fleet & What clients say */}
      <EquipmentFleet />
      <Testimonials items={data.reviews} />

      {/* Page 6: Contact & Footer */}
      <Contact data={data.contact} />
    </main>
  );
}
