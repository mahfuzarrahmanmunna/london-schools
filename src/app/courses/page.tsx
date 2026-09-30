"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Award,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  GraduationCap,
  Users,
} from "lucide-react";

// Import the JSON data
import cipsCoursesData from "../data/cipsCourse.json";
import { useModal } from "../context/ModalContext";

gsap.registerPlugin(ScrollTrigger);

// ─── Types & Config ───────────────────────────────────────────
interface CipsCourse {
  slug: string;
  level: number;
  [key: string]: any;
}

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
    accent: "#00A896",
    accentRgb: "0, 168, 150",
    text: "#00A896",
    bg: "rgba(0, 168, 150, 0.04)",
    glow: "rgba(0, 168, 150, 0.2)",
    border: "rgba(0, 168, 150, 0.15)",
  },
  3: {
    accent: "#0074D9",
    accentRgb: "0, 116, 217",
    text: "#0074D9",
    bg: "rgba(0, 116, 217, 0.04)",
    glow: "rgba(0, 116, 217, 0.2)",
    border: "rgba(0, 116, 217, 0.15)",
  },
  4: {
    accent: "#f02e50",
    accentRgb: "240, 46, 80",
    text: "#f02e50",
    bg: "rgba(240, 46, 80, 0.04)",
    glow: "rgba(240, 46, 80, 0.2)",
    border: "rgba(240, 46, 80, 0.15)",
  },
  5: {
    accent: "#2ECC40",
    accentRgb: "46, 204, 64",
    text: "#2ECC40",
    bg: "rgba(46, 204, 64, 0.04)",
    glow: "rgba(46, 204, 64, 0.2)",
    border: "rgba(46, 204, 64, 0.15)",
  },
  6: {
    accent: "#7271B3",
    accentRgb: "114, 113, 179",
    text: "#7271B3",
    bg: "rgba(114, 113, 179, 0.05)",
    glow: "rgba(114, 113, 179, 0.2)",
    border: "rgba(114, 113, 179, 0.2)",
  },
  7: {
    accent: "#D4AF37",
    accentRgb: "212, 175, 55",
    text: "#D4AF37",
    bg: "rgba(212, 175, 55, 0.04)",
    glow: "rgba(212, 175, 55, 0.25)",
    border: "rgba(212, 175, 55, 0.2)",
  },
};

const LEVEL_IMAGES: Record<number, string> = {
  2: "/courses/coursesim.png",
  3: "/courses/coursesim.png",
  4: "/courses/coursesim.png",
  5: "/courses/coursesim.png",
  6: "/courses/coursesim.png",
  7: "/courses/coursesim.png",
};

const LEVEL_TYPE_MAP: Record<number, string> = {
  2: "Foundation Certificate",
  3: "Advanced Certificate",
  4: "Diploma",
  5: "Advanced Diploma",
  6: "Professional Diploma",
};

const TIMELINE_STEPS = [
  { level: 2, label: "Foundation" },
  { level: 3, label: "Operational" },
  { level: 4, label: "Tactical" },
  { level: 5, label: "Managerial" },
  { level: 6, label: "Strategic" },
  { level: 7, label: "Chartered" },
];

// Dynamically generate timeline gradients directly from LEVEL_THEMES
const TIMELINE_COLORS = TIMELINE_STEPS.map(
  (step) => LEVEL_THEMES[step.level].accent,
).join(", ");
const TIMELINE_GRADIENT_DESKTOP = `linear-gradient(to right, ${TIMELINE_COLORS})`;
const TIMELINE_GRADIENT_MOBILE = `linear-gradient(to bottom, ${TIMELINE_COLORS})`;

const HERO_STATS = [
  { value: 5, suffix: "", label: "Qualification Levels" },
  { value: 150, suffix: "+", label: "Countries Recognised" },
  { value: 60000, suffix: "+", label: "Global Members" },
];

// Mapping exact text from your prompt for absolute consistency
const ARCHIVE_CARD_DATA: Record<
  number,
  { title: string; equivalent: string; whoFor: string }
