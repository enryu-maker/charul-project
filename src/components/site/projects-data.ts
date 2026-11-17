import type { StaticImageData } from "next/image";
import hospital from "@/assets/project-hospital.jpg";
import industrial from "@/assets/project-industrial.jpg";
import residence from "@/assets/project-residence.jpg";
import winery from "@/assets/project-winery.jpg";
import landscape from "@/assets/project-landscape.jpg";

export type Project = {
    index: string;
    sector: string;
    name: string;
    blurb: string;
    place: string;
    year: string;
    scope: string;
    image: StaticImageData | string;
    subtitle?: string;
};

export const projects: Project[] = [
    {
        index: "01",
        sector: "Residential",
        name: "Palai Villa",
        blurb: "Luxury residential villa designed and executed with bespoke finishes, integrated outdoor spaces, and turnkey management.",
        place: "Nashik",
        year: "2022",
        scope: "Turnkey Execution",
        image: residence,
        subtitle: "2022",
    },
    {
        index: "02",
        sector: "Residential",
        name: "Mahesh Rathi Residence",
        blurb: "Contemporary private residence delivered with structural precision, premium interior integration, and disciplined execution.",
        place: "Nashik",
        year: "2021",
        scope: "General Contracting",
        image: residence,
        subtitle: "2021",
    },
    {
        index: "03",
        sector: "Commercial",
        name: "Yogesh Kshatriya Project",
        blurb: "Multi-functional development executed to strict commercial specifications and timelines.",
        place: "Nashik",
        year: "2023",
        scope: "Project Management",
        image: hospital,
        subtitle: "2023",
    },
    {
        index: "04",
        sector: "Farmhouse",
        name: "Sharad Patil Farmhouse",
        blurb: "Sprawling farmhouse development featuring integrated landscape grading, rustic stone structures, and durable finishes.",
        place: "Nashik",
        year: "2022",
        scope: "Turnkey · Landscape",
        image: landscape,
        subtitle: "2022",
    },
    {
        index: "05",
        sector: "Industrial",
        name: "LCG",
        blurb: "Industrial engineering facility planned for heavy equipment loads, structural steel framing, and efficient site coordination.",
        place: "Sinnar MIDC",
        year: "2021",
        scope: "Industrial Contracting",
        image: industrial,
        subtitle: "2021",
    },
    {
        index: "06",
        sector: "Residential",
        name: "Sanjay Cooperative",
        blurb: "Community housing development with focus on durable structural concrete, daylighting, and timely handover.",
        place: "Nashik",
        year: "2020",
        scope: "Construction Management",
        image: residence,
        subtitle: "2020",
    },
    {
        index: "07",
        sector: "Commercial",
        name: "Gunanjay Project",
        blurb: "Modern commercial building optimized for administrative utility, durable facade materials, and efficient MEP routing.",
        place: "Nashik",
        year: "2023",
        scope: "Turnkey Execution",
        image: hospital,
        subtitle: "2023",
    },
    {
        index: "08",
        sector: "Industrial",
        name: "SITCOL",
        blurb: "Large-scale industrial infrastructure project delivered across structural fabrication, foundation work, and utility commissioning.",
        place: "Gujarat",
        year: "2022",
        scope: "General Contracting",
        image: industrial,
        subtitle: "Gujarat · 2022",
    },
    {
        index: "09",
        sector: "Hospitality",
        name: "York Winery",
        blurb: "Hospitality and production facility overlooking the Gangapur vineyard, built into the slope with panoramic terraces.",
        place: "Gangapur Road, Nashik",
        year: "2016",
        scope: "Turnkey · Landscape",
        image: winery,
        subtitle: "Gangapur Road, Nashik · 2016",
    },
];