"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// ─── Sub-Components ──────────────────────────────────────────

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="split-word inline-block overflow-hidden pb-2">
          <span
            className="inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}

// ─── Main Page Component ─────────────────────────────────────
export default function ContactUsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    company: "",
    designation: "",
    interest: "",
    message: "",
  });

  // Form State Management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "Contact Page",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to send your message right now.",
        );
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        company: "",
        designation: "",
        interest: "",
        message: "",
      });
      setIsSubmitted(true);

      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err: any) {
      setError(
        err.message ||
          "Unable to send your message right now. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Master Animations ─────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    const ctx = gsap.context(() => {
      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      const heroTl = gsap.timeline({ delay: 0.4 });

      heroTl
        .from(".hero-badge", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".split-word span",
          {
            y: "110%",
            opacity: 0,
            rotate: 3,
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.6",
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        );

      gsap.to(".float-accent", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      const items = gsap.utils.toArray<HTMLElement>(".reveal-item");
      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const inputClasses =
    "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B73B9] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const labelClasses =
    "block text-xs font-bold tracking-wider uppercase text-slate-500 mb-2";

  return (
    <main ref={pageRef} className="bg-white">
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#001B30]"
      >
        <div
          ref={heroBgRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%] scale-105"
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
            alt="Corporate Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#001B30]/80 via-[#001B30]/70 to-[#001B30] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />

        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#0B73B9]/20 to-transparent pointer-events-none float-accent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-gradient-to-tl from-[#f4d210]/10 to-transparent pointer-events-none float-accent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32 md:py-40 ">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <Mail size={14} className="text-[#f4d210]" />
            <span className="text-xs font-medium tracking-widest uppercase text-white/60">
              Get in Touch
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <SplitText text="Contact Us" className="block" />
          </h1>

          <p className="hero-desc text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
            Ready to start your CIPS journey, or have a question before you
            enrol? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ═══════════════════ QUICK INFO STRIP ═══════════════════ */}
      <section className="border-b border-slate-100 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Email Block */}
          <div className="reveal-item flex items-start gap-4 py-8 md:py-10 md:pr-8">
            <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#0B73B9]/5 border border-[#0B73B9]/10 flex items-center justify-center">
              <Mail size={18} className="text-[#0B73B9]" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-1.5">
                  Email Us
                </p>
                <a
                  href="mailto:info@lshs.co.uk"
                  className="text-base font-semibold text-slate-900 hover:text-[#0B73B9] transition-colors block"
                >
                  info@lshs.co.uk
                </a>
                <p className="text-sm text-slate-500 mt-0.5">
                  Reply within 24 hours
                </p>
              </div>
              <div>
                <a
                  href="mailto:info@samangroup.com.bd"
                  className="text-base font-semibold text-slate-900 hover:text-[#0B73B9] transition-colors block"
                >
                  info@samangroup.com.bd
                </a>
                <p className="text-sm text-slate-500 mt-0.5">Company Email</p>
              </div>
            </div>
          </div>

          {/* Phone Block */}
          <div className="reveal-item flex items-start gap-4 py-8 md:py-10 md:px-8">
            <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#f4d210]/5 border border-[#f4d210]/10 flex items-center justify-center">
              <Phone size={18} className="text-[#b58b00]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-1.5">
                Call Us
              </p>
              <div className="grid grid-cols-1 gap-x-4 gap-y-0.5">
                <a
                  href="tel:+447515106586"
                  className="text-sm font-medium text-slate-700 hover:text-[#0B73B9] transition-colors"
                >
                  +44 7515 106586
                </a>
                <a
                  href="tel:+442033766160"
                  className="text-sm font-medium text-slate-700 hover:text-[#0B73B9] transition-colors"
                >
                  +44 2033 766160
                </a>
                <a
                  href="tel:+8801912234588"
                  className="text-sm font-medium text-slate-700 hover:text-[#0B73B9] transition-colors"
                >
                  +880 19 1223 4588
                </a>
                <a
                  href="tel:+8801906896326"
                  className="text-sm font-medium text-slate-700 hover:text-[#0B73B9] transition-colors"
                >
                  +880 19 0689 6326
                </a>
              </div>
              <p className="text-sm text-slate-500 mt-1.5">24/7 Available</p>
            </div>
          </div>

          {/* Location Block */}
          <div className="reveal-item col-span-2 flex items-start gap-4 py-8 md:py-10 md:pl-8">
            <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#0B73B9]/5 border border-[#0B73B9]/10 flex items-center justify-center">
              <MapPin size={18} className="text-[#0B73B9]" strokeWidth={1.5} />
            </div>
            {/* Updated to Two-Column Layout */}
            <div className="flex-1">
              <p className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3">
                Our Location
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-slate-600">
                <div>
                  <span className="block font-semibold text-slate-900 mb-1">
                    Registered Address
                  </span>
                  135 Tiptree Crescent, Ilford IG5 0SX, UK
                </div>
                <div>
                  <span className="block font-semibold text-slate-900 mb-1">
                    UK Office
                  </span>
                  Unit 7 Stanton Gate, 49 Mawney Road, Essex RM7 7HL, UK
                </div>
                <div>
                  <span className="block font-semibold text-slate-900 mb-1">
                    BD Office
                  </span>
                  Prantik, House - 412, Road - 29, Mohakhali DOHS, Dhaka, BD
                </div>
                <div>
                  <span className="block font-semibold text-slate-900 mb-1">
                    Sampan HQ
                  </span>
                  SAMPAN 21ST CENTURY TOWER, House - 284, Block - B, Road - 1/A,
                  Bashundhara R/A, BD
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FORM & SIDEBAR ═══════════════════ */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* --- Form Column (Scrollable) --- */}
          <div className="reveal-item lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm tracking-[0.2em] font-semibold text-[#0B73B9] uppercase">
                Enquiry Form
              </span>
              <div className="w-12 h-0.5 bg-[#0B73B9]" />
            </div>

            <h2
              className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Send Us a Message
            </h2>
            <p className="text-base text-slate-500 mb-10 max-w-xl">
              Fill out the form below and a member of our team will get back to
              you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    className={inputClasses}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    className={inputClasses}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    className={inputClasses}
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    className={inputClasses}
                    placeholder="+44 7700 000000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Country Name</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    className={inputClasses}
                    placeholder="United Kingdom"
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    City/area Name/Postcode
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    className={inputClasses}
                    placeholder="London, E1 1AB"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Your Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    className={inputClasses}
                    placeholder="Company Ltd."
                  />
                </div>
                <div>
                  <label className={labelClasses}>Your Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    className={inputClasses}
                    placeholder="Procurement Manager"
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>I am interested in...</label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  disabled={isSubmitting || isSubmitted}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.25rem",
                  }}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="cips">CIPS Courses</option>
                  <option value="pricing">Pricing and Payment Models</option>
                  <option value="other">Other / General Enquiry</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>Message *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting || isSubmitted}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us about your procurement goals..."
                ></textarea>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-lg text-sm font-medium">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {isSubmitted && (
                <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-4 rounded-lg text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Message Sent Successfully</p>
                    <p className="text-xs text-emerald-600 mt-0.5">
                      Thank you for contacting London School of Higher Studies.
                      Our admissions team will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`group w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 text-white rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-300 min-h-[52px] ${
                  isSubmitted
                    ? "bg-emerald-500 cursor-not-allowed"
                    : isSubmitting
                      ? "bg-[#085C92] cursor-wait"
                      : "bg-[#0B73B9] hover:bg-[#085C92] hover:shadow-lg hover:shadow-[#0B73B9]/20"
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle2 size={16} />
                    Message Sent
                  </>
                ) : isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* --- Sidebar Column (Sticky) --- */}
          <div className="reveal-item lg:col-span-5 lg:sticky lg:top-24 self-start">
            <div className="contact-animate flex flex-col gap-8">
              {/* Why Contact Us Card */}
              <div
                className="rounded-3xl p-8 md:p-10 text-white relative overflow-hidden flex-grow"
                style={{ backgroundColor: "#0A0A0A" }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-[80px] bg-[#D4AF37]" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 tracking-tight">
                    Why speak to us?
                  </h3>
                  <div className="space-y-5">
                    {[
                      "Get personalized study advice tailored to your experience.",
                      "Understand the fastest route to MCIPS Chartered Status.",
                      "Learn about our flexible payment plans and funding options.",
                      "Meet our expert tutors and support staff.",
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="text-[#D4AF37] mt-0.5 flex-shrink-0"
                        />
                        <p className="text-white/50 text-sm leading-relaxed">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <Clock size={18} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Average Response Time
                        </p>
                        <p className="text-xs text-white/40">Under 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <Sparkles size={18} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          No Obligation
                        </p>
                        <p className="text-xs text-white/40">
                          Completely free consultation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Immediate Help / WhatsApp Card */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
                  Need Immediate Help?
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Call our admissions team directly
                </p>

                <a
                  href="https://wa.me/447515106586"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors group mb-4"
                >
                  <FaWhatsapp size={20} className="text-[#25D366]" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#25D366] transition-colors">
                      +44 7515 106586
                    </p>
                    <p className="text-xs text-gray-400">
                      tap/click to WhatsApp
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/8801906896326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors group"
                >
                  <FaWhatsapp size={20} className="text-[#25D366]" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#25D366] transition-colors">
                      +880 19 0689 6326
                    </p>
                    <p className="text-xs text-gray-400">
                      tap/click to WhatsApp
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
