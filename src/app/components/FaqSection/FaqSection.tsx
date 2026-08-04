"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, ArrowUpRight, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Why should I choose LSHS?",
    a: "LSHS is a CIPS Approved Study Centre offering structured distance learning, CIPS-qualified tutor support, and guidance through every stage of the CIPS pathway - from Level 2 to MCIPS Chartered status.",
  },
  {
    q: "Are LSHS qualifications recognised globally?",
    a: "Yes - CIPS qualifications are set by the Chartered Institute of Procurement & Supply and recognised by employers internationally across procurement and supply chain roles.",
  },
  {
    q: "What is CIPS, and why does it matter?",
    a: "CIPS is the world's largest professional body for procurement and supply chain management. Its qualifications are widely used by employers as a benchmark for procurement capability.",
  },
  {
    q: "Which CIPS level should I start with?",
    a: "It depends on your experience:",
    list: [
      "Level 2 & 3 - Suited to those new to procurement or with limited prior experience.",
      "Level 4 - The common starting point for professionals with some procurement experience.",
      "Level 5 & 6 - For experienced professionals working toward senior roles and MCIPS.",
    ],
  },
  {
    q: "How long does a CIPS qualification take?",
    a: "Study duration depends on the level and your study mode:",
    list: [
      "Level 2 & 3: Typically 6–12 months",
      "Level 4–6: Typically 9–18 months per level, depending on study mode",
    ],
  },
];

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first one by default

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white border-t border-slate-100"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Sticky Header & CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <div className="reveal-item flex items-center gap-4 mb-6">
              <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                FAQs
              </span>
              <div className="w-12 h-0.5 bg-[#0B73B9]" />
            </div>

            <h2
              className="reveal-item text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>

            <p className="reveal-item text-base font-normal leading-relaxed tracking-normal text-slate-600 mb-10">
              Find answers to the most common questions about our CIPS
              qualifications, study modes, and the enrolment process.
            </p>

            {/* Support CTA Card */}
            <div className="reveal-item relative bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#f4d210]" />
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center">
                  <MessageCircle
                    className="w-5 h-5 text-[#0B73B9]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 tracking-tight mb-1">
                    Still have questions?
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-slate-500 mb-4">
                    Our academic support team is here to help you choose the
                    right path.
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-[#0B73B9] hover:text-[#085C92] transition-colors duration-300 border-b border-[#0B73B9]/30 hover:border-[#085C92] pb-1"
                  >
                    Talk to an Advisor
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7">
            <div className="border-t border-slate-200">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className="reveal-item border-b border-slate-200"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                    >
                      <span
                        className={`text-base md:text-lg font-medium transition-colors duration-300 ${
                          isOpen
                            ? "text-[#0B73B9]"
                            : "text-slate-900 group-hover:text-[#0B73B9]"
                        }`}
                      >
                        {faq.q}
                      </span>

                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          isOpen
                            ? "bg-[#0B73B9] border-[#0B73B9] rotate-180"
                            : "bg-white border-slate-200 group-hover:border-[#0B73B9]"
                        }`}
                      >
                        <Plus
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isOpen
                              ? "text-white"
                              : "text-slate-400 group-hover:text-[#0B73B9]"
                          }`}
                          strokeWidth={2.5}
                        />
                      </div>
                    </button>

                    {/* Smooth height transition using CSS Grid */}
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pr-12">
                          <p className="text-base font-normal leading-relaxed tracking-normal text-slate-600 mb-4">
                            {faq.a}
                          </p>

                          {/* Render List if present */}
                          {faq.list && (
                            <ul className="space-y-3 mt-2">
                              {faq.list.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3"
                                >
                                  <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[#f4d210]" />
                                  <span className="text-base font-normal leading-relaxed tracking-normal text-slate-600">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
