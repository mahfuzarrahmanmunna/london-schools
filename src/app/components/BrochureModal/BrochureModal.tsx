"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  Star,
  ShieldCheck,
  Lock,
  Loader2,
  CheckCircle2,
  FileText,
  Download,
  AlertCircle,
  Tag,
} from "lucide-react";
import { useModal } from "@/app/context/ModalContext";

type ModalStep = "form" | "success";
type FormValues = {
  name: string;
  phone: string;
  email: string;
};

// Configuration for different modal types
const MODAL_CONFIG = {
  brochure: {
    badge: "LSHS Brochure",
    title: "BOOK FREE COUNSELING",
    subtitle: "Get Expert Course Guidance",
    description:
      "Submit your details to receive comprehensive course information, syllabus, fees, and personalized guidance for your CIPS qualification.",
    formTitle: "Download Brochure",
    formSubtitle: "Fill in your details to unlock the PDF.",
    ctaText: "Get My Course Details",
    lockedText: "Brochure Locked. Complete the form to unlock.",
    successTitle: "Your Brochure Is Ready!",
    successDesc:
      "Thank you for your interest in London School of Higher Studies. Your course brochure is now available to download.",
    downloadCardTitle: "CIPS Course Brochure",
    downloadCardSubtitle: "PDF • Course Information • Syllabus • Fees",
    fileName: "LSHS_CIPS_Brochure.pdf",
    filePath: "/brochures/cips-course-brochure.pdf",
    apiEndpoint: "/api/brochure",
  },
  price: {
    badge: "Course Prices",
    title: "GET COURSE PRICES",
    subtitle: "Detailed Fee Structure",
    description:
      "Submit your details to receive the complete fee structure, installment options, and current discounts for our CIPS qualifications.",
    formTitle: "Download Price List",
    formSubtitle: "Fill in your details to unlock the PDF.",
    ctaText: "Get Price Details",
    lockedText: "Price List Locked. Complete the form to unlock.",
    successTitle: "Price List Is Ready!",
    successDesc:
      "Thank you for your interest. The detailed course price list is now available to download.",
    downloadCardTitle: "CIPS Course Prices",
    downloadCardSubtitle: "PDF • Fee Structure • Discounts",
    fileName: "LSHS_CIPS_Prices.pdf",
    filePath: "/brochures/cips-course-prices.pdf",
    apiEndpoint: "/api/brochure",
  },
  discount: {
    badge: "Special Offer",
    title: "GET 25% OFF",
    subtitle: "Exclusive Limited Time Offer",
    description:
      "Submit your details to unlock your 25% discount coupon code for any CIPS course enrollment.",
    formTitle: "Unlock 25% Discount",
    formSubtitle: "Fill in your details to get your code.",
    ctaText: "Get My Discount Code",
    lockedText: "Discount Code Locked. Complete the form to unlock.",
    successTitle: "Your Discount Code Is Ready!",
    successDesc:
      "Thank you! Here is your 25% OFF discount code. Apply this during admission.",
    downloadCardTitle: "25% OFF Discount Code",
    downloadCardSubtitle: "Use this code during enrollment",
    fileName: "",
    filePath: "",
    apiEndpoint: "/api/brochure",
  },
};