> = {
  2: {
    title: "CIPS Level 2",
    equivalent: "GCSE level / introductory vocational qualification",
    whoFor:
      "Anyone new to procurement, or looking to move into the profession, ideal for school leavers, administrative staff, or career changers taking their first step.",
  },
  3: {
    title: "CIPS Level 3",
    equivalent: "A-Level standard / intermediate vocational qualification",
    whoFor:
      "Those already working in a procurement or supply delivery role who want to strengthen their fundamentals and understand how their work fits into the wider organisation.",
  },
  4: {
    title: "CIPS Level 4",
    equivalent: "First year of an undergraduate degree (Ofqual regulated)",
    whoFor:
      "Professionals with around two or more years' experience in a business environment, ready to build the core toolkit for a procurement career and start working toward MCIPS Chartered status.",
  },
  5: {
    title: "CIPS Level 5",
    equivalent: "Second year of an undergraduate degree (Ofqual regulated)",
    whoFor:
      "Professionals building on Level 4 knowledge, developing higher-level capability in risk mitigation, the legal implications of contracts, and strategic team management.",
  },
  6: {
    title: "CIPS Level 6",
    equivalent: "Honours-level degree (Ofqual regulated)",
    whoFor:
      "Senior professionals building on Levels 4 and 5, developing the strategic leadership capability to inspire teams and shape organisational direction; the final level before MCIPS Chartered status.",
  },
};

// ─── Custom Hooks ─────────────────────────────────────────────
function useMagnetic(
  ref: React.RefObject<HTMLElement | null>,
  strength: number = 0.3,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

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

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength]);
}

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

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      delay: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          const formattedValue = Math.round(obj.val).toLocaleString();
          ref.current.textContent = formattedValue;
        }
      },
    });
  }, [value]);

  return (
    <div className="flex flex-col items-center text-center px-6">
      <div className="text-3xl md:text-4xl font-bold text-white tracking-tight font-mono">
        <span ref={ref}>0</span>
        <span className="text-[#D4AF37]">{suffix}</span>
      </div>
      <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mt-2">
        {label}
      </div>
    </div>
  );
}

