"use client";

import { useEffect, useRef, useState } from "react";
import { projects, Project } from "./projects-data";

export function HorizontalProjects() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const measure = () => {
            const track = trackRef.current;
            if (!track) return;
            setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
        };

        const onScroll = () => {
            const section = sectionRef.current;
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const scrollable = section.offsetHeight - window.innerHeight;
            const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
            setProgress(p);
        };

        measure();
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", measure);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", measure);
        };
    }, []);

    const active = Math.min(projects.length - 1, Math.round(progress * (projects.length - 1)));

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative ink-panel"
            style={{ height: `${(projects.length + 1) * 100}vh` }}
        >
            <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
                <header className="flex shrink-0 items-end justify-between gap-6 px-6 pt-20 pb-6 md:px-12">
                    <div>
                        <p className="eyebrow opacity-70">Selected work</p>
                        <h2 className="mt-3 text-4xl md:text-6xl">Project by project.</h2>
                    </div>
                    <p className="hidden max-w-xs text-sm opacity-70 md:block">
                        Keep scrolling — the work moves sideways, one project at a time.
                    </p>
                </header>

                <div className="relative flex-1">
                    <div
                        ref={trackRef}
                        className="flex h-full items-center gap-6 px-6 will-change-transform md:gap-10 md:px-12"
                        style={{
                            transform: `translate3d(-${progress * distance}px, 0, 0)`,
                            transition: "transform 120ms linear",
                        }}
                    >
                        {projects.map((p: Project, i: number) => (
                            <article
                                key={p.name}
                                className="group relative flex h-[70vh] w-[82vw] shrink-0 overflow-hidden rounded-sm md:w-[56vw] lg:w-[42vw]"
                                style={{
                                    opacity: i === active ? 1 : 0.55,
                                    transform: `scale(${i === active ? 1 : 0.94})`,
                                    transition: "opacity 500ms ease, transform 500ms ease",
                                }}
                            >
                                <img
                                    src={typeof p.image === "string" ? p.image : p.image.src}
                                    alt={`${p.name}, ${p.place}`}
                                    loading="lazy"
                                    width={1280}
                                    height={1600}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent" />
                                <div className="relative mt-auto w-full p-6 md:p-9">
                                    <p className="eyebrow text-ink-foreground/70">
                                        {p.index} · {p.sector}
                                    </p>
                                    <h3 className="mt-3 text-3xl text-ink-foreground md:text-5xl">{p.name}</h3>
                                    <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-foreground/75">
                                        {p.blurb}
                                    </p>
                                    <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-ink-foreground/20 pt-4 text-xs text-ink-foreground/70">
                                        <div>
                                            <dt className="eyebrow text-ink-foreground/50">Place</dt>
                                            <dd className="mt-1">{p.place}</dd>
                                        </div>
                                        <div>
                                            <dt className="eyebrow text-ink-foreground/50">Year</dt>
                                            <dd className="mt-1">{p.year}</dd>
                                        </div>
                                        <div>
                                            <dt className="eyebrow text-ink-foreground/50">Scope</dt>
                                            <dd className="mt-1">{p.scope}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <footer className="flex shrink-0 items-center gap-4 px-6 pt-4 pb-8 md:px-12">
                    <span className="eyebrow text-ink-foreground/60">
                        {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-ink-foreground/20">
                        <div
                            className="h-px bg-brand-green"
                            style={{ width: `${Math.max(4, progress * 100)}%`, transition: "width 120ms linear" }}
                        />
                    </div>
                </footer>
            </div>
        </section>
    );
}