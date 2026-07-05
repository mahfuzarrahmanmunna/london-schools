"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronRight,
  Globe,
  Award,
  Users,
  BookOpen,
  Target,
  Heart,
  Lightbulb,
  Shield,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Quote,
  Sparkles,
  CircleDot,
} from "lucide-react";
import CipsCoursesBanner from "@/app/components/ApprenticeshipsBanner/ApprenticeshipsBanner";

gsap.registerPlugin(ScrollTrigger);

// ─── Color Tokens ────────────────────────────────
const C = {
  navy: "#002E4D",
  navyLight: "#0A4D73",
  navyDark: "#001B30",
  navy50: "#E8EDF3",
  cips: "#0975b7",
  cipsLight: "#00BCD4",
  cipsDark: "#007887",
  gold: "#D4A843",
  goldLight: "#E8C468",
  goldDark: "#B08A30",
};

// ─── Data ────────────────────────────────────────
const teamFeatured = [
  {
    name: "Akash Ghosh",
    role: "Director Digital Marketing & IT",
    initials: "AG",
  },
  { name: "MD. Omar Khayum", role: "AGM Sales", initials: "OK" },
  { name: "Mehedi Hasan Rony", role: "Senior Visualizer", initials: "MR" },
  {
    name: "Md Merazul Islam",
    role: "International Sales Executive",
    initials: "MI",
  },
  {
    name: "Sayma Haque",
    role: "International Sales Executive",
    initials: "SH",
  },
  {
    name: "Raysha Siddika",
    role: "International Sales Executive",
    initials: "RS",
  },
  {
    name: "Samia Haque",
    role: "International Sales Executive",
    initials: "SaH",
  },
  { name: "Arin Kazi", role: "International Sales Executive", initials: "AK" },
];

const teamExtended = [
  {
    name: "Tazrian Ariya",
    role: "International Sales Executive",
    initials: "TA",
  },
  { name: "Atiqur Rahman", role: "Assistant Manager Sales", initials: "AR" },
  { name: "Bakhtiyar Sakil", role: "Junior Executive", initials: "BS" },
  { name: "Joy Iqbal", role: "Junior Executive Sales", initials: "JI" },
];

const credentials = [
  "FHEA — Advance HE, UK",
  "MBA — University of East London",
  "Teaching Fellow — Arden University",
  "CMI Professional Membership",
  "OTHM Honorary Membership",
];

const highlights = [
  "CIPS-UK Approved Study Centre",
  "CIPS-UK Approved Exam Centre",
  "CIPS-UK Distance Learning Partner",
  "Hospitality & Tourism Programs",
  "Soft-Skill Development Courses",
  "Expert UK-Based Tutors",
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    desc: "Upholding the highest standards in education with globally benchmarked learning experiences that prepare students for international success.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Embracing modern methodologies and technology to create engaging, flexible, and forward-thinking educational pathways.",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "Transparency and ethical conduct form the foundation of every interaction with students, partners, and institutions.",
  },
  {
    icon: Heart,
    title: "Inclusivity",
    desc: "Education accessible to all — fostering a diverse learning community regardless of background, location, or circumstance.",
  },
];

