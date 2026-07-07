// src/app/data/iconMaps.ts

import {
  Monitor,
  Video,
  Building2,
  TrendingUp,
  Clock,
  BookOpen,
  Users,
  Star,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

// ─── Study Mode Icons ──────────────────────────────
export const studyModeIcons: Record<string, LucideIcon> = {
  Monitor,
  Video,
  Building2,
};

// ─── Stat Icons ───────────────────────────────────
export const statIcons: Record<string, LucideIcon> = {
  "pass-rate": TrendingUp,
  duration: Clock,
  modules: BookOpen,
  learners: Users,
  rating: Star,
  jobs: GraduationCap,
};
