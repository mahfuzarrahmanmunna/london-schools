"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function BannerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;

    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  }, [isMuted]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      })
        .from(
          lineRef.current,
          {
            scaleX: 0,
            duration: 1.2,
            ease: "power3.inOut",
          },
          "-=0.6",
        )
        .from(
          ".hero-title",
          {
            y: 60,
            opacity: 0,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=0.8",
        )
        .from(
          ".hero-desc",
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.6",
        )
        .from(
          scrollRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .from(
          ".sound-toggle",
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        );

      // Scroll indicator bounce
      gsap.to(".scroll-bounce", {
        y: 8,
        duration: 1.2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2.6,
      });

      // Parallax on scroll
      gsap.to(".hero-bg", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
        y: 100,
        scale: 1.04,
        ease: "none",
      });

      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
        y: -50,
        opacity: 0,
        ease: "none",
      });

      gsap.to(scrollRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "5% top",
          end: "25% top",
          scrub: true,
        },
        opacity: 0,
        y: -15,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#001B30]"
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="hero-bg w-full h-full object-cover scale-105 will-change-transform"
          autoPlay
          loop
          muted
          playsInline
          poster="/port.avif"
        >
          <source src="/hero/banner.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Refined Overlay with Right-Side Blue Light Shade ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#001B30]/80 via-[#001B30]/50 to-[#001B30]/90" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0B73B9]/40 via-[#0B73B9]/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_0%,rgba(0,0,0,0.4)_80%)]" />
      </div>

      {/* ── Left Accent Line ── */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-[2] hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#0B73B9]" />
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* ── Main Content ── */}
      <div
        ref={titleRef}
        className="absolute inset-0 z-[2] flex items-center justify-center px-6"
      >
        <div className="max-w-5xl w-full text-center pt-12">
          {/* Glassmorphism Eyebrow Badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
            <span className="hero-eyebrow bg-white/10 backdrop-blur-md border border-white/20 text-white/80 px-4 py-2 rounded-full text-[10px] md:text-[11px] tracking-[0.2em] font-medium uppercase">
              London School of Higher Studies
            </span>
            <span className="hero-eyebrow bg-white/10 backdrop-blur-md border border-white/20 text-white/80 px-4 py-2 rounded-full text-[10px] md:text-[11px] tracking-[0.2em] font-medium uppercase">
              CIPS Approved Study Centre
            </span>
          </div>

          {/* Divider Line */}
          <div className="flex justify-center mb-8">
            <div
              ref={lineRef}
              className="w-12 h-px bg-gradient-to-r from-transparent via-[#0B73B9] to-transparent origin-center"
            />
          </div>

          {/* Title */}
          <h1
            className="hero-title text-white font-light tracking-[-0.025em] leading-[1.05]"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            }}
          >
            Build Your Career on a Global Standard
          </h1>

          {/* Description */}
          <p className="hero-desc mt-8 md:mt-10 text-white/70 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
            Welcome to the London School of Higher Studies. We help ambitious
            professionals gain the world&apos;s leading procurement and supply
            chain qualification. Studied flexibly, assessed rigorously, and
            recognised by employers worldwide.
          </p>

          {/* CTAs */}
          <div className="hero-cta mt-10 md:mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/courses"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-[13px] font-medium tracking-[0.15em] uppercase text-white border border-transparent rounded-none transition-all duration-500 overflow-hidden bg-[#0B73B9] hover:bg-[#085C92]"
            >
              <span className="relative z-10">Explore CIPS Courses</span>
              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>

            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-[13px] font-medium tracking-[0.15em] uppercase text-white border border-white/30 rounded-none transition-all duration-500 overflow-hidden bg-white/10 backdrop-blur-md hover:bg-white/20"
            >
              <span className="relative z-10">Talk to an Advisor</span>
              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bouncing Scroll Indicator ── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-white/50 text-[9px] tracking-[0.25em] uppercase font-medium">
          Scroll
        </span>
        <div className="scroll-bounce">
          <svg
            className="w-5 h-5 text-white/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>

      {/* ── Sound Toggle — Bottom Right ── */}
      <button
        type="button"
        onClick={toggleMute}
        className="sound-toggle absolute bottom-8 right-8 z-[5] flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.12] text-white/60 hover:text-white hover:bg-white/[0.14] hover:border-white/[0.2] transition-all duration-300 min-h-[44px] min-w-[44px]"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" strokeWidth={1.5} />
        ) : (
          <Volume2 className="w-4 h-4" strokeWidth={1.5} />
        )}
      </button>

      {/* ── Bottom Gradient Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-[1] bg-gradient-to-t from-[#001B30] to-transparent pointer-events-none" />
    </section>
  );
}
