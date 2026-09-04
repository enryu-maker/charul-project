import { SiteNav, Hero, Practice, Services, Stats, Sectors, Equipment, Testimonials, Contact } from "@/components/site/sections";
import { HorizontalValues } from "@/components/site/horizontal-values";
import { HorizontalProjects } from "@/components/site/horizontal-projects";
import { HorizontalProcess } from "@/components/site/horizontal-process";
import { FAQ } from "@/components/site/faq";
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
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SiteNav />
      <Hero image={data.home[0]?.image} />
      <Stats items={data.stats} />
      <Practice items={data.practice} />
      <HorizontalValues />
      <Services items={data.services} />
      <HorizontalProjects items={data.projects} />
      <HorizontalProcess items={data.process} />
      <Sectors />
      <Equipment items={data.equipment} />
      <Testimonials items={data.reviews} />
      <Contact data={data.contact} />
    </main>
  );
}
