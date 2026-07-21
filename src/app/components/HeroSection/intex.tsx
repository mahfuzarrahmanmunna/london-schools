"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  Play,
  ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ──────────────────────────────────────────
const featuredStories = [
  {
    category: "Research",
    title:
      "AI-Driven Procurement: How Machine Learning Is Reshaping Supply Chains",
    excerpt:
      "New CIPS research reveals 73% of procurement leaders are piloting AI tools for supplier risk assessment and demand forecasting.",
    image: "https://picsum.photos/seed/cips-story-ai/800/500.jpg",
    href: "/resources/ai-procurement-report",
    date: "15 Jan 2025",
  },
  {
    category: "Member Story",
    title: "From Buyer to CFO: How MCIPS Opened Doors for Sarah Chen",
    excerpt:
      "After achieving MCIPS designation, Sarah transitioned from a procurement analyst role to CFO of a FTSE 250 company within eight years.",
    image: "https://picsum.photos/seed/cips-story-sarah/800/500.jpg",
    href: "/membership/member-stories/sarah-chen",
    date: "08 Jan 2025",
  },
  {
    category: "Sustainability",
    title: "Net-Zero Procurement: The New Competitive Advantage",
    excerpt:
      "Our latest framework helps organisations embed carbon tracking into every procurement decision, from sourcing to contract management.",
    image: "https://picsum.photos/seed/cips-story-netzero/800/500.jpg",
    href: "/resources/net-zero-framework",
    date: "02 Jan 2025",
  },
];

const spotlightItems = [
  {
    label: "Qualifications",
    title: "Level 6 Professional Diploma",
    description:
      "The pinnacle of CIPS qualifications strategic leadership for senior procurement professionals. Your path to MCIPS.",
    image: "https://picsum.photos/seed/cips-spotlight-lvl6/600/400.jpg",
    href: "/qualifications/level-6",
    cta: "Explore Level 6",
  },
  {
    label: "Training",
    title: "Executive Masterclass: Digital Procurement",
    description:
      "A two-day intensive for C-suite leaders. Learn how to build a digital-first procurement function.",
    image: "https://picsum.photos/seed/cips-spotlight-digital/600/400.jpg",
    href: "/training/executive-digital-procurement",
    cta: "Book Now",
  },
];

const events = [
  {
    title: "CIPS Annual Conference 2025",
    date: "18–19 March 2025",
    location: "London, UK",
    type: "Conference",
    href: "/events/conference-2025",
  },
  {
    title: "Sustainable Procurement Summit",
    date: "22 April 2025",
    location: "Virtual",
    type: "Summit",
    href: "/events/sustainable-summit",
  },
  {
    title: "Category Management Workshop",
    date: "10 May 2025",
    location: "Manchester, UK",
    type: "Workshop",
    href: "/events/category-workshop",
  },
];

const stats = [
  { value: "50,000+", label: "Members" },
  { value: "150+", label: "Countries" },
  { value: "200+", label: "Training Courses" },
  { value: "87%", label: "Pass Rate" },
];

// ─── Category Badge Color ──────────────────────────
const categoryColors: Record<string, string> = {
  Research: "bg-cips text-white",
  "Member Story": "bg-navy text-white",
  Sustainability: "bg-green-600 text-white",
};

