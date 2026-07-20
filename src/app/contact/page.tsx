'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Sub-Components ──────────────────────────────────────────

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="split-word inline-block overflow-hidden">
          <span className="inline-block" style={{ willChange: 'transform, opacity' }}>
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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    alert('Form submitted successfully!');
  };

  // ─── Master Animations ─────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const ctx = gsap.context(() => {
      // Hero Animations
      const heroTl = gsap.timeline({ delay: 0.3 });

      heroTl
        .from('.hero-badge', {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(
          '.split-word span',
          {
            y: '110%',
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .from(
          '.hero-desc',
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        );

      // Floating Orbs Parallax
      gsap.to('.hero-orb-1', {
        y: -100,
        x: 50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Info Cards Stagger
      gsap.from('.info-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.info-grid',
          start: 'top 85%',
        },
      });

      // Form & Sidebar Stagger
      gsap.from('.contact-animate', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 85%',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-[#FAFAFA] overflow-x-hidden" style={{ position: 'relative', top: 0, left: 0 }}>
      
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#050505]"
      >
        <div className="absolute inset-0">
          <div
            className="hero-orb-1 absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(0, 168, 168, 0.15) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10">
            <Mail size={14} className="text-[#D4AF37]" />
            <span className="text-xs font-medium tracking-widest uppercase text-white/60">
              Get in Touch
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter mb-8">
            <SplitText text="Contact Us" className="block" />
          </h1>

          <p className="hero-desc text-base md:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
            Ready to start your MCIPS journey or have a question for our team? 
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ═══════════════════ QUICK INFO BAR ═══════════════════ */}
      <section className="relative z-10 -mt-16 mb-20 px-6">
        <div className="info-grid max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Mail, title: 'Email Us', info: 'admissions@lshs.co.uk', sub: 'Reply within 24 hours' },
            { icon: Phone, title: 'Call Us', info: '+44 (0) 20 1234 5678', sub: 'Mon-Fri, 9am - 6pm' },
            { icon: MapPin, title: 'Visit Us', info: 'London, United Kingdom', sub: 'By appointment only' },
          ].map((item, i) => (
            <div
              key={i}
              className="info-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                <item.icon size={22} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-1">{item.title}</p>
                <p className="text-sm font-bold text-gray-900">{item.info}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ FORM & SIDEBAR ═══════════════════ */}
      <section className="pb-32 px-6">
        <div className="contact-grid max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* --- Form Column --- */}
          <div className="contact-animate lg:col-span-3 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Send us a message</h2>
            <p className="text-gray-500 mb-10">Fill out the form below and a member of our team will get back to you shortly.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  placeholder="+44 7700 000000"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">I am interested in...</label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
                >
                  <option value="" disabled>Select a qualification</option>
                  <option value="level-2">CIPS Level 2 (Foundation)</option>
                  <option value="level-3">CIPS Level 3 (Advanced Certificate)</option>
                  <option value="level-4">CIPS Level 4 (Diploma)</option>
                  <option value="level-5">CIPS Level 5 (Advanced Diploma)</option>
                  <option value="level-6">CIPS Level 6 (Professional Diploma)</option>
                  <option value="mcips">MCIPS Chartered Status</option>
                  <option value="other">Other / General Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your procurement goals..."
                />
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#D4AF37] text-black rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:bg-[#e0bd45] hover:shadow-lg hover:shadow-[#D4AF37]/20"
              >
                Send Message
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* --- Sidebar Column --- */}
          <div className="contact-animate lg:col-span-2 flex flex-col gap-8">
            
            {/* Why Contact Us Card */}
            <div className="rounded-3xl p-8 md:p-10 text-white relative overflow-hidden flex-grow" style={{ backgroundColor: '#0A0A0A' }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-[80px] bg-[#D4AF37]" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 tracking-tight">Why speak to us?</h3>
                <div className="space-y-5">
                  {[
                    'Get personalized study advice tailored to your experience.',
                    'Understand the fastest route to MCIPS Chartered Status.',
                    'Learn about our flexible payment plans and funding options.',
                    'Meet our expert tutors and support staff.'
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <p className="text-white/50 text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                      <Clock size={18} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Average Response Time</p>
                      <p className="text-xs text-white/40">Under 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                      <Sparkles size={18} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">No Obligation</p>
                      <p className="text-xs text-white/40">Completely free consultation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Need immediate help?</h3>
              <a 
                href="tel:+442012345678" 
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors group mb-4"
              >
                <Phone size={20} className="text-[#D4AF37]" />
                <div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-[#D4AF37] transition-colors">+44 (0) 20 1234 5678</p>
                  <p className="text-xs text-gray-400">Call our admissions team directly</p>
                </div>
              </a>
              <a 
                href="mailto:admissions@lshs.co.uk" 
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors group"
              >
                <Mail size={20} className="text-[#D4AF37]" />
                <div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-[#D4AF37] transition-colors">admissions@lshs.co.uk</p>
                  <p className="text-xs text-gray-400">Send us an email directly</p>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}