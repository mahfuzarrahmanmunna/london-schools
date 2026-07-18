'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    title: 'Level 2 Certificate',
    subtitle: 'Intro to Procurement & Supply',
    href: '/courses/level-2',
  },
  {
    title: 'Level 3 Advanced Certificate',
    subtitle: 'Procurement & Supply Operations',
    href: '/courses/level-3',
  },
  {
    title: 'Level 4 Diploma',
    subtitle: 'Procurement & Supply',
    href: '/courses/level-4',
  },
  {
    title: 'Level 5 Advanced Diploma',
    subtitle: 'Procurement & Supply',
    href: '/courses/level-5',
  },
  {
    title: 'Level 6 Professional Diploma',
    subtitle: 'Strategic Procurement Leadership',
    href: '/courses/level-6',
  },
  {
    title: 'MCIPS Chartered Status',
    subtitle: 'Full Membership & Recognition',
    href: '/courses/mcips',
    accent: true,
  },
  {
    title: 'CIPS Fast Track',
    subtitle: 'Accelerated Study Programme',
    href: '/courses/fast-track',
  },
  {
    title: 'Corporate Training',
    subtitle: 'Team & Organisation Solutions',
    href: '/corporate-training',
  },
];

export default function CipsNavigation() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Lenis Smooth Scroll Setup ──
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for the animation frame loop
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // ── Header Entrance Animation ──
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 88%',
        },
      });

      headerTl
        .from('.section-eyebrow', {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: 'power3.out',
        })
        .from(
          lineRef.current,
          {
            scaleX: 0,
            duration: 1.2,
            ease: 'power3.inOut',
          },
          '-=0.6'
        );

      // ── Grid Cells Stagger Animation ──
      const cards = gridRef.current?.querySelectorAll('.nav-cell');
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
          },
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.035,
          ease: 'power3.out',
        });
      }

      // ── Bottom Banner Animation ──
      gsap.from('.banner-content', {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 90%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className="mx-auto max-w-[1120px] px-7 md:px-9 pt-20 pb-10"
      >
        <p className="section-eyebrow text-[11px] tracking-[0.3em] font-medium text-navy/30 uppercase text-center">
          Navigate Your Path
        </p>
        <div className="flex justify-center mt-6">
          <div
            ref={lineRef}
            className="w-12 h-px bg-gradient-to-r from-transparent via-[#9B1B30] to-transparent origin-center"
          />
        </div>
      </div>

      {/* ── 8-Cell Grid ── */}
      <div
        ref={gridRef}
        className="mx-auto max-w-[1120px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {courses.map((course, index) => (
          <Link
            key={index}
            href={course.href}
            className={`nav-cell group relative flex items-start justify-between border-b border-r border-navy/[0.06] px-7 md:px-9 py-7 md:py-8 transition-all duration-500 hover:bg-[#9B1B30]/[0.03] ${
              (index + 1) % 4 === 0 ? 'lg:border-r-0' : ''
            } ${index >= 4 ? 'border-b-0' : ''} ${
              course.accent
                ? 'bg-gradient-to-br from-gold/[0.02] to-transparent'
                : ''
            }`}
          >
            <div className="min-w-0 pr-4">
              <h3
                className={`text-[13.5px] font-medium tracking-[-0.01em] leading-snug transition-colors duration-500 ${
                  course.accent
                    ? 'text-gold-dark/80 group-hover:text-gold-dark'
                    : 'text-navy/70 group-hover:text-[#9B1B30]'
                }`}
              >
                {course.title}
              </h3>
              <p className="mt-1.5 text-[11px] font-light tracking-wide text-navy/25 leading-relaxed transition-colors duration-500 group-hover:text-navy/35">
                {course.subtitle}
              </p>
            </div>

            <ChevronRight
              className={`w-3.5 h-3.5 flex-shrink-0 mt-1 transition-all duration-500 ${
                course.accent
                  ? 'text-gold/20 group-hover:text-gold group-hover:translate-x-0.5'
                  : 'text-navy/[0.12] group-hover:text-[#9B1B30] group-hover:translate-x-0.5'
              }`}
              strokeWidth={1.5}
            />

            {/* Left accent */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${
                course.accent ? 'bg-gold' : 'bg-[#9B1B30]'
              }`}
            />
          </Link>
        ))}
      </div>

      {/* ── Bottom Banner ── */}
      <div
        ref={bannerRef}
        className="mx-auto max-w-[1120px] border-b border-navy/[0.06]"
      >
        <Link
          href="/why-cips"
          className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8 px-7 md:px-9 py-7 md:py-8 transition-all duration-500 hover:bg-[#9B1B30]/[0.02]"
        >
          <div className="banner-content">
            <h3
              className="text-[17px] font-light text-navy/70 tracking-[-0.025em] group-hover:text-[#9B1B30] transition-colors duration-500"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Why CIPS at London School of Higher Studies
            </h3>
            <p className="mt-2 text-[12px] font-light tracking-wide text-navy/25 leading-relaxed transition-colors duration-500 group-hover:text-navy/35">
              The global standard for procurement excellence, recognised in 150+
              countries
            </p>
          </div>

          <div className="banner-content flex items-center gap-2.5 flex-shrink-0">
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-navy/25 group-hover:text-[#9B1B30] transition-colors duration-500">
              Learn More
            </span>
            <ChevronRight
              className="w-3.5 h-3.5 text-navy/[0.12] group-hover:text-[#9B1B30] group-hover:translate-x-0.5 transition-all duration-500"
              strokeWidth={1.5}
            />
          </div>

          {/* Left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#9B1B30] scale-y-0 origin-center group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
        </Link>
      </div>
    </section>
  );
}