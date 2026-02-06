import React, { useMemo, useState, useEffect } from "react";

const programs = [
  {
    key: "coaching",
    label: "Coaching Program",
    title: "Life Coaching Program",
    subtitle:
      "A structured coaching experience designed to help you build confidence, clarity, and consistency.",
    highlights: [
      "Goal setting & accountability",
      "Mindset coaching",
      "Habit & routine building",
      "Personal growth support",
    ],
    sections: [
      {
        heading: "What you’ll work on",
        items: [
          "Clarifying your goals and what’s holding you back",
          "Building confidence and self-trust",
          "Creating sustainable habits and routines",
          "Strengthening boundaries and self-discipline",
        ],
      },
      {
        heading: "What’s included",
        items: [
          "Scheduled coaching sessions",
          "Action plan + weekly goals",
          "Check-ins and accountability",
          "Resources tailored to your needs",
        ],
      },
    ],
    cta: { label: "Start with a Free Consultation", target: "contact" },
  },
  {
    key: "bariatric",
    label: "Bariatric Program",
    title: "Bariatric Lifestyle & Mindset Support",
    subtitle:
      "Support before and after surgery to help you stay consistent, grounded, and successful long-term.",
    highlights: [
      "Pre-op mental preparation",
      "Post-op lifestyle adjustment",
      "Emotional support & accountability",
      "Sustainable success habits",
    ],
    sections: [
      {
        heading: "Ideal for you if",
        items: [
          "You want structure and clarity before surgery",
          "You need support navigating emotional eating",
          "You’re adjusting to life after surgery",
          "You’re focused on maintaining weight loss long-term",
        ],
      },
      {
        heading: "Focus areas",
        items: [
          "Mindset, identity, and confidence shifts",
          "Routine building for nutrition and movement",
          "Coping strategies for stress and plateaus",
          "Long-term lifestyle sustainability",
        ],
      },
    ],
    cta: { label: "Book a Discovery Call", target: "contact" },
  },
  {
    key: "web",
    label: "Web Design Program",
    title: "Website Launch & Growth",
    subtitle:
      "A simple process to get your business online quickly with a modern, conversion-focused site.",
    highlights: [
      "Modern single-page website",
      "Mobile-friendly layout",
      "SEO setup basics",
      "Launch support",
    ],
    sections: [
      {
        heading: "The process",
        items: [
          "Discovery: goals, audience, and brand direction",
          "Design: clean layout and aesthetic choices",
          "Build: fast, responsive single-page site",
          "Launch: deploy + connect domain + basic SEO",
        ],
      },
      {
        heading: "Optional add-ons",
        items: [
          "Photo gallery / portfolio section",
          "Additional landing pages",
          "Copywriting polish",
          "Ongoing updates & maintenance",
        ],
      },
    ],
    pricing: {
      headline: "Pricing starts at",
      buildStartingAt: "$550",
      buildIncludes: [
        "Custom single-page build + launch",
        "Mobile-friendly + modern design",
        "Basic SEO setup (titles, descriptions, structure)",
        "Domain + deployment included",
      ],
      ownershipNote:
        "Once full payment is received, the website files and the domain will be placed in your ownership (registered/transferred to your registrar account).",
      hosting: {
        annual: "$200/year",
        annualNote:
          "Hosting-only plan. Includes keeping the site online and secure — no content changes.",
        monthly: "$35/month",
        monthlyNote:
          "Includes hosting plus minor updates (ex: text changes, replacing a few images, small edits). Larger updates are quoted separately.",
      },
      finePrint: [
        "Pricing varies based on scope (features, pages/sections, gallery needs, integrations).",
        "Third-party fees (if any) are billed at cost (ex: premium plugins, paid email services).",
        "Work begins after a deposit or first invoice is paid (details provided during consultation).",
      ],
    },
    cta: { label: "Request a Website Consultation", target: "contact" },
  },
];

