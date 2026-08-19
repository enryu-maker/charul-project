export type Stage = {
    n: string;
    title: string;
    body: string;
};

export const stages: Stage[] = [
    {
        n: "01",
        title: "Consultation",
        body: "We start with a deep-dive on your vision, functional programme, target date and budget envelope. Senior engineers, not sales staff.",
    },
    {
        n: "02",
        title: "Site Assessment",
        body: "Geotechnical, topographic and regulatory feasibility to surface risks early — before contracts, not after.",
    },
    {
        n: "03",
        title: "Planning",
        body: "Master programme, work breakdown structure and resource loading. Every project runs on a live schedule from day one.",
    },
    {
        n: "04",
        title: "Design Coordination",
        body: "Architect, structural and MEP alignment with clash resolution using BIM. Fewer surprises, faster execution.",
    },
    {
        n: "05",
        title: "Budget Estimation",
        body: "Detailed Bill of Quantities, value-engineered options and a locked Guaranteed Maximum Price after design freeze.",
    },
    {
        n: "06",
        title: "Construction",
        body: "Civil, structural, MEP and finishing under one programme. Weekly MPRs, live dashboards, transparent progress.",
    },
    {
        n: "07",
        title: "Quality Inspection",
        body: "Stage-wise QA/QC with third-party material testing, snag and de-snag closure before handover.",
    },
    {
        n: "08",
        title: "Handover",
        body: "Commissioning, documentation, warranties and keys handover. You get an operating facility, not a punch list.",
    },
    {
        n: "09",
        title: "Maintenance",
        body: "Defect-liability support and annual maintenance contracts covering civil, MEP and finishing systems.",
    },
];