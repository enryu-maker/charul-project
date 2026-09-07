"use client";

import { useEffect, useRef, useState } from "react";
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

function ProjectCardItem({
    project,
    isActive,
}: {
    project: MappedProject;
    isActive: boolean;
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const isScrollingRef = useRef(false);
    const lastTouchEndRef = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            touchStartRef.current = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now(),
            };
            isScrollingRef.current = false;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStartRef.current || e.touches.length !== 1) return;
        const touch = e.touches[0];
        const dx = touch.clientX - touchStartRef.current.x;
        const dy = touch.clientY - touchStartRef.current.y;
        if (Math.hypot(dx, dy) > 8) {
            isScrollingRef.current = true;
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartRef.current) return;
        const target = e.target as HTMLElement;
        const isInteractive = target.closest("a, button, input, textarea, select");
        if (isInteractive) {
            touchStartRef.current = null;
            return;
        }

        const duration = Date.now() - touchStartRef.current.time;
        if (!isScrollingRef.current && duration < 500) {
            lastTouchEndRef.current = Date.now();
            setIsFlipped((prev) => !prev);
        }
        touchStartRef.current = null;
    };

    const handleClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = target.closest("a, button, input, textarea, select");
        if (isInteractive) return;

        // Prevent double toggling if touchend just triggered
        if (Date.now() - lastTouchEndRef.current < 600) {
            return;
        }

        setIsFlipped((prev) => !prev);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest("a, button, input, textarea, select");
            if (isInteractive && target !== e.currentTarget) return;

            e.preventDefault();
            setIsFlipped((prev) => !prev);
        }
    };

    return (
        <article
            className={`group project-card-perspective relative flex h-[70vh] w-[82vw] shrink-0 cursor-pointer select-none rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-green md:w-[56vw] lg:w-[42vw] ${
                isFlipped ? "is-flipped" : ""
            }`}
            style={{
                opacity: isActive ? 1 : 0.55,
                transform: `scale(${isActive ? 1 : 0.94})`,
                transition: "opacity 500ms ease, transform 500ms ease",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`${project.name}, ${project.sector}. Click or tap to ${
                isFlipped ? "view front details" : "read project description"
            }.`}
            aria-pressed={isFlipped}
        >
            <div className={`project-card-inner ${isFlipped ? "is-flipped" : ""}`}>
                {/* FRONT SIDE - Full image with Category, Name, Place, Year, Scope */}
                <div className="project-card-front flex flex-col justify-end overflow-hidden rounded-sm border border-ink-foreground/10 bg-ink p-6 md:p-9">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={`${project.name}, ${project.location}`}
                            loading="lazy"
                            width={1280}
                            height={1600}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-ink/70" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-transparent" />
                    <div className="relative z-10 w-full">
                        <p className="eyebrow text-ink-foreground/70">
                            {project.index} · {project.sector}
                        </p>
                        <h3 className="mt-3 text-[22px] font-medium leading-[1.15] tracking-[-0.02em] text-ink-foreground sm:text-[24px] md:text-[28px] lg:text-[32px]">
                            {project.name}
                        </h3>
                        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-ink-foreground/20 pt-4 text-xs text-ink-foreground/70">
                            <div>
                                <dt className="eyebrow text-ink-foreground/50">Location</dt>
                                <dd className="mt-1 font-mono text-xs text-ink-foreground/80 md:text-[13px]">
                                    {project.location}
                                </dd>
                            </div>
                            <div>
                                <dt className="eyebrow text-ink-foreground/50">Year</dt>
                                <dd className="mt-1 font-mono text-xs text-ink-foreground/80 md:text-[13px]">
                                    {project.year}
                                </dd>
                            </div>
                            <div>
                                <dt className="eyebrow text-ink-foreground/50">Scope</dt>
                                <dd className="mt-1 font-mono text-xs text-ink-foreground/80 md:text-[13px]">
                                    {project.scope}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* BACK SIDE - Image background with Description centered */}
                <div className="project-card-back flex flex-col items-center justify-center overflow-hidden rounded-sm border border-ink-foreground/15 bg-ink p-8 text-center md:p-12">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            width={1280}
                            height={1600}
                            className="absolute inset-0 h-full w-full scale-110 object-cover blur-lg"
                        />
                    ) : null}
                    <div className="absolute inset-0 bg-ink/85" />
                    <div className="relative z-10 flex w-full max-w-md items-center justify-center">
                        <p className="text-center text-[15px] font-normal leading-[1.75] text-ink-foreground/90 sm:text-[16px] md:text-[18px]">
                            {project.blurb}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}

export function HorizontalProjects({ items = [] }: { items?: ApiProject[] }) {
    const projects = mapProjects(items);
    const sectionRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const barRef = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (projects.length === 0 || !section || !track) return;

        let distance = 0;
        let lastActive = -1;
        let ticking = false;

        const measure = () => {
            distance = Math.max(0, track.scrollWidth - window.innerWidth);
        };

        const apply = () => {
            ticking = false;
            const rect = section.getBoundingClientRect();
            const scrollable = section.offsetHeight - window.innerHeight;
            const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
            track.style.transform = `translate3d(${-(p * distance)}px, 0, 0)`;
            if (barRef.current) barRef.current.style.width = `${Math.max(4, p * 100)}%`;
            const i = Math.min(projects.length - 1, Math.round(p * (projects.length - 1)));
            if (i !== lastActive) {
                lastActive = i;
                setActive(i);
            }
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(apply);
        };

        measure();
        apply();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", measure);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", measure);
        };
    }, [projects.length]);

    if (projects.length === 0) {
        return (
            <section id="projects" className="relative ink-panel px-6 py-20 md:px-12 md:py-28">
                <p className="eyebrow opacity-70">Selected work</p>
                <h2 className="mt-3 text-[36px] font-medium leading-[1.1] tracking-[-0.025em] md:text-[44px] lg:text-[56px]">
                    Project by project.
                </h2>
                <p className="mt-6 max-w-md text-[14px] font-normal leading-[1.5] text-ink-foreground/60 md:text-[15px]">
                    No projects available at the moment.
                </p>
            </section>
        );
    }

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative ink-panel"
            style={{ height: `${(projects.length + 1) * 100}dvh` }}
        >
            <div className="sticky top-0 flex h-dvh flex-col overflow-hidden">
                <header className="flex shrink-0 items-end justify-between gap-6 px-6 pt-20 pb-6 md:px-12">
                    <div>
                        <p className="eyebrow opacity-70">Selected work</p>
                        <h2 className="mt-3 text-[36px] font-medium leading-[1.1] tracking-[-0.025em] md:text-[44px] lg:text-[56px]">
                            Project by project.
                        </h2>
                    </div>
                    <p className="hidden max-w-xs text-[14px] font-normal leading-[1.5] opacity-70 md:block md:text-[15px]">
                        Keep scrolling - the work moves sideways, one project at a time.
                    </p>
                </header>

                <div className="relative flex-1">
                    <div
                        ref={trackRef}
                        className="flex h-full items-center gap-6 px-6 will-change-transform md:gap-10 md:px-12"
                    >
                        {projects.map((p: MappedProject, i: number) => (
                            <ProjectCardItem
                                key={p.name + p.index}
                                project={p}
                                isActive={i === active}
                            />
                        ))}
                    </div>
                </div>

                <footer className="flex shrink-0 items-center gap-4 px-6 pt-4 pb-8 md:px-12">
                    <div className="h-px flex-1 bg-ink-foreground/20">
                        <div ref={barRef} className="h-px bg-brand-green" style={{ width: "4%" }} />
                    </div>
                </footer>
            </div>
        </section>
    );
}

