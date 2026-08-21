import { SiteNav, Hero, Practice, Services, Stats, Sectors, Testimonials, Contact } from "@/components/site/sections";
import { HorizontalValues } from "@/components/site/horizontal-values";
import { HorizontalProjects } from "@/components/site/horizontal-projects";
import { HorizontalProcess } from "@/components/site/horizontal-process";
import { fetchSiteData } from "@/lib/api";

export default async function Home() {
  // Keep API calls warm; UI stays on static content for now.
  await fetchSiteData();

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteNav />
      <Hero />
      <Stats />
      <Practice />
      <HorizontalValues />
      <Services />
      <HorizontalProjects />
      <HorizontalProcess />
      <Sectors />
      <Testimonials />
      <Contact />
    </main>
  );
}
