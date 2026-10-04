// src/app/data/cipsCoursesData.ts

export interface CipsModule {
  code: string;
  title: string;
  credits: number;
  type: 'CORE' | 'ELECTIVE';
}

export interface CipsFaq {
  question: string;
  answer: string;
}

export interface CipsCourse {
  level: number;
  title: string;
  subtitle: string;
  href: string;
  description: string;
  overview: string;
  cta: string;
  equivalent: string;
  totalCredits: number;
  whoIsThisFor: string;
  whyChooseLshs: string;
  requirements: string[];
  modules: CipsModule[];
  outcomes: string[];
  exam: string;
  studyModes: {
    mode: string;
    description: string;
  }[];
  faq: CipsFaq[];
  brochureUrl: string;
}

export const cipsCoursesData: CipsCourse[] = [
  {
    level: 2,
    title: "CIPS Level 2 Certificate in Procurement and Supply Operations",
    subtitle: "Your first step towards moving forward into an exciting new career",
    href: "/courses/level-2-certificate",
    description: "The ideal starting qualification for anyone new to the profession. Understand key facts, procedures, and processes relevant for anyone aspiring to work in procurement and supply.",
    overview: "Based on the Tactical and Operational levels of the CIPS Global Standard, this qualification will help you grasp the fundamentals of procurement. It's perfect for those looking to formalise their experience or transition into a procurement role from another field.",
    cta: "Start your CIPS journey today",
    equivalent: "GCSE level / Introductory vocational qualification",
    totalCredits: 18,
    whoIsThisFor: "Anyone new to the profession or anyone looking to aspire to move into a procurement and supply career. Ideal for school leavers, administrative staff, or career changers.",
    whyChooseLshs: "At LSHS, we guide you through your very first steps in procurement with dedicated tutor support, intuitive learning platforms, and flexible study schedules that fit around your life.",
    requirements: ["No prior qualifications or experience required", "Good standard of English and Maths", "Minimum age of 16"],
    modules: [
      { code: "L2M1", title: "Introducing Procurement and Supply", credits: 6, type: "CORE" },
      { code: "L2M2", title: "Procurement and Supply Operations", credits: 3, type: "CORE" },
      { code: "L2M3", title: "Stakeholder Relationships", credits: 3, type: "CORE" },
      { code: "L2M4", title: "Systems Technology", credits: 3, type: "CORE" },
      { code: "L2M5", title: "Inventory, Logistics and Expediting", credits: 3, type: "CORE" },
    ],
    outcomes: ["Understand the fundamental procurement cycle", "Know how to operate effectively in a procurement support role", "Understand basic stakeholder management and systems technology"],
    exam: "Computer-based exams. You will need to pass each module exam to achieve the award.",
    studyModes: [
      { mode: "Self-study", description: "Study on your own using CIPS resources and LSHS supplementary guides at your own pace." },
      { mode: "CIPS OnDemand", description: "A guided online course offering a flexible, yet structured study programme designed to keep you motivated." },
      { mode: "Study Centre (LSHS)", description: "Study at our approved centre with structured tutor-led learning and a community of professionals." },
    ],
    faq: [
      { question: "Do I need any experience to take Level 2?", answer: "No, this course is designed for absolute beginners or those looking to formalise their existing administrative experience." },
      { question: "How long does it take to complete?", answer: "Typically, students complete Level 2 within 3 to 6 months depending on their study mode." },
      { question: "Can I study online?", answer: "Yes, we offer flexible self-study and CIPS OnDemand online learning options." }
    ],
    brochureUrl: "#",
  },
  {
    level: 3,
    title: "CIPS Level 3 Advanced Certificate in Procurement and Supply Operations",
    subtitle: "Improve your skills and capabilities",
    href: "/courses/level-3-advanced-certificate",
    description: "Designed for those already in a delivering role to help you improve fundamental skills. Become a more confident problem solver for new and existing tasks.",
    overview: "Based on the Delivering levels of the CIPS Global Standard, this qualification gives you a clear understanding of how procurement and supply fits in with the rest of your organisation. It bridges the gap between basic operational tasks and foundational tactical knowledge.",
    cta: "Advance your operational skills",
    equivalent: "A-Level standard / Intermediate vocational qualification",
    totalCredits: 30,
    whoIsThisFor: "Those already in a delivery role who want to improve their fundamental skills and understand how their role impacts the wider organisation.",
    whyChooseLshs: "LSHS provides a supportive bridge between basic operations and tactical thinking. Our real-world case studies make complex theories easy to apply to your daily job.",
    requirements: ["Ideally hold a CIPS Level 2 qualification", "Some experience in a procurement or supply chain role", "Good standard of English and Maths"],
    modules: [
      { code: "L3M1", title: "Procurement and Supply Environments", credits: 6, type: "CORE" },
      { code: "L3M2", title: "Ethical Procurement and Supply", credits: 6, type: "CORE" },
      { code: "L3M3", title: "Contract Administration", credits: 6, type: "CORE" },
      { code: "L3M4", title: "Team Dynamics and Change", credits: 6, type: "CORE" },
      { code: "L3M5", title: "Socially Responsible Procurement", credits: 6, type: "ELECTIVE" },
      { code: "L3M6", title: "Socially Responsible Warehousing and Distribution", credits: 6, type: "ELECTIVE" },
    ],
    outcomes: ["Understand procurement environments and ethical practices", "Administer contracts and manage team dynamics effectively", "Apply socially responsible principles to supply chains"],
    exam: "Computer-based exams. You must pass the 4 core modules (24 credits) and 1 elective module (6 credits) to achieve the award.",
    studyModes: [
      { mode: "Self-study", description: "Study on your own and at your own pace using our comprehensive study resources." },
      { mode: "CIPS OnDemand", description: "With a 92% pass rate, this guided online course keeps you motivated and secures exam success." },
      { mode: "Study Centre (LSHS)", description: "Choose to study at our London centre, benefiting from structured tutor-led learning." },
    ],
    faq: [
      { question: "Is Level 3 right for me if I have no procurement experience?", answer: "If you have no experience, we highly recommend starting at Level 2 to build foundational knowledge first." },
      { question: "Which elective should I choose?", answer: "Your choice depends on your current role. LSHS tutors can help advise you on the best fit for your career goals." }
    ],
    brochureUrl: "#",
  },
  {
    level: 4,
    title: "CIPS Level 4 Diploma in Procurement and Supply",
    subtitle: "Kickstart your career with the most popular starting route to MCIPS Chartered Status",
    href: "/courses/level-4-diploma",
    description: "The most popular starting point for those who want to achieve MCIPS Chartered Status. Equipped with skills to apply immediately into your workplace.",
    overview: "Updated in 2023, this Ofqual regulated qualification is equivalent to a first year of an undergraduate degree. It focuses on the CIPS Procurement and Supply Cycle, providing the essential toolkit for those looking to excel in a career in procurement and supply.",
    cta: "Join now and kickstart your MCIPS journey",
    equivalent: "First year of an undergraduate degree (Ofqual regulated)",
    totalCredits: 60,
    whoIsThisFor: "The essential toolkit for those looking to excel in procurement. Ideal for those with 2+ years of relevant experience in a business environment who are eager to advance their careers and aim for MCIPS Chartered Status.",
    whyChooseLshs: "Level 4 is where LSHS truly excels. As the most popular entry point, our tutors have refined a teaching methodology that consistently achieves pass rates above the global average. We don't just teach the syllabus; we teach you how to think like a procurement professional.",
    requirements: ["2+ years of relevant experience in a business environment, OR", "Successful completion of CIPS Level 3", "Good standard of English and Maths"],
    modules: [
      { code: "L4M1", title: "Scope and Influence of Procurement and Supply", credits: 12, type: "CORE" },
      { code: "L4M2", title: "Defining Business Need", credits: 6, type: "CORE" },
      { code: "L4M3", title: "Commercial Contracting", credits: 6, type: "CORE" },
      { code: "L4M4", title: "Ethical and Responsible Sourcing", credits: 6, type: "CORE" },
      { code: "L4M5", title: "Commercial Negotiation", credits: 6, type: "CORE" },
      { code: "L4M6", title: "Supplier Relationships", credits: 6, type: "CORE" },
      { code: "L4M7", title: "Whole Life Asset Management", credits: 6, type: "CORE" },
      { code: "L4M8", title: "Procurement and Supply in Practice", credits: 12, type: "CORE" },
    ],
    outcomes: ["Define business needs and formulate sourcing strategies", "Negotiate commercial contracts effectively", "Manage supplier relationships and ensure ethical sourcing", "Apply whole life asset management principles"],
    exam: "All eight modules are assessed by computer-based exams using Constructed Responses (CR) essay style questions and Objective Response (OR) multiple-choice formats. Exams can be taken globally or via remote invigilation.",
    studyModes: [
      { mode: "Self-study", description: "Study our qualifications on your own and at your own pace with access to extensive resources." },
      { mode: "CIPS OnDemand", description: "With a 92% pass rate, this guided online course offers a flexible, structured study programme. Get your 5-day free trial." },
      { mode: "Study Centre (LSHS)", description: "Study at our approved centre in the classroom or at a distance. Benefit from structured tutor-led learning and a community of like-minded professionals." },
    ],
    faq: [
      { question: "Can I jump straight to Level 4?", answer: "Yes, if you have 2+ years of relevant business experience, you can start directly at Level 4 without taking Levels 2 or 3." },
      { question: "What is the pass rate for LSHS Level 4 students?", answer: "Our pass rates consistently exceed the global CIPS average, thanks to our targeted teaching methodologies." }
    ],
    brochureUrl: "#",
  },
  {
    level: 5,
    title: "CIPS Level 5 Advanced Diploma in Procurement and Supply",
    subtitle: "Grow in confidence as you take your next step towards MCIPS Chartered Status",
    href: "/courses/level-5-advanced-diploma",
    description: "Grow in confidence, improve organisational procurement, and fulfil objectives. Get to grips with key aspects of risks in supply chains, team management, and contract evaluation.",
    overview: "This Ofqual regulated qualification marks the next step on your journey to MCIPS Chartered Status. You will focus on dealing with key aspects of risk and mitigation, processing and evaluating contracts, and their legal implications. New in 2025, ESG considerations have been introduced into this syllabus.",
    cta: "Step up to strategic procurement",
    equivalent: "Second year of an undergraduate degree (Ofqual regulated)",
    totalCredits: 60,
    whoIsThisFor: "Professionals building on Level 4 knowledge. You will develop higher-level learning focusing on risk mitigation, contract legal implications, and strategic team management. It is based at the same level as the second year of an undergraduate degree course.",
    whyChooseLshs: "Level 5 requires critical thinking and analytical skills. LSHS provides advanced workshops, real-world contract simulations, and dedicated mentorship to help you transition from an operational buyer to a strategic procurement manager.",
    requirements: ["Successful completion of CIPS Level 4 Diploma", "Good standard of English and Maths"],
    modules: [
      { code: "L5M1", title: "Managing Teams and Individuals", credits: 12, type: "CORE" },
      { code: "L5M2", title: "Managing Supply Chain Risk", credits: 6, type: "CORE" },
      { code: "L5M3", title: "Managing Contractual Risk", credits: 6, type: "CORE" },
      { code: "L5M4", title: "Advanced Contract & Financial Management", credits: 12, type: "CORE" },
      { code: "L5M5", title: "Managing Ethical Procurement and Supply", credits: 6, type: "CORE" },
      { code: "L5M6", title: "Category Management", credits: 6, type: "ELECTIVE" },
      { code: "L5M7", title: "Achieving Competitive Advantage Through the Supply Chain", credits: 6, type: "ELECTIVE" },
      { code: "L5M8", title: "Project and Change Management", credits: 6, type: "ELECTIVE" },
      { code: "L5M9", title: "Operations Management", credits: 6, type: "ELECTIVE" },
      { code: "L5M10", title: "Logistics Management", credits: 6, type: "ELECTIVE" },
      { code: "L5M15", title: "Advanced Negotiation", credits: 6, type: "ELECTIVE" },
    ],
    outcomes: ["Manage teams and individuals effectively in a procurement context", "Identify and mitigate supply chain and contractual risks", "Apply advanced financial management to procurement", "Embed ESG and ethical practices into procurement strategy"],
    exam: "Five core modules and three elective modules. Assessed by computer-based exams (CR essay style and OR formats). Exams can be taken at global venues or via remote invigilation.",
    studyModes: [
      { mode: "Self-study", description: "Study on your own and at your own pace with CIPS resources and guides." },
      { mode: "CIPS OnDemand", description: "Guided online course with a 92% pass rate. Buy individual modules or enrol on a full course." },
      { mode: "Study Centre (LSHS)", description: "Study in a group at our approved centre. Benefit from structured tutor-led learning and share ideas from other industries." },
    ],
    faq: [
      { question: "How many electives do I need to choose?", answer: "You must complete 3 elective modules from the available options to achieve the required credits." },
      { question: "Is ESG heavily featured in this syllabus?", answer: "Yes, updated for 2025, ESG principles are now deeply integrated into the core and elective modules." }
    ],
    brochureUrl: "#",
  },
  {
    level: 6,
    title: "CIPS Level 6 Professional Diploma in Procurement and Supply",
    subtitle: "Demonstrate professionalism",
    href: "/courses/level-6-professional-diploma",
    description: "Make a real impact in your career. Take your journey all the way to becoming an MCIPS Chartered Professional. Recognised by employers world-wide.",
    overview: "Based on the Leading band of the CIPS Global Standard, this is the highest level of CIPS qualifications for those working towards achieving MCIPS Chartered status. It equips you to become a strategic leader with the vision to inspire teams and steer organisational success.",
    cta: "Achieve MCIPS Chartered Status",
    equivalent: "Honours level degree (HONS) (Ofqual regulated)",
    totalCredits: 60,
    whoIsThisFor: "Senior professionals building on Level 4 and Level 5 knowledge. It equips you to become a strategic leader with the vision to inspire teams and steer organisational success. By mastering complex theoretical frameworks, you will possess elite competencies in-demand by modern employers.",
    whyChooseLshs: "Achieving Level 6 is the final academic hurdle to MCIPS. LSHS offers elite-level tutoring, peer-to-peer mastermind groups with other senior leaders, and strategic dissertation support to ensure you cross the finish line with distinction.",
    requirements: ["Successful completion of CIPS Level 5 Advanced Diploma", "Good standard of English and Maths"],
    modules: [
      { code: "L6M1", title: "Strategic Ethical Leadership", credits: 12, type: "CORE" },
      { code: "L6M2", title: "Global Commercial Strategy", credits: 12, type: "CORE" },
      { code: "L6M3", title: "Global Strategic Supply Chain Management", credits: 12, type: "CORE" },
      { code: "L6M4", title: "Future Strategic Challenges of the Profession", credits: 6, type: "CORE" },
      { code: "L6M5", title: "Strategic Programme Leadership", credits: 6, type: "ELECTIVE" },
      { code: "L6M7", title: "Commercial Data Management", credits: 6, type: "ELECTIVE" },
      { code: "L6M8", title: "Innovation in Procurement and Supply", credits: 6, type: "ELECTIVE" },
      { code: "L6M9", title: "Supply Network Design", credits: 6, type: "ELECTIVE" },
      { code: "L6M10", title: "Global Logistics Strategy", credits: 6, type: "ELECTIVE" },
      { code: "L6M11", title: "Environmental, Social and Governance (ESG) Principles", credits: 6, type: "ELECTIVE" },
    ],
    outcomes: ["Lead corporate strategy and procurement transformation", "Design global supply chain networks for resilience and innovation", "Influence policy and drive ESG principles at board level", "Achieve full MCIPS Chartered Professional status"],
    exam: "Four core modules and three elective modules. Assessed by computer-based exams (CR essay style and OR formats). Exams can be taken at global venues or via remote invigilation.",
    studyModes: [
      { mode: "Self-study", description: "Study on your own and at your own pace with CIPS resources, guides, and social media networks." },
      { mode: "CIPS OnDemand", description: "Guided online course with a 92% pass rate. Buy individual modules or enrol on a full course." },
      { mode: "Study Centre (LSHS)", description: "Study in a group at our approved centre. Benefit from structured tutor-led learning with senior peers." },
    ],
    faq: [
      { question: "What happens after I pass Level 6?", answer: "Once you have completed Level 6 and demonstrated the required practical experience, you can apply for full MCIPS Chartered Status." },
      { question: "Is there a dissertation required?", answer: "While there isn't a traditional dissertation, L6M8 and other electives require extensive strategic report writing equivalent to post-graduate level work." }
    ],
    brochureUrl: "#",
  },
];