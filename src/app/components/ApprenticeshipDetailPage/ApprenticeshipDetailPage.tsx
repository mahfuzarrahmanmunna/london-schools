// src/app/apprenticeships/[level]/page.tsx

"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Clock,
  BookOpen,
  Download,
  CheckCircle2,
  Trophy,
  Users,
  Briefcase,
  FileText,
  Shield,
  PoundSterling,
  GraduationCap,
  ArrowUp,
  Star,
  Monitor,
  TrendingUp,
  Quote,
} from "lucide-react";
import { apprenticeshipLevels } from "@/app/data/apprenticeshipData";
import { studyModeIcons, statIcons } from "@/app/data/iconMaps";
import CipsCoursesBanner from "@/app/components/ApprenticeshipsBanner/ApprenticeshipsBanner";

gsap.registerPlugin(ScrollTrigger);

// ─── Student Reviews Data ────────────────────────
const studentReviews = [
  {
    name: "Sarah Mitchell",
    level: "Level 4",
    role: "Procurement Assistant",
    company: "NHS Supply Chain",
    rating: 5,
    text: "The course structure was brilliant. Being able to study around my full-time job made all the difference. The tutors were incredibly responsive and the online resources were top quality.",
    avatar: "SM",
  },
  {
    name: "James Thornton",
    level: "Level 5",
    role: "Procurement Officer",
    company: "Barclays",
    rating: 5,
    text: "Level 5 really pushed my understanding of strategic procurement. The case studies were directly applicable to my role. I got promoted within 3 months of completing.",
    avatar: "JT",
  },
  {
    name: "Priya Patel",
    level: "Level 6",
    role: "Head of Procurement",
    company: "Unilever",
    rating: 5,
    text: "The leadership modules in Level 6 were exceptional. The end-point assessment preparation was thorough and I felt completely confident going into it. Highly recommend.",
    avatar: "PP",
  },
  {
    name: "Michael O'Brien",
    level: "Level 4",
    role: "Buyer",
    company: "Balfour Beatty",
    rating: 4,
    text: "Coming from a non-procurement background, this course gave me the foundation I needed. The virtual classroom sessions were engaging and the support team was always available.",
    avatar: "MO",
  },
  {
    name: "Emma Richardson",
    level: "Level 5",
    role: "Category Manager",
    company: "Tesco",
    rating: 5,
    text: "The flexibility of the remote learning option was perfect for me. I could replay sessions and work through the materials at my own pace. The discussion forums were really helpful too.",
    avatar: "ER",
  },
  {
    name: "David Chen",
    level: "Level 6",
    role: "Supply Chain Director",
    company: "Siemens",
    rating: 5,
    text: "This qualification opened doors I didn't expect. The strategic thinking frameworks have become part of how I approach every procurement decision now. Worth every penny.",
    avatar: "DC",
  },
  {
    name: "Rachel Foster",
    level: "Level 3",
    role: "Procurement Coordinator",
    company: "BBC",
    rating: 5,
    text: "As someone new to procurement, Level 3 was the perfect starting point. Clear explanations, practical exercises, and a real sense of progression through each module.",
    avatar: "RF",
  },
  {
    name: "Tom Williams",
    level: "Level 4",
    role: "Junior Buyer",
    company: "Jaguar Land Rover",
    rating: 4,
    text: "The on-site delivery at our workplace was fantastic. Our whole team went through it together which made the group exercises even more valuable. Great for team building too.",
    avatar: "TW",
  },
  {
    name: "Aisha Khan",
    level: "Level 5",
    role: "Senior Procurement Specialist",
    company: "Deloitte",
    rating: 5,
    text: "The quality of the tutoring was outstanding. Every question was answered thoughtfully and the feedback on assignments was genuinely useful for my professional development.",
    avatar: "AK",
  },
  {
    name: "Chris Henderson",
    level: "Level 6",
    role: "Procurement Transformation Lead",
    company: "Capita",
    rating: 5,
    text: "I've done several professional qualifications and this was by far the best organised. The online platform was intuitive and the syllabus guide was incredibly detailed.",
    avatar: "CH",
  },
];

