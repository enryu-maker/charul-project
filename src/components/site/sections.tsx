"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Menu, X } from "lucide-react";
import { createLead, mediaUrl } from "@/lib/api";
import type {
    ApiContact,
    ApiEquipment,
    ApiPractice,
    ApiReview,
    ApiService,
    ApiStat,
} from "@/lib/api/types";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const navLinks = [
    { label: "Practice", href: "#practice" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
];

export function SiteNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navLinks.map((l) => l.href.substring(1));
            const scrollPosition = window.scrollY + 140;

            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    return;
                }
            }
            if (window.scrollY < 180) {
                setActiveSection("");
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                ? "border-b border-border/80 bg-bone/90 shadow-xs backdrop-blur-md py-3.5 md:py-4"
                : "border-b border-border/40 bg-bone/75 backdrop-blur-sm py-4 md:py-5"
                }`}
        >
            <div className="flex items-center justify-between px-6 md:px-12">
                <a
                    href="#top"
                    className="group flex items-center transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => setIsOpen(false)}
                >
                    <img
                        src="/charul-logo-light.webp"
                        alt="Charul Projects Pvt. Ltd."
                        width={1920}
                        height={525}
                        className="h-8 w-auto transition-opacity duration-300 group-hover:opacity-90 md:h-9"
                    />
                </a>

                <div className="hidden md:flex items-center gap-7 font-mono text-xs md:text-[13px] tracking-[0.14em] uppercase">
                    {navLinks.map((link) => {
                        const sectionId = link.href.substring(1);
                        const isActive = activeSection === sectionId;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`group relative py-1.5 transition-colors duration-300 ${isActive
                                    ? "text-foreground font-medium"
                                    : "text-foreground/75 hover:text-foreground font-normal"
                                    }`}
                            >
                                <span className="relative z-10 transition-transform duration-200 inline-block group-hover:-translate-y-0.5">
                                    {link.label}
                                </span>
                                <span
                                    className={`absolute bottom-0 left-0 h-[2px] bg-brand-green transition-all duration-300 ease-out ${isActive
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                        }`}
                                />
                            </a>
                        );
                    })}

                    <a
                        href="#contact"
                        className="ml-3 inline-flex items-center gap-2 border border-foreground/20 bg-card/60 px-4 py-2 font-sans text-xs md:text-[13px] font-medium tracking-[0.10em] text-foreground uppercase transition-all duration-300 hover:border-brand-green hover:bg-brand-green hover:text-ink hover:shadow-xs active:scale-[0.98]"
                    >
                        Get in Touch
                    </a>
                </div>

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                    aria-controls="mobile-nav-menu"
                    className="flex items-center justify-center p-2 text-foreground transition-all duration-300 hover:text-brand-green hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green md:hidden"
                >
                    {isOpen ? (
                        <X className="h-6 w-6 transition-transform duration-300 rotate-0 hover:rotate-90" aria-hidden="true" />
                    ) : (
                        <Menu className="h-6 w-6 transition-transform duration-300" aria-hidden="true" />
                    )}
                </button>
            </div>

            <div
                id="mobile-nav-menu"
                className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isOpen
                    ? "max-h-96 border-t border-border opacity-100"
                    : "max-h-0 border-t-0 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col space-y-1 bg-bone/95 px-6 py-5 backdrop-blur-md">
                    {navLinks.map((link) => {
                        const sectionId = link.href.substring(1);
                        const isActive = activeSection === sectionId;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center justify-between py-3 font-mono text-xs tracking-[0.14em] uppercase transition-all duration-200 border-b border-border/40 last:border-b-0 ${isActive
                                    ? "text-brand-green font-medium pl-2"
                                    : "text-foreground hover:text-brand-green hover:pl-2 font-normal"
                                    }`}
                            >
                                <span>{link.label}</span>
                                <span
                                    className={`h-1.5 w-1.5 rounded-full bg-brand-green transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                />
                            </a>
                        );
                    })}
                    <div className="pt-3">
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center w-full bg-brand-green px-6 py-3 font-sans text-xs font-medium tracking-[0.10em] text-ink uppercase transition-opacity hover:opacity-85"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export function Hero({ image }: { image?: string | null }) {
    const src = mediaUrl(image) || "/hero-construction.jpg";

    return (
        <header id="top" className="relative flex min-h-screen items-end overflow-hidden">
            <img
                src={src}
                alt="Concrete structure under construction at golden hour with a tower crane"
                width={1920}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/25" />
            <div className="relative w-full px-6 pb-16 md:px-12 md:pb-20">
                <p className="eyebrow animate-rise text-brand-green">
                    Since 1997 · Nashik, Maharashtra
                </p>
                <h1 className="animate-rise mt-6 max-w-5xl text-[15vw] text-ink-foreground md:text-[9vw]">
                    Building
                    <br />
                    your vision
                </h1>
                <div className="mt-10 flex flex-col gap-8 border-t border-ink-foreground/20 pt-8 md:flex-row md:items-end md:justify-between">
                    <p className="max-w-xl text-sm leading-relaxed text-ink-foreground/75">
                        Construction contracting and project execution, managed by one accountable partner from planning to handover.
                    </p>
                    <a
                        href="#projects"
                        className="inline-flex w-fit items-center gap-3 bg-brand-green px-6 py-3 font-sans text-xs font-medium tracking-[0.10em] text-ink uppercase transition-opacity hover:opacity-85 md:text-[13px]"
                    >
                        See the work
                    </a>
                </div>
            </div>
        </header>
    );
}

const fallbackPractice = {
    title: "About Charul Projects",
    description:
        "Established in 1997, Charul Projects is a Nashik-based construction and project execution firm serving industrial, healthcare, residential, commercial and hospitality projects.\n\nOur experience spans industrial facilities and MIDC projects, hospitals, apartments, bungalows, wineries, farmhouses, and landscape developments across Nashik and surrounding regions of Maharashtra.\n\nOver the years, our capabilities have grown through the projects we have undertaken, the challenges we have solved and the relationships we have built with clients, consultants, vendors and execution partners.\n\nToday, we bring this experience together to provide clients with a dependable partner for construction execution, project management and site coordination.\n\nMuch of our growth has come through referrals and repeat relationships, a reflection of the trust built through our work.",
    image: "/texture-blueprint.jpg",
};

const fallbackMissionVision = [
    {
        id: "vision",
        title: "VISION",
        description:
            "To set a trusted benchmark for construction execution.\n\nTo be recognized for reliable delivery, disciplined project management, quality construction, and responsible building practices, creating lasting value for our clients and the communities we build for.",
    },
    {
        id: "mission",
        title: "MISSION",
        description:
            "To deliver every project with discipline, quality, and accountability.\n\nThrough structured planning, responsible execution, and strong project management, we strive to deliver reliable outcomes and build lasting trust with every client.",
    },
];

export function Practice({ items = [] }: { items?: ApiPractice[] }) {
    const primary = items[0];
    const title = primary?.title || fallbackPractice.title;
    const description = primary?.description || fallbackPractice.description;
    const image = mediaUrl(primary?.image) || fallbackPractice.image;
    const paragraphs = description.split(/\n+/).filter(Boolean);
    const extras =
        items.length > 1
            ? items.slice(1).map((item) => ({
                id: String(item.id),
                title: item.title,
                description: item.description,
            }))
            : fallbackMissionVision;

    return (
        <section id="practice" className="px-6 py-24 md:px-12 md:py-36">
            <div className="grid gap-14 md:grid-cols-12">
                <div className="md:col-span-4">
                    <p className="eyebrow">About Us</p>
                    <h2 className="mt-6 text-[36px] font-medium leading-[1.1] tracking-[-0.025em] md:text-[44px] lg:text-[56px]">{title}</h2>
                </div>
                <div className="space-y-6 text-[15px] font-normal leading-[1.6] text-muted-foreground md:col-span-7 md:col-start-6 md:text-[16px] lg:text-[17px]">
                    {paragraphs.map((p) => (
                        <p key={p.slice(0, 48)}>{p}</p>
                    ))}
                </div>
            </div>

            <figure className="relative mt-20 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    width={1600}
                    height={1008}
                    className="h-[45vh] w-full object-cover md:h-[60vh]"
                />
                <figcaption className="absolute inset-0 flex items-end bg-linear-to-t from-ink/80 to-transparent p-6 md:p-12">
                    <h2 className="max-w-2xl text-[26px] font-medium leading-[1.15] tracking-[-0.025em] text-ink-foreground sm:text-[32px] md:text-[38px] lg:text-[42px]">
                        Over two decades of building experience in Nashik.
                    </h2>
                </figcaption>
            </figure>

            <div id="about" className="mt-20 grid gap-4 border-t border-border pt-12 md:grid-cols-2 md:gap-6">
                {extras.map((item) => {
                    const lines = item.description.split(/\n+/).map((l) => l.trim()).filter(Boolean);
                    const subheadline = lines.length > 1 ? lines[0] : null;
                    const body = lines.length > 1 ? lines.slice(1) : lines;

                    return (
                        <article
                            key={item.id}
                            className="group flex min-h-[260px] flex-col justify-between border border-border bg-card p-7 transition-colors duration-300 hover:border-brand-green md:p-9"
                        >
                            <p className="eyebrow font-medium text-foreground">{item.title}</p>
                            <div>
                                {subheadline ? (
                                    <>
                                        <p className="mt-8 text-[15px] font-semibold leading-[1.4] text-foreground md:text-[16px] lg:text-[17px]">
                                            {subheadline}
                                        </p>
                                        <div className="mt-4 space-y-4">
                                            {body.map((p, idx) => (
                                                <p key={idx} className="text-[14px] font-normal leading-[1.6] text-muted-foreground md:text-[15px]">
                                                    {p}
                                                </p>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <p className="mt-8 text-[14px] font-normal leading-[1.6] text-muted-foreground whitespace-pre-line md:text-[15px]">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                            <span className="mt-8 h-1 w-14 bg-accent opacity-35 transition-opacity duration-300 group-hover:opacity-100" />
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

const fallbackServices = [
    {
        id: 1,
        name: "Turnkey Execution",
        description:
            "We manage the complete construction journey - coordinating planning, procurement, site execution, quality, commissioning and handover under one accountable partner.",
    },
    {
        id: 2,
        name: "Construction Management",
        description:
            "We manage the day-to-day construction process across schedule, cost, quality, resources and coordination, keeping the project moving from one stage to the next.",
    },
    {
        id: 3,
        name: "General Contracting",
        description:
            "We take responsibility for the agreed construction scope and coordinate the teams, trades, materials and site activities required to deliver it safely and to the required standard.",
    },
    {
        id: 4,
        name: "Project Management",
        description:
            "We bring structure to planning, coordination, progress monitoring and stakeholder management - helping clients make timely decisions and maintain control throughout execution.",
    },
];

export function Services({ items = [] }: { items?: ApiService[] }) {
    const list = items.length > 0 ? items : fallbackServices;

    return (
        <section className="px-6 pb-24 md:px-12 md:pb-32">
            <p className="eyebrow">What we do</p>
            <div className="mt-10">
                {list.map((s, i) => (
                    <div
                        key={s.id}
                        className="rule-line group grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
                    >
                        <span className="eyebrow font-mono text-[12px] md:col-span-1 md:text-[13px]">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="text-[20px] font-medium leading-[1.2] tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 md:col-span-5 md:text-[24px] lg:text-[28px]">
                            {s.name}
                        </h3>
                        <p className="max-w-xl text-[14px] font-normal leading-[1.6] text-muted-foreground md:col-span-6 md:text-[15px]">
                            {s.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

const fallbackStats = [
    { id: 1, value: "25+", label: "Years on site" },
    { id: 2, value: "150+", label: "Projects delivered" },
    { id: 3, value: "5", label: "Sectors served" },
    { id: 4, value: "100%", label: "Repeat-client intent" },
];

export function Stats({ items = [] }: { items?: ApiStat[] }) {
    const list = items.length > 0 ? items : fallbackStats;

    return (
        <section className="ink-panel px-6 py-16 md:px-12">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                {list.map((s) => (
                    <div key={s.id}>
                        <p className="font-sans text-4xl font-medium tracking-tight text-brand-green leading-none md:text-5xl lg:text-[56px]">
                            {s.value}
                        </p>
                        <p className="eyebrow mt-3 text-ink-foreground/60">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

const staticIndustries = [
    {
        id: 1,
        name: "Commercial",
        body: "Offices, hospitals and institutional buildings delivered around operational needs - with coordinated services, durable finishes and execution planned from day one.",
    },
    {
        id: 2,
        name: "Residential",
        body: "Apartments, bungalows and housing developments delivered with disciplined planning, quality execution and attention to comfort, durability and timelines.",
    },
    {
        id: 3,
        name: "Industrial",
        body: "MIDC sheds, factories, foundries and production facilities built around structural requirements, crane loads, foundations and machinery installation - not a generic shell.",
    },
    {
        id: 4,
        name: "Farmhouses",
        body: "Farmhouses, estates and rural properties developed with careful attention to the land, access, utilities, outdoor spaces and the way the property is meant to be used.",
    },
    {
        id: 5,
        name: "Hospitality",
        body: "Hotels, resorts, wineries and hospitality spaces delivered with coordinated infrastructure, guest experience, operational requirements and long-term durability in mind.",
    },
    {
        id: 6,
        name: "Landscape & Site Development",
        body: "Grading, drainage, water systems, hardscape and planting integrated with the site - creating functional, durable and cohesive outdoor spaces.",
    },
];

export function Sectors() {
    return (
        <section id="sectors" className="px-6 py-24 md:px-12 md:py-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="eyebrow">Industries</p>
                    <h2 className="mt-3 max-w-2xl text-[36px] font-medium leading-[1.1] tracking-[-0.025em] md:text-[44px] lg:text-[56px]">Our Areas of Expertise</h2>
                </div>
                <p className="max-w-sm text-[14px] font-normal leading-[1.5] text-muted-foreground md:text-[15px]">
                    Commercial and residential at the core - with industrial, hospitality and landscape
                    programmes carried the same way.
                </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {staticIndustries.map((c, i) => (
                    <article
                        key={c.id}
                        className="group flex min-h-[280px] flex-col justify-between border border-border bg-card p-7 transition-colors duration-300 hover:border-brand-green"
                    >
                        <span className="font-mono text-4xl font-normal tracking-tight text-brand-green leading-none md:text-5xl lg:text-[48px]">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                            <h3 className="text-[20px] font-medium leading-[1.2] tracking-[-0.02em] md:text-[22px] lg:text-[24px]">{c.name}</h3>
                            <p className="mt-4 text-[14px] font-normal leading-[1.6] text-muted-foreground md:text-[15px]">{c.body}</p>
                        </div>
                        <span className="mt-8 h-1 w-14 bg-accent opacity-35 transition-opacity duration-300 group-hover:opacity-100" />
                    </article>
                ))}
            </div>
        </section>
    );
}

export function Equipment({ items = [] }: { items?: ApiEquipment[] }) {
    return (
        <section id="equipment" className="px-6 py-24 md:px-12 md:py-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="eyebrow">Plant & Machinery</p>
                    <h2 className="mt-3 max-w-3xl text-[36px] font-medium leading-[1.1] tracking-[-0.025em] md:text-[44px] lg:text-[56px]">
                        Equipment & Materials which we own
                    </h2>
                </div>
                <p className="max-w-sm text-[14px] font-normal leading-[1.5] text-muted-foreground md:text-[15px]">
                    Dedicated machinery and high-grade shuttering assets ensuring self-reliance, schedule reliability and consistent build quality.
                </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                {items.map((item, index) => {
                    const sr = String(index + 1).padStart(2, "0");
                    const imageSrc = mediaUrl(item.image);

                    return (
                        <article
                            key={item.id ?? sr}
                            className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden border border-border bg-card p-6 md:p-7 transition-colors duration-300 hover:border-brand-green"
                        >
                            {imageSrc ? (
                                <img
                                    src={imageSrc}
                                    alt={item.name}
                                    loading="lazy"
                                    width={800}
                                    height={600}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            ) : null}
                            {imageSrc ? (
                                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/65 to-ink/40" />
                            ) : null}

                            <div className="relative z-10">
                                <span className="font-mono text-3xl font-normal tracking-tight text-brand-green leading-none md:text-4xl lg:text-[40px]">
                                    {sr}
                                </span>
                                <h3 className={`mt-4 text-[18px] font-medium leading-[1.2] tracking-[-0.02em] md:text-[20px] lg:text-[22px] ${imageSrc ? "text-ink-foreground" : ""}`}>
                                    {item.name}
                                </h3>
                            </div>

                            <div className="relative z-10">
                                <div className={`mt-6 flex items-center justify-between border-t pt-4 text-sm ${imageSrc ? "border-ink-foreground/20 text-ink-foreground/75" : "border-border/60 text-muted-foreground"}`}>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-mono text-[11px] uppercase tracking-[0.12em] ${imageSrc ? "text-ink-foreground/60" : "text-muted-foreground"}`}>
                                            Unit
                                        </span>
                                        <span className="inline-flex items-center rounded bg-brand-green/10 px-2 py-0.5 font-mono text-[11px] font-medium text-brand-green">
                                            {item.unit}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`font-mono text-[11px] uppercase tracking-[0.12em] ${imageSrc ? "text-ink-foreground/60" : "text-muted-foreground"}`}>
                                            Qty
                                        </span>
                                        <span className={`font-mono text-[18px] font-medium md:text-[20px] ${imageSrc ? "text-ink-foreground" : "text-foreground"}`}>
                                            {item.quantity}
                                        </span>
                                    </div>
                                </div>
                                <span className="mt-4 block h-1 w-14 bg-accent opacity-35 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

