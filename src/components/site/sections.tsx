export function SiteNav() {
    return (
        <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-bone/85 px-6 py-4 backdrop-blur md:px-12">
            <a href="#top" className="flex items-center">
                <img
                    src="/charul-logo-light.webp"
                    alt="Charul Projects Pvt. Ltd."
                    width={1920}
                    height={525}
                    className="h-8 w-auto md:h-9"
                />
            </a>
            <div className="flex items-center gap-6 text-xs tracking-[0.18em] text-foreground uppercase">
                <a href="#practice" className="hidden hover:text-brand-green sm:inline">
                    Practice
                </a>
                <a href="#projects" className="hover:text-brand-green">
                    Work
                </a>
                <a href="#process" className="hidden hover:text-brand-green sm:inline">
                    Process
                </a>
                <a href="#contact" className="hover:text-brand-green">
                    Contact
                </a>
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
                    <p className="eyebrow">The practice</p>
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