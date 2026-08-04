"use client";

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
  CheckCircle,
  Tag,
} from "lucide-react";
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";

// Import Modal Hook, Types, and Data
import { useModal } from "@/app/context/ModalContext";
import { useNavbarTheme } from "@/app/context/NavbarThemeContext"; // <-- Import Theme Hook
import type { MenuItem, SubMenuItem } from "@/app/types/navbar";
import { menuData } from "@/app/data/menuData";

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
      className="mega-item group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-[#0B73B9]/[0.04] border border-transparent hover:border-[#0B73B9]/10"
    >
      <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-slate-300 transition-all duration-300 group-hover:bg-[#0B73B9] group-hover:ring-[4px] group-hover:ring-[#0B73B9]/10" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[14px] font-medium text-slate-700 transition-colors duration-200 group-hover:text-[#0B73B9]">
            {item.label}
          </span>
          {item.badge && (
            <span
              className={`inline-flex rounded-md px-2 py-[1px] text-[10px] font-semibold tracking-wide leading-none ${badgeStyles[item.badge] || "bg-slate-50 text-slate-500 border border-slate-200/60"}`}
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
      <ArrowRight className="mt-1 h-3 w-3 flex-shrink-0 text-transparent transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#0B73B9]" />
    </Link>
  );
}

// ─── Mobile Course Modal ───────────────────────────
function CourseModal({
  isOpen,
  onClose,
  columns,
  menuLabel,
  onAssessmentOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  columns: { title: string; items: SubMenuItem[] }[];
  menuLabel: string;
  onAssessmentOpen: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        if (!modalRef.current || !backdropRef.current) return;
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tlRef.current = tl;

        tl.to(backdropRef.current, { opacity: 1, duration: 0.3 }, 0);
        tl.fromTo(
          modalRef.current,
          { y: "100%" },
          { y: 0, duration: 0.55, ease: "power4.out" },
          0,
        );

        const sections = modalRef.current.querySelectorAll(".course-section");
        if (sections.length)
          tl.fromTo(
            sections,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
            0.2,
          );

        const items = modalRef.current.querySelectorAll(".course-item");
        if (items.length)
          tl.fromTo(
            items,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.25,
              stagger: 0.02,
              ease: "power2.out",
            },
            0.3,
          );
      });
    } else {
      if (tlRef.current) tlRef.current.kill();
      const tl = gsap.timeline({
        defaults: { ease: "power2.in", duration: 0.25 },
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });
      tlRef.current = tl;

      if (backdropRef.current) tl.to(backdropRef.current, { opacity: 0 }, 0);
      if (modalRef.current) tl.to(modalRef.current, { y: "100%" }, 0);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[70] bg-slate-900/50 backdrop-blur-sm"
        style={{ opacity: 0, display: isOpen ? "block" : "none" }}
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className="fixed inset-x-0 bottom-0 z-[71] bg-white rounded-t-[2rem] shadow-[0_-8px_40px_rgba(0,0,0,0.12)] max-h-[88vh] flex flex-col"
        style={{
          transform: "translateY(100%)",
          display: isOpen ? "flex" : "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="h-1.5 w-12 rounded-full bg-slate-200" />
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {menuLabel}
              </h2>
              <p className="text-xs text-slate-400">
                Choose your qualification level
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 overscroll-contain">
          <div className="space-y-8">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="course-section">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f4d210]" />
                  <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-[#0B73B9]">
                    {col.title}
                  </h3>
                  <div className="flex-1 h-px bg-slate-100 ml-2" />
                </div>
                <div className="space-y-1">
                  {col.items.map((item, itemIdx) => (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      onClick={onClose}
                      className="course-item group flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-[#0B73B9]/[0.04] border border-transparent hover:border-[#0B73B9]/10"
                    >
                      <span className="mt-[6px] h-1 w-1 flex-shrink-0 rounded-full bg-slate-300 transition-all duration-300 group-hover:bg-[#0B73B9] group-hover:ring-[4px] group-hover:ring-[#0B73B9]/10" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-slate-700 transition-colors duration-200 group-hover:text-[#0B73B9]">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span
                              className={`inline-flex rounded-md px-1.5 py-[1px] text-[10px] font-semibold tracking-wide leading-none ${badgeStyles[item.badge] || "bg-slate-50 text-slate-500 border border-slate-200/60"}`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="mt-1.5 h-3.5 w-3.5 flex-shrink-0 text-transparent transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#0B73B9]" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-slate-100 px-6 py-4 bg-white/95 backdrop-blur-sm">
          <Link
            href="https://forms.gle/kHkicZ6TaHQRoMck6"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold tracking-wide text-white bg-[#0B73B9] rounded-xl hover:bg-[#085C92] transition-all duration-300 shadow-lg shadow-[#0B73B9]/20"
          >
            Enroll Now <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-center mt-3 text-xs text-slate-400">
            Not sure which level?{" "}
            <button
              onClick={() => {
                onClose();
                setTimeout(() => onAssessmentOpen(), 350);
              }}
              className="text-[#0B73B9] font-medium hover:underline"
            >
              Take the Assessment
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

// ─── Assessment Modal (Free Multiple Choice Test) ─────────────────────────
function AssessmentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{
    exp: number | null;
    role: number | null;
  }>({
    exp: null,
    role: null,
  });
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        setStep(1);
        setAnswers({ exp: null, role: null });
        setResult(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const questions = [
    {
      id: "exp" as const,
      title: "Question 1 of 2",
      question:
        "How many years of experience do you have in procurement and supply chain?",
      options: [
        { label: "Less than 1 year (or new to the field)", value: 2 },
        { label: "1 - 3 years (Operational experience)", value: 3 },
        { label: "3 - 5 years (Tactical experience)", value: 4 },
        { label: "5+ years (Strategic experience)", value: 5 },
        { label: "Senior Leadership / Management", value: 6 },
      ],
    },
    {
      id: "role" as const,
      title: "Question 2 of 2",
      question: "Which best describes your current or target job role?",
      options: [
        { label: "Procurement Assistant / Trainee", value: 2 },
        { label: "Buyer / Procurement Executive", value: 3 },
        { label: "Senior Buyer / Contract Manager", value: 4 },
        { label: "Procurement Manager / Category Manager", value: 5 },
        { label: "Head of Procurement / Supply Chain Director", value: 6 },
      ],
    },
  ];

  const handleSelect = (qid: "exp" | "role", val: number) => {
    const newAnswers = { ...answers, [qid]: val };
    setAnswers(newAnswers);

    if (step < 2) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      const avg = Math.round((newAnswers.exp! + newAnswers.role!) / 2);
      setTimeout(() => setResult(avg), 300);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-slate-900/60 backdrop-blur-md"
        style={{
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease",
        }}
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 z-[81] w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl transition-all duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.95)",
          visibility: isOpen ? "visible" : "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              CIPS Level Assessment
            </h2>
            <p className="text-xs text-slate-500">
              Find the right course for you
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 rounded-full p-2 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {result === null ? (
            <div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1 rounded-full mb-6">
                <div
                  className="bg-[#0B73B9] h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 2) * 100}%` }}
                ></div>
              </div>

              <div className="mb-2 text-xs font-semibold tracking-wider uppercase text-[#0B73B9]">
                {questions[step - 1].title}
              </div>
              <h3 className="mb-5 text-base font-medium text-slate-800">
                {questions[step - 1].question}
              </h3>
              <div className="space-y-2">
                {questions[step - 1].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      handleSelect(questions[step - 1].id, opt.value)
                    }
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
                      answers[questions[step - 1].id] === opt.value
                        ? "border-[#0B73B9] bg-[#0B73B9]/5"
                        : "border-slate-200 hover:border-[#0B73B9]/30 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        answers[questions[step - 1].id] === opt.value
                          ? "bg-[#0B73B9] border-[#0B73B9]"
                          : "border-slate-300"
                      }`}
                    >
                      {answers[questions[step - 1].id] === opt.value && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                We recommend Level {result}
              </h3>
              <p className="mb-6 text-sm text-slate-500">
                Based on your experience and role, Level {result} is the perfect
                match to accelerate your career in procurement.
              </p>
              <Link
                href={`/courses/level-${result}-certificate`}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-[#0B73B9] rounded-xl hover:bg-[#085C92] transition-colors"
              >
                View Level {result} Course <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => {
                  setStep(1);
                  setAnswers({ exp: null, role: null });
                  setResult(null);
                }}
                className="mt-3 text-xs font-medium text-slate-500 hover:text-[#0B73B9]"
              >
                Retake Assessment
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Main Navbar ────────────────────────────────────
export default function Navbar() {
  // Initialize the dynamic modal hook
  const { openModal } = useModal();
  const { isAboutDark } = useNavbarTheme(); // <-- Get Navbar Theme State

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const coursesMenu = menuData.find((m) => m.columns);
  const allCourseColumns = coursesMenu?.columns || [];
  const megaMenuLabel = coursesMenu?.label || "Courses";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      x: rect.left - navRect.left - 10,
      width: rect.width + 20,
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
    closeTimeout.current = setTimeout(() => closeMenu(), 100);
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

  // Handle standard nav link hover (immediate close)
  const handleStandardNavEnter = () => {
    if (activeMenu) closeMenu();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isAssessmentOpen) setIsAssessmentOpen(false);
        else if (isCourseModalOpen) setIsCourseModalOpen(false);
        else if (isMobileOpen) setIsMobileOpen(false);
        else if (activeMenu) closeMenu();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobileOpen, activeMenu, isCourseModalOpen, isAssessmentOpen]);

  // Fix: Outside click checks specifically against panel and trigger, not the entire nav
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

  useEffect(() => {
    if (!isCourseModalOpen && !isAssessmentOpen) {
      document.body.style.overflow = isMobileOpen ? "hidden" : "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, isCourseModalOpen, isAssessmentOpen]);

  function openCourseModal() {
    setIsMobileOpen(false);
    setTimeout(() => setIsCourseModalOpen(true), 350);
  }

  const activeMenuItem = menuData.find((m) => m.label === activeMenu);

  // ─── NEW: STATE PRIORITY LOGIC ───────────────────
  // Mobile menu forces light navbar. About dark overrides scrolled state.
  const useLightText = !isMobileOpen && (isAboutDark || !isScrolled);
  const isCtaYellow = isAboutDark || (!isScrolled && !isMobileOpen);

  // Dynamic Navbar Background Class
  const navBgClass = isMobileOpen
    ? "bg-white/[0.98] backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] border-b border-slate-100/80"
    : isAboutDark
      ? "bg-black/95 backdrop-blur-md border-b border-white/10"
      : isScrolled
        ? "bg-white/[0.98] backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] border-b border-slate-100/80"
        : "bg-gradient-to-b from-black/60 via-black/20 to-transparent";

  // Dynamic Link Classes
  const linkBaseClass =
    "px-4 py-2 text-sm font-medium tracking-[0.02em] transition-all duration-300 rounded-lg";
  const linkStateClass = useLightText
    ? "text-white/90 hover:text-white hover:bg-white/10"
    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50";

  const activeLinkClass = useLightText
    ? "text-white bg-white/10"
    : "text-[#0B73B9] bg-[#0B73B9]/[0.04]";

  const ctaClass = isCtaYellow
    ? "bg-[#f4d210] text-slate-900 hover:bg-[#f4d210]/90 shadow-lg shadow-[#f4d210]/20 hover:-translate-y-0.5"
    : "bg-[#0B73B9] text-white hover:bg-[#085C92] shadow-md shadow-[#0B73B9]/20 hover:shadow-lg hover:shadow-[#0B73B9]/30 hover:-translate-y-0.5";

  return (
    <>
      {/* ═══ MEGA MENU OVERLAY ═══ */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[2px] cursor-pointer"
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
              className={`flex items-center justify-end gap-4 transition-all duration-500 ease-in-out overflow-hidden ${
                isScrolled
                  ? "max-h-0 opacity-0 pt-0 pb-0 mb-0"
                  : "max-h-20 opacity-100 pt-3 pb-2 mb-1"
              }`}
            >
              {/* Brochure Button */}
              <button
                onClick={() => openModal("brochure")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.05em] uppercase transition-all duration-300 hover:scale-105 bg-white/10 text-white border border-white/15 backdrop-blur-sm"
              >
                <FileText className="w-3.5 h-3.5" strokeWidth={2} />
                Brochure
              </button>

              {/* Get 25% OFF Promo Button */}
              <button
                onClick={() => openModal("discount")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.05em] uppercase transition-all duration-300 hover:scale-105 bg-red-500/20 text-red-300 border border-red-400/30 backdrop-blur-sm"
              >
                <Tag className="w-3.5 h-3.5" strokeWidth={2} />
                Get 25% OFF
              </button>

              {/* Course Prices Button */}
              <button
                onClick={() => openModal("price")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.05em] uppercase transition-all duration-300 hover:scale-105 bg-[#f4d210] text-slate-900 shadow-sm"
              >
                <CreditCard className="w-3.5 h-3.5" strokeWidth={2} />
                Course Prices
              </button>

              {/* Contact Info Group */}
              <div className="hidden lg:flex items-center gap-4 text-white/80 border-l border-white/15 pl-4 ml-1">
                <a
                  href="tel:+447515106586"
                  className="flex items-center gap-1.5 text-[12px] font-medium tracking-wide hover:text-white transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5" strokeWidth={2} />
                  +44 7515 106586
                </a>
                <a
                  href="tel:+8801906896326"
                  className="text-[12px] font-medium tracking-wide hover:text-white transition-colors whitespace-nowrap hidden xl:inline"
                >
                  , +88 0190 6896326
                </a>
                <a
                  href="mailto:info@lshs.co.uk"
                  className="text-[12px] font-medium tracking-wide hover:text-white transition-colors whitespace-nowrap hidden xl:inline"
                >
                  info@lshs.co.uk
                </a>
              </div>

              {/* Social Links Group */}
              <div className="hidden lg:flex items-center gap-1 border-l border-white/15 pl-4 ml-1">
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
                className={`relative h-16 w-36 flex-shrink-0 transition-all duration-500 ${useLightText ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" : ""}`}
              >
                <Image
                  src="/logo/logo.webp"
                  alt="LSHS"
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
                            // Attach to specific trigger ref for outside click check
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
                        className={`relative flex items-center gap-1.5 ${linkBaseClass} ${
                          activeMenu === item.label
                            ? activeLinkClass
                            : linkStateClass
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-300 ${activeMenu === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    ) : item.external ? (
                      // ─── Render standard anchor tag for external links ───
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
                      // ─── Standard Next.js Link for internal pages ───
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
                  <div />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://forms.gle/kHkicZ6TaHQRoMck6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hidden sm:inline-flex items-center gap-2 text-sm font-semibold tracking-wide px-5 py-2.5 rounded-full transition-all duration-300 ml-2 whitespace-nowrap ${ctaClass}`}
                >
                  Enroll Now <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* ═══ MOBILE TOP BAR ═══ */}
          <div className="flex lg:hidden items-center justify-between h-16">
            <Link href="/" className="relative h-10 w-28 flex-shrink-0">
              <Image
                src="/logo/logo.webp"
                alt="LSHS"
                fill
                className={`object-contain transition-all duration-500 ${useLightText ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""}`}
                priority
              />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href="tel:+447515106586"
                className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold mr-1 transition-colors duration-300 ${
                  useLightText ? "text-white/80" : "text-slate-600"
                }`}
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={2} />
                Call Us
              </a>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  useLightText
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
          <div className="mx-auto max-w-6xl px-6 pt-2">
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#0B73B9] to-transparent rounded-full" />
            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-400/20 border border-slate-100/80 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
                {/* Left Side: Menu Items */}
                <div className="p-8 mega-col">
                  {activeMenuItem?.columns?.map((col, colIdx) => (
                    <div key={colIdx} className={colIdx > 0 ? "mt-8" : ""}>
                      <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-[#0B73B9] mb-4 pb-2.5 border-b border-slate-100 flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-[#f4d210]" />
                        {col.title}
                      </h3>
                      <div className="space-y-0.5">
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

                {/* Right Side: Featured Course / Assessment */}
                {activeMenuItem?.featured && (
                  <div className="mega-featured bg-slate-50/50 border-l border-slate-100">
                    <div
                      onClick={() => {
                        closeMenu();
                        setTimeout(() => setIsAssessmentOpen(true), 200);
                      }}
                      className="group block w-full h-full overflow-hidden cursor-pointer"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={activeMenuItem.featured.image}
                          alt={activeMenuItem.featured.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                      </div>
                      <div className="p-5">
                        <h4
                          className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#0B73B9] transition-colors duration-300"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {activeMenuItem.featured.title}
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed mb-5">
                          {activeMenuItem.featured.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B73B9] group-hover:gap-3 transition-all duration-300">
                          {activeMenuItem.featured.ctaText || "Learn More"}{" "}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mega Menu Footer */}
              <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
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
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <a
                    href="mailto:info@lshs.co.uk"
                    className="hover:text-[#0B73B9] transition-colors"
                  >
                    info@lshs.co.uk
                  </a>
                  <span className="text-slate-200">|</span>
                  <a
                    href="tel:+447515106586"
                    className="hover:text-[#0B73B9] transition-colors"
                  >
                    +44 7515 106586
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ ASSESSMENT MODAL ═══ */}
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />

      {/* ═══ MOBILE COURSE MODAL ═══ */}
      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        columns={allCourseColumns}
        menuLabel={megaMenuLabel}
        onAssessmentOpen={() => setIsAssessmentOpen(true)}
      />

      {/* ═══ MOBILE BACKDROP ═══ */}
      <div
        className={`fixed inset-0 z-[55] bg-slate-900/40 backdrop-blur-sm lg:hidden transition-all duration-500 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ═══ MOBILE DRAWER ═══ */}
      <div
        className={`fixed inset-y-0 right-0 z-[60] w-[88%] max-w-[380px] bg-white shadow-2xl shadow-slate-900/15 lg:hidden transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between h-[68px] px-6 border-b border-slate-100 flex-shrink-0">
          <div className="relative h-7 w-24 flex-shrink-0">
            <Image
              src="/logo/logo.webp"
              alt="LSHS"
              fill
              className="object-contain"
              priority
            />
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(100vh-68px)] overflow-y-auto px-6 pb-8 flex flex-col">
          {/* ═══ FIRST SEGMENT: Actions, Social & Phone ═══ */}
          <div className="pt-6 pb-6 border-b border-slate-100">
            <div className="grid grid-cols-3 gap-3 mb-5">
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
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-[#0B73B9] transition-colors text-center">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between bg-slate-50/60 rounded-2xl px-4 py-3 border border-slate-100/80">
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
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-[#0B73B9] hover:bg-[#0B73B9]/10 shadow-sm transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
              <a
                href="tel:+447515106586"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0B73B9] transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={2} />
                +44 7515 106586
              </a>
            </div>
          </div>

          {/* ═══ SECOND SEGMENT: Main Navigation ═══ */}
          <div className="flex flex-col mt-4">
            {menuData.map((item: MenuItem) =>
              item.columns ? (
                <button
                  key={item.label}
                  onClick={openCourseModal}
                  className="flex w-full items-center justify-between py-4 text-[15px] font-medium text-slate-800 border-b border-slate-50 active:bg-slate-50/50 transition-colors group min-h-[44px]"
                >
                  <span className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f4d210]" />
                    {item.label}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0B73B9] bg-[#0B73B9]/5 px-2.5 py-1 rounded-full uppercase tracking-wider group-hover:bg-[#0B73B9]/10 transition-colors">
                    Levels
                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </button>
              ) : item.external ? (
                // ─── Render standard anchor tag for external links ───
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-between py-4 text-[15px] font-medium text-slate-800 border-b border-slate-50 active:bg-slate-50/50 transition-colors min-h-[44px]"
                >
                  <span className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                    {item.label}
                  </span>
                </a>
              ) : (
                // ─── Standard Next.js Link for internal pages ───
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-between py-4 text-[15px] font-medium text-slate-800 border-b border-slate-50 active:bg-slate-50/50 transition-colors min-h-[44px]"
                >
                  <span className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                    {item.label}
                  </span>
                </Link>
              ),
            )}
          </div>

          <div className="flex-1 min-h-[32px]" />

          <div className="mt-4 space-y-3">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                setTimeout(() => setIsAssessmentOpen(true), 350);
              }}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold tracking-wide text-white bg-[#0B73B9] rounded-xl hover:bg-[#085C92] transition-all duration-300 shadow-lg shadow-[#0B73B9]/20"
            >
              Take Free Assessment <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="https://forms.gle/kHkicZ6TaHQRoMck6"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold tracking-wide text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all duration-300"
            >
              Enroll Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center w-full py-2.5 text-xs font-medium text-slate-500 hover:text-[#0B73B9] transition-colors"
            >
              Existing Student? Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
