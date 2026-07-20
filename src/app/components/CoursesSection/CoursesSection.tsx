'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { cipsCoursesData } from '@/app/data/cipsCoursesData';

gsap.registerPlugin(ScrollTrigger);

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // ── Header Entrance ──
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });

      headerTl.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      });

      headerTl
        .from(
          '.courses-eyebrow',
          { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' },
          '-=0.8'
        )
        .from(
          lineRef.current,
          { scaleX: 0, duration: 1.2, ease: 'power3.inOut' },
          '-=0.6'
        )
        .from(
          '.courses-title',
          { y: 40, opacity: 0, duration: 1.2, ease: 'power4.out' },
          '-=0.8'
        )
        .from(
          '.courses-desc',
          { y: 20, opacity: 0, duration: 1, ease: 'power3.out' },
          '-=0.6'
        )
        .from(
          '.courses-header-cta',
          { y: 15, opacity: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        );

      // ── Scroll-Driven Progress Bar ──
      if (listRef.current && progressRef.current) {
        gsap.to(progressRef.current, {
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.5,
          },
          scaleY: 1,
          ease: 'none',
        });
      }

      // ── Scroll-Driven Card Cascade ──
      const cards = gsap.utils.toArray<HTMLElement>('.course-item');

      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, x: 60 });

        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1,
          },
          opacity: 1,
          x: 0,
          ease: 'power2.out',
        });

        const numEl = card.querySelector('.level-num');
        if (numEl) {
          gsap.to(numEl, {
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
            y: -40,
            ease: 'none',
          });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    // ❌ REMOVED 'overflow-hidden' HERE - This was breaking position: sticky
    <section
      ref={sectionRef}
      className="relative w-full bg-white"
    >
      {/* ── Mobile Sticky Bar ── */}
      <div className="sticky top-0 z-30 md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] tracking-[0.3em] font-medium text-slate-400 uppercase">
              Our Programmes
            </p>
            <h2
              className="mt-0.5 text-[18px] font-light text-slate-800 tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              CIPS Pathways
            </h2>
          </div>
          <Link
            href="/courses"
            className="group flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-[#9B1B30] bg-[#9B1B30]/5 px-4 py-2.5 rounded-md transition-colors hover:bg-[#9B1B30]/10"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Main Layout (Desktop/Tablet) ── */}
      <div className="mx-auto max-w-6xl px-6 md:px-9 py-10 md:py-32 hidden md:flex md:gap-12 lg:gap-16">
        
        {/* ── Left Sticky Column ── */}
        <div
          ref={headerRef}
          className="w-5/12 shrink-0 sticky top-36 lg:top-40 self-start h-fit pb-20"
        >
          <p className="courses-eyebrow text-[10px] tracking-[0.3em] font-medium text-slate-400 uppercase">
            Our Programmes
          </p>
          <div className="mt-5 mb-8">
            <div
              ref={lineRef}
              className="w-10 h-px bg-gradient-to-r from-[#9B1B30] to-transparent origin-left"
            />
          </div>
          <h2
            className="courses-title text-[28px] lg:text-[36px] font-light text-slate-800 tracking-[-0.025em] leading-[1.15]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            CIPS Qualification Pathways
          </h2>
          <p className="courses-desc mt-6 text-[15px] font-light leading-[1.8] tracking-wide text-slate-400">
            A structured journey from foundational principles to strategic
            leadership. Select your entry point and progress towards MCIPS
            Chartered Status.
          </p>

          <div className="courses-header-cta mt-10 flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/courses"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-[13px] font-medium tracking-[0.15em] uppercase text-white bg-[#9B1B30] transition-all duration-500 hover:bg-[#821828] hover:shadow-lg hover:shadow-[#9B1B30]/15 overflow-hidden"
            >
              <span className="relative z-10">View All Courses</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 text-[12px] font-medium tracking-[0.1em] uppercase text-slate-400 hover:text-[#9B1B30] transition-colors duration-500"
            >
              Speak to an Advisor
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Scroll Progress Indicator */}
          <div className="hidden lg:block mt-14 pt-8 border-t border-slate-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-slate-300">
                Scroll to explore
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-slate-300">
                {cipsCoursesData.length} Levels
              </span>
            </div>
            <div className="w-full h-px bg-slate-100 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full w-full bg-[#9B1B30] origin-top"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>
          </div>
        </div>

        {/* ── Right Scrollable List ── */}
        <div ref={listRef} className="w-7/12 flex flex-col">
          {cipsCoursesData.map((course, index) => {
            const isDark = course.level === 6;
            const isPopular = course.level === 4;

            return (
              <Link
                key={course.level}
                href={course.href}
                className={`course-item group relative will-change-transform border-b last:border-b-0 ${
                  isDark
                    ? 'border-white/10 rounded-xl overflow-hidden mt-4'
                    : 'border-slate-100 py-8 lg:py-10'
                } ${
                  isDark
                    ? 'bg-slate-900 px-8 lg:px-10 py-10 lg:py-14'
                    : ''
                }`}
              >
                {/* Hover Accent Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${
                    isDark ? 'bg-amber-500 rounded-tl-xl' : 'bg-[#9B1B30]'
                  }`}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
                  {/* Massive Background Number */}
                  <div className="md:col-span-2 relative h-16 flex items-start md:justify-end overflow-hidden">
                    <span
                      className={`level-num absolute top-0 left-0 md:relative text-[72px] leading-none font-light select-none pointer-events-none transition-colors duration-700 will-change-transform ${
                        isDark
                          ? 'text-white/[0.03] group-hover:text-amber-500/[0.06]'
                          : 'text-slate-100 group-hover:text-[#9B1B30]/10'
                      }`}
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {course.level.toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-7 relative z-10 md:pl-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-[10px] tracking-[0.2em] font-medium uppercase ${
                          isDark ? 'text-white/40' : 'text-slate-400'
                        }`}
                      >
                        Level {course.level}
                      </span>

                      {isPopular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#9B1B30]/10 text-[9px] font-bold tracking-wider uppercase text-[#9B1B30]">
                          Most Popular
                        </span>
                      )}
                      {isDark && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[9px] font-bold tracking-wider uppercase text-amber-400">
                          Path to MCIPS
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-[22px] font-light tracking-[-0.01em] leading-tight transition-colors duration-500 ${
                        isDark
                          ? 'text-white group-hover:text-amber-400'
                          : 'text-slate-800 group-hover:text-[#9B1B30]'
                      }`}
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {course.title.replace('CIPS ', '')}
                    </h3>

                    <p
                      className={`mt-2 text-[13px] font-light leading-[1.7] tracking-wide ${
                        isDark ? 'text-white/40' : 'text-slate-400'
                      }`}
                    >
                      {course.subtitle}
                    </p>

                    {/* Meta Pills */}
                    <div
                      className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] ${
                        isDark ? 'text-white/30' : 'text-slate-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-medium">
                        <BookOpen className="w-3 h-3" strokeWidth={1.5} />
                        {course.modules.length} Modules
                      </span>
                      <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                      <span>{course.totalCredits} Credits</span>
                    </div>
                  </div>

                  {/* CTA Arrow */}
                  <div className="hidden md:flex md:col-span-3 justify-end items-center">
                    <div
                      className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:shadow-lg ${
                        isDark
                          ? 'border-white/10 group-hover:border-amber-500/50 group-hover:bg-amber-500'
                          : 'border-slate-200 group-hover:border-[#9B1B30] group-hover:bg-[#9B1B30] group-hover:shadow-[#9B1B30]/15'
                      }`}
                    >
                      <ArrowRight
                        className={`w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5 ${
                          isDark
                            ? 'text-white/40 group-hover:text-white'
                            : 'text-slate-400 group-hover:text-white'
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
        {cipsCoursesData.map((course, index) => {
          const isDark = course.level === 6;
          const isPopular = course.level === 4;

          return (
            <Link
              key={course.level}
              href={course.href}
              className={`course-item group relative will-change-transform border-b last:border-b-0 ${
                isDark
                  ? 'border-white/10 rounded-xl overflow-hidden mt-4'
                  : 'border-slate-100 py-8'
              } ${
                isDark
                  ? 'bg-slate-900 px-6 py-10'
                  : ''
              }`}
            >
              {/* Hover Accent Bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${
                  isDark ? 'bg-amber-500 rounded-tl-xl' : 'bg-[#9B1B30]'
                }`}
              />

              {/* Number */}
              <div className="relative h-10 flex items-start overflow-hidden mb-3">
                <span
                  className={`level-num absolute top-0 left-0 text-[48px] leading-none font-light select-none pointer-events-none transition-colors duration-700 will-change-transform ${
                    isDark
                      ? 'text-white/[0.03] group-hover:text-amber-500/[0.06]'
                      : 'text-slate-100 group-hover:text-[#9B1B30]/10'
                  }`}
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {course.level.toString().padStart(2, '0')}
                </span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-3 mb-2.5 relative z-10">
                <span
                  className={`text-[10px] tracking-[0.2em] font-medium uppercase ${
                    isDark ? 'text-white/40' : 'text-slate-400'
                  }`}
                >
                  Level {course.level}
                </span>
                {isPopular && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#9B1B30]/10 text-[9px] font-bold tracking-wider uppercase text-[#9B1B30]">
                    Most Popular
                  </span>
                )}
                {isDark && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[9px] font-bold tracking-wider uppercase text-amber-400">
                    Path to MCIPS
                  </span>
                )}
              </div>

              {/* Title & Desc */}
              <h3
                className={`text-[16px] font-light tracking-[-0.01em] leading-tight transition-colors duration-500 relative z-10 ${
                  isDark
                    ? 'text-white group-hover:text-amber-400'
                    : 'text-slate-800 group-hover:text-[#9B1B30]'
                }`}
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {course.title.replace('CIPS ', '')}
              </h3>

              <p
                className={`mt-2 text-[12px] font-light leading-[1.7] tracking-wide relative z-10 ${
                  isDark ? 'text-white/40' : 'text-slate-400'
                }`}
              >
                {course.subtitle}
              </p>

              {/* Meta & CTA */}
              <div
                className={`mt-5 pt-5 border-t flex items-center justify-between relative z-10 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <div
                  className={`flex items-center gap-3 text-[10px] ${
                    isDark ? 'text-white/30' : 'text-slate-400'
                  }`}
                >
                  <span className="flex items-center gap-1 font-medium">
                    <BookOpen className="w-3 h-3" strokeWidth={1.5} />
                    {course.modules.length}
                  </span>
                  <span>{course.totalCredits} Credits</span>
                </div>

                <div
                  className={`flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-500 group-hover:gap-3 ${
                    isDark
                      ? 'text-amber-400/70 group-hover:text-amber-400'
                      : 'text-[#9B1B30]/60 group-hover:text-[#9B1B30]'
                  }`}
                >
                  Explore
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}