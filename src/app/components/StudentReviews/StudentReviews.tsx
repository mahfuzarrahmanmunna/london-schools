"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Star,
  Users,
  CheckCircle2,
  GraduationCap,
  Quote,
  ArrowRight,
} from "lucide-react";

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

// ─── Review Data ─────────────────────────────────
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

// ─── Single Direction Marquee ────────────────────
function MarqueeRow({
  reviews,
  reverse = false,
}: {
  reviews: typeof studentReviews;
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const allCards = track.querySelectorAll(".review-card");
    const halfCount = allCards.length / 2;

    let totalWidth = 0;
    for (let i = 0; i < halfCount; i++) {
      const card = allCards[i] as HTMLElement;
      totalWidth += card.offsetWidth + 16;
    }

    if (totalWidth === 0) return;

    if (reverse) {
      gsap.set(track, { x: -totalWidth });
    } else {
      gsap.set(track, { x: 0 });
    }

    const tween = gsap.to(track, {
      x: reverse ? 0 : -totalWidth,
      duration: totalWidth / 38,
      ease: "none",
      repeat: -1,
    });

    const handleEnter = () => {
      tween.pause();
      setIsPaused(true);
    };
    const handleLeave = () => {
      tween.play();
      setIsPaused(false);
    };

    track.addEventListener("mouseenter", handleEnter);
    track.addEventListener("mouseleave", handleLeave);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", handleEnter);
      track.removeEventListener("mouseleave", handleLeave);
    };
  }, [reverse]);

  const renderCard = (review: (typeof studentReviews)[0], i: number) => (
    <div
      key={`${review.name}-${i}`}
      className="review-card flex-shrink-0 w-[340px] sm:w-[380px] rounded-xl border border-slate-200 bg-white p-5 transition-shadow duration-300 hover:shadow-lg hover:border-slate-300"
    >
      {/* Top: stars + level */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star
              key={s}
              className={`h-3.5 w-3.5 ${
                s < review.rating
                  ? "text-[#D4A843] fill-[#D4A843]"
                  : "text-slate-200"
              }`}
            />
          ))}
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md"
          style={{ backgroundColor: C.cips + "0D", color: C.cips }}
        >
          {review.level}
        </span>
      </div>

      {/* Quote text */}
      <div className="relative mb-4">
        <Quote
          className="h-5 w-5 absolute -top-0.5 -left-0.5 opacity-[0.07]"
          style={{ color: C.cips }}
        />
        <p className="text-[13px] text-slate-600 leading-[1.75] pl-5">
          {review.text}
        </p>
      </div>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white flex-shrink-0"
          style={{ backgroundColor: C.cips }}
        >
          {review.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-[#002E4D] leading-tight truncate">
            {review.name}
          </p>
          <p className="text-[11px] text-slate-400 leading-tight truncate">
            {review.role} &middot; {review.company}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden py-2">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        className={`flex gap-4 ${!isPaused ? "cursor-grab" : "cursor-default"}`}
        style={{ willChange: "transform" }}
      >
        {reviews.map((r, i) => renderCard(r, i))}
        {reviews.map((r, i) => renderCard(r, i + 100))}
      </div>
    </div>
  );
}

// ─── Review Stats ────────────────────────────────
function ReviewStats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".rev-stat");
    gsap.fromTo(
      items,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  const stats = [
    { value: "4.8", label: "Average Rating", icon: Star, color: C.gold },
    { value: "2,400+", label: "Student Reviews", icon: Users, color: C.cips },
    {
      value: "98%",
      label: "Would Recommend",
      icon: CheckCircle2,
      color: C.cips,
    },
    {
      value: "4.9",
      label: "Tutor Support",
      icon: GraduationCap,
      color: C.gold,
    },
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
            <Icon className="h-4 w-4" style={{ color: stat.color }} />
            <span className="text-[15px] font-bold text-[#002E4D]">
              {stat.value}
            </span>
            <span className="text-[12px] text-slate-400">{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Exported Component ─────────────────────
interface StudentReviewsProps {
  ctaHref?: string;
  ctaLabel?: string;
}

export default function StudentReviews({
  ctaHref = "/contact",
  ctaLabel = "Start Your Journey",
}: StudentReviewsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  const row1 = studentReviews.slice(0, 5);
  const row2 = studentReviews.slice(5, 10);

  return (
    <section
      ref={sectionRef}
      className="py-12 overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 mb-2">
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#0975b7] mb-2">
          Student Reviews
        </p>
        <h2 className="text-xl font-bold text-[#002E4D] tracking-tight">
          What Our Students Say
        </h2>
      </div>

      {/* Stats */}
      <ReviewStats />

      {/* Row 1 — scrolls left */}
      <MarqueeRow reviews={row1} reverse={false} />

      {/* Row 2 — scrolls right */}
      <div className="mt-4">
        <MarqueeRow reviews={row2} reverse={true} />
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-6xl px-6 mt-8 text-center">
        <p className="text-[13px] text-slate-400 mb-3">
          Join thousands of professionals who advanced their career with us
        </p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: C.cips }}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
