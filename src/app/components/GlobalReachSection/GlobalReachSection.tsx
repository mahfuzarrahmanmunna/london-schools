"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const countries = [
  { name: "United Kingdom", code: "gb" },
  { name: "United Arab Emirates", code: "ae" },
  { name: "South Africa", code: "za" },
  { name: "Ghana", code: "gh" },
  { name: "New Zealand", code: "nz" },
  { name: "Kenya", code: "ke" },
  { name: "Nigeria", code: "ng" },
  { name: "Zambia", code: "zm" },
  { name: "Australia", code: "au" },
  { name: "Qatar", code: "qa" },
  { name: "Bangladesh", code: "bd" },
];

export default function GlobalReachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Left Column Entrance
      gsap.from(".luxury-anim", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Staggered Flags Entrance
      const flags = gsap.utils.toArray<HTMLElement>(".flag-tile");
      flags.forEach((flag, i) => {
        gsap.from(flag, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.04,
          scrollTrigger: {
            trigger: flag,
            start: "top 95%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#001B30] overflow-hidden"
    >
      {/* Soft Matte Vignette Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(2,27,48,1)_0%,_rgba(0,15,30,1)_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Sticky Editorial Layout */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <div className="luxury-anim">
              <span className="text-sm tracking-[0.3em] font-medium bg-primary/50 shadow-sm px-3 py-2 rounded-full backdrop-blur-md border border-slate-200 text-[#f4d210] uppercase">
                Global Presence
              </span>
            </div>

            <h2
              className="luxury-anim mt-8 text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Supporting Learners <br /> Across Borders.
            </h2>

            <p className="luxury-anim mt-8 text-base font-light leading-relaxed tracking-normal text-white/50 max-w-md">
              Join a network of professionals advancing their careers worldwide.
              Wherever you are, our flexible study options bring world-class
              CIPS qualifications directly to you.
            </p>

            {/* Elegant Separator & Large Stat */}
            <div className="luxury-anim mt-12 w-16 h-px bg-white/15" />

            <div className="luxury-anim mt-10 flex items-baseline gap-5">
              <span
                className="text-6xl md:text-7xl font-light text-white tracking-tighter"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                150+
              </span>
              <span className="text-sm text-white/40 uppercase tracking-[0.2em] leading-tight">
                Countries
              </span>
            </div>

            {/* Minimalist CTA */}
            <Link
              href="/contact"
              className="luxury-anim mt-12 group inline-flex items-center gap-3 text-sm font-medium tracking-[0.15em] uppercase text-white border-b border-[#f4d210] pb-2 hover:text-[#f4d210] transition-colors duration-300"
            >
              Book your next seat with LSHS
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          {/* Right Column: Hairline Grid Layout */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 border-l border-t border-white/5">
              {countries.map((country, i) => (
                <div
                  key={i}
                  className="flag-tile group relative bg-[#001B30] border-r border-b border-white/5 p-8 md:p-10 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-[#011F33] overflow-hidden"
                >
                  {/* Gold hover accent line at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f4d210] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left" />

                  {/* Real Flag Image - Refined Presentation */}
                  <div className="relative w-16 h-10 mb-5 shadow-xl shadow-black/20 rounded-sm overflow-hidden border border-white/10">
                    <img
                      src={`https://flagcdn.com/w160/${country.code}.png`}
                      srcSet={`https://flagcdn.com/w320/${country.code}.png 2x`}
                      alt={`Flag of ${country.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Matte overlay on flag to blend */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/0 transition-colors" />
                  </div>

                  <p className="text-sm font-normal leading-snug tracking-wide text-white/60 group-hover:text-white transition-colors duration-500">
                    {country.name}
                  </p>
                </div>
              ))}

              {/* "+ 150 Countries" Special Tile */}
              <div className="flag-tile group relative bg-[#011F33] border-r border-b border-white/5 p-8 md:p-10 flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[#0B73B9]/10 to-transparent" />
                <div className="relative w-16 h-10 mb-5 rounded-sm overflow-hidden border border-[#f4d210]/20 bg-[#0B73B9]/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-[#f4d210] font-bold text-3xl tracking-widest">
                    +
                  </span>
                </div>
                <p className="relative text-sm font-medium leading-snug tracking-wide text-[#f4d210]">
                  150 Countries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
