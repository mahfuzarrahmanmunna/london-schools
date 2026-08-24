"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import {
  ChevronDown,
  ArrowRight,
  FileText,
  CreditCard,
  Tag,
  Mail,
  X,
} from "lucide-react";
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";

// Import Modal Hook, Types, and Data
import { useModal } from "@/app/context/ModalContext";
import { useNavbarTheme } from "@/app/context/NavbarThemeContext";
import type { MenuItem, SubMenuItem } from "@/app/types/navbar";
import { menuData } from "@/app/data/menuData";

// ─── Reusable Flag Icons ───────────────────────────
const UkFlag = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 60 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <clipPath id="uk-flag-clip">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path
      d="M0,0 L60,30 M60,0 L0,30"
      clipPath="url(#uk-flag-clip)"
      stroke="#C8102E"
      strokeWidth="4"
    />
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const BdFlag = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 28 18"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="28" height="18" fill="#006a4e" />
    <circle cx="11.5" cy="9" r="5.2" fill="#f42a41" />
  </svg>
);

// ─── Badge Color Map ───────────────────────────────
const badgeStyles: Record<string, string> = {
  Popular: "bg-[#0B73B9]/10 text-[#0B73B9] border border-[#0B73B9]/20",
  MCIPS: "bg-[#f4d210]/15 text-[#92780a] border border-[#f4d210]/25",
  "MCIPS Path": "bg-[#f4d210]/15 text-[#92780a] border border-[#f4d210]/25",
  New: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  Trending: "bg-violet-50 text-violet-700 border border-violet-200/60",
  Free: "bg-sky-50 text-sky-700 border border-sky-200/60",
  Flagship: "bg-[#0B73B9]/10 text-[#0B73B9] border border-[#0B73B9]/20",
  Hiring: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
};

// ─── Quick Links Config (Mobile) ──────────────────
const quickActions = [
  { label: "Brochure", icon: FileText, modal: "brochure" as const },
  { label: "Course Prices", icon: CreditCard, modal: "price" as const },
  { label: "Get 25% OFF", icon: Tag, modal: "discount" as const },
];

// ─── Social Links Config ───────────────────────────
const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/lshs.co.uk/",
    icon: BsFacebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/lshs.co.uk/",
    icon: BsInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://uk.linkedin.com/company/londoncollege",
    icon: BsLinkedin,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@LondonSchoolofHigherStudies",
    icon: BsYoutube,
  },
];

