// src/app/data/menuData.ts

import { MenuItem } from "@/app/types/navbar";

export const menuData: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Courses", href: "/courses" },
  {
    label: "Procurement & Supply Chain",
    href: "/courses",
    columns: [
      {
        title: "CIPS Qualifications",
        items: [
          {
            label: "Level 2 Certificate Introduction to Procurement & Supply",
            href: "/courses/level-2-certificate",
          },
          {
            label:
              "Level 3 Advanced Certificate Procurement & Supply Operations",
            href: "/courses/level-3-certificate",
          },
          {
            label: "Level 4 Diploma Procurement & Supply",
            href: "/courses/level-4-certificate",
            badge: "Popular",
          },
          {
            label: "Level 5 Advanced Diploma Procurement & Supply",
            href: "/courses/level-5-certificate",
          },
          {
            label:
              "Level 6 Professional Diploma Strategic Procurement Leadership",
            href: "/courses/level-6-certificate",
            badge: "MCIPS",
          },
        ],
      },
    ],
    featured: {
      title: "Find Your Ideal CIPS Level",
      description:
        "Not sure which CIPS qualification is right for you? Take our quick assessment to discover the course level that best matches your experience and career goals.",
      href: "/cips-assessment",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Take the Assessment",
    },
  },
  {
    label: "Get Admission",
    href: "https://forms.gle/kHkicZ6TaHQRoMck6",
    external: true, // <-- Add this flag
  },
  { label: "Contact Us", href: "/contact" },
];
