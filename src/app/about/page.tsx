"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Target,
  Globe,
  Award,
  Heart,
  Lightbulb,
  Shield,
  ArrowRight,
  Users,
  Sparkles,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  MapPin,
  Building2,
  UserCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Sub-Components ─────────────────────────────────────── */

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="split-word inline-block overflow-hidden pb-2">
          <span
            className="inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}

/* ─── Data ──────────────────────────────────────────────── */

const credentials = [
  "UK-Based",
  "CIPS Approved Centre",
  "Expert Faculty",
  "Flexible Learning",
];

const badges = [
  "CIPS Approved Study Centre",
  "CIPS Approved Exam Centre",
  "CIPS Distance Learning Partner",
  "UK-Qualified Tutors",
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    desc: "We uphold rigorous, internationally benchmarked standards in everything we teach, so every qualification reflects genuine, job-ready capability.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We use modern teaching methods and technology to keep learning flexible, engaging and relevant to how people actually study today.",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "Transparency and ethical conduct guide every interaction we have with students, partners, and awarding bodies alike.",
  },
  {
    icon: Heart,
    title: "Inclusivity",
    desc: "We believe quality education should be accessible to everyone, regardless of background, location or circumstance.",
  },
];

const ceoTags = [
  "Sampan Group MD & CEO",
  "Bangladesh PABX Assoc. SVP",
  "Bangladesh LPG Assoc. VP",
  "Barisal Bulls (BPL) Co-owner",
];

const academicTags = [
  "FHEA (Advance HE, UK)",
  "MBA, University of East London",
  "Teaching Fellow, Arden University",
  "CMI Professional Member",
  "OTHM Honorary Member",
];

