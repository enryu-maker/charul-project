"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { ApiProcess } from "@/lib/api/types";

type ProcessStage = {
    n: string;
    title: string;
    body: string;
    phase: "PLAN" | "BUILD" | "DELIVER";
    progressWidth: string;
    progressColor: string;
    badgeBg: string;
    badgeText: string;
};

const nineStages: ProcessStage[] = [
    {
        n: "01",
        title: "Consultation",
        body: "We start with a deep-dive on your vision, functional programme, target date and budget envelope. Senior engineers, not sales staff.",
        phase: "PLAN",
        progressWidth: "20%",
        progressColor: "bg-[#2563eb]",
        badgeBg: "bg-[#2563eb]",
        badgeText: "text-white",
    },
    {
        n: "02",
        title: "Site Survey",
        body: "Geotechnical, topographic and regulatory feasibility to surface risks early - before contracts, not after.",
        phase: "PLAN",
        progressWidth: "40%",
        progressColor: "bg-[#2563eb]",
        badgeBg: "bg-[#2563eb]",
        badgeText: "text-white",
    },
    {
        n: "03",
        title: "Planning",
        body: "Master programme, work breakdown structure and resource loading. Every project runs on a live schedule from day one.",
        phase: "PLAN",
        progressWidth: "60%",
        progressColor: "bg-[#2563eb]",
        badgeBg: "bg-[#2563eb]",
        badgeText: "text-white",
    },
    {
        n: "04",
        title: "Design Coordination",
        body: "Architect, structural and MEP alignment with clash resolution using BIM. Fewer surprises, faster execution.",
        phase: "PLAN",
        progressWidth: "80%",
        progressColor: "bg-[#2563eb]",
        badgeBg: "bg-[#2563eb]",
        badgeText: "text-white",
    },
    {
        n: "05",
        title: "Budget Estimation",
        body: "Detailed Bill of Quantities, value-engineered options and a locked Guaranteed Maximum Price after design freeze.",
        phase: "PLAN",
        progressWidth: "100%",
        progressColor: "bg-[#2563eb]",
        badgeBg: "bg-[#2563eb]",
        badgeText: "text-white",
    },
    {
        n: "06",
        title: "Construction",
        body: "Civil, structural, MEP and finishing under one programme. Weekly MPRs, live dashboards, transparent progress.",
        phase: "BUILD",
        progressWidth: "50%",
        progressColor: "bg-[#091326]",
        badgeBg: "bg-[#091326]",
        badgeText: "text-white",
    },
    {
        n: "07",
        title: "Quality Inspection",
        body: "Stage-wise QA/QC with third-party material testing, snag and de-snag closure before handover.",
        phase: "BUILD",
        progressWidth: "100%",
        progressColor: "bg-[#091326]",
        badgeBg: "bg-[#091326]",
        badgeText: "text-white",
    },
    {
        n: "08",
        title: "Handover",
        body: "Commissioning, documentation, warranties and keys handover. You get an operating facility, not a punch list.",
        phase: "DELIVER",
        progressWidth: "50%",
        progressColor: "bg-[#4ade80]",
        badgeBg: "bg-[#4ade80]",
        badgeText: "text-slate-950",
    },
    {
        n: "09",
        title: "Maintenance",
        body: "Defect-liability support and annual maintenance contracts covering civil, MEP and finishing systems.",
        phase: "DELIVER",
        progressWidth: "100%",
        progressColor: "bg-[#4ade80]",
        badgeBg: "bg-[#4ade80]",
        badgeText: "text-slate-950",
    },
];

export function HorizontalProcess({}: { items?: ApiProcess[] } = {}) {
    const [selectedStage, setSelectedStage] = useState<ProcessStage | null>(null);

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How Charul Projects executes a construction project",
        description:
            "The stage-by-stage process Charul Projects follows to deliver a construction project from consultation to post-handover maintenance.",
        step: nineStages.map((s) => ({
            "@type": "HowToStep",
            position: Number(s.n),
            name: s.title,
            text: s.body,
        })),
    };

    return (
        <section
            id="process"
            aria-label="Our Process"
            className="relative bg-[#fcfdfd] text-slate-900 py-20 sm:py-24 md:py-28 px-6 sm:px-12 md:px-16 border-t border-slate-200/60"
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            <div className="max-w-[1550px] mx-auto">
                {/* Header matching Attachment 2 */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-12 border-b border-slate-100">
                    <div>
                        <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#1d4ed8] uppercase">
                            OUR PROCESS
                        </p>
                        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                            Nine stages, one accountable
                            <br className="hidden sm:inline" />
                            {" "}team.
                        </h2>
                    </div>

                    {/* Phase Legend matching Attachment 2 */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-xs sm:text-[13px] font-semibold text-slate-700">
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-2.5 h-2.5 bg-[#2563eb]" />
                            <span>Plan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-2.5 h-2.5 bg-[#091326]" />
                            <span>Build</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-2.5 h-2.5 bg-[#4ade80]" />
                            <span>Deliver</span>
                        </div>
                    </div>
                </div>

                {/* 3x3 Grid of 9 Stages matching Attachment 2 */}
                <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {nineStages.map((stage) => (
                        <article
                            key={stage.n}
                            onClick={() => setSelectedStage(stage)}
                            className="group relative flex flex-col justify-between bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-6 sm:p-7 min-h-[170px] cursor-pointer"
                        >
                            {/* Top row: Number + Phase Badge */}
                            <div className="flex items-start justify-between">
                                <span className="font-sans text-5xl sm:text-6xl font-bold text-slate-200/90 leading-none select-none">
                                    {stage.n}
                                </span>
                                <span
                                    className={`inline-block ${stage.badgeBg} ${stage.badgeText} text-[10px] font-mono font-semibold px-2.5 py-0.5 tracking-wider uppercase shadow-2xs`}
                                >
                                    {stage.phase}
                                </span>
                            </div>

                            {/* Stage Title */}
                            <div className="mt-6">
                                <h3 className="text-lg sm:text-[20px] font-bold text-slate-900 tracking-tight transition-colors duration-200 group-hover:text-[#1d4ed8]">
                                    {stage.title}
                                </h3>

                                {/* Bottom progressive phase indicator matching Attachment 2 */}
                                <div className="mt-5 w-full bg-slate-100 h-[2.5px] overflow-hidden">
                                    <div
                                        className={`h-full ${stage.progressColor} transition-all duration-500`}
                                        style={{ width: stage.progressWidth }}
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Stage Detail Modal */}
            {selectedStage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200"
                    onClick={() => setSelectedStage(null)}
                >
                    <div
                        className="relative w-full max-w-lg bg-white p-6 sm:p-8 shadow-2xl border border-slate-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedStage(null)}
                            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-3">
                            <span className="font-mono text-2xl font-bold text-slate-300">
                                {selectedStage.n}
                            </span>
                            <span
                                className={`inline-block ${selectedStage.badgeBg} ${selectedStage.badgeText} text-[10px] font-mono font-semibold px-2.5 py-0.5 tracking-wider uppercase`}
                            >
                                {selectedStage.phase}
                            </span>
                        </div>

                        <h3 className="mt-3 text-2xl font-bold text-slate-900 tracking-tight">
                            {selectedStage.title}
                        </h3>

                        <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                            {selectedStage.body}
                        </p>

                        <div className="mt-6 pt-5 border-t border-slate-100 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedStage(null)}
                                className="bg-slate-900 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
