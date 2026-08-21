"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Menu, X } from "lucide-react";
import { createLead, mediaUrl } from "@/lib/api";
import type {
    ApiCategory,
    ApiContact,
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

const fallbackPractice = {
    title: "Trust is our wealth.",
    description:
        "Charul Projects exists for the client who wants one accountable partner instead of a committee. We plan, cost, build and commission — and we stay until the building works the way it was promised.\n\nHospitals, MIDC industrial sheds, apartments, bungalows, wineries and landscapes. Different programmes, one method: understand the outcome the client needs, then hold schedule, scope, cost and quality to it without compromise. Twenty years of work in and around Nashik has been won almost entirely on referral.",
    image: "/texture-blueprint.jpg",
};

export function Practice({ items = [] }: { items?: ApiPractice[] }) {
    const primary = items[0];
    const title = primary?.title || fallbackPractice.title;
    const description = primary?.description || fallbackPractice.description;
    const image = mediaUrl(primary?.image) || fallbackPractice.image;
    const paragraphs = description.split(/\n+/).filter(Boolean);

    return (
        <section id="practice" className="px-6 py-24 md:px-12 md:py-36">
            <div className="grid gap-14 md:grid-cols-12">
                <div className="md:col-span-4">
                    <p className="eyebrow">About Us</p>
                    <h2 className="mt-6 text-4xl md:text-5xl">{title}</h2>
                </div>
                <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6">
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
                    <h2 className="max-w-2xl text-3xl text-ink-foreground md:text-5xl">
                        Drawings are a promise. Site is the proof.
                    </h2>
                </figcaption>
            </figure>
            <div id="about" className="mt-20 grid gap-4 border-t border-border pt-12 md:grid-cols-2 md:gap-6">
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

const fallbackServices = [
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

export function Services({ items = [] }: { items?: ApiService[] }) {
    const list =
        items.length > 0
            ? items.map((s, i) => ({
                  n: String(i + 1).padStart(2, "0"),
                  title: s.name,
                  body: s.description,
              }))
            : fallbackServices;

    return (
        <section className="px-6 pb-24 md:px-12 md:pb-32">
            <p className="eyebrow">What we do</p>
            <div className="mt-10">
                {list.map((s) => (
                    <div
                        key={s.n + s.title}
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

const fallbackStats: [string, string][] = [
    ["20+", "Years on site"],
    ["150+", "Projects delivered"],
    ["5", "Sectors served"],
    ["100%", "Repeat-client intent"],
];

export function Stats({ items = [] }: { items?: ApiStat[] }) {
    const list =
        items.length > 0
            ? items.map((s) => [s.value, s.label] as [string, string])
            : fallbackStats;

    return (
        <section className="ink-panel px-6 py-16 md:px-12">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                {list.map(([value, label]) => (
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

const fallbackSectors = [
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

const sectorBodies: Record<string, string> = Object.fromEntries(
    fallbackSectors.map((s) => [s.title.toLowerCase(), s.body])
);

export function Sectors({ items = [] }: { items?: ApiCategory[] }) {
    const list =
        items.length > 0
            ? items.map((c, i) => ({
                  n: String(i + 1).padStart(2, "0"),
                  title: c.name,
                  body:
                      sectorBodies[c.name.toLowerCase()] ||
                      `Projects delivered across ${c.name.toLowerCase()} programmes — planned, built and handed over with the same accountable method.`,
              }))
            : fallbackSectors;

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
                {list.map((s) => (
                    <article
                        key={s.n + s.title}
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

const fallbackReviews = [
    {
        id: 1,
        name: "Client",
        description:
            "We gave Charul the contracting of our office construction. On-time delivery, with no compromise on quality.",
        photo: null as string | null,
        video: null as string | null,
        type: "text" as const,
    },
    {
        id: 2,
        name: "Client",
        description:
            "A tagline they actually live up to, and a team that works hard. Trustworthy for any project consultancy.",
        photo: null as string | null,
        video: null as string | null,
        type: "text" as const,
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
                                        <blockquote className="text-2xl leading-snug md:text-3xl lg:text-4xl">
                                            “{r.description}”
                                        </blockquote>
                                    </div>
                                    <p className="eyebrow">{r.name}</p>
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
    location: "Nashik, Maharashtra",
    maps_url: null,
    instagram: null,
    facebook: null,
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

        const result = await createLead({
            name: String(formData.get("name") || "").trim(),
            email: String(formData.get("email") || "").trim() || undefined,
            phone: String(formData.get("phone") || "").trim() || undefined,
            message: String(formData.get("message") || "").trim() || undefined,
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

    return (
        <footer id="contact" className="ink-panel relative overflow-hidden px-6 py-24 md:px-12 md:py-32">
            <h2 className="max-w-3xl text-5xl text-ink-foreground md:text-7xl lg:text-8xl">
                Let&apos;s build yours next.
            </h2>

            <div className="mt-16 grid gap-12 border-t border-ink-foreground/20 pt-12 lg:grid-cols-12 lg:gap-16">
                {/* Contact details */}
                <div className="flex flex-col gap-10 lg:col-span-5">
                    <p className="eyebrow text-ink-foreground/50">Get in touch</p>

                    {contact.phone ? (
                        <a href={telHref} className="group block">
                            <p className="eyebrow text-ink-foreground/50">Call</p>
                            <p className="mt-2 text-2xl text-ink-foreground transition-colors group-hover:text-brand-green md:text-3xl">
                                {contact.phone}
                            </p>
                        </a>
                    ) : null}

                    {contact.email ? (
                        <a href={mailHref} className="group block">
                            <p className="eyebrow text-ink-foreground/50">Email</p>
                            <p className="mt-2 break-all text-2xl text-ink-foreground transition-colors group-hover:text-brand-green md:text-3xl">
                                {contact.email}
                            </p>
                        </a>
                    ) : null}

                    {contact.location ? (
                        <div>
                            <p className="eyebrow text-ink-foreground/50">Studio</p>
                            {contact.maps_url ? (
                                <a
                                    href={contact.maps_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-2 block text-2xl text-ink-foreground transition-colors hover:text-brand-green md:text-3xl"
                                >
                                    {contact.location}
                                </a>
                            ) : (
                                <p className="mt-2 text-2xl text-ink-foreground md:text-3xl">{contact.location}</p>
                            )}
                        </div>
                    ) : null}
                </div>

                {/* Lead form */}
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4 border border-ink-foreground/15 bg-ink-foreground/5 p-6 md:p-8 lg:col-span-7"
                >
                    <div className="mb-2">
                        <p className="eyebrow text-brand-green">Send a brief</p>
                        <p className="mt-3 text-sm leading-relaxed text-ink-foreground/60">
                            Tell us about the site, timeline and what you need built — we&apos;ll reply with next steps.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                            <span className="eyebrow text-ink-foreground/40">Name</span>
                            <input
                                name="name"
                                required
                                placeholder="Your name"
                                className="mt-2 w-full border border-ink-foreground/20 bg-transparent px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/35 focus:border-brand-green focus:outline-none"
                            />
                        </label>
                        <label className="block">
                            <span className="eyebrow text-ink-foreground/40">Phone</span>
                            <input
                                name="phone"
                                placeholder="Mobile number"
                                className="mt-2 w-full border border-ink-foreground/20 bg-transparent px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/35 focus:border-brand-green focus:outline-none"
                            />
                        </label>
                    </div>

                    <label className="block">
                        <span className="eyebrow text-ink-foreground/40">Email</span>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@company.com"
                            className="mt-2 w-full border border-ink-foreground/20 bg-transparent px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/35 focus:border-brand-green focus:outline-none"
                        />
                    </label>

                    <label className="block">
                        <span className="eyebrow text-ink-foreground/40">Project notes</span>
                        <textarea
                            name="message"
                            rows={5}
                            placeholder="Sector, location, approximate size, target date…"
                            className="mt-2 w-full resize-y border border-ink-foreground/20 bg-transparent px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/35 focus:border-brand-green focus:outline-none"
                        />
                    </label>

                    <div className="mt-2 flex flex-wrap items-center gap-4">
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="inline-flex w-fit items-center gap-3 bg-brand-green px-6 py-3 text-xs tracking-[0.18em] text-ink uppercase transition-opacity hover:opacity-85 disabled:opacity-60"
                        >
                            {status === "sending" ? "Sending…" : "Send message"}
                        </button>
                        {status === "sent" ? (
                            <p className="text-sm text-brand-green">Received — we&apos;ll get back to you.</p>
                        ) : null}
                        {status === "error" ? <p className="text-sm text-red-300">{error}</p> : null}
                    </div>
                </form>
            </div>

            {/* Footer bar: company + social */}
            <div className="mt-20 flex flex-col gap-6 border-t border-ink-foreground/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
                    <p className="eyebrow text-ink-foreground/40">Charul Projects · Est. 2004</p>
                    {contact.location ? (
                        <p className="text-sm text-ink-foreground/50">{contact.location}</p>
                    ) : null}
                    {contact.email ? (
                        <a
                            href={mailHref}
                            className="text-sm text-ink-foreground/50 transition-colors hover:text-brand-green"
                        >
                            {contact.email}
                        </a>
                    ) : null}
                </div>

                <div className="flex items-center gap-6">
                    {contact.instagram ? (
                        <a
                            href={contact.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="eyebrow text-ink-foreground/60 transition-colors hover:text-brand-green"
                        >
                            Instagram
                        </a>
                    ) : (
                        <span className="eyebrow text-ink-foreground/25">Instagram</span>
                    )}
                    {contact.facebook ? (
                        <a
                            href={contact.facebook}
                            target="_blank"
                            rel="noreferrer"
                            className="eyebrow text-ink-foreground/60 transition-colors hover:text-brand-green"
                        >
                            Facebook
                        </a>
                    ) : (
                        <span className="eyebrow text-ink-foreground/25">Facebook</span>
                    )}
                </div>
            </div>
        </footer>
    );
}

