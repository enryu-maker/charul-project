"use client";

import { useEffect, useRef, useState } from "react";

const values = [
    {
        n: "01",
        title: "Trust",
        body: "We believe strong projects begin with strong relationships. We communicate openly, take responsibility and earn confidence through consistent delivery.",
    },
    {
        n: "02",
        title: "Discipline",
        body: "Good execution requires structure. We bring discipline to planning, scheduling, coordination, resources and site management.",
    },
    {
        n: "03",
        title: "Quality",
        body: "Quality is not a final inspection. It is a standard maintained throughout the project - from materials and workmanship to execution and handover.",
    },
    {
        n: "04",
        title: "Responsibility",
        body: "We take ownership of the work entrusted to us. We consider safety, site conditions, resources and the long-term performance of what we build.",
    },
    {
        n: "05",
        title: "Reliability",
        body: "Clients should know where their project stands and what happens next. We strive for dependable communication, predictable execution and consistent follow-through.",
    },
    {
        n: "06",
        title: "Excellence",
        body: "We continuously improve the way we plan, coordinate and execute projects, drawing on more than two decades of experience.",
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
                        <h2 className="mt-3 max-w-2xl text-[36px] font-medium leading-[1.1] tracking-[-0.025em] md:text-[44px] lg:text-[56px]">
                            Trust is our wealth.
                        </h2>
                    </div>
                    <p className="hidden max-w-md text-[14px] font-normal leading-[1.5] text-muted-foreground md:block md:text-[15px]">
                        At Charul Projects, our values are reflected in how we plan, manage and execute every project.
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
                                <span className="font-mono text-4xl font-normal tracking-tight text-brand-green leading-none md:text-5xl lg:text-[52px]">
                                    {v.n}
                                </span>
                                <div>
                                    <h3 className="text-[20px] font-medium leading-[1.2] tracking-[-0.02em] md:text-[22px] lg:text-[24px]">{v.title}</h3>
                                    <p className="mt-4 text-[14px] font-normal leading-[1.6] text-muted-foreground md:text-[15px]">
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
                    <span className="eyebrow font-mono">
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
