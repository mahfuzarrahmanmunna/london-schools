export interface ApprenticeshipLevel {
  level: number;
  subtitle: string;
  href: string;
  color: string;
}

export const apprenticeshipLevels: ApprenticeshipLevel[] = [
  {
    level: 3,
    subtitle: "Procurement & Supply Assistant",
    href: "/apprenticeships/level-3",
    color: "#E8850C",
  },
  {
    level: 4,
    subtitle: "Procurement & Supply Officer",
    href: "/apprenticeships/level-4",
    color: "#0891B2",
  },
  {
    level: 6,
    subtitle: "Senior Procurement & Supply Professional",
    href: "/apprenticeships/level-6",
    color: "#7C3AED",
  },
];
