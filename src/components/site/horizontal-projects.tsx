"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mediaUrl } from "@/lib/api";
import type { ApiProject } from "@/lib/api/types";

type MappedProject = {
    index: string;
    sector: string;
    name: string;
    blurb: string;
    location: string;
    year: string;
    scope: string;
    image: string | null;
};

function mapProjects(apiProjects: ApiProject[]): MappedProject[] {
    return apiProjects.map((p, i) => ({
        index: String(i + 1).padStart(2, "0"),
        sector: p.category_name || "Project",
        name: p.name,
        blurb: p.description,
        location: p.location,
        year: String(p.year),
        scope: p.scope || "-",
        image: mediaUrl(p.image) || "/hero-construction.jpg",
    }));
}

export function HorizontalProjects({ items = [] }: { items?: ApiProject[] }) {
    const projects = mapProjects(items);
    const sectionRef = useRef<HTMLElement | null>(null);
    const [active, setActive] = useState(0);

    const scrollToProject = (index: number) => {
        if (!sectionRef.current) return;
        const targetIndex = Math.max(0, Math.min(projects.length - 1, index));
        const section = sectionRef.current;
        const scrollable = section.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const targetY =
            section.offsetTop +
            (targetIndex / Math.max(1, projects.length - 1)) * scrollable;

        window.scrollTo({ top: targetY, behavior: "smooth" });
        setActive(targetIndex);
    };

    useEffect(() => {
        const section = sectionRef.current;
        if (projects.length === 0 || !section) return;

        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                const rect = section.getBoundingClientRect();
                const scrollable = section.offsetHeight - window.innerHeight;
                if (scrollable <= 0) return;

                const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
                const index = Math.min(
                    projects.length - 1,
                    Math.floor(progress * projects.length)
                );
                setActive(index);
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [projects.length]);

    if (projects.length === 0) {
        return (
            <section id="projects" className="relative bg-background text-foreground px-6 py-20 md:px-12 md:py-28">
                <p className="eyebrow text-brand-green">Selected work</p>
                <h2 className="mt-3 text-[36px] font-medium leading-[1.1] tracking-[-0.025em] text-foreground md:text-[44px] lg:text-[56px]">
                    Project by project.
                </h2>
                <p className="mt-6 max-w-md text-[14px] font-normal leading-[1.5] text-muted-foreground md:text-[15px]">
                    No projects available at the moment.
                </p>
            </section>
        );
    }

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative bg-background text-foreground"
            style={{ height: `${(projects.length + 1) * 90}dvh` }}
        >
            <div className="sticky top-0 flex h-dvh flex-col justify-between overflow-hidden bg-background px-6 pt-16 pb-8 md:px-12 md:pt-20 md:pb-10">
                {/* Header with Title and Nav Controls */}
                <header className="flex shrink-0 items-end justify-between gap-6 max-w-7xl mx-auto w-full">
                    <div>
                        <p className="eyebrow text-brand-green">Selected work</p>
                        <h2 className="mt-2 text-[30px] font-medium leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[36px] md:text-[44px] lg:text-[50px]">
                            Project by project.
                        </h2>
                    </div>

                    {/* Counter and Next/Prev Controls */}
                    <div className="flex items-center gap-4">
                        <div className="font-mono text-xs sm:text-sm text-foreground/80 tracking-widest">
                            <span className="text-foreground font-semibold">
                                {String(active + 1).padStart(2, "0")}
                            </span>
                            <span className="text-muted-foreground mx-1">/</span>
                            <span className="text-muted-foreground">
                                {String(projects.length).padStart(2, "0")}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => scrollToProject(active - 1)}
                                disabled={active === 0}
                                aria-label="Previous project"
                                className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-card text-foreground transition-all duration-200 hover:border-brand-green hover:bg-brand-green/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollToProject(active + 1)}
                                disabled={active === projects.length - 1}
                                aria-label="Next project"
                                className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-card text-foreground transition-all duration-200 hover:border-brand-green hover:bg-brand-green/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Card Viewport: Exactly ONE project card visible at a time */}
                <div className="relative my-auto w-full max-w-7xl mx-auto flex-1 flex items-center justify-center py-4">
                    <div className="relative w-full h-[62vh] min-h-[440px] max-h-[620px] overflow-hidden rounded-sm border border-border bg-card shadow-xs">
                        <div
                            className="flex h-full w-full transition-transform duration-500 ease-out"
                            style={{
                                transform: `translate3d(-${active * 100}%, 0, 0)`,
                            }}
                        >
                            {projects.map((project) => (
                                <article
                                    key={project.name + project.index}
                                    className="flex h-full w-full min-w-full shrink-0 flex-col md:flex-row overflow-hidden select-none"
                                    aria-label={`${project.name}, ${project.sector}`}
                                >
                                    {/* LEFT SIDE (Desktop) / BELOW (Mobile): Content */}
                                    <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 md:p-9 lg:p-11 order-2 md:order-1 overflow-y-auto">
                                        <div>
                                            <p className="eyebrow text-brand-green font-medium">
                                                {project.index} · {project.sector}
                                            </p>
                                            <h3 className="mt-3 text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[26px] md:text-[30px] lg:text-[34px]">
                                                {project.name}
                                            </h3>
                                            <p className="mt-4 text-[13px] sm:text-[14px] font-normal leading-[1.7] text-muted-foreground md:text-[15px] lg:text-[16px]">
                                                {project.blurb}
                                            </p>
                                        </div>

                                        <dl className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4 border-t border-border pt-4 sm:pt-5 text-xs">
                                            <div>
                                                <dt className="eyebrow text-muted-foreground/70">Location</dt>
                                                <dd className="mt-1 font-mono text-xs text-foreground md:text-[13px]">
                                                    {project.location}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="eyebrow text-muted-foreground/70">Year</dt>
                                                <dd className="mt-1 font-mono text-xs text-foreground md:text-[13px]">
                                                    {project.year}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="eyebrow text-muted-foreground/70">Scope</dt>
                                                <dd className="mt-1 font-mono text-xs text-foreground md:text-[13px]">
                                                    {project.scope}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>

                                    {/* RIGHT SIDE (Desktop) / TOP (Mobile): Image */}
                                    <div className="relative w-full h-48 sm:h-56 md:h-full md:w-[48%] lg:w-[50%] shrink-0 overflow-hidden bg-muted order-1 md:order-2">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={`${project.name}, ${project.location}`}
                                                loading="lazy"
                                                width={1280}
                                                height={1600}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-muted">
                                                <span className="eyebrow text-muted-foreground">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer: Progress indicator */}
                <footer className="shrink-0 max-w-7xl mx-auto w-full pt-2">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                        <div
                            className="h-full bg-brand-green transition-all duration-300 ease-out"
                            style={{
                                width: `${((active + 1) / projects.length) * 100}%`,
                            }}
                        />
                    </div>
                </footer>
            </div>
        </section>
    );
}
