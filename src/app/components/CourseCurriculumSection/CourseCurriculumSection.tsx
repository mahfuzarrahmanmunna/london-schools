"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Play,
  Pause,
  Clock,
  BookOpen,
  Award,
  MonitorPlay,
  CheckCircle2,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Course Data ──────────────────────────────────────────
const courses = [
  {
    level: 2,
    title: "Level 2 Certificate",
    desc: "Introduction to Procurement & Supply Operations. The perfect starting point to build a strong foundation in procurement principles.",
    specs: [
      { icon: Clock, label: "Duration", value: "6-9 Months" },
      { icon: BookOpen, label: "Modules", value: "5 Core Modules" },
      { icon: Award, label: "Credits", value: "18 Credits" },
      { icon: MonitorPlay, label: "Study Mode", value: "Online / Blended" },
    ],
    videoSrc: "/promo/CoursePromo.mp4", // Replace with actual video paths
    poster: "/images/level-2-poster.jpg", // Replace with actual poster paths
  },
  {
    level: 3,
    title: "Level 3 Advanced Certificate",
    desc: "Procurement & Supply Operations. Ideal for developing operational skills and preparing for management-level procurement.",
    specs: [
      { icon: Clock, label: "Duration", value: "9-12 Months" },
      {
        icon: BookOpen,
        label: "Modules",
        value: "6 Modules (4 Core + 2 Elective)",
      },
      { icon: Award, label: "Credits", value: "30 Credits" },
      { icon: MonitorPlay, label: "Study Mode", value: "Online / Blended" },
    ],
    videoSrc: "/promo/CoursePromo.mp4",
    poster: "/images/level-3-poster.jpg",
  },
  {
    level: 4,
    title: "Level 4 Diploma",
    desc: "Procurement & Supply. Our most popular qualification. Move from operational buying into strategic sourcing and negotiation.",
    specs: [
      { icon: Clock, label: "Duration", value: "12-18 Months" },
      { icon: BookOpen, label: "Modules", value: "8 Core Modules" },
      { icon: Award, label: "Credits", value: "60 Credits" },
      { icon: MonitorPlay, label: "Study Mode", value: "Online / Classroom" },
    ],
    videoSrc: "/promo/CoursePromo.mp4",
    poster: "/images/level-4-poster.jpg",
  },
  {
    level: 5,
    title: "Level 5 Advanced Diploma",
    desc: "Procurement & Supply. Step into a senior operational or managerial role, covering supply chain risk and financial management.",
    specs: [
      { icon: Clock, label: "Duration", value: "12-18 Months" },
      { icon: BookOpen, label: "Modules", value: "Core + Elective Modules" },
      { icon: Award, label: "Credits", value: "60 Credits" },
      { icon: MonitorPlay, label: "Study Mode", value: "Online / Classroom" },
    ],
    videoSrc: "/promo/CoursePromo.mp4",
    poster: "/images/level-5-poster.jpg",
  },
  {
    level: 6,
    title: "Level 6 Professional Diploma",
    desc: "Strategic Procurement Leadership. The final level on the MCIPS pathway, focusing on strategic leadership and change management.",
    specs: [
      { icon: Clock, label: "Duration", value: "12-18 Months" },
      { icon: BookOpen, label: "Modules", value: "Core + Optional Modules" },
      { icon: Award, label: "Credits", value: "60 Credits" },
      { icon: MonitorPlay, label: "Study Mode", value: "Online / Classroom" },
    ],
    videoSrc: "/promo/CoursePromo.mp4",
    poster: "/images/level-6-poster.jpg",
  },
];

