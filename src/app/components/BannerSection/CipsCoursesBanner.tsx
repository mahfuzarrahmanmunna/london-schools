"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { courseLevels } from "@/app/data/cipsCourses";

gsap.registerPlugin(ScrollTrigger);

const displayCourses = courseLevels.filter((c) => c.level >= 3);

export default function CipsCoursesBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 90%" },
          },
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".cips-card");

        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
          },
        );

        cards.forEach((card) => {
          const arrow = card.querySelector(".cips-arrow");
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
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* ═══ TITLE ═══ */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-navy tracking-tight mb-14 lg:mb-20"
          style={{ opacity: 0 }}
        >
          CIPS Courses:
          <span className="text-primary">.</span>
        </h2>

        {/* ═══ RECTANGLE CARDS ═══ */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {displayCourses.map((course) => (
            <Link
              key={course.level}
              href={course.href}
              className="cips-card group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: course.color }}
            >
              {/* Rectangle body — wider than tall */}
              <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-10 text-center">
                {/* Level label */}
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/50 mb-3">
                  Level {course.level}
                </p>

                {/* Course title */}
                <h3 className="text-[14px] lg:text-[15px] font-semibold text-white leading-snug">
                  {course.subtitle}
                </h3>
              </div>

              {/* Arrow strip */}
              <div className="w-full py-4 flex items-center justify-center border-t border-white/15 bg-white/5">
                <div className="cips-arrow flex h-8 w-8 items-center justify-center rounded-full bg-white/15 group-hover:bg-white/25 transition-colors duration-300">
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
