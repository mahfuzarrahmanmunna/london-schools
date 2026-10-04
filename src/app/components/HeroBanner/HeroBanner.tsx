"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Play,
  Users,
  Award,
  Globe,
  ChevronDown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Stats Data ────────────────────────────────────
const stats = [
  { icon: Users, value: "50,000+", label: "Members Worldwide" },
  { icon: Globe, value: "150+", label: "Countries" },
  { icon: Award, value: "MCIPS", label: "Gold Standard" },
];

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const decorLeftRef = useRef<HTMLDivElement>(null);
  const decorRightRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ─── Decorative blurs ───────────────────────
      gsap.fromTo(
        [decorLeftRef.current, decorRightRef.current],
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
          stagger: 0.2,
        },
      );

      // ─── Badge ──────────────────────────────────
      gsap.fromTo(
        badgeRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 },
      );

      // ─── Heading (word-by-word reveal) ──────────
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".hero-word");
        gsap.fromTo(
          words,
          { y: 40, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.35,
          },
        );
      }

      // ─── Sub text ───────────────────────────────
      gsap.fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.8 },
      );

      // ─── CTA buttons ────────────────────────────
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll(".hero-cta");
        gsap.fromTo(
          buttons,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            delay: 1.0,
          },
        );
      }

      // ─── Image panel ────────────────────────────
      gsap.fromTo(
        imageRef.current,
        { x: 60, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.5,
        },
      );

      // ─── Stats bar ──────────────────────────────
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll(".hero-stat");
        gsap.fromTo(
          statItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: "power3.out",
            delay: 1.2,
          },
        );

        // Counter animation
        statItems.forEach((item) => {
          const counter = item.querySelector(".stat-value");
          if (!counter) return;
          const finalText = counter.textContent || "";
          const numericPart = parseInt(finalText.replace(/[^0-9]/g, ""), 10);
          const suffix = finalText.replace(/[0-9]/g, "");

          if (isNaN(numericPart)) return;

          const obj = { val: 0 };
          gsap.to(obj, {
            val: numericPart,
            duration: 2,
            ease: "power2.out",
            delay: 1.4,
            onUpdate: () => {
              counter.textContent =
                Math.round(obj.val).toLocaleString() + suffix;
            },
          });
        });
      }

      // ─── Scroll indicator ───────────────────────
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.6 },
      );

      // Continuous bounce for scroll dot
      gsap.to(".scroll-dot", {
        y: 6,
        duration: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // ─── Parallax on scroll ─────────────────────
      gsap.to(imageRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(decorLeftRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(decorRightRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─── Split heading into word spans ───────────────
  const headingWords = ["The", "Global", "Standard", "in", "Procurement"];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] pt-12 flex items-center overflow-hidden bg-white"
    >
      {/* ─── Background Pattern ────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #002E4D 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ─── Decorative Blurs ─────────────────────── */}
      <div
        ref={decorLeftRef}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-cips/8 blur-[100px] pointer-events-none"
      />
      <div
        ref={decorRightRef}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-navy/5 blur-[120px] pointer-events-none"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gold/3 blur-[150px] pointer-events-none" />

      {/* ─── Main Content ─────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pt-28 pb-20 lg:pt-0 lg:pb-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Text Content ── */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            {/* <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 rounded-full border border-cips/15 bg-cips/5 px-4 py-1.5 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cips opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cips" />
              </span>
              <span className="text-xs font-semibold text-cips tracking-wide">
                Admissions Open for 2025
              </span>
            </div> */}

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold text-navy leading-[1.08] tracking-tight mb-6"
              style={{ perspective: "600px" }}
            >
              {headingWords.map((word, i) => (
                <span
                  key={i}
                  className="hero-word inline-block mr-[0.3em]"
                  style={{ display: "inline-block", opacity: 0 }}
                >
                  {word === "Procurement" ? (
                    <span className="text-cips">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            {/* Sub text */}
            <p
              ref={subRef}
              className="text-lg text-slate-500 leading-relaxed max-w-xl mb-10"
              style={{ opacity: 0 }}
            >
              Join over 50,000 professionals worldwide who trust CIPS
              qualifications, membership and resources to drive procurement
              excellence and strategic value.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Link
                href="/qualifications"
                className="hero-cta inline-flex items-center gap-2.5 bg-navy text-white text-sm font-semibold px-7 py-3.5 rounded-lg hover:bg-navy-dark transition-colors duration-200 shadow-lg shadow-navy/20 group"
                style={{ opacity: 0 }}
              >
                Explore Qualifications
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/membership"
                className="hero-cta inline-flex items-center gap-2.5 border border-slate-200 text-navy text-sm font-medium px-7 py-3.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 group"
                style={{ opacity: 0 }}
              >
                <Play className="h-4 w-4 text-cips" />
                Watch Overview
              </Link>
            </div>

            {/* Trust Indicators */}
            <div
              ref={statsRef}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-slate-100"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="hero-stat flex items-center gap-3"
                    style={{ opacity: 0 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cips/8">
                      <Icon className="h-[18px] w-[18px] text-cips" />
                    </div>
                    <div>
                      <span className="stat-value block text-lg font-bold text-navy leading-tight">
                        {stat.value}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: Image Composition ── */}
          <div
            ref={imageRef}
            className="order-1 lg:order-2"
            style={{ opacity: 0 }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/30 border border-slate-100">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/hero/hero-main.jpg"
                    alt="Procurement professionals collaborating"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Card Top Right */}
              <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                    <Award className="h-4.5 w-4.5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy leading-tight">
                      MCIPS
                    </p>
                    <p className="text-[10px] text-slate-400">Achieved</p>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-cips to-teal-400" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">
                  85% Complete
                </p>
              </div>

              {/* Floating Card Bottom Left */}
              <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-2">
                    {[
                      "/hero/avatar-1.jpg",
                      "/hero/avatar-2.jpg",
                      "/hero/avatar-3.jpg",
                    ].map((src, i) => (
                      <div
                        key={i}
                        className="relative h-7 w-7 rounded-full border-2 border-white overflow-hidden"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="28px"
                        />
                      </div>
                    ))}
                    <div className="h-7 w-7 rounded-full border-2 border-white bg-cips flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">
                        +2k
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-navy">
                  Enrolled this month
                </p>
                <p className="text-[10px] text-slate-400">From 42 countries</p>
              </div>

              {/* Accent dot */}
              <div className="absolute -bottom-2 right-12 h-3 w-3 rounded-full bg-gold shadow-lg shadow-gold/30" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Scroll Indicator ─────────────────────── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="text-[10px] text-slate-400 tracking-[0.2em] uppercase font-medium">
          Scroll
        </span>
        <div className="h-8 w-5 rounded-full border border-slate-200 flex items-start justify-center p-1">
          <div className="scroll-dot h-1.5 w-1.5 rounded-full bg-slate-400" />
        </div>
      </div>

      {/* ─── Bottom Gradient Fade ─────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