// ─── Component ───────────────────────────────────
export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const ceoRef = useRef<HTMLDivElement>(null);
  const academicRef = useRef<HTMLDivElement>(null);
  const teamHeaderRef = useRef<HTMLDivElement>(null);
  const teamRow1Ref = useRef<HTMLDivElement>(null);
  const teamRow2Ref = useRef<HTMLDivElement>(null);
  const teamRow3Ref = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      if (heroRef.current) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          heroRef.current.querySelector(".hero-line"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, transformOrigin: "left center" },
          0,
        );
        tl.fromTo(
          heroRef.current.querySelectorAll(".hero-anim"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          0.2,
        );
      }

      // Highlights
      if (highlightsRef.current) {
        gsap.fromTo(
          highlightsRef.current.querySelectorAll(".hl-item"),
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: highlightsRef.current, start: "top 85%" },
          },
        );
      }

      // CEO
      if (ceoRef.current) {
        gsap.fromTo(
          ceoRef.current.querySelectorAll(".ceo-anim"),
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ceoRef.current, start: "top 78%" },
          },
        );
      }

      // Academic
      if (academicRef.current) {
        gsap.fromTo(
          academicRef.current.querySelectorAll(".ac-anim"),
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: academicRef.current, start: "top 78%" },
          },
        );
      }

      // Team header
      if (teamHeaderRef.current) {
        gsap.fromTo(
          teamHeaderRef.current.querySelectorAll(".th-anim"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: teamHeaderRef.current, start: "top 85%" },
          },
        );
      }

      // Team rows — stagger from sides
      [teamRow1Ref, teamRow2Ref, teamRow3Ref].forEach((ref, rowIdx) => {
        if (!ref.current) return;
        const fromX = rowIdx % 2 === 0 ? -25 : 25;
        gsap.fromTo(
          ref.current.querySelectorAll(".tm"),
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 88%" },
          },
        );
      });

      // Story + Mission
      [storyRef, missionRef].forEach((ref) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current.querySelectorAll(".sm-anim"),
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: ref.current, start: "top 80%" },
            },
          );
        }
      });

      // Values
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll(".val-card"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: valuesRef.current, start: "top 80%" },
          },
        );
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
          },
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-white">
      {/* ═══ BREADCRUMB ═══ */}
      <div className="border-b border-slate-100 bg-[#E8EDF3]/30">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <nav className="flex items-center gap-1.5 text-[12px] text-slate-400">
            <Link href="/" className="hover:text-[#002E4D] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#002E4D] font-medium">About Us</span>
          </nav>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${C.navyDark} 0%, ${C.navy} 40%, ${C.navyLight} 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.06] blur-[100px] pointer-events-none"
          style={{ backgroundColor: C.gold }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-[0.04] blur-[80px] pointer-events-none"
          style={{ backgroundColor: C.cipsLight }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div
            className="hero-line h-[2px] w-16 mb-8 rounded-full"
            style={{ backgroundColor: C.gold, transform: "scaleX(0)" }}
          />

          <p
            className="hero-anim text-[11px] font-bold uppercase tracking-[0.3em] mb-5"
            style={{ color: C.gold, opacity: 0 }}
          >
            About London School of Higher Studies
          </p>

          <h1
            className="hero-anim text-[36px] sm:text-5xl lg:text-[60px] font-bold text-white leading-[1.05] tracking-tight mb-6 max-w-4xl"
            style={{ opacity: 0 }}
          >
            Your Path to
            <br />
            <span style={{ color: C.goldLight }}>Global Excellence.</span>
          </h1>

          <p
            className="hero-anim text-[16px] sm:text-[17px] text-white/40 leading-[1.8] max-w-2xl mb-12"
            style={{ opacity: 0 }}
          >
            A UK-based CIPS Study Center, Exam Centre & Distance Learning
            Partner — offering world-class qualifications with expert, flexible
            learning that fits your life.
          </p>

          <div
            className="hero-anim flex flex-wrap gap-3"
            style={{ opacity: 0 }}
          >
            {[
              { icon: Globe, label: "UK-Based" },
              { icon: Award, label: "CIPS Approved" },
              { icon: Users, label: "Expert Faculty" },
              { icon: BookOpen, label: "Flexible Learning" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-lg px-4 py-2.5 border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                >
                  <Icon className="h-4 w-4" style={{ color: C.gold }} />
                  <span className="text-[12px] font-semibold text-white/70">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ═══ HIGHLIGHTS BAR ═══ */}
      <section className="relative -mt-6 z-10 mx-auto max-w-6xl px-6 mb-16">
        <div
          ref={highlightsRef}
          className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {highlights.map((item) => (
              <div
                key={item}
                className="hl-item flex items-center gap-2.5"
                style={{ opacity: 0 }}
              >
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-md flex-shrink-0"
                  style={{
                    backgroundColor: C.cips + "0D",
                    color: C.cips,
                  }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-[12px] font-medium text-[#002E4D] leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEADERSHIP: CEO ═══ */}
      <section className="mx-auto max-w-6xl px-6 mb-20 lg:mb-28">
        <div
          ref={ceoRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
        >
          <div className="lg:col-span-4 ceo-anim" style={{ opacity: 0 }}>
            <div className="sticky top-8">
              <div className="relative">
                <div
                  className="absolute -top-4 -left-4 right-4 bottom-4 rounded-2xl -z-10"
                  style={{ backgroundColor: C.gold + "12" }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden border border-slate-200/80 aspect-[3/4] flex items-center justify-center"
                  style={{
                    background: `linear-gradient(180deg, ${C.navy50}, white)`,
                  }}
                >
                  <div className="text-center px-6">
                    <div
                      className="flex h-32 w-32 items-center justify-center rounded-full text-[42px] font-bold text-white mx-auto mb-5"
                      style={{
                        backgroundColor: C.navy,
                        boxShadow: `0 16px 50px ${C.navy}35`,
                      }}
                    >
                      EH
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div
                        className="h-[1px] w-6"
                        style={{ backgroundColor: C.gold }}
                      />
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.25em]"
                        style={{ color: C.gold }}
                      >
                        Leadership
                      </span>
                      <div
                        className="h-[1px] w-6"
                        style={{ backgroundColor: C.gold }}
                      />
                    </div>
                    <p className="text-[12px] text-slate-400 font-medium mt-2">
                      Managing Director & CEO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="ceo-anim" style={{ opacity: 0 }}>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.25em] mb-3"
                style={{ color: C.gold }}
              >
                Managing Director & CEO
              </p>
              <h2 className="text-[28px] sm:text-[34px] font-bold text-[#002E4D] tracking-tight leading-[1.15] mb-2">
                Md. Emamul Hasan
              </h2>
              <p className="text-[13px] font-medium text-[#0975b7] mb-8">
                Chairman, SAMPAN Group
              </p>
            </div>

            <div className="ceo-anim space-y-5" style={{ opacity: 0 }}>
              <p className="text-[14px] text-slate-600 leading-[1.85]">
                Mr. Hasan is a distinguished entrepreneur, visionary corporate
                leader, and dedicated social worker with impactful contributions
                across petrochemicals, pet & beverage, hollow bricks & tiles,
                hospitality, real estate, education, and agro-business in
                Bangladesh. He leads SAMPAN Group&apos;s diverse portfolio of
                successful ventures.
              </p>
              <p className="text-[14px] text-slate-600 leading-[1.85]">
                He is the Owner of Sampan Agro & Golf Resort and Express Highway
                Inn, and the Acting Director & President of Express Highway Club
                & Lounge. He serves as Managing Director of SAMPAN Highway Inn —
                serving over 5,000 guests daily — and Managing Director of the
                London School of Higher Studies, a prestigious CIPS-UK-approved
                study, exam, and distance-learning center.
              </p>
            </div>

            <div className="ceo-anim" style={{ opacity: 0 }}>
              <p className="text-[14px] text-slate-600 leading-[1.85] mt-5">
                Hasan holds notable leadership roles including Senior Vice
                President of Bangladesh PABX Association, Joint Secretary of
                BADIA & Shooters Club Ltd, Vice President of Bangladesh LPG
                Association, and Co-owner of Barisal Bulls (BPL). Honored as the
                highest tax & VAT payer in Dhaka Zone-03, he is widely respected
                for his philanthropy — supporting mosque development, flood
                relief, and organic agro-food initiatives.
              </p>
            </div>

            <div
              className="ceo-anim flex flex-wrap gap-2 mt-8"
              style={{ opacity: 0 }}
            >
              {[
                "SAMPAN Group — MD & CEO",
                "Bangladesh PABX Assoc. — SVP",
                "Bangladesh LPG Assoc. — VP",
                "Barisal Bulls (BPL) — Co-owner",
                "Highest Tax Payer — Dhaka Zone-03",
              ].map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center rounded-md border border-slate-200 bg-[#E8EDF3]/50 px-3 py-1.5 text-[11px] font-medium text-[#002E4D]"
                >
                  <CircleDot
                    className="h-2.5 w-2.5 mr-1.5 flex-shrink-0"
                    style={{ color: C.gold }}
                  />
                  {role}
                </span>
              ))}
            </div>

            <div
              className="ceo-anim mt-10 relative rounded-xl overflow-hidden"
              style={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${C.navyDark}, ${C.navy})`,
                }}
              />
              <div className="relative px-8 py-7 flex items-start gap-5">
                <Quote
                  className="h-8 w-8 flex-shrink-0 mt-0.5"
                  style={{ color: C.gold + "40" }}
                />
                <div>
                  <p className="text-[17px] font-medium text-white/90 italic leading-relaxed mb-2">
                    &ldquo;The village will become the city.&rdquo;
                  </p>
                  <p className="text-[12px] text-white/30 font-medium">
                    — Md. Emamul Hasan, Managing Director & CEO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LEADERSHIP: ACADEMIC MANAGER ═══ */}
      <section className="relative overflow-hidden mb-20 lg:mb-28">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: C.navy50 + "40" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #002E4D 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div
            ref={academicRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
          >
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
              <div className="ac-anim" style={{ opacity: 0 }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0975b7] mb-3">
                  Academic Manager
                </p>
                <h2 className="text-[28px] sm:text-[34px] font-bold text-[#002E4D] tracking-tight leading-[1.15] mb-2">
                  Md. Muhammad Haque
                </h2>
                <p className="text-[13px] font-medium text-slate-400 mb-8">
                  Teaching Fellow, Arden University UK
                </p>
              </div>

              <div className="ac-anim space-y-5" style={{ opacity: 0 }}>
                <p className="text-[14px] text-slate-600 leading-[1.85]">
                  A dynamic professional driven by a passion for excellence in
                  Higher Education and Business Management & Marketing. With an
                  MBA from the University of East London, PgD, and DET, he
                  possesses a solid foundation in both higher education and
                  business.
                </p>
                <p className="text-[14px] text-slate-600 leading-[1.85]">
                  Currently serving as a Teaching Fellow at Arden University,
                  UK, he previously held the position of Lecturer at Canterbury
                  Christ Church University. His dedication has been recognized
                  through the Fellow (FHEA) designation from Advance HE, UK, and
                  Professional Membership with the Chartered Institute of
                  Management, UK.
                </p>
              </div>

              <div className="ac-anim" style={{ opacity: 0 }}>
                <p className="text-[14px] text-slate-600 leading-[1.85] mt-5">
                  Honored with an Honorary Membership from OTHM Qualifications,
                  UK, he has participated in programs at The Open University,
                  Manchester Metropolitan University, UCL, University of Leeds,
                  British Council, Coventry University, Royal College of Art,
                  and The University of Glasgow.
                </p>
              </div>

              <div
                className="ac-anim flex flex-wrap gap-2 mt-8"
                style={{ opacity: 0 }}
              >
                {credentials.map((cred) => (
                  <span
                    key={cred}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#0975b7]/15 bg-white px-3.5 py-2 text-[11px] font-semibold text-[#0975b7] shadow-sm"
                  >
                    <GraduationCap className="h-3 w-3" />
                    {cred}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="lg:col-span-5 ac-anim order-1 lg:order-2"
              style={{ opacity: 0 }}
            >
              <div className="lg:sticky lg:top-8">
                <div className="relative">
                  <div
                    className="absolute -top-4 -right-4 left-4 bottom-4 rounded-2xl -z-10"
                    style={{ backgroundColor: C.navy + "08" }}
                  />
                  <div
                    className="relative rounded-2xl overflow-hidden border border-slate-200/80 aspect-[3/4] flex items-center justify-center"
                    style={{
                      background: `linear-gradient(180deg, white, ${C.navy50})`,
                    }}
                  >
                    <div className="text-center px-6">
                      <div
                        className="flex h-32 w-32 items-center justify-center rounded-full text-[42px] font-bold text-white mx-auto mb-5"
                        style={{
                          backgroundColor: C.cips,
                          boxShadow: `0 16px 50px ${C.cips}35`,
                        }}
                      >
                        MH
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div
                          className="h-[1px] w-6"
                          style={{ backgroundColor: C.cips }}
                        />
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0975b7]">
                          Academics
                        </span>
                        <div
                          className="h-[1px] w-6"
                          style={{ backgroundColor: C.cips }}
                        />
                      </div>
                      <p className="text-[12px] text-slate-400 font-medium mt-2">
                        Academic Manager
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="mx-auto max-w-6xl px-6 mb-20 lg:mb-28">
        <div ref={teamHeaderRef} className="text-center mb-16">
          <p
            className="th-anim text-[11px] font-bold uppercase tracking-[0.3em] text-[#0975b7] mb-4"
            style={{ opacity: 0 }}
          >
            Our People
          </p>
          <h2
            className="th-anim text-[30px] sm:text-[38px] font-bold text-[#002E4D] tracking-tight leading-[1.1] mb-4"
            style={{ opacity: 0 }}
          >
            Meet the Team
          </h2>
          <p
            className="th-anim text-[15px] text-slate-400 max-w-md mx-auto leading-relaxed"
            style={{ opacity: 0 }}
          >
            The passionate experts behind our mission, united by a commitment to
            delivering excellence.
          </p>
        </div>

        {/* Row 1 — 4 featured */}
        <div
          ref={teamRow1Ref}
          className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8 mb-10 sm:mb-12"
        >
          {teamFeatured.slice(0, 4).map((member, i) => (
            <div
              key={member.name}
              className="tm flex flex-col items-center text-center group"
              style={{ opacity: 0 }}
            >
              <div className="relative mb-5">
                {/* Ring on hover */}
                <div
                  className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from 0deg, ${C.cips}, ${C.cipsLight}, ${C.cips})`,
                    opacity: 0,
                  }}
                />
                <div
                  className="relative flex h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] items-center justify-center rounded-full text-[28px] sm:text-[32px] font-bold text-white transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundColor: C.navy,
                    boxShadow: `0 8px 30px ${C.navy}25`,
                  }}
                >
                  {member.initials}
                </div>
              </div>
              <h4 className="text-[14px] sm:text-[15px] font-semibold text-[#002E4D] leading-tight mb-1.5 group-hover:text-[#0975b7] transition-colors duration-300">
                {member.name}
              </h4>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 leading-snug">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* Row 2 — 4 featured */}
        <div
          ref={teamRow2Ref}
          className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8 mb-14 sm:mb-16"
        >
          {teamFeatured.slice(4, 8).map((member, i) => (
            <div
              key={member.name}
              className="tm flex flex-col items-center text-center group"
              style={{ opacity: 0 }}
            >
              <div className="relative mb-5">
                <div
                  className="relative flex h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] items-center justify-center rounded-full text-[28px] sm:text-[32px] font-bold text-white transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundColor: C.cips,
                    boxShadow: `0 8px 30px ${C.cips}25`,
                  }}
                >
                  {member.initials}
                </div>
              </div>
              <h4 className="text-[14px] sm:text-[15px] font-semibold text-[#002E4D] leading-tight mb-1.5 group-hover:text-[#0975b7] transition-colors duration-300">
                {member.name}
              </h4>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 leading-snug">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* Row 3 — extended team, smaller */}
        <div ref={teamRow3Ref} className="pt-12 border-t border-slate-100">
          <p
            className="tm text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 text-center mb-8"
            style={{ opacity: 0 }}
          >
            Also Part of Our Team
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8">
            {teamExtended.map((member) => (
              <div
                key={member.name}
                className="tm flex flex-col items-center text-center group"
                style={{ opacity: 0 }}
              >
                <div className="relative mb-4">
                  <div
                    className="flex h-[80px] w-[80px] sm:h-[90px] sm:w-[90px] items-center justify-center rounded-full text-[22px] sm:text-[24px] font-bold text-white/80 transition-all duration-400 group-hover:scale-105 group-hover:text-white"
                    style={{ backgroundColor: C.navyLight }}
                  >
                    {member.initials}
                  </div>
                </div>
                <h4 className="text-[13px] sm:text-[14px] font-medium text-[#002E4D] leading-tight mb-1 group-hover:text-[#0975b7] transition-colors duration-300">
                  {member.name}
                </h4>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 leading-snug">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STORY + MISSION ═══ */}
      <section className="relative overflow-hidden mb-20 lg:mb-28">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: C.navyDark }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
          style={{ backgroundColor: C.cips }}
        />
        <div
          className="absolute top-1/3 right-0 w-72 h-72 translate-x-1/3 rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
          style={{ backgroundColor: C.gold }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div ref={storyRef}>
              <div
                className="sm-anim flex items-center gap-3.5 mb-6"
                style={{ opacity: 0 }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: C.gold,
                  }}
                >
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-[22px] font-bold text-white tracking-tight">
                  Our Story
                </h3>
              </div>
              <div className="sm-anim" style={{ opacity: 0 }}>
                <p className="text-[15px] text-white/45 leading-[1.85]">
                  The London School of Higher Studies (LSHS) is committed to
                  providing globally recognized education, empowering students
                  with knowledge, skills, and opportunities to achieve academic
                  excellence and professional success worldwide.
                </p>
              </div>
              <div
                className="sm-anim mt-8 flex items-center gap-4"
                style={{ opacity: 0 }}
              >
                <div className="flex -space-x-2">
                  {[C.navy, C.cips, C.gold].map((c, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ borderColor: C.navyDark, backgroundColor: c }}
                    >
                      {["UK", "BD", "Global"][i]}
                    </div>
                  ))}
                </div>
                <span className="text-[12px] text-white/30">
                  Serving students across borders
                </span>
              </div>
            </div>

            <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-[1px] bg-white/[0.06]" />

            <div ref={missionRef}>
              <div
                className="sm-anim flex items-center gap-3.5 mb-6"
                style={{ opacity: 0 }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: C.cipsLight,
                  }}
                >
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-[22px] font-bold text-white tracking-tight">
                  Our Mission
                </h3>
              </div>
              <div className="sm-anim" style={{ opacity: 0 }}>
                <p className="text-[15px] text-white/45 leading-[1.85]">
                  LSHS strives to deliver globally recognized education,
                  equipping students with knowledge, skills, and opportunities
                  to excel academically and professionally in a competitive
                  international landscape.
                </p>
              </div>
              <div className="sm-anim mt-8" style={{ opacity: 0 }}>
                <Link
                  href="/apprenticeships"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/60 hover:text-white transition-colors group"
                >
                  Explore our programmes
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="mx-auto max-w-6xl px-6 mb-20 lg:mb-28">
        <div className="text-center mb-12">
          <p
            className="val-card text-[11px] font-bold uppercase tracking-[0.25em] text-[#0975b7] mb-3"
            style={{ opacity: 0 }}
          >
            What We Stand For
          </p>
          <h2
            className="val-card text-[28px] sm:text-[34px] font-bold text-[#002E4D] tracking-tight"
            style={{ opacity: 0 }}
          >
            Our Values
          </h2>
        </div>

        <div
          ref={valuesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {values.map((val, i) => {
            const Icon = val.icon;
            const colors = [C.gold, C.cips, C.navy, C.cipsLight];
            const color = colors[i];
            return (
              <div
                key={val.title}
                className="val-card group relative rounded-2xl border border-slate-100 bg-white p-7 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-500 overflow-hidden"
                style={{ opacity: 0 }}
              >
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
                  style={{ backgroundColor: color + "12" }}
                />
                <div className="relative">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl mb-5 transition-transform duration-400 group-hover:scale-110"
                    style={{ backgroundColor: color + "0D", color }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-[16px] font-bold text-[#002E4D] mb-2.5 tracking-tight">
                    {val.title}
                  </h4>
                  <p className="text-[13px] text-slate-400 leading-[1.8]">
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="val-card mt-10 rounded-2xl border border-slate-100 bg-white p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
          style={{ opacity: 0 }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0"
            style={{ backgroundColor: C.gold + "0D", color: C.gold }}
          >
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="text-[15px] font-semibold text-[#002E4D] leading-relaxed">
            At LSHS, we are committed to empowering students with global
            knowledge, fostering lifelong learning, and preparing them for
            success in an evolving world.
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="mx-auto max-w-6xl px-6 mb-20 lg:mb-28">
        <div
          ref={ctaRef}
          className="relative rounded-2xl overflow-hidden"
          style={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${C.navyDark}, ${C.navy} 50%, ${C.navyLight})`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-[0.08] blur-[80px] pointer-events-none"
            style={{ backgroundColor: C.gold }}
          />

          <div className="relative z-10 px-8 py-14 sm:px-16 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.3em] mb-4"
                style={{ color: C.gold }}
              >
                Take the Next Step
              </p>
              <h3 className="text-[28px] sm:text-[36px] font-bold text-white tracking-tight leading-[1.15] mb-4">
                Ready to Begin
                <br />
                <span style={{ color: C.goldLight }}>Your Journey?</span>
              </h3>
              <p className="text-[15px] text-white/40 leading-relaxed max-w-md">
                Explore our CIPS qualifications and take the next step toward
                global professional recognition.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link
                href="/apprenticeships"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-[14px] font-semibold text-[#002E4D] bg-white hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-white/10"
              >
                View Our Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-[14px] font-semibold text-white border border-white/15 hover:bg-white/[0.06] transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CIPS COURSES BANNER ═══ */}
      <CipsCoursesBanner />
    </main>
  );
}