export default function CourseCurriculumSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeLevel, setActiveLevel] = useState(4); // Default to Level 4 (Most Popular)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const activeCourse = courses.find((c) => c.level === activeLevel)!;

  // GSAP Reveal Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".curriculum-reveal", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate content when level changes
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      );
    }
    // Pause video if playing when switching
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [activeLevel]);

  // Video Controls Logic
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err) => console.log(err));
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Sync state with video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, [activeLevel]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-slate-900 overflow-hidden border-t border-slate-100"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16 max-w-2xl curriculum-reveal">
          <div className="demo-reveal inline-flex items-center gap-3 mb-6 bg-slate-50 border border-slate-200 py-1.5 px-4 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#0B73B9]" />
            <span className="text-[11px] tracking-[0.25em] font-semibold text-slate-700 uppercase">
              Course Overview
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Explore the Curriculum & <br /> Hear From Our Tutors
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-500 leading-relaxed">
            Select a CIPS qualification level below to view course
            specifications and watch a demo class where our expert tutors break
            down the curriculum, modules, and learning outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ─── Left Sidebar: Level Selector & Specs ─── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 curriculum-reveal">
            {/* Level Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {courses.map((course) => (
                <button
                  key={course.level}
                  onClick={() => setActiveLevel(course.level)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 border ${
                    activeLevel === course.level
                      ? "bg-[#0B73B9] text-white border-[#0B73B9] shadow-md shadow-[#0B73B9]/20"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#0B73B9]/40 hover:text-[#0B73B9]"
                  }`}
                >
                  Level {course.level}
                </button>
              ))}
            </div>

            <div ref={containerRef}>
              {/* Active Course Title & Desc */}
              <div className="mb-8">
                <h3
                  className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {activeCourse.title}
                </h3>
                <p className="text-[15px] text-slate-500 leading-relaxed">
                  {activeCourse.desc}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                {activeCourse.specs.map((spec, i) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all hover:border-[#0B73B9]/20 hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2 text-[#0B73B9]">
                        <Icon className="w-4 h-4" strokeWidth={2} />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {spec.label}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        {spec.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Trust Indicator */}
              <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <p className="text-sm text-slate-600 font-medium">
                  CIPS Approved Study Centre & Exam Centre
                </p>
              </div>

              {/* Enroll Now Button */}
              <a
                href="https://forms.gle/kHkicZ6TaHQRoMck6"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0B73B9] text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-all hover:bg-[#085C92] hover:shadow-lg hover:shadow-[#0B73B9]/20"
              >
                Enroll Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* ─── Right Content: Video Player ─── */}
          <div className="lg:col-span-7 curriculum-reveal">
            <div
              className="group relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-300/50 cursor-pointer bg-black"
              onClick={togglePlay}
            >
              {/* 
                Video Element. 
                Key prop forces React to remount video when level changes, ensuring src updates cleanly.
              */}
              <video
                key={activeCourse.videoSrc}
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={activeCourse.poster}
                preload="metadata"
                playsInline
              >
                <source src={activeCourse.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Dark Overlay (visible when paused) */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 transition-opacity duration-500 flex items-center justify-center ${
                  isPlaying
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100 group-hover:opacity-90"
                }`}
              >
                {/* Center Play Button */}
                <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#0B73B9] border-4 border-white/20 backdrop-blur-sm shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0d85d6] group-hover:border-white/40">
                  <Play
                    className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                    fill="currentColor"
                  />
                </div>

                {/* Bottom Caption (visible when paused) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] font-bold text-[#f4d210] uppercase mb-2">
                        Curriculum Demo
                      </p>
                      <h3
                        className="text-xl md:text-2xl font-medium text-white"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {activeCourse.title} Walkthrough
                      </h3>
                    </div>
                    <span className="hidden md:flex items-center gap-2 text-xs font-semibold text-white/70 uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                      <Play className="w-3 h-3" fill="currentColor" /> Click to
                      Play
                    </span>
                  </div>
                </div>
              </div>

              {/* Custom Controls Bar (visible when playing) */}
              {isPlaying && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    aria-label="Toggle Mute"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    aria-label="Pause video"
                  >
                    <Pause className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Video Description Below */}
            <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-base font-bold text-slate-900 mb-2">
                What you&apos;ll learn in this demo:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B73B9] mt-0.5 flex-shrink-0" />
                  <span>
                    Detailed breakdown of core modules and assessments.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B73B9] mt-0.5 flex-shrink-0" />
                  <span>
                    Real-world procurement applications discussed by the tutor.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B73B9] mt-0.5 flex-shrink-0" />
                  <span>
                    Study flexibility and exam preparation strategies.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B73B9] mt-0.5 flex-shrink-0" />
                  <span>Career progression and MCIPS pathway guidance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}