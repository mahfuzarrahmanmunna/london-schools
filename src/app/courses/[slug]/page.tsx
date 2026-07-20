'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  GraduationCap,
  ListChecks,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { cipsCoursesData } from '@/app/data/cipsCoursesData';

gsap.registerPlugin(ScrollTrigger);

// ─── Types & Config ───────────────────────────────────────────
interface LevelTheme {
  accent: string;
  accentRgb: string;
  text: string;
  bg: string;
  glow: string;
  border: string;
  darkBg: string;
}

const LEVEL_THEMES: Record<number, LevelTheme> = {
  2: { accent: '#00A8A8', accentRgb: '0, 168, 168', text: '#00A8A8', bg: 'rgba(0, 168, 168, 0.04)', glow: 'rgba(0, 168, 168, 0.3)', border: 'rgba(0, 168, 168, 0.2)', darkBg: 'rgba(0, 168, 168, 0.1)' },
  3: { accent: '#0077C8', accentRgb: '0, 119, 200', text: '#0077C8', bg: 'rgba(0, 119, 200, 0.04)', glow: 'rgba(0, 119, 200, 0.3)', border: 'rgba(0, 119, 200, 0.2)', darkBg: 'rgba(0, 119, 200, 0.1)' },
  4: { accent: '#5B2C83', accentRgb: '91, 44, 131', text: '#5B2C83', bg: 'rgba(91, 44, 131, 0.04)', glow: 'rgba(91, 44, 131, 0.3)', border: 'rgba(91, 44, 131, 0.2)', darkBg: 'rgba(91, 44, 131, 0.1)' },
  5: { accent: '#C8102E', accentRgb: '200, 16, 46', text: '#C8102E', bg: 'rgba(200, 16, 46, 0.04)', glow: 'rgba(200, 16, 46, 0.3)', border: 'rgba(200, 16, 46, 0.2)', darkBg: 'rgba(200, 16, 46, 0.1)' },
  6: { accent: '#F2C300', accentRgb: '242, 195, 0', text: '#B89500', bg: 'rgba(242, 195, 0, 0.05)', glow: 'rgba(242, 195, 0, 0.3)', border: 'rgba(242, 195, 0, 0.25)', darkBg: 'rgba(242, 195, 0, 0.1)' },
  7: { accent: '#D4AF37', accentRgb: '212, 175, 55', text: '#D4AF37', bg: 'rgba(212, 175, 55, 0.04)', glow: 'rgba(212, 175, 55, 0.35)', border: 'rgba(212, 175, 55, 0.25)', darkBg: 'rgba(212, 175, 55, 0.1)' },
};

const LEVEL_IMAGES: Record<number, string> = {
  2: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
  3: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
  4: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
  5: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  6: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
  7: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop',
};

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

function FaqItem({ question, answer, isOpen, onClick, theme }: { 
  question: string; answer: string; isOpen: boolean; onClick: () => void; theme: LevelTheme 
}) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-6 text-left group"
        onClick={onClick}
      >
        <span className="text-base md:text-lg font-medium text-gray-800 group-hover:text-gray-900 transition-colors pr-8">
          {question}
        </span>
        <div 
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border"
          style={{ 
            backgroundColor: isOpen ? theme.accent : 'transparent',
            borderColor: isOpen ? theme.accent : '#E5E7EB',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <ChevronDown size={14} className={`transition-colors ${isOpen ? 'text-white' : 'text-gray-400'}`} />
        </div>
      </button>
      <div 
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <p className="pb-6 text-gray-500 leading-relaxed pl-1">
          {answer}
        </p>
      </div>
    </div>
  );
}

