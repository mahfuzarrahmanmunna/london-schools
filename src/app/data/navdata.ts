// src/app/data/navdata.ts

import { MenuItem } from "@/app/types/navdata";

export const navData: MenuItem[] = [
  {
    label: "Apprenticeships",
    href: "/apprenticeships",
    columns: [
      {
        title: "Programmes",
        items: [
          {
            label: "Level 2 Supply Chain Support",
            href: "/apprenticeships/level-2",
            description:
              "Entry-level for those new to procurement and supply chain operations.",
            badge: "New",
            accent: "#16A34A",
          },
          {
            label: "Level 3 Procurement Assistant",
            href: "/apprenticeships/level-3",
            description:
              "CIPS Certificate in Procurement & Supply Operations.",
            badge: "Popular",
            accent: "#E8850C",
          },
          {
            label: "Level 4 Procurement Officer",
            href: "/apprenticeships/level-4",
            description:
              "CIPS Diploma in Procurement & Supply. Most enrolled standard.",
            badge: "Flagship",
            accent: "#0891B2",
          },
          {
            label: "Level 5 Procurement Manager",
            href: "/apprenticeships/level-5",
            description:
              "CIPS Advanced Diploma. Category management and leadership.",
            badge: "MCIPS Path",
            accent: "#2563EB",
          },
          {
            label: "Level 6 Senior Professional",
            href: "/apprenticeships/level-6",
            description:
              "Achieve full MCIPS status. The gold standard for leaders.",
            badge: "Gold Standard",
            accent: "#7C3AED",
          },
        ],
      },
    ],
    featured: {
      title: "Level 4 Procurement & Supply Officer",
      description:
        "Our most popular apprenticeship fully funded, CIPS-accredited, and designed for working professionals. 89% pass rate.",
      image: "/courses/procurement.jfif",
      href: "/apprenticeships/level-4",
      ctaText: "Explore Level 4",
    },
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