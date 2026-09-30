"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ShieldCheck,
  Cookie,
  Database,
  Lock,
  UserCheck,
  Eye,
  Trash2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────── */

const tocItems = [
  { id: "introduction", label: "Introduction" },
  { id: "collect", label: "Information We Collect" },
  { id: "use", label: "How We Use Your Data" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "sharing", label: "Data Sharing" },
  { id: "security", label: "Data Security" },
  { id: "rights", label: "Your Rights" },
  { id: "changes", label: "Changes to Policy" },
];

const quickInfo = [
  {
    icon: Database,
    title: "Data We Collect",
    desc: "Personal identifiers, contact details, and course progress data strictly necessary for enrolment.",
    color: "blue",
  },
  {
    icon: Cookie,
    title: "Cookies Policy",
    desc: "We use minimal cookies to ensure secure portal access and analyze website traffic for improvements.",
    color: "gold",
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    desc: "Under UK GDPR, you have full rights to access, correct, or request deletion of your personal data.",
    color: "blue",
  },
];

const userRights = [
  "The right to be informed about how your data is used.",
  "The right of access to your personal data.",
  "The right to rectification if data is inaccurate or incomplete.",
  "The right to erasure ('the right to be forgotten').",
  "The right to restrict or object to our processing of your data.",
  "The right to data portability.",
];

/* ─── Main Page Component ───────────────────────────────── */

export default function PrivacyPage() {
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
            <Lock size={14} className="text-[#f4d210]" />
            <span className="text-sm font-medium tracking-widest uppercase text-white/60">
              Legal Policy
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-title text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Privacy &amp; Data Protection
          </h1>

          {/* Sub-headline */}
          <p className="hero-desc text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
            Your privacy is paramount to us. Learn how we collect, use, and
            protect your personal data in accordance with UK GDPR regulations.
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
            {/* 1. Introduction */}
            <section id="introduction" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Overview
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Introduction
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  The London School of Higher Studies (LSHS) is committed to
                  protecting the privacy and security of your personal data.
                  This Privacy Policy explains how we collect, use, and disclose
                  your information when you use our website, enroll in our
                  courses, or interact with our student services.
                </p>
                <p>
                  We comply with the UK General Data Protection Regulation (UK
                  GDPR) and the Data Protection Act 2018. By using our services,
                  you consent to the practices described in this policy.
                </p>
              </div>
            </section>

            {/* 2. Information We Collect */}
            <section id="collect" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Data Collection
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Information We Collect
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  We collect various types of information to provide and improve
                  our educational services:
                </p>
                <ul className="space-y-4 pl-1">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0B73B9]/10 text-[#0B73B9] flex items-center justify-center mt-0.5">
                      <Database className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="font-bold text-slate-900">
                        Personal Identifiers:
                      </span>{" "}
                      Name, date of birth, email address, phone number, and
                      postal address.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0B73B9]/10 text-[#0B73B9] flex items-center justify-center mt-0.5">
                      <Database className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="font-bold text-slate-900">
                        Enrolment & Education Data:
                      </span>{" "}
                      Course progress, assessment results, CIPS registration
                      numbers, and qualifications achieved.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0B73B9]/10 text-[#0B73B9] flex items-center justify-center mt-0.5">
                      <Database className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="font-bold text-slate-900">
                        Technical Data:
                      </span>{" "}
                      IP address, browser type, operating system, and usage
                      patterns on the LSHS learning portal.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. How We Use Your Data */}
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
                How We Use Your Data
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  LSHS processes your personal data for the following legitimate
                  purposes:
                </p>
                <ul className="space-y-4 pl-1">
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B73B9] mt-2.5 flex-shrink-0"></span>
                    <span>
                      Processing your course enrolment, payments, and delivering
                      educational services.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B73B9] mt-2.5 flex-shrink-0"></span>
                    <span>
                      Registering you with the Chartered Institute of
                      Procurement &amp; Supply (CIPS) for examinations and
                      membership.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B73B9] mt-2.5 flex-shrink-0"></span>
                    <span>
                      Providing academic support, tracking progress, and issuing
                      certificates.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B73B9] mt-2.5 flex-shrink-0"></span>
                    <span>
                      Sending important administrative updates, course news, and
                      regulatory compliance notices.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Cookies & Tracking */}
            <section id="cookies" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Tracking
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Cookies &amp; Tracking Technologies
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  We use cookies and similar tracking technologies to track the
                  activity on our Service and store certain information. Cookies
                  are files with a small amount of data which may include an
                  anonymous unique identifier.
                </p>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#f4d210]/10 border border-[#f4d210]/20 flex items-center justify-center">
                    <Cookie
                      className="w-5 h-5 text-[#b58b00]"
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">
                      Managing Cookies
                    </p>
                    <p className="text-slate-600">
                      You can instruct your browser to refuse all cookies or to
                      indicate when a cookie is being sent. However, if you do
                      not accept cookies, you may not be able to use some
                      portions of our learning portal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Data Sharing */}
            <section id="sharing" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Third Parties
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Data Sharing &amp; Third Parties
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  LSHS does not sell your personal data. We only share your
                  information with third parties when necessary to provide our
                  educational services:
                </p>
                <ul className="space-y-4 pl-1">
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B73B9] mt-2.5 flex-shrink-0"></span>
                    <span>
                      <span className="font-bold text-slate-900">CIPS:</span>{" "}
                      Sharing enrolment and exam entry data with the Chartered
                      Institute of Procurement &amp; Supply.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B73B9] mt-2.5 flex-shrink-0"></span>
                    <span>
                      <span className="font-bold text-slate-900">
                        Payment Processors:
                      </span>{" "}
                      Securely processing course fees via Stripe, PayPal, or
                      bank transfer gateways.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B73B9] mt-2.5 flex-shrink-0"></span>
                    <span>
                      <span className="font-bold text-slate-900">
                        Legal Obligations:
                      </span>{" "}
                      Disclosing data if required by UK law or regulatory
                      authorities.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 6. Data Security */}
            <section id="security" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Protection
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Data Security
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  We implement administrative, technical, and physical security
                  measures designed to protect your personal data against
                  unauthorized access, alteration, disclosure, or destruction.
                  These measures include SSL encryption for all data transfers,
                  secure password protocols, and restricted internal access to
                  student records.
                </p>
              </div>
            </section>

            {/* 7. Your Rights */}
            <section id="rights" className="reveal-item scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  UK GDPR
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Your Data Protection Rights
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  Under the UK GDPR, you have specific rights regarding your
                  personal data. To exercise any of these rights, please contact
                  our admissions team.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {userRights.map((right, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg"
                    >
                      <Eye
                        className="w-4 h-4 text-[#0B73B9] flex-shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-slate-700 font-medium">
                        {right}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 8. Changes to This Policy */}
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
                Changes to This Privacy Policy
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &quot;Last Updated&quot; date. You
                  are advised to review this Privacy Policy periodically for any
                  changes.
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
                Data Request?
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Need to Exercise Your Data Rights?
              </h2>
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                Contact our data protection team to access, update, or request
                deletion of your personal information.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold tracking-wide uppercase text-[#001B30] bg-white hover:bg-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Contact DPO
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
