"use client";

import { useState, useEffect, FormEvent } from "react";
import { Menu, X } from "lucide-react";
import { createLead } from "@/lib/api";
import type {
    ApiContact,
    ApiPractice,
    ApiReview,
    ApiService,
    ApiStat,
} from "@/lib/api/types";

const navLinks = [
    { label: "About Us", href: "#about" },
    { label: "Sectors", href: "#sectors" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Clients", href: "#clients" },
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
                ? "border-b border-white/10 bg-[#070e1e]/95 shadow-lg backdrop-blur-md py-3.5 md:py-4"
                : "border-b border-white/5 bg-[#070e1e]/85 backdrop-blur-sm py-4 md:py-5"
                }`}
        >
            <div className="flex items-center justify-between px-6 md:px-12 max-w-[1600px] mx-auto">
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

                <div className="hidden lg:flex items-center gap-7 text-[13px] md:text-[14px]">
                    {navLinks.map((link) => {
                        const sectionId = link.href.substring(1);
                        const isActive = activeSection === sectionId;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`group relative py-1.5 transition-colors duration-200 ${isActive
                                    ? "text-white font-medium"
                                    : "text-white/80 hover:text-white font-normal"
                                    }`}
                            >
                                <span className="relative z-10 transition-transform duration-200 inline-block group-hover:-translate-y-0.5">
                                    {link.label}
                                </span>
                                <span
                                    className={`absolute bottom-0 left-0 h-[2px] bg-emerald-400 transition-all duration-300 ease-out ${isActive
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                        }`}
                                />
                            </a>
                        );
                    })}

                    <a
                        href="#contact"
                        className="ml-3 inline-flex items-center gap-2 border border-emerald-500/70 hover:border-emerald-400 bg-transparent hover:bg-emerald-500/10 px-4 py-2 text-xs md:text-[13px] font-medium tracking-wide text-emerald-400 hover:text-emerald-300 transition-all duration-200 rounded-xs hover:shadow-xs active:scale-[0.98]"
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
                    className="flex items-center justify-center p-2 text-white/90 transition-all duration-200 hover:text-emerald-400 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 lg:hidden"
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
                className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${isOpen
                    ? "max-h-[480px] border-t border-white/10 opacity-100"
                    : "max-h-0 border-t-0 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col space-y-1 bg-[#070e1e]/98 px-6 py-5 backdrop-blur-xl">
                    {navLinks.map((link) => {
                        const sectionId = link.href.substring(1);
                        const isActive = activeSection === sectionId;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center justify-between py-3 text-sm tracking-wide transition-all duration-200 border-b border-white/5 last:border-b-0 ${isActive
                                    ? "text-emerald-400 font-medium pl-2"
                                    : "text-white/80 hover:text-emerald-400 hover:pl-2 font-normal"
                                    }`}
                            >
                                <span>{link.label}</span>
                                <span
                                    className={`h-1.5 w-1.5 rounded-full bg-emerald-400 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                />
                            </a>
                        );
                    })}
                    <div className="pt-3">
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center w-full border border-emerald-500/70 hover:border-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-6 py-3 text-xs font-semibold tracking-wide text-emerald-400 hover:text-white uppercase transition-all duration-200"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export function Hero({}: { image?: string | null } = {}) {
    return (
        <header
            id="top"
            className="relative flex min-h-screen min-h-[100dvh] flex-col justify-between overflow-hidden px-6 md:px-12 pt-28 pb-10 sm:pt-32 sm:pb-12 md:pt-36 md:pb-16"
            style={{
                backgroundColor: "#070e1e",
                backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    #0b162f 0px,
                    #0b162f 28px,
                    #060c1b 28px,
                    #060c1b 56px
                )`,
            }}
        >
            {/* Top row: Right-aligned badge matching Attachment 2 */}
            <div className="relative z-10 w-full max-w-[1550px] mx-auto flex justify-end">
                <div className="inline-flex items-center border border-white/20 bg-transparent px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.14em] sm:tracking-[0.16em] text-white/70 uppercase">
                    HERO VIDEO / PHOTO · CONSTRUCTION SITE
                </div>
            </div>

            {/* Main Center/Lower content grid */}
            <div className="relative z-10 w-full max-w-[1550px] mx-auto my-auto py-8 sm:py-12 md:py-16">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-8">
                    {/* Left Column: Heading, Eyebrow, Subtext, CTA */}
                    <div className="max-w-3xl">
                        <p className="font-mono text-xs md:text-sm font-semibold tracking-[0.18em] text-[#4ade80] uppercase">
                            CONSTRUCTION MASTERY
                        </p>

                        <h1 className="mt-5 text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                            Building
                            <br />
                            your vision.
                        </h1>

                        <p className="mt-6 max-w-xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-300">
                            One accountable partner from planning to handover, from Nashik.
                        </p>

                        <div className="mt-8">
                            <a
                                href="#about"
                                className="group inline-flex items-center gap-2.5 bg-[#4ade80] px-6 py-3.5 font-sans text-sm md:text-base font-semibold text-slate-950 transition-all duration-200 hover:bg-[#34d399] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]"
                            >
                                <span>Explore Our Legacy</span>
                                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Bottom Right feature matching Attachment 2: SINCE 1997 */}
                    <div className="flex items-center gap-4 self-start lg:self-end pb-2">
                        <div className="w-[3px] h-12 md:h-14 bg-[#4ade80]" />
                        <div className="flex flex-col">
                            <span className="font-mono text-[11px] md:text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
                                SINCE
                            </span>
                            <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none mt-0.5">
                                1997
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