const fallbackReviews: ApiReview[] = [
    {
        id: 1,
        name: "Client",
        description:
            "We gave Charul the contracting of our office construction. On-time delivery, with no compromise on quality.",
        photo: null,
        video: null,
        type: "text",
        created_at: "",
    },
    {
        id: 2,
        name: "Client",
        description:
            "A tagline they actually live up to, and a team that works hard. Trustworthy for any project consultancy.",
        photo: null,
        video: null,
        type: "text",
        created_at: "",
    },
];

export function Testimonials({ items = [] }: { items?: ApiReview[] }) {
    const list = items.length > 0 ? items : fallbackReviews;
    const autoplay = useRef(
        Autoplay({
            delay: 2500,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        })
    );

    return (
        <section className="px-6 py-24 md:px-12 md:py-32">
            <div className="flex items-end justify-between gap-6">
                <p className="eyebrow">What people say</p>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: list.length > 1,
                }}
                plugins={list.length > 1 ? [autoplay.current] : []}
                className="relative mt-12 w-full"
            >
                <CarouselContent className="-ml-4 md:-ml-6">
                    {list.map((r) => {
                        const photo = mediaUrl(r.photo);
                        const video = mediaUrl(r.video);
                        return (
                            <CarouselItem
                                key={r.id}
                                className="basis-full pl-4 sm:basis-[85%] md:basis-[70%] lg:basis-[55%] md:pl-6"
                            >
                                <article className="flex h-full min-h-[280px] flex-col justify-between gap-8 border border-border bg-card p-7 md:min-h-[320px] md:p-10">
                                    <div className="flex flex-col gap-6">
                                        {r.type === "video" && video ? (
                                            <video
                                                src={video}
                                                controls
                                                poster={photo || undefined}
                                                className="aspect-video w-full object-cover"
                                            />
                                        ) : photo ? (
                                            <img
                                                src={photo}
                                                alt={r.name}
                                                className="h-14 w-14 rounded-full object-cover"
                                            />
                                        ) : null}
                                        <blockquote className="text-[18px] font-normal leading-[1.4] text-foreground tracking-[-0.01em] md:text-[20px] lg:text-[22px]">
                                            “{r.description}”
                                        </blockquote>
                                    </div>
                                    <p className="eyebrow text-muted-foreground">{r.name}</p>
                                </article>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                <div className="mt-8 flex items-center gap-3">
                    <CarouselPrevious
                        variant="outline"
                        className="static translate-y-0 rounded-none border-border bg-transparent text-foreground hover:bg-transparent hover:text-brand-green disabled:opacity-30"
                    />
                    <CarouselNext
                        variant="outline"
                        className="static translate-y-0 rounded-none border-border bg-transparent text-foreground hover:bg-transparent hover:text-brand-green disabled:opacity-30"
                    />
                </div>
            </Carousel>
        </section>
    );
}

const fallbackContact: ApiContact = {
    id: 0,
    phone: "+91 942 227 2181",
    email: "info@charulprojects.com",
    location: "Nashik",
    maps_url: null,
    instagram: "https://www.instagram.com/charulprojects?igsi=a3hicnA5OHFpejR2",
    facebook: "https://www.linkedin.com/in/chinmay-deshpande-aa583375/?skipRedirect=true",
};

export function Contact({ data }: { data?: ApiContact | null }) {
    const contact = data || fallbackContact;
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [error, setError] = useState("");

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        setStatus("sending");
        setError("");

        const name = String(formData.get("name") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const firmName = String(formData.get("firm_name") || "").trim();
        const city = String(formData.get("city") || "").trim();
        const notes = String(formData.get("message") || "").trim();

        const fullMessage = [
            firmName ? `Firm: ${firmName}` : "",
            city ? `City: ${city}` : "",
            notes,
        ]
            .filter(Boolean)
            .join("\n");

        const result = await createLead({
            name,
            email: email || undefined,
            phone: phone || undefined,
            message: fullMessage || undefined,
        });

        if (result.ok) {
            setStatus("sent");
            form.reset();
            return;
        }

        setStatus("error");
        setError(result.error || "Something went wrong.");
    }

    const telHref = contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : undefined;
    const mailHref = contact.email ? `mailto:${contact.email}` : undefined;
    const instagramUrl = contact.instagram || "https://www.instagram.com/charulprojects?igsi=a3hicnA5OHFpejR2";
    const linkedinUrl = contact.facebook || "https://www.linkedin.com/in/chinmay-deshpande-aa583375/?skipRedirect=true";

    return (
        <footer id="contact" className="ink-panel relative overflow-hidden px-6 py-24 md:px-12 md:py-32">
            <h2 className="max-w-3xl text-[36px] font-medium leading-[1.1] tracking-[-0.025em] text-ink-foreground md:text-[44px] lg:text-[56px]">
                Have a project to build?
            </h2>

            <div className="mt-16 grid gap-12 border-t border-ink-foreground/20 pt-12 lg:grid-cols-12 lg:gap-16">
                <div className="flex flex-col gap-10 lg:col-span-5">
                    <p className="eyebrow text-ink-foreground/50">Get in touch</p>

                    {contact.phone ? (
                        <a href={telHref} className="group block">
                            <p className="eyebrow text-ink-foreground/50">Call</p>
                            <p className="mt-2 text-[20px] font-medium tracking-[-0.02em] text-ink-foreground transition-colors group-hover:text-brand-green md:text-[24px] lg:text-[26px]">
                                {contact.phone}
                            </p>
                        </a>
                    ) : null}

                    {contact.email ? (
                        <a href={mailHref} className="group block">
                            <p className="eyebrow text-ink-foreground/50">Email</p>
                            <p className="mt-2 break-all text-[20px] font-medium tracking-[-0.02em] text-ink-foreground transition-colors group-hover:text-brand-green md:text-[24px] lg:text-[26px]">
                                {contact.email}
                            </p>
                        </a>
                    ) : null}

                    <div>
                        <p className="eyebrow text-ink-foreground/50">Location</p>
                        <p className="mt-2 text-[20px] font-medium tracking-[-0.02em] text-ink-foreground md:text-[24px] lg:text-[26px]">Nashik</p>
                        {contact.maps_url ? (
                            <a
                                href={contact.maps_url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-1 block font-mono text-xs text-brand-green transition-colors hover:underline md:text-[13px]"
                            >
                                Google Maps location
                            </a>
                        ) : (
                            <p className="mt-1 font-mono text-xs text-ink-foreground/50 md:text-[13px]">Google Maps location</p>
                        )}
                    </div>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4 border border-ink-foreground/15 bg-ink-foreground/5 p-6 md:p-8 lg:col-span-7"
                >
                    <div className="mb-2">
                        <p className="eyebrow text-brand-green">Project Details</p>
                        <p className="mt-3 text-[14px] font-normal leading-[1.5] text-ink-foreground/60 md:text-[15px]">
                            Tell us about the project, location, approximate size, timeline or anything else we should know.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                            <span className="eyebrow text-ink-foreground/40">Name</span>
                            <input
                                name="name"
                                required
                                placeholder="Your name"
                                className="mt-2 w-full border border-ink-foreground/20 bg-transparent px-4 py-3 font-sans text-[14px] text-ink-foreground placeholder:text-ink-foreground/35 focus:border-brand-green focus:outline-none md:text-[15px]"
                            />
                        </label>
                        <label className="block">
                            <span className="eyebrow text-ink-foreground/40">Phone</span>
                            <input
                                name="phone"
                                placeholder="Mobile number"
                                className="mt-2 w-full border border-ink-foreground/20 bg-transparent px-4 py-3 font-sans text-[14px] text-ink-foreground placeholder:text-ink-foreground/35 focus:border-brand-green focus:outline-none md:text-[15px]"
                            />
                        </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                            <span className="eyebrow text-ink-foreground/40">Email</span>
                            <input
                                name="email"
                                type="email"
                                placeholder="you@company.com"
                                className="mt-2 w-full border border-ink-foreground/20 bg-transparent px-4 py-3 font-sans text-[14px] text-ink-foreground placeholder:text-ink-foreground/35 focus:border-brand-green focus:outline-none md:text-[15px]"
                            />
                        </label>
                        <label className="block">
                            <span className="eyebrow text-ink-foreground/40">Firm name</span>
                            <input
                                name="firm_name"
                                placeholder="Company / Architecture firm"
                                className="mt-2 w-full border border-ink-foreground/20 bg-transparent px-4 py-3 font-sans text-[14px] text-ink-foreground placeholder:text-ink-foreground/35 focus:border-brand-green focus:outline-none md:text-[15px]"
                            />
                        </label>
                    </div>

                    <label className="block">
                        <span className="eyebrow text-ink-foreground/40">City</span>
                        <input
                            name="city"
                            placeholder="Nashik, Pune, Mumbai…"
                            className="mt-2 w-full border border-ink-foreground/20 bg-transparent px-4 py-3 font-sans text-[14px] text-ink-foreground placeholder:text-ink-foreground/35 focus:border-brand-green focus:outline-none md:text-[15px]"
                        />
                    </label>

                    <label className="block">
                        <span className="eyebrow text-ink-foreground/40">Project notes</span>
                        <textarea
                            name="message"
                            rows={4}
                            placeholder="Sector, location, approximate size, timeline or anything else we should know…"
                            className="mt-2 w-full resize-y border border-ink-foreground/20 bg-transparent px-4 py-3 font-sans text-[14px] text-ink-foreground placeholder:text-ink-foreground/35 focus:border-brand-green focus:outline-none md:text-[15px]"
                        />
                    </label>

                    <div className="mt-2 flex flex-wrap items-center gap-4">
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="inline-flex w-fit items-center gap-3 bg-brand-green px-6 py-3 font-sans text-xs font-medium tracking-[0.10em] text-ink uppercase transition-opacity hover:opacity-85 disabled:opacity-60 md:text-[13px]"
                        >
                            {status === "sending" ? "Sending…" : "START YOUR PROJECT"}
                        </button>
                        {status === "sent" ? (
                            <p className="font-mono text-sm text-brand-green">Received - we&apos;ll get back to you.</p>
                        ) : null}
                        {status === "error" ? <p className="font-mono text-sm text-red-300">{error}</p> : null}
                    </div>
                </form>
            </div>

            <div className="mt-20 flex flex-col gap-6 border-t border-ink-foreground/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
                    <p className="eyebrow text-ink-foreground/40">Charul Projects · Est. 1997</p>
                    <p className="font-mono text-xs text-ink-foreground/50 md:text-[13px]">Nashik</p>
                    {contact.email ? (
                        <a
                            href={mailHref}
                            className="font-mono text-xs text-ink-foreground/50 transition-colors hover:text-brand-green md:text-[13px]"
                        >
                            {contact.email}
                        </a>
                    ) : null}
                </div>

                <div className="flex items-center gap-6">
                    {instagramUrl ? (
                        <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="eyebrow text-ink-foreground/60 transition-colors hover:text-brand-green"
                        >
                            Instagram
                        </a>
                    ) : (
                        <span className="eyebrow text-ink-foreground/25">Instagram</span>
                    )}
                    {linkedinUrl ? (
                        <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="eyebrow text-ink-foreground/60 transition-colors hover:text-brand-green"
                        >
                            LinkedIn
                        </a>
                    ) : (
                        <span className="eyebrow text-ink-foreground/25">LinkedIn</span>
                    )}
                </div>
            </div>
        </footer>
    );
}



