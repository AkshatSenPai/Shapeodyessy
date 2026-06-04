import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────
const categories = [
  {
    id: "funnels",
    label: "Funnels",
    icon: "filter_alt",
    accentColor: "primary",
    accentClass: "text-primary",
    borderClass: "border-primary/40",
    bgClass: "bg-primary/10",
    glowClass: "shadow-[0_0_60px_rgba(0,245,255,0.08)]",
    plans: [
      {
        name: "Growth Funnel",
        tag: "Funnel Creation",
        tagColor: "text-text-dim",
        highlighted: false,
        price: "₹9,997",
        period: "one-time setup",
        description: "Designed to nurture leads through multiple stages and increase conversion opportunities.",
        bestFor: "Agencies · Coaches · Consultants · Education · Healthcare",
        delivery: "5–7 Working Days",
        features: [
          { text: "Multi-Step Funnel", included: true },
          { text: "Lead Qualification", included: true },
          { text: "Calendar Booking", included: true },
          { text: "CRM Pipeline Setup", included: true },
          { text: "Multi-Stage Email Automation", included: true },
          { text: "Multi-Stage WhatsApp Automation", included: true },
          { text: "Lead Scoring", included: true },
          { text: "Follow-Up Workflows", included: true },
          { text: "Conversion Tracking", included: true },
          { text: "Sales Pipeline Visibility", included: true },
        ],
      },
      {
        name: "Scale Funnel",
        tag: "Advanced Funnel",
        tagColor: "text-primary",
        highlighted: true,
        recommended: true,
        price: "₹19,997",
        period: "one-time setup",
        description: "A complete sales and automation ecosystem designed for businesses focused on growth and scale.",
        bestFor: "Real Estate · Healthcare · Education · High-Ticket Businesses · Scaling Companies",
        delivery: "7–10 Working Days",
        features: [
          { text: "Advanced Funnel Architecture", included: true },
          { text: "Customer Journey Mapping", included: true },
          { text: "CRM Architecture", included: true },
          { text: "Appointment Booking System", included: true },
          { text: "Advanced Email Automation", included: true },
          { text: "Advanced WhatsApp Automation", included: true },
          { text: "Lead Segmentation", included: true },
          { text: "Re-Engagement Campaigns", included: true },
          { text: "Pipeline Management", included: true },
          { text: "Reporting Dashboard", included: true },
          { text: "Conversion Analytics", included: true },
        ],
      },
    ],
    maintenance: {
      name: "Funnel Growth Care",
      icon: "build",
      desc: "Ongoing funnel, automation, and CRM care to keep the lead journey improving every month.",
      price: "₹9,997",
      period: "/ month",
      perks: [
        "Funnel Updates",
        "Automation Maintenance",
        "CRM Optimization",
        "Workflow Improvements",
        "Lead Journey Enhancements",
        "Reporting Dashboard",
        "Performance Monitoring",
        "Conversion Improvement Suggestions",
      ],
    },
  },
  {
    id: "meta",
    label: "Meta Ads",
    icon: "campaign",
    accentColor: "primary",
    accentClass: "text-primary",
    borderClass: "border-primary/40",
    bgClass: "bg-primary/10",
    glowClass: "shadow-[0_0_60px_rgba(0,245,255,0.08)]",
    plans: [
      {
        name: "Meta Ads Setup",
        tag: "Facebook & Instagram",
        tagColor: "text-primary",
        highlighted: true,
        price: "₹9,997",
        period: "one-time setup",
        bestFor: "Local Businesses · Service Providers · Clinics · Real Estate · Coaches & Consultants · Education",
        delivery: "3–5 Working Days",
        features: [
          { text: "Meta Business Manager Setup", included: true },
          { text: "Pixel Installation", included: true },
          { text: "Conversion Event Tracking", included: true },
          { text: "Audience Research", included: true },
          { text: "Campaign Structure Setup", included: true },
          { text: "Ad Copy Assistance", included: true },
          { text: "Campaign Launch", included: true },
          { text: "CRM Integration", included: true },
          { text: "Lead Tracking Setup", included: true },
          { text: "Basic Reporting Configuration", included: true },
        ],
      },
    ],
    maintenance: {
      name: "Meta Ads Management",
      icon: "manage_accounts",
      desc: "Monthly campaign management for Meta campaigns with tracking, optimization, and performance reviews.",
      price: "₹19,997/mo or 20% of ad spend",
      period: "(whichever is higher)",
      perks: [
        "Campaign Monitoring",
        "Audience Optimization",
        "Budget Optimization",
        "Retargeting Campaigns",
        "Lead Tracking",
        "Monthly Reporting",
        "Performance Reviews",
        "Strategy Recommendations",
      ],
    },
  },
  {
    id: "google",
    label: "Google Ads",
    icon: "ads_click",
    accentColor: "secondary",
    accentClass: "text-secondary",
    borderClass: "border-secondary/40",
    bgClass: "bg-secondary/10",
    glowClass: "shadow-[0_0_60px_rgba(138,43,226,0.08)]",
    plans: [
      {
        name: "Google Ads Setup",
        tag: "Search Campaign Setup",
        tagColor: "text-secondary",
        highlighted: true,
        price: "₹19,997",
        period: "one-time setup",
        bestFor: "Search Traffic · High-Intent Lead Generation · Local Service Businesses · B2B Companies",
        delivery: "5–7 Working Days",
        features: [
          { text: "Google Ads Account Setup", included: true },
          { text: "Keyword Research", included: true },
          { text: "Competitor Analysis", included: true },
          { text: "Search Campaign Setup", included: true },
          { text: "Conversion Tracking", included: true },
          { text: "Call Tracking Setup", included: true },
          { text: "Analytics Integration", included: true },
          { text: "Landing Page Integration", included: true },
          { text: "Campaign Launch", included: true },
        ],
      },
    ],
    maintenance: {
      name: "Google Ads Management",
      icon: "query_stats",
      desc: "Monthly optimization for search campaigns, bids, keywords, conversions, and growth recommendations.",
      price: "₹29,997/mo or 20% of ad spend",
      period: "(whichever is higher)",
      perks: [
        "Keyword Optimization",
        "Bid Optimization",
        "Search Term Analysis",
        "Conversion Optimization",
        "Negative Keyword Updates",
        "Performance Reporting",
        "Monthly Reviews",
        "Growth Recommendations",
      ],
    },
  },
  {
    id: "website",
    label: "Website",
    icon: "web",
    accentColor: "primary",
    accentClass: "text-primary",
    borderClass: "border-primary/40",
    bgClass: "bg-primary/10",
    glowClass: "shadow-[0_0_60px_rgba(0,245,255,0.08)]",
    plans: [
      {
        name: "Business Presence Website",
        tag: "Credibility Website",
        tagColor: "text-text-dim",
        highlighted: false,
        price: "₹14,997",
        period: "one-time setup",
        description: "A professional website that establishes credibility and makes it easy for prospects to contact you.",
        delivery: "5–7 Working Days",
        features: [
          { text: "Up to 5 Pages", included: true },
          { text: "Mobile Responsive Design", included: true },
          { text: "Contact Forms", included: true },
          { text: "WhatsApp Integration", included: true },
          { text: "Basic SEO Setup", included: true },
          { text: "SSL Security", included: true },
          { text: "Speed Optimization", included: true },
          { text: "Lead Enquiry Forms", included: true },
        ],
      },
      {
        name: "Growth Website",
        tag: "Lead Generation Website",
        tagColor: "text-primary",
        highlighted: true,
        recommended: true,
        price: "₹29,997",
        period: "one-time setup",
        description: "A lead-generation-focused website designed to convert visitors into enquiries and appointments.",
        delivery: "7–14 Working Days",
        features: [
          { text: "Up to 15 Pages", included: true },
          { text: "Blog Setup", included: true },
          { text: "CRM Integration", included: true },
          { text: "Lead Capture Forms", included: true },
          { text: "Analytics Integration", included: true },
          { text: "SEO Foundation", included: true },
          { text: "Mobile Optimization", included: true },
          { text: "Conversion-Focused Design", included: true },
          { text: "Speed Optimization", included: true },
          { text: "Strategic CTAs", included: true },
        ],
      },
      {
        name: "Enterprise Growth Website",
        tag: "Advanced Platform",
        tagColor: "text-primary",
        highlighted: false,
        price: "₹49,997",
        period: "one-time setup",
        description: "A complete digital business platform with advanced automation and integrations.",
        delivery: "14–21 Working Days",
        features: [
          { text: "Custom Design", included: true },
          { text: "Unlimited Core Pages", included: true },
          { text: "Advanced Integrations", included: true },
          { text: "Automation Workflows", included: true },
          { text: "CRM Connectivity", included: true },
          { text: "Analytics Setup", included: true },
          { text: "SEO Foundation", included: true },
          { text: "Conversion Tracking", included: true },
          { text: "Lead Management Integration", included: true },
          { text: "Performance Optimization", included: true },
        ],
      },
    ],
    maintenance: [
      {
        name: "Essential Website Care",
        icon: "health_and_safety",
        desc: "Essential technical care for content, security, plugins, and support.",
        price: "₹4,997",
        period: "/ month",
        perks: [
          "Security Monitoring",
          "Content Updates",
          "Plugin Updates",
          "Performance Monitoring",
          "Minor Design Changes",
          "Technical Support",
        ],
      },
      {
        name: "Growth Website Care",
        icon: "workspace_premium",
        desc: "Priority support and conversion-focused website improvements for growing businesses.",
        price: "₹9,997",
        period: "/ month",
        perks: [
          "Priority Support",
          "Monthly Content Updates",
          "Landing Page Creation",
          "Conversion Optimization",
          "Technical Improvements",
          "Security Monitoring",
          "Performance Enhancements",
          "Strategic Recommendations",
        ],
      },
    ],
  },
  {
    id: "packages",
    label: "Packages",
    icon: "hub",
    accentColor: "secondary",
    accentClass: "text-secondary",
    borderClass: "border-secondary/40",
    bgClass: "bg-secondary/10",
    glowClass: "shadow-[0_0_60px_rgba(138,43,226,0.08)]",
    plans: [
      {
        name: "Meta Ads + Funnel",
        tag: "Growth System Package",
        tagColor: "text-secondary",
        highlighted: false,
        price: "₹19,997",
        period: "one-time setup",
        features: [
          { text: "Meta Ads Setup", included: true },
          { text: "Scale Funnel", included: true },
          { text: "CRM Integration", included: true },
          { text: "Lead Tracking Setup", included: true },
          { text: "Basic Automation", included: true },
        ],
        monthly: {
          price: "₹24,997/mo or 20% of Ad Spend",
          period: "whichever is higher",
          features: [
            "Meta Ads Management",
            "Funnel Growth Care",
            "Monthly Reporting",
            "Arkquen Growth Plan Included",
          ],
        },
      },
      {
        name: "Google Ads + Funnel",
        tag: "Growth System Package",
        tagColor: "text-secondary",
        highlighted: false,
        price: "₹29,997",
        period: "one-time setup",
        features: [
          { text: "Google Ads Setup", included: true },
          { text: "Scale Funnel", included: true },
          { text: "CRM Integration", included: true },
          { text: "Analytics Setup", included: true },
          { text: "Tracking Configuration", included: true },
        ],
        monthly: {
          price: "₹34,997/mo or 20% of Ad Spend",
          period: "whichever is higher",
          features: [
            "Google Ads Management",
            "Funnel Growth Care",
            "Monthly Reporting",
            "Arkquen Growth Plan Included",
          ],
        },
      },
      {
        name: "Meta + Google Ads + Funnel",
        tag: "Complete Growth System",
        tagColor: "text-secondary",
        highlighted: true,
        recommended: true,
        price: "₹34,997",
        period: "one-time setup",
        features: [
          { text: "Meta Ads Setup", included: true },
          { text: "Google Ads Setup", included: true },
          { text: "Scale Funnel", included: true },
          { text: "CRM Integration", included: true },
          { text: "Automation Setup", included: true },
          { text: "Conversion Tracking", included: true },
          { text: "Analytics Configuration", included: true },
        ],
        monthly: {
          price: "₹44,997/mo or 20% of Total Ad Spend",
          period: "monthly management",
          features: [
            "Meta Ads Management",
            "Google Ads Management",
            "Funnel Growth Care",
            "Monthly Strategy Reviews",
            "Performance Reporting",
            "Optimization Planning",
          ],
        },
      },
    ],
  },
];

