"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Users, User } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Accreditation Logos ────────────────────────────
const accreditations = [
  { label: "CIPS", src: "/accreditations/cips.svg", alt: "CIPS Accredited" },
  {
    label: "Ofsted",
    src: "/accreditations/ofsted.svg",
    alt: "Ofsted Regulated",
  },
  { label: "FSQS", src: "/accreditations/fsqs.svg", alt: "FSQS Certified" },
  {
    label: "Apprenticeships",
    src: "/accreditations/apprenticeships.svg",
    alt: "Apprenticeships",
  },
  {
    label: "Matrix",
    src: "/accreditations/matrix.svg",
    alt: "Matrix Standard",
  },
  {
    label: "UKVI",
    src: "/accreditations/ukvi.svg",
    alt: "UK Visas and Immigration",
  },
];

export default function BannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ─── Left content stagger ──────────────────
      if (leftRef.current) {
        const items = leftRef.current.querySelectorAll(".ban-anim");
        tl.fromTo(
          items,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          0.2,
        );
      }

      // ─── Right image slide in ──────────────────
      if (rightRef.current) {
        tl.fromTo(
          rightRef.current,
          { x: 80, opacity: 0, scale: 1.05 },
          { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          0.1,
        );
      }

      // ─── Dark overlay fade ────────────────────
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2 },
          0,
        );
      }

      // ─── Logos slide up ───────────────────────
      if (logosRef.current) {
        const logos = logosRef.current.querySelectorAll(".logo-item");
        gsap.fromTo(
          logos,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: logosRef.current,
              start: "top 92%",
            },
          },
        );
      }

      // ─── Subtle parallax on right image ───────
      if (rightRef.current && sectionRef.current) {
        gsap.to(rightRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] lg:min-h-screen flex items-stretch overflow-hidden bg-slate-100"
    >
      {/* ═══ LEFT PANEL ═══ */}
      <div
        ref={leftRef}
        className="relative z-20 w-full lg:w-[55%] xl:w-[50%] bg-[#f0f1f3] flex items-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-0"
      >
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #0a1628 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 w-full max-w-lg">
          {/* Overline */}
          <div
            className="ban-anim inline-flex items-center gap-2.5 mb-6"
            style={{ opacity: 0 }}
          >
            <span className="h-[2px] w-8 bg-primary" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
              LSHS × CIPS
            </span>
          </div>

          {/* Title */}
          <h1
            className="ban-anim text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.1rem] font-semibold text-navy leading-[1.1] tracking-tight mb-8"
            style={{ opacity: 0 }}
          >
            CIPS Professional
            <br />
            Qualification Courses
          </h1>

          {/* Description */}
          <p
            className="ban-anim text-[15px] text-slate-500 leading-relaxed mb-10 max-w-md"
            style={{ opacity: 0 }}
          >
            Globally recognised procurement qualifications from Level 2 to Level
            6 MCIPS. Study at an accredited centre in the heart of London or
            online.
          </p>

          {/* Two CTA Paths */}
          <div className="ban-anim space-y-3.5" style={{ opacity: 0 }}>
            {/* Individual Learner */}
            <Link
              href="/cips-courses"
              className="group flex items-center justify-between gap-4 bg-white rounded-xl px-6 py-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10">
                  <User className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <span className="block text-[14.5px] font-semibold text-navy group-hover:text-primary transition-colors duration-200">
                    I&apos;m looking to learn
                  </span>
                  <span className="block text-[12px] text-slate-400 mt-0.5">
                    Individual qualifications & memberships
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-navy group-hover:bg-secondary-dark group-hover:text-white transition-colors duration-300">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            {/* Corporate Training */}
            <Link
              href="/corporate-training"
              className="group flex items-center justify-between gap-4 bg-white rounded-xl px-6 py-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="block text-[14.5px] font-semibold text-navy group-hover:text-primary transition-colors duration-200">
                    I&apos;m looking to train employees
                  </span>
                  <span className="block text-[12px] text-slate-400 mt-0.5">
                    Corporate programmes & in-house training
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white group-hover:bg-primary-dark transition-colors duration-300">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL — Image ═══ */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[50%] xl:w-[55%]">
        <div
          ref={rightRef}
          className="relative h-full w-full"
          style={{ opacity: 0 }}
        >
          <img
            src="https://picsum.photos/seed/lshs-banner-professional/1200/1000.jpg"
            alt="Professional at London School of Higher Studies"
            className="h-full w-full object-cover object-center"
          />

          {/* Gradient overlay from left */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-r from-[#f0f1f3] via-[#f0f1f3]/60 to-transparent pointer-events-none"
            style={{ opacity: 0 }}
          />

          {/* Subtle bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {/* Floating stat card — bottom right */}
          <div className="absolute bottom-8 right-8 xl:bottom-12 xl:right-12 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl shadow-black/10 border border-white/50 p-5 max-w-[220px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 6 3 6 3s3 0 6-3v-5" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold text-navy leading-tight">
                  50K+
                </p>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                  CIPS Members
                </p>
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-primary to-secondary" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">
              Across 150+ countries
            </p>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE IMAGE (visible < lg) ═══ */}
      <div className="lg:hidden absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/lshs-banner-professional/1200/1000.jpg"
          alt=""
          className="h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/80 via-slate-100/60 to-slate-100/90" />
      </div>

      {/* ═══ ACCREDITATION LOGOS BAR ═══ */}
      <div
        ref={logosRef}
        className="absolute bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-slate-200/60"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-16 xl:px-20 py-4 lg:py-5">
          <div className="flex items-center justify-between gap-6">
            <span className="hidden sm:block text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 whitespace-nowrap flex-shrink-0">
              Accredited By
            </span>

            <div className="flex items-center justify-center gap-8 lg:gap-12 xl:gap-16 flex-1 overflow-x-auto">
              {accreditations.map((acc) => (
                <div
                  key={acc.label}
                  className="logo-item flex-shrink-0 flex items-center justify-center h-8 lg:h-9 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ opacity: 0 }}
                >
                  {/* Fallback: text logo if no image file */}
                  <span className="text-[13px] lg:text-[14px] font-bold text-slate-300 hover:text-slate-500 transition-colors duration-300 tracking-tight">
                    {acc.label}
                  </span>
                </div>
              ))}
            </div>

            <span className="hidden sm:block text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 whitespace-nowrap flex-shrink-0">
              Trusted Partners
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
