'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '10,000+', label: 'Students Enrolled', suffix: '' },
  { value: '94', label: 'Pass Rate', suffix: '%' },
  { value: '80+', label: 'Countries', suffix: '' },
  { value: '15', label: 'Years Experience', suffix: '+' },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-[#1e40af] overflow-hidden"
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item text-center"
            >
              <div className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-2">
                {stat.value}
                <span className="text-blue-200">{stat.suffix}</span>
              </div>
              <div className="text-blue-200/70 text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}