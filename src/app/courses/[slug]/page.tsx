"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  MapPin,
  BookOpen,
  RotateCw,
  Award,
  Plus,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

// Import the JSON data
import cipsCoursesData from "../../data/cipsCourse.json";
import { useModal } from "@/app/context/ModalContext";

gsap.registerPlugin(ScrollTrigger);
// ─── Types & Config ───────────────────────────────────────────
interface LevelTheme {
  accent: string;
  accentRgb: string;
  text: string;
  bg: string;
  border: string;
}

const LEVEL_THEMES: Record<number, LevelTheme> = {
  2: {
    accent: "#0F766E",
    accentRgb: "15, 118, 110",
    text: "#0F766E",
    bg: "rgba(15, 118, 110, 0.05)",
    border: "rgba(15, 118, 110, 0.2)",
  },
  3: {
    accent: "#1D4ED8",
    accentRgb: "29, 78, 216",
    text: "#1D4ED8",
    bg: "rgba(29, 78, 216, 0.05)",
    border: "rgba(29, 78, 216, 0.2)",
  },
  4: {
    accent: "#6D28D9",
    accentRgb: "109, 40, 217",
    text: "#6D28D9",
    bg: "rgba(109, 40, 217, 0.05)",
    border: "rgba(109, 40, 217, 0.2)",
  },
  5: {
    accent: "#BE123C",
    accentRgb: "190, 18, 60",
    text: "#BE123C",
    bg: "rgba(190, 18, 60, 0.05)",
    border: "rgba(190, 18, 60, 0.2)",
  },
  6: {
    accent: "#CA8A04",
    accentRgb: "202, 138, 4",
    text: "#CA8A04",
    bg: "rgba(202, 138, 4, 0.05)",
    border: "rgba(202, 138, 4, 0.2)",
  },
};

const LEVEL_IMAGES: Record<number, string> = {
  2: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
  3: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  4: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
  5: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
  6: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
};

// ─── Sub-Components ──────────────────────────────────────────

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="split-word inline-block overflow-hidden">
          <span
            className="inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}

