"use client";

import { useEffect, useRef, useState } from "react";

const values = [
    {
        n: "01",
        title: "Accountability",
        body: "One partner, one answer. We own schedule, scope, cost and quality from the first sketch to handover.",
    },
    {
        n: "02",
        title: "Integrity",
        body: "Trust is our wealth. We say what we will do, then do it — without shortcuts that show up later on site.",
    },
    {
        n: "03",
        title: "Craft",
        body: "Drawings are a promise; site is the proof. Workmanship and detailing are non-negotiable on every programme.",
    },
    {
        n: "04",
        title: "Clarity",
        body: "Clients get straight reporting on progress, risk and cost — not committees, jargon or surprises at the end.",
    },
];

export function HorizontalValues() {
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

    const active = Math.min(values.length - 1, Math.round(progress * (values.length - 1)));

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{ height: `${(values.length + 1) * 70}vh` }}
        >
            <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-background">
                <header className="flex shrink-0 items-end justify-between gap-6 px-6 pt-20 pb-6 md:px-12">
                    <div>
                        <p className="eyebrow text-brand-green">Core values</p>
                        <h2 className="mt-3 max-w-2xl text-4xl md:text-6xl">
                            What we hold on every site.
                        </h2>
                    </div>
                    <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
                        Keep scrolling — each value slides into focus, one principle at a time.
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
                        {values.map((v, i) => (
                            <article
                                key={v.n}
                                className="relative flex h-[52vh] w-[78vw] shrink-0 flex-col justify-between border border-border bg-card p-7 sm:w-[54vw] md:w-[40vw] lg:w-[30vw]"
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
                                    {v.n}
                                </span>
                                <div>
                                    <h3 className="text-2xl md:text-3xl">{v.title}</h3>
                                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                        {v.body}
                                    </p>
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
                    <span className="eyebrow">
                        {String(active + 1).padStart(2, "0")} / {String(values.length).padStart(2, "0")}
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
