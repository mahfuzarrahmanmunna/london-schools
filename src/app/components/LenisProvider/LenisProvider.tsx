"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    // Register plugin inside useEffect to avoid SSR issues
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Initial refresh
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle route changes
  useEffect(() => {
    // When the route changes, scroll to top instantly
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Wait for the new page's DOM to paint, then recalculate ScrollTrigger
    const timeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200); // 200ms delay ensures images/layout have started loading

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return <>{children}</>;
}
