// src/app/components/Navbar.tsx

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
  ArrowRight,
} from "lucide-react";
import { SubMenuItem } from "@/app/types/navbar";
import { menuData } from "@/app/data/menuData";

// ─── Badge styles ───────────────────────────────────
const badgeStyles: Record<string, string> = {
  Popular: "bg-teal-50 text-teal-600",
  "MCIPS Path": "bg-amber-50 text-amber-600",
  "Gold Standard": "bg-yellow-50 text-yellow-700",
  New: "bg-emerald-50 text-emerald-600",
  Flagship: "bg-rose-50 text-rose-600",
};

// ─── Level Row ─────────────────────────────────────
function LevelRow({ item }: { item: SubMenuItem }) {
  return (
    <Link
      href={item.href}
      className="mega-item group relative flex items-center gap-4 rounded-lg pl-[18px] pr-4 py-3 transition-colors duration-200 hover:bg-slate-50"
    >
      {item.accent && (
        <span
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full transition-all duration-300 group-hover:top-1.5 group-hover:bottom-1.5 group-hover:w-[3.5px]"
          style={{ backgroundColor: item.accent }}
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-slate-700 transition-colors duration-150 group-hover:text-navy">
            {item.label}
          </span>
          {item.badge && (
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[9.5px] font-semibold leading-none ${
                badgeStyles[item.badge] ?? "bg-slate-100 text-slate-500"
              }`}
            >
              {item.badge}
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-1 text-[11.5px] text-slate-400 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
      <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-300 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  );
}

// ─── Navbar ────────────────────────────────────────
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
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchContentRef = useRef<HTMLDivElement>(null);

  // ─── Scroll ──────────────────────────────────────
  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ─── Indicator ───────────────────────────────────
  function moveIndicator(label: string | null) {
    if (!navIndicatorRef.current) return;
    if (!label) {
      gsap.to(navIndicatorRef.current, {
        scaleX: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      return;
    }
    const el = navItemRefs.current.get(label);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nr = el.closest("nav")?.getBoundingClientRect();
    if (!nr) return;
    gsap.to(navIndicatorRef.current, {
      x: r.left - nr.left - 12,
      width: r.width + 24,
      scaleX: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  }

  // ─── Force close ─────────────────────────────────
  function forceClose() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    if (menuTl.current) menuTl.current.kill();
    setActiveMenu(null);
    moveIndicator(null);
  }

  // ─── Escape key ──────────────────────────────────
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) setIsSearchOpen(false);
        else if (isMobileOpen) setIsMobileOpen(false);
        else if (activeMenu) forceClose();
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isSearchOpen, isMobileOpen, activeMenu]);

  // ─── Click outside ───────────────────────────────
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!activeMenu || !navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) forceClose();
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [activeMenu]);

  // ─── Lock scroll ─────────────────────────────────
  useEffect(() => {
    document.body.style.overflow =
      isMobileOpen || isSearchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, isSearchOpen]);

  // ─── Reset mobile accordion ──────────────────────
  useEffect(() => {
    if (!isMobileOpen) setMobileAccordion(null);
  }, [isMobileOpen]);

  // ─── Open mega menu ──────────────────────────────
  function openMenu(label: string) {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    if (activeMenu === label) return;
    const m = menuData.find((x) => x.label === label);
    if (!m?.columns) return;
    if (menuTl.current) menuTl.current.kill();
    setActiveMenu(label);
    moveIndicator(label);

    requestAnimationFrame(() => {
      if (!menuPanelRef.current || !overlayRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      menuTl.current = tl;

      tl.to(overlayRef.current, { opacity: 1, duration: 0.2 }, 0);

      tl.fromTo(
        menuPanelRef.current,
        { y: -6, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        0,
      );

      const line = menuPanelRef.current.querySelector(".mega-line");
      if (line) {
        tl.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.35, ease: "power2.out" },
          0.03,
        );
      }

      const cols = menuPanelRef.current.querySelectorAll(".mega-col");
      if (cols.length) {
        tl.fromTo(
          cols,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, stagger: 0.05 },
          0.06,
        );
      }

      const items = menuPanelRef.current.querySelectorAll(".mega-item");
      if (items.length) {
        tl.fromTo(
          items,
          { y: 5, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.18, stagger: 0.02 },
          0.1,
        );
      }

      const feat = menuPanelRef.current.querySelector(".mega-feat");
      if (feat) {
        tl.fromTo(
          feat,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 },
          0.12,
        );
      }
    });
  }

  // ─── Close mega menu ─────────────────────────────
  function closeMenu() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => {
      if (menuTl.current) menuTl.current.kill();
      const tl = gsap.timeline({
        defaults: { ease: "power2.in", duration: 0.12 },
        onComplete: () => setActiveMenu(null),
      });
      menuTl.current = tl;
      if (overlayRef.current) tl.to(overlayRef.current, { opacity: 0 }, 0);
      if (menuPanelRef.current)
        tl.to(menuPanelRef.current, { y: -4, opacity: 0 }, 0);
      moveIndicator(null);
    }, 80);
  }

  // ─── Search animation ────────────────────────────
  useEffect(() => {
    if (isSearchOpen && searchContentRef.current) {
      gsap.fromTo(
        searchContentRef.current,
        { y: -6, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
      );
      setTimeout(() => {
        const input = searchContentRef.current?.querySelector("input");
        if (input) input.focus();
      }, 80);
    }
  }, [isSearchOpen]);

  // ─── Active menu data ────────────────────────────
  const activeMenuItem = menuData.find((m) => m.label === activeMenu);

  // ─── Hover handler for keeping menu open ─────────
  const handlePanelEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/10 cursor-pointer"
        style={{
          opacity: 0,
          display: activeMenu ? "block" : "none",
          backdropFilter: "blur(0.5px)",
        }}
        onClick={forceClose}
      />

      {/* ═══ NAVBAR ═══ */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
            : "bg-white"
        }`}
        style={isScrolled ? { backdropFilter: "blur(12px)" } : undefined}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-50">
              <div className="relative h-10 w-32">
                <Image
                  src="/logo/logo.webp"
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5 relative">
              {menuData.map((item) =>
                item.columns ? (
                  <button
                    key={item.label}
                    ref={(el) => {
                      if (el) navItemRefs.current.set(item.label, el);
                    }}
                    onMouseEnter={() => openMenu(item.label)}
                    className={`relative flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium transition-colors duration-150 rounded-md ${
                      activeMenu === item.label
                        ? "text-cips"
                        : "text-slate-500 hover:text-navy"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-300 ${
                        activeMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href ?? "/"}
                    className="px-4 py-2 text-[13px] font-medium text-slate-500 hover:text-navy transition-colors duration-150 rounded-md"
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <div
                ref={navIndicatorRef}
                className="absolute bottom-0 h-[1.5px] rounded-full bg-cips origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSearchOpen((v) => !v)}
                className="relative z-50 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-navy hover:bg-slate-50 transition-colors duration-150"
                aria-label="Search"
              >
                <Search className="h-[15px] w-[15px]" />
              </button>
              <Link
                href="/login"
                className="hidden md:inline-flex relative z-50 px-3 py-1.5 text-[13px] font-medium text-slate-500 hover:text-navy hover:bg-slate-50 rounded-md transition-colors duration-150"
              >
                Login
              </Link>
              <Link
                href="/join"
                className="hidden sm:inline-flex relative z-50 bg-navy text-white text-[12px] font-semibold px-4 py-2 rounded-md hover:bg-navy-dark transition-colors duration-150"
              >
                Join Now
              </Link>
              <button
                onClick={() => setIsMobileOpen((v) => !v)}
                className="relative z-50 flex lg:hidden h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:text-navy hover:bg-slate-50 transition-colors duration-150"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="h-[18px] w-[18px]" />
                ) : (
                  <Menu className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ═══ MEGA MENU PANEL ═══ */}
        <div
          ref={menuPanelRef}
          className="absolute top-full left-0 right-0 opacity-0"
          onMouseEnter={handlePanelEnter}
          onMouseLeave={closeMenu}
          style={{ display: activeMenu ? "block" : "none" }}
        >
          <div className="mega-line h-[1px] w-full bg-gradient-to-r from-transparent via-cips/60 to-transparent origin-left" />

          <div className="bg-white border-b border-slate-100 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
            <div className="mx-auto max-w-6xl px-6 py-10">
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-3">
                {/* Level list */}
                <div className="lg:col-span-2">
                  {activeMenuItem?.columns?.map((col, i) => (
                    <div key={i} className="mega-col">
                      <h3 className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-400 mb-4">
                        {col.title}
                      </h3>
                      <div className="space-y-0.5">
                        {col.items.map((sub, j) => (
                          <LevelRow key={j} item={sub} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Featured card */}
                {activeMenuItem?.featured && (
                  <div className="mega-feat">
                    <Link
                      href={activeMenuItem.featured.href}
                      className="group block overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={activeMenuItem.featured.image}
                          alt={activeMenuItem.featured.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/5 to-transparent" />
                        <span className="absolute bottom-3 left-4 inline-flex rounded-full bg-white/15 px-2.5 py-0.5 text-[9px] font-bold text-white/90 tracking-[0.1em] uppercase">
                          Featured
                        </span>
                      </div>
                      <div className="p-5">
                        <h4 className="text-[13px] font-semibold text-navy mb-1.5 group-hover:text-cips transition-colors duration-200">
                          {activeMenuItem.featured.title}
                        </h4>
                        <p className="text-[11.5px] text-slate-400 leading-relaxed mb-4">
                          {activeMenuItem.featured.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-cips group-hover:gap-2.5 transition-all duration-300">
                          {activeMenuItem.featured.ctaText ?? "Learn More"}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[11px] text-slate-400">
                  Not sure which level fits you?{" "}
                  <Link
                    href="/apprenticeships"
                    className="font-medium text-cips hover:underline"
                  >
                    Compare all programmes
                  </Link>
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-cips transition-colors duration-200"
                >
                  Talk to an advisor
                  <ArrowRight className="h-2.5 w-2.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ SEARCH OVERLAY ═══ */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-white/[0.98] flex items-start justify-center pt-28"
          style={{ backdropFilter: "blur(20px)" }}
          onClick={() => setIsSearchOpen(false)}
        >
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-5 right-6 text-slate-400 hover:text-navy transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            ref={searchContentRef}
            className="w-full max-w-lg px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-cips" />
              <input
                type="text"
                placeholder="Search apprenticeships, levels..."
                className="w-full bg-transparent border-b-2 border-slate-200 focus:border-cips text-navy text-xl font-light pl-8 pb-3 pr-4 outline-none placeholder:text-slate-300 transition-colors duration-300"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Level 4", "Level 6 MCIPS", "Funding", "Entry Requirements"].map(
                (t) => (
                  <button
                    key={t}
                    className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-500 hover:text-navy hover:border-cips hover:bg-cips/5 transition-all duration-200"
                  >
                    {t}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ MOBILE OVERLAY ═══ */}
      <div
        className={`fixed inset-0 z-40 bg-black/25 lg:hidden transition-opacity duration-300 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ═══ MOBILE DRAWER ═══ */}
      <div
        className={`fixed inset-y-0 right-0 z-[41] w-[80%] max-w-[280px] bg-white shadow-2xl lg:hidden transition-transform duration-500 ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-100">
          <span className="text-[13px] font-semibold text-navy">Menu</span>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-navy transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-[calc(100vh-64px)] overflow-y-auto px-5 pb-8">
          <div className="space-y-0.5 pt-3">
            {menuData.map((item) =>
              item.columns ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setMobileAccordion(
                        mobileAccordion === item.label ? null : item.label,
                      )
                    }
                    className="flex w-full items-center justify-between py-3 text-[13.5px] font-medium text-navy"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${
                        mobileAccordion === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight:
                        mobileAccordion === item.label ? "480px" : "0px",
                      opacity: mobileAccordion === item.label ? 1 : 0,
                      transition:
                        "max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
                    }}
                  >
                    {item.columns.map((col, ci) => (
                      <div key={ci} className="mb-2">
                        <p className="text-[9px] font-semibold tracking-[0.14em] uppercase text-slate-400 mb-2 pl-1">
                          {col.title}
                        </p>
                        <div className="space-y-0.5">
                          {col.items.map((sub, si) => (
                            <Link
                              key={si}
                              href={sub.href}
                              onClick={() => setIsMobileOpen(false)}
                              className="group relative flex items-center gap-2.5 py-2.5 pl-4 text-[12.5px] text-slate-500 hover:text-navy transition-colors"
                            >
                              {sub.accent && (
                                <span
                                  className="absolute left-0 top-3 bottom-3 w-[2.5px] rounded-full"
                                  style={{
                                    backgroundColor: sub.accent,
                                  }}
                                />
                              )}
                              <span className="min-w-0 flex-1">
                                {sub.label}
                              </span>
                              {sub.badge && (
                                <span
                                  className={`rounded-full px-1.5 py-0.5 text-[8px] font-semibold leading-none flex-shrink-0 ${
                                    badgeStyles[sub.badge] ??
                                    "bg-slate-100 text-slate-500"
                                  }`}
                                >
                                  {sub.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    {item.featured && (
                      <Link
                        href={item.featured.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 mt-2 border border-slate-100"
                      >
                        <img
                          src={item.featured.image}
                          alt=""
                          className="h-11 w-11 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-[11.5px] font-medium text-navy">
                            {item.featured.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                            {item.featured.description}
                          </p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? "/"}
                  onClick={() => setIsMobileOpen(false)}
                  className="block py-3 text-[13.5px] font-medium text-navy"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
            <Link
              href="/login"
              onClick={() => setIsMobileOpen(false)}
              className="block w-full text-center py-2.5 text-[12.5px] font-medium text-slate-600 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/join"
              onClick={() => setIsMobileOpen(false)}
              className="block w-full text-center py-2.5 text-[12.5px] font-semibold text-white bg-navy rounded-md hover:bg-navy-dark transition-colors"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}