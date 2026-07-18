// src/app/data/menuData.ts

import { MenuItem } from "@/app/types/navbar";

export const menuData: MenuItem[] = [
  {
    label: "Apprenticeships",
    href: "/apprenticeships",
    columns: [
      {
        title: "Foundation",
        items: [
          {
            label: "Level 2 — Supply Chain Support",
            href: "/apprenticeships/2",
            description:
              "Entry-level qualification for those new to procurement and supply chain operations.",
            badge: "New",
          },
          {
            label: "Level 3 — Procurement Assistant",
            href: "/apprenticeships/3",
            description:
              "CIPS Certificate in Procurement & Supply Operations. Equivalent to two A-Levels.",
            badge: "Popular",
          },
        ],
      },
      {
        title: "Professional",
        items: [
          {
            label: "Level 4 — Procurement Officer",
            href: "/apprenticeships/4",
            description:
              "CIPS Diploma in Procurement & Supply. The most enrolled apprenticeship standard.",
            badge: "Flagship",
          },
          {
            label: "Level 5 — Procurement Manager",
            href: "/apprenticeships/5",
            description:
              "CIPS Advanced Diploma. Category management, risk, and procurement leadership.",
            badge: "MCIPS Path",
          },
        ],
      },
      {
        title: "Strategic",
        items: [
          {
            label: "Level 6 — Senior Procurement Professional",
            href: "/apprenticeships/6",
            description:
              "Achieve full MCIPS status. The gold standard for procurement leaders.",
            badge: "Gold Standard",
          },
          {
            label: "Compare All Levels",
            href: "/apprenticeships",
            description:
              "Side-by-side comparison of all five apprenticeship levels to find your starting point.",
          },
          {
            label: "Employer Funding Guide",
            href: "/apprenticeships/funding",
            description:
              "How the Apprenticeship Levy works and what your organisation can claim.",
          },
        ],
      },
    ],
    featured: {
      title: "Level 4 Procurement & Supply Officer",
      description:
        "Our most popular apprenticeship — fully funded, CIPS-accredited, and designed for working professionals. 89% pass rate.",
      image: "/courses/procurement.jfif",
      href: "/apprenticeships/4",
      ctaText: "Explore Level 4",
    },
  },
  // {
  //   label: "Qualifications",
  //   href: "/qualifications",
  //   columns: [
  //     {
  //       title: "CIPS Qualifications",
  //       items: [
  //         {
  //           label: "Level 2 Certificate",
  //           href: "/qualifications/level-2",
  //           description: "Introductory supply chain principles for beginners.",
  //         },
  //         {
  //           label: "Level 3 Certificate",
  //           href: "/qualifications/level-3",
  //           description:
  //             "Foundation procurement knowledge. No experience needed.",
  //           badge: "Popular",
  //         },
  //         {
  //           label: "Level 4 Diploma",
  //           href: "/qualifications/level-4",
  //           description: "Professional procurement practice and contracting.",
  //           badge: "Trending",
  //         },
  //         {
  //           label: "Level 5 Advanced Diploma",
  //           href: "/qualifications/level-5",
  //           description: "Category management and procurement leadership.",
  //           badge: "MCIPS Path",
  //         },
  //         {
  //           label: "Level 6 Professional Diploma",
  //           href: "/qualifications/level-6",
  //           description: "Strategic procurement. Pathway to full MCIPS.",
  //           badge: "Gold Standard",
  //         },
  //       ],
  //     },
  //     {
  //       title: "How It Works",
  //       items: [
  //         {
  //           label: "Apprenticeship vs Self-Funded",
  //           href: "/qualifications/apprenticeship-vs-self-funded",
  //           description:
  //             "Understand the key differences and which route suits you best.",
  //         },
  //         {
  //           label: "Study Modes Explained",
  //           href: "/qualifications/study-modes",
  //           description:
  //             "Online, remote, and on-site learning options compared.",
  //         },
  //         {
  //           label: "Progression Routes",
  //           href: "/qualifications/progression",
  //           description:
  //             "Map your journey from Level 2 through to MCIPS and beyond.",
  //         },
  //         {
  //           label: "Recognition & Equivalency",
  //           href: "/qualifications/equivalency",
  //           description:
  //             "How CIPS qualifications compare to GCSEs, A-Levels, and degrees.",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Support",
  //       items: [
  //         {
  //           label: "Entry Requirements",
  //           href: "/qualifications/entry-requirements",
  //           description: "Check your eligibility for each qualification level.",
  //         },
  //         {
  //           label: "Fees & Payment Options",
  //           href: "/qualifications/fees",
  //           description: "Transparent pricing with flexible payment plans.",
  //         },
  //         {
  //           label: "Exemptions & Credits",
  //           href: "/qualifications/exemptions",
  //           description:
  //             "Skip modules if you have prior qualifications or experience.",
  //         },
  //         {
  //           label: "Free Assessment",
  //           href: "/qualifications/assessment",
  //           description: "Get a personalised recommendation on where to start.",
  //           badge: "Free",
  //         },
  //       ],
  //     },
  //   ],
  //   featured: {
  //     title: "Free Qualification Assessment",
  //     description:
  //       "Not sure which level is right for you? Complete our 5-minute assessment and get a personalised recommendation from a CIPS tutor.",
  //     image: "/courses/procurement1.jfif",
  //     href: "/qualifications/assessment",
  //     ctaText: "Start Free Assessment",
  //   },
  // },
  {
    label: "Training",
    href: "/training",
    columns: [
      {
        title: "Short Courses",
        items: [
          {
            label: "Negotiation Masterclass",
            href: "/training/negotiation-masterclass",
            description: "Two-day intensive on commercial negotiation tactics.",
            badge: "Trending",
          },
          {
            label: "Contract Management",
            href: "/training/contract-management",
            description:
              "Practical contract drafting, review, and dispute resolution.",
          },
          {
            label: "Category Management Workshop",
            href: "/training/category-management",
            description:
              "Build and execute category strategies that deliver value.",
          },
          {
            label: "Sustainable Procurement",
            href: "/training/sustainable-procurement",
            description:
              "Embed ESG and social value into your procurement processes.",
            badge: "New",
          },
        ],
      },
      {
        title: "For Teams",
        items: [
          {
            label: "Corporate Training",
            href: "/training/corporate",
            description:
              "Bespoke programmes tailored to your organisation's procurement challenges.",
          },
          {
            label: "Team Upskilling",
            href: "/training/team-upskilling",
            description:
              "Bulk enrolment discounts and cohort-based learning for teams of 5+.",
            badge: "Hiring",
          },
          {
            label: "Executive Coaching",
            href: "/training/executive-coaching",
            description:
              "One-to-one coaching for Heads of Procurement and CPOs.",
          },
          {
            label: "Request a Proposal",
            href: "/training/request-proposal",
            description:
              "Tell us your training needs and we'll design a custom programme.",
          },
        ],
      },
      {
        title: "Formats",
        items: [
          {
            label: "Live Online Workshops",
            href: "/training/live-online",
            description:
              "Interactive virtual sessions with expert tutors. No travel required.",
          },
          {
            label: "In-Person Training",
            href: "/training/in-person",
            description:
              "Face-to-face workshops at our London training centre.",
          },
          {
            label: "On-Demand Learning",
            href: "/training/on-demand",
            description:
              "Pre-recorded courses you can complete at your own pace.",
            badge: "Free",
          },
          {
            label: "View All Courses",
            href: "/training",
            description:
              "Browse our full catalogue of 40+ procurement training courses.",
          },
        ],
      },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    columns: [
      {
        title: "Membership Tiers",
        items: [
          {
            label: "Student Membership",
            href: "/membership/student",
            description:
              "Free membership for anyone enrolled on a CIPS qualification.",
            badge: "Free",
          },
          {
            label: "Associate (ACIPS)",
            href: "/membership/associate",
            description: "For professionals with a CIPS Level 4 qualification.",
          },
          {
            label: "Member (MCIPS)",
            href: "/membership/mcips",
            description:
              "The gold standard. Full membership recognising strategic expertise.",
            badge: "Gold Standard",
          },
          {
            label: "Fellow (FCIPS)",
            href: "/membership/fellow",
            description:
              "The highest grade of membership for distinguished procurement leaders.",
          },
        ],
      },
      {
        title: "Benefits",
        items: [
          {
            label: "Membership Benefits Overview",
            href: "/membership/benefits",
            description:
              "Everything included: resources, networking, CPD, and career support.",
          },
          {
            label: "Knowledge Hub",
            href: "/membership/knowledge-hub",
            description:
              "Exclusive access to research, templates, and best practice guides.",
            badge: "Popular",
          },
          {
            label: "Networking Events",
            href: "/membership/events",
            description:
              "Regional and national events to connect with fellow professionals.",
          },
          {
            label: "Career Resources",
            href: "/membership/careers",
            description:
              "CV reviews, interview coaching, and the CIPS jobs board.",
            badge: "Hiring",
          },
        ],
      },
      {
        title: "Get Started",
        items: [
          {
            label: "Join CIPS",
            href: "/join",
            description:
              "Start your membership application online in under 10 minutes.",
          },
          {
            label: "Upgrade Your Grade",
            href: "/membership/upgrade",
            description:
              "Already a member? Check your eligibility to upgrade to MCIPS or FCIPS.",
          },
          {
            label: "CPD Log",
            href: "/membership/cpd",
            description:
              "Record and track your continuing professional development activities.",
          },
          {
            label: "Membership FAQ",
            href: "/membership/faq",
            description: "Answers to common questions about CIPS membership.",
          },
        ],
      },
    ],
    featured: {
      title: "Achieve MCIPS Status",
      description:
        "MCIPS is the globally recognised hallmark of procurement excellence. It demonstrates strategic capability, ethical practice, and professional leadership.",
      image: "/courses/senior.jpg",
      href: "/membership/mcips",
      ctaText: "Pathway to MCIPS",
    },
  },
  {
    label: "Resources",
    href: "/resources",
    columns: [
      {
        title: "Learn",
        items: [
          {
            label: "Procurement Guides",
            href: "/resources/guides",
            description:
              "In-depth guides on key procurement topics and best practices.",
            badge: "Free",
          },
          {
            label: "Case Studies",
            href: "/resources/case-studies",
            description:
              "Real-world examples of procurement transformation and success.",
          },
          {
            label: "Blog & Insights",
            href: "/resources/blog",
            description:
              "Weekly articles on procurement trends, policy changes, and career advice.",
            badge: "Trending",
          },
          {
            label: "Podcast",
            href: "/resources/podcast",
            description:
              "Interviews with procurement leaders and industry experts.",
            badge: "New",
          },
        ],
      },
      {
        title: "Tools",
        items: [
          {
            label: "Salary Calculator",
            href: "/resources/salary-calculator",
            description:
              "See what you could earn at each CIPS level, broken down by region and sector.",
            badge: "Popular",
          },
          {
            label: "Apprenticeship Funding Calculator",
            href: "/resources/funding-calculator",
            description:
              "Calculate your Levy funds and government co-investment amounts.",
          },
          {
            label: "Procurement Maturity Model",
            href: "/resources/maturity-model",
            description:
              "Assess your procurement function's capability against industry benchmarks.",
          },
          {
            label: "Template Library",
            href: "/resources/templates",
            description:
              "Downloadable RFP templates, SLA frameworks, and contract checklists.",
            badge: "Free",
          },
        ],
      },
      {
        title: "Reference",
        items: [
          {
            label: "CIPS Code of Conduct",
            href: "/resources/code-of-conduct",
            description:
              "The professional standards every CIPS member must uphold.",
          },
          {
            label: "Glossary of Terms",
            href: "/resources/glossary",
            description:
              "Clear definitions for 200+ procurement and supply chain terms.",
          },
          {
            label: "Procurement Legislation",
            href: "/resources/legislation",
            description:
              "Key UK and EU procurement regulations explained in plain English.",
          },
          {
            label: "View All Resources",
            href: "/resources",
            description:
              "Browse our complete library of 150+ free procurement resources.",
          },
        ],
      },
    ],
  },
  // {
  //   label: "For Employers",
  //   href: "/employers",
  //   columns: [
  //     {
  //       title: "Apprenticeships",
  //       items: [
  //         {
  //           label: "Hire an Apprentice",
  //           href: "/employers/hire",
  //           description:
  //             "How to recruit a procurement apprentice and the support we provide.",
  //           badge: "Hiring",
  //         },
  //         {
  //           label: "Level 2 — Supply Chain Support",
  //           href: "/apprenticeships/2",
  //           description:
  //             "Develop entry-level talent. Ideal for school leavers and admin staff.",
  //           badge: "New",
  //         },
  //         {
  //           label: "Level 3 — Procurement Assistant",
  //           href: "/apprenticeships/3",
  //           description:
  //             "Upskill junior staff to competent procurement assistants.",
  //         },
  //         {
  //           label: "Level 4 — Procurement Officer",
  //           href: "/apprenticeships/4",
  //           description:
  //             "Develop independent practitioners who manage sourcing and contracts.",
  //           badge: "Flagship",
  //         },
  //         {
  //           label: "Level 5 — Procurement Manager",
  //           href: "/apprenticeships/5",
  //           description:
  //             "Build your future procurement leaders with category management expertise.",
  //           badge: "MCIPS Path",
  //         },
  //         {
  //           label: "Level 6 — Senior Professional",
  //           href: "/apprenticeships/6",
  //           description:
  //             "Transform your senior team and achieve MCIPS across your function.",
  //           badge: "Gold Standard",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Funding & Process",
  //       items: [
  //         {
  //           label: "Apprenticeship Levy Explained",
  //           href: "/employers/levy",
  //           description:
  //             "How the Levy works, what you can spend it on, and what happens if you don't use it.",
  //           badge: "Popular",
  //         },
  //         {
  //           label: "Non-Levy Employer Funding",
  //           href: "/employers/non-levy-funding",
  //           description:
  //             "95% government funding for smaller employers. Co-investment as low as £150.",
  //         },
  //         {
  //           label: "How the Process Works",
  //           href: "/employers/process",
  //           description:
  //             "Step-by-step guide from initial enquiry to apprentice completion.",
  //         },
  //         {
  //           label: "ROI Calculator",
  //           href: "/employers/roi",
  //           description:
  //             "Estimate the return on investment from your apprenticeship programme.",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Corporate Solutions",
  //       items: [
  //         {
  //           label: "Corporate Training Programmes",
  //           href: "/employers/corporate-training",
  //           description: "Bespoke training for procurement teams of all sizes.",
  //         },
  //         {
  //           label: "Talent Pipeline Service",
  //           href: "/employers/talent-pipeline",
  //           description:
  //             "Let us source, vet, and pre-train apprentices for your organisation.",
  //         },
  //         {
  //           label: "Procurement Function Review",
  //           href: "/employers/function-review",
  //           description:
  //             "Independent assessment of your procurement capability and recommendations.",
  //         },
  //         {
  //           label: "Book a Consultation",
  //           href: "/employers/consultation",
  //           description:
  //             "Free 30-minute call with our employer engagement team.",
  //           badge: "Free",
  //         },
  //       ],
  //     },
  //   ],
  //   featured: {
  //     title: "Build Your Procurement Team",
  //     description:
  //       "Use your Apprenticeship Levy to develop a complete procurement pipeline — from entry-level assistants to strategic leaders with MCIPS. We handle the training, you reap the results.",
  //     image: "/courses/procurement-mgmt.jfif",
  //     href: "/employers/hire",
  //     ctaText: "Start Hiring",
  //   },
  // },
];
