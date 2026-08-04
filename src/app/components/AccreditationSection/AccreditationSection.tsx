"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  Award,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

export default function AccreditationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".reveal-item");
      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle Escape key press to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscKey);
    } else {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscKey);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white border-t border-slate-100"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Formal License Image Frame (STICKY) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1 lg:sticky lg:top-24 self-start">
            <div
              className="reveal-item relative w-full max-w-sm cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Formal Document Frame */}
              <div className="relative bg-slate-50 p-3 shadow-xl border border-slate-200 transition-all duration-300 hover:border-[#0B73B9]/30 hover:shadow-2xl">
                {/* Image Placeholder - Replace src with your actual license image */}
                <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                  <img
                    src="/certificate/certificate.webp" 
                    alt="LSHS CIPS Approved Centre License"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Official Caption */}
                <div className="pt-4 text-center border-t border-slate-200 mt-3 bg-white">
                  <p className="text-sm font-semibold text-slate-900 tracking-tight">
                    CIPS Approved Centre
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    London School of Higher Studies
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content: Text & Grid (Scrolls) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="reveal-item flex items-center gap-4 mb-6">
              <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                Accreditation &amp; Recognition
              </span>
              <div className="w-12 h-0.5 bg-[#0B73B9]" />
            </div>

            <h2
              className="reveal-item text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              A CIPS Approved Study Centre and Exam Centre
            </h2>

            <p className="reveal-item text-sm font-semibold tracking-wide text-[#085C92] uppercase mb-8">
              Study Centre (Distance Learning) · Study Centre (Classroom-Based)
              · Exam Centre
            </p>

            <div className="space-y-6 text-slate-600 mb-12">
              <p className="reveal-item text-base font-normal leading-relaxed tracking-normal">
                London School of Higher Studies (LSHS) is a UK-based training
                provider with a dedicated centre in Dhaka, Bangladesh,
                delivering CIPS qualifications exclusively. We support learners
                at every stage of the procurement career journey with
                structured, industry-aligned courses, flexible study options and
                qualified tutors - built around practical, real-world
                application of the CIPS syllabus.
              </p>
              <p className="reveal-item text-base font-normal leading-relaxed tracking-normal">
                As an Approved Centre, LSHS is recognised to deliver CIPS
                qualifications and host CIPS examinations, meaning students can
                study and sit their exams through the same centre.
              </p>
            </div>

            {/* 4 Grid Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mb-12">
              {accreditationPoints.map((point, i) => {
                const Icon = point.icon;
                return (
                  <div
                    key={i}
                    className="reveal-item group flex items-start gap-4 border-t border-slate-200 pt-6"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-300 bg-slate-50 border border-slate-200 group-hover:bg-[#0B73B9]/5 group-hover:border-[#0B73B9]/20">
                      <Icon
                        className="w-5 h-5 text-[#0B73B9] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 tracking-tight mb-1.5">
                        {point.title}
                      </h3>
                      <p className="text-sm font-normal leading-relaxed text-slate-500">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="https://study.cips.org/countries/bangladesh/london-school-of-higher-studies/"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-item group inline-flex items-center gap-3 text-sm font-semibold tracking-wider uppercase text-[#0B73B9] hover:text-[#085C92] transition-colors duration-300 border-b border-[#0B73B9]/30 hover:border-[#085C92] pb-1"
            >
              Verify LSHS with CIPS Official Website
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          IMAGE VIEWER (LIGHTBOX)
      ══════════════════════════════════════════════ */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Full Screen Image Container */}
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/certificate/certificate.webp" // <-- UPDATE YOUR IMAGE PATH HERE
              alt="LSHS CIPS Approved Centre License Full View"
              className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </section>
  );
}
