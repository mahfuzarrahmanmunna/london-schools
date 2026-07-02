// src/app/data/courseData.ts

import { CourseLevel } from "../types/cipsCourses";


export const courseLevels: CourseLevel[] = [
  {
    level: 2,
    title: "Level 2",
    subtitle: "Introductory Certificate in Procurement & Supply",
    description:
      "The perfect starting point for anyone new to procurement. This introductory qualification provides a solid foundation in procurement and supply fundamentals, ideal for school leavers, those new to the profession, or support staff looking to formalise their knowledge.",
    color: "#0D9488",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-600",
    gradient: "from-teal-500 to-teal-700",
    badge: "Foundation",
    badgeColor: "bg-teal-100 text-teal-700",
    entryRequirements: [
      "No formal qualifications required",
      "Suitable for those new to procurement",
      "Ideal for support staff and administrators",
    ],
    modules: [
      {
        title: "Introducing Procurement and Supply",
        description:
          "Understand the fundamental principles of procurement and supply chain management.",
        duration: "30 hours",
      },
      {
        title: "Procurement and Supply Operations",
        description:
          "Learn about the key processes and procedures in procurement operations.",
        duration: "30 hours",
      },
      {
        title: "Stakeholder Relationships",
        description:
          "Explore how to build effective relationships with internal and external stakeholders.",
        duration: "30 hours",
      },
      {
        title: "Sourcing Procurement Needs",
        description:
          "Discover how to identify and specify procurement requirements effectively.",
        duration: "30 hours",
      },
    ],
    studyModes: ["Online", "Classroom", "Blended"],
    duration: "6-9 months",
    price: "£750",
    featured: false,
    href: "/courses/level-2",
    image: "/courses/level2.webp",
    stats: [
      { label: "Modules", value: "4" },
      { label: "Credits", value: "24" },
      { label: "Pass Rate", value: "94%" },
      { label: "Avg. Completion", value: "7 months" },
    ],
  },
  {
    level: 3,
    title: "Level 3",
    subtitle: "Advanced Certificate in Procurement & Supply",
    description:
      "Build on your foundational knowledge with this intermediate qualification. Designed for those with some procurement experience, it develops your understanding of procurement processes, supplier management, and the broader supply chain context.",
    color: "#0891B2",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    textColor: "text-cyan-600",
    gradient: "from-cyan-500 to-cyan-700",
    badge: "Intermediate",
    badgeColor: "bg-cyan-100 text-cyan-700",
    entryRequirements: [
      "Level 2 qualification recommended",
      "Some procurement experience beneficial",
      "Good standard of English and Maths",
    ],
    modules: [
      {
        title: "Procurement Environments",
        description:
          "Understand different procurement environments and their characteristics.",
        duration: "40 hours",
      },
      {
        title: "Procurement and Supply Workflow",
        description:
          "Learn about end-to-end procurement processes and workflows.",
        duration: "40 hours",
      },
      {
        title: "Inventory and Logistics Operations",
        description:
          "Explore inventory management and logistics in the supply chain.",
        duration: "40 hours",
      },
      {
        title: "Procurement and Supply in Practice",
        description:
          "Apply procurement concepts to real-world scenarios and case studies.",
        duration: "40 hours",
      },
      {
        title: "Contract Administration",
        description:
          "Understand the fundamentals of contract management and administration.",
        duration: "40 hours",
      },
    ],
    studyModes: ["Online", "Classroom", "Blended"],
    duration: "9-12 months",
    price: "£1,200",
    featured: false,
    href: "/courses/level-3",
    image: "/courses/level3.webp",
    stats: [
      { label: "Modules", value: "5" },
      { label: "Credits", value: "30" },
      { label: "Pass Rate", value: "89%" },
      { label: "Avg. Completion", value: "10 months" },
    ],
  },
  {
    level: 4,
    title: "Level 4",
    subtitle: "Diploma in Procurement & Supply",
    description:
      "The industry-standard qualification for procurement professionals. This diploma equips you with the skills to manage procurement activities, negotiate effectively, and drive value within your organisation. Most employers recognise this as the benchmark for competent procurement practitioners.",
    color: "#0D9488",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-600",
    gradient: "from-emerald-500 to-teal-700",
    badge: "Diploma",
    badgeColor: "bg-emerald-100 text-emerald-700",
    entryRequirements: [
      "Level 3 qualification or equivalent experience",
      "Minimum 2 years in a procurement role",
      "CIPS membership required",
    ],
    modules: [
      {
        title: "Scope and Influence of Procurement and Supply",
        description:
          "Understand how procurement impacts organisational strategy and performance.",
        duration: "50 hours",
      },
      {
        title: "Defining Business Need",
        description:
          "Learn to analyse and specify business requirements for procurement.",
        duration: "50 hours",
      },
      {
        title: "Commercial Contracting",
        description:
          "Explore legal aspects, contract formation, and commercial terms.",
        duration: "50 hours",
      },
      {
        title: "Sourcing Approaches",
        description:
          "Evaluate different sourcing strategies and supplier selection methods.",
        duration: "50 hours",
      },
      {
        title: "Negotiating and Contracting",
        description:
          "Develop advanced negotiation skills and contract management techniques.",
        duration: "50 hours",
      },
      {
        title: "Finance, Assets and Risk",
        description:
          "Understand financial analysis, asset management, and risk in procurement.",
        duration: "50 hours",
      },
      {
        title: "Managing Interrelationships",
        description:
          "Build and manage effective supplier and stakeholder relationships.",
        duration: "50 hours",
      },
      {
        title: "Category Management",
        description:
          "Learn strategic category management approaches and methodologies.",
        duration: "50 hours",
      },
    ],
    studyModes: ["Online", "Classroom", "Blended", "In-house"],
    duration: "12-18 months",
    price: "£2,400",
    featured: true,
    href: "/courses/level-4",
    image: "/courses/level4.webp",
    stats: [
      { label: "Modules", value: "8" },
      { label: "Credits", value: "48" },
      { label: "Pass Rate", value: "82%" },
      { label: "Avg. Completion", value: "14 months" },
    ],
  },
  {
    level: 5,
    title: "Level 5",
    subtitle: "Advanced Diploma in Procurement & Supply",
    description:
      "For experienced professionals ready to take on strategic responsibilities. This advanced diploma develops your ability to lead procurement strategy, manage complex supply chains, and deliver organisational transformation through effective procurement practice.",
    color: "#7C3AED",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    textColor: "text-violet-600",
    gradient: "from-violet-500 to-violet-700",
    badge: "Advanced",
    badgeColor: "bg-violet-100 text-violet-700",
    entryRequirements: [
      "Level 4 Diploma in Procurement & Supply",
      "Significant procurement experience (3+ years)",
      "CIPS membership required",
    ],
    modules: [
      {
        title: "Organisational Capability and Capacity",
        description:
          "Assess and develop organisational procurement capability.",
        duration: "60 hours",
      },
      {
        title: "Risk Management in Procurement",
        description:
          "Identify, assess, and mitigate risks in procurement and supply chains.",
        duration: "60 hours",
      },
      {
        title: "Sustainability in Procurement",
        description:
          "Integrate sustainable and ethical practices into procurement strategy.",
        duration: "60 hours",
      },
      {
        title: "Improving Procurement Performance",
        description:
          "Measure, analyse, and improve procurement effectiveness and efficiency.",
        duration: "60 hours",
      },
      {
        title: "Category Management in Practice",
        description:
          "Apply advanced category management techniques to complex categories.",
        duration: "60 hours",
      },
      {
        title: "Supply Chain Network Design",
        description:
          "Design and optimise supply chain networks for competitive advantage.",
        duration: "60 hours",
      },
    ],
    studyModes: ["Online", "Classroom", "Blended", "In-house"],
    duration: "18-24 months",
    price: "£3,200",
    featured: false,
    href: "/courses/level-5",
    image: "/courses/level5.webp",
    stats: [
      { label: "Modules", value: "6" },
      { label: "Credits", value: "36" },
      { label: "Pass Rate", value: "76%" },
      { label: "Avg. Completion", value: "20 months" },
    ],
  },
  {
    level: 6,
    title: "Level 6",
    subtitle: "Professional Diploma in Procurement & Supply (MCIPS)",
    description:
      "The pinnacle CIPS qualification leading to full MCIPS membership. This prestigious professional diploma is designed for senior procurement leaders who shape organisational strategy, drive transformation, and represent the profession at the highest level. MCIPS is globally recognised as the gold standard in procurement.",
    color: "#D97706",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-600",
    gradient: "from-amber-500 to-amber-700",
    badge: "MCIPS Path",
    badgeColor: "bg-amber-100 text-amber-700",
    entryRequirements: [
      "Level 5 Advanced Diploma required",
      "Senior procurement role (5+ years experience)",
      "Strategic responsibility within organisation",
    ],
    modules: [
      {
        title: "Strategic Procurement Leadership",
        description:
          "Lead procurement strategy development and organisational alignment.",
        duration: "80 hours",
      },
      {
        title: "Corporate Social Responsibility",
        description:
          "Drive CSR agenda through procurement policy and practice.",
        duration: "80 hours",
      },
      {
        title: "Supply Chain Innovation",
        description:
          "Lead innovation and digital transformation in supply chains.",
        duration: "80 hours",
      },
      {
        title: "Strategic Relationships",
        description:
          "Develop and manage strategic supplier partnerships and alliances.",
        duration: "80 hours",
      },
      {
        title: "Future Procurement Strategy",
        description:
          "Shape the future of procurement and prepare for emerging challenges.",
        duration: "80 hours",
      },
    ],
    studyModes: ["Online", "Classroom", "Executive"],
    duration: "24-36 months",
    price: "£4,500",
    featured: true,
    href: "/courses/level-6",
    image: "/courses/level6.webp",
    stats: [
      { label: "Modules", value: "5" },
      { label: "Credits", value: "30" },
      { label: "Pass Rate", value: "71%" },
      { label: "Avg. Completion", value: "28 months" },
    ],
  },
];
