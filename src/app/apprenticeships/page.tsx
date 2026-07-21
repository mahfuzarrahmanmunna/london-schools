"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Users,
  Trophy,
  ChevronDown,
  Phone,
  PoundSterling,
  Zap,
} from "lucide-react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { apprenticeshipLevels } from "@/app/data/apprenticeshipData";

gsap.registerPlugin(ScrollTrigger);

/* ─── Helpers ─────────────────────────────────────── */

function StatIcon({ name }: { name: string }) {
  const c = "h-3.5 w-3.5";
  switch (name) {
    case "pass-rate":
      return <Trophy className={c} />;
    case "duration":
      return <Clock className={c} />;
    case "modules":
      return <BookOpen className={c} />;
    case "learners":
      return <Users className={c} />;
    default:
      return <CheckCircle2 className={c} />;
  }
}

/* ─── Sticky Level Card ──────────────────────────── */

function StickyLevelCard({
  app,
  index,
  total,
  cardRef,
}: {
  app: (typeof apprenticeshipLevels)[0];
  index: number;
  total: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        zIndex: index + 1,
        background: `linear-gradient(160deg, ${app.color}07 0%, #f8fafc 35%, ${app.color}04 100%)`,
      }}
    >
      {/* Decorative large number */}
      <div
        className="absolute right-[2%] top-1/2 -translate-y-1/2 text-[30vw] font-black leading-none select-none pointer-events-none"
        style={{ color: app.color, opacity: 0.025 }}
      >
        {app.level}
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "36px 36px",
          color: app.color,
          opacity: 0.02,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* ── Left: Info ── */}
          <div className="lg:col-span-7">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-600 px-3.5 py-1.5 text-[10px] font-bold tracking-wider uppercase border border-emerald-100">
                <Zap className="h-3 w-3" />
                Fully Funded
              </span>
              <span
                className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${app.badgeColor}`}
              >
                {app.badge}
              </span>
              {app.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-600 px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase border border-amber-100">
                  <Zap className="h-2.5 w-2.5" />
                  Most Popular
                </span>
              )}
            </div>

            {/* Level Number + Title */}
            <div className="flex items-baseline gap-4 mb-4">
              <span
                className="text-7xl lg:text-[100px] font-black leading-none tracking-tighter"
                style={{ color: app.color }}
              >
                {app.level}
              </span>
              <div className="min-w-0">
                <h2 className="text-[22px] lg:text-[30px] font-bold text-navy leading-tight">
                  {app.title}
                </h2>
                <p className="text-[14px] font-medium text-slate-400 mt-1">
                  {app.subtitle}
                </p>
              </div>
            </div>

            {/* Color bar */}
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: app.color }}
            />

            {/* Description */}
            <p className="text-[14px] text-slate-500 leading-relaxed max-w-lg mb-8">
              {app.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={app.href}
                className="inline-flex items-center gap-2 text-[13px] font-semibold px-6 py-3 rounded-lg text-white transition-all duration-200 hover:shadow-lg hover:shadow-black/10"
                style={{ backgroundColor: app.color }}
              >
                View Full Details
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-400 hover:text-navy transition-colors duration-200"
              >
                <Phone className="h-3.5 w-3.5" />
                Speak with an Advisor
              </Link>
            </div>
          </div>

          {/* ── Right: Stats Card ── */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40 p-7 lg:p-8">
              <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-6">
                Programme Overview
              </h3>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3.5 mb-6">
                {app.stats.slice(0, 4).map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 transition-transform duration-200 hover:scale-[1.03]"
                    style={{ backgroundColor: app.colorLight }}
                  >
                    <p
                      className="text-[22px] font-bold leading-none"
                      style={{ color: app.colorDark }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[10.5px] text-slate-400 mt-1.5 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Checkmarks */}
              <div className="space-y-3 pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-[12px] text-slate-500">
                    CIPS Accredited Qualification
                  </span>
                </div>
                {app.level >= 4 && (
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-[12px] text-slate-500">
                      MCIPS Progression Pathway
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-[12px] text-slate-500">
                    {app.duration} Typical Duration
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-[12px] text-slate-500">
                    {app.price} No Cost to Learner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Progress Dots ── */}
        <div className="flex items-center justify-center gap-2 mt-10 lg:mt-12">
          {apprenticeshipLevels.map((level, i) => (
            <div
              key={level.level}
              className="rounded-full transition-all duration-500 ease-out"
              style={{
                width: i === index ? "28px" : "8px",
                height: "8px",
                backgroundColor: i === index ? app.color : "#e2e8f0",
              }}
            />
          ))}
          <span className="ml-3 text-[11px] font-semibold text-slate-400 tabular-nums">
            {index + 1}
            <span className="text-slate-300"> / </span>
            {total}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ───────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-[13.5px] font-medium text-navy leading-snug">
          {q}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 mt-0.5 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? "200px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="pb-5 text-[12.5px] text-slate-400 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ─── Page Content (inside Lenis) ─────────────────── */

function PageContent() {
  const lenisRef = useRef<LenisRef>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  /* ── Sync Lenis RAF with GSAP ticker ── */
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  /* ── Hero entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ── Sticky card stack scroll ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.88,
            y: -30,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1]!,
              start: "top bottom",
              end: "top 12%",
              scrub: 0.8,
            },
          });
        }
      });

      // ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  /* ── Section fade-ins ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="pt-32 pb-6 md:pt-40 md:pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="hero-fade inline-block text-[11px] font-bold tracking-[0.12em] uppercase text-cips mb-6">
              Government Funded Training
            </span>
            <h1 className="hero-fade text-[36px] md:text-[52px] lg:text-[60px] font-bold text-navy leading-[1.08] tracking-tight mb-2">
              CIPS Apprenticeships
            </h1>
            <p className="hero-fade text-[17px] md:text-[19px] font-medium text-cips mb-6">
              Level 2 Level 6
            </p>
            <p className="hero-fade text-[16px] md:text-[17px] text-slate-500 leading-relaxed max-w-xl mb-9">
              Fully funded procurement qualifications for working professionals.
              Earn a salary while you study toward a recognised CIPS award.
            </p>
            <div className="hero-fade flex flex-wrap items-center gap-4">
              <Link
                href={apprenticeshipLevels.find((a) => a.featured)?.href || "#"}
                className="inline-flex items-center gap-2 bg-navy text-white text-[13px] font-semibold px-6 py-3 rounded-lg hover:bg-navy/90 transition-colors duration-150"
              >
                Explore Levels
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-navy transition-colors duration-150 underline underline-offset-4 decoration-slate-200 hover:decoration-slate-400"
              >
                <Phone className="h-3.5 w-3.5" />
                Speak with an advisor
              </Link>
            </div>
          </div>

          {/* Stat line */}
          <div className="hero-fade mt-14 pt-6 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px] text-slate-400">
              <span>
                <strong className="text-navy font-semibold">5</strong>{" "}
                qualification levels
              </span>
              <span className="hidden sm:inline text-slate-200">·</span>
              <span>
                <strong className="text-navy font-semibold">95%+</strong>{" "}
                average pass rate
              </span>
              <span className="hidden sm:inline text-slate-200">·</span>
              <span>
                <strong className="text-navy font-semibold">£0</strong> cost to
                learners
              </span>
              <span className="hidden sm:inline text-slate-200">·</span>
              <span>
                <strong className="text-navy font-semibold">100%</strong> CIPS
                accredited
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Scroll Hint ═══ */}
      <div className="flex flex-col items-center py-8 md:py-10">
        <span className="text-[11px] font-medium text-slate-300 tracking-widest uppercase mb-3">
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-slate-200 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-slate-300 animate-bounce" />
        </div>
      </div>

      {/* ═══ STICKY CARD STACK ═══ */}
      <section>
        <div
          style={{
            height: `${apprenticeshipLevels.length * 100}vh`,
          }}
        >
          {apprenticeshipLevels.map((app, i) => (
            <StickyLevelCard
              key={app.level}
              app={app}
              index={i}
              total={apprenticeshipLevels.length}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="py-16 md:py-24 bg-slate-50 section-reveal">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-2">
              Compare All Levels
            </h2>
            <p className="text-[13.5px] text-slate-400">
              Find the right starting point for your career.
            </p>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="py-3 pr-4 text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400 w-[140px] border-b-2 border-slate-200">
                    Attribute
                  </th>
                  {apprenticeshipLevels.map((app) => (
                    <th
                      key={app.level}
                      className="py-3 px-3 text-center border-b-2 border-slate-200"
                    >
                      <div
                        className="inline-flex items-center justify-center h-7 w-7 rounded-md text-[11px] font-bold text-white"
                        style={{ backgroundColor: app.color }}
                      >
                        {app.level}
                      </div>
                      <p className="text-[9.5px] text-slate-400 font-medium mt-1.5 leading-tight">
                        {app.badge}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {[
                  {
                    label: "Duration",
                    get: (a: (typeof apprenticeshipLevels)[0]) => a.duration,
                  },
                  {
                    label: "Pass Rate",
                    get: (a: (typeof apprenticeshipLevels)[0]) => a.passRate,
                  },
                  {
                    label: "Cost",
                    get: (a: (typeof apprenticeshipLevels)[0]) => a.price,
                  },
                  {
                    label: "Modules",
                    get: (a: (typeof apprenticeshipLevels)[0]) =>
                      a.modules.length,
                  },
                  {
                    label: "Learning Hours",
                    get: (a: (typeof apprenticeshipLevels)[0]) =>
                      a.stats[3]?.value ?? "—",
                  },
                  {
                    label: "CIPS Qualification",
                    get: (a: (typeof apprenticeshipLevels)[0]) =>
                      (
                        ({
                          2: "—",
                          3: "Level 3 Certificate",
                          4: "Level 4 Diploma",
                          5: "Level 5 Adv. Diploma",
                          6: "Level 6 Prof. Diploma",
                        }) as Record<number, string>
                      )[a.level] ?? "—",
                  },
                  {
                    label: "MCIPS Pathway",
                    get: (a: (typeof apprenticeshipLevels)[0]) =>
                      a.level >= 4 ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      ),
                  },
                ].map((row, ri) => (
                  <tr key={ri} className="border-b border-slate-100">
                    <td className="py-2.5 pr-4 font-medium text-slate-500 whitespace-nowrap">
                      {row.label}
                    </td>
                    {apprenticeshipLevels.map((app) => (
                      <td
                        key={app.level}
                        className="py-2.5 px-3 text-center text-slate-600"
                      >
                        {row.get(app)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ WHY + FUNDING ═══ */}
      <section className="py-16 md:py-24 section-reveal">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20">
            {/* Why 3 cols */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-2">
                Why an Apprenticeship?
              </h2>
              <p className="text-[13.5px] text-slate-400 mb-10 max-w-md">
                The smartest route to a CIPS qualification no student debt,
                real experience, and a salary from day one.
              </p>

              <div className="space-y-8">
                {[
                  {
                    num: "01",
                    title: "Fully Funded",
                    desc: "The Apprenticeship Levy or government co-investment covers all training fees. You graduate with a professional qualification and zero debt.",
                  },
                  {
                    num: "02",
                    title: "CIPS Accredited",
                    desc: "Every programme leads to a recognised CIPS qualification on the Regulated Qualifications Framework, respected by employers in every sector.",
                  },
                  {
                    num: "03",
                    title: "Earn While You Learn",
                    desc: "Employed from the start, earning a competitive salary while gaining practical skills you apply directly in your role.",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex gap-5">
                    <span className="text-[13px] font-bold text-slate-200 pt-0.5 tabular-nums select-none">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-navy mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-[12.5px] text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Funding 2 cols */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-emerald-600 mb-5 block">
                  <PoundSterling className="h-3 w-3" />
                  How Funding Works
                </span>

                <div className="divide-y divide-slate-100 border-y border-slate-100">
                  {[
                    {
                      title: "Levy-Paying Employers",
                      desc: "Organisations with a payroll over £3m use Levy funds directly no cost to the apprentice.",
                    },
                    {
                      title: "Non-Levy Employers",
                      desc: "95% government-funded. Maximum employer contribution is £750 for learners aged 19+.",
                    },
                    {
                      title: "Aged 16–18",
                      desc: "Fully funded regardless of employer size. Employers may also receive an incentive payment.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="py-5 first:pt-5 last:pb-5">
                      <h4 className="text-[13px] font-semibold text-navy mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11.5px] text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROGRESSION PATH ═══ */}
      <section className="py-16 md:py-20 bg-navy section-reveal">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-0">
            <div className="md:pr-16">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Your Path to MCIPS
              </h2>
              <p className="text-[13px] text-slate-400 max-w-sm leading-relaxed">
                Each qualification builds on the last. Complete Level 6 with the
                required experience to achieve full MCIPS status.
              </p>
            </div>

            {/* Node timeline */}
            <div className="flex items-stretch flex-1 max-w-xl">
              {apprenticeshipLevels.map((app, i) => (
                <div
                  key={app.level}
                  className="flex flex-col items-center flex-1 relative"
                >
                  {i > 0 && (
                    <div className="absolute left-0 top-[14px] w-1/2 h-px bg-slate-700" />
                  )}
                  {i < apprenticeshipLevels.length - 1 && (
                    <div className="absolute right-0 top-[14px] w-1/2 h-px bg-slate-700" />
                  )}

                  <Link
                    href={app.href}
                    className="group flex flex-col items-center"
                  >
                    <div
                      className={`relative z-10 flex items-center justify-center rounded-full text-[13px] font-bold text-white transition-transform duration-200 group-hover:scale-110 ${
                        app.featured
                          ? "h-11 w-11 ring-2 ring-cips/40 ring-offset-2 ring-offset-navy"
                          : "h-7 w-7"
                      }`}
                      style={{ backgroundColor: app.color }}
                    >
                      {app.level}
                    </div>
                    <p className="mt-2.5 text-[10px] font-medium text-slate-500 leading-tight text-center px-1">
                      {app.badge}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CAREER OUTCOMES ═══ */}
      <section className="py-16 md:py-24 section-reveal">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-2">
              Career Outcomes by Level
            </h2>
            <p className="text-[13.5px] text-slate-400">
              Typical roles and salary ranges at each qualification level.
            </p>
          </div>

          <div className="space-y-3">
            {apprenticeshipLevels.map((app) => (
              <div
                key={app.level}
                className="rounded-xl border border-slate-100 px-5 py-5 md:px-6 md:py-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: app.color }}
                  >
                    {app.level}
                  </div>
                  <h3 className="text-[14px] font-semibold text-navy">
                    {app.subtitle}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {app.careerOutcomes.map((career, ci) => (
                    <div key={ci} className="rounded-lg bg-slate-50 px-4 py-3">
                      <p className="text-[12.5px] font-semibold text-navy">
                        {career.title}
                      </p>
                      <p
                        className="text-[11.5px] font-bold mt-0.5"
                        style={{ color: app.color }}
                      >
                        {career.salaryRange}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 md:py-24 bg-slate-50 section-reveal">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-2">
                Common Questions
              </h2>
              <p className="text-[13.5px] text-slate-400 leading-relaxed">
                Everything you need to know about starting a CIPS
                apprenticeship.
              </p>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-slate-100 px-6">
                {[
                  {
                    q: "Do I need to find my own employer?",
                    a: "No. If you don't have an employer, we can connect you with organisations looking to hire procurement apprentices. Many of our partner employers are actively recruiting.",
                  },
                  {
                    q: "How much time off-the-job training is required?",
                    a: "You'll need a minimum of 20% of your contracted working hours (typically one day per week) dedicated to off-the-job training, including online learning, workshops, and assignments.",
                  },
                  {
                    q: "What if I don't have GCSEs in English and Maths?",
                    a: "For Level 2, this isn't a barrier you'll complete functional skills qualifications as part of your apprenticeship at no extra cost. For Level 3+, GCSEs at grade 4/C are typically required.",
                  },
                  {
                    q: "Can I start at Level 4 without completing Level 3?",
                    a: "Yes, if you have equivalent procurement experience (typically 2+ years) and your employer confirms the role provides sufficient scope. An initial assessment will determine your starting point.",
                  },
                  {
                    q: "Does Level 6 lead to MCIPS?",
                    a: "Yes. Completing Level 6, combined with the required professional experience, enables you to apply for full MCIPS membership the gold standard in procurement.",
                  },
                  {
                    q: "Is there a minimum wage for apprentices?",
                    a: "Apprentices aged 16-18 must be paid at least the apprenticeship minimum wage. Those aged 19+ who've completed their first year must be paid at least the National Minimum Wage. Most employers pay significantly above these minimums.",
                  },
                ].map((faq, i) => (
                  <FaqItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-24 section-reveal">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl bg-navy px-8 py-14 md:px-16 md:py-20 text-center">
            <h2 className="text-2xl md:text-[32px] font-bold text-white mb-3">
              Ready to Start?
            </h2>
            <p className="text-[14px] text-slate-400 max-w-md mx-auto mb-9 leading-relaxed">
              Whether you&apos;re a school leaver or an experienced
              professional, we&apos;ll help you find the right level and get
              started.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-cips text-white text-[13px] font-semibold px-7 py-3.5 rounded-lg hover:bg-cips/90 transition-colors duration-150"
              >
                <Phone className="h-4 w-4" />
                Get Free Advice
              </Link>
              <Link
                href={apprenticeshipLevels.find((a) => a.featured)?.href || "#"}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors duration-150 underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
              >
                View{" "}
                {apprenticeshipLevels.find((a) => a.featured)?.title ||
                  "Programme"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Main Export (wraps in Lenis) ────────────────── */

export default function Apprenticeships() {
  return (
    <ReactLenis root autoRaf={false}>
      <PageContent />
    </ReactLenis>
  );
}
