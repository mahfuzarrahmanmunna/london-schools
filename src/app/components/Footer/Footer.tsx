"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronRight,
  ExternalLink,
  Award,
  Shield,
  GraduationCap,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ──────────────────────────────────────────
const programmeLinks = [
  { label: "Hospitality & Tourism Programmes", href: "/hospitality-tourism" },
  {
    label: "Certificate in Procurement & Supply",
    href: "/procurement-supply-chain/certificate",
  },
  {
    label: "Advanced Certificate in Procurement",
    href: "/procurement-supply-chain/advanced-certificate",
  },
  {
    label: "Diploma in Procurement & Supply",
    href: "/procurement-supply-chain/diploma",
  },
  {
    label: "Advanced Diploma in Procurement",
    href: "/procurement-supply-chain/advanced-diploma",
  },
  {
    label: "Professional Diploma in Procurement",
    href: "/procurement-supply-chain/professional-diploma",
  },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Admission Form", href: "/admission" },
  { label: "Fee Structure", href: "/fees" },
  { label: "Student Portal", href: "/student-portal" },
  { label: "Sampan Group", href: "/sampan-group" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Student Support", href: "/support" },
  { label: "Academic Calendar", href: "/calendar" },
  { label: "Library Resources", href: "/library" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const socials = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

const accreditations = [
  { label: "CIPS Accredited", icon: Award },
  { label: "Ofsted Regulated", icon: Shield },
  { label: "UKVI Tier 4", icon: GraduationCap },
];

// ─── Component ─────────────────────────────────────
export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll(".cta-animate"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
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
            duration: 0.5,
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

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  }

  return (
    <footer ref={sectionRef} className="relative">
      {/* ═══ CTA BAND ═══ */}
      <div ref={ctaRef} className="relative bg-navy overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h3
                className="cta-animate text-2xl lg:text-3xl font-semibold text-white leading-tight tracking-tight mb-3"
                style={{ opacity: 0 }}
              >
                Start Your Journey with{" "}
                <span className="text-secondary">LSHS</span>
              </h3>
              <p
                className="cta-animate text-[15px] text-white/50 leading-relaxed max-w-md"
                style={{ opacity: 0 }}
              >
                Subscribe to our newsletter for admission updates, programme
                launches, and exclusive insights from industry experts.
              </p>
            </div>

            <div className="cta-animate" style={{ opacity: 0 }}>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-white/8 border border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary/60 focus:bg-white/10 transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribed}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-7 py-3.5 rounded-lg hover:bg-primary-dark transition-colors duration-200 shadow-lg shadow-primary/25 disabled:opacity-70 whitespace-nowrap"
                >
                  {subscribed ? (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
              <p className="mt-3 text-[11px] text-white/25">
                No spam. Unsubscribe anytime.{" "}
                <Link href="/privacy" className="underline hover:text-white/40">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary" />
      </div>

      {/* ═══ MAIN FOOTER ═══ */}
      <div className="bg-[#080f1e]">
        <div ref={colsRef} className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* ── About ── */}
            <div
              className="footer-col col-span-2 md:col-span-3 lg:col-span-4"
              style={{ opacity: 0 }}
            >
              <div className="relative h-14 w-38 mb-5">
                <Image
                  src="/logo/logo.webp"
                  alt="London School of Higher Studies"
                  fill
                  className="object-contain"
                />
              </div>

              <p className="text-[13px] text-white/40 leading-relaxed mb-6 max-w-xs">
                London School of Higher Studies is a premier institution
                offering internationally recognised qualifications in
                Procurement & Supply Chain and Hospitality & Tourism Management.
              </p>

              <div className="flex items-center gap-2.5 mb-8">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/8 text-white/40 hover:text-secondary hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                {accreditations.map((acc) => {
                  const Icon = acc.icon;
                  return (
                    <div
                      key={acc.label}
                      className="inline-flex items-center gap-1.5 rounded-md bg-white/5 border border-white/8 px-3 py-1.5"
                    >
                      <Icon className="h-3 w-3 text-secondary/70" />
                      <span className="text-[10px] font-medium text-white/40 tracking-wide">
                        {acc.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Programmes ── */}
            <div
              className="footer-col col-span-1 lg:col-span-3"
              style={{ opacity: 0 }}
            >
              <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/80 mb-5 pb-3 border-b border-white/8">
                Programmes
              </h4>
              <ul className="space-y-2.5">
                {programmeLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-start gap-1.5 text-[13px] text-white/40 hover:text-white transition-colors duration-200 leading-snug"
                    >
                      <ChevronRight className="h-3 w-3 mt-[3px] flex-shrink-0 text-white/15 group-hover:text-secondary transition-colors duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Quick Links ── */}
            <div
              className="footer-col col-span-1 lg:col-span-2"
              style={{ opacity: 0 }}
            >
              <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/80 mb-5 pb-3 border-b border-white/8">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-start gap-1.5 text-[13px] text-white/40 hover:text-white transition-colors duration-200 leading-snug"
                    >
                      <ChevronRight className="h-3 w-3 mt-[3px] flex-shrink-0 text-white/15 group-hover:text-secondary transition-colors duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Support ── */}
            <div
              className="footer-col col-span-1 lg:col-span-2"
              style={{ opacity: 0 }}
            >
              <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/80 mb-5 pb-3 border-b border-white/8">
                Support
              </h4>
              <ul className="space-y-2.5">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-start gap-1.5 text-[13px] text-white/40 hover:text-white transition-colors duration-200 leading-snug"
                    >
                      <ChevronRight className="h-3 w-3 mt-[3px] flex-shrink-0 text-white/15 group-hover:text-secondary transition-colors duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ═══ BOTTOM BAR ═══ */}
        <div
          ref={bottomRef}
          className="border-t border-white/8"
          style={{ opacity: 0 }}
        >
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-white/25 text-center md:text-left">
                © {new Date().getFullYear()} London School of Higher Studies.
                All rights reserved. Part of{" "}
                <Link
                  href="/sampan-group"
                  className="text-white/40 hover:text-secondary transition-colors"
                >
                  Sampan Group
                </Link>
                .
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Cookie Policy", href: "/cookies" },
                  { label: "Refund Policy", href: "/refund" },
                  { label: "Complaints", href: "/complaints" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[11px] text-white/25 hover:text-white/50 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[3px] bg-gradient-to-r from-primary via-secondary to-primary" />
      </div>
    </footer>
  );
}