function programKeyFromHash() {
  const raw = window.location.hash.replace("#", "");
  if (!raw.startsWith("program:")) return null;
  const key = raw.replace("program:", "");
  return key || null;
}

export default function ProgramTabs() {
  const [activeKey, setActiveKey] = useState(programs[0].key);

  const active = useMemo(
    () => programs.find((p) => p.key === activeKey) ?? programs[0],
    [activeKey]
  );

  useEffect(() => {
    const applyFromHash = () => {
      const key = programKeyFromHash();
      if (!key) return;
      const exists = programs.some((p) => p.key === key);
      if (exists) setActiveKey(key);
    };

    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  return (
    <div className="mt-8">
      {/* Tabs ABOVE the panel */}
      <div className="flex flex-wrap gap-2">
        {programs.map((p) => {
          const isActive = p.key === activeKey;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setActiveKey(p.key)}
              className={[
                "rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/30",
                isActive
                  ? "bg-white text-slate-900"
                  : "border border-white/20 bg-white/5 text-white hover:bg-white/10",
              ].join(" ")}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Main panel */}
      <div className="mt-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-6 shadow-lg shadow-black/20">
        {/* TOP: content + CTA (CTA should NOT stretch) */}
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {/* Left content */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              {active.title}
            </h3>
            <p className="mt-2 text-zinc-200">{active.subtitle}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {active.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-white/10 border border-white/15 px-3 py-1 text-sm text-zinc-100"
                >
                  {h}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-6">
              {active.sections.map((sec) => (
                <div key={sec.heading}>
                  <h4 className="text-lg font-semibold text-white">
                    {sec.heading}
                  </h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-200">
                    {sec.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA panel: stop above pricing */}
          <div className="rounded-2xl bg-white/5 border border-white/15 p-5 self-start">
            <h4 className="text-lg font-semibold text-white">
              Ready to get started?
            </h4>
            <p className="mt-2 text-zinc-200">
              Book a free consultation and we’ll recommend the best next step.
            </p>

            <button
              type="button"
              data-nav
              data-target={active.cta.target}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-zinc-200 transition focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {active.cta.label}
            </button>

            <p className="mt-3 text-xs text-zinc-300/80">
              No pressure — just a quick call to see what you need.
            </p>
          </div>
        </div>

        {/* BOTTOM: pricing spans full width (web only) */}
        {active.pricing && (
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <h4 className="text-xl font-semibold text-white">
                Web Design Pricing
              </h4>
              <div className="text-right">
                <p className="text-sm text-zinc-300">{active.pricing.headline}</p>
                <p className="text-2xl font-semibold text-white">
                  {active.pricing.buildStartingAt}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white/5 border border-white/15 p-5">
                <h5 className="text-lg font-semibold text-white">
                  One-time Website Build
                </h5>
                <p className="mt-2 text-sm text-zinc-200">
                  A complete build + launch package designed to get your business online quickly.
                </p>

                <ul className="mt-4 list-disc space-y-1 pl-5 text-zinc-200">
                  {active.pricing.buildIncludes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>

                <p className="mt-4 text-xs text-zinc-300/80">
                  {active.pricing.ownershipNote}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/15 p-5">
                <h5 className="text-lg font-semibold text-white">
                  Hosting & Updates
                </h5>

                <div className="mt-4 space-y-4">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold text-white">Annual Hosting</p>
                      <p className="font-semibold text-white">
                        {active.pricing.hosting.annual}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-zinc-200">
                      {active.pricing.hosting.annualNote}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold text-white">Monthly Care</p>
                      <p className="font-semibold text-white">
                        {active.pricing.hosting.monthly}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-zinc-200">
                      {active.pricing.hosting.monthlyNote}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-zinc-300/80">
                  Prefer a custom plan? We can quote based on your exact needs.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white/5 border border-white/15 p-5">
              <h5 className="text-sm font-semibold text-white">A few quick notes</h5>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-200">
                {active.pricing.finePrint.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
