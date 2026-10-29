export const QUALIFICATIONS = [
  { value: "slc", label: "SLC / SEE" },
  { value: "plus-two", label: "+2 / Intermediate" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "phd", label: "Ph.D. / Doctorate" },
  { value: "other", label: "Other" },
]

export const EXPERIENCE_YEARS = [
  { value: "fresher", label: "Fresher (No experience)" },
  { value: "1", label: "1 Year" },
  { value: "2", label: "2 Years" },
  { value: "2-3", label: "2–3 Years" },
  { value: "4-5", label: "4–5 Years" },
  { value: "5+", label: "5+ Years" },
]

export const EMPLOYMENT_TYPES = [
  { value: "Full-Time", label: "Full Time" },
  { value: "Part-Time", label: "Part Time" },
  { value: "Internship", label: "Internship" },
  { value: "Contract", label: "Contract" },
]

export const fallbackJobs = [
  {
    id: "fallback-1",
    title: "IT Officer",
    type: "Onsite",
    workingMode: "onsite",
    postedAgo: "3 Days ago",
    experienceYears: 2,
    salary: "Rs 35,000 - Rs 50,000",
    description:
      "Manage IT infrastructure, ensure seamless day-to-day technology operations, support team workstations, and oversee software/hardware maintenance.",
    imgSrc: "/images/careers/jlpt-desk.jpg",
    slug: "it-officer",
    details: {
      overview: [
        "We are seeking a proactive and skilled IT Officer to oversee our organization's technology infrastructure, provide technical assistance across departments, and ensure robust IT operations.",
      ],
      responsibilities: [
        "Install, configure, and maintain computer systems, networking equipment, and peripheral devices.",
        "Provide timely technical support and troubleshooting for staff and workstations.",
        "Manage data security protocols, routine backup schedules, and antivirus protection systems.",
        "Oversee user access permissions, credentials, and software license compliance.",
      ],
      requirements: [
        "Bachelor's degree in Information Technology, Computer Science, or equivalent field.",
        "2+ years of hands-on experience in IT support or system administration.",
        "Solid understanding of LAN/WAN networking, Windows/Linux operating systems, and cloud productivity tools.",
        "Strong problem-solving attitude and clear interpersonal communication skills.",
      ],
    },
  },
  {
    id: "fallback-2",
    title: "Senior Full Stack Engineer",
    type: "Hybrid",
    workingMode: "hybrid",
    postedAgo: "2 Days ago",
    experienceYears: 3,
    salary: "Rs 60,000 - Rs 90,000",
    description:
      "Lead the development of scalable web platforms, collaborate with cross-functional teams, and build responsive modern digital experiences with cutting-edge technologies.",
    imgSrc: "/images/careers/jlpt-desk.jpg",
    slug: "senior-full-stack-engineer",
    details: {
      overview: [
        "We are looking for an experienced Senior Full Stack Engineer to drive the design and engineering of our digital products, microservices, and client-facing web applications.",
      ],
      responsibilities: [
        "Architect, develop, and maintain performant web applications using Next.js/React and Node.js/PostgreSQL.",
        "Design robust RESTful APIs, optimized database queries, and reliable data contracts.",
        "Partner with UI/UX designers and product managers to deliver seamless user experiences.",
        "Champion code quality, automated testing, and CI/CD best practices.",
      ],
      requirements: [
        "3+ years of professional full-stack web development experience.",
        "Deep expertise in React, Next.js, Node.js, TypeScript, and modern relational databases (PostgreSQL/Drizzle ORM).",
        "Proficiency in building responsive layouts with modern CSS and Tailwind/Vanilla CSS.",
      ],
    },
  },
  {
    id: "fallback-3",
    title: "Japanese Language & Cultural Coordinator",
    type: "Onsite",
    workingMode: "onsite",
    postedAgo: "1 Week ago",
    experienceYears: 2,
    salary: "Rs 45,000 - Rs 70,000",
    description:
      "Facilitate language instruction, coordinate intercultural communication programs, and support students and professionals preparing for career transitions in Japan.",
    imgSrc: "/images/careers/jlpt-desk.jpg",
    slug: "japanese-language-cultural-coordinator",
    details: {
      overview: [
        "Join our international team as a Japanese Language & Cultural Coordinator to empower candidates with the linguistic competence, cultural insights, and professional readiness required for thriving in Japan.",
      ],
      responsibilities: [
        "Conduct interactive Japanese language training programs spanning JLPT N5 through N2 levels.",
        "Design curriculum modules, conversation practices, and cultural etiquette workshops.",
        "Provide personalized guidance and mock interviews for employment and visa requirements.",
      ],
      requirements: [
        "JLPT N2 or N1 certification with proven native/near-native conversational fluency.",
        "2+ years of professional teaching or cross-cultural training experience.",
        "Prior experience living, studying, or working in Japan is highly preferred.",
      ],
    },
  },
]
