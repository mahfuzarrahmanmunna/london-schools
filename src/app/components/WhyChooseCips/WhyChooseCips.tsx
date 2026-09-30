"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  TrendingUp,
  Award,
  ShieldCheck,
  Leaf,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Globe,
    num: "01",
    title: "Internationally Recognised",
    desc: "CIPS is the world's largest procurement and supply professional body, and its qualifications are used as a benchmark by employers across sectors and geographies.",
  },
  {
    icon: TrendingUp,
    num: "02",
    title: "Built for Career Progression",
    desc: "Each level builds practical, job-relevant skills from operational buying through to strategic sourcing and supplier management, designed to support your next career step.",
  },
  {
    icon: Award,
    num: "03",
    title: "Your Route to MCIPS",
    desc: "Complete Levels 4, 5 and 6 (plus the required work experience) and you’re on the direct path to MCIPS Chartered status, full membership and professional recognition.",
  },
  {
    icon: ShieldCheck,
    num: "04",
    title: "Recognised Standard in Procurement",
    desc: "CIPS qualification is more than a certificate. It's evidence of applied knowledge in sourcing, contracting, negotiation and supply chain management, built on a syllabus developed with practitioners across industries.",
  },
  {
    icon: Leaf,
    num: "05",
    title: "Responsible & Ethical Procurement",
    desc: "Modern syllabuses embed ethical sourcing, sustainability and responsible supply chain practice skills increasingly expected of procurement professionals today.",
  },
];

