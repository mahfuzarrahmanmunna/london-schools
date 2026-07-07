// src/app/apprenticeships/[level]/page.tsx

"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Clock,
  BookOpen,
  Download,
  CheckCircle2,
  Trophy,
  Users,
  Briefcase,
  FileText,
  Shield,
  PoundSterling,
  GraduationCap,
  ArrowUp,
  Star,
  Monitor,
  TrendingUp,
} from "lucide-react";
import { apprenticeshipLevels } from "@/app/data/apprenticeshipData";
import { studyModeIcons, statIcons } from "@/app/data/iconMaps";
import CipsCoursesBanner from "@/app/components/ApprenticeshipsBanner/ApprenticeshipsBanner";
import StudentReviews from "@/app/components/StudentReviews/StudentReviews";

gsap.registerPlugin(ScrollTrigger);

// ─── Color Tokens ────────────────────────────────
const C = {
  navy: "#002E4D",
  navyLight: "#0A4D73",
  navyDark: "#001B30",
  navy50: "#E8EDF3",
  cips: "#0975b7",
  cipsLight: "#00BCD4",
  cipsDark: "#007887",
  gold: "#D4A843",
  goldLight: "#E8C468",
  goldDark: "#B08A30",
};

// ─── Helper: Refresh ScrollTrigger safely ─────────
function refreshScrollTrigger() {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

// ─── Accordion Item ──────────────────────────────
function AccordionItem({
  title,
  children,
  icon,
  isOpen,
  onToggle,
  index,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Handle accordion animation with proper ScrollTrigger refresh
  useEffect(() => {
    if (!contentRef.current) return;

    // Skip animation on first render if already open (default state)
    if (isFirstRender.current && isOpen) {
      gsap.set(contentRef.current, {
        height: "auto",
        opacity: 1,
        display: "block",
      });
      isFirstRender.current = false;
      return;
    }

    isFirstRender.current = false;

    if (isOpen) {
      gsap.set(contentRef.current, { display: "block" });
      const fullHeight = contentRef.current.scrollHeight;

      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        {
          height: fullHeight,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            if (contentRef.current) {
              gsap.set(contentRef.current, { height: "auto" });
              // Refresh ScrollTrigger AFTER height is set to auto
              refreshScrollTrigger();
            }
          },
        },
      );
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          if (contentRef.current) {
            gsap.set(contentRef.current, { display: "none" });
            // Refresh ScrollTrigger AFTER content is hidden
            refreshScrollTrigger();
          }
        },
      });
    }
  }, [isOpen]);

  // Entrance animation - only once
  useEffect(() => {
    if (!itemRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
            once: true, // Only animate once
          },
        },
      );
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="border border-slate-200 rounded-lg overflow-hidden bg-white"
      style={{ opacity: 0 }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-[#E8EDF3]/40 transition-colors duration-200"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ backgroundColor: C.cips + "0D", color: C.cips }}
          >
            {icon}
          </div>
          <span className="text-[14px] font-semibold text-[#002E4D]">
            {title}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0, display: "none" }}
      >
        <div className="px-5 pb-5 pt-0">{children}</div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────