// ─── Continuous Review Marquee ───────────────────
function ReviewMarquee({ color }: { color: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!trackRef.current) return;

    // Duplicate cards for seamless loop
    const track = trackRef.current;
    const cards = track.querySelectorAll(".review-card");
    const totalWidth = Array.from(cards)
      .slice(0, cards.length / 2)
      .reduce((sum, card) => sum + (card as HTMLElement).offsetWidth + 16, 0);

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: totalWidth / 40, // speed factor
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          return parseFloat(String(x)) % totalWidth;
        }),
      },
    });

    // Pause on hover
    const handleEnter = () => {
      tween.pause();
      setIsPaused(true);
    };
    const handleLeave = () => {
      tween.play();
      setIsPaused(false);
    };

    const section = sectionRef.current;
    section?.addEventListener("mouseenter", handleEnter);
    section?.addEventListener("mouseleave", handleLeave);

    // Entrance animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      tween.kill();
      section?.removeEventListener("mouseenter", handleEnter);
      section?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const renderCard = (review: (typeof studentReviews)[0], i: number) => (
    <div
      key={`${review.name}-${i}`}
      className="review-card flex-shrink-0 w-[340px] sm:w-[380px] rounded-xl border border-slate-200 bg-white p-5 transition-shadow duration-300 hover:shadow-lg hover:border-slate-300"
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star
            key={s}
            className={`h-3.5 w-3.5 ${
              s < review.rating
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200"
            }`}
          />
        ))}
        <span className="text-[11px] text-slate-400 ml-2 font-medium">
          {review.level}
        </span>
      </div>

      {/* Quote */}
      <div className="relative mb-4">
        <Quote
          className="h-5 w-5 absolute -top-1 -left-0.5 opacity-10"
          style={{ color }}
        />
        <p className="text-[13px] text-slate-600 leading-[1.75] pl-5">
          {review.text}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          {review.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-slate-800 leading-tight truncate">
            {review.name}
          </p>
          <p className="text-[11px] text-slate-400 leading-tight truncate">
            {review.role} · {review.company}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden py-2"
      style={{ opacity: 0 }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        className={`flex gap-4 ${isPaused ? "" : "cursor-grab"}`}
        style={{ willChange: "transform" }}
      >
        {/* Original set */}
        {studentReviews.map((review, i) => renderCard(review, i))}
        {/* Duplicated set for seamless loop */}
        {studentReviews.map((review, i) => renderCard(review, i + 100))}
      </div>
    </div>
  );
}

