'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, TrendingUp, Award, Shield, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Globe,
    num: '01',
    title: 'Global Recognition',
    desc: 'Recognised across 150+ countries by governments, multinationals, and the United Nations as the definitive standard.',
  },
  {
    icon: TrendingUp,
    num: '02',
    title: 'Career Acceleration',
    desc: 'CIPS-qualified professionals command higher salaries and progress into senior leadership roles significantly faster.',
  },
  {
    icon: Award,
    num: '03',
    title: 'Chartered Status',
    desc: 'The exclusive route to achieving MCIPS chartered status — marking you as a master of the procurement profession.',
  },
  {
    icon: Shield,
    num: '04',
    title: 'Ethical & Sustainable',
    desc: 'Grounded in responsible sourcing, ESG principles, and the highest standards of ethical supply chain management.',
  },
];

export default function WhyChooseCips() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading entrance ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      tl.from('.why-eyebrow', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          '.why-line',
          { scaleX: 0, duration: 1.2, ease: 'power3.inOut' },
          '-=0.6'
        )
        .from(
          '.why-title',
          { y: 60, opacity: 0, duration: 1.4, ease: 'power4.out' },
          '-=0.8'
        )
        .from(
          '.why-desc',
          { y: 25, opacity: 0, duration: 1, ease: 'power3.out' },
          '-=0.7'
        )
        .from(
          '.why-cta',
          { y: 20, opacity: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.5'
        )
        .from(
          '.why-progress-wrap',
          { y: 15, opacity: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        );

      // ── Progress bar ──
      if (cardsRef.current && progressRef.current) {
        gsap.to(progressRef.current, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 0.4,
          },
          scaleX: 1,
          ease: 'none',
        });
      }

      // ── Active counter ──
      if (counterRef.current) {
        benefits.forEach((_, i) => {
          gsap.to(counterRef.current, {
            scrollTrigger: {
              trigger: cardsRef.current?.children[i],
              start: 'top 50%',
              end: 'top 10%',
              scrub: true,
            },
            innerText: String(i + 1).padStart(2, '0'),
            snap: { innerText: 1 },
            duration: 0.2,
          });
        });
      }

      // ── Divider width ──
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleY: 0 },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 50%',
              end: 'bottom 50%',
              scrub: 0.3,
            },
            scaleY: 1,
            ease: 'none',
          }
        );
      }

      // ── Per-card scrub animations ──
      const cards = gsap.utils.toArray<HTMLElement>('.sticky-card');

      cards.forEach((card) => {
        const numEl = card.querySelector('.card-num');
        const iconEl = card.querySelector('.card-icon-wrap');
        const titleEl = card.querySelector('.card-title');
        const descEl = card.querySelector('.card-desc');
        const footEl = card.querySelector('.card-footer');
        const accentEl = card.querySelector('.card-accent');

        if (numEl) {
          gsap.from(numEl, {
            scrollTrigger: { trigger: card, start: 'top 55%', end: 'top 20%', scrub: true },
            y: 80,
            opacity: 0,
          });
        }

        if (accentEl) {
          gsap.fromTo(
            accentEl,
            { scaleY: 0 },
            {
              scrollTrigger: { trigger: card, start: 'top 50%', end: 'top 25%', scrub: true },
              scaleY: 1,
              ease: 'power2.out',
            }
          );
        }

        if (iconEl) {
          gsap.from(iconEl, {
            scrollTrigger: { trigger: card, start: 'top 48%', end: 'top 18%', scrub: true },
            y: 30,
            opacity: 0,
          });
        }

        if (titleEl) {
          gsap.from(titleEl, {
            scrollTrigger: { trigger: card, start: 'top 46%', end: 'top 16%', scrub: true },
            y: 50,
            opacity: 0,
          });
        }

        if (descEl) {
          gsap.from(descEl, {
            scrollTrigger: { trigger: card, start: 'top 44%', end: 'top 14%', scrub: true },
            y: 30,
            opacity: 0,
          });
        }

        if (footEl) {
          gsap.from(footEl, {
            scrollTrigger: { trigger: card, start: 'top 42%', end: 'top 12%', scrub: true },
            y: 20,
            opacity: 0,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050505]">
      <div className="grid grid-cols-1 lg:grid-cols-12">

        {/* ══════════════════════════════════════════════
             LEFT — Sticky heading (5 cols)
        ══════════════════════════════════════════════ */}
        <div className="lg:col-span-5 sticky top-0 h-screen flex items-center">
          {/* Grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_15%,#050505_70%)] pointer-events-none" />
          {/* Right edge glow */}
          <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1077BF]/10 to-transparent" />

          <div className="relative z-10 px-8 md:px-12 lg:px-14">
            {/* Eyebrow */}
            <p className="why-eyebrow text-[10px] tracking-[0.35em] font-medium text-white/20 uppercase">
              Why Choose CIPS
            </p>

            {/* Accent line */}
            <div className="why-line mt-6 mb-10 w-12 h-[2px] bg-gradient-to-r from-[#1077BF] via-[#f4d210] to-transparent origin-left rounded-full" />

            {/* Title */}
            <h2
              className="why-title text-[clamp(1.6rem,3.2vw,2.35rem)] font-light text-white/90 tracking-[-0.03em] leading-[1.12]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              The Global Standard
              <br />
              for{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#1077BF] to-[#f4d210]">
                  Procurement
                </span>
                <span className="absolute bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-[#1077BF] to-[#f4d210]/30" />
              </span>{' '}
              Excellence
            </h2>

            {/* Description */}
            <p className="why-desc mt-7 text-[13.5px] font-light leading-[1.9] tracking-wide text-white/20 max-w-[340px]">
              The Chartered Institute of Procurement &amp; Supply isn&apos;t
              just a certificate — it&apos;s a benchmark of professional
              integrity trusted by the world&apos;s leading organisations.
            </p>

            {/* CTA */}
            <Link
              href="/why-cips"
              className="why-cta group relative inline-flex items-center gap-3 mt-11 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/[0.03] rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="relative z-10 flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.08] group-hover:border-[#1077BF]/30 transition-colors duration-500">
                <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-white/40 group-hover:text-[#1077BF] transition-colors duration-500">
                  Discover More
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#f4d210] transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            {/* Progress */}
            <div className="why-progress-wrap mt-16">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[8px] tracking-[0.25em] uppercase font-medium text-white/10">
                  Scroll to explore
                </span>
                <div className="flex items-center gap-2">
                  <span
                    ref={counterRef}
                    className="text-[11px] font-mono font-medium text-[#1077BF] tabular-nums"
                  >
                    01
                  </span>
                  <span className="text-[8px] tracking-[0.2em] uppercase font-medium text-white/10">
                    / 04
                  </span>
                </div>
              </div>
              <div className="w-full h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full w-full bg-gradient-to-r from-[#1077BF] via-[#1077BF]/60 to-[#f4d210]/40 origin-left rounded-full"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
             RIGHT — Stacking sticky cards (7 cols)
        ══════════════════════════════════════════════ */}
        <div ref={cardsRef} className="lg:col-span-7 relative">
          {/* Vertical divider */}
          <div
            ref={dividerRef}
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent origin-top"
            style={{ transform: 'scaleY(0)' }}
          />

          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`sticky top-0 h-screen flex items-center overflow-hidden ${
                  i > 0 ? 'rounded-tl-[3rem]' : ''
                }`}
                style={{
                  background: i % 2 === 0 ? '#070707' : '#0a0a0a',
                }}
              >
                {/* Grid texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />

                {/* Colored ambient glow */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: '20%',
                    right: '10%',
                    width: '50%',
                    height: '60%',
                    background: i % 2 === 0
                      ? 'radial-gradient(ellipse, rgba(16,119,191,0.03) 0%, transparent 70%)'
                      : 'radial-gradient(ellipse, rgba(244,210,16,0.02) 0%, transparent 70%)',
                  }}
                />

                {/* Large background number */}
                <span
                  className="card-num absolute top-6 right-8 md:top-10 md:right-14 text-[clamp(8rem,20vw,16rem)] font-extralight leading-none select-none pointer-events-none block"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {item.num}
                </span>

                {/* Left accent bar */}
                <div
                  className="card-accent absolute left-0 top-[15%] bottom-[15%] w-[2px] rounded-full origin-center"
                  style={{
                    transform: 'scaleY(0)',
                    background: i % 2 === 0
                      ? 'linear-gradient(to bottom, transparent, #1077BF, transparent)'
                      : 'linear-gradient(to bottom, transparent, #f4d210, transparent)',
                  }}
                />

                <div className="sticky-card relative z-10 w-full px-8 md:px-14 lg:px-16">
                  <div className="max-w-lg">
                    {/* Icon */}
                    <div
                      className="card-icon-wrap w-14 h-14 rounded-2xl flex items-center justify-center mb-9 transition-all duration-700"
                      style={{
                        background: i % 2 === 0
                          ? 'linear-gradient(135deg, rgba(16,119,191,0.08) 0%, rgba(16,119,191,0.02) 100%)'
                          : 'linear-gradient(135deg, rgba(244,210,16,0.08) 0%, rgba(244,210,16,0.02) 100%)',
                        border: `1px solid ${i % 2 === 0 ? 'rgba(16,119,191,0.1)' : 'rgba(244,210,16,0.1)'}`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5 transition-colors duration-500"
                        style={{ color: i % 2 === 0 ? '#1077BF' : '#f4d210' }}
                        strokeWidth={1.3}
                      />
                    </div>

                    {/* Number label */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-[10px] font-mono tracking-[0.2em] font-medium"
                        style={{ color: i % 2 === 0 ? 'rgba(16,119,191,0.4)' : 'rgba(244,210,16,0.4)' }}
                      >
                        {item.num}
                      </span>
                      <div
                        className="w-6 h-px"
                        style={{
                          background: i % 2 === 0
                            ? 'linear-gradient(to right, rgba(16,119,191,0.3), transparent)'
                            : 'linear-gradient(to right, rgba(244,210,16,0.3), transparent)',
                        }}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className="card-title text-[clamp(1.5rem,3vw,2.1rem)] font-light text-white/85 tracking-[-0.025em] leading-[1.15] mb-5"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="card-desc text-[13px] font-light leading-[2] tracking-wide text-white/18 max-w-[420px]">
                      {item.desc}
                    </p>

                    {/* Footer */}
                    <div className="card-footer mt-12 flex items-center gap-4">
                      <div
                        className="w-10 h-px"
                        style={{
                          background: i % 2 === 0
                            ? 'linear-gradient(to right, #1077BF, transparent)'
                            : 'linear-gradient(to right, #f4d210, transparent)',
                        }}
                      />
                      <span className="text-[9px] tracking-[0.25em] uppercase font-medium text-white/10">
                        Benefit {item.num} of 04
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}