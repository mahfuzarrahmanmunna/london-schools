"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  X,
  CheckCircle2,
  Mail,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────── */

const tocItems = [
  { id: "guarantee", label: "The 24-Hour Guarantee" },
  { id: "eligibility", label: "Eligibility Criteria" },
  { id: "non-refundable", label: "Non-Refundable Items" },
  { id: "process", label: "How to Request a Refund" },
  { id: "processing", label: "Processing Time" },
];

const quickInfo = [
  {
    icon: Clock,
    title: "24-Hour Window",
    desc: "Request a full refund within exactly 24 hours of your initial enrolment.",
    color: "blue",
  },
  {
    icon: X,
    title: "Strictly Non-Refundable",
    desc: "CIPS exam fees, membership fees, and dispatched physical materials.",
    color: "red",
  },
  {
    icon: CheckCircle2,
    title: "Fast Processing",
    desc: "Approved refunds are processed back to the original payment method quickly.",
    color: "gold",
  },
];

/* ─── Main Page Component ───────────────────────────────── */

export default function RefundPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    const ctx = gsap.context(() => {
      /* ── Hero Content Entrance ── */
      const heroTl = gsap.timeline({ delay: 0.4 });

      heroTl
        .from(".hero-eyebrow", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 40,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.8",
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .from(
          ".hero-date",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );

      /* ── Scroll Reveal Items ── */
      const items = gsap.utils.toArray<HTMLElement>(".reveal-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      /* ── Floating Accent Animations ── */
      gsap.to(".float-accent", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-white">
      {/* ═══════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#001B30]">
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001B30]/70 via-[#001B30]/60 to-[#001B30]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />

        {/* Animated Glows */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#0B73B9]/20 to-transparent pointer-events-none float-accent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-gradient-to-tl from-[#f4d210]/10 to-transparent pointer-events-none float-accent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-24">
          {/* Eyebrow */}
          <div className="hero-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <ShieldCheck size={14} className="text-[#f4d210]" />
            <span className="text-sm font-medium tracking-widest uppercase text-white/60">
              Legal Policy
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-title text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Refund &amp; Cancellation Policy
          </h1>

          {/* Sub-headline */}
          <p className="hero-desc text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
            We stand by the quality of our educational programs. Please review
            our straightforward refund policy below.
          </p>

          {/* Date */}
          <div className="hero-date mt-8 flex justify-center">
            <span className="text-xs tracking-[0.2em] font-semibold text-white/30 uppercase border border-white/10 px-4 py-2 rounded-full">
              Last Updated: October 24, 2024
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. QUICK INFO STRIP
      ═══════════════════════════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {quickInfo.map((info, i) => {
            const Icon = info.icon;
            const colorClass =
              info.color === "blue"
                ? "bg-[#0B73B9]/5 border-[#0B73B9]/10 text-[#0B73B9]"
                : info.color === "red"
                  ? "bg-red-50 border-red-100 text-red-500"
                  : "bg-[#f4d210]/5 border-[#f4d210]/10 text-[#b58b00]";
            return (
              <div
                key={i}
                className="reveal-item flex items-start gap-4 py-8 md:py-10 md:pr-8"
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-md border flex items-center justify-center ${colorClass}`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-wider uppercase text-slate-500 mb-1.5">
                    {info.title}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {info.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. MAIN CONTENT GRID
      ═══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ── Left Sidebar: Table of Contents ── */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="reveal-item sticky top-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-[#0B73B9]" />
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#0B73B9]">
                  On this page
                </span>
              </div>
              <ul className="space-y-1 border-l border-slate-200">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group block text-sm text-slate-500 hover:text-[#0B73B9] transition-colors pl-4 py-2 border-l-2 border-transparent hover:border-[#0B73B9] hover:bg-slate-50 -ml-px font-medium"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── Right Content: Legal Text ── */}
          <div className="lg:col-span-8 space-y-16">
            {/* 24-Hour Guarantee Callout */}
            <section id="guarantee" className="reveal-item scroll-mt-28">
              <div className="relative bg-slate-50 border border-slate-200 rounded-xl p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0B73B9]"></div>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <ShieldCheck
                      className="w-7 h-7 text-[#0B73B9]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-3 tracking-tight"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      The 24-Hour Money-Back Guarantee
                    </h2>
                    <p className="text-[15px] leading-[1.8] text-slate-600">
                      We are confident in the quality of our educational
                      programs. However, if you are not completely satisfied
                      with your purchase, you may request a full refund within{" "}
                      <span className="font-bold text-[#0B73B9]">
                        24 hours (1 day)
                      </span>{" "}
                      of your initial enrolment. This policy allows you to
                      review the course introduction and ensure it meets your
                      professional learning expectations without risk.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Eligibility Criteria */}
            <section id="eligibility" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Eligibility
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Eligibility Criteria
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  To be eligible for a refund under the 24-hour policy, the
                  following conditions must be strictly met:
                </p>
                <ul className="space-y-4 pl-1">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0B73B9]/10 text-[#0B73B9] flex items-center justify-center text-xs font-bold mt-0.5">
                      1
                    </span>
                    <span>
                      The refund request must be submitted within exactly 24
                      hours of your initial course payment.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0B73B9]/10 text-[#0B73B9] flex items-center justify-center text-xs font-bold mt-0.5">
                      2
                    </span>
                    <span>
                      You must not have accessed, downloaded, or progressed
                      beyond the first introductory module of the course portal.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0B73B9]/10 text-[#0B73B9] flex items-center justify-center text-xs font-bold mt-0.5">
                      3
                    </span>
                    <span>
                      Your account must be in good standing, with no violations
                      of our Terms &amp; Conditions.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Non-Refundable Items */}
            <section id="non-refundable" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Exclusions
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Non-Refundable Items
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  Please note that certain items are strictly non-refundable,
                  regardless of the time frame, due to their nature or
                  third-party processing:
                </p>
                <ul className="space-y-4 pl-1">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center mt-0.5">
                      <X className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span>
                      <span className="font-bold text-slate-900">
                        CIPS Exam Fees:
                      </span>{" "}
                      Examination entry fees paid to the Chartered Institute of
                      Procurement &amp; Supply (CIPS) are strictly
                      non-refundable once processed.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center mt-0.5">
                      <X className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span>
                      <span className="font-bold text-slate-900">
                        CIPS Membership Fees:
                      </span>{" "}
                      Registration and annual membership fees paid directly to
                      CIPS.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center mt-0.5">
                      <X className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span>
                      <span className="font-bold text-slate-900">
                        Physical Materials:
                      </span>{" "}
                      Printed textbooks or physical study materials that have
                      already been dispatched.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center mt-0.5">
                      <X className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span>
                      <span className="font-bold text-slate-900">
                        Post-24 Hours:
                      </span>{" "}
                      Any refund requested after the 24-hour window has elapsed
                      will be automatically denied.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* How to Request a Refund */}
            <section id="process" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Process
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                How to Request a Refund
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  To initiate a refund, you must contact our admissions team
                  immediately. Your request must include your full name, student
                  ID, the course name, and a brief reason for the refund.
                </p>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-[#0B73B9]" />
                    <p className="text-sm font-bold tracking-wide uppercase text-slate-700">
                      Contact Email
                    </p>
                  </div>
                  <p className="text-slate-600 mb-3">admissions@lshs.co.uk</p>
                  <div className="flex items-center gap-2 mb-2 mt-4">
                    <Clock className="w-4 h-4 text-[#0B73B9]" />
                    <p className="text-sm font-bold tracking-wide uppercase text-slate-700">
                      Subject Line
                    </p>
                  </div>
                  <p className="text-slate-600">
                    Refund Request - [Your Name] - [Course Name]
                  </p>
                </div>
                <p className="text-slate-500 italic">
                  Failure to provide the correct information may delay the
                  processing of your request past the 24-hour deadline.
                </p>
              </div>
            </section>

            {/* Processing Time */}
            <section id="processing" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Timeline
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Processing Time
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  Approved refunds will be processed back to the original method
                  of payment within{" "}
                  <span className="font-bold text-slate-900">
                    5-7 business days
                  </span>
                  . Depending on your bank or credit card issuer, it may take
                  additional time for the funds to appear in your account.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. CLOSING CTA
      ═══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl reveal-item">
          {/* Background */}
          <div className="absolute inset-0 bg-[#001B30]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-[100px] bg-[#0B73B9] pointer-events-none float-accent" />
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-5 blur-[80px] bg-[#f4d210] pointer-events-none float-accent" />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f4d210] mb-4">
                Need Assistance?
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Have Questions About Your Refund?
              </h2>
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                Our support team is here to help clarify any details regarding
                our refund policy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold tracking-wide uppercase text-[#001B30] bg-white hover:bg-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
