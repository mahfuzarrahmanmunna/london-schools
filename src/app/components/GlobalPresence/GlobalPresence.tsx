"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

// ─── Country Data ──────────────────────────────────
const countries = [
  { name: "Bangladesh", code: "bd", emoji: "🇧🇩" },
  { name: "United States", code: "us", emoji: "🇺🇸" },
  { name: "Nepal", code: "np", emoji: "🇳🇵" },
  { name: "United Kingdom", code: "gb", emoji: "🇬🇧" },
  { name: "United Arab Emirates", code: "ae", emoji: "🇦🇪" },
  { name: "India", code: "in", emoji: "🇮🇳" },
  { name: "Malaysia", code: "my", emoji: "🇲🇾" },
  { name: "Saudi Arabia", code: "sa", emoji: "🇸🇦" },
  { name: "Canada", code: "ca", emoji: "🇨🇦" },
  { name: "Australia", code: "au", emoji: "🇦🇺" },
  { name: "Singapore", code: "sg", emoji: "🇸🇬" },
  { name: "Qatar", code: "qa", emoji: "🇶🇦" },
];

// ─── Single Flag Card ──────────────────────────────
function FlagCard({
  country,
  index,
}: {
  country: (typeof countries)[0];
  index: number;
}) {
  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0 px-4 sm:px-6">
      {/* Flag Circle */}
      <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border-[3px] border-white/20 shadow-lg shadow-black/10 bg-white">
        <img
          src={`https://flagcdn.com/w320/${country.code}.png`}
          alt={`${country.name} flag`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Country Name */}
      <span className="text-[11px] sm:text-xs font-medium text-white/50 whitespace-nowrap tracking-wide">
        {country.name}
      </span>
    </div>
  );
}

// ─── Scrolling Track ───────────────────────────────
function ScrollTrack({ reverse = false }: { reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2; // half because duplicated

    animationRef.current = gsap.to(track, {
      x: reverse ? totalWidth : -totalWidth,
      duration: 35,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          const val = parseFloat(String(x));
          if (reverse) {
            return (
              (((val % totalWidth) + totalWidth) % totalWidth) -
              totalWidth +
              "px"
            );
          }
          return (
            (((val % totalWidth) + totalWidth) % totalWidth) - totalWidth + "px"
          );
        }),
      },
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [reverse]);

  return (
    <div ref={trackRef} className="flex items-center">
      {/* Original set */}
      {countries.map((country, i) => (
        <FlagCard key={`a-${i}`} country={country} index={i} />
      ))}
      {/* Duplicate set for seamless loop */}
      {countries.map((country, i) => (
        <FlagCard key={`b-${i}`} country={country} index={i} />
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────
export default function GlobalPresence() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const trackWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in heading
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      // Fade in subtitle
      gsap.fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.15,
        },
      );

      // Fade in track wrapper
      gsap.fromTo(
        trackWrapperRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-navy py-16 sm:py-20 lg:py-24"
    >
      {/* ── Subtle Background Pattern ── */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── Gradient Glow Accents ── */}
      <div className="absolute top-0 left-1/4 h-64 w-96 bg-cips/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-64 w-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Heading Block ── */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight"
            style={{ opacity: 0 }}
          >
            Empowering Learners{" "}
            <span className="relative inline-block">
              Across Borders
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-cips via-teal-400 to-cips" />
            </span>
          </h2>
          <p
            ref={subRef}
            className="mt-5 text-base sm:text-lg text-white/50 font-light tracking-wide"
            style={{ opacity: 0 }}
          >
            – Successfully Training Professionals Worldwide.
          </p>
        </div>

        {/* ── Flag Scrolling Area ── */}
        <div ref={trackWrapperRef} className="relative" style={{ opacity: 0 }}>
          {/* Left Fade Mask */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />

          {/* Right Fade Mask */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

          {/* Top / Bottom subtle borders */}
          <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent py-6 sm:py-8">
            {/* Row 1 Left to Right */}
            <div className="overflow-hidden mb-6 sm:mb-8">
              <ScrollTrack reverse={false} />
            </div>

            {/* Row 2 Right to Left (reversed for visual interest) */}
            <div className="overflow-hidden">
              <ScrollTrack reverse={true} />
            </div>
          </div>
        </div>

        {/* ── Bottom Stat Line ── */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { value: "30+", label: "Countries" },
            { value: "10K+", label: "Professionals Trained" },
            { value: "200+", label: "Corporate Clients" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-cips">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-white/40 font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
