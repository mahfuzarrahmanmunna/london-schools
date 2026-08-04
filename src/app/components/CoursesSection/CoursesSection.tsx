"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Integrated Data ──
const courses = [
  {
    level: 2,
    title: "Certificate in Procurement and Supply Operations",
    desc: "Build your foundation. An entry point for those new to procurement and supply chain roles, with no formal prerequisites.",
    meta: "5 Modules · 18 Credits",
    href: "/courses/level-2-certificate",
  },
  {
    level: 3,
    title: "Advanced Certificate in Procurement and Supply Operations",
    desc: "Develop your operational skills further and prepare for the transition into management-level procurement.",
    meta: "6 Modules (4 core + 2 elective) · 30 Credits",
    href: "/courses/level-3-certificate",
  },
  {
    level: 4,
    title: "Diploma in Procurement and Supply",
    desc: "Our most-enrolled qualification. Move from operational buying into strategic sourcing, commercial contracting and negotiation. Many professionals with prior experience start here.",
    meta: "8 Modules · 60 Credits",
    href: "/courses/level-4-certificate",
    badge: "Most Popular",
    highlight: true, // Prominent Blue Background
  },
  {
    level: 5,
    title: "Advanced Diploma in Procurement and Supply",
    desc: "Step into a senior operational or managerial role. Covers supply chain risk, financial management and ethical procurement strategy.",
    meta: "Core + elective modules · 60 Credits",
    href: "/courses/level-5-certificate",
  },
  {
    level: 6,
    title: "Professional Diploma in Procurement and Supply",
    desc: "The final level on the MCIPS pathway. Focuses on strategic leadership, change management and organisational procurement strategy.",
    meta: "Core + optional modules · 60 Credits",
    href: "/courses/level-6-certificate",
    badge: "MCIPS",
    dark: true, // Dark Navy Background
  },
];

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Header Entrance ──
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });

      headerTl.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      headerTl
        .from(
          ".courses-eyebrow",
          { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" },
          "-=0.8",
        )
        .from(
          lineRef.current,
          { scaleX: 0, duration: 1.2, ease: "power3.inOut" },
          "-=0.6",
        )
        .from(
          ".courses-title",
          { y: 40, opacity: 0, duration: 1.2, ease: "power4.out" },
          "-=0.8",
        )
        .from(
          ".courses-desc",
          { y: 20, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.6",
        )
        .from(
          ".courses-header-cta",
          { y: 15, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        );

      // ── Scroll-Driven Progress Bar ──
      if (listRef.current && progressRef.current) {
        gsap.to(progressRef.current, {
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
          scaleY: 1,
          ease: "none",
        });
      }

      // ── Scroll-Driven Card Cascade ──
      const cards = gsap.utils.toArray<HTMLElement>(".course-item");

      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, x: 60 });

        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
          opacity: 1,
          x: 0,
          ease: "power2.out",
        });

        const numEl = card.querySelector(".level-num");
        if (numEl) {
          gsap.to(numEl, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: -40,
            ease: "none",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white">
      {/* ── Mobile Sticky Bar ── */}
      <div className="sticky top-20 z-30 md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            {/* Mobile Glass Eyebrow */}
            <span className="inline-block text-xs tracking-[0.2em] font-semibold text-slate-600 uppercase bg-white/50 backdrop-blur-md border border-slate-200 shadow-sm px-3 py-1.5 rounded-full mb-1.5">
              Course Roadmap
            </span>
            <h2
              className="mt-1 text-lg font-medium text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              CIPS Courses
            </h2>
          </div>
          <Link
            href="/courses"
            className="group flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-[#0B73B9] bg-[#0B73B9]/5 px-4 py-2.5 rounded-md transition-colors hover:bg-[#0B73B9]/10"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Main Layout (Desktop/Tablet) ── */}
      <div className="mx-auto max-w-7xl px-6 md:px-9 py-10  hidden md:flex md:gap-12 lg:gap-16">
        {/* ── Left Sticky Column ── */}
        <div
          ref={headerRef}
          className="w-5/12 shrink-0 sticky top-36 lg:top-40 self-start h-fit pb-20"
        >
          {/* Desktop Glass Eyebrow */}
          <p className="courses-eyebrow inline-block text-xs tracking-[0.2em] font-semibold text-slate-600 uppercase bg-white/50 backdrop-blur-md border border-slate-200 shadow-sm px-4 py-2 rounded-full">
            Course Roadmap
          </p>

          <div className="mt-5 mb-8">
          </div>

          <h2
            className="courses-title text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your Path Through the CIPS Levels
          </h2>

          <p className="courses-desc mt-6 text-base font-normal leading-relaxed tracking-normal text-slate-600">
            Progress in stages, from foundational operations to strategic
            leadership. Choose your starting point based on your current
            experience; most professionals with some industry background start
            at Level 4.
          </p>

          <div className="courses-header-cta mt-10 flex flex-col sm:flex-row items-start gap-4">
            {/* View All Courses - Unchanged Solid Blue */}
            <Link
              href="/courses"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-sm font-semibold tracking-wider uppercase text-white bg-[#0B73B9] transition-all duration-500 hover:bg-[#085C92] hover:shadow-lg hover:shadow-[#0B73B9]/20 overflow-hidden"
            >
              <span className="relative z-10">View All Courses</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>

            {/* Get CIPS Today! - White Glass Type Color */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold tracking-wider uppercase text-slate-700 bg-white/50 backdrop-blur-md border border-slate-200 shadow-sm transition-all duration-500 hover:border-[#0B73B9] hover:text-[#0B73B9] hover:shadow-md"
            >
              Get CIPS Today!
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Scroll Progress Indicator */}
          <div className="hidden lg:block mt-14 pt-8 border-t border-slate-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm tracking-wider uppercase font-medium text-slate-400">
                Scroll to explore
              </span>
              <span className="text-sm tracking-wider uppercase font-medium text-slate-400">
                {courses.length} Levels
              </span>
            </div>
            <div className="w-full h-0.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full w-full bg-[#0B73B9] origin-top"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
          </div>
        </div>

        {/* ── Right Scrollable List ── */}
        <div ref={listRef} className="w-7/12 flex flex-col">
          {courses.map((course) => {
            const isHighlight = course.highlight; // Level 4
            const isDark = course.dark; // Level 6

            return (
              <Link
                key={course.level}
                href={course.href}
                className={`course-item group relative will-change-transform border-b last:border-b-0 ${
                  isHighlight || isDark
                    ? "border-transparent rounded-xl overflow-hidden mt-4 mb-4"
                    : "border-slate-200 py-8 lg:py-10"
                } ${
                  isHighlight
                    ? "bg-[#0B73B9] px-8 lg:px-10 py-10 lg:py-14 shadow-xl shadow-[#0B73B9]/15"
                    : ""
                } ${isDark ? "bg-[#001B30] px-8 lg:px-10 py-10 lg:py-14" : ""}`}
              >
                {/* Hover Accent Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 scale-y-0 origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${
                    isHighlight
                      ? "bg-[#f4d210] rounded-tl-xl"
                      : isDark
                        ? "bg-[#f4d210] rounded-tl-xl"
                        : "bg-[#0B73B9]"
                  }`}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
                  {/* Massive Background Number */}
                  <div className="md:col-span-2 relative h-16 flex items-start md:justify-end overflow-hidden">
                    <span
                      className={`level-num absolute top-0 left-0 md:relative text-[72px] leading-none font-light select-none pointer-events-none transition-colors duration-700 will-change-transform ${
                        isHighlight
                          ? "text-white/10 group-hover:text-[#f4d210]/20"
                          : isDark
                            ? "text-white/[0.03] group-hover:text-[#f4d210]/20"
                            : "text-slate-100 group-hover:text-[#0B73B9]/10"
                      }`}
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {course.level.toString().padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-7 relative z-10 md:pl-2">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span
                        className={`text-sm tracking-wider font-medium uppercase ${
                          isHighlight
                            ? "text-white/70"
                            : isDark
                              ? "text-white/50"
                              : "text-slate-500"
                        }`}
                      >
                        Level {course.level}
                      </span>

                      {/* Badges */}
                      {course.badge === "Most Popular" && (
                        <span className="px-2.5 py-1 rounded-full bg-[#f4d210] text-xs font-bold tracking-wider uppercase text-[#001B30]">
                          Most Popular
                        </span>
                      )}
                      {course.badge === "MCIPS" && (
                        <span className="px-2.5 py-1 rounded-full bg-[#f4d210]/10 text-xs font-bold tracking-wider uppercase text-[#f4d210] border border-[#f4d210]/20">
                          MCIPS
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-xl lg:text-2xl font-medium tracking-tight leading-snug transition-colors duration-500 ${
                        isHighlight
                          ? "text-white"
                          : isDark
                            ? "text-white group-hover:text-[#f4d210]"
                            : "text-slate-900 group-hover:text-[#0B73B9]"
                      }`}
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {course.title}
                    </h3>

                    <p
                      className={`mt-3 text-sm font-normal leading-relaxed tracking-normal ${
                        isHighlight
                          ? "text-white/80"
                          : isDark
                            ? "text-slate-400"
                            : "text-slate-600"
                      }`}
                    >
                      {course.desc}
                    </p>

                    {/* Meta Pills */}
                    <div
                      className={`mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium ${
                        isHighlight
                          ? "text-white/70"
                          : isDark
                            ? "text-slate-500"
                            : "text-slate-500"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                        {course.meta}
                      </span>
                    </div>
                  </div>

                  {/* CTA Arrow */}
                  <div className="hidden md:flex md:col-span-3 justify-end items-center">
                    <div
                      className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:shadow-lg ${
                        isHighlight
                          ? "border-white/20 group-hover:border-[#f4d210] group-hover:bg-[#f4d210]"
                          : isDark
                            ? "border-white/10 group-hover:border-[#f4d210]/50 group-hover:bg-[#f4d210]/10"
                            : "border-slate-200 group-hover:border-[#0B73B9] group-hover:bg-[#0B73B9] group-hover:shadow-[#0B73B9]/15"
                      }`}
                    >
                      <ArrowRight
                        className={`w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5 ${
                          isHighlight
                            ? "text-white group-hover:text-[#001B30]"
                            : isDark
                              ? "text-white/40 group-hover:text-[#f4d210]"
                              : "text-slate-400 group-hover:text-white"
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Mobile Scrollable List ── */}
      <div className="md:hidden px-6 pb-24 pt-6 flex flex-col">
        {courses.map((course) => {
          const isHighlight = course.highlight;
          const isDark = course.dark;

          return (
            <Link
              key={course.level}
              href={course.href}
              className={`course-item group relative will-change-transform border-b last:border-b-0 ${
                isHighlight || isDark
                  ? "border-transparent rounded-xl overflow-hidden mt-4 mb-4"
                  : "border-slate-200 py-8"
              } ${
                isHighlight
                  ? "bg-[#0B73B9] px-6 py-10 shadow-lg shadow-[#0B73B9]/15"
                  : ""
              } ${isDark ? "bg-[#001B30] px-6 py-10" : ""}`}
            >
              {/* Hover Accent Bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 scale-y-0 origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${
                  isHighlight
                    ? "bg-[#f4d210] rounded-tl-xl"
                    : isDark
                      ? "bg-[#f4d210] rounded-tl-xl"
                      : "bg-[#0B73B9]"
                }`}
              />

              {/* Number */}
              <div className="relative h-10 flex items-start overflow-hidden mb-3">
                <span
                  className={`level-num absolute top-0 left-0 text-[48px] leading-none font-light select-none pointer-events-none transition-colors duration-700 will-change-transform ${
                    isHighlight
                      ? "text-white/10"
                      : isDark
                        ? "text-white/[0.03]"
                        : "text-slate-100 group-hover:text-[#0B73B9]/10"
                  }`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {course.level.toString().padStart(2, "0")}
                </span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-3 mb-3 relative z-10 flex-wrap">
                <span
                  className={`text-sm tracking-wider font-medium uppercase ${
                    isHighlight
                      ? "text-white/70"
                      : isDark
                        ? "text-white/50"
                        : "text-slate-500"
                  }`}
                >
                  Level {course.level}
                </span>
                {course.badge === "Most Popular" && (
                  <span className="px-2.5 py-1 rounded-full bg-[#f4d210] text-xs font-bold tracking-wider uppercase text-[#001B30]">
                    Most Popular
                  </span>
                )}
                {course.badge === "MCIPS" && (
                  <span className="px-2.5 py-1 rounded-full bg-[#f4d210]/10 text-xs font-bold tracking-wider uppercase text-[#f4d210] border border-[#f4d210]/20">
                    MCIPS
                  </span>
                )}
              </div>

              {/* Title & Desc */}
              <h3
                className={`text-lg font-medium tracking-tight leading-snug transition-colors duration-500 relative z-10 ${
                  isHighlight
                    ? "text-white"
                    : isDark
                      ? "text-white group-hover:text-[#f4d210]"
                      : "text-slate-900 group-hover:text-[#0B73B9]"
                }`}
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {course.title}
              </h3>

              <p
                className={`mt-2 text-sm font-normal leading-relaxed tracking-normal relative z-10 ${
                  isHighlight
                    ? "text-white/80"
                    : isDark
                      ? "text-slate-400"
                      : "text-slate-600"
                }`}
              >
                {course.desc}
              </p>

              {/* Meta & CTA */}
              <div
                className={`mt-5 pt-5 border-t flex items-center justify-between relative z-10 ${
                  isHighlight
                    ? "border-white/20"
                    : isDark
                      ? "border-white/10"
                      : "border-slate-200"
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isHighlight
                      ? "text-white/70"
                      : isDark
                        ? "text-slate-500"
                        : "text-slate-500"
                  }`}
                >
                  <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                  {course.meta}
                </div>

                <div
                  className={`flex items-center gap-2 text-sm font-semibold tracking-wide uppercase transition-all duration-500 group-hover:gap-3 ${
                    isHighlight
                      ? "text-white group-hover:text-[#f4d210]"
                      : isDark
                        ? "text-[#f4d210]/70 group-hover:text-[#f4d210]"
                        : "text-[#0B73B9]/70 group-hover:text-[#0B73B9]"
                  }`}
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
