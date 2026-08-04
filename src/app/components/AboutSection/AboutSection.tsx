"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  Award,
  Check,
} from "lucide-react";
import { useNavbarTheme } from "@/app/context/NavbarThemeContext"; // <-- Import Hook

gsap.registerPlugin(ScrollTrigger);

const aboutPoints = [
  "UK-Based Education Excellence",
  "CIPS Accredited Tutors",
  "Flexible Online Learning",
  "Comprehensive CIPS Study Resources",
  "Personalised Academic Guidance",
  "Dedicated Student Success Team",
];

const accreditationPoints = [
  {
    icon: Award,
    title: "Recognised Standard",
    desc: "CIPS qualifications are used as a benchmark by employers across procurement and supply chain roles.",
  },
  {
    icon: BookOpen,
    title: "Syllabus-Aligned Training",
    desc: "Our courses are built directly around the current CIPS syllabus and assessment criteria.",
  },
  {
    icon: TrendingUp,
    title: "Career-Relevant Skills",
    desc: "Each level builds practical capability, from operational buying to strategic sourcing.",
  },
  {
    icon: ShieldCheck,
    title: "Pathway to Membership",
    desc: "Structured progression toward MCIPS Chartered status, with guidance at every level.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const { setIsAboutDark } = useNavbarTheme(); // <-- Use Context

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ease = "power3.out";
    const dur = reducedMotion ? 0 : 0.9;
    const durFast = reducedMotion ? 0 : 0.7;
    const bgDuration = reducedMotion ? 0 : 0.8;

    const ctx = gsap.context(() => {
      /* =========================================================
         CONTENT REVEAL ANIMATIONS
      ========================================================= */
      gsap.from(".a-eyebrow", {
        opacity: 0,
        y: 20,
        duration: durFast,
        ease,
        scrollTrigger: {
          trigger: ".a-eyebrow",
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".a-heading", {
        opacity: 0,
        y: 30,
        duration: dur,
        ease,
        scrollTrigger: {
          trigger: ".a-heading",
          start: "top 88%",
          once: true,
        },
      });

      const paras = gsap.utils.toArray<HTMLElement>(".a-para");
      if (paras.length) {
        gsap.from(paras, {
          opacity: 0,
          y: 25,
          duration: dur,
          stagger: reducedMotion ? 0 : 0.1,
          ease,
          scrollTrigger: {
            trigger: paras[0],
            start: "top 88%",
            once: true,
          },
        });
      }

      gsap.from(".a-cta", {
        opacity: 0,
        y: 20,
        duration: durFast,
        ease,
        scrollTrigger: {
          trigger: ".a-cta",
          start: "top 92%",
          once: true,
        },
      });

      gsap.from(".a-divider", {
        opacity: 0,
        duration: durFast,
        ease,
        scrollTrigger: {
          trigger: ".a-divider",
          start: "top 90%",
          once: true,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".a-card");
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: dur,
          stagger: reducedMotion ? 0 : 0.08,
          ease,
          scrollTrigger: {
            trigger: cards[0],
            start: "top 90%",
            once: true,
          },
        });
      }

      gsap.from(".a-strip", {
        opacity: 0,
        duration: durFast,
        ease,
        scrollTrigger: {
          trigger: ".a-strip",
          start: "top 95%",
          once: true,
        },
      });
      const badges = gsap.utils.toArray<HTMLElement>(".a-badge");

      if (badges.length) {
        gsap.from(badges, {
          opacity: 0,
          y: 15,
          scale: 0.95,
          duration: durFast,
          stagger: reducedMotion ? 0 : 0.05,
          ease,
          scrollTrigger: {
            trigger: ".a-badges-wrapper",
            start: "top 92%",
            once: true,
          },
        });
      }

      /* =========================================================
         GLOBAL DARK MODE TRANSITION & NAVBAR SYNC
      ========================================================= */
      const bgLayer = bgLayerRef.current;
      const section = sectionRef.current;

      if (bgLayer && section) {
        gsap.set(bgLayer, { opacity: 0 });

        const darken = () => {
          gsap.killTweensOf(bgLayer);
          gsap.to(bgLayer, {
            opacity: 1,
            duration: bgDuration,
            ease: "power3.inOut",
            overwrite: true,
          });
          setIsAboutDark(true); // <-- Trigger Navbar Dark Mode
        };

        const lighten = () => {
          gsap.killTweensOf(bgLayer);
          gsap.to(bgLayer, {
            opacity: 0,
            duration: bgDuration,
            ease: "power3.inOut",
            overwrite: true,
          });
          setIsAboutDark(false); // <-- Revert Navbar
        };

        ScrollTrigger.create({
          trigger: section,
          start: "top 72%",
          end: "bottom 28%",
          onEnter: darken,
          onLeave: lighten,
          onEnterBack: darken,
          onLeaveBack: lighten,
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      if (bgLayerRef.current) {
        gsap.killTweensOf(bgLayerRef.current);
        gsap.set(bgLayerRef.current, { opacity: 0 });
      }
      setIsAboutDark(false); // Cleanup on unmount
    };
  }, [setIsAboutDark]);

  return (
    <>
      {/* Fixed dark overlay layer */}
      <div
        ref={bgLayerRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none bg-black opacity-0 z-10"
      />

      {/* =========================================================
          ABOUT SECTION
      ========================================================= */}
      <section
        ref={sectionRef}
        className="relative z-[10] w-full overflow-hidden text-white"
      >
        {/* Subtle radial blue glow */}
        <div
          className="pointer-events-none absolute -top-48 right-[8%] w-[600px] h-[600px] rounded-full bg-[#0B73B9] opacity-[0.04] blur-[120px]"
          aria-hidden="true"
        />

        {/* =======================================================
            MAIN CONTENT
        ======================================================= */}
        <div className="relative z-[20] mx-auto max-w-7xl px-5 sm:px-6 md:px-10 lg:px-12 pt-20 md:pt-32 pb-14 md:pb-20">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-5 lg:gap-8 mb-14 md:mb-20">
            <div className="lg:col-span-7">
              <div className="a-eyebrow flex items-center gap-3 mb-6">
                <span className="inline-block text-xs tracking-[0.2em] font-semibold text-white uppercase bg-white/[0.06] backdrop-blur-md border border-white/[0.15] px-4 py-2 rounded-full">
                  About LSHS
                </span>
              </div>

              <h2
                className="a-heading text-[2rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.5rem] font-medium text-white tracking-tight leading-[1.15] max-w-[850px]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Building Professional Excellence in Procurement &amp; Supply
                Chain
              </h2>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left column — text + CTA */}
            <div className="lg:col-span-7">
              <div className="space-y-5 mb-10">
                <p className="a-para text-[15px] leading-[1.8] text-white/70">
                  The London School of Higher Studies (LSHS) is a UK-based
                  training provider with a dedicated centre in Dhaka,
                  Bangladesh, delivering Chartered Institute of Procurement
                  &amp; Supply (CIPS) qualifications exclusively. As an Approved
                  Study Centre and Exam Centre, we support learners at every
                  stage of the procurement career journey, from a first step
                  into the profession through to MCIPS Chartered status.
                </p>

                <p className="a-para text-[15px] leading-[1.8] text-white/70">
                  Our courses are structured and industry-aligned, delivered by
                  qualified tutors, with a strong emphasis on practical,
                  real-world application. Whether you study by distance
                  learning, part-time, full-time or intensive mode, LSHS gives
                  you the flexibility to fit CIPS study around your career and
                  commitments.
                </p>

                <p className="a-para text-[15px] leading-[1.8] text-white/70">
                  LSHS operates as part of the Sampan Group, and is supported by
                  the study centre from CIPS directly, with operations in Dhaka.
                </p>
              </div>
            </div>

            {/* Right column — divider + feature badges */}
            <div className="lg:col-span-5 relative z-[30]">
              {/* Divider label */}
              <div className="a-divider flex items-center gap-3 mb-6">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#F4D210] flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[11px] tracking-[0.2em] font-semibold text-white/50 uppercase">
                  Why LSHS
                </span>
                <div
                  className="flex-1 h-px bg-white/[0.15]"
                  aria-hidden="true"
                />
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap items-center gap-3 w-full h-auto min-h-fit overflow-visible py-1">
                {aboutPoints.map((point, i) => (
                  <div
                    key={i}
                    className="a-card group inline-flex items-center gap-2.5 py-2 px-3.5 sm:py-2.5 sm:px-4 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-md transition-all duration-300 hover:border-[#0B73B9]/60 hover:bg-[#0B73B9]/20 hover:-translate-y-0.5 cursor-default shadow-sm shrink-0 max-w-full"
                  >
                    <Check
                      className="w-3.5 h-3.5 text-[#F4D210] transition-colors duration-300 group-hover:text-white shrink-0"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    <span className="text-[11.5px] sm:text-[12.5px] font-medium text-white/75 tracking-wide transition-colors duration-300 group-hover:text-white">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="a-cta flex flex-col sm:flex-row items-start gap-4 mt-10">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 text-[13px] font-semibold tracking-wider uppercase text-white bg-[#0B73B9] rounded-md transition-all duration-300 hover:bg-[#0d85d6] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(11,115,185,0.3)] min-h-[44px]"
                >
                  Get Started Today
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="https://sampangroup.com.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 py-3.5 min-h-[44px]"
                >
                  <span className="text-[13px] font-medium tracking-wide text-white/60 border-b border-white/15 pb-0.5 transition-colors duration-300 group-hover:text-[#F4D210] group-hover:border-[#F4D210]/40">
                    Visit Sampan Group
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 transition-all duration-300 group-hover:text-[#F4D210] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            INSTITUTIONAL STRIP
        ======================================================= */}
        <div
          className="relative z-[20] border-t border-white/[0.10]"
          aria-label="Institutional identifiers"
        >
          <div className="a-strip mx-auto max-w-7xl px-5 sm:px-6 md:px-10 lg:px-12 py-5 md:py-6" />
        </div>
      </section>
    </>
  );
}
