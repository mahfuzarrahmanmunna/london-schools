'use client'

import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Pagination } from 'swiper/modules'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

gsap.registerPlugin(ScrollTrigger)

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&h=1080&fit=crop&q=80',
    tagline: 'CIPS Approved Centre',
    title: 'Master Procurement\n& Supply',
    desc: 'Globally recognised CIPS qualifications from London School of Higher Studies. Advance your career with flexible online learning.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&q=80',
    tagline: 'Levels 2 – 6 Available',
    title: 'Study at Your\nOwn Pace',
    desc: 'Join thousands of professionals worldwide who have transformed their procurement careers with our expert-led programmes.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&q=80',
    tagline: 'Industry-Focused Training',
    title: 'From Certificate\nto MCIPS',
    desc: 'Complete your journey from CIPS Level 2 all the way to Chartered Status (MCIPS) with our structured pathway.',
  },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-tagline', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5,
      })

      const titleLines = gsap.utils.toArray<HTMLElement>('.hero-title-line')
      gsap.from(titleLines, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.7,
      })

      gsap.from('.hero-desc', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.1,
      })

      gsap.from('.hero-btns', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.3,
      })

      gsap.from('.hero-bottom-bar', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.5,
      })

      // Parallax
      gsap.to('.hero-img-wrap', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
        y: 150,
        scale: 1.12,
        ease: 'none',
      })

      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 0.6,
        },
        y: -80,
        opacity: 0,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden"
    >
      {/* Swiper */}
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        speed={1400}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="hero-swiper absolute inset-0 w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="hero-img-wrap relative w-full h-full will-change-transform">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover scale-105"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/60 to-[#0a1628]/30" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a1628] to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[2] flex items-center h-full max-w-[1320px] mx-auto px-5 lg:px-8 pt-20"
      >
        <div className="max-w-2xl">
          <div className="hero-tagline inline-flex items-center gap-2 bg-[#1e40af]/20 border border-[#2563eb]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
            <span className="text-[#93c5fd] text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase">
              {slides[0].tagline}
            </span>
          </div>

          <h1
            className="text-white text-[clamp(2.4rem,6vw,5rem)] font-normal leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            <span className="hero-title-line block">Master Procurement</span>
            <span className="hero-title-line block">& Supply</span>
          </h1>

          <p className="hero-desc text-white/60 text-base md:text-lg leading-relaxed max-w-lg mb-8">
            Globally recognised CIPS qualifications from London School of Higher
            Studies. Advance your career with flexible online learning.
          </p>

          <div className="hero-btns flex flex-wrap items-center gap-4">
            <a
              href="#courses"
              className="inline-flex items-center gap-2.5 bg-[#1e40af] hover:bg-[#1e3a8a] text-white text-xs font-bold tracking-[0.12em] uppercase px-7 py-3.5 rounded-md transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              Explore Courses
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#why-us"
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-white/40 text-white text-xs font-bold tracking-[0.12em] uppercase px-7 py-3.5 rounded-md transition-all duration-300 hover:bg-white/5"
            >
              Why Choose Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom quick-level bar */}
      <div className="hero-bottom-bar absolute bottom-0 left-0 right-0 z-[3] bg-[#0a1628]/80 backdrop-blur-lg border-t border-white/[0.06]">
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[56px] md:h-[60px]">
            <div className="flex items-center gap-1 md:gap-3 overflow-x-auto no-scrollbar">
              {['Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6'].map(
                (lvl) => (
                  <a
                    key={lvl}
                    href="#courses"
                    className="text-white/50 hover:text-white text-[10px] md:text-[11px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap px-2.5 md:px-4 py-2 transition-colors duration-300 relative group"
                  >
                    {lvl}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#2563eb] transition-all duration-300 group-hover:w-3/4" />
                  </a>
                )
              )}
            </div>
            <div className="hidden md:flex items-center gap-2 text-white/40">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <span className="text-[10px] font-medium tracking-wider uppercase">
                Browse all
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}