export default function BrochureModal() {
  const { modalType, closeModal } = useModal();
  const [step, setStep] = useState<ModalStep>("form");

  const {
    register,
    handleSubmit: rhfSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: { name: "", phone: "", email: "" },
  });

  // Reset form completely when modal type changes or closes
  useEffect(() => {
    if (modalType) {
      reset();
      setStep("form");
      clearErrors("root");
    }
  }, [modalType, reset, clearErrors]);

  if (!modalType) return null;

  const config = MODAL_CONFIG[modalType];

  const handleClose = () => {
    closeModal();
  };

  const onSubmit = async (data: FormValues) => {
    clearErrors("root"); // Clear previous API errors

    try {
      const response = await fetch(config.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          type: modalType,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(
          resData.message || "Something went wrong. Please try again.",
        );
      }

      setStep("success");
    } catch (err: any) {
      // Set professional form-level API error
      setError("root.serverError", {
        type: "manual",
        message:
          err.message ||
          "Network error. Please check your connection and try again.",
      });
    }
  };

  // Dynamic input classes for professional error states
  const getInputClasses = (fieldName: keyof FormValues) =>
    `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm text-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
      errors[fieldName]
        ? "border-red-400 bg-red-50/50 focus:ring-red-100 focus:border-red-400"
        : "border-slate-200 focus:ring-[#0B73B9]/10 focus:border-[#0B73B9]"
    }`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 opacity-100">
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
        onClick={handleClose}
      />

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden transition-all duration-300 max-h-[92vh] md:max-h-[85vh] scale-100 translate-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── LEFT PANEL: Branding ─── */}
        <div className="relative bg-[#001B30] text-white p-8 md:p-10 md:w-[45%] flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0B73B9]/20 to-transparent pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f4d210]/5 blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
              <span className="text-xs font-bold tracking-widest uppercase text-[#f4d210]">
                {config.badge}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
              {config.title}
            </h2>
            <h3 className="text-lg font-medium mb-4 text-[#0B73B9]">
              {config.subtitle}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              {config.description}
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex text-[#f4d210]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-white/80">
                4.6 / 5 rating
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-lg border border-white/10">
              <ShieldCheck className="h-5 w-5 text-[#0B73B9]" />
              <span className="text-xs font-bold tracking-wider uppercase text-white/70">
                100% Secure & Private
              </span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL: Dynamic States ─── */}
        <div className="relative bg-white p-8 md:p-10 md:w-[55%] flex flex-col justify-center overflow-y-auto">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {step === "form" ? (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                {config.formTitle}
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                {config.formSubtitle}
              </p>

              {/* Professional API / Network Error Alert */}
              {errors.root?.serverError && (
                <div className="mb-5 flex items-start gap-2.5 text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-lg text-xs font-medium shadow-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{errors.root.serverError.message}</span>
                </div>
              )}

              <form
                onSubmit={rhfSubmit(onSubmit)}
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
                      {errors.name.message}
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
                      {errors.phone.message}
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
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address.",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 pl-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.email.message}
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
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    config.ctaText
                  )}
                </button>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
                    <Lock className="h-3.5 w-3.5" />
                    <span className="font-medium">{config.lockedText}</span>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* State 2: Success / Download */
            <div className="flex flex-col items-center text-center animate-[fade-in_0.4s_ease-out]">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center animate-ping">
                  <div className="h-16 w-16 rounded-full bg-emerald-200 opacity-75"></div>
                </div>
                <div className="relative h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <CheckCircle2
                    className="h-8 w-8 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                {config.successTitle}
              </h3>
              <p className="text-sm text-slate-500 mb-8 max-w-sm">
                {config.successDesc}
              </p>

              <div className="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6 group hover:border-[#0B73B9]/30 transition-colors">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-lg bg-[#0B73B9]/10 flex items-center justify-center flex-shrink-0">
                    {modalType === "discount" ? (
                      <Tag className="h-6 w-6 text-[#0B73B9]" />
                    ) : (
                      <FileText className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-900">
                      {config.downloadCardTitle}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {config.downloadCardSubtitle}
                    </p>
                  </div>
                </div>

                {/* Dynamic Action Button (Download PDF or Show Code) */}
                {modalType === "discount" ? (
                  <div className="w-full py-3 bg-[#f4d210]/20 text-[#92780a] font-bold rounded-lg border-2 border-dashed border-[#f4d210] tracking-widest text-center text-lg">
                    LSHS25OFF
                  </div>
                ) : (
                  <a
                    href={config.filePath}
                    download={config.fileName}
                    className="w-full py-3 bg-[#0B73B9] text-white font-bold rounded-lg hover:bg-[#085C92] transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-[#0B73B9]/20 hover:shadow-lg hover:shadow-[#0B73B9]/30 cursor-pointer"
                  >
                    <Download className="h-4 w-4" /> Download Now
                  </a>
                )}
              </div>

              <p className="text-xs text-slate-400">100% privacy. No Spam.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
