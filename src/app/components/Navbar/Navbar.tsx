'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  FileText,
  CreditCard,
  Headphones,
  Phone,
} from "lucide-react";
import { SubMenuItem } from "@/app/types/navbar";
import { menuData } from "@/app/data/menuData";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";

// ─── Color Tokens ──────────────────────────────────
const COLORS = {
  primary: '#0c79bf',
  primaryDark: '#095f99',
  primaryLight: '#e8f4fc',
  primaryMuted: 'rgba(12, 121, 191, 0.08)',
  secondary: '#f4d210',
  secondaryLight: '#fefce8',
  secondaryMuted: 'rgba(244, 210, 16, 0.12)',
};

// ─── Badge Color Map ───────────────────────────────
const badgeStyles: Record<string, string> = {
  Popular: "bg-[#0c79bf]/8 text-[#0c79bf] border border-[#0c79bf]/15",
  "MCIPS Path": "bg-[#f4d210]/15 text-[#92780a] border border-[#f4d210]/25",
  "Gold Standard": "bg-[#f4d210]/15 text-[#92780a] border border-[#f4d210]/25",
  New: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  Trending: "bg-violet-50 text-violet-700 border border-violet-200/60",
  Free: "bg-sky-50 text-sky-700 border border-sky-200/60",
  Flagship: "bg-[#0c79bf]/8 text-[#0c79bf] border border-[#0c79bf]/15",
  Hiring: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
};

// ─── Top Colorful Buttons Config ───────────────────
const topActions = [
  { label: "Brochure", href: "/brochure", icon: FileText, style: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" },
  { label: "Enquire", href: "/support", icon: Headphones, style: "bg-rose-500 text-white shadow-lg shadow-rose-500/30" },
  { label: "Study Prices", href: "/fees", icon: CreditCard, style: "bg-[#f4d210] text-slate-900 shadow-lg shadow-yellow-500/30" },
];

// ─── Quick Links Config (Mobile) ──────────────────
const quickActions = [
  { label: "Brochure", href: "/brochure", icon: FileText },
  { label: "Pricing", href: "/fees", icon: CreditCard },
  { label: "Support", href: "/support", icon: Headphones },
];

// ─── Social Links Config ───────────────────────────
const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: BsLinkedin },
  { name: "X (Twitter)", href: "https://twitter.com", icon: BsTwitterX },
  { name: "Facebook", href: "https://facebook.com", icon: BsFacebook },
  { name: "Instagram", href: "https://instagram.com", icon: BsInstagram },
];

