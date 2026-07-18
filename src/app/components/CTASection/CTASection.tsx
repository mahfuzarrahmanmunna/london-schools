'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0a1628] overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#1e40af]/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#2563eb]/8 rounded-full blur-[100px]" />

      <div className="relative max-w-[800px] mx-auto px-5 lg:px-8 text-center">
        <div className="cta-content">
          <span className="inline-block text-[#60a5fa] text-[10px] font-bold tracking-[0.25em] uppercase mb-5">
            Start Today
          </span>
          <h2
            className="text-white text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.02em] leading-tight mb-5"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Begin Your CIPS Journey
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Enrol today and take the first step towards a globally recognised
            procurement qualification. Our team is ready to guide you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 bg-[#1e40af] hover:bg-[#1e3a8a] text-white text-xs font-bold tracking-[0.12em] uppercase px-8 py-4 rounded-md transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              Enrol Now
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
              href="#"
              className="inline-flex items-center gap-2.5 border border-white/15 hover:border-white/30 text-white text-xs font-bold tracking-[0.12em] uppercase px-8 py-4 rounded-md transition-all duration-300 hover:bg-white/5"
            >
              Download Brochure
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-slate-400">
            <a
              href="mailto:info@lshs.ac.uk"
              className="flex items-center gap-2 hover:text-white transition-colors text-sm"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              info@lshs.ac.uk
            </a>
            <a
              href="tel:+442012345678"
              className="flex items-center gap-2 hover:text-white transition-colors text-sm"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +44 20 1234 5678
            </a>
            <span className="flex items-center gap-2 text-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              London, United Kingdom
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}