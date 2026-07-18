'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination, Mousewheel } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=80',
    alt: 'Modern corporate headquarters reflecting professional excellence',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&q=80',
    alt: 'Professional strategic planning and analysis',
  },
  {
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&h=1080&fit=crop&q=80',
    alt: 'Global supply chain network and logistics operations',
  },
];

export default function BannerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle entrance
      const tl = gsap.timeline({ delay: 0.8 });

      tl.from('.hero-eyebrow', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          lineRef.current,
          {
            scaleX: 0,
            duration: 1.2,
            ease: 'power3.inOut',
          },
          '-=0.6'
        )
        .from(
          '.hero-title',
          {
            y: 60,
            opacity: 0,
            duration: 1.4,
            ease: 'power4.out',
          },
          '-=0.8'
        )
        .from(
          '.hero-desc',
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.7'
        )
        .from(
          '.hero-cta',
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          counterRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .from(
          scrollRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.6'
        );

      // Scroll indicator pulse
      gsap.to('.scroll-line-fill', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 2.4,
        ease: 'power1.inOut',
        repeat: -1,
        delay: 2.6,
      });

      // Parallax on scroll
      gsap.to('.hero-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
        y: 100,
        scale: 1.04,
        ease: 'none',
      });

      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
        y: -50,
        opacity: 0,
        ease: 'none',
      });

      gsap.to(scrollRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '5% top',
          end: '25% top',
          scrub: true,
        },
        opacity: 0,
        y: -15,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* ── Background Slider ── */}
      <Swiper
        modules={[EffectFade, Autoplay, Pagination, Mousewheel]}
        effect="fade"
        speed={1800}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          type: 'fraction',
        }}
        loop={true}
        allowTouchMove={true}
        grabCursor={true}
        touchRatio={1}
        touchAngle={45}
        longSwipesMs={400}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          thresholdDelta: 30,
        }}
        simulateTouch={true}
        className="absolute inset-0 w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-bg relative w-full h-full will-change-transform">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Refined Overlay ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_0%,rgba(0,0,0,0.3)_70%)]" />
      </div>

      {/* ── Left Accent Line ── */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-[2] hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#9B1B30]" />
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* ── Main Content ── */}
      <div
        ref={titleRef}
        className="absolute inset-0 z-[2] flex items-center justify-center px-6"
      >
        <div className="max-w-4xl w-full text-center">
          {/* Eyebrow */}
          <p className="hero-eyebrow text-[11px] md:text-xs tracking-[0.3em] font-medium text-white/50 uppercase mb-6">
            Chartered Institute of Procurement & Supply
          </p>

          {/* Divider Line */}
          <div className="flex justify-center mb-8">
            <div
              ref={lineRef}
              className="w-12 h-px bg-gradient-to-r from-transparent via-[#9B1B30] to-transparent origin-center"
            />
          </div>

          {/* Title */}
          <h1
            className="hero-title text-white font-light tracking-[-0.025em] leading-[0.95]"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
            }}
          >
            CIPS Qualifications
          </h1>

          {/* Description */}
          <p className="hero-desc mt-8 md:mt-10 text-white/50 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto tracking-wide">
            Elevate your career with the world&apos;s most recognised
            procurement and supply chain credentials.
          </p>

          {/* Single CTA */}
          <div className="hero-cta mt-10 md:mt-12 flex justify-center">
            <a
              href="#courses"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-[13px] font-medium tracking-[0.15em] uppercase text-white border border-white/20 rounded-none transition-all duration-500 hover:border-white/60 hover:bg-white/5 overflow-hidden"
            >
              <span className="relative z-10">Explore Programmes</span>
              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              {/* Hover fill */}
              <span className="absolute inset-0 bg-[#9B1B30] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Slide Counter ── */}
      <div
        ref={counterRef}
        className="absolute bottom-8 right-8 z-[3] hidden md:flex items-center gap-4"
      >
        <div className="hero-pagination flex items-center text-white/40 text-sm font-light tracking-wider" />
        <div className="w-px h-4 bg-white/15" />
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#9B1B30] animate-pulse" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-medium">
            Swipe
          </span>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-white/30 text-[9px] tracking-[0.25em] uppercase font-medium">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/10 relative overflow-hidden rounded-full">
          <div className="scroll-line-fill absolute inset-x-0 top-0 h-full bg-white/60 rounded-full" />
        </div>
      </div>

      {/* ── Bottom Gradient Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-[1] bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}