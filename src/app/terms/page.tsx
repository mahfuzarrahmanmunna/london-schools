"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ShieldCheck,
  X,
  CheckCircle2,
  FileText,
  Lock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────── */

const tocItems = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "use", label: "Use of Website & Services" },
  { id: "intellectual", label: "Intellectual Property" },
  { id: "enrolment", label: "Course Enrolment & Fees" },
  { id: "privacy", label: "Privacy & Data Protection" },
  { id: "liability", label: "Disclaimer of Liability" },
  { id: "changes", label: "Changes to Terms" },
];

const quickInfo = [
  {
    icon: FileText,
    title: "User Agreement",
    desc: "By accessing our website or enrolling in courses, you agree to these terms and conditions.",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Intellectual Property",
    desc: "All course materials and content are owned by LSHS and protected by international laws.",
    color: "gold",
  },
  {
    icon: Lock,
    title: "Privacy & GDPR",
    desc: "We process your personal data in accordance with the UK General Data Protection Regulation.",
    color: "blue",
  },
];

/* ─── Main Page Component ───────────────────────────────── */

export default function TermsPage() {
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
            <FileText size={14} className="text-[#f4d210]" />
            <span className="text-sm font-medium tracking-widest uppercase text-white/60">
              Legal Policy
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-title text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Terms &amp; Conditions
          </h1>

          {/* Sub-headline */}
          <p className="hero-desc text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
            Please read these terms carefully before using our website or
            enrolling in any of our educational programs.
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
            {/* 1. Acceptance of Terms */}
            <section id="acceptance" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Introduction
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Acceptance of Terms
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  Welcome to the London School of Higher Studies (LSHS). By
                  accessing and using our website at{" "}
                  <span className="font-bold text-slate-900">lshs.co.uk</span>,
                  you agree to be bound by these Terms and Conditions of use. If
                  you do not agree with any part of these terms, please do not
                  use our website or enroll in our courses.
                </p>
                <p>
                  These terms apply to all visitors, users, and others who
                  access or use the Service. By enrolling in any CIPS
                  qualification or training program offered by LSHS, you
                  additionally agree to the specific terms and conditions of
                  enrolment provided at the time of registration.
                </p>
              </div>
            </section>

            {/* 2. Use of Website & Services */}
            <section id="use" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Usage
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Use of Website &amp; Services
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  LSHS grants you a personal, non-exclusive, non-transferable
                  license to access and use our website and learning materials
                  for the purpose of completing your professional education. You
                  agree not to:
                </p>
                <ul className="space-y-4 pl-1">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center mt-0.5">
                      <X className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span>
                      Modify, copy, distribute, or transmit any course
                      materials, videos, or resources without prior written
                      consent.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center mt-0.5">
                      <X className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span>
                      Use the Service for any commercial purpose or for the
                      benefit of any third party.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center mt-0.5">
                      <X className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span>
                      Share your login credentials with any other individual or
                      allow unauthorized access to the learning portal.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. Intellectual Property */}
            <section id="intellectual" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Ownership
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Intellectual Property
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  The Service and its original content, features, and
                  functionality are owned by LSHS and are protected by
                  international copyright, trademark, and other intellectual
                  property laws. The Chartered Institute of Procurement &amp;
                  Supply (CIPS) syllabus and associated trademarks remain the
                  property of CIPS.
                </p>
                <p>
                  Users may not reproduce, republish, or redistribute any part
                  of the intellectual property without explicit attribution and
                  permission from LSHS and relevant rights holders.
                </p>
              </div>
            </section>

            {/* 4. Course Enrolment & Fees */}
            <section id="enrolment" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Payments
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Course Enrolment &amp; Fees
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  All course fees are quoted on our website and are subject to
                  change. Enrolment is only confirmed once full payment or an
                  agreed payment plan has been processed. Fees do not include
                  CIPS registration fees, exam entry fees, or textbook costs
                  unless explicitly stated.
                </p>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#0B73B9]/10 border border-[#0B73B9]/20 flex items-center justify-center">
                    <CheckCircle2
                      className="w-5 h-5 text-[#0B73B9]"
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">
                      Refund Policy Summary
                    </p>
                    <p className="text-slate-600">
                      We offer a strict{" "}
                      <span className="font-bold text-[#0B73B9]">
                        24-hour money-back guarantee
                      </span>{" "}
                      from the date of initial enrolment. Cancellations after
                      this period or after course materials have been accessed
                      are subject to our detailed Refund Policy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Privacy & Data Protection */}
            <section id="privacy" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Your Data
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Privacy &amp; Data Protection
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  LSHS is committed to protecting your personal data. We process
                  personal data in accordance with our Privacy Policy and the UK
                  General Data Protection Regulation (UK GDPR). By using our
                  Service, you consent to the collection and use of your
                  information as described in our Privacy Policy.
                </p>
              </div>
            </section>

            {/* 6. Disclaimer of Liability */}
            <section id="liability" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Liability
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Disclaimer of Liability
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  The educational services and materials provided by LSHS are
                  for general informational and educational purposes only. While
                  we strive to keep the information up to date and correct, we
                  make no representations or warranties of any kind, express or
                  implied, about the completeness, accuracy, reliability, or
                  availability of the website or services.
                </p>
                <p>
                  LSHS cannot be held liable for any exam failures, loss of
                  career opportunities, or indirect/consequential loss arising
                  from the use of our educational materials. Examination success
                  depends on individual effort and the rigorous standards set by
                  CIPS.
                </p>
              </div>
            </section>

            {/* 7. Changes to Terms */}
            <section id="changes" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Updates
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Changes to Terms
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  We reserve the right to revise these Terms and Conditions at
                  any time. By continuing to access or use our Service after
                  revisions become effective, you agree to be bound by the
                  revised terms. We will update the &quot;Last Updated&quot;
                  date at the top of this page accordingly.
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
                Questions?
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Need Clarification on Our Terms?
              </h2>
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                If you have any questions about these Terms, please contact our
                admissions team for assistance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold tracking-wide uppercase text-[#001B30] bg-white hover:bg-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Contact Admissions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