const fallbackPractice = {
    title: "About Charul Projects",
    description:
        "Charul Projects Pvt. Ltd. has delivered residential, commercial, industrial and hospitality projects across Maharashtra and Gujarat for more than three decades. Our clients return, and refer others, because we plan carefully and stay accountable until handover.",
    image: "/project-industrial.jpg",
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
            "To deliver every project with discipline, quality, and accountability, on time and with value for money.\n\nThrough structured planning, responsible execution, and a commitment to quality, we strive to deliver projects on time, with accountability and value, while building lasting trust with every client.",
    },
];

export function Practice({ items = [] }: { items?: ApiPractice[] }) {
    const [showFullStory, setShowFullStory] = useState(false);
    const primary = items[0];
    const aboutText = primary?.description || fallbackPractice.description;
    const extras =
        items.length > 1
            ? items.slice(1).map((item) => ({
                id: String(item.id),
                title: item.title,
                description: item.description,
            }))
            : fallbackMissionVision;

    return (
        <section id="about" className="relative bg-white text-slate-900 px-6 sm:px-12 md:px-16 py-20 sm:py-24 md:py-28">
            <div className="max-w-[1550px] mx-auto">
                {/* 2-Column Section matching Attachment 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column */}
                    <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
                        <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#1d4ed8] uppercase">
                            ABOUT US
                        </p>

                        <h2 className="mt-4 text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] font-bold leading-[1.12] tracking-[-0.025em] text-slate-900">
                            Leading construction and
                            <br className="hidden sm:inline" />
                            {" "}project execution specialist.
                        </h2>

                        <p className="mt-6 text-base sm:text-lg md:text-[17px] font-normal leading-[1.7] text-slate-600 max-w-xl">
                            {aboutText}
                        </p>

                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={() => setShowFullStory((prev) => !prev)}
                                className="group inline-flex items-center gap-2 font-semibold text-sm sm:text-base text-[#1d4ed8] hover:text-[#1e40af] border-b-2 border-blue-600/30 hover:border-blue-600 pb-0.5 transition-all duration-200 cursor-pointer"
                            >
                                <span>{showFullStory ? "Close story details" : "Read our story"}</span>
                                <span className={`inline-block transition-transform duration-200 ${showFullStory ? "-rotate-90" : "group-hover:translate-x-1"}`}>
                                    →
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Architectural Media Container matching Attachment 1 */}
                    <div className="lg:col-span-6 xl:col-span-5">
                        <div
                            className="relative aspect-[16/10] w-full overflow-hidden border border-slate-200/90 shadow-sm"
                            style={{
                                backgroundColor: "#dbe2ea",
                                backgroundImage: `
                                    repeating-linear-gradient(
                                        -45deg,
                                        #d0d9e4 0px,
                                        #d0d9e4 22px,
                                        #edf2f7 22px,
                                        #edf2f7 44px
                                    )
                                `,
                            }}
                        >
                            {/* Badge matching Attachment 1 at bottom-left */}
                            <div className="absolute bottom-4 left-4 z-10">
                                <div className="bg-white px-4 py-1.5 text-[10px] md:text-[11px] font-mono tracking-[0.16em] text-slate-800 uppercase font-semibold shadow-xs border border-slate-200/80">
                                    PHOTO · BUILDING
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Collapsible / Expandable Legacy & Vision/Mission */}
                {showFullStory && (
                    <div className="mt-16 pt-16 border-t border-slate-200 animate-in fade-in duration-300">
                        <div className="grid gap-12 lg:grid-cols-12">
                            <div className="lg:col-span-5">
                                <span className="font-mono text-xs uppercase tracking-widest text-[#1d4ed8] font-semibold">
                                    Our Heritage & Practice
                                </span>
                                <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                                    Over three decades of building experience in Nashik.
                                </h3>
                                <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                                    Established in 1997, Charul Projects is a Nashik-based construction and project execution firm serving industrial, healthcare, residential, commercial and hospitality projects across Maharashtra and Gujarat.
                                </p>
                            </div>

                            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
                                {extras.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border border-slate-200 bg-slate-50/60 p-6 sm:p-8 flex flex-col justify-between"
                                    >
                                        <div>
                                            <span className="font-mono text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                                                {item.title}
                                            </span>
                                            <p className="mt-4 text-sm sm:text-[15px] text-slate-700 leading-relaxed whitespace-pre-line">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="mt-6 h-1 w-12 bg-[#4ade80]" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export const About = Practice;

const servicesData = [
    {
        num: "01",
        name: "Turnkey Execution",
        description:
            "End-to-end delivery from planning and design coordination to construction and handover, under one contract.",
    },
    {
        num: "02",
        name: "Construction Management",
        description:
            "Site supervision, scheduling, budget control and quality inspection on behalf of owners and developers.",
    },
    {
        num: "03",
        name: "General Contracting",
        description:
            "Disciplined execution of civil works against approved drawings, specifications and timelines.",
    },
];

export function Services({}: { items?: ApiService[] } = {}) {
    return (
        <section id="services" className="bg-white text-slate-900 py-20 sm:py-24 md:py-28 px-6 sm:px-12 md:px-16">
            <div className="max-w-[1550px] mx-auto">
                {/* Header matching Attachment 2 */}
                <div>
                    <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#1d4ed8] uppercase">
                        WHAT WE DO
                    </p>
                    <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                        Unparalleled construction
                        <br />
                        expertise.
                    </h2>
                </div>

                {/* 3-Column Cards Grid matching Attachment 2 */}
                <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                    {servicesData.map((s) => (
                        <article
                            key={s.num}
                            className="group flex flex-col bg-white border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                        >
                            {/* Media container with diagonal stripes pattern */}
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
                            />

                            {/* Content area */}
                            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between bg-white">
                                <div>
                                    <span className="font-mono text-xs sm:text-[13px] font-semibold text-[#1d4ed8]">
                                        {s.num}
                                    </span>
                                    <h3 className="mt-2 text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight transition-colors duration-200 group-hover:text-[#1d4ed8]">
                                        {s.name}
                                    </h3>
                                    <p className="mt-3 text-sm sm:text-[15px] font-normal leading-relaxed text-slate-600">
                                        {s.description}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

const fallbackStats = [
    { id: 1, value: "30+", label: "Years of experience, since 1997" },
    { id: 2, value: "75+", label: "Projects delivered" },
    { id: 3, value: "8+", label: "Sectors served" },
    { id: 4, value: "25 L+", label: "Sq. ft. constructed" },
];

export function Stats({ items = [] }: { items?: ApiStat[] }) {
    const list = items.length === 4 && items[0].value.includes("30") ? items : fallbackStats;

    return (
        <section className="bg-[#0b1426] py-14 sm:py-16 md:py-20 px-6 sm:px-12 md:px-16 border-y border-white/5">
            <div className="max-w-[1550px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {list.map((s) => (
                    <div key={s.id} className="flex flex-col">
                        <div className="w-full h-[2px] bg-[#4ade80] mb-6 opacity-90" />
                        <p className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-none">
                            {s.value}
                        </p>
                        <p className="mt-3 text-xs sm:text-sm font-normal text-slate-400">
                            {s.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

const standForValues = [
    "Trust",
    "Discipline",
    "Quality",
    "Responsibility",
    "Reliability",
    "Excellence",
];

export function WhatWeStandFor() {
    return (
        <section className="bg-white border-b border-slate-200/80 py-8 md:py-10 px-6 sm:px-12 md:px-16">
            <div className="max-w-[1550px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
                <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#1d4ed8] uppercase shrink-0">
                    WHAT WE STAND FOR
                </span>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-8 md:gap-10 lg:gap-14 w-full md:w-auto">
                    {standForValues.map((val) => (
                        <span
                            key={val}
                            className="font-sans text-sm sm:text-base font-semibold text-slate-900 tracking-tight"
                        >
                            {val}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

const sectorsList = [
    { id: 1, name: "Residential" },
    { id: 2, name: "Commercial" },
    { id: 3, name: "Industrial" },
    { id: 4, name: "Hospitality" },
    { id: 5, name: "Farmhouses" },
    { id: 6, name: "Landscape & Site Development" },
    { id: 7, name: "Hospitals" },
];

export function Sectors() {
    return (
        <section id="sectors" className="bg-[#edf2f7] text-slate-900 py-20 sm:py-24 md:py-28 px-6 sm:px-12 md:px-16 border-t border-slate-200/60">
            <div className="max-w-[1550px] mx-auto">
                {/* Header matching Attachment 1 */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-10">
                    <div>
                        <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#1d4ed8] uppercase">
                            AREAS OF EXPERTISE
                        </p>
                        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                            Sectors we serve.
                        </h2>
                    </div>

                    <div>
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-1.5 font-semibold text-sm sm:text-base text-[#1d4ed8] hover:text-[#1e40af] border-b border-blue-600/30 hover:border-blue-600 pb-0.5 transition-all duration-200"
                        >
                            <span>Know more</span>
                            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </a>
                    </div>
                </div>

                {/* Row 1: 4 Cards across matching Attachment 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
                    {sectorsList.slice(0, 4).map((sector) => (
                        <div key={sector.id} className="group flex flex-col">
                            {/* Media container with diagonal stripes pattern */}
                            <div
                                className="relative aspect-[16/10] w-full overflow-hidden border border-slate-200/90 shadow-2xs"
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
                                <div className="absolute bottom-3 left-3 z-10">
                                    <span className="inline-block bg-white/95 text-slate-700 text-[10px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 border border-slate-200/60 shadow-xs">
                                        PHOTO
                                    </span>
                                </div>
                            </div>
                            {/* Label */}
                            <h3 className="mt-3 font-semibold text-base sm:text-[17px] text-slate-900 tracking-tight transition-colors duration-200 group-hover:text-[#1d4ed8]">
                                {sector.name}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Row 2: 3 Cards across matching Attachment 1 */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {sectorsList.slice(4, 7).map((sector) => (
                        <div key={sector.id} className="group flex flex-col">
                            {/* Media container with diagonal stripes pattern */}
                            <div
                                className="relative aspect-[16/10] w-full overflow-hidden border border-slate-200/90 shadow-2xs"
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
                                <div className="absolute bottom-3 left-3 z-10">
                                    <span className="inline-block bg-white/95 text-slate-700 text-[10px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 border border-slate-200/60 shadow-xs">
                                        PHOTO
                                    </span>
                                </div>
                            </div>
                            {/* Label */}
                            <h3 className="mt-3 font-semibold text-base sm:text-[17px] text-slate-900 tracking-tight transition-colors duration-200 group-hover:text-[#1d4ed8]">
                                {sector.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function CharulEdge() {
    return (
        <section id="edge" className="bg-[#070e1e] text-white py-20 sm:py-24 md:py-28 px-6 sm:px-12 md:px-16 border-t border-white/5">
            <div className="max-w-[1550px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column matching Attachment 1 */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#4ade80] uppercase">
                            DISCIPLINE & PRECISION
                        </p>

                        <h2 className="mt-3 text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-white leading-tight">
                            The Charul edge.
                        </h2>

                        {/* Top horizontal divider */}
                        <div className="w-full h-px bg-white/15 my-8 sm:my-10" />

                        {/* 2x2 Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                            {/* Discipline */}
                            <div>
                                <h3 className="text-lg sm:text-[19px] font-bold text-white tracking-tight">
                                    Discipline
                                </h3>
                                <p className="mt-2 text-xs sm:text-sm text-slate-300/80 leading-relaxed max-w-xs">
                                    Planned schedules, budgets and site routines, followed through to handover.
                                </p>
                            </div>

                            {/* Quality */}
                            <div>
                                <h3 className="text-lg sm:text-[19px] font-bold text-white tracking-tight">
                                    Quality
                                </h3>
                                <p className="mt-2 text-xs sm:text-sm text-slate-300/80 leading-relaxed max-w-xs">
                                    Inspection at every stage before work moves on.
                                </p>
                            </div>

                            {/* Middle horizontal divider line */}
                            <div className="col-span-full h-px bg-white/10" />

                            {/* Accountability */}
                            <div>
                                <h3 className="text-lg sm:text-[19px] font-bold text-white tracking-tight">
                                    Accountability
                                </h3>
                                <p className="mt-2 text-xs sm:text-sm text-slate-300/80 leading-relaxed max-w-xs">
                                    One partner answerable for the whole job, planning to handover.
                                </p>
                            </div>

                            {/* Own equipment */}
                            <div>
                                <h3 className="text-lg sm:text-[19px] font-bold text-white tracking-tight">
                                    Own equipment
                                </h3>
                                <p className="mt-2 text-xs sm:text-sm text-slate-300/80 leading-relaxed max-w-xs">
                                    Shuttering, lifts, mixers and a tower crane owned and deployed by us.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Dark Diagonal Stripes Box matching Attachment 1 */}
                    <div className="lg:col-span-5">
                        <div
                            className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 shadow-lg"
                            style={{
                                backgroundColor: "#070e1e",
                                backgroundImage: `repeating-linear-gradient(
                                    -45deg,
                                    #0b162f 0px,
                                    #0b162f 26px,
                                    #060c1b 26px,
                                    #060c1b 52px
                                )`,
                            }}
                        >
                            {/* Bottom-left Badge */}
                            <div className="absolute bottom-4 left-4 z-10">
                                <div className="border border-white/20 bg-black/40 backdrop-blur-xs text-[10px] sm:text-[11px] font-mono tracking-[0.16em] text-white/80 uppercase px-3.5 py-1.5 font-medium">
                                    PHOTO · SITE TEAM
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const equipmentCategories = [
    {
        title: "CONCRETE & FORMWORK",
        items: [
            { name: "Needle vibrators", count: 15 },
            { name: "Concrete mixers", count: 4 },
            { name: "Water pumps", count: 10 },
        ],
    },
    {
        title: "LIFTING & VERTICAL",
        items: [
            { name: "Electric lifts", count: 4 },
            { name: "Material lifts, 100 m", count: 2 },
            { name: "Tower crane", count: 1 },
        ],
    },
    {
        title: "REBAR & STEEL",
        items: [
            { name: "Rebar machines", count: 3 },
            { name: "Bar bending machines", count: 3 },
            { name: "Bar cutting machines", count: 3 },
        ],
    },
];

const surveyCategory = {
    title: "SURVEY, SITE & POWER",
    items: [
        { name: "Auto levels", count: 3 },
        { name: "Compactor", count: 1 },
        { name: "Power breakers", count: 6 },
    ],
};

export function EquipmentFleet() {
    return (
        <section id="equipment" className="bg-[#050a17] text-white py-20 sm:py-24 md:py-28 px-6 sm:px-12 md:px-16 border-t border-white/5">
            <div className="max-w-[1550px] mx-auto">
                {/* Header matching Attachment 1 */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-10">
                    <div>
                        <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#4ade80] uppercase">
                            EQUIPMENT & MATERIALS OWNED
                        </p>
                        <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Our own fleet, on every site.
                        </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 max-w-xs text-left sm:text-right leading-relaxed">
                        Owning the formwork, lifts and machines keeps schedules in our hands.
                    </p>
                </div>

                {/* Top Feature Highlights: 2 Cards matching Attachment 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
                    {/* Left Card: 400 Steel shuttering units + Media box */}
                    <div className="lg:col-span-7 xl:col-span-8 bg-[#091224] border border-white/10 overflow-hidden grid grid-cols-1 sm:grid-cols-2">
                        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                            <span className="font-sans text-5xl sm:text-6xl md:text-7xl font-bold text-[#4ade80] leading-none">
                                400
                            </span>
                            <h3 className="mt-4 text-lg sm:text-xl font-bold text-white tracking-tight">
                                Steel shuttering units
                            </h3>
                            <p className="mt-1 text-xs sm:text-sm text-slate-400">
                                plus 40 wall-form shuttering units
                            </p>
                        </div>

                        {/* Diagonal stripes media box */}
                        <div
                            className="relative aspect-auto min-h-[200px] sm:min-h-full w-full overflow-hidden border-t sm:border-t-0 sm:border-l border-white/10"
                            style={{
                                backgroundColor: "#070e1e",
                                backgroundImage: `repeating-linear-gradient(
                                    -45deg,
                                    #0b162f 0px,
                                    #0b162f 26px,
                                    #060c1b 26px,
                                    #060c1b 52px
                                )`,
                            }}
                        >
                            <div className="absolute bottom-4 left-4 z-10">
                                <div className="border border-white/20 bg-black/40 backdrop-blur-xs text-[10px] sm:text-[11px] font-mono tracking-[0.16em] text-white/80 uppercase px-3 py-1 font-medium">
                                    PHOTO · SHUTTERING
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Card: Vertical Reach 100 m in solid green */}
                    <div className="lg:col-span-5 xl:col-span-4 bg-[#52c86e] p-6 sm:p-8 md:p-10 flex flex-col justify-between text-[#070e1e]">
                        <div>
                            <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#070e1e]/80">
                                VERTICAL REACH
                            </span>
                            <p className="mt-6 font-sans text-5xl sm:text-6xl font-bold tracking-tight text-[#070e1e] leading-none">
                                100 m
                            </p>
                        </div>

                        <p className="mt-6 text-sm sm:text-[15px] font-semibold leading-relaxed text-[#070e1e]/90 max-w-xs">
                            Two material lifts, one passenger-capable, plus a tower crane
                        </p>
                    </div>
                </div>

                {/* Bottom Categories: 3 Columns in Row 1 matching Attachment 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mt-8">
                    {equipmentCategories.map((cat) => (
                        <div
                            key={cat.title}
                            className="bg-[#091224] border border-white/10 p-6 sm:p-7 flex flex-col justify-between"
                        >
                            <div className="w-full h-[2px] bg-[#4ade80] mb-5" />
                            <h4 className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">
                                {cat.title}
                            </h4>
                            <div className="flex flex-col">
                                {cat.items.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between py-3.5 border-b border-white/10 last:border-b-0"
                                    >
                                        <span className="text-sm sm:text-[15px] text-slate-200 font-normal">
                                            {item.name}
                                        </span>
                                        <span className="font-mono text-xl sm:text-2xl font-bold text-white">
                                            {item.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Category 4 matching Attachment 2 (SURVEY, SITE & POWER) */}
                <div className="mt-8">
                    <div className="w-full h-[2px] bg-[#4ade80] mb-8" />
                    <div className="bg-[#091224] border border-white/10 p-6 sm:p-8">
                        <h4 className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">
                            {surveyCategory.title}
                        </h4>
                        <div className="flex flex-col">
                            {surveyCategory.items.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between py-3.5 border-b border-white/10 last:border-b-0"
                                >
                                    <span className="text-sm sm:text-[15px] text-slate-200 font-normal">
                                        {item.name}
                                    </span>
                                    <span className="font-mono text-xl sm:text-2xl font-bold text-white">
                                        {item.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const Equipment = EquipmentFleet;

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

    return (
        <section id="clients" className="bg-[#f8fafc] text-slate-900 py-20 sm:py-24 md:py-28 px-6 sm:px-12 md:px-16 border-t border-slate-200/80">
            <div className="max-w-[1550px] mx-auto">
                {/* Header matching Attachment 1 */}
                <div>
                    <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#1d4ed8] uppercase">
                        ENDURING PARTNERSHIPS
                    </p>
                    <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                        What clients say.
                    </h2>
                </div>

                {/* 2-Column Cards Grid matching Attachment 1 */}
                <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {list.slice(0, 2).map((r, idx) => (
                        <article
                            key={r.id || idx}
                            className="bg-white border border-slate-200/80 shadow-xs p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
                            style={{
                                borderLeftWidth: "4px",
                                borderLeftColor: "#52c86e",
                            }}
                        >
                            <div>
                                <blockquote className="text-lg sm:text-xl md:text-[22px] font-bold text-slate-900 tracking-tight leading-snug">
                                    “{r.description}”
                                </blockquote>
                            </div>

                            <div className="mt-8 pt-4">
                                <p className="text-xs sm:text-[13px] font-medium text-slate-500">
                                    {r.name || "Client name"} · {idx === 0 ? "Office Construction" : "Project Consultancy"}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

const fallbackContact: ApiContact = {
    id: 0,
    phone: "+91 942 227 2181",
    email: "info@charulprojects.com",
    location: "Nashik, Maharashtra",
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
        <footer id="contact" className="bg-[#050a17] text-white pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-6 sm:px-12 md:px-16 border-t border-white/5">
            <div className="max-w-[1550px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Column: Contact info matching Attachment 2 */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#4ade80] uppercase">
                                CONTACT
                            </p>
                            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                                Planning a project?
                                <br />
                                Let&apos;s talk.
                            </h2>
                            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
                                Share a few details and our team will respond with next steps.
                            </p>
                        </div>

                        <div className="mt-8 sm:mt-12 flex flex-col gap-2">
                            {contact.phone ? (
                                <a
                                    href={telHref}
                                    className="text-base sm:text-lg font-bold text-white hover:text-[#4ade80] transition-colors"
                                >
                                    {contact.phone}
                                </a>
                            ) : null}

                            {contact.email ? (
                                <a
                                    href={mailHref}
                                    className="text-sm sm:text-base text-white hover:text-[#4ade80] transition-colors"
                                >
                                    {contact.email}
                                </a>
                            ) : null}

                            <p className="text-sm sm:text-base text-slate-400">
                                Nashik, Maharashtra
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Contact form box matching Attachment 2 */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#091224] border border-white/10 p-6 sm:p-8 md:p-10 shadow-2xl">
                            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-2">
                                            Name
                                        </label>
                                        <input
                                            name="name"
                                            required
                                            className="w-full bg-[#131f38] border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            name="phone"
                                            className="w-full bg-[#131f38] border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-2">
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="w-full bg-[#131f38] border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-2">
                                            Firm name
                                        </label>
                                        <input
                                            name="firm_name"
                                            className="w-full bg-[#131f38] border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-2">
                                        City
                                    </label>
                                    <input
                                        name="city"
                                        className="w-full bg-[#131f38] border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-2">
                                        Project notes
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        className="w-full bg-[#131f38] border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors resize-y"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === "sending"}
                                        className="bg-[#52c86e] hover:bg-[#43b55d] text-[#070e1e] font-semibold text-sm px-6 py-3.5 inline-flex items-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
                                    >
                                        {status === "sending" ? "Sending..." : "Send inquiry →"}
                                    </button>
                                    {status === "sent" ? (
                                        <p className="mt-3 font-mono text-xs text-[#4ade80]">
                                            Received - we&apos;ll get back to you shortly.
                                        </p>
                                    ) : null}
                                    {status === "error" ? (
                                        <p className="mt-3 font-mono text-xs text-red-400">
                                            {error}
                                        </p>
                                    ) : null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer divider and 4-column links matching Attachment 2 */}
                <div className="mt-20 sm:mt-28 border-t border-white/10 pt-12 sm:pt-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
                        {/* Brand */}
                        <div className="lg:col-span-5">
                            <h3 className="font-bold tracking-wider text-white text-base sm:text-lg">
                                CHARUL PROJECTS
                            </h3>
                            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                                Building Since 1997 · Trust · Discipline · Quality
                            </p>
                        </div>

                        {/* Nav Links Column 1 */}
                        <div className="lg:col-span-2">
                            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-300">
                                <li>
                                    <a href="#about" className="hover:text-white transition-colors">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#sectors" className="hover:text-white transition-colors">
                                        Sectors
                                    </a>
                                </li>
                                <li>
                                    <a href="#services" className="hover:text-white transition-colors">
                                        Services
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Nav Links Column 2 */}
                        <div className="lg:col-span-2">
                            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-300">
                                <li>
                                    <a href="#projects" className="hover:text-white transition-colors">
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="#process" className="hover:text-white transition-colors">
                                        Process
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="hover:text-white transition-colors">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 (Contact & Social) */}
                        <div className="lg:col-span-3">
                            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-300">
                                <li>
                                    <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                                        {contact.email}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={instagramUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-white transition-colors"
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={linkedinUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-white transition-colors"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Subfooter Copyright */}
                    <div className="mt-14 sm:mt-18 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">
                            © Charul Projects Pvt. Ltd. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}