// ─── Component ─────────────────────────────────────
export default function HeroSection1() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ═══ HERO ANIMATIONS ═══
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Background image slow zoom
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current.querySelector("img"),
          { scale: 1.15 },
          {
            scale: 1,
            duration: 2.5,
            ease: "power2.out",
          },
        );
      }

      // Content slide up
      if (heroContentRef.current) {
        const children = heroContentRef.current.children;
        heroTl.fromTo(
          children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
          0.3,
        );
      }

      // Scroll indicator
      heroTl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.2,
      );

      // Parallax on scroll
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current.querySelector("img"), {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // ═══ STORIES SECTION ═══
      if (storiesRef.current) {
        gsap.fromTo(
          storiesRef.current.querySelectorAll(".story-card"),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storiesRef.current,
              start: "top 85%",
            },
          },
        );

        gsap.fromTo(
          storiesRef.current.querySelector(".stories-header"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storiesRef.current,
              start: "top 85%",
            },
          },
        );
      }

      // ═══ STATS SECTION ═══
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll(".stat-item"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
            },
          },
        );

        // Counter animation
        statsRef.current.querySelectorAll(".stat-num").forEach((el) => {
          const finalText = el.textContent || "";
          const num = parseInt(finalText.replace(/[^0-9]/g, ""), 10);
          const suffix = finalText.replace(/[0-9,]/g, "");
          if (isNaN(num)) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: num,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toLocaleString() + suffix;
            },
          });
        });
      }

      // ═══ SPOTLIGHT SECTION ═══
      if (spotlightRef.current) {
        gsap.fromTo(
          spotlightRef.current.querySelectorAll(".spotlight-card"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: spotlightRef.current,
              start: "top 85%",
            },
          },
        );
      }

      // ═══ EVENTS SECTION ═══
      if (eventsRef.current) {
        gsap.fromTo(
          eventsRef.current.querySelectorAll(".event-item"),
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: eventsRef.current,
              start: "top 85%",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════
          SECTION 1 FULL-BLEED HERO (McMaster pattern)
          ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end overflow-hidden"
      >
        {/* Background Image */}
        <div ref={heroImageRef} className="absolute inset-0 overflow-hidden">
          <img
            src="https://picsum.photos/seed/cips-hero-campus/1920/1080.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient McMaster style */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/30" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy to-transparent" />
        </div>

        {/* Hero Content left-aligned, bottom-heavy */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pb-24 lg:pb-32 pt-40">
          <div ref={heroContentRef} className="max-w-2xl">
            {/* Overline */}
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{ opacity: 0 }}
            >
              <span className="h-[2px] w-8 bg-cips" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cips">
                Chartered Institute of Procurement & Supply
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[clamp(2.75rem,6vw,5rem)] font-semibold text-white leading-[1.05] tracking-tight mb-6"
              style={{ opacity: 0 }}
            >
              Shaping the Future
              <br />
              <span className="text-cips">of Procurement</span>
            </h1>

            {/* Sub */}
            <p
              className="text-lg text-white/60 leading-relaxed max-w-lg mb-10"
              style={{ opacity: 0 }}
            >
              World-class qualifications, membership and resources for
              procurement and supply professionals in over 150 countries.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-4"
              style={{ opacity: 0 }}
            >
              <Link
                href="/qualifications"
                className="inline-flex items-center gap-2.5 bg-cips text-white text-sm font-semibold px-7 py-3.5 rounded-md hover:bg-cips-dark transition-colors duration-200 group"
              >
                Find Your Qualification
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <button className="inline-flex items-center gap-2.5 border border-white/25 text-white text-sm font-medium px-7 py-3.5 rounded-md hover:bg-white/10 hover:border-white/40 transition-all duration-200 backdrop-blur-sm group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
                  <Play className="h-3.5 w-3.5 text-white ml-0.5" />
                </div>
                Watch Our Story
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator bottom center */}
        <div
          ref={scrollRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          style={{ opacity: 0 }}
        >
          <span className="text-[10px] text-white/40 tracking-[0.25em] uppercase font-medium">
            Explore
          </span>
          <div className="h-9 w-[22px] rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <div className="scroll-dot h-1.5 w-1.5 rounded-full bg-white/60" />
          </div>
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cips via-gold to-cips" />
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 FEATURED STORIES (McMaster grid)
          ═══════════════════════════════════════════════ */}
      <section ref={storiesRef} className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="stories-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-cips mb-2 block">
                Latest
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-navy tracking-tight">
                Featured Stories
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-cips transition-colors group"
            >
              View all stories
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Stories Grid McMaster style: 1 large + 2 small */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Large Feature */}
            <Link
              href={featuredStories[0].href}
              className="story-card group relative block rounded-xl overflow-hidden bg-navy min-h-[480px]"
            >
              <img
                src={featuredStories[0].image}
                alt={featuredStories[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <span
                  className={`inline-flex self-start rounded-sm px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase mb-4 ${categoryColors[featuredStories[0].category] || "bg-slate-600 text-white"}`}
                >
                  {featuredStories[0].category}
                </span>
                <h3 className="text-2xl font-semibold text-white leading-tight mb-3 group-hover:text-cips transition-colors duration-200">
                  {featuredStories[0].title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4 max-w-md">
                  {featuredStories[0].excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{featuredStories[0].date}</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="inline-flex items-center gap-1 group-hover:text-cips transition-colors">
                    Read more
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Two Stacked */}
            <div className="flex flex-col gap-6">
              {featuredStories.slice(1).map((story) => (
                <Link
                  key={story.title}
                  href={story.href}
                  className="story-card group relative block rounded-xl overflow-hidden bg-navy flex-1 min-h-[226px]"
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-7">
                    <span
                      className={`inline-flex self-start rounded-sm px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase mb-3 ${categoryColors[story.category] || "bg-slate-600 text-white"}`}
                    >
                      {story.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white leading-snug mb-2 group-hover:text-cips transition-colors duration-200">
                      {story.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span>{story.date}</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="inline-flex items-center gap-1 group-hover:text-cips transition-colors">
                        Read more
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 STATS BAND (McMaster thin bar)
          ═══════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="relative bg-navy py-16 lg:py-20 overflow-hidden"
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Accent glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cips/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-item text-center lg:text-left"
              >
                <div className="stat-num text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 SPOTLIGHT (McMaster 2-col feature)
          ═══════════════════════════════════════════════ */}
      <section ref={spotlightRef} className="py-24 lg:py-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-cips mb-2 block">
                Spotlight
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-navy tracking-tight">
                What&apos;s New
              </h2>
            </div>
          </div>

          {/* Two-column spotlight cards */}
          <div className="grid lg:grid-cols-2 gap-6">
            {spotlightItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="spotlight-card group block bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                <div className="grid sm:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-56 sm:h-auto overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex rounded-sm bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-navy">
                        {item.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-navy leading-snug mb-3 group-hover:text-cips transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cips group-hover:gap-2.5 transition-all duration-300">
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 EVENTS (McConnell list style)
          ═══════════════════════════════════════════════ */}
      <section ref={eventsRef} className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Header */}
            <div className="lg:col-span-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-cips mb-2 block">
                Events
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-navy tracking-tight mb-4">
                Upcoming Events
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Connect with procurement professionals, learn from industry
                leaders, and earn CPD points at our events.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-cips transition-colors group"
              >
                View all events
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Right Event List */}
            <div className="lg:col-span-3">
              <div className="divide-y divide-slate-100">
                {events.map((event) => (
                  <Link
                    key={event.title}
                    href={event.href}
                    className="event-item group flex items-start gap-5 py-6 first:pt-0 last:pb-0"
                  >
                    {/* Date Block */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-cips/5 group-hover:border-cips/20 transition-colors duration-300">
                      <span className="text-[10px] font-bold text-cips uppercase leading-none">
                        {event.date.split(" ")[0]}
                      </span>
                      <span className="text-lg font-bold text-navy leading-tight">
                        {event.date.split(" ")[1].replace(",", "")}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1.5">
                        {event.type}
                      </span>
                      <h3 className="text-base font-semibold text-navy leading-snug mb-1.5 group-hover:text-cips transition-colors duration-200">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Full Day
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="h-5 w-5 text-slate-300 flex-shrink-0 mt-4 transition-all duration-200 group-hover:text-cips group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continuous scroll dot bounce */}
      <style jsx>{`
        .scroll-dot {
          animation: bounce-dot 1.5s ease-in-out infinite;
        }
        @keyframes bounce-dot {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
      `}</style>
    </>
  );
}
