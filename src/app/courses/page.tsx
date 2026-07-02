"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Clock,
  BookOpen,
  ChevronRight,
  Trophy,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { courseLevels } from "../data/cipsCourses";

gsap.registerPlugin(ScrollTrigger);

const displayCourses = courseLevels;

export default function CourseArchive() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".ha"),
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
        );
      }

      // Cards
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".arc-card");
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          },
        );

        // Arrow hover
        cards.forEach((card) => {
          const arrow = card.querySelector(".arc-arrow");
          if (!arrow) return;
          card.addEventListener("mouseenter", () => {
            gsap.to(arrow, { x: 6, duration: 0.3, ease: "power2.out" });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(arrow, {
              x: 0,
              duration: 0.4,
              ease: "elastic.out(1, 0.4)",
            });
          });
        });
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: "Which CIPS level should I start with?",
      a: "If you're new to procurement, start with Level 2. With some experience, Level 3 or 4 may be appropriate. Those with 3+ years experience can often start at Level 5. Contact us for a free assessment.",
    },
    {
      q: "How long does it take to complete MCIPS?",
      a: "The full journey from Level 4 to Level 6 typically takes 4-6 years part-time. With prior experience and exemptions, some complete it in 2-3 years.",
    },
    {
      q: "Do I need to be a CIPS member to study?",
      a: "Yes, from Level 4 onwards you need CIPS membership to sit exams. We help you set up membership during enrolment.",
    },
    {
      q: "Are the qualifications recognised internationally?",
      a: "Absolutely. CIPS qualifications are recognised in over 150 countries. MCIPS is the gold standard for procurement professionals worldwide.",
    },
  ];

  return (
    <main className="bg-white">
      {/* ═══ HEADER ═══ */}
      <section className="bg-navy pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div ref={headerRef} className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <nav
            className="ha flex items-center gap-2 text-[12px] text-white/40 mb-8"
            style={{ opacity: 0 }}
          >
            <Link href="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/courses"
              className="hover:text-white/70 transition-colors"
            >
              Courses
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">All Qualifications</span>
          </nav>

          <h1
            className="ha text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.1] tracking-tight mb-4"
            style={{ opacity: 0 }}
          >
            All CIPS <span className="text-primary">Qualifications</span>
          </h1>

          <p
            className="ha text-[15px] text-white/45 leading-relaxed max-w-xl"
            style={{ opacity: 0 }}
          >
            From foundation to MCIPS — five qualification levels designed to
            build your procurement expertise step by step.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary" />
      </section>

      {/* ═══ COURSE CARDS ═══ */}
      <section className="py-16 lg:py-24">
        <div ref={gridRef} className="mx-auto max-w-7xl px-6 space-y-5">
          {displayCourses.map((course) => (
            <Link
              key={course.level}
              href={course.href}
              className="arc-card group block rounded-xl overflow-hidden border border-slate-100 bg-white hover:shadow-xl hover:border-slate-200 transition-all duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* ── Color Bar (left, narrow) ── */}
                <div
                  className="hidden md:flex md:col-span-1 items-center justify-center py-6"
                  style={{ backgroundColor: course.color }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[32px] font-black text-white/30 leading-none">
                      {course.level}
                    </span>
                    <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/50 -rotate-90 origin-center whitespace-nowrap">
                      Level
                    </span>
                  </div>
                </div>

                {/* ── Main Content ── */}
                <div className="md:col-span-8 p-6 lg:p-8">
                  {/* Top row */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${course.badgeColor}`}
                    >
                      {course.badge}
                    </span>
                    {course.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                        <Trophy className="h-3 w-3" /> Popular
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">
                      {course.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg lg:text-xl font-semibold text-navy leading-snug mb-2 group-hover:text-primary transition-colors">
                    {course.subtitle}
                  </h2>

                  {/* Description */}
                  <p className="text-[13px] text-slate-400 leading-relaxed mb-5 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Modules preview */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                    {course.modules.slice(0, 3).map((m, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-slate-400 flex items-center gap-1.5"
                      >
                        <CheckCircle2
                          className="h-3 w-3 flex-shrink-0"
                          style={{ color: course.color }}
                        />
                        {m.title}
                      </span>
                    ))}
                    {course.modules.length > 3 && (
                      <span className="text-[11px] text-slate-300">
                        +{course.modules.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Study modes */}
                  <div className="flex flex-wrap gap-1.5">
                    {course.studyModes.map((mode) => (
                      <span
                        key={mode}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium text-slate-500 bg-slate-50"
                      >
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Right Side: Stats + Arrow ── */}
                <div className="md:col-span-3 border-l border-slate-100 p-6 lg:p-8 flex flex-col items-center justify-between">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 w-full mb-6">
                    {course.stats.slice(0, 4).map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-base font-bold text-navy leading-tight">
                          {stat.value}
                        </p>
                        <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Price + Arrow */}
                  <div className="text-center w-full">
                    <p className="text-[10px] text-slate-400 mb-0.5">From</p>
                    <p className="text-2xl font-bold text-navy mb-4">
                      {course.price}
                    </p>
                    <div
                      className="arc-arrow mx-auto flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors duration-300"
                      style={{ backgroundColor: course.color }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile color bar (visible < md) */}
              <div
                className="md:hidden h-1"
                style={{ backgroundColor: course.color }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ MCIPS CTA ═══ */}
      <section ref={ctaRef} className="bg-navy py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/15 border border-secondary/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary mb-4">
                <Trophy className="h-3 w-3" />
                Gold Standard
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-white leading-tight mb-2">
                Achieve Your <span className="text-secondary">MCIPS</span>{" "}
                Designation
              </h2>
              <p className="text-[14px] text-white/40 max-w-md leading-relaxed">
                Complete Levels 4, 5 & 6 to earn the globally recognised mark of
                procurement excellence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/courses/level-4"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-7 py-3.5 rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
              >
                Start MCIPS Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white text-sm font-medium px-7 py-3.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                Speak to Advisor
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary" />
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-semibold text-navy text-center mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-[13px] text-slate-400 text-center mb-10">
            Common questions about CIPS qualifications
          </p>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-[13px] font-semibold text-navy pr-4">
                    {faq.q}
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 flex-shrink-0 text-slate-300 transition-transform duration-300 ${
                      openFaq === i ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openFaq === i ? "200px" : "0px",
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <p className="px-5 pb-4 text-[13px] text-slate-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
