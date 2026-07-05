// src/app/data/apprenticeshipData.ts

import { ApprenticeshipLevel } from "../types/apprenticeship";

export const apprenticeshipLevels: ApprenticeshipLevel[] = [
  {
    level: 3,
    title: "Level 3 Apprenticeship",
    subtitle: "Procurement & Supply Assistant",
    href: "/apprenticeships/level-3",
    color: "#E8850C",
    colorLight: "#FFF7ED",
    colorDark: "#C2660A",
    image: "/apprenticeships/level3.webp",
    badge: "Foundation",
    badgeColor: "bg-orange-100 text-orange-700",
    description:
      "The Level 3 Procurement & Supply Assistant apprenticeship is designed for individuals starting their career in procurement. You'll gain practical skills in sourcing, ordering, and managing supplier relationships while working in a real business environment and earning a wage.",
    overview:
      "This apprenticeship is the first level of CIPS professional qualifications, providing a solid foundation in procurement and supply operations. As an apprentice, you'll combine on-the-job training with structured learning, developing the core competencies needed to support procurement activities within any organisation. The programme typically takes 12-18 months to complete and is ideal for school leavers, career changers, or those already working in a junior procurement role.",
    passRate: "94%",
    duration: "12–18 months",
    price: "Funded",
    priceNote:
      "Fully funded through the Apprenticeship Levy for eligible employers",
    entryRequirements: [
      "No prior qualifications required",
      "Must be employed in a procurement-related role",
      "Minimum age of 16",
      "GCSEs at grade 4/C or above in English and Maths (or equivalent)",
      "Right to work in the UK",
    ],
    modules: [
      {
        title: "Procurement and Supply Fundamentals",
        description:
          "Understand the role of procurement and supply within different organisational contexts, including public, private, and third sector.",
        hours: "30",
        units: 3,
      },
      {
        title: "Sourcing and Supplier Management",
        description:
          "Learn to identify potential suppliers, conduct basic evaluations, and manage simple supplier relationships.",
        hours: "35",
        units: 4,
      },
      {
        title: "Procurement Operations and Administration",
        description:
          "Develop skills in purchase order processing, invoice management, and maintaining procurement records.",
        hours: "30",
        units: 3,
      },
      {
        title: "Stakeholder Communication",
        description:
          "Build effective working relationships with internal stakeholders and suppliers through professional communication.",
        hours: "20",
        units: 2,
      },
      {
        title: "Stock and Inventory Management",
        description:
          "Understand basic inventory control methods, stock recording, and the relationship between procurement and warehousing.",
        hours: "25",
        units: 2,
      },
      {
        title: "Sustainability in Procurement",
        description:
          "Recognise the importance of sustainable and ethical procurement practices at an introductory level.",
        hours: "15",
        units: 2,
      },
    ],
    stats: [
      { label: "Pass Rate", value: "94%", icon: "pass-rate" },
      { label: "Duration", value: "12–18 mo", icon: "duration" },
      { label: "Modules", value: "6", icon: "modules" },
      { label: "Learning Hours", value: "155+", icon: "learners" },
    ],
    studyModes: [
      {
        mode: "Online",
        description:
          "Access all learning materials, webinars, and tutor support through our digital learning platform. Study at your own pace around work commitments.",
        icon: "Monitor",
      },
      {
        mode: "Remote",
        description:
          "Live virtual classes with your tutor and cohort via video conferencing. Combines the structure of classroom learning with the flexibility of studying from anywhere.",
        icon: "Video",
      },
      {
        mode: "On-site",
        description:
          "Face-to-face workshops and training sessions delivered at your employer's premises or at our London training centre.",
        icon: "Building2",
      },
    ],
    careerOutcomes: [
      {
        title: "Procurement Assistant",
        salaryRange: "£18,000–£24,000",
        description:
          "Support procurement operations, process purchase orders, and manage supplier communications.",
      },
      {
        title: "Buying Assistant",
        salaryRange: "£20,000–£26,000",
        description:
          "Assist buyers with sourcing activities, market research, and supplier evaluations.",
      },
      {
        title: "Stores & Inventory Assistant",
        salaryRange: "£17,000–£22,000",
        description:
          "Manage stock levels, coordinate deliveries, and maintain inventory records.",
      },
    ],
    faqs: [
      {
        question: "Do I need to find my own employer?",
        answer:
          "No. If you don't have an employer, we can help connect you with organisations looking to hire procurement apprentices. Many of our partner employers are actively recruiting.",
      },
      {
        question: "How much time off-the-job training is required?",
        answer:
          "You'll need a minimum of 20% of your contracted working hours (typically one day per week) dedicated to off-the-job training, which includes online learning, workshops, and assignments.",
      },
      {
        question: "Is there a minimum wage for apprentices?",
        answer:
          "Yes. Apprentices aged 16-18 must be paid at least £5.28/hour. Those aged 19+ who have completed the first year of their apprenticeship must be paid at least the National Minimum Wage. However, most employers pay significantly above these minimums.",
      },
      {
        question: "What qualification will I receive?",
        answer:
          "You'll achieve the CIPS Level 3 Certificate in Procurement and Supply Operations, which is equivalent to two A-Levels and recognised across the procurement profession.",
      },
    ],
    progression: {
      previous: null,
      next: {
        label: "Level 4 — Procurement & Supply Officer",
        href: "/apprenticeships/level-4",
      },
    },
    featured: false,
    funding:
      "Fully funded through the Apprenticeship Levy for employers with a payroll over £3 million. For smaller employers, the government funds 95% of the cost, with a £250 co-investment. Apprentices aged 16-18 are fully funded regardless of employer size.",
    assessment:
      "Assessment is through a combination of on-programme assessments (work-based evidence, reflective journals) and an End-Point Assessment (EPA) consisting of a project report and professional discussion with an independent assessor.",
    employerInfo:
      "Employers benefit from government funding to upskill their workforce, improved procurement capability, and a motivated team member who can immediately apply their learning to real business challenges. The Level 3 standard is ideal for developing junior staff into competent procurement assistants.",
  },
  {
    level: 4,
    title: "Level 4 Apprenticeship",
    subtitle: "Procurement & Supply Officer",
    href: "/apprenticeships/level-4",
    color: "#0891B2",
    colorLight: "#ECFEFF",
    colorDark: "#0E7490",
    image: "/apprenticeships/level4.webp",
    badge: "Professional",
    badgeColor: "bg-cyan-100 text-cyan-700",
    description:
      "The Level 4 Procurement & Supply Officer apprenticeship builds on foundational knowledge to develop competent practitioners who can manage procurement activities, negotiate with suppliers, and contribute to organisational strategy.",
    overview:
      "This apprenticeship is for those already working in procurement who want to develop their professional skills and gain a recognised qualification. You'll deepen your understanding of commercial contracting, sourcing strategies, and stakeholder management while continuing to earn a wage. The programme typically takes 18-24 months and prepares you for more strategic procurement responsibilities.",
    passRate: "89%",
    duration: "18–24 months",
    price: "Funded",
    priceNote:
      "Funded via Apprenticeship Levy. Non-levy employers contribute 5% (£750 max) for learners aged 19+",
    entryRequirements: [
      "Level 3 Procurement qualification or equivalent experience",
      "Currently employed in a procurement role with scope for Level 4 duties",
      "GCSEs at grade 4/C or above in English and Maths (or equivalent)",
      "Minimum age of 16",
      "Right to work in the UK",
    ],
    modules: [
      {
        title: "Defining Business Need",
        description:
          "Analyse and specify business requirements for procurement, translating organisational objectives into actionable procurement plans.",
        hours: "40",
        units: 4,
      },
      {
        title: "Commercial Contracting",
        description:
          "Understand legal aspects of procurement, contract formation, terms and conditions, and managing contract performance.",
        hours: "45",
        units: 4,
      },
      {
        title: "Sourcing Approaches",
        description:
          "Evaluate and apply different sourcing strategies including tendering, e-auctions, and framework agreements.",
        hours: "40",
        units: 4,
      },
      {
        title: "Negotiating and Contracting",
        description:
          "Develop and apply negotiation skills in procurement contexts, understanding the psychology and tactics of effective negotiation.",
        hours: "35",
        units: 3,
      },
      {
        title: "Finance and Risk in Procurement",
        description:
          "Understand financial analysis for procurement decisions, total cost of ownership, and risk assessment and mitigation strategies.",
        hours: "35",
        units: 3,
      },
      {
        title: "Managing Interrelationships",
        description:
          "Build and manage effective supplier and stakeholder relationships, understanding power dynamics and collaboration.",
        hours: "30",
        units: 3,
      },
    ],
    stats: [
      { label: "Pass Rate", value: "89%", icon: "pass-rate" },
      { label: "Duration", value: "18–24 mo", icon: "duration" },
      { label: "Modules", value: "6", icon: "modules" },
      { label: "Learning Hours", value: "225+", icon: "learners" },
    ],
    studyModes: [
      {
        mode: "Online",
        description:
          "Self-paced digital learning with interactive modules, video content, and dedicated tutor support via our learning management system.",
        icon: "Monitor",
      },
      {
        mode: "Remote",
        description:
          "Scheduled live online sessions with your cohort. Participate in discussions, case studies, and group exercises from anywhere.",
        icon: "Video",
      },
      {
        mode: "On-site",
        description:
          "In-person workshops at our London centre or your workplace. Hands-on learning with direct tutor interaction and peer networking.",
        icon: "Building2",
      },
    ],
    careerOutcomes: [
      {
        title: "Procurement Officer",
        salaryRange: "£26,000–£34,000",
        description:
          "Manage end-to-end procurement processes, lead sourcing activities, and contribute to category strategies.",
      },
      {
        title: "Buyer",
        salaryRange: "£28,000–£36,000",
        description:
          "Lead supplier selection, negotiate contracts, and manage supplier performance for assigned categories.",
      },
      {
        title: "Contracts Officer",
        salaryRange: "£27,000–£33,000",
        description:
          "Draft and manage procurement contracts, ensure compliance, and coordinate with legal teams on contractual matters.",
      },
    ],
    faqs: [
      {
        question: "Can I start at Level 4 without completing Level 3?",
        answer:
          "Yes, if you have equivalent procurement experience (typically 2+ years) and your employer confirms the role provides sufficient scope for Level 4 duties. An initial assessment will determine your starting point.",
      },
      {
        question: "What is the End-Point Assessment?",
        answer:
          "The EPA for Level 4 consists of a project report based on a real procurement challenge in your workplace, followed by a professional discussion with an independent EPA assessor. You must pass both to achieve the apprenticeship.",
      },
      {
        question: "Does this count towards CIPS membership?",
        answer:
          "Successfully completing this apprenticeship provides a significant step towards CIPS membership. Combined with the appropriate level of experience, it can contribute towards achieving MCIPS status.",
      },
      {
        question: "What support will my employer receive?",
        answer:
          "Employers receive dedicated account management, guidance on apprenticeship requirements, support with EPA preparation, and access to our employer resource portal with templates and best practice guides.",
      },
    ],
    progression: {
      previous: {
        label: "Level 3 — Procurement & Supply Assistant",
        href: "/apprenticeships/level-3",
      },
      next: {
        label: "Level 6 — Senior Procurement Professional",
        href: "/apprenticeships/level-6",
      },
    },
    featured: true,
    funding:
      "Funded through the Apprenticeship Levy for levy-paying employers. Non-levy employers contribute a maximum of £750 (5% co-investment) for apprentices aged 19+. Apprentices aged 16-18 are fully funded regardless of employer size.",
    assessment:
      "The EPA consists of a 4,000-word project report addressing a real procurement challenge, followed by a 60-minute professional discussion with an independent assessor. You must also complete all on-programme CIPS assessments to be eligible for EPA gateway.",
    employerInfo:
      "Level 4 apprentices bring immediate value to procurement teams — they can manage sourcing events independently, draft commercial contracts, and contribute to category planning. This apprenticeship is ideal for upskilling existing staff to officer level.",
  },
  {
    level: 6,
    title: "Level 6 Apprenticeship",
    subtitle: "Senior Procurement & Supply Professional",
    href: "/apprenticeships/level-6",
    color: "#7C3AED",
    colorLight: "#F5F3FF",
    colorDark: "#6D28D9",
    image: "/apprenticeships/level6.webp",
    badge: "Strategic",
    badgeColor: "bg-violet-100 text-violet-700",
    description:
      "The Level 6 Senior Procurement & Supply Professional apprenticeship is the highest-level CIPS apprenticeship, designed for experienced practitioners ready to lead procurement strategy, drive organisational change, and achieve full MCIPS status.",
    overview:
      "This prestigious apprenticeship is for senior procurement professionals who want to formalise their strategic expertise and gain MCIPS designation. You'll tackle complex procurement challenges, lead transformation programmes, and develop the executive-level skills needed to represent the profession at the highest level. The programme typically takes 24-36 months and represents the pinnacle of procurement apprenticeship standards.",
    passRate: "82%",
    duration: "24–36 months",
    price: "Funded",
    priceNote:
      "Funded via Apprenticeship Levy. Non-levy employers contribute 5% (£750 max) for learners aged 19+",
    entryRequirements: [
      "Level 5 Advanced Diploma in Procurement & Supply (or equivalent)",
      "Senior procurement role with strategic responsibilities",
      "Minimum 5 years of procurement experience",
      "Employer confirmation of strategic scope in the role",
      "Right to work in the UK",
    ],
    modules: [
      {
        title: "Strategic Procurement Leadership",
        description:
          "Lead the development and implementation of procurement strategy that aligns with organisational objectives and delivers measurable value.",
        hours: "60",
        units: 5,
      },
      {
        title: "Corporate Social Responsibility in Procurement",
        description:
          "Drive the CSR and sustainability agenda through procurement policy, ethical sourcing, and supply chain transparency.",
        hours: "50",
        units: 4,
      },
      {
        title: "Supply Chain Innovation and Digital Transformation",
        description:
          "Lead digital transformation initiatives in procurement, evaluating emerging technologies and their strategic application.",
        hours: "50",
        units: 4,
      },
      {
        title: "Strategic Supplier Relationship Management",
        description:
          "Design and manage strategic supplier partnerships and alliances that deliver long-term competitive advantage.",
        hours: "45",
        units: 4,
      },
      {
        title: "Future Procurement Strategy",
        description:
          "Analyse emerging trends, geopolitical risks, and market disruptions to shape future-proofed procurement strategies.",
        hours: "45",
        units: 4,
      },
    ],
    stats: [
      { label: "Pass Rate", value: "82%", icon: "pass-rate" },
      { label: "Duration", value: "24–36 mo", icon: "duration" },
      { label: "Modules", value: "5", icon: "modules" },
      { label: "Learning Hours", value: "250+", icon: "learners" },
    ],
    studyModes: [
      {
        mode: "Online",
        description:
          "Executive-level digital learning platform with curated case studies, strategic simulations, and one-to-one tutor mentoring from senior procurement leaders.",
        icon: "Monitor",
      },
      {
        mode: "Remote",
        description:
          "Virtual masterclass sessions with your cohort of senior professionals. Peer learning and strategic debate with experienced practitioners.",
        icon: "Video",
      },
      {
        mode: "On-site",
        description:
          "Executive workshops and residential sessions at our London centre. High-level networking with fellow senior professionals and industry leaders.",
        icon: "Building2",
      },
    ],
    careerOutcomes: [
      {
        title: "Head of Procurement",
        salaryRange: "£65,000–£95,000",
        description:
          "Lead the entire procurement function, set strategy, manage teams, and represent procurement at board level.",
      },
      {
        title: "Director of Supply Chain",
        salaryRange: "£70,000–£110,000",
        description:
          "Oversee end-to-end supply chain strategy, lead transformation programmes, and drive operational excellence at scale.",
      },
      {
        title: "Chief Procurement Officer",
        salaryRange: "£90,000–£150,000+",
        description:
          "C-suite leadership of procurement and supply, setting organisational strategy and driving value creation at the highest level.",
      },
    ],
    faqs: [
      {
        question: "Does this apprenticeship lead to MCIPS?",
        answer:
          "Yes. Completing the Level 6 apprenticeship, combined with the required level of professional experience, enables you to apply for full MCIPS membership — the gold standard in procurement.",
      },
      {
        question:
          "Is this suitable for someone without prior CIPS qualifications?",
        answer:
          "No. You must hold the CIPS Level 5 Advanced Diploma (or equivalent) before starting this apprenticeship. It is designed for those already at a senior level who need to formalise their strategic expertise.",
      },
      {
        question: "What makes the Level 6 EPA different from lower levels?",
        answer:
          "The Level 6 EPA involves a strategic project with a 5,000-word report addressing a complex, multi-faceted procurement challenge, followed by a 90-minute professional discussion that tests your ability to think and act at a strategic level. The standard is significantly higher than Levels 3 and 4.",
      },
      {
        question: "Can my employer fund this through the Levy?",
        answer:
          "Yes. The Level 6 apprenticeship is fully funded through the Apprenticeship Levy for levy-paying employers. For non-levy employers, the government funds 95% with a maximum employer co-investment of £750.",
      },
    ],
    progression: {
      previous: {
        label: "Level 4 — Procurement & Supply Officer",
        href: "/apprenticeships/level-4",
      },
      next: null,
    },
    featured: false,
    funding:
      "Funded through the Apprenticeship Levy. Non-levy employers contribute a maximum of £750. This represents exceptional value for achieving MCIPS-level professional development with government funding support.",
    assessment:
      "The EPA comprises a 5,000-word strategic project report addressing a complex procurement challenge, followed by a rigorous 90-minute professional discussion with an independent assessor. You must demonstrate strategic thinking, leadership capability, and the ability to drive organisational value through procurement.",
    employerInfo:
      "Level 6 apprentices are transformational for organisations — they bring board-level strategic thinking to procurement, lead high-impact projects, and can mentor junior staff. This is the most impactful apprenticeship investment an employer can make in their procurement function.",
  },
];
