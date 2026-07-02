// src/app/types/course.ts

export interface CourseModule {
  title: string;
  description: string;
  duration: string;
}

export interface CourseLevel {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  gradient: string;
  badge: string;
  badgeColor: string;
  entryRequirements: string[];
  modules: CourseModule[];
  studyModes: string[];
  duration: string;
  price: string;
  featured: boolean;
  href: string;
  image: string;
  stats: {
    label: string;
    value: string;
  }[];
}
