'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Award,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  GraduationCap,
  Users,
} from 'lucide-react';
import { cipsCoursesData, CipsCourse } from '@/app/data/cipsCoursesData';

gsap.registerPlugin(ScrollTrigger);

// ─── Types & Config ───────────────────────────────────────────
interface LevelTheme {
  accent: string;
  accentRgb: string;
  text: string;
  bg: string;
  glow: string;
  border: string;
}

const LEVEL_THEMES: Record<number, LevelTheme> = {
  2: {
    accent: '#00A8A8',
    accentRgb: '0, 168, 168',
    text: '#00A8A8',
    bg: 'rgba(0, 168, 168, 0.04)',
    glow: 'rgba(0, 168, 168, 0.2)',
    border: 'rgba(0, 168, 168, 0.15)',
  },
  3: {
    accent: '#0077C8',
    accentRgb: '0, 119, 200',
    text: '#0077C8',
    bg: 'rgba(0, 119, 200, 0.04)',
    glow: 'rgba(0, 119, 200, 0.2)',
    border: 'rgba(0, 119, 200, 0.15)',
  },
  4: {
    accent: '#5B2C83',
    accentRgb: '91, 44, 131',
    text: '#5B2C83',
    bg: 'rgba(91, 44, 131, 0.04)',
    glow: 'rgba(91, 44, 131, 0.2)',
    border: 'rgba(91, 44, 131, 0.15)',
  },
  5: {
    accent: '#C8102E',
    accentRgb: '200, 16, 46',
    text: '#C8102E',
    bg: 'rgba(200, 16, 46, 0.04)',
    glow: 'rgba(200, 16, 46, 0.2)',
    border: 'rgba(200, 16, 46, 0.15)',
  },
  6: {
    accent: '#F2C300',
    accentRgb: '242, 195, 0',
    text: '#B89500',
    bg: 'rgba(242, 195, 0, 0.05)',
    glow: 'rgba(242, 195, 0, 0.2)',
    border: 'rgba(242, 195, 0, 0.2)',
  },
  7: {
    accent: '#D4AF37',
    accentRgb: '212, 175, 55',
    text: '#D4AF37',
    bg: 'rgba(212, 175, 55, 0.04)',
    glow: 'rgba(212, 175, 55, 0.25)',
    border: 'rgba(212, 175, 55, 0.2)',
  },
};

// ─── Image Mapping for Courses ────────────────────────────────
const LEVEL_IMAGES: Record<number, string> = {
  2: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
  3: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
  4: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
  5: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  6: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
  7: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop',
};

// Map level to qualification type
const LEVEL_TYPE_MAP: Record<number, string> = {
  2: 'Foundation Certificate',
  3: 'Advanced Certificate',
  4: 'Diploma',
  5: 'Advanced Diploma',
  6: 'Professional Diploma',
  7: 'Chartered Status',
};

// Map level to short title
const LEVEL_TITLE_MAP: Record<number, string> = {
  2: 'CIPS Level 2',
  3: 'CIPS Level 3',
  4: 'CIPS Level 4',
  5: 'CIPS Level 5',
  6: 'CIPS Level 6',
  7: 'MCIPS',
};

// Map level to course href
const LEVEL_HREF_MAP: Record<number, string> = {
  2: '/courses/level-2-certificate',
  3: '/courses/level-3-advanced-certificate',
  4: '/courses/level-4-diploma',
  5: '/courses/level-5-advanced-diploma',
  6: '/courses/level-6-professional-diploma',
  7: '/courses/mcips',
};

const TIMELINE_STEPS = [
  { level: 2, label: 'Foundation' },
  { level: 3, label: 'Operational' },
  { level: 4, label: 'Tactical' },
  { level: 5, label: 'Managerial' },
  { level: 6, label: 'Strategic' },
  { level: 7, label: 'MCIPS' },
];

const HERO_STATS = [
  { value: 5, suffix: '', label: 'Qualification Levels' },
  { value: 150, suffix: '+', label: 'Countries Recognised' },
  { value: 45, suffix: 'k+', label: 'Global Members' },
];

// ─── Custom Hooks ─────────────────────────────────────────────
function useMagnetic(ref: React.RefObject<HTMLElement | null>, strength: number = 0.3) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);
}

// ─── Sub-Components ──────────────────────────────────────────

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="split-word inline-block overflow-hidden">
          <span className="inline-block" style={{ willChange: 'transform, opacity' }}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      delay: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toString();
      },
    });
  }, [value]);

  return (
    <div className="flex flex-col items-center text-center px-6">
      <div className="text-3xl md:text-4xl font-bold text-white tracking-tight font-mono">
        <span ref={ref}>0</span>
        <span className="text-[#D4AF37]">{suffix}</span>
      </div>
      <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mt-2">{label}</div>
    </div>
  );
}

