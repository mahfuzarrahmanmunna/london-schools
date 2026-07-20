// src/app/data/menuData.ts

import { MenuItem } from "@/app/types/navbar";

export const menuData: MenuItem[] = [
  {
    label: "Supply Chain & Procurement",
    href: "/courses",
    columns: [
      {
        title: "Qualification Levels",
        items: [
          {
            label: "Level 2 Certificate",
            href: "/courses/level-2-certificate",
            description: "Intro to Procurement & Supply Operations.",
          },
          {
            label: "Level 3 Advanced Certificate",
            href: "/courses/level-3-advanced-certificate",
            description: "Procurement & Supply Operations.",
            badge: "Popular",
          },
          {
            label: "Level 4 Diploma",
            href: "/courses/level-4-diploma",
            description: "The most popular starting route to MCIPS.",
            badge: "Flagship",
          },
          {
            label: "Level 5 Advanced Diploma",
            href: "/courses/level-5-advanced-diploma",
            description: "Procurement management and leadership.",
            badge: "MCIPS Path",
          },
          {
            label: "Level 6 Professional Diploma",
            href: "/courses/level-6-professional-diploma",
            description: "Strategic procurement leadership.",
            badge: "Gold Standard",
          },
        ],
      },
    ],
    featured: {
      title: "Start Your CIPS Journey",
      description:
        "Not sure where to start? Take our free 60-second assessment to find the right level for you.",
      image: "/courses/senior.jpg",
      href: "/how-to-enrol",
      ctaText: "Free Assessment",
    },
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];