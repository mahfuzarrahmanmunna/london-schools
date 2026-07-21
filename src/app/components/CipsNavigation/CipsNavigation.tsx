'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const courses = [
  { title: 'Level 2 Certificate', subtitle: 'Intro to Procurement & Supply', href: '/courses/level-2' },
  { title: 'Level 3 Advanced Certificate', subtitle: 'Procurement & Supply Operations', href: '/courses/level-3' },
  { title: 'Level 4 Diploma', subtitle: 'Procurement & Supply', href: '/courses/level-4' },
  { title: 'Level 5 Advanced Diploma', subtitle: 'Procurement & Supply', href: '/courses/level-5' },
  { title: 'Level 6 Professional Diploma', subtitle: 'Strategic Procurement Leadership', href: '/courses/level-6' },
  { title: 'MCIPS Chartered Status', subtitle: 'Full Membership & Recognition', href: '/courses/mcips', accent: true },
  { title: 'CIPS Fast Track', subtitle: 'Accelerated Study Programme', href: '/courses/fast-track' },
  { title: 'Corporate Training', subtitle: 'Team & Organisation Solutions', href: '/corporate-training' },
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
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    el.querySelectorAll('.reveal').forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      {/* ── Section Label ── */}
      <div className="mx-auto max-w-[1120px] px-6 md:px-8 pt-10 pb-6">
        <div className="reveal flex items-center gap-4">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400">
            CIPS Qualifications
          </span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>
      </div>

      {/* ── 8-Cell Grid ── */}
      <div className="mx-auto max-w-[1120px] grid grid-cols-2 lg:grid-cols-4">
        {courses.map((course, index) => (
          <Link
            key={index}
            href={course.href}
            className={`
              reveal group relative flex items-start justify-between
              border-b border-r border-slate-100
              px-6 md:px-8 py-6 md:py-7
              transition-colors duration-300 hover:bg-slate-50/80
              ${(index + 1) % 4 === 0 ? 'lg:border-r-0' : ''}
              ${index >= 4 ? 'border-b-0' : ''}
              ${course.accent ? 'bg-amber-50/30' : ''}
            `}
          >
            <div className="min-w-0 pr-3">
              <h3
                className={`
                  text-[13px] font-medium tracking-[-0.01em] leading-snug
                  transition-colors duration-300
                  ${course.accent
                    ? 'text-amber-800/90 group-hover:text-amber-900'
                    : 'text-slate-800 group-hover:text-[#9B1B30]'
                  }
                `}
              >
                {course.title}
              </h3>
              <p className="mt-1.5 text-[11px] font-normal text-slate-400 leading-relaxed transition-colors duration-300 group-hover:text-slate-500">
                {course.subtitle}
              </p>
            </div>

            <ArrowUpRight
              className={`
                w-3.5 h-3.5 flex-shrink-0 mt-0.5
                transition-all duration-300
                ${course.accent
                  ? 'text-amber-300/80 group-hover:text-amber-600 group-hover:translate-x-px group-hover:-translate-y-px'
                  : 'text-slate-200 group-hover:text-[#9B1B30] group-hover:translate-x-px group-hover:-translate-y-px'
                }
              `}
              strokeWidth={1.5}
            />

            {/* Left accent */}
            <div
              className={`
                absolute left-0 top-0 bottom-0 w-[2px]
                scale-y-0 origin-center
                transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-y-100
                ${course.accent ? 'bg-amber-500' : 'bg-[#9B1B30]'}
              `}
            />
          </Link>
        ))}
      </div>

      {/* ── Bottom Banner ── */}
      <div className="mx-auto max-w-[1120px] border-b border-slate-100">
        <Link
          href="/why-cips"
          className="
            reveal group relative
            flex flex-col sm:flex-row sm:items-center justify-between
            gap-3 sm:gap-8
            px-6 md:px-8 py-6 md:py-7
            transition-colors duration-300 hover:bg-slate-50/80
          "
        >
          <div>
            <h3 className="text-[15px] font-medium text-slate-800 tracking-[-0.02em] group-hover:text-[#9B1B30] transition-colors duration-300">
              Why CIPS at London School of Higher Studies
            </h3>
            <p className="mt-1.5 text-[11px] font-normal text-slate-400 leading-relaxed transition-colors duration-300 group-hover:text-slate-500">
              The global standard for procurement excellence, recognised in 150+ countries
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-400 group-hover:text-[#9B1B30] transition-colors duration-300">
              Learn More
            </span>
            <ArrowUpRight
              className="w-3.5 h-3.5 text-slate-200 group-hover:text-[#9B1B30] group-hover:translate-x-px group-hover:-translate-y-px transition-all duration-300"
              strokeWidth={1.5}
            />
          </div>

          {/* Left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#9B1B30] scale-y-0 origin-center group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
        </Link>
      </div>

      {/* ── Reveal Animation ── */}
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal:nth-child(1) { transition-delay: 0ms; }
        .reveal:nth-child(2) { transition-delay: 40ms; }
        .reveal:nth-child(3) { transition-delay: 80ms; }
        .reveal:nth-child(4) { transition-delay: 120ms; }
        .reveal:nth-child(5) { transition-delay: 160ms; }
        .reveal:nth-child(6) { transition-delay: 200ms; }
        .reveal:nth-child(7) { transition-delay: 240ms; }
        .reveal:nth-child(8) { transition-delay: 280ms; }
        .reveal:nth-child(9) { transition-delay: 320ms; }
      `}</style>
    </section>
  );
}