export default function WhyChooseCips() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState("01");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Left Content Entrance ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.from(".why-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".why-line",
          { scaleX: 0, duration: 1, ease: "power3.inOut" },
          "-=0.4",
        )
        .from(
          ".why-title",
          { y: 40, opacity: 0, duration: 1.2, ease: "power4.out" },
          "-=0.6",
        )
        .from(
          ".why-desc",
          { y: 25, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.8",
        )
        .from(
          ".why-cta",
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .from(
          ".why-progress-wrap",
          { y: 15, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        );

      // ── Progress Bar Scrub ──
      if (cardsRef.current && progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        });
      }

      // ── Vertical Divider Line Draw ──
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 60%",
              end: "bottom 70%",
              scrub: 0.5,
            },
          },
        );
      }

      // ── Card Content Reveals ──
      const cards = gsap.utils.toArray<HTMLElement>(".sticky-card");

      cards.forEach((card, index) => {
        const numEl = card.querySelector(".card-num");
        const contentEl = card.querySelector(".card-content-inner");
        const accentEl = card.querySelector(".card-accent");

        // Smooth fade-in-up for content
        if (contentEl) {
          gsap.from(contentEl, {
            opacity: 0,
            y: 60,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Accent bar grow
        if (accentEl) {
          gsap.from(accentEl, {
            scaleY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Parallax effect on the large background number
        if (numEl) {
          gsap.to(numEl, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // ── Active Step Counter Logic ──
        ScrollTrigger.create({
          trigger: card,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => updateActiveStep(benefits[index].num),
          onEnterBack: () => updateActiveStep(benefits[index].num),
        });
      });

      function updateActiveStep(step: string) {
        if (counterRef.current) {
          setActiveStep(step);
          // Animate the number change
          gsap.fromTo(
            counterRef.current,
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050505]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* ══════════════════════════════════════════════
             LEFT Sticky heading (5 cols)
        ══════════════════════════════════════════════ */}
        <div className="lg:col-span-5 lg:sticky lg:top-0 min-h-screen lg:h-screen flex items-center py-16 lg:py-0">
          {/* Grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_15%,#050505_70%)] pointer-events-none" />
          {/* Right edge glow */}
          <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#0B73B9]/20 to-transparent" />

          <div className="relative z-10 px-8 md:px-12 lg:px-14">
            {/* Eyebrow */}
            <p className="why-eyebrow text-sm tracking-[0.25em] font-semibold text-white/50 uppercase">
              Why Choose CIPS
            </p>

            {/* Accent line */}
            <div className="why-line mt-6 mb-10 w-16 h-[2px] bg-gradient-to-r from-[#0B73B9] via-[#f4d210] to-transparent origin-left rounded-full" />

            {/* Title */}
            <h2
              className="why-title text-[clamp(1.8rem,3.5vw,2.5rem)] font-medium text-white tracking-[-0.02em] leading-[1.2]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Why You Should Study{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#094afe]">CIPS</span>
              </span>
            </h2>

            {/* Description */}
            <p className="why-desc mt-7 text-base font-normal leading-relaxed tracking-normal text-white/60 max-w-[420px]">
              CIPS, the Chartered Institute of Procurement &amp; Supply, is the
              recognised professional standard for procurement and supply chain
              practice, held by professionals across the public and private
              sectors internationally. Earning a CIPS qualification demonstrates
              applied, industry-relevant capability in sourcing, negotiation,
              contract management and supply chain strategy.
            </p>

            {/* CTA */}
            <Link
              href="/courses"
              className="why-cta group relative inline-flex items-center gap-3 mt-10 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/[0.03] rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="relative z-10 flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/10 group-hover:border-[#0B73B9]/40 transition-colors duration-500">
                <span className="text-sm font-semibold tracking-[0.15em] uppercase text-white/70 group-hover:text-[#0B73B9] transition-colors duration-500">
                  Learn CIPS Programmes
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#f4d210] transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            {/* Progress */}
            <div className="why-progress-wrap mt-16">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm tracking-[0.2em] uppercase font-medium text-white/30">
                  Scroll to explore
                </span>
                <div className="flex items-center gap-2">
                  <span
                    ref={counterRef}
                    className="text-sm font-mono font-medium text-[#0B73B9] tabular-nums"
                  >
                    {activeStep}
                  </span>
                  <span className="text-sm tracking-[0.1em] uppercase font-medium text-white/30">
                    / 05
                  </span>
                </div>
              </div>
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden max-w-[420px]">
                <div
                  ref={progressRef}
                  className="h-full w-full bg-gradient-to-r from-[#0B73B9] via-[#0B73B9]/60 to-[#f4d210]/40 origin-left rounded-full"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
             RIGHT Scrollable Cards (7 cols)
        ══════════════════════════════════════════════ */}
        <div ref={cardsRef} className="lg:col-span-7 relative">
          {/* Vertical divider */}
          <div
            ref={dividerRef}
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          {benefits.map((item, i) => {
            const Icon = item.icon;
            const isPrimary = i % 2 === 0; // Alternate colors
            return (
              <div
                key={i}
                className="sticky-card relative min-h-[80vh] flex items-center overflow-hidden py-20 lg:py-24"
                style={{
                  background: i % 2 === 0 ? "#070707" : "#0a0a0a",
                }}
              >
                {/* Grid texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />

                {/* Colored ambient glow */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "20%",
                    right: "10%",
                    width: "50%",
                    height: "60%",
                    background: isPrimary
                      ? "radial-gradient(ellipse, rgba(11,115,185,0.04) 0%, transparent 70%)"
                      : "radial-gradient(ellipse, rgba(244,210,16,0.03) 0%, transparent 70%)",
                  }}
                />

                {/* Large background number (Parallax) */}
                <span
                  className="card-num absolute top-10 right-8 md:top-12 md:right-14 text-[clamp(8rem,20vw,16rem)] font-extralight leading-none select-none pointer-events-none block"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 80%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item.num}
                </span>

                {/* Left accent bar */}
                <div
                  className="card-accent absolute left-0 top-[15%] bottom-[15%] w-[3px] rounded-full origin-center"
                  style={{
                    transform: "scaleY(0)",
                    background: isPrimary
                      ? "linear-gradient(to bottom, transparent, #0B73B9, transparent)"
                      : "linear-gradient(to bottom, transparent, #f4d210, transparent)",
                  }}
                />

                <div className="card-content-inner relative z-10 w-full px-8 md:px-14 lg:px-16">
                  <div className="max-w-xl">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-700"
                      style={{
                        background: isPrimary
                          ? "linear-gradient(135deg, rgba(11,115,185,0.1) 0%, rgba(11,115,185,0.02) 100%)"
                          : "linear-gradient(135deg, rgba(244,210,16,0.1) 0%, rgba(244,210,16,0.02) 100%)",
                        border: `1px solid ${isPrimary ? "rgba(11,115,185,0.15)" : "rgba(244,210,16,0.15)"}`,
                      }}
                    >
                      <Icon
                        className="w-6 h-6 transition-colors duration-500"
                        style={{ color: isPrimary ? "#0B73B9" : "#f4d210" }}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Number label */}
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="text-sm font-mono tracking-[0.15em] font-medium"
                        style={{
                          color: isPrimary
                            ? "rgba(11,115,185,0.6)"
                            : "rgba(244,210,16,0.6)",
                        }}
                      >
                        {item.num}
                      </span>
                      <div
                        className="w-8 h-px"
                        style={{
                          background: isPrimary
                            ? "linear-gradient(to right, rgba(11,115,185,0.4), transparent)"
                            : "linear-gradient(to right, rgba(244,210,16,0.4), transparent)",
                        }}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-[clamp(1.8rem,3.2vw,2.4rem)] font-medium text-white tracking-[-0.025em] leading-[1.2] mb-6"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base font-normal leading-relaxed tracking-normal text-white/60 max-w-[500px]">
                      {item.desc}
                    </p>

                    {/* Footer */}
                    <div className="mt-12 flex items-center gap-4">
                      <div
                        className="w-12 h-px"
                        style={{
                          background: isPrimary
                            ? "linear-gradient(to right, #0B73B9, transparent)"
                            : "linear-gradient(to right, #f4d210, transparent)",
                        }}
                      />
                      <span className="text-sm tracking-[0.2em] uppercase font-medium text-white/40">
                        Benefit {item.num} of 05
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