// ─── SubMenu Item Row (Desktop Mega Menu) ──────────
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
      className="mega-item group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-[#0B73B9]/[0.04] border border-transparent hover:border-[#0B73B9]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B73B9]/30"
    >
      <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-300 transition-all duration-300 group-hover:bg-[#0B73B9] group-hover:ring-[4px] group-hover:ring-[#0B73B9]/10" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[14px] font-medium text-slate-700 transition-colors duration-200 group-hover:text-[#0B73B9]">
            {item.label}
          </span>
          {item.badge && (
            <span
              className={`inline-flex rounded-md px-2 py-[2px] text-[10px] font-semibold tracking-wide leading-none ${badgeStyles[item.badge] || "bg-slate-50 text-slate-500 border border-slate-200/60"}`}
            >
              {item.badge}
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-1 text-[12px] text-slate-400 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
      <ArrowRight className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-transparent transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#0B73B9]" />
    </Link>
  );
}

// ─── Main Navbar ────────────────────────────────────
export default function Navbar() {
  const { openModal } = useModal();
  const { isAboutDark } = useNavbarTheme();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Mobile Drawer Refs
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileBackdropRef = useRef<HTMLDivElement>(null);
  const mobileTl = useRef<gsap.core.Timeline | null>(null);

  const coursesMenu = menuData.find((m) => m.columns);
  const megaMenuLabel = coursesMenu?.label || "Courses";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Desktop Mega Menu Logic ─────────────────────
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
      duration: 0.4,
      ease: "power3.out",
    });
  }

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const closeMenu = () => {
    clearCloseTimeout();
    if (menuTl.current) menuTl.current.kill();
    setActiveMenu(null);
    moveIndicator(null);
  };

  const startCloseTimeout = () => {
    clearCloseTimeout();
    closeTimeout.current = setTimeout(() => closeMenu(), 120);
  };

  const openMenu = (label: string) => {
    clearCloseTimeout();
    if (activeMenu === label) return;

    const menuItem = menuData.find((m) => m.label === label);
    if (!menuItem?.columns) return;

    if (menuTl.current) menuTl.current.kill();
    setActiveMenu(label);
    moveIndicator(label);

    requestAnimationFrame(() => {
      if (!menuPanelRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      menuTl.current = tl;

      const cols = menuPanelRef.current.querySelectorAll(".mega-col");
      if (cols.length)
        tl.fromTo(
          cols,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 },
          0.1,
        );

      const items = menuPanelRef.current.querySelectorAll(".mega-item");
      if (items.length)
        tl.fromTo(
          items,
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            stagger: 0.015,
            ease: "power2.out",
          },
          0.15,
        );

      const featured = menuPanelRef.current.querySelector(".mega-featured");
      if (featured)
        tl.fromTo(
          featured,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.2,
        );
    });
  };

  const handleStandardNavEnter = () => {
    if (activeMenu) closeMenu();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMobileOpen) setIsMobileOpen(false);
        else if (activeMenu) closeMenu();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobileOpen, activeMenu]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!activeMenu) return;
      const target = e.target as Node;
      if (
        menuPanelRef.current &&
        !menuPanelRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [activeMenu]);

  // ─── Mobile Body Overflow Lock ───────────────────
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // ─── Mobile GSAP Initial State (On Mount) ────────
  useEffect(() => {
    if (mobileDrawerRef.current)
      gsap.set(mobileDrawerRef.current, { x: "100%" });
    if (mobileBackdropRef.current)
      gsap.set(mobileBackdropRef.current, {
        opacity: 0,
        pointerEvents: "none",
        display: "none",
      });
  }, []);

  // ─── Mobile GSAP Drawer Animation ────────────────
  useEffect(() => {
    if (!mobileDrawerRef.current || !mobileBackdropRef.current) return;
    if (mobileTl.current) mobileTl.current.kill();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    mobileTl.current = tl;
    const items = mobileDrawerRef.current.querySelectorAll(".m-stagger");

    if (isMobileOpen) {
      tl.set(mobileBackdropRef.current, { display: "block" })
        .to(
          mobileBackdropRef.current,
          { opacity: 1, pointerEvents: "auto", duration: 0.3 },
          0,
        )
        .to(
          mobileDrawerRef.current,
          { x: "0%", duration: 0.55, ease: "power4.out" },
          0,
        )
        .fromTo(
          items,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
          0.25,
        );
    } else {
      tl.to(mobileBackdropRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      })
        .to(
          mobileDrawerRef.current,
          { x: "100%", duration: 0.55, ease: "power4.out" },
          0,
        )
        .set(mobileBackdropRef.current, { display: "none" });
    }
  }, [isMobileOpen]);

  // ─── Dynamic Navbar Styling ──────────────────────
  const useLightText = !isMobileOpen && (isAboutDark || !isScrolled);
  const isCtaYellow = isAboutDark || (!isScrolled && !isMobileOpen);

  const navBgClass = isMobileOpen
    ? "bg-white/[0.98] backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] border-b border-slate-100/80"
    : isAboutDark
      ? "bg-black/95 backdrop-blur-md border-b border-white/10"
      : isScrolled
        ? "bg-white/[0.98] backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] border-b border-slate-100/80"
        : "bg-gradient-to-b from-black/60 via-black/20 to-transparent";

  const linkBaseClass =
    "px-4 py-2 text-sm font-medium tracking-[0.02em] transition-all duration-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B73B9]/40";
  const linkStateClass = useLightText
    ? "text-white/90 hover:text-white hover:bg-white/10"
    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100";
  const activeLinkClass = useLightText
    ? "text-white bg-white/10"
    : "text-[#0B73B9] bg-[#0B73B9]/[0.06]";

  return (
    <>
      {/* ═══ MEGA MENU OVERLAY (Desktop) ═══ */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[3px] cursor-pointer"
        style={{
          opacity: activeMenu ? 1 : 0,
          transition: "opacity 0.3s ease-out",
          pointerEvents: activeMenu ? "auto" : "none",
          visibility: activeMenu ? "visible" : "hidden",
        }}
        onClick={closeMenu}
      />

      {/* ═══ NAVBAR ═══ */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ═══ DESKTOP: TWO-ROW LAYOUT ═══ */}
          <div className="hidden lg:flex flex-col">
            {/* ── ROW 1: Top Info Bar + Phone + Socials ── */}
            <div
              className={`flex items-center justify-end gap-3 transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? "max-h-0 opacity-0 pt-0 pb-0 mb-0" : "max-h-20 opacity-100 pt-3 pb-2 mb-1"}`}
            >
              <button
                onClick={() => openModal("brochure")}
                className="flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.05em] uppercase transition-all duration-300 hover:scale-105 bg-white/10 text-white border border-white/15 backdrop-blur-sm"
              >
                <FileText className="w-3.5 h-3.5" strokeWidth={2} /> Brochure
              </button>
              <button
                onClick={() => openModal("discount")}
                className="flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.05em] uppercase transition-all duration-300 hover:scale-105 bg-red-500/20 text-red-300 border border-red-400/30 backdrop-blur-sm"
              >
                <Tag className="w-3.5 h-3.5" strokeWidth={2} /> Get 25% OFF
              </button>
              <button
                onClick={() => openModal("price")}
                className="flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.05em] uppercase transition-all duration-300 hover:scale-105 bg-[#f4d210] text-slate-900 shadow-sm"
              >
                <CreditCard className="w-3.5 h-3.5" strokeWidth={2} /> Course
                Prices
              </button>

              <div className="hidden xl:flex items-center gap-4 text-white/80 border-l border-white/15 pl-4 ml-1">
                <a
                  href="tel:+447515106586"
                  className="flex items-center gap-1.5 text-[12px] font-medium tracking-wide hover:text-white transition-colors whitespace-nowrap"
                >
                  <UkFlag className="w-[18px] h-3 rounded-[2px] flex-shrink-0" />
                  <span>+44 7515 106586</span>
                </a>
                <a
                  href="tel:+8801906896326"
                  className="flex items-center gap-1.5 text-[12px] font-medium tracking-wide hover:text-white transition-colors whitespace-nowrap"
                >
                  <BdFlag className="w-[18px] h-3 rounded-[2px] flex-shrink-0" />
                  <span>+88 0190 6896326</span>
                </a>
                <a
                  href="mailto:info@lshs.co.uk"
                  className="flex items-center gap-1.5 text-[12px] font-medium tracking-wide hover:text-white transition-colors whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5" strokeWidth={2} />{" "}
                  <span>info@lshs.co.uk</span>
                </a>
              </div>

              <div className="hidden xl:flex items-center gap-1 border-l border-white/15 pl-4 ml-1">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300"
                    >
                      <Icon className="w-[14px] h-[14px]" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* ── ROW 2: Main Navbar ── */}
            <div className="flex items-center justify-between pb-3 pt-1">
              <Link
                href="/"
                className={`relative h-20 w-32 flex-shrink-0 transition-all duration-500 ${useLightText ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" : ""}`}
                aria-label="Home"
              >
                <Image
                  src="/logo/logo.webp"
                  alt="LSHS Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </Link>

              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-1 relative">
                  {menuData.map((item: MenuItem) =>
                    item.columns ? (
                      <button
                        key={item.label}
                        ref={(el) => {
                          if (el) {
                            navItemRefs.current.set(item.label, el);
                            if (item.label === megaMenuLabel) {
                              triggerRef.current = el;
                            }
                          }
                        }}
                        onMouseEnter={() => openMenu(item.label)}
                        onMouseLeave={startCloseTimeout}
                        aria-expanded={activeMenu === item.label}
                        aria-haspopup="true"
                        aria-controls="mega-menu-panel"
                        className={`relative flex items-center gap-1.5 ${linkBaseClass} ${activeMenu === item.label ? activeLinkClass : linkStateClass}`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    ) : item.external ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={handleStandardNavEnter}
                        className={`${linkBaseClass} ${linkStateClass}`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href || "#"}
                        onMouseEnter={handleStandardNavEnter}
                        className={`${linkBaseClass} ${linkStateClass}`}
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                  <div
                    ref={navIndicatorRef}
                    className="absolute bottom-0 h-[2px] w-0 bg-[#0B73B9] origin-left"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://forms.gle/kHkicZ6TaHQRoMck6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hidden sm:inline-flex items-center gap-2 text-sm font-semibold tracking-wide px-5 py-2.5 rounded-full transition-all duration-300 ml-2 whitespace-nowrap ${isCtaYellow ? "bg-[#f4d210] text-slate-900 hover:bg-[#f4d210]/90 shadow-lg shadow-[#f4d210]/20 hover:-translate-y-0.5" : "bg-[#0B73B9] text-white hover:bg-[#085C92] shadow-md shadow-[#0B73B9]/20 hover:shadow-lg hover:-translate-y-0.5"}`}
                >
                  Enroll Now <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* ═══ MOBILE TOP BAR ═══ */}
          <div className="flex lg:hidden w-full items-center justify-between h-16 sm:h-20">
            <Link
              href="/"
              className="relative h-10 w-28 sm:h-12 sm:w-32 shrink-0"
              aria-label="Home"
            >
              <Image
                src="/logo/logo.webp"
                alt="LSHS Logo"
                fill
                sizes="(max-width: 640px) 112px, 128px"
                className={`object-contain transition-all duration-500 ${useLightText ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""}`}
                priority
              />
            </Link>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <a
                href="https://forms.gle/kHkicZ6TaHQRoMck6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#f4d210] text-slate-900 rounded-full px-4 py-2 font-bold text-[11px] tracking-[0.04em] shadow-sm active:scale-95 transition-transform"
              >
                <span className="hidden sm:inline">GET ADMISSION</span>
                <span className="sm:hidden">ADMISSION</span>
                <ArrowRight className="h-3 w-3" strokeWidth={3} />
              </a>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`relative flex h-11 w-11 items-center justify-center rounded-[14px] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B73B9]/40 ${isMobileOpen ? "bg-slate-100 text-slate-900" : useLightText ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
              >
                <div className="relative flex h-4 w-5 flex-col items-end justify-center gap-[5px]">
                  <span
                    className={`h-[2px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileOpen ? "w-5 translate-y-[3.5px] rotate-45" : "w-5"}`}
                  ></span>
                  <span
                    className={`h-[2px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileOpen ? "w-5 -translate-y-[3.5px] -rotate-45" : "w-3.5"}`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ═══ DESKTOP MEGA MENU PANEL ═══ */}
        <div
          id="mega-menu-panel"
          ref={menuPanelRef}
          className="absolute top-full left-0 right-0 z-50"
          style={{
            opacity: activeMenu ? 1 : 0,
            transform: activeMenu ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
            pointerEvents: activeMenu ? "auto" : "none",
            visibility: activeMenu ? "visible" : "hidden",
          }}
          onMouseEnter={clearCloseTimeout}
          onMouseLeave={startCloseTimeout}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2">
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#0B73B9] to-transparent rounded-full" />
            <div className="bg-white rounded-[20px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-slate-100/80 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr]">
                <div className="p-6 md:p-8 mega-col">
                  {activeMenu &&
                    menuData
                      .find((m) => m.label === activeMenu)
                      ?.columns?.map((col, colIdx) => (
                        <div key={colIdx} className={colIdx > 0 ? "mt-8" : ""}>
                          <h3 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0B73B9] mb-4 pb-2.5 border-b border-slate-100 flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[#f4d210]" />
                            {col.title}
                          </h3>
                          <div className="space-y-1">
                            {col.items.map((subItem, subIdx) => (
                              <SubMenuItemRow
                                key={subIdx}
                                item={subItem}
                                onClose={closeMenu}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                </div>

                {activeMenu &&
                  menuData.find((m) => m.label === activeMenu)?.featured && (
                    <div className="mega-featured bg-slate-50/60 border-l border-slate-100">
                      {(() => {
                        const menuItem = menuData.find(
                          (m) => m.label === activeMenu,
                        );
                        if (!menuItem?.featured) return null;
                        return (
                          <Link
                            href={"/contextual-learning-assessment"}
                            className="group block w-full h-full overflow-hidden cursor-pointer"
                            onClick={closeMenu}
                          >
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={menuItem.featured.image}
                                alt={menuItem.featured.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                              <div className="absolute bottom-0 left-0 p-5">
                                <span className="inline-block bg-[#f4d210] text-slate-900 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2">
                                  Featured
                                </span>
                              </div>
                            </div>
                            <div className="p-5">
                              <h4
                                className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#0B73B9] transition-colors duration-300"
                                style={{ fontFamily: "var(--font-playfair)" }}
                              >
                                {menuItem.featured.title}
                              </h4>
                              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                                {menuItem.featured.description}
                              </p>
                              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B73B9] group-hover:gap-3 transition-all duration-300">
                                {menuItem.featured.ctaText || "Learn More"}{" "}
                                <ArrowRight className="h-4 w-4" />
                              </span>
                            </div>
                          </Link>
                        );
                      })()}
                    </div>
                  )}
              </div>

              <div className="bg-slate-50 border-t border-slate-100 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold tracking-[0.15em] uppercase text-slate-400">
                    Follow Us
                  </span>
                  <div className="flex items-center gap-1">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:text-[#0B73B9] hover:bg-[#0B73B9]/[0.06] transition-all duration-300"
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <a
                    href="mailto:info@lshs.co.uk"
                    className="flex items-center gap-1.5 hover:text-[#0B73B9] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> info@lshs.co.uk
                  </a>
                  <span className="text-slate-200 hidden sm:inline">|</span>
                  <a
                    href="tel:+447515106586"
                    className="hidden sm:flex items-center gap-1.5 hover:text-[#0B73B9] transition-colors"
                  >
                    <UkFlag className="w-4 h-2.5 rounded-[2px]" /> +44 7515
                    106586
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ MOBILE BACKDROP ═══ */}
      <div
        ref={mobileBackdropRef}
        className="fixed inset-0 z-[55] bg-slate-950/40 backdrop-blur-[6px] lg:hidden"
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ═══ MOBILE DRAWER ═══ */}
      <div
        ref={mobileDrawerRef}
        className="fixed inset-0 z-[60] w-full h-full bg-white shadow-2xl shadow-slate-900/15 lg:hidden flex flex-col"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between h-[68px] px-6 border-b border-slate-100 flex-shrink-0">
          <div className="relative h-8 w-24 flex-shrink-0">
            <Image
              src="/logo/logo.webp"
              alt="LSHS Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B73B9]/40"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-68px)] overflow-y-auto px-6 pb-8 flex flex-col overscroll-contain">
          {/* Quick Actions */}
          <div className="m-stagger pt-6 pb-6 border-b border-slate-100">
            <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => {
                      openModal(action.modal);
                      setIsMobileOpen(false);
                    }}
                    className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#0B73B9]/30 hover:bg-white active:scale-95 transition-all duration-300 shadow-sm"
                  >
                    <Icon
                      className="w-5 h-5 text-slate-400 group-hover:text-[#0B73B9] transition-colors"
                      strokeWidth={1.5}
                    />
                    <span className="text-[11px] font-semibold text-slate-700 group-hover:text-[#0B73B9] transition-colors text-center leading-tight">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Navigation */}
          <div className="m-stagger flex flex-col mt-4">
            {menuData.map((item: MenuItem) => (
              <div key={item.label} className="border-b border-slate-100">
                {item.columns ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveAccordion(
                          activeAccordion === item.label ? null : item.label,
                        )
                      }
                      className="flex w-full items-center justify-between py-4 text-left group min-h-[44px] focus:outline-none"
                      aria-expanded={activeAccordion === item.label}
                    >
                      <span
                        className={`text-[15px] font-semibold transition-colors ${activeAccordion === item.label ? "text-[#0B73B9]" : "text-slate-800"}`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${activeAccordion === item.label ? "bg-[#0B73B9] text-white rotate-180" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeAccordion === item.label ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        {item.columns.map((col, colIdx) => (
                          <div
                            key={colIdx}
                            className={colIdx > 0 ? "mt-6" : ""}
                          >
                            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-3 flex items-center gap-2">
                              <span className="h-1 w-1 rounded-full bg-[#f4d210]"></span>
                              {col.title}
                            </h4>
                            <div className="space-y-2">
                              {col.items.map((subItem, subIdx) => (
                                <Link
                                  key={subIdx}
                                  href={subItem.href}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="group flex items-start gap-3 rounded-xl p-2 hover:bg-[#0B73B9]/[0.04] transition-colors"
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-[14px] font-medium text-slate-700 group-hover:text-[#0B73B9] transition-colors">
                                        {subItem.label}
                                      </span>
                                      {subItem.badge && (
                                        <span
                                          className={`inline-flex rounded-md px-1.5 py-[1px] text-[10px] font-semibold tracking-wide leading-none ${badgeStyles[subItem.badge] || "bg-slate-50 text-slate-500 border border-slate-200/60"}`}
                                        >
                                          {subItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    {subItem.description && (
                                      <p className="text-[12px] text-slate-400 mt-1 leading-relaxed">
                                        {subItem.description}
                                      </p>
                                    )}
                                  </div>
                                  <ArrowRight className="mt-1 h-4 w-4 text-slate-300 group-hover:text-[#0B73B9] group-hover:translate-x-1 transition-all" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between py-4 text-[15px] font-medium text-slate-800 active:bg-slate-50/50 transition-colors min-h-[44px]"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-slate-300" />
                  </a>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between py-4 text-[15px] font-medium text-slate-800 active:bg-slate-50/50 transition-colors min-h-[44px]"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-slate-300" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="m-stagger mt-6 pt-6 border-t border-slate-100">
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+447515106586"
                className="flex items-center gap-3 group"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-[#0B73B9]/10 transition-colors">
                  <UkFlag className="w-[20px] h-3.5 rounded-[2px]" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                    UK
                  </p>
                  <p className="text-[14px] font-medium text-slate-700 group-hover:text-[#0B73B9] transition-colors">
                    +44 7515 106586
                  </p>
                </div>
              </a>
              <a
                href="tel:+8801906896326"
                className="flex items-center gap-3 group"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-[#0B73B9]/10 transition-colors">
                  <BdFlag className="w-[22px] h-3.5 rounded-[2px]" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                    Bangladesh
                  </p>
                  <p className="text-[14px] font-medium text-slate-700 group-hover:text-[#0B73B9] transition-colors">
                    +88 0190 6896326
                  </p>
                </div>
              </a>
              <a
                href="mailto:info@lshs.co.uk"
                className="flex items-center gap-3 group"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-[#0B73B9]/10 transition-colors">
                  <Mail className="w-4 h-4 text-slate-500 group-hover:text-[#0B73B9] transition-colors" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                    Email
                  </p>
                  <p className="text-[14px] font-medium text-slate-700 group-hover:text-[#0B73B9] transition-colors">
                    info@lshs.co.uk
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="m-stagger mt-6 pt-6 border-t border-slate-100">
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-white hover:bg-[#0B73B9] hover:border-[#0B73B9] shadow-sm transition-all duration-300 active:scale-95"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex-1 min-h-[32px]" />

          {/* Bottom CTAs */}
          <div className="m-stagger mt-4 space-y-3">
            <Link
              href="/contextual-learning-assessment"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold tracking-wide text-white bg-[#0B73B9] rounded-xl hover:bg-[#085C92] transition-all duration-300 shadow-lg shadow-[#0B73B9]/20 active:scale-[0.98]"
            >
              TAKE FREE ASSESSMENT <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://forms.gle/kHkicZ6TaHQRoMck6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold tracking-wide text-slate-900 bg-[#f4d210] rounded-xl hover:bg-[#e6c709] transition-all duration-300 active:scale-[0.98]"
            >
              GET ADMISSION <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