export default function ApprenticeshipDetailPage() {
  const params = useParams();
  const levelNum = parseInt(params.level as string);
  const course = apprenticeshipLevels.find((c) => c.level === levelNum);

  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const studyRef = useRef<HTMLDivElement>(null);
  const levelsRef = useRef<HTMLDivElement>(null);
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["covered"]),
  );
  const [showTop, setShowTop] = useState(false);
  const scrollTriggerRef = useRef<gsap.core.Tween[]>([]);

  // Toggle section with ScrollTrigger refresh
  const toggleSection = useCallback((key: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // Main animations
  useEffect(() => {
    if (!course) return;

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Header animations
        if (headerRef.current) {
          const els = headerRef.current.querySelectorAll(".h-anim");
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: "power2.out",
          });
        }

        // Image animation
        if (imageRef.current) {
          const tween = gsap.to(imageRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 88%",
              once: true,
            },
          });
          scrollTriggerRef.current.push(tween);
        }

        // Overview animations
        if (overviewRef.current) {
          const tween = gsap.to(
            overviewRef.current.querySelectorAll(".ov-anim"),
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: overviewRef.current,
                start: "top 85%",
                once: true,
              },
            },
          );
          scrollTriggerRef.current.push(tween);
        }

        // Download section animation
        if (downloadRef.current) {
          const tween = gsap.to(downloadRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: downloadRef.current,
              start: "top 90%",
              once: true,
            },
          });
          scrollTriggerRef.current.push(tween);
        }

        // Study cards animation
        if (studyRef.current) {
          const tween = gsap.to(
            studyRef.current.querySelectorAll(".study-card"),
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: studyRef.current,
                start: "top 85%",
                once: true,
              },
            },
          );
          scrollTriggerRef.current.push(tween);
        }

        // Level cards animation
        if (levelsRef.current) {
          const tween = gsap.to(
            levelsRef.current.querySelectorAll(".lvl-card"),
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.07,
              ease: "power2.out",
              scrollTrigger: {
                trigger: levelsRef.current,
                start: "top 88%",
                once: true,
              },
            },
          );
          scrollTriggerRef.current.push(tween);
        }

        // Scroll to top button visibility
        ScrollTrigger.create({
          trigger: pageRef.current,
          start: "top -400",
          onEnter: () => setShowTop(true),
          onLeaveBack: () => setShowTop(false),
        });

        // Initial refresh after all animations are set up
        refreshScrollTrigger();
      }, pageRef);

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      scrollTriggerRef.current = [];
    };
  }, [course]);

  // Additional refresh when images load (they affect layout height)
  useEffect(() => {
    const handleImageLoad = () => {
      refreshScrollTrigger();
    };

    window.addEventListener("load", handleImageLoad);

    // Also refresh on resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        refreshScrollTrigger();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleImageLoad);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-[#002E4D] mb-2">
            Apprenticeship Not Found
          </h1>
          <p className="text-slate-500 mb-5 text-sm">
            The level you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/apprenticeships"
            className="text-sm font-semibold text-[#0975b7] hover:underline flex items-center gap-1.5 mx-auto w-fit"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Back to
            Apprenticeships
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={pageRef} className="bg-white">
      {/* ─── Top Bar / Breadcrumb ─── */}
      <div className="border-b border-slate-100 bg-[#E8EDF3]/40">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <nav className="flex items-center gap-1.5 text-[12px] text-slate-400">
            <Link href="/" className="hover:text-[#002E4D] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/apprenticeships"
              className="hover:text-[#002E4D] transition-colors"
            >
              Apprenticeships
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#002E4D] font-medium">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* ─── Header: Title + Pass Rate ─── */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-8 border-b border-slate-100">
        <div ref={headerRef}>
          <div
            className="h-anim flex flex-wrap items-center gap-2.5 mb-5"
            style={{ opacity: 0 }}
          >
            <span
              className="inline-flex items-center rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: C.cips }}
            >
              {course.badge}
            </span>
            {course.featured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#B08A30] bg-[#D4A843]/10 border border-[#D4A843]/30 rounded-md px-3 py-1">
                <Trophy className="h-3 w-3" /> Most Popular
              </span>
            )}
          </div>

          <h1
            className="h-anim text-[28px] sm:text-3xl lg:text-[34px] font-bold text-[#002E4D] leading-tight tracking-tight mb-4"
            style={{ opacity: 0 }}
          >
            {course.subtitle}
          </h1>

          <div
            className="h-anim flex flex-wrap items-center gap-4"
            style={{ opacity: 0 }}
          >
            <div
              className="flex items-center gap-2 rounded-md px-3.5 py-2"
              style={{ backgroundColor: C.cips + "0D" }}
            >
              <TrendingUp className="h-4 w-4" style={{ color: C.cips }} />
              <span className="text-[14px] font-bold" style={{ color: C.cips }}>
                {course.passRate} Pass Rate
              </span>
            </div>
            {course.stats.slice(0, 2).map((stat) => {
              const Icon = statIcons[stat.icon] || Star;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 text-[13px] text-slate-500"
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span>
                    <strong className="text-[#002E4D]">{stat.value}</strong>{" "}
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Two Column: Image + Overview ─── */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="aspect-[4/3] relative bg-[#E8EDF3]">
                <Image
                  src={course.image}
                  alt={course.subtitle}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onLoad={() => refreshScrollTrigger()}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    refreshScrollTrigger();
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${C.cips}30, ${C.cips}10)`,
                  }}
                >
                  <span className="text-[100px] font-black text-white/20 select-none">
                    L{course.level}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-2 shadow-md"
                    style={{ backgroundColor: C.cips }}
                  >
                    <span className="text-white text-xl font-black leading-none">
                      {course.level}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/70">
                      Level
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#002E4D]">
                {course.price}
              </span>
            </div>
            <p className="text-[12px] text-slate-400 mt-0.5">
              {course.priceNote}
            </p>
          </div>

          <div ref={overviewRef} className="flex flex-col justify-center">
            <div className="ov-anim" style={{ opacity: 0 }}>
              <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#0975b7] mb-3">
                Course Overview
              </p>
            </div>
            <div className="ov-anim" style={{ opacity: 0 }}>
              <p className="text-[15px] text-slate-600 leading-[1.8] mb-6">
                {course.overview}
              </p>
            </div>
            <div className="ov-anim space-y-3 mb-6" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: C.cips + "0D", color: C.cips }}
                >
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#002E4D]">
                    {course.duration}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Typical completion time
                  </p>
                </div>
              </div>
              {course.stats.slice(2).map((stat) => {
                const Icon = statIcons[stat.icon] || Star;
                return (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: C.cips + "0D", color: C.cips }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#002E4D]">
                        {stat.value}
                      </p>
                      <p className="text-[11px] text-slate-400">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="ov-anim" style={{ opacity: 0 }}>
              <p className="text-[14px] text-slate-500 leading-[1.8]">
                {course.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Download Syllabus ─── */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div
          ref={downloadRef}
          className="rounded-xl border border-slate-200 bg-[#E8EDF3]/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: C.cips + "0D", color: C.cips }}
            >
              <Download className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#002E4D]">
                Download the Syllabus Guide
              </p>
              <p className="text-[12px] text-slate-400">
                Get the full course breakdown in PDF format
              </p>
            </div>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-90 flex-shrink-0"
            style={{ backgroundColor: C.cips }}
            type="button"
          >
            <Download className="h-4 w-4" />
            Download Guide
          </button>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-slate-100" />
      </div>

      {/* ─── Accordion Sections ─── */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="max-w-full space-y-2.5">
          <AccordionItem
            title="What's Covered"
            icon={<BookOpen className="h-4 w-4" />}
            isOpen={openSections.has("covered")}
            onToggle={() => toggleSection("covered")}
            index={0}
          >
            <div className="space-y-2.5 mt-1">
              {course.modules.map((mod, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg border border-slate-100 bg-[#E8EDF3]/30 p-3.5"
                >
                  <div
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-[11px] font-bold text-white"
                    style={{ backgroundColor: C.cips }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-semibold text-[#002E4D] leading-snug">
                      {mod.title}
                    </h4>
                    <p className="text-[12px] text-slate-400 leading-relaxed mt-0.5">
                      {mod.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[11px] font-semibold text-[#002E4D]">
                      {mod.hours}h
                    </p>
                    <p className="text-[10px] text-slate-300">
                      {mod.units} units
                    </p>
                  </div>
                </div>
              ))}
              <div
                className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 mt-1"
                style={{ backgroundColor: C.cips + "08" }}
              >
                <Clock className="h-3.5 w-3.5" style={{ color: C.cips }} />
                <span className="text-[12px] font-medium text-slate-500">
                  Over{" "}
                  {course.modules.reduce(
                    (sum, m) => sum + parseInt(m.hours),
                    0,
                  )}{" "}
                  hours of interactive learning
                </span>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Entry Requirements"
            icon={<Shield className="h-4 w-4" />}
            isOpen={openSections.has("entry")}
            onToggle={() => toggleSection("entry")}
            index={1}
          >
            <ul className="space-y-2 mt-1">
              {course.entryRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="h-4 w-4 mt-0.5 flex-shrink-0"
                    style={{ color: C.cips }}
                  />
                  <span className="text-[13px] text-slate-600 leading-relaxed">
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionItem>

          <AccordionItem
            title="Assessment"
            icon={<FileText className="h-4 w-4" />}
            isOpen={openSections.has("assessment")}
            onToggle={() => toggleSection("assessment")}
            index={2}
          >
            <p className="text-[13px] text-slate-600 leading-[1.8] mt-1">
              {course.assessment}
            </p>
          </AccordionItem>

          <AccordionItem
            title="Funding & Costs"
            icon={<PoundSterling className="h-4 w-4" />}
            isOpen={openSections.has("funding")}
            onToggle={() => toggleSection("funding")}
            index={3}
          >
            <p className="text-[13px] text-slate-600 leading-[1.8] mt-1">
              {course.funding}
            </p>
          </AccordionItem>

          <AccordionItem
            title="Career Outcomes"
            icon={<Briefcase className="h-4 w-4" />}
            isOpen={openSections.has("careers")}
            onToggle={() => toggleSection("careers")}
            index={4}
          >
            <div className="space-y-2.5 mt-1">
              {course.careerOutcomes.map((career, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-100 p-3.5"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-[13px] font-semibold text-[#002E4D]">
                      {career.title}
                    </h4>
                    <span
                      className="text-[11px] font-bold rounded-md px-2 py-0.5 flex-shrink-0 ml-2"
                      style={{
                        backgroundColor: C.cips + "0D",
                        color: C.cips,
                      }}
                    >
                      {career.salaryRange}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    {career.description}
                  </p>
                </div>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem
            title="Frequently Asked Questions"
            icon={<Users className="h-4 w-4" />}
            isOpen={openSections.has("faq")}
            onToggle={() => toggleSection("faq")}
            index={5}
          >
            <div className="space-y-4 mt-1">
              {course.faqs.map((faq, i) => (
                <div key={i}>
                  <h4 className="text-[13px] font-semibold text-[#002E4D] mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-[1.8] pl-3 border-l-2 border-[#0975b7]/20">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem
            title="For Employers"
            icon={<GraduationCap className="h-4 w-4" />}
            isOpen={openSections.has("employer")}
            onToggle={() => toggleSection("employer")}
            index={6}
          >
            <p className="text-[13px] text-slate-600 leading-[1.8] mt-1">
              {course.employerInfo}
            </p>
          </AccordionItem>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-slate-100" />
      </div>

      {/* ─── Learning Options ─── */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#0975b7] mb-2">
          Learning Options
        </p>
        <h2 className="text-xl font-bold text-[#002E4D] tracking-tight mb-7">
          How You&apos;ll Study
        </h2>
        <div ref={studyRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {course.studyModes.map((mode) => {
            const Icon = studyModeIcons[mode.icon] || Monitor;
            return (
              <div
                key={mode.mode}
                className="study-card rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-slate-300 transition-all duration-300"
                style={{ opacity: 0 }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg mb-4"
                  style={{ backgroundColor: C.cips + "0D", color: C.cips }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[14px] font-semibold text-[#002E4D] mb-1.5">
                  {mode.mode}
                </h3>
                <p className="text-[12px] text-slate-400 leading-relaxed">
                  {mode.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-slate-100" />
      </div>

      {/* ─── Student Reviews ─── */}
      <StudentReviews />

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-slate-100" />
      </div>

      {/* ─── Other Levels ─── */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#0975b7] mb-2">
              CIPS Apprenticeships
            </p>
            <h2 className="text-xl font-bold text-[#002E4D] tracking-tight">
              Other Levels
            </h2>
          </div>
          <Link
            href="/apprenticeships"
            className="text-[13px] font-semibold text-[#0975b7] hover:underline flex items-center gap-1 group"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div
          ref={levelsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {apprenticeshipLevels
            .filter((c) => c.level !== course.level)
            .map((other) => (
              <Link
                key={other.level}
                href={other.href}
                className="lvl-card group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md hover:border-slate-300 transition-all duration-300"
                style={{ opacity: 0 }}
              >
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-white font-bold text-lg"
                  style={{ backgroundColor: C.cips }}
                >
                  {other.level}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[11px] font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: C.cips }}
                  >
                    Level {other.level}
                  </p>
                  <p className="text-[13px] font-semibold text-[#002E4D] leading-snug group-hover:text-[#0975b7] transition-colors truncate">
                    {other.subtitle}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#0975b7] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            ))}
        </div>
      </section>

      {/* ─── CIPS COURSES BANNER ─── */}
      <CipsCoursesBanner />

      {/* ─── Scroll to Top ─── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-lg hover:opacity-90 transition-all duration-300 ${
          showTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        style={{ backgroundColor: C.navyDark }}
        aria-label="Scroll to top"
        type="button"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </main>
  );
}
