"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "Practice", href: "#practice" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
];

export function SiteNav() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bone/85 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4 md:px-12">
                <a
                    href="#top"
                    className="flex items-center"
                    onClick={() => setIsOpen(false)}
                >
                    <img
                        src="/charul-logo-light.webp"
                        alt="Charul Projects Pvt. Ltd."
                        width={1920}
                        height={525}
                        className="h-8 w-auto md:h-9"
                    />
                </a>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-6 text-xs tracking-[0.18em] text-foreground uppercase">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="transition-colors hover:text-brand-green"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile hamburger menu button */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                    aria-controls="mobile-nav-menu"
                    className="flex items-center justify-center p-1 text-foreground transition-colors hover:text-brand-green focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green md:hidden"
                >
                    {isOpen ? (
                        <X className="h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    )}
                </button>
            </div>

            {/* Mobile navigation menu */}
            <div
                id="mobile-nav-menu"
                className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
                    isOpen
                        ? "max-h-72 border-t border-border opacity-100"
                        : "max-h-0 border-t-0 opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex flex-col space-y-1 bg-bone/95 px-6 py-4 backdrop-blur-md">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="py-2.5 text-xs tracking-[0.18em] text-foreground uppercase transition-colors hover:text-brand-green"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}


export function Hero() {
    return (
        <header id="top" className="relative flex min-h-screen items-end overflow-hidden">
            <img
                src="/hero-construction.jpg"
                alt="Concrete structure under construction at golden hour with a tower crane"
                width={1920}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/25" />
            <div className="relative w-full px-6 pb-16 md:px-12 md:pb-20">
                <p className="eyebrow animate-rise text-brand-green">
                    Since 2004 · Nashik, Maharashtra
                </p>
                <h1 className="animate-rise mt-6 max-w-5xl text-[15vw] text-ink-foreground md:text-[9vw]">
                    Building
                    <br />
                    your visions
                </h1>
                <div className="mt-10 flex flex-col gap-8 border-t border-ink-foreground/20 pt-8 md:flex-row md:items-end md:justify-between">
                    <p className="max-w-xl text-sm leading-relaxed text-ink-foreground/75">
                        Project management, construction management and contracting for industry, healthcare,
                        homes and land — carried from the first sketch to the last handover.
                    </p>
                    <a
                        href="#projects"
                        className="inline-flex w-fit items-center gap-3 bg-brand-green px-6 py-3 text-xs tracking-[0.18em] text-ink uppercase transition-opacity hover:opacity-85"
                    >
                        See the work
                    </a>
                </div>
            </div>
        </header>
    );
}

export function Practice() {
    return (
        <section id="practice" className="px-6 py-24 md:px-12 md:py-36">
            <div className="grid gap-14 md:grid-cols-12">
                <div className="md:col-span-4">
                    <p className="eyebrow">About Us</p>
                    <h2 className="mt-6 text-4xl md:text-5xl">Trust is our wealth.</h2>
                </div>
                <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6">
                    <p>
                        Charul Projects exists for the client who wants one accountable partner instead of a
                        committee. We plan, cost, build and commission — and we stay until the building works
                        the way it was promised.
                    </p>
                    <p>
                        Hospitals, MIDC industrial sheds, apartments, bungalows, wineries and landscapes.
                        Different programmes, one method: understand the outcome the client needs, then hold
                        schedule, scope, cost and quality to it without compromise. Twenty years of work in and
                        around Nashik has been won almost entirely on referral.
                    </p>
                </div>
            </div>

            <figure className="relative mt-20 overflow-hidden">
                <img
                    src="/texture-blueprint.jpg"
                    alt="Hard hat and measuring tape resting on architectural drawings"
                    loading="lazy"
                    width={1600}
                    height={1008}
                    className="h-[45vh] w-full object-cover md:h-[60vh]"
                />
                <figcaption className="absolute inset-0 flex items-end bg-linear-to-t from-ink/80 to-transparent p-6 md:p-12">
                    <h2 className="max-w-2xl text-3xl text-ink-foreground md:text-5xl">
                        Drawings are a promise. Site is the proof.
                    </h2>
                </figcaption>
            </figure>
            <div className="mt-20 grid gap-4 border-t border-border pt-12 md:grid-cols-2 md:gap-6">
                <article className="group flex min-h-[260px] flex-col justify-between border border-border bg-card p-7 transition-colors duration-300 hover:border-brand-green md:p-9">
                    <p className="eyebrow">Mission</p>
                    <div>
                        <h3 className="mt-8 text-2xl md:text-3xl">
                            Turn vision into working buildings — on time, on scope, without compromise.
                        </h3>
                        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                            We plan, cost, build and commission so industry, healthcare, homes and land perform the
                            way they were promised — and we stay until they do.
                        </p>
                    </div>
                    <span className="mt-8 h-1 w-14 bg-accent opacity-35 transition-opacity duration-300 group-hover:opacity-100" />
                </article>
                <article className="group flex min-h-[260px] flex-col justify-between border border-border bg-card p-7 transition-colors duration-300 hover:border-brand-green md:p-9">
                    <p className="eyebrow">Vision</p>
                    <div>
                        <h3 className="mt-8 text-2xl md:text-3xl">
                            The most trusted project partner in and around Nashik.
                        </h3>
                        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                            A practice known for referral-won work, senior engineers on the brief, and buildings that
                            prove the drawings — project after project, decade after decade.
                        </p>
                    </div>
                    <span className="mt-8 h-1 w-14 bg-accent opacity-35 transition-opacity duration-300 group-hover:opacity-100" />
                </article>
            </div>
        </section>
    );
}


const services = [
    {
        n: "01",
        title: "Turnkey Projects",
        body: "Project management from the inception of an idea right through to operation and maintenance of the finished asset.",
    },
    {
        n: "02",
        title: "Management Consultancy",
        body: "Our core discipline. We read the client's need, then configure the exact combination of services that delivers the outcome.",
    },
    {
        n: "03",
        title: "Construction Management",
        body: "Professional management applied to planning, design and construction — controlling schedule, scope, cost and quality throughout.",
    },
    {
        n: "04",
        title: "General Contracting",
        body: "Single-point accountability on site. One team answerable for programme, workmanship, safety and the final handover.",
    },
];

export function Services() {
    return (
        <section className="px-6 pb-24 md:px-12 md:pb-32">
            <p className="eyebrow">What we do</p>
            <div className="mt-10">
                {services.map((s) => (
                    <div
                        key={s.n}
                        className="rule-line group grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
                    >
                        <span className="eyebrow md:col-span-1">{s.n}</span>
                        <h3 className="text-2xl transition-transform duration-300 group-hover:translate-x-2 md:col-span-5 md:text-4xl">
                            {s.title}
                        </h3>
                        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:col-span-6">
                            {s.body}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

const stats = [
    ["20+", "Years on site"],
    ["150+", "Projects delivered"],
    ["5", "Sectors served"],
    ["100%", "Repeat-client intent"],
];

export function Stats() {
    return (
        <section className="ink-panel px-6 py-16 md:px-12">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                {stats.map(([value, label]) => (
                    <div key={label}>
                        <p className="font-display text-5xl tracking-tight text-brand-green md:text-6xl">
                            {value}
                        </p>
                        <p className="eyebrow mt-3 text-ink-foreground/60">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

const sectors = [
    {
        n: "01",
        title: "Commercial",
        body: "Offices, hospitals and institutional buildings planned for operations from day one — clinical flow, services and finishes that hold up under use.",
    },
    {
        n: "02",
        title: "Residential",
        body: "Apartments, bungalows and housing programmes delivered on a fixed schedule, with daylight, ventilation and finishes built for a long life.",
    },
    {
        n: "03",
        title: "Industrial",
        body: "MIDC sheds, foundries and production units sized for crane loads, foundations and machinery dates — not a generic warehouse shell.",
    },
    {
        n: "04",
        title: "Farm & hospitality",
        body: "Wineries, farmhouses and estate buildings set into the land so production, hospitality and landscape work as one place.",
    },
    {
        n: "05",
        title: "Landscape",
        body: "Grading, water, stone and planting shaped into working estates and outdoor rooms that read as intentional from the first walk.",
    },
];

export function Sectors() {
    return (
        <section id="sectors" className="px-6 py-24 md:px-12 md:py-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="eyebrow">Sectors</p>
                    <h2 className="mt-3 max-w-2xl text-4xl md:text-6xl">Kinds of work we deliver.</h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Commercial and residential at the core — with industrial, hospitality and landscape
                    programmes carried the same way.
                </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sectors.map((s) => (
                    <article
                        key={s.n}
                        className="group flex min-h-[280px] flex-col justify-between border border-border bg-card p-7 transition-colors duration-300 hover:border-brand-green"
                    >
                        <span className="font-display text-5xl tracking-tight text-brand-green md:text-6xl">
                            {s.n}
                        </span>
                        <div>
                            <h3 className="text-2xl md:text-3xl">{s.title}</h3>
                            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                        </div>
                        <span className="mt-8 h-1 w-14 bg-accent opacity-35 transition-opacity duration-300 group-hover:opacity-100" />
                    </article>
                ))}
            </div>
        </section>
    );
}

export function Testimonials() {
    return (
        <section className="px-6 py-24 md:px-12 md:py-32">
            <p className="eyebrow">What people say</p>
            <div className="mt-12 grid gap-12 md:grid-cols-2">
                <blockquote className="text-2xl leading-snug md:text-3xl">
                    “We gave Charul the contracting of our office construction. On-time delivery, with no
                    compromise on quality.”
                </blockquote>
                <blockquote className="text-2xl leading-snug md:text-3xl">
                    “A tagline they actually live up to, and a team that works hard. Trustworthy for any
                    project consultancy.”
                </blockquote>
            </div>
        </section>
    );
}

export function Contact() {
    return (
        <footer id="contact" className="ink-panel relative overflow-hidden px-6 py-24 md:px-12 md:py-32">
            <h2 className="max-w-3xl text-5xl text-ink-foreground md:text-8xl">Let's build yours next.</h2>
            <div className="mt-16 grid gap-10 border-t border-ink-foreground/20 pt-10 md:grid-cols-3">
                <a href="tel:+919422272181" className="group">
                    <p className="eyebrow text-ink-foreground/50">Call</p>
                    <p className="mt-2 text-xl text-ink-foreground transition-colors group-hover:text-brand-green">
                        +91 942 227 2181
                    </p>
                </a>
                <a href="mailto:info@charulprojects.com" className="group">
                    <p className="eyebrow text-ink-foreground/50">Email</p>
                    <p className="mt-2 text-xl text-ink-foreground transition-colors group-hover:text-brand-green">
                        info@charulprojects.com
                    </p>
                </a>
                <div>
                    <p className="eyebrow text-ink-foreground/50">Studio</p>
                    <p className="mt-2 text-xl text-ink-foreground">Nashik, Maharashtra</p>
                </div>
            </div>
            <p className="eyebrow mt-16 text-ink-foreground/40">Charul Projects · Est. 2004</p>
        </footer>
    );
}