// ─── Updated Course Card Component ────────────────────────────
function CourseCard({ data, index }: { data: CipsCourse; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = LEVEL_THEMES[data.level];
  const shortTitle = LEVEL_TITLE_MAP[data.level];
  const type = LEVEL_TYPE_MAP[data.level];

  return (
    <div
      ref={cardRef}
      className="course-card group relative rounded-2xl bg-white border border-gray-100/80 overflow-hidden will-change-transform flex flex-col h-full"
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
      }}
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={LEVEL_IMAGES[data.level]}
          alt={shortTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Overlay for text readability if needed, or just for aesthetics */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Badge floating on image */}
        <div
          className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase border backdrop-blur-md"
          style={{
            color: '#FFFFFF',
            background: `rgba(${theme.accentRgb}, 0.85)`,
            borderColor: 'rgba(255,255,255,0.2)',
          }}
        >
          Level {data.level}
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {/* Type */}
        <span className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: theme.text }}>
          {type}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight">
          {shortTitle}
        </h3>

        {/* 2 Important Informations */}
        <div className="space-y-4 mb-8 flex-grow">
          {/* Info 1: Equivalent */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1.5 rounded-md bg-gray-50" style={{ color: theme.accent }}>
              <GraduationCap size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Equivalent to</p>
              <p className="text-sm text-gray-700 font-medium leading-snug">{data.equivalent}</p>
            </div>
          </div>

          {/* Info 2: Who is this for */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1.5 rounded-md bg-gray-50" style={{ color: theme.accent }}>
              <Users size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Who it&apos;s for</p>
              <p className="text-sm text-gray-500 leading-snug line-clamp-2">{data.whoIsThisFor}</p>
            </div>
          </div>
        </div>

        {/* Details Button */}
        <Link
          href={data.href}
          className="mt-auto w-full group/btn flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-lg"
          style={{ 
            backgroundColor: theme.accent,
            boxShadow: `0 4px 15px -3px ${theme.glow}`
          }}
        >
          View Full Details
          <ArrowRight size={16} className="transition-transform duration-300 translate-x-0 group-hover/btn:translate-x-1" />
        </Link>
      </div>

      {/* Hover Background Glow - GPU Accelerated */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          transform: 'translateZ(0)',
          boxShadow: `0 25px 50px -12px ${theme.glow}`,
        }}
      />

      {/* Hover Lift */}
      <style jsx>{`
        .course-card {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease;
        }
        @media (hover: hover) {
          .course-card:hover {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────
export default function CipsQualificationsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const [timelineActive, setTimelineActive] = useState<number | null>(null);

  // Initialize Hooks
  useMagnetic(ctaRef, 0.4);

  // ─── Master Animations ─────────────────────────
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const ctx = gsap.context(() => {
      // --- HERO ANIMATIONS ---
      const heroTl = gsap.timeline({ delay: 0.3 });

      heroTl
        .from('.hero-badge', {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(
          '.split-word span',
          {
            y: '110%',
            opacity: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .from(
          '.hero-desc',
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          '.hero-stats',
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          '.hero-cta',
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );

      // --- FLOATING ORBS PARALLAX ---
      gsap.to('.hero-orb-1', {
        y: -100,
        x: 50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      gsap.to('.hero-orb-2', {
        y: -150,
        x: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // --- TIMELINE DRAW ---
      gsap.fromTo(
        '.timeline-line-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: 0.8,
          },
        }
      );

      // --- TIMELINE NODES STAGGER ---
      gsap.from('.timeline-node', {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 75%',
        },
      });

      // --- GRID CARDS ENTRANCE ---
      gsap.from('.course-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
      <main ref={pageRef} className="bg-[#FAFAFA] overflow-x-hidden" style={{ position: 'relative', top: 0, left: 0 }}>
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div
              className="hero-orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(0, 168, 168, 0.15) 0%, transparent 70%)',
                willChange: 'transform',
              }}
            />
            <div
              className="hero-orb-2 absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                willChange: 'transform',
              }}
            />
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10">
              <Sparkles size={14} className="text-[#D4AF37]" />
              <span className="text-xs font-medium tracking-widest uppercase text-white/60">
                Globally Recognised
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter mb-8">
              <SplitText text="CIPS Qualifications" className="block mb-2" />
              <SplitText
                text="MCIPS Pathway"
                className="block"
              />
            </h1>

            <p className="hero-desc text-base md:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed font-light mb-14">
              From foundational principles to strategic leadership. Navigate your journey
              to Chartered Status with the world&apos;s largest procurement body.
            </p>

            <div className="hero-stats flex flex-wrap justify-center gap-4 md:gap-8 mb-14 border-t border-b border-white/10 py-8">
              {HERO_STATS.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </div>

            <button
              ref={ctaRef}
              className="hero-cta relative inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-black rounded-full text-sm font-bold uppercase tracking-wider overflow-hidden transition-colors hover:bg-[#e0bd45] will-change-transform"
              style={{ boxShadow: '0 10px 30px -10px rgba(212, 175, 55, 0.4)' }}
              onClick={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Programmes
                <ArrowRight size={16} />
              </span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white font-medium">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        {/* ═══════════════════ TIMELINE ═══════════════════ */}
        <section ref={timelineRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">The Journey</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                Qualification Pathway
              </h2>
              <p className="text-sm text-gray-400 mt-4">Click on any level to view details</p>
            </div>

            {/* Desktop Timeline */}
            <div
              className="hidden md:flex items-center justify-between relative group/timeline"
              onMouseLeave={() => setTimelineActive(null)}
            >
              {/* Line Background */}
              <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-gray-100 -translate-y-1/2" />

              {/* Line Fill */}
              <div
                className="timeline-line-fill absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2 origin-left"
                style={{
                  background: 'linear-gradient(to right, #00A8A8, #0077C8, #5B2C83, #C8102E, #F2C300, #D4AF37)',
                }}
              />

              {/* Nodes */}
              <div className="relative z-10 flex justify-between w-full">
                {TIMELINE_STEPS.map((step, i) => {
                  const theme = LEVEL_THEMES[step.level];
                  const isActive = timelineActive === step.level;
                  const isNeighbor =
                    timelineActive !== null &&
                    Math.abs(TIMELINE_STEPS.findIndex(s => s.level === timelineActive) - i) === 1;

                  return (
                    <Link
                      key={step.level}
                      href={LEVEL_HREF_MAP[step.level]}
                      className="timeline-node flex flex-col items-center relative group/node"
                      onMouseEnter={() => setTimelineActive(step.level)}
                      style={{ cursor: 'pointer', willChange: 'transform, opacity', textDecoration: 'none' }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 bg-white transition-all duration-500 relative z-10 group-hover/node:shadow-lg"
                        style={{
                          borderColor: isActive || isNeighbor ? theme.accent : '#E5E7EB',
                          boxShadow: isActive ? `0 0 25px ${theme.glow}` : 'none',
                          transform: isActive ? 'scale(1.2)' : 'scale(1)',
                        }}
                      >
                        {step.level === 7 ? (
                          <Award size={20} style={{ color: isActive ? theme.text : '#9CA3AF' }} />
                        ) : (
                          <span
                            className="text-base font-bold"
                            style={{ color: isActive ? theme.text : '#9CA3AF' }}
                          >
                            {step.level}
                          </span>
                        )}
                      </div>
                      <span
                        className="mt-3 text-xs font-semibold tracking-wider uppercase transition-colors duration-300"
                        style={{ color: isActive ? theme.text : '#9CA3AF' }}
                      >
                        {step.label}
                      </span>
                      {/* Hover Arrow Indicator */}
                      <div 
                        className="absolute -bottom-6 opacity-0 group-hover/node:opacity-100 transition-all duration-300 translate-y-2 group-hover/node:translate-y-0"
                        style={{ color: theme.accent }}
                      >
                        <ArrowUpRight size={14} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden relative pl-12 space-y-12">
              <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gray-100">
                <div
                  className="timeline-line-fill absolute inset-0 origin-top"
                  style={{
                    background: 'linear-gradient(to bottom, #00A8A8, #0077C8, #5B2C83, #C8102E, #F2C300, #D4AF37)',
                  }}
                />
              </div>
              {TIMELINE_STEPS.map((step) => {
                const theme = LEVEL_THEMES[step.level];
                return (
                  <Link
                    key={step.level}
                    href={LEVEL_HREF_MAP[step.level]}
                    className="timeline-node relative flex items-center gap-4 group/node"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="absolute -left-12 w-10 h-10 rounded-xl flex items-center justify-center border-2 bg-white transition-all duration-300 group-hover/node:scale-110"
                      style={{ borderColor: theme.accent, boxShadow: `0 0 15px ${theme.glow}` }}
                    >
                      {step.level === 7 ? (
                        <Award size={16} style={{ color: theme.text }} />
                      ) : (
                        <span className="text-sm font-bold" style={{ color: theme.text }}>{step.level}</span>
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold text-gray-900">
                          {step.level === 7 ? 'MCIPS' : `Level ${step.level}`}
                        </p>
                        <p className="text-xs text-gray-400">{step.label}</p>
                      </div>
                      <div className="opacity-50 group-hover/node:opacity-100 transition-opacity" style={{ color: theme.accent }}>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════ COURSE GRID ═══════════════════ */}
        <section id="grid" ref={gridRef} className="relative py-24 md:py-32 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Programmes</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                Choose Your Level
              </h2>
              <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
                Each qualification is tailored to a specific stage of your career, providing the exact skills and knowledge needed to advance.
              </p>
            </div>

            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {cipsCoursesData.map((course, i) => (
                <CourseCard key={course.level} data={course} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ FINAL CTA ═══════════════════ */}
        <section className="relative py-32 overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <Award size={32} className="mx-auto mb-8 text-[#D4AF37]" />
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Begin Your Journey to <span className="text-[#D4AF37]">MCIPS</span>
            </h2>
            <p className="text-base text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
              Join an elite network of procurement professionals. Our advisors are ready to map out your personalized pathway to Chartered Status.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#e0bd45] transition-colors"
                style={{ boxShadow: '0 10px 30px -10px rgba(212, 175, 55, 0.4)' }}
              >
                Speak to an Advisor
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/fees"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white/60 rounded-full text-sm font-medium uppercase tracking-wider hover:border-white/30 hover:text-white transition-all"
              >
                View Pricing
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}