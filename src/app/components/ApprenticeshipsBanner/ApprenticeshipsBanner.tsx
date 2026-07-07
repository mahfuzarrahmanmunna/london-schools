"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { apprenticeshipLevels } from "@/app/data/apprenticeshipData";

gsap.registerPlugin(ScrollTrigger);

export default function ApprenticeshipsBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const items = titleRef.current.querySelectorAll(".ab-anim");
        gsap.fromTo(
          items,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 90%" },
          },
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".app-card");

        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
          },
        );

        cards.forEach((card) => {
          const arrow = card.querySelector(".app-arrow");
          if (!arrow) return;

          card.addEventListener("mouseenter", () => {
            gsap.to(arrow, { x: 8, duration: 0.35, ease: "power2.out" });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(arrow, {
              x: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.4)",
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* ═══ HEADER ═══ */}
        <div ref={titleRef} className="mb-14 lg:mb-20">
          <div
            className="ab-anim inline-flex items-center gap-2 mb-5"
            style={{ opacity: 0 }}
          >
            <span className="h-[2px] w-8 bg-primary" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
              Earn While You Learn
            </span>
          </div>

          <h2
            className="ab-anim text-3xl sm:text-4xl lg:text-[3.2rem] font-semibold text-navy leading-[1.1] tracking-tight mb-4"
            style={{ opacity: 0 }}
          >
            Apprenticeships:
            <span className="text-primary">.</span>
          </h2>

          <p
            className="ab-anim text-[15px] text-slate-500 leading-relaxed max-w-xl"
            style={{ opacity: 0 }}
          >
            Government-funded CIPS apprenticeships that combine real-world work
            experience with professional qualifications — from Level 3 to senior
            strategic roles.
          </p>
        </div>

        {/* ═══ RECTANGLE CARDS ═══ */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {apprenticeshipLevels.map((app) => (
            <Link
              key={app.level}
              href={`/apprenticeships/${app.level}`}
              className="app-card group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: app.color }}
            >
              {/* Card body */}
              <div className="flex flex-col items-center justify-center px-6 pt-10 pb-5 lg:pt-12 lg:pb-6 text-center">
                {/* Level number */}
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/45 mb-2.5">
                  Level {app.level}
                </p>

                {/* Title */}
                <h3 className="text-[15px] lg:text-[16px] font-semibold text-white leading-snug mb-4">
                  {app.subtitle}
                </h3>

                {/* Quick stats */}
                <div className="flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/50">
                    <Clock className="h-3 w-3" />
                    {app.duration}
                  </span>
                  <span
                    className="h-3 w-px"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  />
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/50">
                    <BookOpen className="h-3 w-3" />
                    {app.modules.length} Modules
                  </span>
                </div>
              </div>

              {/* Arrow strip */}
              <div
                className="w-full py-4 flex items-center justify-center border-t"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="app-arrow flex h-8 w-8 items-center justify-center rounded-full bg-white/15 group-hover:bg-white/25 transition-colors duration-300">
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ═══ BOTTOM INFO ═══ */}
        <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-xl border border-slate-100 bg-slate-50/50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8 5 8-5s-8 4-8 10z" />
                <path d="m9 12 2 2 4 4m4.5-1.5c.5-.5 1-.5 1.5-1.5h-3c-.6 0-1 .4-1 1v-6c0-.6.4-1 1-1h3c.5 0 1-.4 1.5-1.5" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-navy">
                Apprenticeship Levy Funded
              </p>
              <p className="text-[11px] text-slate-400">
                No cost to apprentices aged 16–18
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy hover:text-primary transition-colors group"
          >
            Find an Apprenticeship
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
