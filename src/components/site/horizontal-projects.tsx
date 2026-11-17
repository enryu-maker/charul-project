"use client";

import { useState } from "react";
import { X } from "lucide-react";
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
    subtitle: string;
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
            subtitle: p.subtitle || p.year,
            scope: p.scope,
            image: typeof p.image === "string" ? p.image : (p.image as { src: string })?.src || "/hero-construction.jpg",
        }));
    }

    // Merge fallback details with API projects if available
    return fallbackProjects.map((fallback, i) => {
        const api = apiProjects[i];
        if (!api) {
            return {
                id: `project-${i + 1}`,
                index: fallback.index,
                sector: fallback.sector,
                name: fallback.name,
                blurb: fallback.blurb,
                location: fallback.place,
                year: fallback.year,
                subtitle: fallback.subtitle || fallback.year,
                scope: fallback.scope,
                image: typeof fallback.image === "string" ? fallback.image : (fallback.image as { src: string })?.src || "/hero-construction.jpg",
            };
        }
        return {
            id: `project-${api.id || i + 1}`,
            index: String(i + 1).padStart(2, "0"),
            sector: api.category_name || fallback.sector,
            name: api.name || fallback.name,
            blurb: api.description || fallback.blurb,
            location: api.location || fallback.place,
            year: String(api.year || fallback.year),
            subtitle: fallback.subtitle || (api.location ? `${api.location} · ${api.year}` : String(api.year)),
            scope: api.scope || fallback.scope,
            image: mediaUrl(api.image) || (typeof fallback.image === "string" ? fallback.image : (fallback.image as { src: string })?.src || "/hero-construction.jpg"),
        };
    });
}

export function HorizontalProjects({ items = [] }: { items?: ApiProject[] }) {
    const projects = mapProjects(items);
    const [selectedProject, setSelectedProject] = useState<MappedProject | null>(null);

    return (
        <section
            id="projects"
            aria-label="Selected Projects Showcase"
            className="relative bg-white text-slate-900 py-20 sm:py-24 md:py-28 px-6 sm:px-12 md:px-16"
        >
            {/* Section Header matching Attachment 1 */}
            <div className="max-w-[1550px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-8 border-b border-slate-100">
                <div>
                    <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#1d4ed8] uppercase">
                        SELECTED WORK
                    </p>
                    <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                        Landmark developments.
                    </h2>
                </div>

                <div>
                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-1.5 font-semibold text-sm sm:text-base text-[#1d4ed8] hover:text-[#1e40af] border-b border-blue-600/30 hover:border-blue-600 pb-0.5 transition-all duration-200"
                    >
                        <span>View all 75+ projects</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </div>

            {/* 3x3 Projects Grid matching Attachment 1 & 2 */}
            <div className="max-w-[1550px] mx-auto mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                {projects.map((project) => (
                    <article
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="group relative flex flex-col bg-white border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                        {/* Media box with diagonal stripes texture */}
                        <div
                            className="relative aspect-[16/10] w-full overflow-hidden border-b border-slate-100"
                            style={{
                                backgroundColor: "#dbe2ea",
                                backgroundImage: `repeating-linear-gradient(
                                    -45deg,
                                    #d0d9e4 0px,
                                    #d0d9e4 20px,
                                    #edf2f7 20px,
                                    #edf2f7 40px
                                )`,
                            }}
                        >
                            {/* Top Left Category Badge */}
                            <div className="absolute top-3.5 left-3.5 z-10">
                                <span className="inline-block bg-[#091326] text-white text-[10.5px] font-mono font-medium tracking-wide px-3 py-1">
                                    {project.sector}
                                </span>
                            </div>

                            {/* Top Right Photo Tag */}
                            <div className="absolute top-3.5 right-3.5 z-10">
                                <span className="inline-block bg-white/95 text-slate-700 text-[10px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 border border-slate-200/60 shadow-xs">
                                    PHOTO
                                </span>
                            </div>
                        </div>

                        {/* Card Info Area */}
                        <div className="p-6 sm:p-7 flex flex-col justify-between bg-white flex-1">
                            <div>
                                <h3 className="text-lg sm:text-[20px] font-bold text-slate-900 tracking-tight transition-colors duration-200 group-hover:text-[#1d4ed8]">
                                    {project.name}
                                </h3>
                                <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
                                    {project.subtitle}
                                </p>
                            </div>
                        </div>

                        {/* Bottom green accent line */}
                        <div className="h-[2.5px] w-full bg-[#4ade80]" />
                    </article>
                ))}
            </div>

            {/* Project Details Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="relative w-full max-w-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="bg-[#091326] text-white text-xs font-mono font-medium px-2.5 py-1">
                                {selectedProject.sector}
                            </span>
                            <span className="text-xs font-mono text-slate-500">
                                {selectedProject.subtitle}
                            </span>
                        </div>

                        <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            {selectedProject.name}
                        </h3>

                        <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                            {selectedProject.blurb}
                        </p>

                        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-6 text-xs text-slate-600 font-mono">
                            <div>
                                <span className="text-slate-400 block">LOCATION</span>
                                <span className="font-medium text-slate-900">{selectedProject.location}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">SCOPE</span>
                                <span className="font-medium text-slate-900">{selectedProject.scope}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">YEAR</span>
                                <span className="font-medium text-slate-900">{selectedProject.year}</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <a
                                href="#contact"
                                onClick={() => setSelectedProject(null)}
                                className="inline-flex items-center gap-2 bg-[#4ade80] text-slate-950 px-5 py-2.5 font-semibold text-xs uppercase tracking-wide hover:bg-[#34d399] transition-colors"
                            >
                                Inquire about this project →
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
