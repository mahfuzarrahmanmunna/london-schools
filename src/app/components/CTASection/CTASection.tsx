"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  CreditCard,
  Award,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trustPoints = [
  {
    icon: CreditCard,
    title: "Transparent Fees, No Hidden Costs",
  },
  {
    icon: ShieldCheck,
    title: "Flexible Payment Plans Available",
  },
  {
    icon: Award,
    title: "CIPS Approved Study Centre",
  },
  {
    icon: GraduationCap,
    title: "Experienced, CIPS-Qualified Tutors",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Form State Management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(".reveal-item");
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
              },
            },
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: "CTA Section",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to send your enquiry right now.",
        );
      }

      setFormData({ name: "", email: "", phone: "" });
      setIsSubmitted(true);

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err: any) {
      setError(
        err.message ||
          "Unable to send your enquiry right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#001B30] border-t border-white/5 overflow-hidden"
    >
      {/* Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none z-0" />

      {/* Left Blue Glow */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#0B73B9]/10 to-transparent pointer-events-none z-0" />

      {/* Right Gold Glow */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-[#f4d210]/5 to-transparent pointer-events-none z-0" />

      {/* REDUCED: py-20 md:py-32 -> py-14 md:py-20 */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          {/* Left Column: Text & Trust Signals */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            {/* REDUCED: mb-8 -> mb-5 */}
            <div className="reveal-item mb-5">
              <span className="inline-block text-xs tracking-[0.2em] font-semibold text-white/80 uppercase bg-white/10 backdrop-blur-md border border-white/20 shadow-sm px-4 py-2 rounded-full">
                Get In Touch
              </span>
            </div>

            <h2
              className="reveal-item text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-white tracking-tight leading-[1.2] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to Take Your Seat at the Executive Table?
            </h2>

            {/* REDUCED: mb-12 -> mb-8, text sizing slightly tighter */}
            <p className="reveal-item text-[15px] md:text-base font-normal leading-relaxed tracking-normal text-white/60 mb-8 max-w-md">
              Have a question about which CIPS level is right for you, or how
              distance learning works? Our team is here to help.
            </p>

            {/* REDUCED: pt-8 -> pt-6, gaps reduced */}
            <div className="reveal-item grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 border-t border-white/10 pt-6">
              {trustPoints.map((point, i) => {
                const Icon = point.icon;
                return (
                  <div key={i} className="flex items-start gap-3 group">
                    {/* REDUCED: w-10 h-10 -> w-9 h-9 */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 bg-white/5 border border-white/10 group-hover:border-[#f4d210]/50 group-hover:bg-[#f4d210]/10">
                      <Icon
                        className="w-4 h-4 text-[#f4d210] transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.5}
                      />
                    </div>
                    {/* REDUCED: pt-2.5 -> pt-1.5, text sizing */}
                    <p className="text-[13px] font-medium leading-snug tracking-normal text-white/80 pt-1.5">
                      {point.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            {/* REDUCED: p-8 md:p-10 -> p-6 md:p-8 */}
            <div className="reveal-item relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl overflow-hidden group">
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#f4d210]/40 rounded-tl-xl pointer-events-none transition-all duration-500 group-hover:border-[#f4d210]/80"></div>
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#f4d210]/40 rounded-br-xl pointer-events-none transition-all duration-500 group-hover:border-[#f4d210]/80"></div>

              {/* REDUCED: space-y-6 -> space-y-4 */}
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-white/80 mb-1.5 tracking-wide"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    disabled={isSubmitting || isSubmitted}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-base text-white placeholder-white/30 focus:outline-none focus:border-[#0B73B9] focus:bg-white/10 focus:ring-2 focus:ring-[#0B73B9]/20 transition-all duration-300 disabled:opacity-50"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-white/80 mb-1.5 tracking-wide"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    disabled={isSubmitting || isSubmitted}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-base text-white placeholder-white/30 focus:outline-none focus:border-[#0B73B9] focus:bg-white/10 focus:ring-2 focus:ring-[#0B73B9]/20 transition-all duration-300 disabled:opacity-50"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-white/80 mb-1.5 tracking-wide"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    disabled={isSubmitting || isSubmitted}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-base text-white placeholder-white/30 focus:outline-none focus:border-[#0B73B9] focus:bg-white/10 focus:ring-2 focus:ring-[#0B73B9]/20 transition-all duration-300 disabled:opacity-50"
                    placeholder="+44 20 1234 5678"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Error Message Display */}
                {error && (
                  <div className="flex items-center gap-2 text-red-300 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg text-xs font-medium">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                {/* REDUCED: pt-4 -> pt-2 */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`group w-full flex items-center justify-center gap-3 px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-500 overflow-hidden min-h-[48px] ${
                      isSubmitted
                        ? "bg-emerald-500 text-white cursor-not-allowed"
                        : isSubmitting
                          ? "bg-[#085C92] text-white cursor-wait"
                          : "bg-[#0B73B9] text-white hover:bg-[#085C92] hover:shadow-lg hover:shadow-[#0B73B9]/30"
                    }`}
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Enquiry Sent Successfully
                      </>
                    ) : isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
