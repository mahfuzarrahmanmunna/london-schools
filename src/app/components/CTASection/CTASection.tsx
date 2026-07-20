'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CallToActionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from('.cta-eyebrow', { y: 15, opacity: 0, duration: 0.5 }, 0);
      tl.from('.cta-accent-line', { scaleX: 0, duration: 0.8, ease: 'power2.inOut' }, 0.2);
      tl.from('.cta-heading', { y: 30, opacity: 0, duration: 0.8 }, 0.3);
      tl.from('.cta-body', { y: 20, opacity: 0, duration: 0.6 }, 0.5);
      tl.from('.cta-buttons', { y: 15, opacity: 0, duration: 0.5 }, 0.65);
      tl.from('.cta-footer', { y: 10, opacity: 0, duration: 0.4 }, 0.8);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#070d19]"
    >
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0c1e35] to-[#070d19]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 0.6px, transparent 0.6px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#0c79bf]/[0.06] blur-[150px]" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#f4d210]/[0.03] blur-[120px]" />
      
      {/* Top Edge Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="cta-eyebrow inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] mb-9">
          <Award className="w-3.5 h-3.5 text-[#f4d210]" strokeWidth={1.5} />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
            Globally Recognised
          </span>
        </div>

        {/* Accent Line */}
        <div className="cta-accent-line w-12 h-[2px] bg-gradient-to-r from-transparent via-[#f4d210]/80 to-transparent mx-auto mb-9 origin-center" />

        {/* Heading */}
        <h2 className="cta-heading text-3xl lg:text-[44px] xl:text-[48px] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-6">
          Ready to Start Your{' '}
          <span className="text-[#f4d210]">MCIPS</span>{' '}
          Journey?
        </h2>

        {/* Body */}
        <p className="cta-body text-[15px] text-white/40 leading-[1.8] mb-10 max-w-lg mx-auto font-light">
          Join thousands of professionals who have advanced their procurement 
          careers through LSHS. Enrol today and take the first step towards 
          Chartered Status.
        </p>

        {/* Buttons */}
        <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/join"
            className="group inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-wide px-9 py-4 rounded-xl bg-[#f4d210] text-slate-900 hover:bg-[#f4d210]/90 hover:shadow-xl hover:shadow-[#f4d210]/20 hover:-translate-y-px transition-all duration-300 active:scale-[0.98]"
          >
            Enrol Now
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-white/90 transition-all duration-300 px-7 py-4 rounded-xl border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.04]"
          >
            Speak to an Advisor
          </Link>
        </div>

        {/* Footer Trust Signals */}
        <div className="cta-footer mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            { icon: ShieldCheck, text: 'No Hidden Fees' },
            { icon: ShieldCheck, text: 'Flexible Payments' },
            { icon: ShieldCheck, text: 'Expert Tutor Support' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <item.icon className="w-3.5 h-3.5 text-white/15" strokeWidth={1.5} />
              <span className="text-[11px] text-white/20 font-medium tracking-wide">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}