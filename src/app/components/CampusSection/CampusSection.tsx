"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowUpRight, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    name: "Dhaka Office",
    headline: "LSHS Dhaka Office",
    body: "Our Dhaka office supports learners locally with enrolment guidance, study material distribution and in-person tutor support, alongside full access to CIPS distance learning resources.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop", // Replace with LSHS Website Image
    mapLink: "#",
  },
  {
    name: "Dhaka Office",
    headline: "LSHS Dhaka Office",
    body: "The Dhaka office extends the same enrolment and study support to learners outside Dhaka, with the same access to CIPS-aligned course materials and tutor guidance.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop", // Replace with LSHS Website Image
    mapLink: "#",
  },
];

export default function CampusSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".reveal-item");
      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white border-t border-slate-100"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="reveal-item flex items-center gap-4 mb-6">
            <span className="amb-header-item inline-block text-xs tracking-[0.2em] font-semibold text-slate-600 uppercase bg-white/50 backdrop-blur-md border border-slate-200 shadow-sm px-4 py-2 rounded-full">
              Campus &amp; Offices
            </span>
          </div>
          <h2
            className="reveal-item text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.2]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Locations
          </h2>
          <p className="reveal-item mt-6 text-base font-normal leading-relaxed tracking-normal text-slate-600">
            Find us in Dhaka and Kashiani. Both offices are fully equipped to
            support your CIPS journey, from enrolment to examination.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {offices.map((office, i) => (
            <div key={i} className="reveal-item flex flex-col">
              {/* Faux Browser Image Frame */}
              <div className="relative bg-slate-50 rounded-xl border border-slate-200 shadow-sm overflow-hidden group transition-all duration-500 hover:shadow-xl hover:border-[#0B73B9]/20">
                {/* Browser Top Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70"></div>
                  <div className="flex-1 mx-4 flex items-center bg-white rounded-md px-3 py-1 border border-slate-200">
                    <Globe className="w-3 h-3 text-slate-400 mr-2" />
                    <span className="text-xs text-slate-400 font-mono">
                      www.lshs.edu.bd
                    </span>
                  </div>
                </div>

                {/* Image Area */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={office.image}
                    alt={`${office.name} Website Screenshot`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay Link */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <Link
                        href="#"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-md text-sm font-semibold text-slate-900 shadow-lg"
                      >
                        Visit Website
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#0B73B9]" strokeWidth={2} />
                  <span className="text-sm tracking-[0.15em] font-semibold text-[#0B73B9] uppercase">
                    {office.name}
                  </span>
                </div>

                <h3
                  className="text-2xl lg:text-3xl font-medium text-slate-900 tracking-tight leading-[1.2] mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {office.headline}
                </h3>

                <p className="text-base font-normal leading-relaxed tracking-normal text-slate-600">
                  {office.body}
                </p>

                <Link
                  href={office.mapLink}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-slate-700 hover:text-[#0B73B9] transition-colors duration-300 border-b border-slate-200 hover:border-[#0B73B9] pb-1"
                >
                  View on Map
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
