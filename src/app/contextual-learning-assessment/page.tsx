"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  RotateCcw,
  Sparkles,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Award,
  Download,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Assessment Questions Data ──────────────────────────
const questions = [
  {
    id: 1,
    icon: Briefcase,
    title: "Experience Level",
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
    id: 2,
    icon: TrendingUp,
    title: "Current Role",
    question: "Which best describes your current or target job role?",
    options: [
      { label: "Procurement Assistant / Trainee", value: 2 },
      { label: "Buyer / Procurement Executive", value: 3 },
      { label: "Senior Buyer / Contract Manager", value: 4 },
      { label: "Procurement Manager / Category Manager", value: 5 },
      { label: "Head of Procurement / Supply Chain Director", value: 6 },
    ],
  },
  {
    id: 3,
    icon: GraduationCap,
    title: "Academic Background",
    question:
      "What is your highest educational qualification relevant to business/procurement?",
    options: [
      { label: "Secondary / High School Diploma", value: 2 },
      { label: "Diploma / Foundation Degree", value: 3 },
      { label: "Bachelor's Degree (e.g., BSc, BA)", value: 4 },
      { label: "Master's Degree (e.g., MSc, MBA)", value: 5 },
      { label: "Extensive Professional Certifications", value: 6 },
    ],
  },
];

// ─── Level Mapping Data ─────────────────────────────────
const levelData = {
  2: {
    title: "Level 2 Certificate",
    desc: "Introduction to Procurement & Supply Operations. The perfect starting point to build a strong foundation in procurement principles.",
    href: "/courses/level-2-certificate",
  },
  3: {
    title: "Level 3 Advanced Certificate",
    desc: "Procurement & Supply Operations. Ideal for developing operational skills and preparing for management-level procurement.",
    href: "/courses/level-3-certificate",
  },
  4: {
    title: "Level 4 Diploma",
    desc: "Procurement & Supply. Our most popular qualification. Move from operational buying into strategic sourcing and negotiation.",
    href: "/courses/level-4-certificate",
  },
  5: {
    title: "Level 5 Advanced Diploma",
    desc: "Procurement & Supply. Step into a senior operational or managerial role, covering supply chain risk and financial management.",
    href: "/courses/level-5-certificate",
  },
  6: {
    title: "Level 6 Professional Diploma",
    desc: "Strategic Procurement Leadership. The final level on the MCIPS pathway, focusing on strategic leadership and change management.",
    href: "/courses/level-6-certificate",
  },
};

const optionLetters = ["A", "B", "C", "D", "E"];

