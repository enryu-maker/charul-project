"use client";

import { useEffect, useRef, useState } from "react";
import { stages as fallbackStages, type Stage } from "./process-data";
import type { ApiProcess } from "@/lib/api/types";

function mapStages(items: ApiProcess[]): Stage[] {
    return items.map((s) => ({
        n: String(s.step).padStart(2, "0"),
        title: s.title,
        body: s.description,
    }));
}

export function HorizontalProcess({ items = [] }: { items?: ApiProcess[] }) {
    const stages = items.length > 0 ? mapStages(items) : fallbackStages;
    const sectionRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const barRef = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

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
            const i = Math.min(stages.length - 1, Math.round(p * (stages.length - 1)));
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
    }, [stages.length]);

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How Charul Projects executes a construction project",
        description: "The stage-by-stage process Charul Projects follows to deliver a construction project from consultation to post-handover maintenance.",
        step: stages.map((s) => ({
            "@type": "HowToStep",
            position: Number(s.n),
            name: s.title,
            text: s.body,
        })),
    };

    return (
        <section
            id="process"
            ref={sectionRef}
            className="relative"
            style={{ height: `${(stages.length + 1) * 70}dvh` }}
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <div className="sticky top-0 flex h-dvh flex-col overflow-hidden bg-background">
                <header className="flex shrink-0 items-end justify-between gap-6 px-6 pt-20 pb-6 md:px-12">
                    <div>
                        <p className="eyebrow text-brand-green">Our process</p>
                        <h2 className="mt-3 max-w-2xl text-4xl md:text-6xl">
                            {stages.length} stages. One accountable partner.
                        </h2>
                    </div>
                    <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
                        A disciplined, transparent process that keeps owners informed, budgets protected and
                        programmes on track.
                    </p>
                </header>

                <div className="relative flex-1">
                    <div
                        ref={trackRef}
                        className="flex h-full items-center gap-6 px-6 will-change-transform md:gap-8 md:px-12"
                    >
                        {stages.map((s: Stage, i: number) => (
                            <article
                                key={s.n + s.title}
                                className="relative flex h-[52vh] w-[78vw] shrink-0 flex-col justify-between border border-border bg-card p-7 sm:w-[54vw] md:w-[34vw] lg:w-[26vw]"
                                style={{
                                    opacity: i === active ? 1 : 0.5,
                                    transform: `translateY(${i === active ? -12 : 0}px)`,
                                    borderColor:
                                        i === active ? "var(--brand-green)" : "var(--border)",
                                    transition:
                                        "opacity 450ms ease, transform 450ms ease, border-color 450ms ease",
                                }}
                            >
                                <span className="font-display text-6xl tracking-tight text-brand-green md:text-7xl">
                                    {s.n}
                                </span>
                                <div>
                                    <h3 className="text-2xl md:text-3xl">{s.title}</h3>
                                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                                </div>
                                <span
                                    className="h-1 w-14 bg-accent"
                                    style={{ opacity: i === active ? 1 : 0.35 }}
                                />
                            </article>
                        ))}
                    </div>
                </div>

                <footer className="flex shrink-0 items-center gap-4 px-6 pt-4 pb-8 md:px-12">

                    <div className="h-px flex-1 bg-border">
                        <div ref={barRef} className="h-px bg-brand-green" style={{ width: "4%" }} />
                    </div>
                </footer>
            </div>
        </section>
    );
}

