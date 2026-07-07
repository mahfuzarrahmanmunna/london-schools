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
  Popular: "bg-teal-100 text-teal-700",
  "MCIPS Path": "bg-amber-100 text-amber-700",
  "Gold Standard": "bg-yellow-100 text-yellow-800",
  New: "bg-emerald-100 text-emerald-700",
  Trending: "bg-violet-100 text-violet-700",
  Free: "bg-sky-100 text-sky-700",
  Flagship: "bg-rose-100 text-rose-700",
  Hiring: "bg-green-100 text-green-700",
};

// ─── SubMenu Item Component ─────────────────────────
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
      className="mega-item group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-slate-50"
    >
      <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-cips" />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700 transition-colors duration-200 group-hover:text-navy">
            {item.label}
          </span>
          {item.badge && (
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold leading-none ${badgeStyles[item.badge] || "bg-slate-100 text-slate-600"}`}
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

// ─── Main Navbar Component ──────────────────────────
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
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  // ─── Scroll Detection ────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Move Nav Indicator ──────────────────────────
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

  // ─── Force Close (escape / click outside / link click) ────────
  function forceCloseMenu() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    if (menuTl.current) menuTl.current.kill();
    setActiveMenu(null);
    moveIndicator(null);
  }

  // ─── Close on Escape ─────────────────────────────
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

  // ─── Click Outside → Close Mega Menu ─────────────
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!activeMenu || !navRef.current) return;
      const target = e.target as Node;
      if (!navRef.current.contains(target)) {
        forceCloseMenu();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [activeMenu]);

  // ─── Lock Body Scroll ────────────────────────────
  useEffect(() => {
    if (isMobileOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, isSearchOpen]);

  // ─── Close mobile accordion when mobile menu closes
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
        0,
      );

      const topLine = menuPanelRef.current.querySelector(".mega-top-line");
      if (topLine) {
        tl.fromTo(
          topLine,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: "power2.out" },
          0.05,
        );
      }

      const cols = menuPanelRef.current.querySelectorAll(".mega-col");
      if (cols.length) {
        tl.fromTo(
          cols,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.07 },
          0.1,
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
          0.15,
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
          0.2,
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

      if (overlayRef.current) {
        tl.to(overlayRef.current, { opacity: 0 }, 0);
      }
      if (menuPanelRef.current) {
        tl.to(menuPanelRef.current, { y: -8, opacity: 0 }, 0);
      }

      moveIndicator(null);
    }, 120);
  }

  // ─── Search Toggle ───────────────────────────────
  useEffect(() => {
    if (isSearchOpen && searchContentRef.current) {
      gsap.fromTo(
        searchContentRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      setTimeout(() => {
        const input = searchContentRef.current?.querySelector("input");
        input?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // ─── Get Active Menu Data ────────────────────────
  const activeMenuItem = menuData.find((m) => m.label === activeMenu);
  const hasFeatured = !!activeMenuItem?.featured;
  const colCount = activeMenuItem?.columns?.length || 0;

  return (
    <>
      {/* ═══ MEGA MENU OVERLAY ═══ */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] cursor-pointer transition-opacity ${
          activeMenu ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: 0, display: activeMenu ? "block" : "none" }}
        onClick={forceCloseMenu}
      />

      {/* ═══ NAVBAR ═══ */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled
            ? "shadow-md shadow-slate-200/60"
            : "border-b border-slate-100"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-[72px] items-center justify-between">
            {/* ── Logo ── */}
            <Link href="/" className="relative z-50 flex items-center gap-3">
              <div className="relative h-12 w-36 flex-shrink-0">
                <Image
                  src="/logo/logo.webp"
                  alt="logo"
                  fill
                  className="object-contain"
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
                  onMouseEnter={() => openMenu(item.label)}
                  className={`relative flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-150 rounded-md ${
                    activeMenu === item.label
                      ? "text-cips"
                      : "text-slate-600 hover:text-navy hover:bg-slate-50"
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
                className="absolute bottom-0 h-0.5 rounded-full bg-cips origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="relative z-50 flex h-9 w-9 items-center justify-center rounded-md text-slate-400 hover:text-navy hover:bg-slate-50 transition-colors duration-150"
                aria-label="Search"
              >
                <Search className="h-[17px] w-[17px]" />
              </button>

              <Link
                href="/login"
                className="hidden md:inline-flex relative z-50 items-center px-3.5 py-2 text-[13.5px] font-medium text-slate-500 hover:text-navy hover:bg-slate-50 rounded-md transition-colors duration-150"
              >
                Login
              </Link>

              <Link
                href="/join"
                className="hidden sm:inline-flex relative z-50 items-center gap-2 bg-navy text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-navy-dark transition-colors duration-150"
              >
                Join Now
              </Link>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="relative z-50 flex lg:hidden h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:text-navy hover:bg-slate-50 transition-colors duration-150"
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
          <div className="mega-top-line h-[2px] w-full bg-gradient-to-r from-cips via-teal-400 to-cips origin-left" />

          <div className="bg-white border-b border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div
                className={`grid gap-8 ${
                  hasFeatured
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : colCount <= 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {activeMenuItem?.columns?.map((col, colIdx) => (
                  <div key={colIdx} className="mega-col">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-cips mb-3">
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

                {/* {activeMenuItem?.featured && (
                  <div className="mega-featured">
                    <Link
                      href={activeMenuItem.featured.href}
                      onClick={forceCloseMenu}
                      className="group block overflow-hidden rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={activeMenuItem.featured.image}
                          alt={activeMenuItem.featured.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-5">
                        <h4 className="text-sm font-semibold text-navy mb-1.5 group-hover:text-cips transition-colors duration-200">
                          {activeMenuItem.featured.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                          {activeMenuItem.featured.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cips group-hover:gap-2.5 transition-all duration-300">
                          {activeMenuItem.featured.ctaText || "Learn More"}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  </div>
                )} */}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
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
          className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-xl flex items-start justify-center pt-32"
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
                className="w-full bg-transparent border-b-2 border-slate-200 focus:border-cips text-navy text-2xl md:text-3xl font-light pl-10 pb-4 pr-4 outline-none placeholder:text-slate-300 transition-colors duration-300"
              />
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "MCIPS",
                "Level 4 Diploma",
                "Sustainable Procurement",
                "Membership",
                "Training Courses",
              ].map((tag) => (
                <button
                  key={tag}
                  className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-500 hover:text-navy hover:border-cips hover:bg-cips/5 transition-all duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ MOBILE OVERLAY ═══ */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-all duration-500 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ═══ MOBILE DRAWER PANEL ═══ */}
      <div
        ref={mobilePanelRef}
        className={`fixed inset-y-0 right-0 z-[41] w-[85%] max-w-sm bg-white shadow-2xl shadow-slate-300/30 lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between h-[72px] px-6 border-b border-slate-100">
          <span className="text-sm font-semibold text-navy">Menu</span>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 hover:text-navy hover:bg-slate-50 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(100vh-72px)] overflow-y-auto px-6 pb-8">
          <div className="space-y-1 pt-2">
            {menuData.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setMobileAccordion(
                      mobileAccordion === item.label ? null : item.label,
                    )
                  }
                  className="flex w-full items-center justify-between py-3.5 text-[15px] font-medium text-navy"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                      mobileAccordion === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{
                    maxHeight: mobileAccordion === item.label ? "600px" : "0px",
                    opacity: mobileAccordion === item.label ? 1 : 0,
                  }}
                >
                  {item.columns?.map((col, colIdx) => (
                    <div key={colIdx} className="mb-4 pl-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-cips mb-2">
                        {col.title}
                      </p>
                      <div className="space-y-0.5">
                        {col.items.map((subItem, subIdx) => (
                          <Link
                            key={subIdx}
                            href={subItem.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="flex items-center gap-2 py-2 text-sm text-slate-500 hover:text-navy transition-colors"
                          >
                            <span className="h-1 w-1 rounded-full bg-slate-300 flex-shrink-0" />
                            <span className="min-w-0">{subItem.label}</span>
                            {subItem.badge && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[9px] font-semibold leading-none flex-shrink-0 ${badgeStyles[subItem.badge] || "bg-slate-100 text-slate-500"}`}
                              >
                                {subItem.badge}
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
                      className="ml-3 flex items-center gap-3 rounded-lg bg-slate-50 p-3 mb-3 border border-slate-100"
                    >
                      <img
                        src={item.featured.image}
                        alt=""
                        className="h-14 w-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-navy">
                          {item.featured.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {item.featured.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3 border-t border-slate-100 pt-6">
            <Link
              href="/login"
              onClick={() => setIsMobileOpen(false)}
              className="block w-full text-center py-3 text-sm font-medium text-slate-600 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/join"
              onClick={() => setIsMobileOpen(false)}
              className="block w-full text-center py-3 text-sm font-semibold text-white bg-navy rounded-md hover:bg-navy-dark transition-colors"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