// ── SINGLE PLAN (wide horizontal layout) ─────────────────────────────────
function SinglePlanLayout({ plan, active }) {
  const includedCount = plan.features.filter(f => f.included).length;
  return (
    <div className={`anim-card glow-card ${active.accentClass === "text-secondary" ? "glass-panel-accent-secondary" : "glass-panel-accent"} rounded-2xl border border-primary/20 overflow-hidden mb-8`}
      style={{ borderTopColor: active.accentClass === "text-secondary" ? "rgba(138,43,226,0.6)" : "rgba(0,245,255,0.6)", borderTopWidth: "2px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — plan details */}
        <div className="p-10 md:p-14 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-white/5">
          <div>
            <p className={`font-mono text-[10px] uppercase tracking-widest mb-3 ${plan.tagColor}`}>{plan.tag}</p>
            <h2 className="font-headline text-3xl md:text-4xl font-medium text-white">{plan.name}</h2>
            {plan.description && (
              <p className="font-body text-sm text-text-muted font-light leading-relaxed mt-4">{plan.description}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <div className={`font-headline text-5xl md:text-6xl font-medium tracking-tight leading-none ${active.accentClass}`}>{plan.price}</div>
            <div className="font-mono text-[10px] text-text-dim uppercase tracking-widest mt-2">{plan.period}</div>
          </div>

          {/* What's inside summary */}
          <div className="flex items-center gap-3 glass-panel border border-white/5 rounded-xl px-5 py-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active.bgClass} border ${active.borderClass} flex-shrink-0`}>
              <span className={`material-symbols-outlined text-sm ${active.accentClass}`}>checklist</span>
            </div>
            <div>
              <div className="font-mono text-xs text-white font-medium">{includedCount} deliverables included</div>
              <div className="font-mono text-[9px] text-text-dim uppercase tracking-widest">See full list →</div>
            </div>
          </div>

          {(plan.bestFor || plan.delivery) && (
            <div className="space-y-3">
              {plan.bestFor && (
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest leading-relaxed">
                  <span className={active.accentClass}>Best for:</span> {plan.bestFor}
                </p>
              )}
              {plan.delivery && (
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                  <span className={active.accentClass}>Delivery:</span> {plan.delivery}
                </p>
              )}
            </div>
          )}

          {/* CTA */}
          <Link
            to="/webinar"
            className={`btn-magnetic relative font-mono text-sm uppercase tracking-widest font-bold px-10 py-5 group overflow-hidden bg-white hover:bg-transparent transition-colors duration-500 rounded-sm text-center text-background`}
          >
            <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center justify-center gap-3">
              Get Started
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>

          <p className="font-mono text-[9px] text-text-dim uppercase tracking-widest text-center">
            One-time payment · No recurring fees
          </p>
        </div>

        {/* Right — features grid */}
        <div className="p-10 md:p-14 flex flex-col">
          <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest mb-8">Everything included</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-grow">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${active.bgClass} border ${active.borderClass}`}>
                  <span className={`material-symbols-outlined text-sm ${active.accentClass}`}>check</span>
                </div>
                <div className="pt-1">
                  <span className="font-body text-sm text-text-main leading-relaxed">{f.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── PLAN CARD (used for 2-plan tabs like Funnels) ─────────────────────────
function PlanCard({ plan, active }) {
  const isHighlighted = plan.highlighted;
  const isPackagePlan = active.id === "packages";
  const usePurpleAccent = active.accentClass === "text-secondary" || active.id === "funnels";
  const cardBorderClass = usePurpleAccent ? "border-secondary/40" : active.borderClass;
  const cardBgClass = usePurpleAccent ? "bg-secondary/10" : active.bgClass;
  const cardAccentClass = usePurpleAccent ? "text-secondary" : active.accentClass;
  const cardGlowClass = active.accentClass === "text-secondary"
    ? active.glowClass
    : usePurpleAccent
      ? "shadow-[0_0_60px_rgba(138,43,226,0.12)]"
      : active.glowClass;
  const pillScale = 1;
  const pillTextScale = 1 / pillScale;

  return (
    <div
      className={`pricing-plan-card relative rounded-2xl flex flex-col h-full overflow-hidden anim-card glow-card transition-transform duration-300 hover:-translate-y-1
        ${isHighlighted
          ? `${usePurpleAccent ? "glass-panel-accent-secondary" : "glass-panel-accent"} border-t-2 ${cardBorderClass} ${cardGlowClass}`
          : "glass-panel border border-white/5"
        }`}
    >
      {plan.recommended && (
        <div
          className={`absolute top-0 left-1/2 ${cardBgClass} border-b border-l border-r ${cardBorderClass} px-4 py-1.5 rounded-bl-xl rounded-br-xl`}
          style={{ transform: `translateX(-50%) scaleX(${pillScale})`, transformOrigin: "top center" }}
        >
          <span
            className={`font-mono text-[9px] ${cardAccentClass} uppercase tracking-widest`}
            style={{ transform: `scaleX(${pillTextScale})`, display: "inline-block" }}
          >
            Recommended
          </span>
        </div>
      )}

      <div className="p-8 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-white/5">
          <p className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${plan.tagColor}`}>{plan.tag}</p>
          <h3 className="font-headline text-2xl font-medium text-white">{plan.name}</h3>
          {plan.description && (
            <p className="font-body text-sm text-text-muted font-light leading-relaxed mt-3">{plan.description}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-8 pb-6 border-b border-white/5">
          <span className={`font-headline text-4xl font-medium tracking-tight ${isHighlighted ? active.accentClass : "text-white"}`}>{plan.price}</span>
          <div className="mt-1">
            <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">{plan.period}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-4 flex-grow mb-8">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`material-symbols-outlined text-sm mt-0.5 flex-shrink-0 ${f.included ? (isHighlighted ? active.accentClass : "text-text-muted") : "text-white/10"}`}>
                {f.included ? "check_circle" : "remove_circle"}
              </span>
              <span className={`font-body text-sm leading-relaxed ${f.included ? "text-text-main" : "text-text-dim line-through decoration-white/10"}`}>
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {(plan.bestFor || plan.delivery) && (
          <div className="space-y-2 mb-8">
            {plan.bestFor && (
              <p className="font-mono text-[9px] text-text-dim uppercase tracking-widest leading-relaxed">
                <span className={isHighlighted ? active.accentClass : "text-white"}>Best for:</span> {plan.bestFor}
              </p>
            )}
            {plan.delivery && (
              <p className="font-mono text-[9px] text-text-dim uppercase tracking-widest">
                <span className={isHighlighted ? active.accentClass : "text-white"}>Delivery:</span> {plan.delivery}
              </p>
            )}
          </div>
        )}

        {plan.monthly && (
          <div className={`mb-8 rounded-xl border border-white/5 bg-white/[0.03] p-5 flex flex-col ${isPackagePlan ? "min-h-[21rem]" : ""}`}>
            <p className="font-mono text-[9px] text-text-dim uppercase tracking-widest mb-3">Monthly Management</p>
            <div className={isPackagePlan ? "min-h-[4.5rem]" : ""}>
              <div className={`font-headline text-xl font-medium leading-tight ${isHighlighted ? active.accentClass : "text-white"}`}>{plan.monthly.price}</div>
              <p className="font-mono text-[9px] text-text-dim uppercase tracking-widest mt-1 mb-4">{plan.monthly.period}</p>
            </div>
            <ul className="space-y-3 flex-grow">
              {plan.monthly.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`material-symbols-outlined text-sm mt-0.5 flex-shrink-0 ${isHighlighted ? active.accentClass : "text-text-muted"}`}>check_circle</span>
                  <span className="font-body text-sm leading-relaxed text-text-muted">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <Link
          to="/webinar"
          className={`btn-magnetic w-full relative font-mono text-xs uppercase tracking-widest py-4 rounded-sm text-center group overflow-hidden transition-colors duration-500
            ${isHighlighted
              ? "bg-white text-background hover:bg-transparent font-bold"
              : "border border-white/10 text-white hover:border-white/30"
            }`}
        >
          <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2">
            Get Started
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
          {isHighlighted && (
            <>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}

// ── MAINTENANCE CARD ──────────────────────────────────────────────────────
function MaintenanceCard({ data, accentClass, borderClass, bgClass, panelClass = "glass-panel" }) {
  return (
    <div className={`${panelClass} glow-card anim-card rounded-2xl border-t-2 ${borderClass} overflow-hidden`}
      style={{ borderTopWidth: "2px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3">

        {/* Left — identity */}
        <div className={`p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-white/5 ${bgClass} bg-opacity-30`}>
          <div className={`w-14 h-14 rounded-xl ${bgClass} border ${borderClass} flex items-center justify-center`}>
            <span className={`material-symbols-outlined text-2xl ${accentClass}`}>{data.icon}</span>
          </div>
          <div>
            <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest mb-2">Monthly Retainer</p>
            <h3 className="font-headline text-2xl font-medium text-white">{data.name}</h3>
            <p className="font-body text-sm text-text-muted font-light leading-relaxed mt-3">{data.desc}</p>
          </div>
        </div>

        {/* Middle — perks */}
        <div className="p-10 border-b lg:border-b-0 lg:border-r border-white/5">
          <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest mb-6">What's included</p>
          <ul className="space-y-4">
            {data.perks.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center ${bgClass} border ${borderClass} mt-0.5`}>
                  <span className={`material-symbols-outlined text-xs ${accentClass}`}>check</span>
                </div>
                <span className="font-body text-sm text-text-muted leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — price + CTA */}
        <div className="p-10 flex flex-col justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest mb-4">Monthly investment</p>
            <div className={`font-headline text-3xl font-medium leading-tight ${accentClass}`}>{data.price}</div>
            <div className="font-mono text-[10px] text-text-dim uppercase tracking-widest mt-2">{data.period}</div>
          </div>
          <div className="space-y-3">
            <Link
              to="/webinar"
              className={`btn-magnetic w-full relative font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 group overflow-hidden bg-white hover:bg-transparent text-background transition-colors duration-500 rounded-sm text-center block`}
            >
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2">
                Enquire Now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            <p className="font-mono text-[9px] text-text-dim text-center uppercase tracking-widest">
              {data.note || "Minimum 3 months · billed in advance"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────
export default function Pricing() {
  const [activeTab, setActiveTab] = useState("funnels");

  const active = categories.find((c) => c.id === activeTab);
  const maintenancePlans = active.maintenance
    ? Array.isArray(active.maintenance) ? active.maintenance : [active.maintenance]
    : [];
  const usePurpleAccent = active.accentClass === "text-secondary" || active.id === "funnels";
  const retainerAccentClass = usePurpleAccent ? "text-secondary" : active.accentClass;
  const retainerBorderClass = usePurpleAccent ? "border-secondary/40" : active.borderClass;
  const retainerBgClass = usePurpleAccent ? "bg-secondary/10" : active.bgClass;
  const retainerPanelClass = usePurpleAccent ? "glass-panel-accent-secondary" : "glass-panel";

  useEffect(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const tl = gsap.timeline();
    tl.from(".anim-fade-up", { y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" })
      .from(".anim-card", { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }, "-=0.5");

    document.querySelectorAll(".glow-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    });

    document.querySelectorAll(".btn-magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.2}px, ${(e.clientY - rect.top - rect.height / 2) * 0.2}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0, 0)"; });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  // Re-animate cards when tab changes
  useEffect(() => {
    gsap.fromTo(".anim-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.2)" });
  }, [activeTab]);

  return (
    <main className="flex-grow relative z-10 pt-28 pb-0 min-h-screen">

      {/* ── BG ── */}
      <div className="absolute inset-0 bg-grid z-0 h-[70vh]"></div>
      <div className="ambient-orb w-[900px] h-[600px] bg-primary/8 top-0 left-1/2 -translate-x-1/2 mix-blend-screen"></div>
      <div className="ambient-orb w-[400px] h-[400px] bg-secondary/6 top-32 right-0 mix-blend-screen translate-x-1/2"></div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">

        {/* ── HEADER ── */}
        <div className="text-center max-w-4xl mx-auto mb-16 anim-fade-up pt-8">
          <div className="flex justify-center mb-8">
            <p className="font-mono text-primary tracking-widest uppercase text-xs flex items-center gap-4">
              <span className="w-8 h-[1px] bg-primary"></span> Service Plans <span className="w-8 h-[1px] bg-primary"></span>
            </p>
          </div>
          <h1 className="text-[2.2rem] md:text-[5rem] lg:text-[7rem] font-headline font-medium tracking-tighter text-white leading-[0.88] mb-6">
            PICK YOUR<br />
            <span className="animate-gradient-text italic font-light">GROWTH ENGINE.</span>
          </h1>
          <p className="text-base md:text-lg font-body text-text-muted font-light leading-relaxed max-w-2xl mx-auto">
            Every service built for conversion. Choose a one-time build, an ongoing retainer, or stack both for compounding results.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 glass-panel border border-white/5 rounded-full px-6 py-3">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Webinar attendees get exclusive session-only pricing</span>
          </div>
        </div>

        {/* ── TAB STRIP ── */}
        <div className="flex justify-center mb-16 anim-fade-up">
          <div
            className="flex flex-wrap justify-center gap-1 p-1.5 rounded-2xl max-w-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              const isCyan   = cat.accentClass === "text-primary";
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className="relative flex flex-col items-center gap-1.5 px-6 py-3 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all duration-300 group select-none"
                  style={
                    isActive
                      ? {
                          background: isCyan
                            ? "linear-gradient(145deg, rgba(0,245,255,0.18), rgba(0,200,220,0.10))"
                            : "linear-gradient(145deg, rgba(138,43,226,0.22), rgba(100,30,180,0.12))",
                          border: `1px solid ${isCyan ? "rgba(0,245,255,0.3)" : "rgba(138,43,226,0.35)"}`,
                          boxShadow: isCyan
                            ? "0 0 20px rgba(0,245,255,0.1), inset 0 1px 0 rgba(0,245,255,0.15)"
                            : "0 0 20px rgba(138,43,226,0.12), inset 0 1px 0 rgba(138,43,226,0.18)",
                        }
                      : {
                          background: "transparent",
                          border: "1px solid transparent",
                        }
                  }
                >
                  <span
                    className={`material-symbols-outlined transition-all duration-300`}
                    style={{
                      fontSize: "22px",
                      color: isActive
                        ? isCyan ? "#00F5FF" : "#8A2BE2"
                        : "rgba(161,161,170,0.7)",
                      filter: isActive
                        ? isCyan ? "drop-shadow(0 0 6px rgba(0,245,255,0.7))" : "drop-shadow(0 0 6px rgba(138,43,226,0.7))"
                        : "none",
                    }}
                  >
                    {cat.icon}
                  </span>
                  <span
                    className="transition-colors duration-300"
                    style={{ color: isActive ? "#ffffff" : "rgba(161,161,170,0.6)" }}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── SECTION LABEL ── */}
        <div className="flex items-center gap-4 mb-10 anim-fade-up">
          <div className={`w-10 h-10 rounded-xl ${active.bgClass} border ${active.borderClass} flex items-center justify-center`}>
            <span className={`material-symbols-outlined ${active.accentClass} text-xl`}>{active.icon}</span>
          </div>
          <div>
            <h2 className="font-headline text-2xl md:text-3xl font-medium text-white">{active.label} Plans</h2>
            <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
              {active.id === "packages" ? "Setup + monthly management bundles" : "One-time build options"}
            </p>
          </div>
        </div>

        {/* ── PLAN CARDS ── */}
        {active.plans.length === 1 ? (
          <SinglePlanLayout plan={active.plans[0]} active={active} />
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 ${active.plans.length >= 3 ? "xl:grid-cols-3" : ""} gap-6 mb-8`}>
            {active.plans.map((plan, i) => (
              <PlanCard key={i} plan={plan} active={active} />
            ))}
          </div>
        )}

        {/* ── MAINTENANCE CARD ── */}
        {maintenancePlans.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-8 h-8 rounded-lg ${retainerBgClass} border ${retainerBorderClass} flex items-center justify-center flex-shrink-0`}>
                <span className={`material-symbols-outlined text-sm ${retainerAccentClass}`}>autorenew</span>
              </div>
              <div>
                <p className="font-headline text-lg font-medium text-white">
                  Monthly Retainer{maintenancePlans.length > 1 ? "s" : ""}
                </p>
                <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Ongoing management & optimisation</p>
              </div>
            </div>
            <div className="space-y-6">
              {maintenancePlans.map((plan, i) => (
                <MaintenanceCard
                  key={i}
                  data={plan}
                  accentClass={retainerAccentClass}
                  borderClass={retainerBorderClass}
                  bgClass={retainerBgClass}
                  panelClass={retainerPanelClass}
                />
              ))}
            </div>
          </div>
        )}

        <div className="section-divider mx-0 my-16"></div>

        {/* ── ALL SERVICES OVERVIEW ── */}
        <div className="mb-16 anim-fade-up">
          <div className="text-center mb-12">
            <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-3">Everything we offer</p>
            <h2 className="font-headline text-3xl md:text-4xl font-medium text-white tracking-tighter">FULL SERVICE OVERVIEW</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const retainerCount = cat.maintenance
                ? Array.isArray(cat.maintenance) ? cat.maintenance.length : 1
                : 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveTab(cat.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`glass-panel glow-card rounded-xl p-6 text-left flex flex-col gap-4 border hover:border-white/15 transition-all duration-300 hover:-translate-y-1 group ${activeTab === cat.id ? cat.borderClass : "border-white/5"}`}
                >
                  <div className={`w-12 h-12 rounded-xl ${cat.bgClass} border ${cat.borderClass} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${cat.accentClass} text-xl`}>{cat.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline text-base font-medium text-white mb-1">{cat.label}</h3>
                    <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                      {cat.plans.length} plan{cat.plans.length > 1 ? "s" : ""} {retainerCount > 0 ? `+ ${retainerCount > 1 ? `${retainerCount} retainers` : "retainer"}` : "+ management"}
                    </p>
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors group-hover:gap-2.5 duration-300 ${activeTab === cat.id ? cat.accentClass : "text-text-dim group-hover:text-white"}`}>
                    View plans <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="section-divider mx-0 my-16"></div>

        {/* ── BOTTOM CTA ── */}
        <div className="flex flex-col items-center text-center pb-24 anim-fade-up">
          <h3 className="text-2xl md:text-3xl font-headline font-medium text-white mb-4">
            Not sure which plan is right?
          </h3>
          <p className="font-body text-text-muted text-sm font-light mb-10 max-w-md leading-relaxed">
            Join our free live webinar. We'll walk through every service, show real results, and help you find the perfect fit for your business — live.
          </p>
          <Link
            to="/webinar"
            className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-background font-bold px-14 py-5 group overflow-hidden bg-white hover:bg-transparent transition-colors duration-500 rounded-sm"
          >
            <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center gap-3">
              Join Free Webinar
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </div>

      </div>
    </main>
  );
}