function CurriculumTabs({ coreModules, electiveModules, theme }: { 
  coreModules: any[]; electiveModules: any[]; theme: LevelTheme 
}) {
  const [activeTab, setActiveTab] = useState<'core' | 'elective'>('core');
  const modulesToShow = activeTab === 'core' ? coreModules : electiveModules;

  return (
    <div>
      <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('core')}
          className="px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300"
          style={{ 
            backgroundColor: activeTab === 'core' ? theme.accent : 'transparent', 
            color: activeTab === 'core' ? 'white' : '#6B7280',
            boxShadow: activeTab === 'core' ? `0 4px 12px ${theme.glow}` : 'none'
          }}
        >
          Core Modules ({coreModules.length})
        </button>
        {electiveModules.length > 0 && (
          <button
            onClick={() => setActiveTab('elective')}
            className="px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300"
            style={{ 
              backgroundColor: activeTab === 'elective' ? theme.accent : 'transparent', 
              color: activeTab === 'elective' ? 'white' : '#6B7280',
              boxShadow: activeTab === 'elective' ? `0 4px 12px ${theme.glow}` : 'none'
            }}
          >
            Electives ({electiveModules.length})
          </button>
        )}
      </div>

      <div className="space-y-3">
        {modulesToShow.map((mod, i) => (
          <div 
            key={mod.code} 
            className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-xs font-bold text-gray-500 bg-gray-50 border border-gray-100 group-hover:border-gray-200 transition-colors">
              {mod.code}
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">{mod.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Zap size={10} className="text-yellow-500" /> {mod.credits} Credits
                </span>
                <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                  mod.type === 'CORE' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {mod.type}
                </span>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────
export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = cipsCoursesData.find((c) => c.href === `/courses/${slug}`);

  const pageRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    if (!course) return;

    const ctx = gsap.context(() => {
      // Hero Text
      gsap.from('.split-word span', {
        y: '110%',
        opacity: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: 'power4.out',
        delay: 0.3,
      });

      gsap.from('.hero-meta', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1,
      });

      // Hero Image Parallax
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroImgRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Sections
      gsap.utils.toArray<HTMLElement>('.detail-section').forEach((sec) => {
        gsap.from(sec.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [course]);

  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link href="/qualifications" className="text-[#D4AF37] font-bold hover:underline">
            Back to Qualifications
          </Link>
        </div>
      </main>
    );
  }

  const theme = LEVEL_THEMES[course.level];
  const coreModules = course.modules.filter((m) => m.type === 'CORE');
  const electiveModules = course.modules.filter((m) => m.type === 'ELECTIVE');

  return (
    <main ref={pageRef} className="bg-[#FAFAFA] overflow-x-hidden">
      
      {/* ═══════════════════ EDITORIAL HERO ═══════════════════ */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden bg-[#050505]">
        <div ref={heroImgRef} className="absolute inset-0 -top-20 -bottom-20 w-full">
          <img
            src={LEVEL_IMAGES[course.level]}
            alt={course.title}
            className="w-full h-full object-cover scale-110 opacity-50"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-40 w-full">
          {/* Breadcrumb */}
          <div className="hero-meta flex flex-wrap items-center gap-3 mb-8">
            <Link href="/qualifications" className="text-xs font-medium tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors">
              Qualifications
            </Link>
            <span className="text-white/10">/</span>
            <span className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-md border backdrop-blur-md text-white/90"
              style={{ background: `rgba(${theme.accentRgb}, 0.2)`, borderColor: `rgba(${theme.accentRgb}, 0.3)` }}
            >
              Level {course.level}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter mb-8 max-w-4xl">
            <SplitText text={course.title} />
          </h1>

          {/* Subtitle */}
          <p className="hero-meta text-lg md:text-xl text-white/40 max-w-2xl leading-relaxed mb-12 font-light">
            {course.subtitle}
          </p>

          {/* Hero CTAs */}
          <div className="hero-meta flex flex-wrap gap-4">
            <a
              href="#curriculum"
              className="group inline-flex items-center gap-3 px-8 py-4 text-black rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110 hover:scale-105 transform"
              style={{ backgroundColor: theme.accent, boxShadow: `0 15px 40px -10px ${theme.glow}` }}
            >
              View Curriculum
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={course.brochureUrl}
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/80 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white/5 hover:border-white/40 backdrop-blur-sm transition-all"
            >
              <Download size={16} />
              Download Brochure
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════ OVERVIEW + SIDEBAR ═══════════════════ */}
      <section className="detail-section py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ color: theme.text }}>Overview</p>
            <p className="text-xl text-gray-600 leading-relaxed font-light">{course.overview}</p>
            
            <div className="mt-12 p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-50/50"
              style={{ borderColor: theme.border }}>
              <div className="p-2.5 rounded-xl bg-white border border-gray-100" style={{ color: theme.accent }}>
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Assessment Method</p>
                <p className="text-sm text-gray-500 leading-relaxed">{course.exam}</p>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
              <GraduationCap size={28} style={{ color: theme.accent }} className="mb-6" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Equivalent to</p>
              <p className="text-base font-semibold text-gray-900 mb-8">{course.equivalent}</p>
              
              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Total Credits</p>
                <p className="text-4xl font-bold tracking-tight" style={{ color: theme.text }}>{course.totalCredits}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Study Options</p>
                <div className="space-y-3">
                  {course.studyModes.map((mode, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                      <span className="text-sm text-gray-600 font-medium">{mode.mode}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                href="/contact" 
                className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white transition-all hover:brightness-110"
                style={{ backgroundColor: theme.accent }}
              >
                Enrol Now
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHO & WHY (Bento Grid) ═══════════════════ */}
      <section className="detail-section py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-6">
          {/* Who is this for */}
          <div className="bg-white rounded-3xl p-10 md:p-12 border border-gray-100 shadow-sm flex flex-col">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}` }}>
              <Users size={28} style={{ color: theme.accent }} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Who is this for?</h3>
            <p className="text-gray-500 leading-relaxed text-lg flex-grow">{course.whoIsThisFor}</p>
          </div>

          {/* Why Choose LSHS */}
          <div className="rounded-3xl p-10 md:p-12 text-white relative overflow-hidden flex flex-col" style={{ backgroundColor: '#0A0A0A' }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-[80px]" style={{ background: theme.accent }} />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: theme.darkBg, border: `1px solid rgba(${theme.accentRgb}, 0.3)` }}>
                <Trophy size={28} style={{ color: theme.accent }} />
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Why Choose LSHS?</h3>
              <p className="text-white/50 leading-relaxed text-lg flex-grow">{course.whyChooseLshs}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CURRICULUM ═══════════════════ */}
      <section id="curriculum" className="detail-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: theme.text }}>Syllabus</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Course Curriculum</h2>
          </div>

          <CurriculumTabs 
            coreModules={coreModules} 
            electiveModules={electiveModules} 
            theme={theme} 
          />
        </div>
      </section>

      {/* ═══════════════════ OUTCOMES & REQUIREMENTS ═══════════════════ */}
      <section className="detail-section py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16">
          
          {/* Outcomes */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: theme.text }}>Return on Investment</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-10">Key Benefits</h2>
            <div className="space-y-4">
              {course.outcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100 group hover:shadow-md transition-shadow">
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.bg }}>
                    <CheckCircle2 size={18} style={{ color: theme.accent }} />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: theme.text }}>Entry Criteria</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-10">Prerequisites</h2>
            
            <div className="space-y-4">
              {course.requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-900 text-white font-bold text-sm">
                    0{i + 1}
                  </div>
                  <p className="text-gray-700 font-medium">{req}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STUDY MODES ═══════════════════ */}
      <section className="detail-section py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-4">Flexibility</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">How You Can Study</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {course.studyModes.map((mode, i) => (
              <div key={i} className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm group hover:bg-white/[0.05] transition-all duration-500">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-8 border" style={{ borderColor: `rgba(${theme.accentRgb}, 0.3)`, backgroundColor: theme.darkBg }}>
                  <Clock size={24} style={{ color: theme.accent }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{mode.mode}</h3>
                <p className="text-white/40 leading-relaxed">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="detail-section py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: theme.text }}>Support</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100">
            {course.faq.map((item, i) => (
              <FaqItem 
                key={i} 
                question={item.question} 
                answer={item.answer} 
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="relative py-32 overflow-hidden" style={{ background: `linear-gradient(135deg, #050505 0%, rgba(${theme.accentRgb}, 0.15) 100%)` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[100px]" style={{ background: theme.accent }} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 border" style={{ borderColor: `rgba(${theme.accentRgb}, 0.3)`, backgroundColor: theme.darkBg }}>
            <Award size={32} style={{ color: theme.accent }} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Ready to Start?
          </h2>
          <p className="text-lg text-white/30 leading-relaxed mb-12 max-w-xl mx-auto">
            Take the next step in your procurement career. Enrol today or download our comprehensive brochure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 text-black rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110 hover:scale-105 transform"
              style={{ backgroundColor: theme.accent, boxShadow: `0 20px 40px -10px ${theme.glow}` }}
            >
              Enrol Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={course.brochureUrl}
              className="inline-flex items-center gap-3 px-10 py-5 border border-white/20 text-white/80 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white/5 transition-all"
            >
              <Download size={16} />
              Download Brochure
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}