function CourseCard({ data }: { data: CipsCourse }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = LEVEL_THEMES[data.level];
  const archiveData = ARCHIVE_CARD_DATA[data.level];
  const type = LEVEL_TYPE_MAP[data.level];

  if (!archiveData) return null;

  return (
    <div
      ref={cardRef}
      className="course-card group relative rounded-2xl bg-white overflow-hidden will-change-transform flex flex-col h-full"
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* Subtle Top Accent Bar */}
      <div className="h-1 w-full" style={{ backgroundColor: theme.accent }} />

      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={LEVEL_IMAGES[data.level]}
          alt={archiveData.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badge floating on image */}
        <div
          className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase border backdrop-blur-md"
          style={{
            color: "#FFFFFF",
            background: `rgba(${theme.accentRgb}, 0.85)`,
            borderColor: "rgba(255,255,255,0.2)",
          }}
        >
          Level {data.level}
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {/* Type */}
        <span
          className="text-xs font-semibold tracking-wider uppercase mb-2"
          style={{ color: theme.text }}
        >
          {type}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight">
          {archiveData.title}
        </h3>

        {/* 2 Important Informations */}
        <div className="space-y-4 mb-8 flex-grow">
          {/* Info 1: Equivalent */}
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 p-1.5 rounded-md bg-gray-50"
              style={{ color: theme.accent }}
            >
              <GraduationCap size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                Equivalent to
              </p>
              <p className="text-sm text-gray-700 font-medium leading-snug">
                {archiveData.equivalent}
              </p>
            </div>
          </div>

          {/* Info 2: Who is this for */}
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 p-1.5 rounded-md bg-gray-50"
              style={{ color: theme.accent }}
            >
              <Users size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                Who it&apos;s for
              </p>
              <p className="text-sm text-gray-500 leading-snug line-clamp-3">
                {archiveData.whoFor}
              </p>
            </div>
          </div>
        </div>

        {/* Details Button */}
        <Link
          href={`/courses/${data.slug}`}
          className="course-cta mt-auto w-full group/btn flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white transition-all duration-300"
          style={{
            backgroundColor: theme.accent,
          }}
        >
          View Full Details
          <ArrowRight
            size={16}
            className="transition-transform duration-300 translate-x-0 group-hover/btn:translate-x-1"
          />
        </Link>
      </div>

      {/* Hover Background Glow - GPU Accelerated */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          transform: "translateZ(0)",
          boxShadow: `0 25px 50px -12px ${theme.glow}`,
        }}
      />

      <style jsx>{`
        .course-card {
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.5s ease;
        }
        .course-cta {
          box-shadow: 0 4px 10px -3px rgba(0, 0, 0, 0.1);
        }
        .course-cta:hover {
          box-shadow: 0 8px 20px -5px ${theme.glow};
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
   const { openModal } = useModal();

  const [timelineActive, setTimelineActive] = useState<number | null>(null);

  useMagnetic(ctaRef, 0.4);

  const coursesToDisplay = (cipsCoursesData as CipsCourse[]).filter(
    (course) => course.level >= 2 && course.level <= 6,
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.3 });

      heroTl
        .from(".hero-badge", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".split-word span",
          {
            y: "110%",
            opacity: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .from(
          ".hero-desc",
          { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .from(
          ".hero-stats",
          { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .from(
          ".hero-cta",
          { opacity: 0, scale: 0.9, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3",
        );

      gsap.to(".hero-orb-1", {
        y: -100,
        x: 50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-orb-2", {
        y: -150,
        x: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Desktop line fill animation
      gsap.fromTo(
        ".timeline-line-fill-desktop",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.8,
          },
        },
      );

      // Mobile line fill animation
      gsap.fromTo(
        ".timeline-line-fill-mobile",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.8,
          },
        },
      );

      gsap.from(".timeline-node", {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".course-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });

      // Animation for the new CTA Box
      gsap.from(".cta-box-content", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-box-container",
          start: "top 80%",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="bg-[#FAFAFA] overflow-x-hidden"
      style={{ position: "relative", top: 0, left: 0 }}
    >
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
      >
        <div className="absolute inset-0">
          <div
            className="hero-orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 168, 168, 0.15) 0%, transparent 70%)",
              willChange: "transform",
            }}
          />
          <div
            className="hero-orb-2 absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
              willChange: "transform",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mt-12 z-10 max-w-5xl mx-auto px-6 text-center py-32">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span className="text-xs font-medium tracking-widest uppercase text-white/60">
              Globally Recognised
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter mb-8">
            <SplitText text="CIPS Qualifications" className="block mb-2" />
            <SplitText text="Your MCIPS Pathway" className="block" />
          </h1>

          <p className="hero-desc text-base md:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed font-light mb-14">
            From foundational principles to strategic leadership; navigate your
            journey to Chartered status with the world&apos;s largest
            procurement and supply body.
          </p>

          <div className="hero-stats flex flex-wrap justify-center gap-4 md:gap-8 mb-14 border-t border-b border-white/10 py-8">
            {HERO_STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>

          <button
            ref={ctaRef}
            className="hero-cta cursor-pointer relative inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-black rounded-full text-sm font-bold uppercase tracking-wider overflow-hidden transition-colors hover:bg-[#e0bd45] will-change-transform"
            style={{ boxShadow: "0 10px 30px -10px rgba(212, 175, 55, 0.4)" }}
            onClick={() =>
              document
                .getElementById("grid")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Programmes
              <ArrowRight size={16} />
            </span>
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white font-medium">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ═══════════════════ TIMELINE ═══════════════════ */}
      <section
        ref={timelineRef}
        className="relative py-24 md:py-32 bg-white overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
              The Journey
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Qualification Pathway
            </h2>
            <p className="text-sm text-gray-400 mt-4">
              Click any level to view full details.
            </p>
          </div>

          {/* Desktop Timeline - Perfectly Centered Math */}
          {/* Node is 56px (w-14 h-14). Center is 28px. Line is 2px (h-0.5). Top edge must be 27px. */}
          <div
            className="hidden md:flex items-start justify-between relative w-full max-w-4xl mx-auto"
            onMouseLeave={() => setTimelineActive(null)}
          >
            {/* Background Line */}
            <div className="absolute top-[27px] left-7 right-7 h-0.5 bg-slate-200 z-0" />

            {/* Animated Line Fill */}
            <div
              className="timeline-line-fill-desktop absolute top-[27px] left-7 right-7 h-0.5 z-0 origin-left"
              style={{
                background: TIMELINE_GRADIENT_DESKTOP,
                transform: "scaleX(0)",
              }}
            />

            {TIMELINE_STEPS.map((step, i) => {
              const theme = LEVEL_THEMES[step.level];
              const isActive = timelineActive === step.level;
              const isNeighbor =
                timelineActive !== null &&
                Math.abs(
                  TIMELINE_STEPS.findIndex((s) => s.level === timelineActive) -
                    i,
                ) === 1;

              const linkHref =
                step.level === 7
                  ? "/courses/mcips"
                  : `/courses/level-${step.level}-certificate`;

              return (
                <Link
                  key={step.level}
                  href={linkHref}
                  className="timeline-node flex flex-col items-center relative z-10 group/node cursor-pointer"
                  onMouseEnter={() => setTimelineActive(step.level)}
                  style={{
                    textDecoration: "none",
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-300 group-hover/node:scale-110 group-hover/node:shadow-xl"
                    style={{
                      borderColor:
                        isActive || isNeighbor ? theme.accent : "#E5E7EB",
                      boxShadow: isActive
                        ? `0 10px 25px -5px ${theme.glow}`
                        : "none",
                      transform: isActive ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    {step.level === 7 ? (
                      <Award
                        size={20}
                        style={{ color: isActive ? theme.text : "#9CA3AF" }}
                      />
                    ) : (
                      <span
                        className="text-base font-bold transition-colors duration-300"
                        style={{ color: isActive ? theme.text : "#9CA3AF" }}
                      >
                        {step.level}
                      </span>
                    )}
                  </div>

                  <div
                    className="mt-4 text-center px-2 py-1 rounded-md transition-colors duration-300"
                    style={{
                      backgroundColor: isActive ? theme.bg : "transparent",
                    }}
                  >
                    <span
                      className="block text-xs font-bold tracking-wider uppercase transition-colors duration-300"
                      style={{ color: isActive ? theme.text : "#64748B" }}
                    >
                      {step.level === 7 ? "MCIPS" : `Level ${step.level}`}
                    </span>
                    <span className="block text-[10px] font-medium text-slate-400 mt-0.5 uppercase tracking-wide">
                      {step.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Timeline - Redesigned with Premium Cards */}
          <div className="md:hidden relative max-w-sm mx-auto pl-12 space-y-6">
            {/* Background Line */}
            <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-slate-200" />
            {/* Dynamic Line Fill */}
            <div
              className="timeline-line-fill-mobile absolute left-[19px] top-5 bottom-5 w-0.5 origin-top"
              style={{
                background: TIMELINE_GRADIENT_MOBILE,
                transform: "scaleY(0)",
              }}
            />

            {TIMELINE_STEPS.map((step) => {
              const theme = LEVEL_THEMES[step.level];
              const linkHref =
                step.level === 7
                  ? "/courses/mcips"
                  : `/courses/level-${step.level}-certificate`;

              return (
                <Link
                  key={step.level}
                  href={linkHref}
                  className="timeline-node relative flex items-center group/node"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="absolute -left-12 w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-300 group-hover/node:scale-110 z-10"
                    style={{
                      borderColor: theme.accent,
                      boxShadow: `0 4px 10px ${theme.glow}`,
                    }}
                  >
                    {step.level === 7 ? (
                      <Award size={16} style={{ color: theme.text }} />
                    ) : (
                      <span
                        className="text-sm font-bold"
                        style={{ color: theme.text }}
                      >
                        {step.level}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 ml-2 p-4 rounded-xl bg-white border border-slate-100 group-hover/node:border-slate-200 group-hover/node:shadow-md transition-all duration-300">
                    <span
                      className="block text-base font-bold"
                      style={{ color: theme.text }}
                    >
                      {step.level === 7 ? "MCIPS" : `Level ${step.level}`}
                    </span>
                    <span className="block text-xs text-slate-400 mt-0.5">
                      {step.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ COURSE GRID ═══════════════════ */}
      <section
        id="grid"
        ref={gridRef}
        className="relative py-24 md:py-32 bg-[#FAFAFA]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
              Programmes
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Choose Your Level
            </h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
              Each qualification is built for a specific stage of your career,
              giving you the exact skills and knowledge you need to move to the
              next one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {coursesToDisplay.map((course) => (
              <CourseCard key={course.level} data={course} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA (BOXED) ═══════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden ">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* CTA Box Container */}
        <div className="cta-box-container relative z-10 max-w-5xl bg-[#050505] rounded-4xl mx-auto px-6">
          <div className="cta-box-content relative bg-white/[0.03] border border-white/10 rounded-3xl p-10 md:p-16 text-center backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden group">
            {/* Decorative borders for the box */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-2xl pointer-events-none transition-all duration-500 group-hover:border-[#D4AF37]"></div>
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-2xl pointer-events-none transition-all duration-500 group-hover:border-[#D4AF37]"></div>

            {/* Floating glow inside the box */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-[80px] bg-[#D4AF37] pointer-events-none float-accent"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10 blur-[80px] bg-[#0074D9] pointer-events-none float-accent"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-sm mb-8">
                <Award size={14} className="text-[#D4AF37]" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#D4AF37]">
                  Chartered Status
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Begin Your Journey to{" "}
                <span className="text-[#D4AF37]">MCIPS</span>
              </h2>
              <p className="text-base text-white/50 leading-relaxed mb-10 max-w-xl mx-auto">
                Join a global community of procurement professionals. Our
                advisors are ready to help you map out the right pathway to
                Chartered status for your experience and goals.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#e0bd45] transition-colors w-full sm:w-auto justify-center"
                  style={{
                    boxShadow: "0 10px 30px -10px rgba(212, 175, 55, 0.4)",
                  }}
                >
                  Speak to an Advisor
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
                <button
                  onClick={() => openModal("price")}
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white/70 rounded-full text-sm font-medium uppercase tracking-wider hover:border-white/40 hover:text-white transition-all w-full sm:w-auto justify-center"
                >
                  View Pricing
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
