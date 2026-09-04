const faqs = [
    {
        question: "What does Charul Projects do?",
        answer:
            "Charul Projects is a Nashik-based construction and project execution firm that handles turnkey construction, construction management, general contracting and project management for industrial, residential, commercial, hospitality and landscape work.",
    },
    {
        question: "How long has Charul Projects been in business?",
        answer:
            "Charul Projects has been building in Nashik since 1997 - over 25 years of on-site experience across 150+ delivered projects.",
    },
    {
        question: "What areas does Charul Projects serve?",
        answer:
            "We primarily serve Nashik and the surrounding regions of Maharashtra, covering industrial (MIDC) units, hospitals, residences, wineries, farmhouses and landscape developments.",
    },
    {
        question: "What is the difference between turnkey execution and general contracting?",
        answer:
            "Turnkey execution means Charul Projects manages the entire journey - planning, procurement, site execution, quality and handover - under one accountable partner. General contracting means we take responsibility for an agreed construction scope and coordinate the trades and materials needed to deliver it, typically within a design and budget already set by the client.",
    },
    {
        question: "How does the construction process work with Charul Projects?",
        answer:
            "Every project runs through nine stages: consultation, site assessment, planning, design coordination, budget estimation, construction, quality inspection, handover and post-handover maintenance - with one accountable partner managing the process end to end.",
    },
    {
        question: "Does Charul Projects offer maintenance support after handover?",
        answer:
            "Yes. After handover we provide defect-liability support and annual maintenance contracts covering civil, MEP and finishing systems.",
    },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
        },
    })),
};

export function FAQ() {
    return (
        <section id="faq" className="px-6 py-24 md:px-12 md:py-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 max-w-2xl text-[36px] font-medium leading-[1.1] tracking-[-0.025em] md:text-[44px] lg:text-[56px]">
                Common questions
            </h2>

            <div className="mt-14 divide-y divide-border border-t border-border">
                {faqs.map((f) => (
                    <details key={f.question} className="group py-8">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-medium leading-[1.3] tracking-[-0.02em] md:text-[20px]">
                            {f.question}
                            <span className="shrink-0 text-2xl leading-none text-muted-foreground transition-transform duration-200 group-open:rotate-45">
                                +
                            </span>
                        </summary>
                        <p className="mt-3 max-w-2xl text-[14px] font-normal leading-[1.6] text-muted-foreground md:text-[15px]">
                            {f.answer}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
}
