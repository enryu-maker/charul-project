import { SiteNav, Hero, Practice, Services, Stats, Sectors, Equipment, Testimonials, Contact } from "@/components/site/sections";
import { HorizontalValues } from "@/components/site/horizontal-values";
import { HorizontalProjects } from "@/components/site/horizontal-projects";
import { HorizontalProcess } from "@/components/site/horizontal-process";
import { fetchSiteData } from "@/lib/api";

export default async function Home() {
  const data = await fetchSiteData();

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteNav />
      <Hero image={data.home[0]?.image} />
      <Stats items={data.stats} />
      <Practice items={data.practice} />
      <HorizontalValues />
      <Services items={data.services} />
      <HorizontalProjects items={data.projects} />
      <HorizontalProcess items={data.process} />
      <Sectors />
      <Equipment />
      <Testimonials items={data.reviews} />
      <Contact data={data.contact} />
    </main>
  );
}
