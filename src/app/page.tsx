import { SiteNav, Hero, Practice, About, Services, Stats, Sectors, Testimonials, Contact } from "@/components/site/sections";
import { HorizontalValues } from "@/components/site/horizontal-values";
import { HorizontalProjects } from "@/components/site/horizontal-projects";
import { HorizontalProcess } from "@/components/site/horizontal-process";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteNav />
      <Hero />
      <Stats />
      <Practice />
      <About />
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
