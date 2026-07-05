// src/app/types/apprenticeship.ts

export interface ApprenticeshipModule {
  title: string;
  description: string;
  hours: string;
  units: number;
}

export interface ApprenticeshipStat {
  label: string;
  value: string;
  icon: "pass-rate" | "duration" | "modules" | "learners";
}

export interface StudyMode {
  mode: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CareerOutcome {
  title: string;
  salaryRange: string;
  description: string;
}

export interface ApprenticeshipLevel {
  level: number;
  title: string;
  subtitle: string;
  href: string;
  color: string;
  colorLight: string;
  colorDark: string;
  image: string;
  badge: string;
  badgeColor: string;
  description: string;
  overview: string;
  passRate: string;
  duration: string;
  price: string;
  priceNote: string;
  entryRequirements: string[];
  modules: ApprenticeshipModule[];
  stats: ApprenticeshipStat[];
  studyModes: StudyMode[];
  careerOutcomes: CareerOutcome[];
  faqs: FAQ[];
  progression: {
    previous: { label: string; href: string } | null;
    next: { label: string; href: string } | null;
  };
  featured: boolean;
  funding: string;
  assessment: string;
  employerInfo: string;
}
