"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ──────────────────────────────────────────
const usefulLinks = [
  { label: "CIPS Courses", href: "/courses" },
  { label: "Admission Form", external: true, href: "https://forms.gle/kHkicZ6TaHQRoMck6" },
  { label: "Learn About Us", href: "/about" },
  { label: "Get in Touch", href: "/contact" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/lshs.co.uk/",
    icon: FaFacebook,
  },
  {
    label: "LinkedIn",
    href: "https://uk.linkedin.com/company/londoncollege/",
    icon: FaLinkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lshs.co.uk//",
    icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@LondonSchoolofHigherStudies",
    icon: FaYoutube,
  },
];

const integrityInfo = [
  { label: "Centre No", value: "100005967" },
  { label: "License No", value: "TRAD/DNCC/034723/2025" },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Return & Refund Policy", href: "/refund" },
];

// ─── Component ─────────────────────────────────────
export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll(".cta-animate"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
          },
        );
      }

      if (colsRef.current) {
        gsap.fromTo(
          colsRef.current.querySelectorAll(".footer-col"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: colsRef.current, start: "top 85%" },
          },
        );
      }

      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: bottomRef.current, start: "top 95%" },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative bg-[#001B30] pt-12 overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0B73B9]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f4d210]/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* ═══ MAIN FOOTER LINKS ═══ */}
        <div ref={colsRef} className="pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* ── Column 1: About ── */}
            <div className="footer-col lg:col-span-5" style={{ opacity: 0 }}>
              <div className="relative h-12 w-36 mb-6">
                <Image
                  src="/logo/logo.webp"
                  alt="London School of Higher Studies"
                  fill
                  className="object-contain"
                />
              </div>

              <p className="text-sm font-normal leading-relaxed text-white/60 max-w-sm mb-8">
                The London School of Higher Studies (LSHS) is a CIPS Approved
                Study Centre supporting learners toward globally recognised
                procurement and supply chain qualifications.
              </p>

              {/* Integrity Badges */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <ShieldCheck
                    className="w-4 h-4 text-[#f4d210]"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm font-medium text-white/80">
                    CIPS Approved
                  </span>
                </div>
              </div>
            </div>

            {/* ── Column 2: Useful Links ── */}
            <div className="footer-col lg:col-span-2" style={{ opacity: 0 }}>
              <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-white/90 mb-6 pb-3 border-b border-white/10">
                Useful Links
              </h4>
              <ul className="space-y-4">
                {usefulLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-start gap-2 text-sm font-normal text-white/60 hover:text-white transition-colors duration-200 leading-snug"
                      >
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-white/20 group-hover:text-[#f4d210] group-hover:translate-x-0.5 transition-all duration-200" />
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="group inline-flex items-start gap-2 text-sm font-normal text-white/60 hover:text-white transition-colors duration-200 leading-snug"
                      >
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-white/20 group-hover:text-[#f4d210] group-hover:translate-x-0.5 transition-all duration-200" />
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Column 3: Social ── */}
            <div className="footer-col lg:col-span-2" style={{ opacity: 0 }}>
              <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-white/90 mb-6 pb-3 border-b border-white/10">
                Connect
              </h4>
              <ul className="space-y-4">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        className="group inline-flex items-center gap-3 text-sm font-normal text-white/60 hover:text-white transition-colors duration-200"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 border border-white/10 text-white/50 group-hover:text-[#f4d210] group-hover:border-[#f4d210]/30 transition-all duration-300">
                          <Icon className="h-4 w-4" />
                        </span>
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ── Column 4: Integrity & CTA ── */}
            <div className="footer-col lg:col-span-3" style={{ opacity: 0 }}>
              <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-white/90 mb-6 pb-3 border-b border-white/10">
                Integrity
              </h4>

              <div className="space-y-4 bg-white/[0.02] border border-white/10 rounded-xl p-5 mb-5">
                {integrityInfo.map((info) => (
                  <div key={info.label} className="flex flex-col">
                    <span className="text-xs font-semibold tracking-wider uppercase text-white/40 mb-1">
                      {info.label}
                    </span>
                    <span className="text-sm font-mono font-medium text-white/90 tracking-wide">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button Underneath Integrity */}
              <h4 className="text-lg font-bold text-white mb-4">Book Free Consultation</h4>
              <Link
                href="https://forms.gle/kHkicZ6TaHQRoMck6"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-center gap-2 px-5 py-3.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-white bg-[#0B73B9] rounded-lg transition-all duration-300 hover:bg-[#085C92] hover:shadow-lg hover:shadow-[#0B73B9]/20 min-h-[44px]"
              >
                <span className="text-center">Apply Now</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM BAR ═══ */}
        <div
          ref={bottomRef}
          className="border-t border-white/10"
          style={{ opacity: 0 }}
        >
          <div className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-white/50 text-center md:text-left">
                © {new Date().getFullYear()} London School of Higher Studies. A
                Concern of{" "}
                <a
                  href="https://www.sampangroup.com.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#f4d210] transition-colors font-medium"
                >
                  Sampan Group
                </a>
                .
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {bottomLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white/90 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#0B73B9] to-transparent" />
      </div>
    </footer>
  );
}
