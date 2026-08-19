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
};

export const projects: Project[] = [
    {
        index: "01",
        sector: "Commercial",
        name: "Dr. Shah Hospital",
        blurb:
            "A working hospital built around clinical flow — services routed, finishes specified for hygiene, handed over ward by ward without stopping care.",
        place: "Yeola",
        year: "2019",
        scope: "Turnkey · Construction management",
        image: hospital,
    },
    {
        index: "02",
        sector: "Industrial",
        name: "Lava Cast Works",
        blurb:
            "Steel-framed foundry shed with heavy crane loads, deep foundations and a programme tied to the client's machinery delivery dates.",
        place: "Sinnar MIDC",
        year: "2021",
        scope: "General contracting",
        image: industrial,
    },
    {
        index: "03",
        sector: "Residential",
        name: "Sai Residency",
        blurb:
            "Apartments planned for cross ventilation and daylight, delivered on a fixed programme with finishes chosen for a twenty-year life.",
        place: "Nashik",
        year: "2018",
        scope: "Project management",
        image: residence,
    },
    {
        index: "04",
        sector: "Farm House",
        name: "York Winery",
        blurb:
            "Hospitality and production under one roof, set into the slope so the vineyard stays the view from every terrace.",
        place: "Gangapur Road",
        year: "2016",
        scope: "Turnkey · Landscape",
        image: winery,
    },
    {
        index: "05",
        sector: "Landscape",
        name: "Patilwadi Estate",
        blurb:
            "Grading, water storage, stone walls and planting shaped into a working farm that reads as a garden.",
        place: "Trimbak Road",
        year: "2023",
        scope: "Landscape · Contracting",
        image: landscape,
    },
];