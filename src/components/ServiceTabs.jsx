import React, { useMemo, useState } from "react";

const services = [
  {
    key: "bariatric",
    label: "Bariatric Coaching",
    title: "Support Before & After Bariatric Surgery",
    subtitle:
      "Life coaching to help you prepare mentally, emotionally, and lifestyle-wise — so your weight-loss surgery leads to lasting success.",
    bullets: [
      "Pre-op preparation",
      "Post-op lifestyle & mindset coaching",
      "Ongoing accountability & support",
    ],
    sections: [
      {
        heading: "Who this coaching is for",
        items: [
          "Preparing for gastric bypass or sleeve surgery",
          "Struggling with emotional eating or fear of surgery",
          "Adjusting to life after surgery",
          "Maintaining weight loss long-term",
          "Navigating identity, confidence & lifestyle changes",
        ],
      },
      {
        heading: "How coaching helps",
        items: [
          "Mindset & emotional readiness",
          "Building healthy routines",
          "Managing food relationships",
          "Coping with stress, fear, or plateaus",
          "Long-term lifestyle sustainability",
        ],
        note:
          "This is non-medical coaching and does not replace your healthcare provider.",
      },
    ],
    cta: { label: "Book a Free Discovery Call", target: "contact" },
  },
  {
    key: "web",
    label: "Web Design",
    title: "Websites That Turn Visitors Into Customers",
    subtitle:
      "Modern, fast, and mobile-friendly web design built to grow your business — not just look good.",
    bullets: ["Custom design", "Mobile & SEO optimized", "Fast loading & secure"],
    sections: [
      {
        heading: "Why it matters",
        items: [
          "Your website is your first impression — make it count.",
          "Clean, responsive design tailored to your brand.",
          "Built to help you stand out online and convert more visitors into customers.",
        ],
      },
    ],
    cta: { label: "Get a Free Consultation", target: "contact" },
  },
  {
    key: "notary",
    label: "Mobile Notary",
    title: "Online & Mobile Notary",
    subtitle:
      "Fast, secure, and convenient online and mobile notary services designed to fit your schedule.",
    bullets: [
      "Mobile notary — we travel to you",
      "Same-day & after-hours appointments",
      "Remote online notarization (RON)",
      "Licensed, bonded & insured",
    ],
    sections: [
      {
        heading: "What you can expect",
        items: [
          "Home, office, hospital, or other location — we make the process simple and stress-free.",
          "Professionalism, accuracy, and confidentiality.",
          "Emergency notarizations available.",
        ],
      },
    ],
    cta: { label: "Book an Appointment", target: "contact" },
  },
];

export default function ServiceTabs() {
  const [activeKey, setActiveKey] = useState("bariatric");

  const active = useMemo(
    () => services.find((s) => s.key === activeKey) ?? services[0],
    [activeKey]
  );

  const programButton =
    active.key === "web"
      ? { label: "View Web Design Program", hash: "#program:web" }
      : active.key === "bariatric"
        ? { label: "View Coaching Program", hash: "#program:coaching" }
        : null;

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 shadow-lg shadow-black/20">
      <div className="flex flex-wrap gap-2">
        {services.map((s) => {
          const isActive = s.key === activeKey;
          return (
            <button
              key={s.key}
              onClick={() => setActiveKey(s.key)}
              className={[
                "rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/30",
                isActive
                  ? "bg-white text-slate-900"
                  : "border border-white/20 bg-white/5 text-white hover:bg-white/10",
              ].join(" ")}
              type="button"
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {active.title}
          </h3>
          <p className="mt-2 text-zinc-200">{active.subtitle}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {active.bullets.map((b) => (
              <span
                key={b}
                className="rounded-full bg-white/10 border border-white/15 px-3 py-1 text-sm text-zinc-100"
              >
                {b}
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
                {sec.note ? (
                  <p className="mt-3 text-sm text-zinc-300/80">{sec.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/15 p-5">
          <h4 className="text-lg font-semibold text-white">Ready to get started?</h4>
          <p className="mt-2 text-zinc-200">
            Schedule a free consultation and we’ll map the best next steps.
          </p>

          <button
            type="button"
            data-nav
            data-target={active.cta.target}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-zinc-200 transition focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {active.cta.label}
          </button>

          {programButton && (
            <button
              type="button"
              onClick={() => {
                window.location.hash = programButton.hash;
              }}
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {programButton.label}
            </button>
          )}

          <p className="mt-3 text-xs text-zinc-300/80">
            No pressure — just a quick call to see what you need.
          </p>
        </div>
      </div>
    </div>
  );
}
