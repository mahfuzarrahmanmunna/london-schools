"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DemoClassSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Tracks if video was ever played
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // ── GSAP Reveal Animation ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".demo-reveal", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Video Event Listeners ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onPlay = () => {
      setIsPlaying(true);
      setHasStarted(true); // Mark as started to hide thumbnail
    };
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("volumechange", onVolumeChange);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  // ── Fullscreen Listener ──
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // ── Player Controls Logic ──
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    video.currentTime = percentage * video.duration || 0;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    video.muted = newVolume === 0;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current
        ?.requestFullscreen()
        .catch((err) => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-slate-900 overflow-hidden py-10 border-t border-slate-100"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        {/* Left-Aligned Header */}
        <div className="flex flex-col items-start text-left mb-12 md:mb-16">
          <div className="demo-reveal inline-flex items-center gap-3 mb-6 bg-slate-50 border border-slate-200 py-1.5 px-4 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#0B73B9]" />
            <span className="text-[11px] tracking-[0.25em] font-semibold text-slate-700 uppercase">
              Demo Class Trailer
            </span>
          </div>

          <h2
            className="demo-reveal text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.15] max-w-2xl text-slate-900"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Experience the LSHS Learning Journey
          </h2>

          <p className="demo-reveal mt-5 text-base md:text-lg text-slate-500 max-w-xl leading-relaxed">
            Watch our 5-minute trailer to see how our expert tutors deliver
            practical, real-world CIPS training.
          </p>
        </div>

        {/* Custom Video Player Container */}
        <div
          ref={containerRef}
          className="demo-reveal group relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-300/50 bg-black cursor-pointer"
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          onClick={(e) => {
            // Prevent click conflict with controls
            if ((e.target as HTMLElement).closest(".custom-controls")) return;
            togglePlay();
          }}
        >
          {/* Video Element - Removed native poster to use Next.js Image instead */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            preload="metadata"
            playsInline
          >
            <source src="/promo/CoursePromo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Thumbnail & Pause Overlay Container */}
          {/* Fades out smoothly when playing */}
          <div 
            className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-700 ease-in-out ${
              isPlaying && hasStarted ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {/* Next.js Optimized Thumbnail - Only rendered before first play */}
            {!hasStarted && (
              <Image
                src="/image.webp"
                alt="Demo Class Trailer Thumbnail"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            )}

            {/* Dark Gradient Overlay */}
            <div className={`absolute inset-0 transition-colors duration-300 ${
              hasStarted ? "bg-black/40 group-hover:bg-black/30" : "bg-black/40 group-hover:bg-black/20"
            }`} />

            {/* Center Play Button */}
            <div
              className={`relative z-20 flex items-center justify-center rounded-full bg-[#0B73B9] shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#0d85d6] border-4 border-white/20 backdrop-blur-sm ${
                hasStarted
                  ? "w-16 h-16 md:w-20 md:h-20"
                  : "w-20 h-20 md:w-24 md:h-24"
              }`}
            >
              <Play
                className={`${hasStarted ? "w-6 h-6 md:w-8 md:h-8" : "w-8 h-8 md:w-10 md:h-10"} text-white ml-1`}
                fill="currentColor"
              />
            </div>
          </div>

          {/* Bottom Gradient & Controls Bar */}
          <div
            className={`custom-controls absolute bottom-0 left-0 right-0 z-30 transition-all duration-300 ${
              showControls || !isPlaying
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-gradient-to-t from-black/90 to-transparent pt-10 pb-4 px-4 md:px-6">
              {/* Progress Bar */}
              <div
                className="group/progress relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3"
                onClick={handleSeek}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#0B73B9] rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0B73B9] rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity"
                  style={{ left: `calc(${progressPercentage}% - 6px)` }}
                />
              </div>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-between text-white">
                {/* Left Side Controls (Play, Volume) */}
                <div className="flex items-center gap-3 md:gap-4">
                  <button
                    onClick={togglePlay}
                    className="hover:text-[#0B73B9] transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5" fill="currentColor" />
                    )}
                  </button>

                  <div className="flex items-center gap-2 group/vol">
                    <button
                      onClick={toggleMute}
                      className="hover:text-[#0B73B9] transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-0 group-hover/vol:w-16 transition-all duration-300 accent-[#0B73B9] cursor-pointer opacity-0 group-hover/vol:opacity-100"
                      aria-label="Volume"
                    />
                  </div>

                  {/* Time Display */}
                  <div className="text-xs font-medium tabular-nums tracking-wider">
                    {formatTime(currentTime)}{" "}
                    <span className="text-white/50">
                      / {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* Right Side Controls (Fullscreen) */}
                <button
                  onClick={toggleFullscreen}
                  className="hover:text-[#0B73B9] transition-colors"
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5" />
                  ) : (
                    <Maximize className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Below Video Trust Indicators */}
        <div className="demo-reveal mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs uppercase tracking-[0.15em] text-slate-500 font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#0B73B9] rounded-full" />
            Expert Tutors
          </div>
          <span className="hidden sm:block w-px h-3 bg-slate-300" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#0B73B9] rounded-full" />
            Practical Application
          </div>
          <span className="hidden sm:block w-px h-3 bg-slate-300" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#0B73B9] rounded-full" />
            Real-World Syllabus
          </div>
        </div>
      </div>
    </section>
  );
}