// ─── SubMenu Item Row (Desktop Mega Menu) ──────────
function SubMenuItemRow({ item, onClose }: { item: SubMenuItem; onClose: () => void }) {
  return (
    <Link href={item.href} onClick={onClose} className="mega-item group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-[#0c79bf]/[0.04]">
      <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-slate-200 transition-all duration-300 group-hover:bg-[#0c79bf] group-hover:ring-[3px] group-hover:ring-[#0c79bf]/15" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[13px] font-medium text-slate-600 transition-colors duration-200 group-hover:text-[#0c79bf]">{item.label}</span>
          {item.badge && (<span className={`inline-flex rounded-md px-2 py-[1px] text-[10px] font-semibold tracking-wide leading-none ${badgeStyles[item.badge] || "bg-slate-50 text-slate-500 border border-slate-200/60"}`}>{item.badge}</span>)}
        </div>
        {item.description && (<p className="mt-0.5 text-[11.5px] text-slate-400 leading-relaxed">{item.description}</p>)}
      </div>
      <ArrowRight className="mt-1 h-3 w-3 flex-shrink-0 text-transparent transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#0c79bf]" />
    </Link>
  );
}

// ─── Mobile Course Modal ───────────────────────────
function CourseModal({ isOpen, onClose, columns, menuLabel }: { isOpen: boolean; onClose: () => void; columns: { title: string; items: SubMenuItem[] }[]; menuLabel: string; }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        if (!modalRef.current || !backdropRef.current) return;
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } }); tlRef.current = tl;
        tl.to(backdropRef.current, { opacity: 1, duration: 0.3 }, 0);
        tl.fromTo(modalRef.current, { y: "100%" }, { y: 0, duration: 0.55, ease: "power4.out" }, 0);
        const sections = modalRef.current.querySelectorAll(".course-section");
        if (sections.length) tl.fromTo(sections, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, 0.2);
        const items = modalRef.current.querySelectorAll(".course-item");
        if (items.length) tl.fromTo(items, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, stagger: 0.02, ease: "power2.out" }, 0.3);
      });
    } else {
      if (tlRef.current) tlRef.current.kill();
      const tl = gsap.timeline({ defaults: { ease: "power2.in", duration: 0.25 }, onComplete: () => { document.body.style.overflow = ""; } }); tlRef.current = tl;
      if (backdropRef.current) tl.to(backdropRef.current, { opacity: 0 }, 0);
      if (modalRef.current) tl.to(modalRef.current, { y: "100%" }, 0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", handleKey); return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      <div ref={backdropRef} className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm" style={{ opacity: 0, display: isOpen ? "block" : "none" }} onClick={onClose} />
      <div ref={modalRef} className="fixed inset-x-0 bottom-0 z-[61] bg-white rounded-t-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.12)] max-h-[88vh] flex flex-col" style={{ transform: "translateY(100%)", display: isOpen ? "flex" : "none" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0"><div className="h-1 w-10 rounded-full bg-slate-200" /></div>
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors" aria-label="Go back"><ArrowLeft className="h-4 w-4" /></button>
            <div><h2 className="text-[14px] font-semibold text-slate-900">{menuLabel}</h2><p className="text-[11px] text-slate-400">Choose your qualification level</p></div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors" aria-label="Close"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 overscroll-contain">
          <div className="space-y-6">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="course-section">
                <div className="flex items-center gap-2 mb-3"><span className="h-1.5 w-1.5 rounded-full bg-[#f4d210]" /><h3 className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#0c79bf]">{col.title}</h3><div className="flex-1 h-px bg-slate-100 ml-2" /></div>
                <div className="space-y-1">
                  {col.items.map((item, itemIdx) => (
                    <Link key={itemIdx} href={item.href} onClick={onClose} className="course-item group flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-[#0c79bf]/[0.04] border border-transparent hover:border-[#0c79bf]/10">
                      <span className="mt-[6px] h-1 w-1 flex-shrink-0 rounded-full bg-slate-200 transition-all duration-300 group-hover:bg-[#0c79bf] group-hover:ring-[3px] group-hover:ring-[#0c79bf]/15" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[13px] font-medium text-slate-600 transition-colors duration-200 group-hover:text-[#0c79bf]">{item.label}</span>
                          {item.badge && (<span className={`inline-flex rounded-md px-1.5 py-[1px] text-[9px] font-semibold tracking-wide leading-none ${badgeStyles[item.badge] || "bg-slate-50 text-slate-500 border border-slate-200/60"}`}>{item.badge}</span>)}
                        </div>
                        {item.description && (<p className="mt-1 text-[11.5px] text-slate-400 leading-relaxed">{item.description}</p>)}
                      </div>
                      <ArrowRight className="mt-1.5 h-3.5 w-3.5 flex-shrink-0 text-transparent transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#0c79bf]" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 border-t border-slate-100 px-5 py-4 bg-white/95 backdrop-blur-sm">
          <Link href="/join" onClick={onClose} className="flex items-center justify-center gap-2 w-full py-3.5 text-[12.5px] font-semibold tracking-wide text-white bg-[#0c79bf] rounded-xl hover:bg-[#095f99] transition-all duration-300 shadow-lg shadow-[#0c79bf]/20">Enroll Now <ArrowRight className="w-3.5 h-3.5" /></Link>
          <p className="text-center mt-2.5 text-[11px] text-slate-400">Not sure which level? <Link href="/support" onClick={onClose} className="text-[#0c79bf] font-medium hover:underline">Get free advice</Link></p>
        </div>
      </div>
    </>
  );
}

// ─── Main Navbar ────────────────────────────────────
export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const coursesMenu = menuData.find((m) => m.columns);
  const allCourseColumns = coursesMenu?.columns || [];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true }); handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function moveIndicator(label: string | null) {
    if (!navIndicatorRef.current) return;
    if (!label) { gsap.to(navIndicatorRef.current, { scaleX: 0, duration: 0.25, ease: "power2.in" }); return; }
    const el = navItemRefs.current.get(label); if (!el) return;
    const rect = el.getBoundingClientRect(); const navRect = el.closest("nav")?.getBoundingClientRect(); if (!navRect) return;
    gsap.to(navIndicatorRef.current, { x: rect.left - navRect.left - 10, width: rect.width + 20, scaleX: 1, duration: 0.4, ease: "power3.out" });
  }

  function forceCloseMenu() { if (closeTimeout.current) clearTimeout(closeTimeout.current); if (menuTl.current) menuTl.current.kill(); setActiveMenu(null); moveIndicator(null); }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") { if (isCourseModalOpen) setIsCourseModalOpen(false); else if (isMobileOpen) setIsMobileOpen(false); else if (activeMenu) forceCloseMenu(); } };
    window.addEventListener("keydown", handleKey); return () => window.removeEventListener("keydown", handleKey);
  }, [isMobileOpen, activeMenu, isCourseModalOpen]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => { if (!activeMenu || !navRef.current) return; if (!navRef.current.contains(e.target as Node)) forceCloseMenu(); };
    document.addEventListener("mousedown", handleMouseDown); return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [activeMenu]);

  useEffect(() => {
    if (!isCourseModalOpen) { document.body.style.overflow = isMobileOpen ? "hidden" : ""; } return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen, isCourseModalOpen]);

  function openCourseModal() { setIsMobileOpen(false); setTimeout(() => setIsCourseModalOpen(true), 350); }

  function openMenu(label: string) {
    if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
    if (activeMenu === label) return;
    const menuItem = menuData.find((m) => m.label === label); if (!menuItem?.columns) return;
    if (menuTl.current) menuTl.current.kill(); setActiveMenu(label); moveIndicator(label);
    requestAnimationFrame(() => {
      if (!menuPanelRef.current || !overlayRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } }); menuTl.current = tl;
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 }, 0);
      tl.fromTo(menuPanelRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0);
      const topLine = menuPanelRef.current.querySelector(".mega-top-line"); if (topLine) tl.fromTo(topLine, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" }, 0.05);
      const cols = menuPanelRef.current.querySelectorAll(".mega-col"); if (cols.length) tl.fromTo(cols, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.06 }, 0.1);
      const items = menuPanelRef.current.querySelectorAll(".mega-item"); if (items.length) tl.fromTo(items, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, stagger: 0.015, ease: "power2.out" }, 0.15);
      const featured = menuPanelRef.current.querySelector(".mega-featured"); if (featured) tl.fromTo(featured, { y: 16, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" }, 0.2);
    });
  }

  function closeMenu() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => {
      if (menuTl.current) menuTl.current.kill();
      const tl = gsap.timeline({ defaults: { ease: "power2.in", duration: 0.2 }, onComplete: () => setActiveMenu(null) }); menuTl.current = tl;
      if (overlayRef.current) tl.to(overlayRef.current, { opacity: 0 }, 0);
      if (menuPanelRef.current) tl.to(menuPanelRef.current, { y: -6, opacity: 0 }, 0);
      moveIndicator(null);
    }, 120);
  }

  const activeMenuItem = menuData.find((m) => m.label === activeMenu);

  return (
    <>
      {/* ═══ MEGA MENU OVERLAY ═══ */}
      <div ref={overlayRef} className={`fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[2px] cursor-pointer ${activeMenu ? "pointer-events-auto" : "pointer-events-none"}`} style={{ opacity: 0, display: activeMenu ? "block" : "none" }} onClick={forceCloseMenu} />

      {/* ═══ NAVBAR ═══ */}
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/[0.98] backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] border-b border-slate-100/80" : "bg-gradient-to-b from-black/60 via-black/20 to-transparent"}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* ═══ DESKTOP: TWO-ROW LAYOUT ═══ */}
          <div className="hidden lg:flex flex-col">
            
            {/* ── ROW 1: Top Actions + Phone (Collapses on scroll) ── */}
            <div className={`flex items-center justify-end gap-2.5 transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? "max-h-0 opacity-0 pt-0 pb-0 mb-0" : "max-h-16 opacity-100 pt-5 pb-2 mb-2"}`}>
              {topActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} href={action.href} className={`group flex items-center gap-2 px-4 py-2 rounded-md text-[10.5px] font-bold tracking-[0.1em] uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${action.style}`}>
                    <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    {action.label}
                  </Link>
                );
              })}
              
              <a href="tel:+442012345678" className="flex items-center gap-2 pl-4 ml-1 border-l border-white/20 text-white/80 hover:text-white transition-colors duration-300">
                <Phone className="w-3.5 h-3.5" strokeWidth={2} />
                <span className="text-[11px] font-semibold tracking-wide">+44 20 1234 5678</span>
              </a>
            </div>

            {/* ── ROW 2: Main Navbar (Always visible) ── */}
            <div className="flex items-center justify-between pb-4 pt-1">
              {/* Logo always here */}
              <Link href="/" className={`relative h-12 w-32 flex-shrink-0 transition-all duration-500 ${isScrolled ? "" : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"}`}>
                <Image src="/logo/logo.webp" alt="LSHS" fill className="object-contain" priority />
              </Link>

              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-1 relative">
                  <Link href="/" className={`px-4 py-2 text-[13.5px] font-medium tracking-wide transition-all duration-300 rounded-lg ${isScrolled ? "text-slate-500 hover:text-slate-900 hover:bg-slate-50" : "text-white/90 hover:text-white hover:bg-white/10"}`}>
                    Home
                  </Link>

                  {menuData.map((item) =>
                    item.columns ? (
                      <button key={item.label} ref={(el) => { if (el) navItemRefs.current.set(item.label, el); }} onMouseEnter={() => openMenu(item.label)} className={`relative flex items-center gap-1.5 px-4 py-2 text-[13.5px] font-medium tracking-wide transition-all duration-300 rounded-lg ${activeMenu === item.label ? (isScrolled ? "text-[#0c79bf]" : "text-white") : isScrolled ? "text-slate-500 hover:text-slate-900 hover:bg-slate-50" : "text-white/90 hover:text-white hover:bg-white/10"}`}>
                        {item.label}
                        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeMenu === item.label ? "rotate-180" : ""}`} />
                      </button>
                    ) : (
                      <Link key={item.label} href={item.href} className={`px-4 py-2 text-[13.5px] font-medium tracking-wide transition-all duration-300 rounded-lg ${isScrolled ? "text-slate-500 hover:text-slate-900 hover:bg-slate-50" : "text-white/90 hover:text-white hover:bg-white/10"}`}>
                        {item.label}
                      </Link>
                    )
                  )}
                  <div ref={navIndicatorRef} className={`absolute -bottom-[2px] h-[2px] rounded-full origin-left transition-colors duration-500 ${isScrolled ? "bg-[#0c79bf]" : "bg-[#f4d210]"}`} style={{ transform: "scaleX(0)" }} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className={`hidden lg:flex items-center gap-0.5 mr-2 transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-70"}`}>
                  {socialLinks.map((social) => { const Icon = social.icon; return (<a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300 ${isScrolled ? "text-slate-400 hover:text-[#0c79bf] hover:bg-[#0c79bf]/[0.06]" : "text-white/60 hover:text-white hover:bg-white/15"}`}><Icon className="w-[14px] h-[14px]" /></a>); })}
                </div>

                <div className={`hidden lg:block h-5 w-px transition-colors duration-500 ${isScrolled ? "bg-slate-200" : "bg-white/20"}`} />

                <Link href="/join" className={`hidden sm:inline-flex items-center gap-2 text-[12px] font-semibold tracking-wide px-5 py-2.5 rounded-lg transition-all duration-500 ml-2 whitespace-nowrap ${isScrolled ? "bg-[#0c79bf] text-white hover:bg-[#095f99] hover:shadow-lg hover:shadow-[#0c79bf]/25 hover:-translate-y-px" : "bg-[#f4d210] text-slate-900 hover:bg-[#f4d210]/90 hover:shadow-lg hover:shadow-[#f4d210]/20 hover:-translate-y-px"}`}>
                  Enroll Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ═══ MOBILE TOP BAR ═══ */}
          <div className="flex lg:hidden items-center justify-between h-16 px-1">
            <Link href="/" className="relative h-10 w-28 flex-shrink-0">
              <Image src="/logo/logo.webp" alt="LSHS" fill className={`object-contain transition-all duration-500 ${isScrolled ? "" : "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"}`} priority />
            </Link>
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${isScrolled ? "text-slate-400 hover:text-slate-900 hover:bg-slate-50" : "text-white/80 hover:text-white hover:bg-white/10"}`} aria-label="Toggle menu">
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ═══ DESKTOP MEGA MENU PANEL ═══ */}
        <div ref={menuPanelRef} className={`absolute top-full left-0 right-0 opacity-0 ${activeMenu ? "pointer-events-auto" : "pointer-events-none"}`} onMouseEnter={() => { if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; } }} onMouseLeave={closeMenu} style={{ display: activeMenu ? "block" : "none" }}>
          <div className="mega-top-line h-[2px] w-full bg-gradient-to-r from-transparent via-[#0c79bf] to-transparent origin-left" />
          <div className="bg-white border-b border-slate-100 shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
            <div className="mx-auto max-w-5xl px-8 py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-8">
                <div className="mega-col">
                  {activeMenuItem?.columns?.map((col, colIdx) => (
                    <div key={colIdx} className={colIdx > 0 ? "mt-8" : ""}>
                      <h3 className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#0c79bf] mb-4 pb-2.5 border-b border-slate-100 flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-[#f4d210]" />{col.title}
                      </h3>
                      <div className="space-y-0.5">
                        {col.items.map((subItem, subIdx) => (<SubMenuItemRow key={subIdx} item={subItem} onClose={forceCloseMenu} />))}
                      </div>
                    </div>
                  ))}
                </div>
                {activeMenuItem?.featured && (
                  <div className="mega-featured flex items-center">
                    <Link href={activeMenuItem.featured.href} onClick={forceCloseMenu} className="group block w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                      <div className="relative h-48 overflow-hidden">
                        <img src={activeMenuItem.featured.image} alt={activeMenuItem.featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-md bg-[#f4d210] px-2.5 py-1 shadow-sm">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="#0c79bf" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                          <span className="text-[8.5px] font-bold text-slate-900 tracking-widest uppercase">Featured</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="text-[17px] font-semibold text-slate-900 mb-2 group-hover:text-[#0c79bf] transition-colors duration-300" style={{ fontFamily: "var(--font-playfair)" }}>{activeMenuItem.featured.title}</h4>
                        <p className="text-[13px] text-slate-400 leading-relaxed mb-5">{activeMenuItem.featured.description}</p>
                        <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#0c79bf] group-hover:gap-3 transition-all duration-300">{activeMenuItem.featured.ctaText || "Learn More"} <ArrowRight className="h-3.5 w-3.5" /></span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400">Follow Us</span>
                  <div className="flex items-center gap-1">{socialLinks.map((social) => { const Icon = social.icon; return (<a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:text-[#0c79bf] hover:bg-[#0c79bf]/[0.06] transition-all duration-300"><Icon className="w-3 h-3" /></a>); })}</div>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-slate-400">
                  <a href="mailto:info@lshs.ac.uk" className="hover:text-[#0c79bf] transition-colors">info@lshs.ac.uk</a>
                  <span className="text-slate-200">|</span>
                  <a href="tel:+442012345678" className="hover:text-[#0c79bf] transition-colors">+44 20 1234 5678</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ MOBILE COURSE MODAL ═══ */}
      <CourseModal isOpen={isCourseModalOpen} onClose={() => setIsCourseModalOpen(false)} columns={allCourseColumns} menuLabel={coursesMenu?.label || "Courses"} />

      {/* ═══ MOBILE BACKDROP ═══ */}
      <div className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-all duration-500 ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsMobileOpen(false)} aria-hidden="true" />

      {/* ═══ MOBILE DRAWER ═══ */}
      <div className={`fixed inset-y-0 right-0 z-[41] w-[85%] max-w-[360px] bg-white shadow-2xl shadow-slate-900/15 lg:hidden transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileOpen ? "translate-x-0" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between h-[56px] px-5 border-b border-slate-100 flex-shrink-0">
          <div className="relative h-6 w-20 flex-shrink-0"><Image src="/logo/logo.webp" alt="LSHS" fill className="object-contain" /></div>
          <button onClick={() => setIsMobileOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors" aria-label="Close menu"><X className="h-4 w-4" /></button>
        </div>
        
        <div className="h-[calc(100vh-56px)] overflow-y-auto px-5 pb-8 flex flex-col">
          {/* ═══ FIRST SEGMENT: Actions, Social & Phone ═══ */}
          <div className="pt-6 pb-5 border-b border-slate-100">
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {quickActions.map((action) => { const Icon = action.icon; return (<Link key={action.label} href={action.href} onClick={() => setIsMobileOpen(false)} className="group flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-slate-100 hover:border-[#0c79bf]/30 hover:bg-[#0c79bf]/[0.03] active:scale-95 transition-all duration-300"><Icon className="w-5 h-5 text-slate-400 group-hover:text-[#0c79bf] transition-colors" strokeWidth={1.5} /><span className="text-[11px] font-semibold text-slate-600 group-hover:text-[#0c79bf] transition-colors">{action.label}</span></Link>); })}
            </div>
            <div className="flex items-center justify-between bg-slate-50/60 rounded-lg px-3.5 py-2.5 border border-slate-100/80">
              <div className="flex items-center gap-1.5">{socialLinks.map((social) => { const Icon = social.icon; return (<a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:text-[#0c79bf] transition-colors"><Icon className="w-3.5 h-3.5" /></a>); })}</div>
              <a href="tel:+442012345678" className="flex items-center gap-2 text-[11.5px] font-semibold text-slate-600 hover:text-[#0c79bf] transition-colors"><Phone className="w-3.5 h-3.5" strokeWidth={2} />+44 20 1234 5678</a>
            </div>
          </div>

          {/* ═══ SECOND SEGMENT: Main Navigation ═══ */}
          <div className="flex flex-col mt-2">
            <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-between py-3.5 text-[14px] font-medium text-slate-800 border-b border-slate-50 active:bg-slate-50 transition-colors">
              <span className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-slate-200" />Home</span>
            </Link>

            <button onClick={openCourseModal} className="flex w-full items-center justify-between py-3.5 text-[14px] font-medium text-slate-800 border-b border-slate-50 active:bg-slate-50 transition-colors group">
              <span className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-[#f4d210]" />Supply Chain & Procurement</span>
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400 group-hover:text-[#0c79bf] transition-colors">Levels <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" /></span>
            </button>

            <Link href="/courses" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-between py-3.5 text-[14px] font-medium text-slate-800 border-b border-slate-50 active:bg-slate-50 transition-colors">
              <span className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-slate-200" />Courses</span>
            </Link>

            <Link href="/about" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-between py-3.5 text-[14px] font-medium text-slate-800 border-b border-slate-50 active:bg-slate-50 transition-colors">
              <span className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-slate-200" />About</span>
            </Link>

            <Link href="/contact" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-between py-3.5 text-[14px] font-medium text-slate-800 border-b border-slate-50 active:bg-slate-50 transition-colors">
              <span className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-slate-200" />Contact</span>
            </Link>
          </div>

          <div className="flex-1 min-h-[32px]" />
          
          <div className="mt-4 space-y-2.5">
            <Link href="/join" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center gap-2 w-full py-3.5 text-[12.5px] font-semibold tracking-wide text-white bg-[#0c79bf] rounded-lg hover:bg-[#095f99] transition-all duration-300 shadow-lg shadow-[#0c79bf]/20">Enroll Now <ArrowRight className="w-3.5 h-3.5" /></Link>
            <Link href="/login" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center w-full py-2.5 text-[11.5px] font-medium text-slate-400 hover:text-[#0c79bf] transition-colors">Existing Student? Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}