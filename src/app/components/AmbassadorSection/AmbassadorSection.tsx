"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Ambassador Data (22 Entries) ──
const ambassadors = [
  {
    name: "Tanvir Ahmed",
    country: "Bangladesh",
    flag: "🇧🇩",
    experience: "Senior Procurement Manager · 12+ Yrs",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Joseph Mensah",
    country: "Liberia",
    flag: "🇱🇷",
    experience: "Supply Chain Director · 10+ Yrs",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Aarati Sharma",
    country: "Nepal",
    flag: "🇳🇵",
    experience: "MCIPS Qualified Professional · 8+ Yrs",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Fatmata Sesay",
    country: "Sierra Leone",
    flag: "🇸🇱",
    experience: "Public Procurement Officer · 9+ Yrs",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Chinedu Okeke",
    country: "Nigeria",
    flag: "🇳🇬",
    experience: "Logistics & Procurement Lead · 11+ Yrs",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Samuel Osei",
    country: "Ghana",
    flag: "🇬🇭",
    experience: "Strategic Sourcing Manager · 14+ Yrs",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Priya Patel",
    country: "India",
    flag: "🇮🇳",
    experience: "Supply Chain Analyst · 6+ Yrs",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "David Mwangi",
    country: "Kenya",
    flag: "🇰🇪",
    experience: "Head of Procurement · 15+ Yrs",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Aisha Mohammed",
    country: "UAE",
    flag: "🇦🇪",
    experience: "Contract Management Lead · 9+ Yrs",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Marco Rossi",
    country: "Italy",
    flag: "🇮🇹",
    experience: "MCIPS, European Supply Chain · 12+ Yrs",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Maria Santos",
    country: "Philippines",
    flag: "🇵🇭",
    experience: "Vendor Relations Manager · 7+ Yrs",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "James Okonkwo",
    country: "Nigeria",
    flag: "🇳🇬",
    experience: "Public Sector Procurement · 10+ Yrs",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Siti Rahayu",
    country: "Indonesia",
    flag: "🇮🇩",
    experience: "Procurement Specialist · 8+ Yrs",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "John Kamara",
    country: "Sierra Leone",
    flag: "🇸🇱",
    experience: "Operations & Supply Lead · 11+ Yrs",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Fatima Al-Hassan",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    experience: "Category Manager · 9+ Yrs",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Rahul Joshi",
    country: "India",
    flag: "🇮🇳",
    experience: "MCIPS, Procurement Consultant · 13+ Yrs",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Grace Mutua",
    country: "Tanzania",
    flag: "🇹🇿",
    experience: "Supply Chain Coordinator · 6+ Yrs",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Ahmed Yusuf",
    country: "Somalia",
    flag: "🇸🇴",
    experience: "Humanitarian Logistics · 10+ Yrs",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Lucy Wambui",
    country: "Kenya",
    flag: "🇰🇪",
    experience: "Tendering & Compliance · 8+ Yrs",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Daniel Asante",
    country: "Ghana",
    flag: "🇬🇭",
    experience: "Procurement Auditor · 12+ Yrs",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Hassan Ali",
    country: "Pakistan",
    flag: "🇵🇰",
    experience: "Supply Chain Planner · 7+ Yrs",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
];

export default function AmbassadorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Animate header
        gsap.from(".amb-header-item", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".amb-header",
            start: "top 85%",
            once: true,
          },
        });

        // Stagger animate the grid items directly (no cards)
        const items = gsap.utils.toArray<HTMLElement>(".amb-item");
        if (items.length) {
          gsap.from(items, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.04, // Fast stagger since there are 22 items
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 90%",
              once: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-white overflow-hidden"
    >
      {/* ── Background Accents ── */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#0B73B9]/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#F4D210]/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* ── Main Layout ── */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="amb-header max-w-3xl mb-16 md:mb-20 text-left">
          <span className="amb-header-item inline-block text-[11px] tracking-[0.2em] font-bold text-[#0B73B9] uppercase bg-[#0B73B9]/[0.07] px-4 py-2 rounded-full border border-[#0B73B9]/10">
            Global Support Network
          </span>

          <h2
            className="amb-header-item mt-6 text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-slate-900 tracking-tight leading-[1.2]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Country Ambassadors
          </h2>

          <p className="amb-header-item mt-5 text-base md:text-lg font-normal leading-relaxed text-slate-500 max-w-2xl">
            Local support, wherever you&apos;re studying from. Our ambassadors
            help you navigate enrolment and the CIPS pathway in your own
            country, in your own time zone.
          </p>
        </div>

        {/* ── Ambassador Grid (5-6 per line) ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 md:gap-y-12"
        >
          {ambassadors.map((amb, index) => (
            <div
              key={index}
              className="amb-item flex flex-col items-center text-center group"
            >
              {/* Full Rounded Image */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-1 ring-slate-100 group-hover:ring-[#0B73B9]/20 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-slate-200/50">
                <Image
                  src={amb.image}
                  alt={`${amb.name} - ${amb.country} Ambassador`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                />
              </div>

              {/* Name */}
              <h3 className="mt-4 text-sm md:text-base font-semibold text-slate-900 tracking-tight leading-tight">
                {amb.name}
              </h3>

              {/* Country */}
              <p className="mt-1.5 text-[10px] md:text-[11px] font-bold text-[#0B73B9] uppercase tracking-widest flex items-center gap-1.5">
                <span className="text-xs">{amb.flag}</span>
                {amb.country}
              </p>

              {/* Experience */}
              <p className="mt-1 text-[11px] md:text-xs text-slate-400 font-medium leading-relaxed max-w-[160px]">
                {amb.experience}
              </p>

              {/* Contact Redirect */}
              <Link
                href="/contact"
                className="mt-3 text-[11px] font-semibold text-slate-300 hover:text-[#0B73B9] transition-colors duration-300 flex items-center gap-1"
              >
                Contact
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
