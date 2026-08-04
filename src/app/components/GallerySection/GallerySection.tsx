"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Gallery Data ──
const galleryItems = [
  {
    id: 1,
    image:
      "/gallery/1.jpg",
    category: "Campus",
    title: "Life at LSHS",
    description: "A glimpse into the LSHS learning environment.",
    layoutClass: "sm:col-span-2 lg:col-span-7 aspect-[16/10]",
  },
  {
    id: 2,
    image:
      "/gallery/2.jpg",
    category: "Classroom",
    title: "Learning in Action",
    description: "Professional learning designed around CIPS.",
    layoutClass:
      "sm:col-span-1 lg:col-span-5 aspect-[4/5] lg:aspect-auto lg:h-[460px]",
  },
  {
    id: 3,
    image:
      "/gallery/3.jpg",
    category: "Students",
    title: "Global Community",
    description: "Connecting ambitious professionals worldwide.",
    layoutClass:
      "sm:col-span-1 lg:col-span-5 aspect-[4/5] lg:aspect-auto lg:h-[460px]",
  },
  {
    id: 4,
    image:
      "/gallery/4.jpg",
    category: "Events",
    title: "Networking & Growth",
    description: "Building relationships that last a career.",
    layoutClass: "sm:col-span-2 lg:col-span-4 aspect-[16/10]",
  },
  {
    id: 5,
    image:
      "/gallery/5.jpg",
    category: "Workshops",
    title: "Strategic Development",
    description: "Practical workshops for real-world application.",
    layoutClass: "sm:col-span-2 lg:col-span-8 aspect-[16/10]",
  },
  {
    id: 6,
    image:
      "/gallery/6.jpg",
    category: "Community",
    title: "Beyond the Classroom",
    description: "A supportive network of peers and alumni.",
    layoutClass: "sm:col-span-2 lg:col-span-12 aspect-[16/9]",
  },
];

const categories = [
  "ALL",
  "CAMPUS",
  "CLASSROOM",
  "STUDENTS",
  "EVENTS",
  "WORKSHOPS",
  "COMMUNITY",
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "ALL"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category.toUpperCase() === activeCategory,
        );

  // ── GSAP Animation Logic ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Header Reveal
        gsap.fromTo(
          ".g-reveal",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );

        // Grid Items Reveal
        const cards = gsap.utils.toArray<HTMLElement>(".g-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            },
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]); // Re-run when filter changes to animate new items

  // ── Lightbox Logic ──
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = useCallback(
    (direction: "next" | "prev") => {
      if (lightboxIndex === null) return;
      const totalItems = filteredItems.length;
      if (direction === "next") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % totalItems : null,
        );
      } else {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + totalItems) % totalItems : null,
        );
      }
    },
    [lightboxIndex, filteredItems.length],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };

    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, navigateLightbox]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#001B30] py-20 md:py-32 overflow-hidden"
    >
      {/* ── Subtle Background Accents ── */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0B73B9]/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f4d210]/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-10 lg:px-12">
        {/* ── Editorial Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="lg:col-span-8">
            <div className="g-reveal flex items-center gap-4 mb-6">
              <span className="text-xs tracking-[0.25em] font-semibold text-[#F4D210] uppercase">
                Gallery
              </span>
              <span className="text-xs tracking-[0.2em] font-semibold text-white/20 uppercase">
                01
              </span>
              <div className="w-12 h-px bg-white/10" />
            </div>
            <h2
              className="g-reveal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Moments That Define the LSHS Experience.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:flex lg:items-end">
            <p className="g-reveal text-base md:text-lg font-normal leading-relaxed tracking-normal text-slate-300 max-w-md lg:ml-auto">
              A glimpse into the learning environment, people, events and
              professional community behind LSHS.
            </p>
          </div>
        </div>

        {/* ── Category Filter ── */}
        <div className="g-reveal mb-12 md:mb-16 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-x-8 gap-y-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative text-sm font-medium tracking-wider uppercase transition-colors duration-300 pb-2 ${
                  activeCategory === cat
                    ? "text-[#F4D210]"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[#F4D210] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Asymmetric Gallery Grid ── */}
        {filteredItems.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6"
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`g-card group relative overflow-hidden rounded-lg bg-white/[0.03] border border-white/[0.08] cursor-pointer ${item.layoutClass}`}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.image}
                  alt={`${item.title} - ${item.category}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0 && activeCategory === "ALL"}
                />

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001B30] via-[#001B30]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Text Content */}
                <div className="absolute bottom-0 left-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F4D210] block mb-2">
                    {item.category}
                  </span>
                  <div className="flex items-end justify-between gap-4">
                    <h3
                      className="text-xl md:text-2xl font-medium text-white tracking-tight"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {item.title}
                    </h3>
                    <ArrowUpRight
                      className="w-6 h-6 text-white flex-shrink-0"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-lg">
            <p className="text-slate-400 text-lg">
              Gallery content coming soon.
            </p>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="g-reveal mt-24 md:mt-32 flex flex-col items-center text-center border-t border-white/10 pt-16">
          <span className="text-xs tracking-[0.25em] font-semibold text-[#F4D210] uppercase mb-4">
            Beyond the Classroom
          </span>
          <h3
            className="text-2xl md:text-4xl font-medium text-white tracking-tight max-w-2xl mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Discover the people, learning and opportunities that shape the LSHS
            experience.
          </h3>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2.5 px-8 py-4 text-[13px] font-bold tracking-wider uppercase text-[#001B30] bg-[#F4D210] rounded-md hover:bg-[#e0bd0a] transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore LSHS
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* ── Premium Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[#001B30]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors z-20"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" strokeWidth={1.5} />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] uppercase text-white/40 font-medium">
            {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
            {String(filteredItems.length).padStart(2, "0")}
          </div>

          {/* Prev Button */}
          <button
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white/60 hover:text-[#F4D210] transition-colors z-20"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" strokeWidth={1.5} />
          </button>

          {/* Main Image & Caption */}
          <div
            className="relative w-full max-w-5xl h-[70vh] md:h-[75vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex-grow">
              <Image
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption */}
            <div className="mt-6 text-center w-full">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F4D210] block mb-2">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3
                className="text-xl md:text-2xl font-medium text-white tracking-tight mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white/60 hover:text-[#F4D210] transition-colors z-20"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </section>
  );
}
