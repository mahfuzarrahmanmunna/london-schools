"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { SubMenuItem } from "@/app/types/navbar";
import { menuData } from "@/app/data/menuData";

// ─── Badge Color Map ─────────────────────────────────
const badgeStyles: Record<string, string> = {
  Popular: "bg-cips/10 text-cips",
  "MCIPS Path": "bg-gold/15 text-gold-dark",
  "Gold Standard": "bg-yellow-100 text-yellow-800",
  New: "bg-emerald-100 text-emerald-700",
  Trending: "bg-violet-100 text-violet-700",
  Free: "bg-sky-100 text-sky-700",
  Flagship: "bg-rose-100 text-rose-700",
  Hiring: "bg-green-100 text-green-700",
};

// ─── SubMenu Item Row ───────────────────────────────
function SubMenuItemRow({
  item,
  onClose,
}: {
  item: SubMenuItem;
  onClose: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="mega-item group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-navy-50"
    >
      <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-cips" />
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-medium text-slate-700 transition-colors duration-200 group-hover:text-navy">
            {item.label}
          </span>
          {item.badge && (
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold leading-none ${
                badgeStyles[item.badge] || "bg-slate-100 text-slate-600"
              }`}
            >
              {item.badge}
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
}

// ─── Main Navbar ────────────────────────────────────
export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchContentRef = useRef<HTMLDivElement>(null);

  // ─── Scroll Detection ────────────────────────────
  // KEY CHANGE: threshold is now window.innerHeight instead of 10
  // This keeps the navbar fully transparent over the entire BannerSection (h-screen)
  // and only switches to white after scrolling past it.
  useEffect(() => {
    const handleScroll = () => {
      // Subtract a small buffer (80px) so the transition starts slightly before
      // the banner fully leaves the viewport for a smoother feel
      setIsScrolled(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount in case the page is already scrolled (e.g. browser back)
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Move Sliding Indicator ──────────────────────
  function moveIndicator(label: string | null) {
    if (!navIndicatorRef.current) return;
    if (!label) {
      gsap.to(navIndicatorRef.current, {
        scaleX: 0,
        duration: 0.25,
        ease: "power2.in",
      });
      return;
    }
    const el = navItemRefs.current.get(label);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const navRect = el.closest("nav")?.getBoundingClientRect();
    if (!navRect) return;

    gsap.to(navIndicatorRef.current, {
      x: rect.left - navRect.left - 8,
      width: rect.width + 16,
      scaleX: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  }

  // ─── Force Close ─────────────────────────────────
  function forceCloseMenu() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    if (menuTl.current) menuTl.current.kill();
    setActiveMenu(null);
    moveIndicator(null);
  }

  // ─── Escape Key ──────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) setIsSearchOpen(false);
        else if (isMobileOpen) setIsMobileOpen(false);
        else if (activeMenu) forceCloseMenu();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isSearchOpen, isMobileOpen, activeMenu]);

  // ─── Click Outside ───────────────────────────────
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!activeMenu || !navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        forceCloseMenu();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [activeMenu]);

  // ─── Body Scroll Lock ────────────────────────────
  useEffect(() => {
    document.body.style.overflow =
      isMobileOpen || isSearchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, isSearchOpen]);

  // ─── Reset mobile accordion on close ────────────
  useEffect(() => {
    if (!isMobileOpen) setMobileAccordion(null);
  }, [isMobileOpen]);

  // ─── Open Mega Menu ──────────────────────────────
  function openMenu(label: string) {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    if (activeMenu === label) return;

    const menuItem = menuData.find((m) => m.label === label);
    if (!menuItem?.columns) return;

    if (menuTl.current) menuTl.current.kill();

    setActiveMenu(label);
    moveIndicator(label);

    requestAnimationFrame(() => {
      if (!menuPanelRef.current || !overlayRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      menuTl.current = tl;

      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 }, 0);

      tl.fromTo(
        menuPanelRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0
      );

      const topLine = menuPanelRef.current.querySelector(".mega-top-line");
      if (topLine) {
        tl.fromTo(
          topLine,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: "power2.out" },
          0.05
        );
      }

      const cols = menuPanelRef.current.querySelectorAll(".mega-col");
      if (cols.length) {
        tl.fromTo(
          cols,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.07 },
          0.1
        );
      }

      const items = menuPanelRef.current.querySelectorAll(".mega-item");
      if (items.length) {
        tl.fromTo(
          items,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.25,
            stagger: 0.02,
            ease: "power2.out",
          },
          0.15
        );
      }

      const featured = menuPanelRef.current.querySelector(".mega-featured");
      if (featured) {
        tl.fromTo(
          featured,
          { y: 20, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "back.out(1.4)",
          },
          0.2
        );
      }
    });
  }

  // ─── Close Mega Menu ─────────────────────────────
  function closeMenu() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);

    closeTimeout.current = setTimeout(() => {
      if (menuTl.current) menuTl.current.kill();

      const tl = gsap.timeline({
        defaults: { ease: "power2.in", duration: 0.2 },
        onComplete: () => setActiveMenu(null),
      });
      menuTl.current = tl;

      if (overlayRef.current) tl.to(overlayRef.current, { opacity: 0 }, 0);
      if (menuPanelRef.current)
        tl.to(menuPanelRef.current, { y: -8, opacity: 0 }, 0);

      moveIndicator(null);
    }, 120);
  }

  // ─── Search Animation ────────────────────────────
  useEffect(() => {
    if (isSearchOpen && searchContentRef.current) {
      gsap.fromTo(
        searchContentRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      setTimeout(() => {
        searchContentRef.current?.querySelector("input")?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // ─── Derived State ───────────────────────────────
  const activeMenuItem = menuData.find((m) => m.label === activeMenu);
  const hasFeatured = !!activeMenuItem?.featured;
  const colCount = activeMenuItem?.columns?.length || 0;

  return (
    <>
      {/* ═══ MEGA MENU OVERLAY ═══ */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 bg-navy-dark/15 backdrop-blur-[1px] cursor-pointer ${
          activeMenu ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: 0, display: activeMenu ? "block" : "none" }}
        onClick={forceCloseMenu}
      />

      {/* ═══ NAVBAR ═══ */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/[0.97] backdrop-blur-2xl shadow-md shadow-navy/5 border-b border-navy-50"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex min-h-[140px] items-center justify-between">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="relative z-50 flex items-center gap-4 group"
            >
              <div
                className={`relative h-16 w-40 flex-shrink-0 rounded-lg transition-all duration-500 ${
                  isScrolled ? "" : "p-2 "
                }`}
              >
                <Image
                  src="/logo/logo.webp"
                  alt="London School of Higher Studies"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* ── Desktop Nav Items ── */}
            <div className="hidden lg:flex items-center gap-0.5 relative">
              {menuData.map((item) => (
                <button
                  key={item.label}
                  ref={(el) => {
                    if (el) navItemRefs.current.set(item.label, el);
                  }}
                  onMouseEnter={() => {
                    if (item.columns) openMenu(item.label);
                  }}
                  className={`relative flex items-center gap-1 px-4 py-2.5 text-[13.5px] font-medium transition-all duration-300 rounded-md ${
                    activeMenu === item.label
                      ? "text-cips"
                      : isScrolled
                      ? "text-slate-600 hover:text-navy hover:bg-navy-50/50"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {item.columns && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        activeMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
              ))}

              {/* Sliding Indicator */}
              <div
                ref={navIndicatorRef}
                className={`absolute bottom-0 h-[2px] rounded-full origin-left transition-colors duration-500 ${
                  isScrolled ? "bg-cips" : "bg-white"
                }`}
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? "text-slate-400 hover:text-navy hover:bg-navy-50/50"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <Search className="h-[17px] w-[17px]" />
              </button>

              <Link
                href="/login"
                className={`hidden md:inline-flex relative z-50 items-center px-4 py-2.5 text-[13.5px] font-medium rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? "text-slate-500 hover:text-navy hover:bg-navy-50/50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Login
              </Link>

              <Link
                href="/join"
                className={`hidden sm:inline-flex relative z-50 items-center gap-2 text-[13px] font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? "bg-cips text-white hover:bg-cips-dark hover:shadow-md hover:shadow-cips/15"
                    : "bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25 hover:border-white/30"
                }`}
              >
                Enroll Now
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`relative z-50 flex lg:hidden h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? "text-slate-500 hover:text-navy hover:bg-navy-50/50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ═══ MEGA MENU PANEL ═══ */}
        <div
          ref={menuPanelRef}
          className={`absolute top-full left-0 right-0 opacity-0 ${
            activeMenu ? "pointer-events-auto" : "pointer-events-none"
          }`}
          onMouseEnter={() => {
            if (closeTimeout.current) {
              clearTimeout(closeTimeout.current);
              closeTimeout.current = null;
            }
          }}
          onMouseLeave={closeMenu}
          style={{ display: activeMenu ? "block" : "none" }}
        >
          {/* Animated top accent line */}
          <div className="mega-top-line h-[2px] w-full bg-gradient-to-r from-transparent via-cips to-transparent origin-left" />

          <div className="bg-white border-b border-navy-50 shadow-xl shadow-navy/5">
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div
                className={`grid gap-10 ${
                  hasFeatured
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                    : colCount <= 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-3"
                }`}
              >
                {/* Columns */}
                {activeMenuItem?.columns?.map((col, colIdx) => (
                  <div key={colIdx} className="mega-col">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-cips mb-3.5 pb-2 border-b border-navy-50">
                      {col.title}
                    </h3>
                    <div className="space-y-0.5">
                      {col.items.map((subItem, subIdx) => (
                        <SubMenuItemRow
                          key={subIdx}
                          item={subItem}
                          onClose={forceCloseMenu}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Featured Card */}
                {activeMenuItem?.featured && (
                  <div className="mega-featured">
                    <Link
                      href={activeMenuItem.featured.href}
                      onClick={forceCloseMenu}
                      className="group block overflow-hidden rounded-xl border border-navy-50 bg-gradient-to-br from-navy-50/50 to-white shadow-sm hover:shadow-lg hover:shadow-navy/5 transition-all duration-300"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={activeMenuItem.featured.image}
                          alt={activeMenuItem.featured.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-navy-dark/20 to-transparent" />
                        {/* Floating badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 shadow-sm">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="var(--color-gold)"
                            stroke="none"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span className="text-[9px] font-bold text-navy-dark tracking-wider uppercase">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="text-[14px] font-semibold text-navy mb-1.5 group-hover:text-cips transition-colors duration-200">
                          {activeMenuItem.featured.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          {activeMenuItem.featured.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cips group-hover:gap-2.5 transition-all duration-300">
                          {activeMenuItem.featured.ctaText || "Learn More"}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Footer bar */}
              <div className="mt-7 pt-5 border-t border-navy-50 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Can&apos;t find what you&apos;re looking for?{" "}
                  <Link
                    href="/contact"
                    onClick={forceCloseMenu}
                    className="font-medium text-cips hover:underline"
                  >
                    Contact our team
                  </Link>
                </p>
                <Link
                  href={activeMenuItem?.href || "#"}
                  onClick={forceCloseMenu}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-cips transition-colors duration-200"
                >
                  View all {activeMenuItem?.label?.toLowerCase()}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ SEARCH OVERLAY ═══ */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-white/[0.98] backdrop-blur-xl flex items-start justify-center pt-32"
          onClick={() => setIsSearchOpen(false)}
        >
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 text-slate-400 hover:text-navy transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            ref={searchContentRef}
            className="w-full max-w-2xl px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-cips" />
              <input
                type="text"
                placeholder="Search qualifications, resources, events..."
                className="w-full bg-transparent border-b-2 border-navy-50 focus:border-cips text-navy text-2xl md:text-3xl font-light pl-10 pb-4 pr-4 outline-none placeholder:text-slate-300 transition-colors duration-300"
              />
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "MCIPS",
                  "Level 4 Diploma",
                  "Sustainable Procurement",
                  "CIPS Membership",
                  "Online Learning",
                  "Exam Preparation",
                ].map((tag) => (
                  <button
                    key={tag}
                    className="rounded-full border border-navy-50 px-4 py-1.5 text-xs font-medium text-slate-500 hover:text-navy hover:border-cips hover:bg-cips/5 transition-all duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {[
                {
                  label: "All Courses",
                  href: "/courses",
                  desc: "Browse CIPS Levels 2–6",
                },
                {
                  label: "How to Enrol",
                  href: "/how-to-enrol",
                  desc: "Step-by-step guide",
                },
                {
                  label: "Fee Structure",
                  href: "/fees",
                  desc: "Pricing & instalments",
                },
                {
                  label: "Student Support",
                  href: "/support",
                  desc: "Help & resources",
                },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsSearchOpen(false)}
                  className="group rounded-lg border border-navy-50 p-4 hover:border-cips/20 hover:bg-cips/[0.02] transition-all duration-200"
                >
                  <p className="text-[13px] font-semibold text-navy group-hover:text-cips transition-colors">
                    {link.label}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {link.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ MOBILE BACKDROP ═══ */}
      <div
        className={`fixed inset-0 z-40 bg-navy-dark/40 backdrop-blur-sm lg:hidden transition-all duration-500 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ═══ MOBILE DRAWER ═══ */}
      <div
        className={`fixed inset-y-0 right-0 z-[41] w-[85%] max-w-sm bg-white shadow-2xl shadow-navy/10 lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between h-[72px] px-6 border-b border-navy-50">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-28 flex-shrink-0">
              <Image
                src="/logo/logo.webp"
                alt="LSHS"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 hover:text-navy hover:bg-navy-50 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="h-[calc(100vh-72px)] overflow-y-auto px-6 pb-8">
          <div className="space-y-0.5 pt-3">
            {menuData.map((item) => (
              <div key={item.label} className="border-b border-navy-50/60">
                <button
                  onClick={() =>
                    setMobileAccordion(
                      mobileAccordion === item.label ? null : item.label
                    )
                  }
                  className="flex w-full items-center justify-between py-3.5 text-[15px] font-medium text-navy"
                >
                  {item.label}
                  {item.columns && (
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                        mobileAccordion === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Accordion content */}
                <div
                  className="overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    maxHeight: mobileAccordion === item.label ? "600px" : "0px",
                    opacity: mobileAccordion === item.label ? 1 : 0,
                  }}
                >
                  {item.columns?.map((col, colIdx) => (
                    <div key={colIdx} className="mb-4 pl-2">
                      <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-cips mb-2.5">
                        {col.title}
                      </p>
                      <div className="space-y-0.5">
                        {col.items.map((subItem, subIdx) => (
                          <Link
                            key={subIdx}
                            href={subItem.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="flex items-center gap-2.5 py-2.5 text-[13px] text-slate-500 hover:text-navy transition-colors rounded-md hover:bg-navy-50/30 px-2"
                          >
                            <ChevronRight className="h-3 w-3 flex-shrink-0 text-slate-300" />
                            <span className="min-w-0">{subItem.label}</span>
                            {subItem.badge && (
                              <span
                                className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-semibold leading-none flex-shrink-0 ${
                                  badgeStyles[subItem.badge] ||
                                  "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {subItem.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Mobile featured card */}
                  {item.featured && (
                    <Link
                      href={item.featured.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="ml-2 flex items-center gap-3.5 rounded-xl bg-navy-50/50 p-3.5 mb-3 border border-navy-50 group"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.featured.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/30 to-transparent" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-navy group-hover:text-cips transition-colors">
                          {item.featured.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {item.featured.description}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cips mt-1">
                          {item.featured.ctaText || "Learn More"}
                          <ArrowRight className="h-2.5 w-2.5" />
                        </span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Drawer footer actions */}
          <div className="mt-6 space-y-2.5 border-t border-navy-50 pt-6">
            <Link
              href="/login"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-[13px] font-medium text-slate-600 rounded-lg border border-navy-50 hover:bg-navy-50/50 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/join"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-[13px] font-semibold text-white bg-cips rounded-lg hover:bg-cips-dark transition-colors hover:shadow-md hover:shadow-cips/15"
            >
              Enroll Now
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Contact info */}
          <div className="mt-6 pt-5 border-t border-navy-50 space-y-2.5">
            <a
              href="mailto:info@lshs.ac.uk"
              className="flex items-center gap-2.5 text-[11px] text-slate-400 hover:text-cips transition-colors"
            >
              <svg
                width="13"
                height="13"
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
              className="flex items-center gap-2.5 text-[11px] text-slate-400 hover:text-cips transition-colors"
            >
              <svg
                width="13"
                height="13"
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
          </div>
        </div>
      </div>
    </>
  );
}