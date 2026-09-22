"use client";

import { MapPin, Calendar, Layers } from "lucide-react";
import { mediaUrl } from "@/lib/api";
import type { ApiProject } from "@/lib/api/types";
import { projects as fallbackProjects } from "./projects-data";

type MappedProject = {
    id: string;
    index: string;
    sector: string;
    name: string;
    blurb: string;
    location: string;
    year: string;
    scope: string;
    image: string;
};

function mapProjects(apiProjects: ApiProject[]): MappedProject[] {
    if (!apiProjects || apiProjects.length === 0) {
        return fallbackProjects.map((p, i) => ({
            id: `project-${i + 1}`,
            index: p.index || String(i + 1).padStart(2, "0"),
            sector: p.sector || "Project",
            name: p.name,
            blurb: p.blurb,
            location: p.place,
            year: p.year,
            scope: p.scope,
            image: typeof p.image === "string" ? p.image : (p.image as { src: string })?.src || "/hero-construction.jpg",
        }));
    }

    return apiProjects.map((p, i) => ({
        id: `project-${p.id || i + 1}`,
        index: String(i + 1).padStart(2, "0"),
        sector: p.category_name || "Project",
        name: p.name,
        blurb: p.description,
        location: p.location || "Nashik, Maharashtra",
        year: String(p.year || "2023"),
        scope: p.scope || "General Contracting",
        image: mediaUrl(p.image) || "/hero-construction.jpg",
    }));
}

export function HorizontalProjects({ items = [] }: { items?: ApiProject[] }) {
    const projects = mapProjects(items);

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
            aria-label="Selected Projects Showcase"
            className="relative bg-background text-foreground pt-12 pb-16 md:pt-16 md:pb-24"
        >
            {/* Section Header */}
            <div className="mx-auto max-w-7xl px-6 mb-8 md:px-12 md:mb-12">
                <p className="eyebrow text-brand-green">Selected work</p>
                <h2 className="mt-2 text-[32px] font-medium leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[40px] md:text-[48px] lg:text-[56px]">
                    Project by project.
                </h2>
            </div>

            {/* VERTICALLY STACKED STORYTELLING PANELS */}
            <div className="relative w-full">
                {projects.map((project, index) => {
                    const zIndex = 10 + index;

                    return (
                        <div
                            key={project.id}
                            className="sticky top-16 md:top-20 w-full flex items-center justify-center px-4 sm:px-6 md:px-12"
                            style={{
                                zIndex,
                                height: "calc(100dvh - 5.5rem)",
                                minHeight: "540px",
                            }}
                        >
                            <article
                                className="relative w-full max-w-7xl h-full overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-xs transition-all duration-300 flex flex-col lg:flex-row"
                            >
                                {/* LEFT COLUMN: Project Narrative & Specifications */}
                                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 overflow-y-auto order-2 lg:order-1">
                                    <div>
                                        {/* Sector Badge + Numbering */}
                                        <div className="flex items-center gap-2.5">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 px-2.5 py-0.5 font-mono text-[11px] font-medium text-brand-green tracking-wider uppercase">
                                                <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
                                                {project.sector}
                                            </span>
                                            <span className="font-mono text-xs text-muted-foreground">
                                                #{project.index}
                                            </span>
                                        </div>

                                        {/* Project Title */}
                                        <h3 className="mt-4 text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.12]">
                                            {project.name}
                                        </h3>

                                        {/* Story blurb */}
                                        <p className="mt-4 text-sm font-normal leading-[1.7] text-muted-foreground sm:text-base md:text-[16.5px] max-w-2xl">
                                            {project.blurb}
                                        </p>
                                    </div>

                                    {/* Project Specifications Grid */}
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                            <div className="flex items-start gap-2.5">
                                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-muted/70 text-brand-green">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                </div>
                                                <div>
                                                    <dt className="eyebrow text-muted-foreground/80">Location</dt>
                                                    <dd className="mt-0.5 text-xs sm:text-[13px] font-mono text-foreground font-medium">
                                                        {project.location}
                                                    </dd>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2.5">
                                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-muted/70 text-brand-green">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                </div>
                                                <div>
                                                    <dt className="eyebrow text-muted-foreground/80">Year</dt>
                                                    <dd className="mt-0.5 text-xs sm:text-[13px] font-mono text-foreground font-medium">
                                                        {project.year}
                                                    </dd>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2.5">
                                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-muted/70 text-brand-green">
                                                    <Layers className="h-3.5 w-3.5" />
                                                </div>
                                                <div>
                                                    <dt className="eyebrow text-muted-foreground/80">Scope</dt>
                                                    <dd className="mt-0.5 text-xs sm:text-[13px] font-mono text-foreground font-medium">
                                                        {project.scope}
                                                    </dd>
                                                </div>
                                            </div>
                                        </dl>

                                        {/* Execution tag */}
                                        <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground/80">
                                            <span className="font-mono text-[11px] tracking-wide">
                                                Disciplined Construction Management
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: Large Featured Imagery */}
                                <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-auto lg:w-[48%] shrink-0 overflow-hidden bg-muted order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-border group">
                                    <img
                                        src={project.image}
                                        alt={`${project.name}, ${project.location}`}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        width={1280}
                                        height={1600}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                            </article>
                        </div>
                    );
                })}
                <div className="h-[60vh] md:h-[75vh]" aria-hidden="true" />
            </div>
        </section>
    );
}