// ─── Main Page Component ─────────────────────────────────
export default function ContextualLearningAssessment() {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2 are questions. 3 is result/form.
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Animate card content on step change
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
    }
  }, [currentStep]);

  const handleSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      // Calculate result
      const sum = newAnswers.reduce((acc, curr) => acc + curr, 0);
      const avg = Math.round(sum / newAnswers.length);
      setTimeout(() => {
        setResult(avg);
        setCurrentStep(3); // Move to form step
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRetake = () => {
    setAnswers([]);
    setCurrentStep(0);
    setResult(null);
    setIsSubmitted(false);
    reset();
  };

  // Form Submission Logic
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          recommendedLevel: result,
          source: "Contextual Assessment Page",
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(
          resData.message || "Unable to submit your details right now.",
        );
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
    }
  };

  const progress = ((currentStep + 1) / (questions.length + 1)) * 100;
  const CurrentIcon = questions[currentStep]?.icon || Award;

  const getInputClasses = (fieldName: string) => {
    const base =
      "w-full bg-slate-50 border rounded-lg px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed";
    return errors[fieldName]
      ? `${base} border-red-300 focus:ring-red-100`
      : `${base} border-slate-200 focus:ring-[#0B73B9]/10 focus:border-[#0B73B9]`;
  };

  return (
    <main ref={pageRef} className="bg-slate-50 min-h-screen relative">
      {/* Background Texture */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(11,115,185,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,115,185,0.03)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-[#001B30] border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#0B73B9] opacity-[0.08] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#f4d210] opacity-[0.04] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="hero-anim inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <Sparkles size={14} className="text-[#f4d210]" />
            <span className="text-xs font-medium tracking-widest uppercase text-white/60">
              CIPS Level Assessment
            </span>
          </div>
          <h1
            className="hero-anim text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Find Your Ideal CIPS Level
          </h1>
          <p className="hero-anim text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
            Not sure which CIPS qualification is right for you? Answer three
            quick questions about your experience and goals, and we&apos;ll
            recommend the perfect starting point for your procurement journey.
          </p>
        </div>
      </section>

      {/* ═══════════════════ ASSESSMENT CARD ═══════════════════ */}
      <section className="relative z-10 py-20 md:py-28 -mt-10">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-300/40 border border-slate-100 overflow-hidden">
            {/* Progress Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B73B9] flex items-center justify-center shadow-md shadow-[#0B73B9]/20">
                    {currentStep < 3 ? (
                      <CurrentIcon
                        className="w-4 h-4 text-white"
                        strokeWidth={2}
                      />
                    ) : (
                      <Award className="w-4 h-4 text-white" strokeWidth={2} />
                    )}
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400">
                      Step {currentStep + 1} of {questions.length + 1}
                    </span>
                    <span className="block text-sm font-bold text-slate-700">
                      {currentStep < 3
                        ? questions[currentStep].title
                        : "Your Result & Details"}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold tracking-wider text-slate-500">
                  {Math.round(progress)}%
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0B73B9] to-[#085C92] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div ref={cardRef} className="p-6 md:p-10 min-h-[400px]">
              {currentStep < 3 ? (
                /* ─── QUESTION VIEW ─── */
                <div className="flex flex-col h-full">
                  <h2
                    className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight leading-tight mb-8"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {questions[currentStep].question}
                  </h2>

                  <div className="space-y-3 flex-grow">
                    {questions[currentStep].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(option.value)}
                        className={`group w-full flex items-center gap-4 p-4 md:p-5 rounded-xl border text-left transition-all duration-300 ${
                          answers[currentStep] === option.value
                            ? "border-[#0B73B9] bg-[#0B73B9]/[0.03] shadow-sm"
                            : "border-slate-200 hover:border-[#0B73B9]/40 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                            answers[currentStep] === option.value
                              ? "bg-[#0B73B9] border-[#0B73B9] text-white"
                              : "border-slate-300 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-700"
                          }`}
                        >
                          {optionLetters[i]}
                        </span>
                        <span
                          className={`text-sm md:text-base font-medium transition-colors flex-grow ${
                            answers[currentStep] === option.value
                              ? "text-[#0B73B9]"
                              : "text-slate-700 group-hover:text-slate-900"
                          }`}
                        >
                          {option.label}
                        </span>
                        {answers[currentStep] === option.value && (
                          <CheckCircle2
                            className="w-5 h-5 text-[#0B73B9] flex-shrink-0"
                            strokeWidth={2}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Back Button */}
                  {currentStep > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <button
                        onClick={handleBack}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0B73B9] transition-colors"
                      >
                        <ArrowLeft
                          size={16}
                          className="group-hover:-translate-x-1 transition-transform"
                        />
                        Previous Question
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* ─── RESULT & FORM VIEW (Two Column Layout) ─── */
                <div>
                  {isSubmitted ? (
                    /* ─── SUCCESS STATE ─── */
                    <div className="text-center py-12 flex flex-col items-center justify-center min-h-[300px]">
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-emerald-50 border border-emerald-100">
                        <CheckCircle2
                          className="w-8 h-8 text-emerald-500"
                          strokeWidth={2}
                        />
                      </div>
                      <h3
                        className="text-2xl font-bold text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        Details Submitted Successfully!
                      </h3>
                      <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
                        Thank you for your interest. Our academic support team
                        will contact you shortly to guide you through the
                        enrolment process for{" "}
                        <span className="font-semibold text-slate-700">
                          {levelData[result as 2 | 3 | 4 | 5 | 6].title}
                        </span>
                        .
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                          href={levelData[result as 2 | 3 | 4 | 5 | 6].href}
                          className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B73B9] text-white rounded-md text-sm font-bold uppercase tracking-wider transition-all hover:bg-[#085C92]"
                        >
                          View Course Details
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </Link>
                        <button
                          onClick={handleRetake}
                          className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-md text-sm font-bold uppercase tracking-wider transition-all hover:bg-slate-200"
                        >
                          Retake Assessment
                          <RotateCcw
                            size={16}
                            className="group-hover:rotate-[-180deg] transition-transform duration-500"
                          />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ─── RESULT & FORM GRID ─── */
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                      {/* Left Column: Result Display */}
                      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#0B73B9] opacity-10 blur-[40px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                          <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-[#f4d210]/10 border border-[#f4d210]/20">
                            <Award
                              className="w-6 h-6 text-[#f4d210]"
                              strokeWidth={2}
                            />
                          </div>

                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#f4d210] mb-2 block">
                            Your Recommended Path
                          </span>

                          <h2
                            className="text-3xl font-medium tracking-tight mb-3"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {levelData[result as 2 | 3 | 4 | 5 | 6].title}
                          </h2>

                          <p className="text-sm text-white/60 leading-relaxed mb-8">
                            {levelData[result as 2 | 3 | 4 | 5 | 6].desc}
                          </p>

                          <Link
                            href={levelData[result as 2 | 3 | 4 | 5 | 6].href}
                            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white border-b border-white/30 pb-1 hover:border-[#f4d210] hover:text-[#f4d210] transition-colors"
                          >
                            View Course Details
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Lead Form */}
                      <div>
                        <div className="mb-6">
                          <h3
                            className="text-xl font-bold text-slate-900 mb-1"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            Get the Full Syllabus
                          </h3>
                          <p className="text-sm text-slate-500">
                            Submit your details below and our team will reach
                            out to you.
                          </p>
                        </div>

                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-4"
                          noValidate
                        >
                          {/* Name Field */}
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              placeholder="Full Name *"
                              className={getInputClasses("name")}
                              disabled={isSubmitting}
                              {...register("name", {
                                required: "Please enter your full name.",
                              })}
                            />
                            {errors.name && (
                              <p className="text-[11px] text-red-500 pl-1 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                {errors.name.message as string}
                              </p>
                            )}
                          </div>

                          {/* Phone Field */}
                          <div className="space-y-1.5">
                            <input
                              type="tel"
                              placeholder="Phone Number *"
                              className={getInputClasses("phone")}
                              disabled={isSubmitting}
                              {...register("phone", {
                                required: "Please enter your phone number.",
                                pattern: {
                                  value: /^[+]?[\d\s\-().]{7,15}$/,
                                  message: "Please enter a valid phone number.",
                                },
                              })}
                            />
                            {errors.phone && (
                              <p className="text-[11px] text-red-500 pl-1 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                {errors.phone.message as string}
                              </p>
                            )}
                          </div>

                          {/* Email Field */}
                          <div className="space-y-1.5">
                            <input
                              type="email"
                              placeholder="Email Address *"
                              className={getInputClasses("email")}
                              disabled={isSubmitting}
                              {...register("email", {
                                required: "Please enter your email address.",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message:
                                    "Please enter a valid email address.",
                                },
                              })}
                            />
                            {errors.email && (
                              <p className="text-[11px] text-red-500 pl-1 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                {errors.email.message as string}
                              </p>
                            )}
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 bg-[#0B73B9] text-white font-bold rounded-lg hover:bg-[#085C92] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-[#0B73B9]/20 mt-2"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />{" "}
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4" /> Get My Course
                                Details
                              </>
                            )}
                          </button>

                          <div className="pt-4">
                            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
                              <Lock className="h-3.5 w-3.5" />
                              <span className="font-medium">
                                Your information is secure and private.
                              </span>
                            </div>
                          </div>

                          {/* Google Form Button */}
                          <div className="text-center pt-2">
                            <p className="text-xs text-slate-400 mb-2">
                              Prefer to use Google Forms?
                            </p>
                            <Link
                              href="https://forms.gle/kHkicZ6TaHQRoMck6"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0B73B9] bg-[#0B73B9]/5 border border-[#0B73B9]/10 rounded-md hover:bg-[#0B73B9]/10 transition-colors"
                            >
                              Fill out Google Form
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