// ─── Review Stats Row ────────────────────────────
function ReviewStats({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".rev-stat");
    gsap.fromTo(
      items,
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  const stats = [
    { value: "4.8", label: "Average Rating", icon: Star },
    { value: "2,400+", label: "Student Reviews", icon: Users },
    { value: "98%", label: "Would Recommend", icon: CheckCircle2 },
    { value: "4.9", label: "Tutor Support", icon: GraduationCap },
  ];

  return (
    <div
      ref={ref}
      className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rev-stat flex items-center gap-2.5"
            style={{ opacity: 0 }}
          >
            <Icon
              className="h-4 w-4"
              style={{
                color:
                  stat.label.includes("Rating") || stat.label.includes("Tutor")
                    ? "#f59e0b"
                    : color,
              }}
            />
            <span className="text-[15px] font-bold text-slate-800">
              {stat.value}
            </span>
            <span className="text-[12px] text-slate-400">{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Accordion Item ──────────────────────────────
function AccordionItem({
  title,
  children,
  icon,
  color,
  isOpen,
  onToggle,
  index,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  color: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.set(contentRef.current, {
          height: "auto",
          opacity: 1,
          display: "block",
        });
        const h = contentRef.current.scrollHeight;
        gsap.fromTo(
          contentRef.current,
          { height: 0, opacity: 0 },
          {
            height: h,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => gsap.set(contentRef.current, { height: "auto" }),
          },
        );
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => gsap.set(contentRef.current, { display: "none" }),
        });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!itemRef.current) return;
    gsap.fromTo(
      itemRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: index * 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  return (
    <div
      ref={itemRef}
      className="border border-slate-200 rounded-lg overflow-hidden bg-white"
      style={{ opacity: 0 }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-slate-50/70 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ backgroundColor: color + "0D", color }}
          >
            {icon}
          </div>
          <span className="text-[14px] font-semibold text-slate-800">
            {title}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0, display: "none" }}
      >
        <div className="px-5 pb-5 pt-0">{children}</div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────
export default function ApprenticeshipDetailPage() {
  const params = useParams();
  const levelNum = parseInt(params.level as string);
  const course = apprenticeshipLevels.find((c) => c.level === levelNum);

  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const studyRef = useRef<HTMLDivElement>(null);
  const levelsRef = useRef<HTMLDivElement>(null);
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["covered"]),
  );
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (!course) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const els = headerRef.current.querySelectorAll(".h-anim");
        gsap.fromTo(
          els,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: "power2.out",
          },
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 30, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: imageRef.current, start: "top 88%" },
          },
        );
      }

      if (overviewRef.current) {
        gsap.fromTo(
          overviewRef.current.querySelectorAll(".ov-anim"),
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: overviewRef.current, start: "top 85%" },
          },
        );
      }

      if (downloadRef.current) {
        gsap.fromTo(
          downloadRef.current,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: downloadRef.current, start: "top 90%" },
          },
        );
      }

      if (studyRef.current) {
        gsap.fromTo(
          studyRef.current.querySelectorAll(".study-card"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: studyRef.current, start: "top 85%" },
          },
        );
      }

      if (levelsRef.current) {
        gsap.fromTo(
          levelsRef.current.querySelectorAll(".lvl-card"),
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: { trigger: levelsRef.current, start: "top 88%" },
          },
        );
      }

      ScrollTrigger.create({
        trigger: pageRef.current,
        start: "top -400",
        onEnter: () => setShowTop(true),
        onLeaveBack: () => setShowTop(false),
      });
    }, pageRef);

    return () => ctx.revert();
  }, [course]);

  function toggleSection(key: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-800 mb-2">
            Apprenticeship Not Found
          </h1>
          <p className="text-slate-500 mb-5 text-sm">
            The level you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/apprenticeships"
            className="text-sm font-semibold text-primary hover:underline flex items-center gap-1.5 mx-auto w-fit"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Back to
            Apprenticeships
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={pageRef} className="bg-white">
      {/* ─── Top Bar / Breadcrumb ─── */}
      <div className="border-b border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <nav className="flex items-center gap-1.5 text-[12px] text-slate-400">
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/apprenticeships"
              className="hover:text-slate-600 transition-colors"
            >
              Apprenticeships
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* ─── Header: Title + Pass Rate ─── */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-8 border-b border-slate-100">
        <div ref={headerRef}>
          <div
            className="h-anim flex flex-wrap items-center gap-2.5 mb-5"
            style={{ opacity: 0 }}
          >
            <span
              className="inline-flex items-center rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: course.color }}
            >
              {course.badge}
            </span>
            {course.featured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-1">
                <Trophy className="h-3 w-3" /> Most Popular
              </span>
            )}
          </div>

          <h1
            className="h-anim text-[28px] sm:text-3xl lg:text-[34px] font-bold text-slate-900 leading-tight tracking-tight mb-4"
            style={{ opacity: 0 }}
          >
            {course.subtitle}
          </h1>

          <div
            className="h-anim flex flex-wrap items-center gap-4"
            style={{ opacity: 0 }}
          >
            <div
              className="flex items-center gap-2 rounded-md px-3.5 py-2"
              style={{ backgroundColor: course.color + "0D" }}
            >
              <TrendingUp className="h-4 w-4" style={{ color: course.color }} />
              <span
                className="text-[14px] font-bold"
                style={{ color: course.color }}
              >
                {course.passRate} Pass Rate
              </span>
            </div>
            {course.stats.slice(0, 2).map((stat) => {
              const Icon = statIcons[stat.icon] || Star;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 text-[13px] text-slate-500"
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span>
                    <strong className="text-slate-700">{stat.value}</strong>{" "}
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Two Column: Image + Overview ─── */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="aspect-[4/3] relative bg-slate-100">
                <Image
                  src={course.image}
                  alt={course.subtitle}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${course.color}30, ${course.color}10)`,
                  }}
                >
                  <span className="text-[100px] font-black text-white/20">
                    L{course.level}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-2 shadow-md"
                    style={{ backgroundColor: course.color }}
                  >
                    <span className="text-white text-xl font-black leading-none">
                      {course.level}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/70">
                      Level
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {course.price}
              </span>
            </div>
            <p className="text-[12px] text-slate-400 mt-0.5">
              {course.priceNote}
            </p>
          </div>

          <div ref={overviewRef} className="flex flex-col justify-center">
            <div className="ov-anim" style={{ opacity: 0 }}>
              <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-3">
                Course Overview
              </p>
            </div>
            <div className="ov-anim" style={{ opacity: 0 }}>
              <p className="text-[15px] text-slate-600 leading-[1.8] mb-6">
                {course.overview}
              </p>
            </div>
            <div className="ov-anim space-y-3 mb-6" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">
                    {course.duration}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Typical completion time
                  </p>
                </div>
              </div>
              {course.stats.slice(2).map((stat) => {
                const Icon = statIcons[stat.icon] || Star;
                return (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-slate-800">
                        {stat.value}
                      </p>
                      <p className="text-[11px] text-slate-400">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="ov-anim" style={{ opacity: 0 }}>
              <p className="text-[14px] text-slate-500 leading-[1.8]">
                {course.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Download Syllabus ─── */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div
          ref={downloadRef}
          className="rounded-xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                backgroundColor: course.color + "0D",
                color: course.color,
              }}
            >
              <Download className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-slate-800">
                Download the Syllabus Guide
              </p>
              <p className="text-[12px] text-slate-400">
                Get the full course breakdown in PDF format
              </p>
            </div>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-90 flex-shrink-0"
            style={{ backgroundColor: course.color }}
          >
            <Download className="h-4 w-4" />
            Download Guide
          </button>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-slate-100" />
      </div>

      {/* ─── Accordion Sections ─── */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="max-w-full space-y-2.5">
          <AccordionItem
            title="What's Covered"
            icon={<BookOpen className="h-4 w-4" />}
            color={course.color}
            isOpen={openSections.has("covered")}
            onToggle={() => toggleSection("covered")}
            index={0}
          >
            <div className="space-y-2.5 mt-1">
              {course.modules.map((mod, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-3.5"
                >
                  <div
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-[11px] font-bold text-white"
                    style={{ backgroundColor: course.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-semibold text-slate-800 leading-snug">
                      {mod.title}
                    </h4>
                    <p className="text-[12px] text-slate-400 leading-relaxed mt-0.5">
                      {mod.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[11px] font-semibold text-slate-500">
                      {mod.hours}h
                    </p>
                    <p className="text-[10px] text-slate-300">
                      {mod.units} units
                    </p>
                  </div>
                </div>
              ))}
              <div
                className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 mt-1"
                style={{ backgroundColor: course.color + "08" }}
              >
                <Clock
                  className="h-3.5 w-3.5"
                  style={{ color: course.color }}
                />
                <span className="text-[12px] font-medium text-slate-500">
                  Over{" "}
                  {course.modules.reduce(
                    (sum, m) => sum + parseInt(m.hours),
                    0,
                  )}{" "}
                  hours of interactive learning
                </span>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Entry Requirements"
            icon={<Shield className="h-4 w-4" />}
            color={course.color}
            isOpen={openSections.has("entry")}
            onToggle={() => toggleSection("entry")}
            index={1}
          >
            <ul className="space-y-2 mt-1">
              {course.entryRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="h-4 w-4 mt-0.5 flex-shrink-0"
                    style={{ color: course.color }}
                  />
                  <span className="text-[13px] text-slate-600 leading-relaxed">
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionItem>

          <AccordionItem
            title="Assessment"
            icon={<FileText className="h-4 w-4" />}
            color={course.color}
            isOpen={openSections.has("assessment")}
            onToggle={() => toggleSection("assessment")}
            index={2}
          >
            <p className="text-[13px] text-slate-600 leading-[1.8] mt-1">
              {course.assessment}
            </p>
          </AccordionItem>

          <AccordionItem
            title="Funding & Costs"
            icon={<PoundSterling className="h-4 w-4" />}
            color={course.color}
            isOpen={openSections.has("funding")}
            onToggle={() => toggleSection("funding")}
            index={3}
          >
            <p className="text-[13px] text-slate-600 leading-[1.8] mt-1">
              {course.funding}
            </p>
          </AccordionItem>

          <AccordionItem
            title="Career Outcomes"
            icon={<Briefcase className="h-4 w-4" />}
            color={course.color}
            isOpen={openSections.has("careers")}
            onToggle={() => toggleSection("careers")}
            index={4}
          >
            <div className="space-y-2.5 mt-1">
              {course.careerOutcomes.map((career, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-100 p-3.5"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-[13px] font-semibold text-slate-800">
                      {career.title}
                    </h4>
                    <span
                      className="text-[11px] font-bold rounded-md px-2 py-0.5 flex-shrink-0 ml-2"
                      style={{
                        backgroundColor: course.color + "0D",
                        color: course.color,
                      }}
                    >
                      {career.salaryRange}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    {career.description}
                  </p>
                </div>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem
            title="Frequently Asked Questions"
            icon={<Users className="h-4 w-4" />}
            color={course.color}
            isOpen={openSections.has("faq")}
            onToggle={() => toggleSection("faq")}
            index={5}
          >
            <div className="space-y-4 mt-1">
              {course.faqs.map((faq, i) => (
                <div key={i}>
                  <h4 className="text-[13px] font-semibold text-slate-800 mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-[1.8] pl-3 border-l-2 border-slate-200">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem
            title="For Employers"
            icon={<GraduationCap className="h-4 w-4" />}
            color={course.color}
            isOpen={openSections.has("employer")}
            onToggle={() => toggleSection("employer")}
            index={6}
          >
            <p className="text-[13px] text-slate-600 leading-[1.8] mt-1">
              {course.employerInfo}
            </p>
          </AccordionItem>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-slate-100" />
      </div>

      {/* ─── Learning Options ─── */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
          Learning Options
        </p>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-7">
          How You&apos;ll Study
        </h2>
        <div ref={studyRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {course.studyModes.map((mode) => {
            const Icon = studyModeIcons[mode.icon] || Monitor;
            return (
              <div
                key={mode.mode}
                className="study-card rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-slate-300 transition-all duration-300"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg mb-4"
                  style={{
                    backgroundColor: course.color + "0D",
                    color: course.color,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[14px] font-semibold text-slate-800 mb-1.5">
                  {mode.mode}
                </h3>
                <p className="text-[12px] text-slate-400 leading-relaxed">
                  {mode.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-slate-100" />
      </div>

      {/* ═══════════════════════════════════════════
          STUDENT REVIEWS Continuous Marquee
          ═══════════════════════════════════════════ */}
      <section className="py-12 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 mb-2">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
            Student Reviews
          </p>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            What Our Students Say
          </h2>
        </div>

        {/* Stats row */}
        <ReviewStats color={course.color} />

        {/* Row 1 scrolls left */}
        <ReviewMarquee color={course.color} />

        {/* Row 2 scrolls right (reversed) */}
        <div style={{ transform: "scaleX(-1)" }} className="mt-4">
          <ReviewMarquee color={course.color} />
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto max-w-6xl px-6 mt-8 text-center">
          <p className="text-[13px] text-slate-400 mb-3">
            Join thousands of professionals who advanced their career with us
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: course.color }}
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-slate-100" />
      </div>

      {/* ─── Other Levels ─── */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
              CIPS Apprenticeships
            </p>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Other Levels
            </h2>
          </div>
          <Link
            href="/apprenticeships"
            className="text-[13px] font-semibold text-primary hover:underline flex items-center gap-1 group"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div
          ref={levelsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {apprenticeshipLevels
            .filter((c) => c.level !== course.level)
            .map((other) => (
              <Link
                key={other.level}
                href={other.href}
                className="lvl-card group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md hover:border-slate-300 transition-all duration-300"
                style={{ opacity: 0 }}
              >
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-white font-bold text-lg"
                  style={{ backgroundColor: other.color }}
                >
                  {other.level}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[11px] font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: other.color }}
                  >
                    Level {other.level}
                  </p>
                  <p className="text-[13px] font-semibold text-slate-700 leading-snug group-hover:text-primary transition-colors truncate">
                    {other.subtitle}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            ))}
        </div>
      </section>

      {/* ─── CIPS COURSES BANNER ─── */}
      <CipsCoursesBanner />

      {/* ─── Scroll to Top ─── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white shadow-lg hover:bg-slate-700 transition-all duration-300 ${
          showTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </main>
  );
}
