import { MenuItem } from "../types/navbar";

export const menuData: MenuItem[] = [
  {
    label: "Courses",
    href: "/qualifications",
    columns: [
      {
        title: "CIPS Qualifications",
        items: [
          {
            label: "Level 2 – Intro to Procurement & Supply",
            href: "/qualifications/level-2",
            description: "Starting your procurement journey",
          },
          {
            label: "Level 3 – Advanced Certificate",
            href: "/qualifications/level-3",
            description: "Foundation knowledge for buyers",
          },
          {
            label: "Level 4 – Diploma in Procurement & Supply",
            href: "/qualifications/level-4",
            description: "Professional-level skills",
            badge: "Popular",
          },
          {
            label: "Level 5 – Advanced Diploma",
            href: "/qualifications/level-5",
            description: "Strategic procurement management",
          },
          {
            label: "Level 6 – Professional Diploma",
            href: "/qualifications/level-6",
            description: "Senior leadership in supply chain",
            badge: "MCIPS Path",
          },
        ],
      },
      {
        title: "How It Works",
        items: [
          { label: "Study Options", href: "/qualifications/study-options" },
          { label: "Assessment & Exams", href: "/qualifications/assessments" },
          { label: "Exemptions", href: "/qualifications/exemptions" },
          { label: "Fees & Funding", href: "/qualifications/fees" },
          {
            label: "Recognition & Accreditation",
            href: "/qualifications/accreditation",
          },
        ],
      },
    ],
    featured: {
      title: "Find Your Level",
      description:
        "Not sure where to start? Our quick qualification finder matches your experience to the right CIPS level.",
      href: "/qualifications/finder",
      image: "https://picsum.photos/seed/cips-qual-find/400/260.jpg",
      ctaText: "Start Finder",
    },
  },
  {
    label: "Membership",
    href: "/membership",
    columns: [
      {
        title: "Membership Types",
        items: [
          {
            label: "Student Membership",
            href: "/membership/student",
            description: "For those studying CIPS qualifications",
          },
          {
            label: "Associate Member (ACIPS)",
            href: "/membership/associate",
            description: "Entry-level professional membership",
          },
          {
            label: "Member (MCIPS)",
            href: "/membership/mcips",
            description: "Full professional recognition",
            badge: "Gold Standard",
          },
          {
            label: "Fellow (FCIPS)",
            href: "/membership/fellow",
            description: "Senior leadership designation",
          },
        ],
      },
      {
        title: "Corporate Solutions",
        items: [
          {
            label: "Corporate Membership",
            href: "/membership/corporate",
            description: "Elevate your procurement function",
          },
          { label: "Partner Programme", href: "/membership/partner" },
          {
            label: "Sponsorship Opportunities",
            href: "/membership/sponsorship",
          },
        ],
      },
    ],
    featured: {
      title: "Why Join CIPS?",
      description:
        "Unlock 50,000+ global connections, exclusive resources, and the world's most recognised procurement designation.",
      href: "/membership/benefits",
      image: "https://picsum.photos/seed/cips-why-join/400/260.jpg",
      ctaText: "See Benefits",
    },
  },
  {
    label: "Training",
    href: "/training",
    columns: [
      {
        title: "Learning Formats",
        items: [
          { label: "Public Training Courses", href: "/training/public" },
          {
            label: "In-House Training",
            href: "/training/inhouse",
            description: "Tailored for your organisation",
          },
          { label: "Online Learning", href: "/training/online", badge: "New" },
          { label: "Executive Masterclasses", href: "/training/masterclass" },
          { label: "CPD & Short Courses", href: "/training/cpd" },
        ],
      },
      {
        title: "Specialist Topics",
        items: [
          { label: "Category Management", href: "/training/category-mgmt" },
          { label: "Contract Management", href: "/training/contract-mgmt" },
          {
            label: "Sustainable Procurement",
            href: "/training/sustainable",
            badge: "Trending",
          },
          { label: "Digital Procurement & AI", href: "/training/digital" },
          { label: "Supplier Relationship Mgmt", href: "/training/srm" },
        ],
      },
    ],
    featured: {
      title: "2025 Training Calendar",
      description:
        "Browse 200+ courses across 40 topics. Book early and save up to 20%.",
      href: "/training/calendar",
      image: "https://picsum.photos/seed/cips-train-cal/400/260.jpg",
      ctaText: "View Calendar",
    },
  },
  {
    label: "Resources",
    href: "/resources",
    columns: [
      {
        title: "Knowledge Hub",
        items: [
          { label: "Procurement Guides", href: "/resources/guides" },
          { label: "Templates & Tools", href: "/resources/templates" },
          { label: "Research Reports", href: "/resources/research" },
          {
            label: "CIPS Magazine",
            href: "/resources/magazine",
            badge: "Free",
          },
          { label: "Podcasts & Webinars", href: "/resources/podcasts" },
        ],
      },
      {
        title: "Standards & Ethics",
        items: [
          { label: "CIPS Code of Conduct", href: "/resources/code-of-conduct" },
          {
            label: "Global Standard for Procurement",
            href: "/resources/global-standard",
          },
          { label: "Ethics & Compliance", href: "/resources/ethics" },
          { label: "Anti-Bribery Guidance", href: "/resources/anti-bribery" },
        ],
      },
    ],
    featured: {
      title: "Procurement & Supply Index",
      description:
        "Track global procurement performance with our quarterly index report.",
      href: "/resources/index",
      image: "https://picsum.photos/seed/cips-index/400/260.jpg",
      ctaText: "Explore Data",
    },
  },
  {
    label: "Events",
    href: "/events",
    columns: [
      {
        title: "Upcoming Events",
        items: [
          {
            label: "CIPS Annual Conference 2025",
            href: "/events/conference-2025",
            badge: "Flagship",
          },
          {
            label: "Procurement & Supply Awards",
            href: "/events/awards-2025",
          },
          { label: "Regional Networking Events", href: "/events/networking" },
          { label: "Webinar Schedule", href: "/events/webinars" },
        ],
      },
      {
        title: "On-Demand",
        items: [
          {
            label: "Conference 2024 Highlights",
            href: "/events/conference-2024",
          },
          { label: "Awards Winners Gallery", href: "/events/awards-gallery" },
          { label: "Recorded Webinars", href: "/events/on-demand" },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    columns: [
      {
        title: "Organisation",
        items: [
          { label: "Our Story", href: "/about/story" },
          { label: "Mission & Values", href: "/about/mission" },
          { label: "Governance", href: "/about/governance" },
          { label: "Leadership Team", href: "/about/leadership" },
        ],
      },
      {
        title: "Get Involved",
        items: [
          { label: "Work at CIPS", href: "/about/careers", badge: "Hiring" },
          { label: "Partners & Affiliates", href: "/about/partners" },
          { label: "Press & Media Centre", href: "/about/press" },
          { label: "Contact Us", href: "/about/contact" },
        ],
      },
    ],
  },
];
