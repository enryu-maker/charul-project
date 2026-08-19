import { SiteNav, Hero, Practice, Services, Stats, Testimonials, Contact } from "@/components/site/sections";
import { HorizontalProjects } from "@/components/site/horizontal-projects";
import { HorizontalProcess } from "@/components/site/horizontal-process";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteNav />
      <Hero />
      <Practice />
      <Services />
      <Stats />
      <HorizontalProjects />
      <HorizontalProcess />
      <Testimonials />
      <Contact />
    </main>
  );
}
