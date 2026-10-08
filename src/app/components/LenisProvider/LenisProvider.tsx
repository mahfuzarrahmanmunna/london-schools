"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pathname = usePathname();

  /* ─────────────────────────────────────────────────────
     INITIALIZE LENIS (once, on mount)
     ───────────────────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register plugin (idempotent — safe to call multiple times)
    gsap.registerPlugin(ScrollTrigger);

    /* HMR / React Strict Mode safety:
       If a previous instance is lingering (dev hot-reload, strict mode
       double-invoke), destroy it before creating a new one. Without this,
       multiple RAF loops accumulate and the page freezes. */
    if (lenisRef.current) {
      try { lenisRef.current.destroy(); } catch {}
      lenisRef.current = null;
    }
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: false, // we drive raf manually for full control
      /* Prevent Lenis from hijacking scroll inside any element marked with
         data-lenis-prevent — modals, dropdowns, scrollable code blocks, etc.
         Without this, opening a modal can freeze the whole page. */
      prevent: (node) => {
        if (!(node instanceof Element)) return false;
        return node.closest("[data-lenis-prevent]") !== null;
      },
    });

    lenisRef.current = lenis;

    /* ── RAF loop (native rAF, not gsap.ticker) ──
       Why native rAF instead of gsap.ticker:
       • gsap.ticker is global — adding/removing functions across HMR
         cycles can leave orphan functions that call dead Lenis instances
       • Native rAF gives us a single cancellable ID per loop
       • try/catch around lenis.raf() prevents silent errors when Lenis
         is destroyed mid-frame (the #1 cause of "freezing") */
    let isRunning = true;

    const raf = (time: number) => {
      if (!isRunning) return;
      const current = lenisRef.current;
      if (current) {
        try {
          current.raf(time);
        } catch {
          // Lenis was destroyed mid-frame — abort the loop cleanly
          isRunning = false;
          rafIdRef.current = null;
          return;
        }
      }
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    /* ── Sync ScrollTrigger with Lenis scroll events ── */
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    /* ── Debounced resize → ScrollTrigger.refresh() ──
       Without this, after window resize, ScrollTrigger positions are
       stale and trigger fighting / "stuck scroll" can happen. */
    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (lenisRef.current) {
          ScrollTrigger.refresh();
        }
      }, 150);
    };
    window.addEventListener("resize", onResize);

    /* ── Pause Lenis when tab is hidden ──
       When you switch tabs and come back, Lenis tries to "catch up"
       the missed frames, causing a visible jump/freeze.
       Pausing on visibilitychange prevents this. */
    const onVisibilityChange = () => {
      const l = lenisRef.current;
      if (!l) return;
      if (document.hidden) {
        l.stop();
      } else {
        l.start();
        // Layout may have shifted while hidden — refresh triggers
        requestAnimationFrame(() => {
          if (!document.hidden) ScrollTrigger.refresh();
        });
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    /* ── Initial refresh after first paint ── */
    const initRaf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      // 1. Stop the RAF loop (the flag + cancelAnimationFrame together
      //    guarantee no more frames fire after this point)
      isRunning = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      // 2. Cancel any pending init refresh
      cancelAnimationFrame(initRaf);
      // 3. Clear resize debounce
      window.clearTimeout(resizeTimer);
      // 4. Remove all listeners
      lenis.off("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      // 5. Destroy Lenis (wrapped in try/catch for HMR safety)
      try { lenis.destroy(); } catch {}
      lenisRef.current = null;
    };
  }, []);

  /* ─────────────────────────────────────────────────────
     HANDLE ROUTE CHANGES
     ───────────────────────────────────────────────────── */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // 1. Stop any in-progress smooth scroll animation
    lenis.stop();
    // 2. Reset scroll position instantly (no animation)
    lenis.scrollTo(0, { immediate: true });
    // 3. Resume Lenis for the new page
    lenis.start();

    /* 4. Refresh ScrollTrigger after the new DOM has painted.
          Using double rAF (instead of a fixed 200ms timeout) ensures
          React has committed the new page's DOM before we recalculate.
          The 300ms fallback handles late-loading async content
          (images, react-query data). */
    let raf1 = 0;
    let raf2 = 0;
    let fallback: number | undefined;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        // Backup refresh for late async content
        fallback = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 300);
      });
    });

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      if (fallback) window.clearTimeout(fallback);
    };
  }, [pathname]);

  return <>{children}</>;
}