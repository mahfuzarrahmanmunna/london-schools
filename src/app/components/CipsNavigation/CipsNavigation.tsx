"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const courses: {
  title: string;
  subtitle: string;
  href: string;
  accent?: boolean;
}[] = [
  {
    title: "Level 2 Certificate",
    subtitle: "Introduction to Procurement & Supply",
    href: "/courses/level-2-certificate",
  },
  {
    title: "Level 3 Advanced Certificate",
    subtitle: "Procurement & Supply Operations",
    href: "/courses/level-3-certificate",
  },
  {
    title: "Level 4 Diploma",
    subtitle: "Procurement & Supply",
    href: "/courses/level-4-certificate",
  },
  {
    title: "Level 5 Advanced Diploma",
    subtitle: "Procurement & Supply",
    href: "/courses/level-5-certificate",
  },
  {
    title: "Level 6 Professional Diploma",
    subtitle: "Strategic Procurement Leadership",
    href: "/courses/level-6-certificate",
  },
  {
    title: "View All Courses",
    subtitle: "Explore the full curriculum",
    href: "/courses",
    accent: true,
  },
];

export default function CipsNavigation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="mx-auto max-w-[1120px] px-4">
        {/* Container without outer border/shadow */}
        <div className="relative">
          {/* ── 6-Cell Grid ── */}
          <div className="grid grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => {
              // Calculate border conditions based on grid layout
              const isMobileLastCol = (index + 1) % 2 === 0;
              const isDesktopLastCol = (index + 1) % 3 === 0;
              const isMobileLastRow = index >= 4;
              const isDesktopLastRow = index >= 3;

              return (
                <Link
                  key={index}
                  href={course.href}
                  className={`
                    reveal group relative flex items-start justify-between
                    border-b border-r border-slate-200
                    px-8 py-8 md:px-10 md:py-9
                    transition-all duration-300 hover:bg-slate-50
                    
                    /* Mobile border adjustments */
                    ${isMobileLastCol ? "border-r-0" : ""}
                    ${isMobileLastRow ? "border-b-0" : ""}
                    
                    /* Desktop border adjustments */
                    ${isDesktopLastCol ? "lg:border-r-0" : ""}
                    ${isDesktopLastRow ? "lg:border-b-0" : ""}
                    
                    ${course.accent ? "bg-slate-50/50" : ""}
                  `}
                >
                  <div className="min-w-0 pr-4">
                    <h3
                      className={`
                        text-base font-semibold tracking-tight leading-snug transition-colors duration-300
                        ${
                          course.accent
                            ? "text-[#b58b00] group-hover:text-[#9a7700]"
                            : "text-slate-900 group-hover:text-[#0B73B9]"
                        }
                      `}
                    >
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm font-normal text-slate-500 leading-relaxed tracking-normal transition-colors duration-300 group-hover:text-slate-600">
                      {course.subtitle}
                    </p>
                  </div>

                  <ArrowUpRight
                    className={`
                      w-5 h-5 flex-shrink-0 mt-1 transition-all duration-300
                      ${
                        course.accent
                          ? "text-[#f4d210] group-hover:text-[#b58b00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          : "text-slate-300 group-hover:text-[#0B73B9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      }
                    `}
                    strokeWidth={2}
                  />

                  {/* Left accent */}
                  <div
                    className={`
                      absolute left-0 top-0 bottom-0 w-[3px]
                      scale-y-0 origin-bottom
                      transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-y-100
                      ${course.accent ? "bg-[#f4d210]" : "bg-[#0B73B9]"}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Bottom Banner ── */}
          {/* Internal border to separate from grid above */}
          <div className="border-t border-slate-200">
            <Link
              href="/about"
              className="
                reveal group relative
                flex flex-col sm:flex-row sm:items-center justify-between
                gap-4 sm:gap-8
                px-8 py-8 md:px-10 md:py-9
                transition-all duration-300 hover:bg-slate-50
              "
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900 tracking-tight leading-snug group-hover:text-[#0B73B9] transition-colors duration-300">
                  Study CIPS at the London School of Higher Studies
                </h3>
                <p className="mt-2 text-sm font-normal text-slate-500 leading-relaxed tracking-normal transition-colors duration-300 group-hover:text-slate-600">
                  The global standard for procurement excellence, recognised in
                  150+ countries.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-semibold tracking-wider uppercase text-slate-500 group-hover:text-[#0B73B9] transition-colors duration-300">
                  Learn More
                </span>
                <ArrowUpRight
                  className="w-5 h-5 text-slate-300 group-hover:text-[#0B73B9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  strokeWidth={2}
                />
              </div>

              {/* Left accent */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#0B73B9] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Reveal Animation ── */}
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal:nth-child(1) {
          transition-delay: 0ms;
        }
        .reveal:nth-child(2) {
          transition-delay: 50ms;
        }
        .reveal:nth-child(3) {
          transition-delay: 100ms;
        }
        .reveal:nth-child(4) {
          transition-delay: 150ms;
        }
        .reveal:nth-child(5) {
          transition-delay: 200ms;
        }
        .reveal:nth-child(6) {
          transition-delay: 250ms;
        }
        .reveal:nth-child(7) {
          transition-delay: 300ms;
        }
        .reveal:nth-child(8) {
          transition-delay: 350ms;
        }
        .reveal:nth-child(9) {
          transition-delay: 400ms;
        }
      `}</style>
    </section>
  );
}