/* ─── Main Page Component ───────────────────────────────── */

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    const ctx = gsap.context(() => {
      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      const heroTl = gsap.timeline({ delay: 0.4 });

      heroTl
        .from(".hero-badge", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".split-word span",
          {
            y: "110%",
            opacity: 0,
            rotate: 3,
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.6",
        )
        .from(
          ".hero-desc",
          { opacity: 0, y: 40, duration: 1, ease: "power3.out" },
          "-=0.8",
        )
        .from(
          ".hero-cred",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".hero-badge-item",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6",
        );

      gsap.to(".float-accent", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

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
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-white">
      {/* ═══════════════════════════════════════════════════ 1. HERO ═══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#001B30]"
      >
        <div
          ref={heroBgRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%] scale-105"
        >
          <Image
            src="/about/about.jpg"
            alt="Global Excellence"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#001B30]/70 via-[#001B30]/60 to-[#001B30]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#0B73B9]/20 to-transparent pointer-events-none float-accent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-gradient-to-tl from-[#f4d210]/10 to-transparent pointer-events-none float-accent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32 md:py-40">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <Sparkles size={14} className="text-[#f4d210]" />
            <span className="text-sm font-medium tracking-widest uppercase text-white/60">
              About London School of Higher Studies
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <SplitText
              text="Your Path to Global Excellence"
              className="block"
            />
          </h1>
          <p className="hero-desc text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed font-light mb-8">
            A UK-based CIPS Study Centre, Exam Centre and Distance Learning
            Partner, offering world-class qualifications with expert, flexible
            learning that fits your life.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
            {credentials.map((cred) => (
              <div
                key={cred}
                className="hero-cred flex items-center gap-2.5 text-sm font-medium text-white/80"
              >
                <CheckCircle2
                  className="h-4 w-4 text-[#0B73B9]"
                  strokeWidth={2}
                />
                {cred}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {badges.map((badge) => (
              <div
                key={badge}
                className="hero-badge-item flex items-center gap-2 rounded-lg px-4 py-2.5 border border-white/10 bg-white/[0.04] backdrop-blur-sm"
              >
                <Award className="h-4 w-4 text-[#f4d210]" strokeWidth={2} />
                <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ 2. OUR STORY ═══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-item grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                  Our Story
                </span>
                <div className="w-12 h-0.5 bg-[#0B73B9]" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Our Story
              </h2>
              <div className="space-y-6 text-[15px] text-slate-600 leading-[1.8] mb-10">
                <p>
                  The London School of Higher Studies (LSHS) exists to make
                  globally recognised qualifications genuinely accessible;
                  combining rigorous, industry-aligned training with the
                  flexibility learners need to study alongside work and other
                  commitments.
                </p>
                <p>
                  As a CIPS Approved Study Centre and Exam Centre, we support
                  students at every stage of the procurement and supply chain
                  career path, from a first qualification through to Chartered
                  MCIPS status, delivered through structured distance learning,
                  classroom-based study, or a blend of both.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-8 border-t border-slate-200">
                <MapPin className="w-5 h-5 text-[#0B73B9] flex-shrink-0" />
                <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                  <span className="text-slate-900">UK</span>
                  <span className="mx-2 text-slate-300">&middot;</span>
                  <span className="text-slate-900">Bangladesh</span>
                  <span className="mx-2 text-slate-300">&middot;</span>
                  Serving students across borders
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              {/* Professional Framed Image */}
              <div className="relative p-2 bg-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                  <Image
                    src="/about/story.webp"
                    alt="Our Story"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="reveal-item mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                Our Offices
              </span>
              <div className="w-12 h-0.5 bg-[#0B73B9]" />
            </div>
            <h2
              className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Campus &amp; Offices
            </h2>
          </div>

          {/* Zigzag Side-by-Side Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Office 1: Image Left, Text Right */}
            <div className="reveal-item group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0B73B9]/20 transition-all duration-500">
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Container - Optimized for Tall/PDF images */}
                <div className="relative md:w-2/5 h-[300px] md:h-auto bg-slate-50 flex-shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-slate-100">
                  {/* object-contain ensures the whole "PDF" image is visible without cropping */}
                  <Image
                    src="/about/dhaka.webp"
                    alt="LSHS Dhaka Office"
                    fill
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Mobile Badge Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none md:hidden" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10 md:hidden">
                    <div className="w-7 h-7 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Building2
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wider uppercase">
                      Dhaka
                    </span>
                  </div>
                </div>

                {/* Text Container */}
                <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
                  {/* Desktop Badge */}
                  <div className="hidden md:flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-md bg-[#0B73B9]/10 flex items-center justify-center">
                      <Building2
                        className="w-3.5 h-3.5 text-[#0B73B9]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0B73B9]">
                      Dhaka Campus
                    </span>
                  </div>
                  <h3
                    className="text-xl font-medium text-slate-900 tracking-tight mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    LSHS Dhaka Office
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Our Dhaka office supports learners locally with enrolment
                    guidance, study material distribution and in-person tutor
                    support, alongside full access to CIPS distance learning
                    resources.
                  </p>
                </div>
              </div>
            </div>

            {/* Office 2: Text Left, Image Right (Reversed) */}
            <div className="reveal-item group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0B73B9]/20 transition-all duration-500">
              <div className="flex flex-col md:flex-row-reverse h-full">
                {/* Image Container */}
                <div className="relative md:w-2/5 h-[300px] md:h-auto bg-slate-50 flex-shrink-0 overflow-hidden border-b md:border-b-0 md:border-l border-slate-100">
                  <Image
                    src="/about/kashiani.webp"
                    alt="LSHS Kashiani Office"
                    fill
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Mobile Badge Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none md:hidden" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10 md:hidden">
                    <div className="w-7 h-7 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Building2
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wider uppercase">
                      Kashiani
                    </span>
                  </div>
                </div>

                {/* Text Container */}
                <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
                  {/* Desktop Badge */}
                  <div className="hidden md:flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-md bg-[#0B73B9]/10 flex items-center justify-center">
                      <Building2
                        className="w-3.5 h-3.5 text-[#0B73B9]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0B73B9]">
                      Kashiani Campus
                    </span>
                  </div>
                  <h3
                    className="text-xl font-medium text-slate-900 tracking-tight mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    LSHS Kashiani Office
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    The Kashiani office extends the same enrolment and study
                    support to learners outside Dhaka, with the same access to
                    CIPS-aligned course materials and tutor guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ 4. OUR MISSION ═══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-item relative bg-[#001B30] rounded-2xl p-8 md:p-12 lg:p-16 text-white overflow-hidden">
            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#f4d210]/30 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#f4d210]/30 rounded-br-xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-[80px] bg-[#0B73B9] float-accent pointer-events-none" />

            <div className="md:flex gap-12 lg:gap-16 items-center">
              <div className="relative z-10 md:flex-1">
                <h2
                  className="text-3xl lg:text-4xl font-medium mb-6 tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Our Mission
                </h2>
                <p className="text-[15px] text-white/60 leading-[1.8] mb-10">
                  To deliver globally recognised education that equips students
                  with the knowledge, skills and confidence to succeed
                  academically and professionally, in an increasingly
                  competitive international job market.
                </p>
                <Link
                  href="/courses"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0B73B9] text-white rounded-lg text-sm font-semibold tracking-wider uppercase transition-all hover:bg-[#085C92] hover:shadow-lg hover:shadow-[#0B73B9]/20"
                >
                  Explore Our Programmes{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
              <div className="relative z-10 mt-10 md:mt-0 md:w-[400px] lg:w-[450px] flex-shrink-0">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="/about/mission.jpg"
                    alt="Our Mission"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ 5. VALUES ═══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-item text-center mb-14 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-[#0B73B9]" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#0B73B9]">
                Principles
              </span>
              <div className="w-8 h-0.5 bg-[#0B73B9]" />
            </div>
            <h2
              className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="reveal-item group relative p-6 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-[#0B73B9]/20 hover:bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-[#0B73B9] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0B73B9]/5 text-[#0B73B9] mb-4 group-hover:bg-[#0B73B9]/10 transition-colors duration-300">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2 tracking-tight">
                    {val.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ 6. LEADERSHIP (REDESIGNED) ═══════════════════════════════════════ */}
      <section className="bg-slate-50 py-20 md:py-28 px-6 md:px-12 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="reveal-item text-center mb-16 md:mb-20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-[#0B73B9]" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#0B73B9]">
                The Team
              </span>
              <div className="w-8 h-0.5 bg-[#0B73B9]" />
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Leadership
            </h2>
          </div>

          <div className="space-y-12 md:space-y-16">
            {/* ── CEO ── */}
            <div className="reveal-item grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Compact Image */}
              <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-end">
                <div className="relative w-40 h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg flex-shrink-0">
                  <Image
                    src="/ceo/ceo.jfif"
                    alt="Md. Emamul Hasan"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Divider Line (Hidden on mobile) */}
              <div className="hidden md:block w-px h-full min-h-[200px] bg-slate-200" />

              {/* Content */}
              <div className="md:col-span-7 lg:col-span-8">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="h-4 w-4 text-[#f4d210]" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#f4d210]">
                    Managing Director & CEO
                  </span>
                </div>
                <h3
                  className="text-2xl lg:text-3xl font-medium text-slate-900 tracking-tight mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Md. Emamul Hasan
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">
                  LSHS &middot; Chairman &amp; CEO, Sampan Group
                </p>

                <div className="space-y-4 text-slate-600 leading-[1.8] text-[14px] mb-8">
                  <p>
                    Md. Emamul Hasan is an entrepreneur and business leader with
                    interests spanning petrochemicals, hospitality, real estate,
                    agro-business and education across Bangladesh, as Chairman
                    of Sampan Group. He is the Managing Director of the London
                    School of Higher Studies, a CIPS Approved Study, Exam and
                    Distance Learning Centre.
                  </p>
                  <p>
                    His other roles include ownership of Sampan Agro &amp; Golf
                    Resort and Express Highway Inn, and leadership positions
                    with the Bangladesh PABX Association, Bangladesh LPG
                    Association, and Barisal Bulls (BPL).
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {ceoTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-500"
                    >
                      <CheckCircle2 className="h-3 w-3 text-[#0B73B9]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Academic Director ── */}
            <div className="reveal-item grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Content */}
              <div className="md:col-span-7 lg:col-span-8 order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-4 w-4 text-[#0B73B9]" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#0B73B9]">
                    Academic Director & COO
                  </span>
                </div>
                <h3
                  className="text-2xl lg:text-3xl font-medium text-slate-900 tracking-tight mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Muhammad Haque
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">
                  LSHS &middot; Teaching Fellow, Arden University UK
                </p>

                <div className="space-y-4 text-slate-600 leading-[1.8] text-[14px] mb-8">
                  <p>
                    Md. Muhammad Haque leads LSHS&apos;s academic delivery,
                    bringing direct experience from UK higher education. He
                    holds an MBA from the University of East London, is a Fellow
                    of Advance HE (FHEA), and is a professional member of the
                    Chartered Institute of Management, UK.
                  </p>
                  <p>
                    He currently serves as a Teaching Fellow at Arden University
                    and previously lectured at Canterbury Christ Church
                    University, alongside programme involvement at institutions
                    including UCL, the University of Leeds, and Coventry
                    University.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {academicTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0B73B9]"
                    >
                      <CheckCircle2 className="h-3 w-3 text-[#0B73B9]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider Line (Hidden on mobile) */}
              <div className="hidden md:block w-px h-full min-h-[200px] bg-slate-200 order-1 md:order-2" />

              {/* Compact Image */}
              <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start order-1 md:order-3">
                <div className="relative w-40 h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg flex-shrink-0">
                  <Image
                    src="/ceo/coo.webp"
                    alt="Muhammad Haque"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ 7. TUTORS ═══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-item text-center mb-14 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-[#0B73B9]" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#0B73B9]">
                Expert Team
              </span>
              <div className="w-8 h-0.5 bg-[#0B73B9]" />
            </div>
            <h2
              className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              LSHS Trainers
            </h2>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Our programmes are delivered by qualified professionals with
              direct industry and academic experience in procurement and supply
              chain management.
            </p>
          </div>
          <div className="reveal-item grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "CIPS-Qualified Tutors",
                desc: "All trainers hold relevant CIPS qualifications and bring real-world procurement expertise to every session.",
                icon: UserCheck,
              },
              {
                name: "Industry Practitioners",
                desc: "Our team includes working professionals who apply procurement and supply chain principles daily in global organisations.",
                icon: Briefcase,
              },
              {
                name: "Academic Specialists",
                desc: "Selected tutors hold UK teaching fellowships and higher education credentials, ensuring academic rigour in every module.",
                icon: GraduationCap,
              },
            ].map((tutor, i) => {
              const Icon = tutor.icon;
              return (
                <div
                  key={i}
                  className="group p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-[#0B73B9]/20 hover:bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0B73B9]/5 text-[#0B73B9] mb-4 group-hover:bg-[#0B73B9]/10 transition-colors duration-300">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2 tracking-tight">
                    {tutor.name}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {tutor.desc}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="reveal-item text-center mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0B73B9] hover:text-[#085C92] transition-colors"
            >
              Get in touch to learn about our tutoring team{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ 8. CLOSING CTA ═══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl reveal-item">
          <div className="absolute inset-0 bg-[#001B30]" />
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
            alt="Office Background"
            fill
            className="object-cover opacity-10"
            unoptimized
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-[100px] bg-[#0B73B9] pointer-events-none float-accent" />
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-5 blur-[80px] bg-[#f4d210] pointer-events-none float-accent" />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f4d210] mb-4">
                Take the Next Step
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ready to Begin Your Journey?
              </h2>
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                Explore our CIPS qualifications and take the next step toward
                globally recognised professional status.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold tracking-wide uppercase text-[#001B30] bg-white hover:bg-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                View Our Courses <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold tracking-wide uppercase text-white border border-white/20 hover:bg-white/5 backdrop-blur-sm transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
