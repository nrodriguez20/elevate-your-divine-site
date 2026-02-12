import React, { useEffect, useMemo, useState } from "react";

type ProgramCategory = "coaching" | "web" | "all";

type ProgramTabsProps = {
  category?: ProgramCategory;
};

type Program = {
  key: string;
  category: "coaching" | "web";
  label: string;
  title: string;
  subtitle: string;
  highlights: string[];
  sections: { heading: string; items: string[] }[];
  cta: { label: string; target: "contact" };
  pricing?: {
    headline: string;
    buildStartingAt: string;
    buildIncludes: string[];
    ownershipNote: string;
    hosting: {
      annual: string;
      annualNote: string;
      monthly: string;
      monthlyNote: string;
    };
    finePrint: string[];
  };
};

const programs: Program[] = [
  {
    key: "life",
    category: "coaching",
    label: "Life Coaching",
    title: "Life Coaching Program",
    subtitle:
      "Support and structure to help you build confidence, clarity, and consistent momentum.",
    highlights: ["Clarity", "Confidence", "Accountability", "Personal growth"],
    sections: [
      {
        heading: "What we focus on",
        items: [
          "Goals, boundaries, and self-trust",
          "Breaking patterns that keep you stuck",
          "Routines that actually fit your life",
          "Mindset + confidence building",
        ],
      },
      {
        heading: "You’ll leave with",
        items: ["A clear plan and next steps", "Tools to stay consistent", "Supportive accountability"],
      },
    ],
    cta: { label: "Book a Free Consultation", target: "contact" },
  },
  {
    key: "bariatric",
    category: "coaching",
    label: "Bariatric Coaching",
    title: "Bariatric Coaching Program",
    subtitle:
      "Mindset + lifestyle coaching to support you before and after surgery—so your progress lasts.",
    highlights: ["Pre-op prep", "Post-op mindset", "Lifestyle change", "Support"],
    sections: [
      {
        heading: "What we work on",
        items: [
          "Emotional readiness and self-talk",
          "Food relationship and habits",
          "Stress management and coping tools",
          "Sustainable lifestyle routines",
        ],
      },
      {
        heading: "Important note",
        items: ["This is non-medical coaching and does not replace your healthcare provider."],
      },
    ],
    cta: { label: "Book a Free Consultation", target: "contact" },
  },
  {
    key: "web",
    category: "web",
    label: "Web Design",
    title: "Web Design Program",
    subtitle:
      "A modern, fast, mobile-first site that builds trust and turns visitors into customers.",
    highlights: ["Custom design", "Mobile-first", "SEO basics", "Launch support"],
    sections: [
      {
        heading: "What’s included",
        items: [
          "Custom single-page build + launch",
          "Mobile-friendly + modern design",
          "Basic SEO setup (titles, descriptions, structure)",
          "Domain + deployment included",
        ],
      },
      {
        heading: "Add-ons available",
        items: ["Additional landing pages", "Copywriting polish", "Ongoing updates & maintenance"],
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

function keyFromLegacyHash(): string | null {
  const raw = window.location.hash.replace("#", "");
  if (!raw.startsWith("program:")) return null;
  const k = raw.replace("program:", "").trim();
  if (!k) return null;

  if (k === "coaching") return "bariatric";
  if (k === "web") return "web";
  return k;
}

export default function ProgramTabs({ category = "coaching" }: ProgramTabsProps) {
  const filtered = useMemo(() => {
    if (category === "all") return programs;
    return programs.filter((p) => p.category === category);
  }, [category]);

  const [activeKey, setActiveKey] = useState<string>(filtered[0]?.key || "web");

  const active = useMemo(() => {
    return filtered.find((p) => p.key === activeKey) ?? filtered[0];
  }, [filtered, activeKey]);

  useEffect(() => {
    setActiveKey(filtered[0]?.key || "web");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    const applyFromLegacyHash = () => {
      const k = keyFromLegacyHash();
      if (!k) return;
      if (filtered.some((p) => p.key === k)) setActiveKey(k);
    };

    applyFromLegacyHash();
    window.addEventListener("hashchange", applyFromLegacyHash);
    return () => window.removeEventListener("hashchange", applyFromLegacyHash);
  }, [filtered]);

  if (!active) return null;

  const showTabs = filtered.length > 1;

  return (
    <div className="mt-8">
      {showTabs && (
        <div className="flex flex-wrap gap-2">
          {filtered.map((p) => {
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
      )}

      <div className="mt-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-6 shadow-lg shadow-black/20">
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold tracking-tight text-white">{active.title}</h3>
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
                  <h4 className="text-lg font-semibold text-white">{sec.heading}</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-200">
                    {sec.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/15 p-5 self-start">
            <h4 className="text-lg font-semibold text-white">Ready to get started?</h4>
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

            <p className="mt-3 text-xs text-zinc-300/80">No pressure — just a quick call.</p>
          </div>
        </div>

        {active.pricing && (
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <h4 className="text-xl font-semibold text-white">Web Design Pricing</h4>
              <div className="text-right">
                <p className="text-sm text-zinc-300">{active.pricing.headline}</p>
                <p className="text-2xl font-semibold text-white">
                  {active.pricing.buildStartingAt}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white/5 border border-white/15 p-5">
                <h5 className="text-lg font-semibold text-white">One-time Website Build</h5>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-zinc-200">
                  {active.pricing.buildIncludes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-zinc-300/80">{active.pricing.ownershipNote}</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/15 p-5">
                <h5 className="text-lg font-semibold text-white">Hosting & Updates</h5>

                <div className="mt-4 space-y-4">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold text-white">Annual Hosting</p>
                      <p className="font-semibold text-white">{active.pricing.hosting.annual}</p>
                    </div>
                    <p className="mt-2 text-sm text-zinc-200">{active.pricing.hosting.annualNote}</p>
                  </div>

                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold text-white">Monthly Care</p>
                      <p className="font-semibold text-white">{active.pricing.hosting.monthly}</p>
                    </div>
                    <p className="mt-2 text-sm text-zinc-200">{active.pricing.hosting.monthlyNote}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
                  <h5 className="text-sm font-semibold text-white">Notes</h5>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-200">
                    {active.pricing.finePrint.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
