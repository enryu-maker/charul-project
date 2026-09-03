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
    }, [stages.length]);

    const active = Math.min(stages.length - 1, Math.round(progress * (stages.length - 1)));

    return (
        <section
            id="process"
            ref={sectionRef}
            className="relative"
            style={{ height: `${(stages.length + 1) * 70}vh` }}
        >
            <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-background">
                <header className="flex shrink-0 items-end justify-between gap-6 px-6 pt-20 pb-6 md:px-12">
                    <div>
                        <p className="eyebrow text-brand-green">Our process</p>
                        <h2 className="mt-3 max-w-2xl text-[36px] font-medium leading-[1.1] tracking-[-0.025em] md:text-[44px] lg:text-[56px]">
                            {stages.length} stages. One accountable partner.
                        </h2>
                    </div>
                    <p className="hidden max-w-xs text-[14px] font-normal leading-[1.5] text-muted-foreground md:block md:text-[15px]">
                        A disciplined, transparent process that keeps owners informed, budgets protected and
                        programmes on track.
                    </p>
                </header>

                <div className="relative flex-1">
                    <div
                        ref={trackRef}
                        className="flex h-full items-center gap-6 px-6 will-change-transform md:gap-8 md:px-12"
                        style={{
                            transform: `translate3d(-${progress * distance}px, 0, 0)`,
                            transition: "transform 120ms linear",
                        }}
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
                                <span className="font-mono text-4xl font-normal tracking-tight text-brand-green leading-none md:text-5xl lg:text-[52px]">
                                    {s.n}
                                </span>
                                <div>
                                    <h3 className="text-[20px] font-medium leading-[1.2] tracking-[-0.02em] md:text-[22px] lg:text-[24px]">{s.title}</h3>
                                    <p className="mt-4 text-[14px] font-normal leading-[1.6] text-muted-foreground md:text-[15px]">{s.body}</p>
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
                    <span className="eyebrow font-mono">
                        {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border">
                        <div
                            className="h-px bg-brand-green"
                            style={{
                                width: `${Math.max(4, progress * 100)}%`,
                                transition: "width 120ms linear",
                            }}
                        />
                    </div>
                </footer>
            </div>
        </section>
    );
}