function FaqItem({
  question,
  answer,
  list,
  isOpen,
  onClick,
  theme,
}: {
  question: string;
  answer: string;
  list?: string[];
  isOpen: boolean;
  onClick: () => void;
  theme: LevelTheme;
}) {
  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span
          className={`text-base md:text-lg font-medium transition-colors duration-300 ${
            isOpen ? "" : "text-primary group-hover:opacity-80"
          }`}
          style={isOpen ? { color: theme.text } : {}}
        >
          {question}
        </span>

        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isOpen
              ? "rotate-180"
              : "bg-white border-slate-200 group-hover:border-slate-400"
          }`}
          style={
            isOpen
              ? {
                  backgroundColor: theme.accent,
                  borderColor: theme.accent,
                }
              : {}
          }
        >
          <Plus
            className={`w-4 h-4 transition-colors duration-300 ${
              isOpen
                ? "text-white"
                : "text-slate-400 group-hover:text-slate-600"
            }`}
            strokeWidth={2.5}
          />
        </div>
      </button>

      {/* Smooth height transition using CSS Grid */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pr-12">
            <p className="text-base font-normal leading-relaxed tracking-normal text-slate-600 mb-4">
              {answer}
            </p>

            {/* Render List if present */}
            {list && list.length > 0 && (
              <ul className="space-y-3 mt-2">
                {list.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <span className="text-base font-normal leading-relaxed tracking-normal text-slate-600">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CurriculumTabs({
  coreModules,
  electiveModules,
  theme,
}: {
  coreModules: any[];
  electiveModules: any[];
  theme: LevelTheme;
}) {
  const [activeTab, setActiveTab] = useState<"core" | "elective">("core");
  const modulesToShow = activeTab === "core" ? coreModules : electiveModules;

  return (
    <div>
      <div className="flex gap-1 mb-10 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("core")}
          className="px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 relative -mb-px"
          style={{
            color: activeTab === "core" ? theme.text : "#64748B",
          }}
        >
          Core Modules ({coreModules.length})
          {activeTab === "core" && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: theme.accent }}
            />
          )}
        </button>
        {electiveModules.length > 0 && (
          <button
            onClick={() => setActiveTab("elective")}
            className="px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 relative -mb-px"
            style={{
              color: activeTab === "elective" ? theme.text : "#64748B",
            }}
          >
            Electives ({electiveModules.length})
            {activeTab === "elective" && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: theme.accent }}
              />
            )}
          </button>
        )}
      </div>

      <div className="space-y-px bg-slate-200 border border-slate-200">
        {modulesToShow.map((mod, i) => (
          <div
            key={mod.code}
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 bg-white transition-all duration-300 hover:bg-slate-50 group"
          >
            <div className="w-16 h-16 flex items-center justify-center text-sm font-bold text-slate-500 bg-slate-100 border border-slate-200 flex-shrink-0">
              {mod.code}
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-primary text-lg mb-2">
                {mod.name}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">
                {mod.description}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium uppercase tracking-wider">
                  <Clock size={12} /> {mod.credits} Credits
                </span>
                <span
                  className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 ${
                    mod.type.toUpperCase() === "CORE"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {mod.type}
                </span>
              </div>
            </div>
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
    const { openModal } = useModal();

  // Typecast JSON data to find the correct course
  const course = (cipsCoursesData as any[]).find((c) => c.slug === slug);

  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0); // Open the first one by default

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    if (!course) return;

    const ctx = gsap.context(() => {
      // Hero Text Animation
      gsap.from(".split-word span", {
        y: "110%",
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".hero-anim", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      });

      // Scroll Reveal Animation for Sections
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((sec) => {
        gsap.from(sec.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
          },
        });
      });

      // Scroll Reveal for individual items (like FAQ)
      gsap.utils.toArray<HTMLElement>(".reveal-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
      });

      // Crucial for Lenis compatibility: Refresh ScrollTrigger after initial load
      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, [course]);

  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1
            className="hero-title text-white font-light tracking-[-0.025em] leading-[1.05]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            }}
          >
            Course Not Found
          </h1>
          <Link
            href="/courses"
            className="text-slate-500 font-medium hover:text-slate-900 underline underline-offset-4"
          >
            Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  const theme = LEVEL_THEMES[course.level] || LEVEL_THEMES[2];

  return (
    // Removed overflow-x-hidden here to fix Lenis scroll locking
    <main ref={pageRef} className="bg-white">
      {/* ═══════════════════ EDITORIAL HERO ═══════════════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={LEVEL_IMAGES[course.level]}
            alt={course.hero.headline}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40 w-full">
          {/* Breadcrumb */}
          <div className="hero-anim flex flex-wrap items-center gap-3 mb-10">
            <Link
              href="/courses"
              className="text-xs font-medium tracking-widest uppercase text-slate-400 hover:text-white transition-colors"
            >
              Courses
            </Link>
            <span className="text-slate-600">/</span>
            <span
              className="text-xs font-bold tracking-wider uppercase px-3 py-1 border text-white"
              style={{ borderColor: theme.border, color: theme.text }}
            >
              Level {course.level}
            </span>
          </div>

          {/* Title */}
          <h1
            className="hero-title text-white font-light tracking-[-0.025em] leading-[1.05]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            }}
          >
            {course.hero.headline}
          </h1>

          {/* Subtitle */}
          <p className="hero-anim text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mb-12 font-light">
            {course.hero.sub_headline}
          </p>

          {/* Key Facts Strip */}
          <div className="hero-anim flex flex-wrap gap-x-8 gap-y-4 mb-12 border-t border-b border-slate-700 py-6">
            {course.hero.key_facts.map((fact: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm font-medium text-slate-300"
              >
                <CheckCircle2 size={14} style={{ color: theme.accent }} />
                {fact}
              </div>
            ))}
          </div>

          {/* Hero CTAs */}
          <div className="hero-anim flex flex-wrap gap-4">
            <a
              href="https://forms.gle/kHkicZ6TaHQRoMck6"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-md text-sm font-bold uppercase tracking-wider transition-all hover:bg-primary/90"
            >
              {course.hero.cta_buttons[0]}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <button
              onClick={() => openModal("brochure")}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-md text-sm font-bold uppercase tracking-wider hover:bg-white/20 transition-all"
            >
              <Download size={16} />
              {course.hero.cta_buttons[1]}
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════ COURSE OVERVIEW ═══════════════════ */}
      <section className="reveal py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-6"
              style={{ color: theme.text }}
            >
              Course Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-8">
              {course.course_overview.headline}
            </h2>
            <div className="space-y-6 text-slate-600 leading-[1.8] text-base">
              {course.course_overview.body
                .split("\n\n")
                .map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
            </div>
          </div>

          {/* Sticky Sidebar (Left Side Form Data) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-slate-50 border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200">
                <div
                  className="p-2.5 bg-white border border-slate-200"
                  style={{ color: theme.accent }}
                >
                  <BookOpen size={20} />
                </div>
                <p className="text-lg font-bold text-primary">
                  {course.course_overview.left_side.course_name}
                </p>
              </div>

              <div
                className="p-4 mb-6 border"
                style={{ backgroundColor: theme.bg, borderColor: theme.border }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <RotateCw size={14} style={{ color: theme.accent }} />
                  <p
                    className="text-xs font-bold tracking-wider uppercase"
                    style={{ color: theme.text }}
                  >
                    {course.course_overview.left_side.counter_text}
                  </p>
                </div>
                <p className="text-xl font-bold text-primary">
                  {course.course_overview.left_side.discount}
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                {course.course_overview.left_side.contact_text}
              </p>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-md text-sm font-bold uppercase tracking-wider transition-all hover:bg-primary/90"
              >
                {course.course_overview.left_side.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHO IT'S FOR ═══════════════════ */}
      <section className="reveal py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-6"
              style={{ color: theme.text }}
            >
              Who It's For
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight mb-6">
              {course.who_its_for.headline}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              {course.who_its_for.body}
            </p>
          </div>

          <div className="p-8 md:p-10 bg-white border border-slate-200 flex flex-col md:flex-row items-start gap-6">
            <div
              className="w-12 h-12 flex items-center justify-center flex-shrink-0 border"
              style={{
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
              }}
            >
              <CheckCircle2 size={24} style={{ color: theme.accent }} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary mb-2">
                Entry Requirements
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {course.who_its_for.entry_requirements}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHAT YOU'LL STUDY (MODULES) ═══════════════════ */}
      <section
        id="curriculum"
        className="reveal py-24 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 max-w-2xl">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-6"
              style={{ color: theme.text }}
            >
              What You'll Study
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight mb-4">
              {course.modules.headline}
            </h2>
            <p className="text-lg text-slate-600 font-light">
              {course.modules.sub_text}
            </p>
          </div>

          <CurriculumTabs
            coreModules={course.modules.core_modules}
            electiveModules={course.modules.elective_modules}
            theme={theme}
          />
        </div>
      </section>

      {/* ═══════════════════ BROCHURE & FEES ═══════════════════ */}
      <section className="reveal py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative overflow-hidden p-12 md:p-20 text-center bg-[#0F172A]">
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.accent} 1px, transparent 1px), linear-gradient(to bottom, ${theme.accent} 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            ></div>

            <div className="relative z-10">
              <Download
                size={32}
                style={{ color: theme.accent }}
                className="mx-auto mb-8"
              />
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 max-w-3xl mx-auto">
                {course.brochure_fees.headline}
              </h2>
              <button
                onClick={() => openModal("brochure")}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-md text-sm font-bold uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                {course.brochure_fees.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW YOU'LL STUDY ═══════════════════ */}
      <section className="reveal py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: theme.text }}
            >
              How You'll Study
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight mb-4">
              {course.how_youll_study.headline}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {course.how_youll_study.modes.map((mode: string, i: number) => {
              const isClassroom = mode.toLowerCase().includes("classroom");
              return (
                <div
                  key={i}
                  className="p-8 bg-white transition-all duration-300 hover:bg-slate-50 group"
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-6 border"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.bg,
                    }}
                  >
                    {isClassroom ? (
                      <MapPin size={20} style={{ color: theme.accent }} />
                    ) : (
                      <Clock size={20} style={{ color: theme.accent }} />
                    )}
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed text-sm">
                    {mode}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/60 backdrop-blur-md border border-slate-200 text-primary rounded-md text-sm font-bold uppercase tracking-wider hover:bg-white transition-all shadow-sm">
              {course.how_youll_study.cta}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════ NEXT STEP ═══════════════════ */}
      <section className="reveal py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="flex flex-col lg:flex-row items-center gap-12 p-12 md:p-16 border"
            style={{ borderColor: theme.border, backgroundColor: theme.bg }}
          >
            <div className="flex-1">
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
                style={{ color: theme.text }}
              >
                Where This Qualification Takes You
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-6">
                {course.next_step.headline}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {course.next_step.body}
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/courses"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-md border border-white/80 text-primary rounded-md text-sm font-bold uppercase tracking-wider transition-all hover:bg-white shadow-sm"
              >
                {course.next_step.cta}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                  style={{ color: theme.accent }}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ LSHS BENEFITS ═══════════════════ */}
      <section className="reveal py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: theme.text }}
            >
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight mb-4">
              {course.lshs_benefits.headline}
            </h2>
            <p className="text-lg text-slate-600 font-light">
              {course.lshs_benefits.sub_text}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {course.lshs_benefits.benefits.map((benefit: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-5 p-8 bg-white transition-all duration-300 hover:bg-slate-50 group"
              >
                <div
                  className="mt-0.5 flex-shrink-0 w-8 h-8 flex items-center justify-center"
                  style={{
                    backgroundColor: theme.bg,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <CheckCircle2 size={16} style={{ color: theme.accent }} />
                </div>
                <p className="text-slate-700 font-medium leading-relaxed pt-1">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all"
            >
              {course.lshs_benefits.cta_buttons[0]}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/60 backdrop-blur-md border border-slate-200 text-primary rounded-md text-sm font-bold uppercase tracking-wider hover:bg-white transition-all shadow-sm"
            >
              {course.lshs_benefits.cta_buttons[1]}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="reveal py-24 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column: Sticky Header & CTA */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
              <div className="reveal-item flex items-center gap-4 mb-6">
                <span
                  className="text-sm tracking-[0.2em] font-semibold uppercase"
                  style={{ color: theme.text }}
                >
                  FAQs
                </span>
                <div
                  className="w-12 h-0.5"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>

              <h2 className="reveal-item text-3xl lg:text-4xl font-medium text-primary tracking-tight leading-[1.2] mb-6">
                Frequently Asked Questions
              </h2>

              <p className="reveal-item text-base font-normal leading-relaxed tracking-normal text-slate-600 mb-10">
                Find answers to the most common questions about our CIPS
                qualifications, study modes, and the enrolment process.
              </p>

              {/* Support CTA Card */}
              <div className="reveal-item relative bg-white border border-slate-200 rounded-xl p-6 overflow-hidden shadow-sm">
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: theme.accent }}
                />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <MessageCircle
                      className="w-5 h-5"
                      style={{ color: theme.accent }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-primary tracking-tight mb-1">
                      Still have questions?
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-slate-500 mb-4">
                      Our academic support team is here to help you choose the
                      right path.
                    </p>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-colors duration-300 border-b pb-1"
                      style={{
                        color: theme.text,
                        borderColor: `${theme.accent}30`,
                      }}
                    >
                      Talk to an Advisor
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Accordion List */}
            <div className="lg:col-span-7">
              <div className="reveal-item bg-white border border-slate-200 p-6 md:p-10 rounded-lg shadow-sm">
                {course.faq.map((item: any, i: number) => (
                  <FaqItem
                    key={i}
                    question={item.question}
                    answer={item.answer}
                    list={item.list}
                    isOpen={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CLOSING CTA ═══════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-50">
        <div className="cta-box-container relative z-10 max-w-5xl py-16 md:py-20 bg-[#050505] rounded-[2rem] mx-auto px-6 md:px-12 shadow-2xl border border-white/10">
          {/* Centered Content Wrapper */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center justify-center w-16 h-16 mb-8 border rounded-2xl"
              style={{ borderColor: theme.border, backgroundColor: theme.bg }}
            >
              <Award size={32} style={{ color: theme.accent }} />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
              {course.closing_cta.headline}
            </h2>

            <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-12 max-w-xl mx-auto">
              {course.closing_cta.body}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-md text-sm font-bold uppercase tracking-wider transition-all hover:bg-primary/90 w-full sm:w-auto justify-center"
              >
                {course.closing_cta.cta_buttons[0]}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-md text-sm font-bold uppercase tracking-wider hover:bg-white/20 transition-all w-full sm:w-auto justify-center"
              >
                {course.closing_cta.cta_buttons[1]}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}