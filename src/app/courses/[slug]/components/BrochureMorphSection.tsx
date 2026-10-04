"use client";

import { useRef, useState, useEffect } from "react";
import { Download, FileText } from "lucide-react";

// ─── Types ──────────────────────────────────────────────
interface LevelTheme {
  accent: string;
  accentRgb: string;
  text: string;
  bg: string;
  border: string;
}

// ─── Component ───────────────────────────────────────────
export default function BrochureMorphSection({
  headline,
  cta,
  onDownload,
  theme,
  courseName,
}: {
  headline: string;
  cta: string;
  onDownload: () => void;
  theme: LevelTheme;
  courseName: string; // Added to make the 3D mockups dynamic!
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 10, y: -15 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();

      // Calculate mouse position relative to the right side (brochures)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Subtle, luxury parallax tilt (max ±15 degrees)
      setRotation({
        x: 10 - y * 20,
        y: -15 + x * 20,
      });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 10, y: -15 }); // Reset to default elegant angle
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Reusable style for the CSS-only brochure covers
  const brochureBaseStyle = (
    zIndex: number,
    scale: number,
    opacity: number,
  ): React.CSSProperties => ({
    position: "absolute",
    width: "220px",
    height: "310px",
    left: "50%",
    top: "50%",
    marginTop: "-155px",
    marginLeft: "-110px",
    borderRadius: "4px",
    overflow: "hidden",
    transformStyle: "preserve-3d",
    transform: `translateZ(${zIndex * 40}px) scale(${scale})`,
    zIndex,
    opacity,
    boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)`,
    transition:
      "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease",
  });

  return (
    <section
      ref={containerRef}
      className="reveal relative overflow-hidden bg-[#050A15] border-t border-b border-white/5"
    >
      {/* Subtle background light emanating from the brochures */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at 70% 50%, rgba(${theme.accentRgb}, 0.07) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
        {/* ── Left Side: Content ── */}
        <div className="flex flex-col justify-center text-left max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-px"
              style={{ backgroundColor: theme.accent }}
            />
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: theme.text }}
            >
              Course Guide
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            {headline}
          </h2>

          <p className="text-lg text-slate-400 leading-relaxed mb-10 font-light">
            Get detailed information on modules, pricing structures, study
            modes, and how this qualification aligns with your career goals.
          </p>

          {/* Premium CTA Button */}
          <div className="flex items-center gap-6">
            <button
              onClick={onDownload}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-md text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: theme.accent,
                boxShadow: `0 10px 30px -5px rgba(${theme.accentRgb}, 0.4)`,
              }}
            >
              <Download size={18} strokeWidth={2.5} />
              {cta}
            </button>

            <div className="hidden sm:flex items-center gap-2 text-slate-500">
              <FileText size={14} />
              <span className="text-xs font-medium uppercase tracking-wider">
                PDF Format
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Side: 3D Interactive Brochures ── */}
        <div
          className="relative h-[400px] w-full hidden lg:block"
          style={{ perspective: "1200px" }}
        >
          <div
            className="w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* --- Brochure 1 (Back / Left) --- */}
            <div style={brochureBaseStyle(1, 0.9, 0.6)}>
              <div className="w-full h-full bg-slate-800 p-6 flex flex-col border border-white/5">
                <div
                  className="w-full h-8 rounded-sm mb-6 opacity-20"
                  style={{ backgroundColor: theme.accent }}
                />
                <div className="flex-1 space-y-3">
                  <div className="w-full h-2 bg-white/10 rounded" />
                  <div className="w-4/5 h-2 bg-white/10 rounded" />
                  <div className="w-3/4 h-2 bg-white/10 rounded" />
                  <div className="w-full h-2 bg-white/10 rounded mt-6" />
                  <div className="w-5/6 h-2 bg-white/10 rounded" />
                </div>
              </div>
            </div>

            {/* --- Brochure 2 (Middle) --- */}
            <div style={brochureBaseStyle(2, 0.95, 0.85)}>
              <div className="w-full h-full bg-slate-900 border border-white/10 flex flex-col overflow-hidden">
                {/* Header Bar */}
                <div
                  className="h-12 w-full flex items-center px-4"
                  style={{ backgroundColor: `rgba(${theme.accentRgb}, 0.2)` }}
                >
                  <div
                    className="w-6 h-6 rounded-sm border-2 flex items-center justify-center text-[8px] font-black"
                    style={{ borderColor: theme.text, color: theme.text }}
                  >
                    C
                  </div>
                  <div className="ml-2 w-16 h-1.5 bg-white/20 rounded" />
                </div>
                {/* Body */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="w-3/4 h-2 bg-white/20 rounded mb-4" />
                    <div className="w-full h-1.5 bg-white/5 rounded mb-2" />
                    <div className="w-5/6 h-1.5 bg-white/5 rounded mb-2" />
                    <div className="w-4/5 h-1.5 bg-white/5 rounded" />
                  </div>
                  {/* Fake Chart Area */}
                  <div className="h-16 border border-white/5 rounded bg-white/[0.02] p-2 flex items-end gap-1">
                    {[40, 60, 45, 80, 55].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          backgroundColor: `rgba(${theme.accentRgb}, ${0.2 + i * 0.1})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Brochure 3 (Front / Right - Main Focus) --- */}
            <div style={brochureBaseStyle(3, 1, 1)}>
              <div className="w-full h-full bg-slate-950 border border-white/10 flex flex-col overflow-hidden relative">
                {/* Top Accent Gradient */}
                <div
                  className="absolute top-0 left-0 right-0 h-1/3 opacity-20 pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, ${theme.accent}, transparent)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col h-full">
                  {/* Logo Area */}
                  <div className="flex items-center gap-2 mb-8">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-black text-white"
                      style={{ backgroundColor: theme.accent }}
                    >
                      CIPS
                    </div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-tight">
                      London School
                      <br />
                      of Higher Studies
                    </div>
                  </div>

                  {/* Main Title */}
                  <div className="flex-1 flex flex-col justify-center">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3"
                      style={{ color: theme.text }}
                    >
                      Course Guide
                    </p>
                    <h3 className="text-xl font-bold text-white leading-tight mb-4">
                      {courseName}
                    </h3>
                    <div
                      className="w-10 h-0.5 mb-4"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <p className="text-[11px] text-white/40 leading-relaxed">
                      Procurement & Supply Operations
                    </p>
                  </div>

                  {/* Footer Elements */}
                  <div className="mt-auto space-y-2">
                    <div className="w-full h-1.5 bg-white/5 rounded" />
                    <div className="w-3/4 h-1.5 bg-white/5 rounded" />
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <div
                        className="w-12 h-3 rounded-sm"
                        style={{
                          backgroundColor: `rgba(${theme.accentRgb}, 0.3)`,
                        }}
                      />
                      <div className="w-16 h-3 rounded-sm bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Fallback: Simple centered card */}
        <div className="lg:hidden flex justify-center">
          <div className="w-64 h-80 rounded-lg overflow-hidden border border-white/10 bg-slate-900 shadow-2xl relative">
            <div
              className="absolute top-0 left-0 right-0 h-1/3 opacity-20 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, ${theme.accent}, transparent)`,
              }}
            />
            <div className="relative z-10 p-6 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-black text-white"
                  style={{ backgroundColor: theme.accent }}
                >
                  CIPS
                </div>
                <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-tight">
                  LSHS
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.15em] mb-2"
                  style={{ color: theme.text }}
                >
                  Course Guide
                </p>
                <h3 className="text-lg font-bold text-white leading-tight mb-3">
                  {courseName}
                </h3>
                <div
                  className="w-8 h-0.5 mb-3"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
              <div className="space-y-1.5">
                <div className="w-full h-1.5 bg-white/5 rounded" />
                <div className="w-3/4 h-1.5 bg-white/5 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
