export interface VisaDetail {
  id: string;
  title: string;
  type: string;
  duration: string;
  cost: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  requirements: string[];
  benefits: string[];
  process: string[];
  timeline: string;
  documents: string[];
  restrictions: string[];
  videoUrl?: string;
  quiz: {
    questions: {
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    }[];
  };
  links: {
    government: string;
    agencies: string[];
  };
  downloadUrl: string;
  access: "free" | "paid";
}

export const visaDetails: VisaDetail[] = [
  {
    id: "tourist-visa",
    title: "Tourist Visa / Visa Exemption",
    type: "Tourist",
    duration: "30-60 days",
    cost: "Free - $40",
    difficulty: "Easy",
    description: "The most common entry method for short-term visitors to Thailand. Available as visa exemption for many nationalities or as a tourist visa for longer stays.",
    requirements: [
      "Valid passport (6+ months remaining)",
      "Proof of onward travel",
      "Sufficient funds (20,000 THB per person)",
      "Accommodation booking or address",
      "Return ticket or onward ticket"
    ],
    benefits: [
      "No visa fee for visa exemption",
      "Quick entry process",
      "Can be extended once for 30 days",
      "Multiple entries possible with tourist visa",
      "Easy to obtain"
    ],
    process: [
      "Check if your nationality qualifies for visa exemption",
      "Prepare required documents",
      "Book flight with return/onward ticket",
      "Arrive at Thai airport or border",
      "Present documents to immigration officer",
      "Receive entry stamp"
    ],
    timeline: "Immediate upon arrival at airport or border crossing",
    documents: [
      "Passport with 6+ months validity",
      "Return or onward flight ticket",
      "Proof of accommodation",
      "Bank statement or cash (20,000 THB)",
      "Completed arrival/departure card"
    ],
    restrictions: [
      "Cannot work on tourist visa",
      "Limited to 30-60 days stay",
      "Must show proof of onward travel",
      "May be denied entry if insufficient funds",
      "Cannot study long-term"
    ],
    quiz: {
      questions: [
        {
          question: "How long can you stay in Thailand on a visa exemption?",
          options: [
            "15 days",
            "30 days",
            "60 days",
            "90 days"
          ],
          correct: 1,
          explanation: "Most nationalities can stay for 30 days on visa exemption, though some can stay for 60 days."
        },
        {
          question: "What is the minimum passport validity required?",
          options: [
            "3 months",
            "6 months",
            "1 year",
            "2 years"
          ],
          correct: 1,
          explanation: "Your passport must be valid for at least 6 months from your entry date."
        },
        {
          question: "Can you work on a tourist visa?",
          options: [
            "Yes, with restrictions",
            "No, it's not allowed",
            "Only remote work",
            "Only part-time work"
          ],
          correct: 1,
          explanation: "Tourist visas do not allow any form of work in Thailand."
        }
      ]
    },
    links: {
      government: "https://www.immigration.go.th/",
      agencies: [
        "https://www.thaievisa.go.th/",
        "https://www.royalthaiembassy.com/"
      ]
    },
    downloadUrl: "/downloads/tourist-visa-guide.pdf",
    access: "free"
  },
  {
    id: "muay-thai-education-visa",
    title: "Muay Thai Education Visa",
    type: "Education",
    duration: "1 year (renewable)",
    cost: "$200-400",
    difficulty: "Medium",
    description: "A specialized education visa for those wanting to study Muay Thai in Thailand. Requires enrollment in an approved Muay Thai school.",
    requirements: [
      "Enrollment in approved Muay Thai school",
      "Valid passport (6+ months remaining)",
      "Medical certificate",
      "Criminal background check",
      "Proof of financial means",
      "School acceptance letter"
    ],
    benefits: [
      "Stay up to 1 year",
      "Learn authentic Muay Thai",
      "Immerse in Thai culture",
      "Can extend for multiple years",
      "Access to local gyms and trainers"
    ],
    process: [
      "Research and choose approved Muay Thai school",
      "Apply and get accepted to school",
      "Gather required documents",
      "Apply for visa at Thai embassy/consulate",
      "Travel to Thailand",
      "Report to school and immigration within 7 days",
      "Renew every 90 days at immigration"
    ],
    timeline: "2-4 weeks for visa processing, then 90-day renewals",
    documents: [
      "Passport with 6+ months validity",
      "School acceptance letter",
      "Medical certificate",
      "Criminal background check",
      "Financial proof (20,000 THB)",
      "Completed visa application form",
      "Passport photos"
    ],
    restrictions: [
      "Must attend classes regularly",
      "Cannot work on this visa",
      "Must report to immigration every 90 days",
      "Limited to approved schools",
      "Must maintain student status"
    ],
    quiz: {
      questions: [
        {
          question: "How often must you report to immigration on an education visa?",
          options: [
            "Every 30 days",
            "Every 60 days",
            "Every 90 days",
            "Every 6 months"
          ],
          correct: 2,
          explanation: "Education visa holders must report to immigration every 90 days."
        },
        {
          question: "Can you work while on a Muay Thai education visa?",
          options: [
            "Yes, part-time",
            "No, it's not allowed",
            "Only remote work",
            "Only teaching Muay Thai"
          ],
          correct: 1,
          explanation: "Education visas do not permit any form of work in Thailand."
        },
        {
          question: "What is the initial validity period of an education visa?",
          options: [
            "6 months",
            "1 year",
            "2 years",
            "3 months"
          ],
          correct: 1,
          explanation: "Education visas are typically issued for 1 year and can be renewed."
        }
      ]
    },
    links: {
      government: "https://www.immigration.go.th/",
      agencies: [
        "https://www.thaievisa.go.th/",
        "https://www.muaythaivisa.com/"
      ]
    },
    downloadUrl: "/downloads/muay-thai-education-visa-guide.pdf",
    access: "paid"
  },
  {
    id: "dtv-visa",
    title: "Digital Nomad Visa (DTV)",
    type: "Digital Nomad",
    duration: "5 years",
    cost: "$500-1,000",
    difficulty: "Hard",
    description: "Thailand's new Digital Nomad Visa allows remote workers to stay long-term. Partnership with ISSA Compass for application assistance.",
    requirements: [
      "Remote work income of $80,000+ annually",
      "Valid passport (6+ months remaining)",
      "Health insurance coverage",
      "Criminal background check",
      "Proof of remote work",
      "Financial statements"
    ],
    benefits: [
      "Stay up to 5 years",
      "Work remotely legally",
      "Access to Thai healthcare",
      "Tax benefits after 180 days",
      "Family can join",
      "No 90-day reporting"
    ],
    process: [
      "Verify income requirements",
      "Gather required documents",
      "Apply through ISSA Compass",
      "Submit application to Thai embassy",
      "Wait for approval (4-8 weeks)",
      "Travel to Thailand",
      "Complete final registration"
    ],
    timeline: "4-8 weeks for initial processing, then 5-year validity",
    documents: [
      "Passport with 6+ months validity",
      "Income verification ($80,000+ annually)",
      "Health insurance certificate",
      "Criminal background check",
      "Remote work contract/letter",
      "Bank statements",
      "Completed application forms"
    ],
    restrictions: [
      "Must maintain remote work income",
      "Cannot work for Thai companies",
      "Must have health insurance",
      "Limited to specific income threshold",
      "Must report address changes"
    ],
    quiz: {
      questions: [
        {
          question: "What is the minimum annual income required for DTV?",
          options: [
            "$50,000",
            "$80,000",
            "$100,000",
            "$120,000"
          ],
          correct: 1,
          explanation: "The DTV requires a minimum annual income of $80,000 from remote work."
        },
        {
          question: "How long is the DTV valid for?",
          options: [
            "1 year",
            "3 years",
            "5 years",
            "10 years"
          ],
          correct: 2,
          explanation: "The Digital Nomad Visa is valid for up to 5 years."
        },
        {
          question: "Can you work for Thai companies on a DTV?",
          options: [
            "Yes, with restrictions",
            "No, only remote work",
            "Only part-time",
            "Only consulting"
          ],
          correct: 1,
          explanation: "DTV holders can only work remotely for non-Thai companies."
        }
      ]
    },
    links: {
      government: "https://www.immigration.go.th/",
      agencies: [
        "https://www.issacompass.com/",
        "https://www.thaievisa.go.th/"
      ]
    },
    downloadUrl: "/downloads/dtv-visa-guide.pdf",
    access: "paid"
  },
  {
    id: "smart-business-visa",
    title: "SMART Business Visa",
    type: "Business",
    duration: "4 years",
    cost: "$1,000-2,000",
    difficulty: "Hard",
    description: "For entrepreneurs and investors wanting to start or expand business in Thailand. Requires significant investment or business plan.",
    requirements: [
      "Business investment of $200,000+",
      "Valid passport (6+ months remaining)",
      "Business plan or investment proof",
      "Health insurance",
      "Criminal background check",
      "Financial statements"
    ],
    benefits: [
      "Stay up to 4 years",
      "Work in your business",
      "Bring family members",
      "Access to Thai business networks",
      "Potential for permanent residence",
      "Tax incentives"
    ],
    process: [
      "Develop business plan or secure investment",
      "Gather required documents",
      "Apply through BOI or relevant agency",
      "Submit application to Thai embassy",
      "Wait for approval (8-12 weeks)",
      "Travel to Thailand",
      "Register business and complete setup"
    ],
    timeline: "8-12 weeks for processing, then 4-year validity with annual renewals",
    documents: [
      "Passport with 6+ months validity",
      "Business plan or investment proof",
      "Health insurance certificate",
      "Criminal background check",
      "Financial statements",
      "Company registration documents",
      "Investment verification"
    ],
    restrictions: [
      "Must maintain business operations",
      "Limited to approved business activities",
      "Must meet investment requirements",
      "Annual reporting required",
      "Cannot work outside your business"
    ],
    quiz: {
      questions: [
        {
          question: "What is the minimum investment required for SMART Business Visa?",
          options: [
            "$100,000",
            "$200,000",
            "$500,000",
            "$1,000,000"
          ],
          correct: 1,
          explanation: "The SMART Business Visa requires a minimum investment of $200,000."
        },
        {
          question: "How long is the SMART Business Visa valid?",
          options: [
            "2 years",
            "4 years",
            "6 years",
            "10 years"
          ],
          correct: 1,
          explanation: "The SMART Business Visa is valid for up to 4 years."
        },
        {
          question: "Can you work outside your business on a SMART Business Visa?",
          options: [
            "Yes, with restrictions",
            "No, only in your business",
            "Only consulting",
            "Only part-time"
          ],
          correct: 1,
          explanation: "SMART Business Visa holders can only work within their approved business."
        }
      ]
    },
    links: {
      government: "https://www.boi.go.th/",
      agencies: [
        "https://www.thaievisa.go.th/",
        "https://www.businessvisathailand.com/"
      ]
    },
    downloadUrl: "/downloads/smart-business-visa-guide.pdf",
    access: "paid"
  },
  {
    id: "non-b-business-visa",
    title: "Non-B Business Visa",
    type: "Business",
    duration: "1 year (renewable)",
    cost: "$200-500",
    difficulty: "Medium",
    description: "Traditional business visa for those working for Thai companies or conducting business activities. Partnership with ATA Thailand for assistance.",
    requirements: [
      "Job offer from Thai company OR business activities",
      "Valid passport (6+ months remaining)",
      "Work permit application",
      "Company documents",
      "Medical certificate",
      "Criminal background check"
    ],
    benefits: [
      "Work legally in Thailand",
      "Stay up to 1 year",
      "Can be renewed annually",
      "Bring family members",
      "Access to Thai healthcare",
      "Path to permanent residence"
    ],
    process: [
      "Secure job offer or business opportunity",
      "Gather required documents",
      "Apply for visa at Thai embassy",
      "Travel to Thailand",
      "Apply for work permit",
      "Report to immigration",
      "Renew annually"
    ],
    timeline: "2-4 weeks for visa processing, then annual renewals",
    documents: [
      "Passport with 6+ months validity",
      "Job offer letter or business documents",
      "Work permit application",
      "Company registration documents",
      "Medical certificate",
      "Criminal background check",
      "Educational certificates"
    ],
    restrictions: [
      "Must work for sponsoring company",
      "Cannot change jobs without new visa",
      "Must maintain work permit",
      "Annual renewal required",
      "Must report address changes"
    ],
    quiz: {
      questions: [
        {
          question: "What is required to get a Non-B Business Visa?",
          options: [
            "Just a passport",
            "Job offer from Thai company",
            "Tourist visa first",
            "Investment proof"
          ],
          correct: 1,
          explanation: "A Non-B Business Visa requires a job offer from a Thai company or business activities."
        },
        {
          question: "How often must you renew a Non-B Business Visa?",
          options: [
            "Every 6 months",
            "Every year",
            "Every 2 years",
            "Never"
          ],
          correct: 1,
          explanation: "Non-B Business Visas must be renewed annually."
        },
        {
          question: "Can you change jobs on a Non-B Business Visa?",
          options: [
            "Yes, freely",
            "No, not allowed",
            "Only with new visa application",
            "Only after 1 year"
          ],
          correct: 2,
          explanation: "Changing jobs requires a new visa application and work permit."
        }
      ]
    },
    links: {
      government: "https://www.immigration.go.th/",
      agencies: [
        "https://www.atathailand.com/",
        "https://www.thaievisa.go.th/"
      ]
    },
    downloadUrl: "/downloads/non-b-business-visa-guide.pdf",
    access: "paid"
  },
  {
    id: "elite-visa",
    title: "Thailand Elite Visa",
    type: "Premium",
    duration: "5-20 years",
    cost: "$15,000-60,000",
    difficulty: "Easy",
    description: "Premium visa program offering long-term stay with exclusive benefits. Multiple membership tiers available.",
    requirements: [
      "Valid passport (6+ months remaining)",
      "Proof of financial means",
      "Clean criminal record",
      "Health insurance (some tiers)",
      "Application fee payment"
    ],
    benefits: [
      "Stay 5-20 years",
      "VIP airport services",
      "Exclusive member events",
      "Golf course access",
      "Spa and wellness benefits",
      "Concierge services",
      "No 90-day reporting"
    ],
    process: [
      "Choose Elite membership tier",
      "Gather required documents",
      "Submit application with fee",
      "Wait for approval (4-8 weeks)",
      "Travel to Thailand",
      "Activate membership benefits"
    ],
    timeline: "4-8 weeks for processing, then 5-20 year validity",
    documents: [
      "Passport with 6+ months validity",
      "Financial proof",
      "Criminal background check",
      "Health insurance (if required)",
      "Completed application forms",
      "Passport photos",
      "Application fee payment"
    ],
    restrictions: [
      "High cost investment",
      "Cannot work (some exceptions)",
      "Must maintain membership",
      "Limited to specific activities",
      "Annual fee requirements"
    ],
    quiz: {
      questions: [
        {
          question: "What is the minimum investment for Thailand Elite Visa?",
          options: [
            "$5,000",
            "$15,000",
            "$30,000",
            "$50,000"
          ],
          correct: 1,
          explanation: "The Thailand Elite Visa starts at $15,000 for the basic tier."
        },
        {
          question: "How long can you stay with Elite Visa?",
          options: [
            "1-3 years",
            "5-20 years",
            "10-30 years",
            "Lifetime"
          ],
          correct: 1,
          explanation: "Elite Visa offers stays from 5 to 20 years depending on the tier."
        },
        {
          question: "Do Elite Visa holders need 90-day reporting?",
          options: [
            "Yes, always",
            "No, not required",
            "Only for some tiers",
            "Only after 1 year"
          ],
          correct: 1,
          explanation: "Elite Visa holders are exempt from 90-day reporting requirements."
        }
      ]
    },
    links: {
      government: "https://www.thailandelite.com/",
      agencies: [
        "https://www.thailandelite.com/",
        "https://www.elitevisathailand.com/"
      ]
    },
    downloadUrl: "/downloads/elite-visa-guide.pdf",
    access: "paid"
  },
  {
    id: "retirement-visa",
    title: "Retirement Visa (Non-Immigrant O)",
    type: "Retirement",
    duration: "1 year (renewable)",
    cost: "$200-500",
    difficulty: "Medium",
    description: "For retirees aged 50+ who want to live in Thailand long-term. Requires proof of retirement income or bank deposit.",
    requirements: [
      "Age 50 or older",
      "Valid passport (6+ months remaining)",
      "Retirement income OR bank deposit",
      "Medical certificate",
      "Criminal background check",
      "Proof of accommodation"
    ],
    benefits: [
      "Stay up to 1 year",
      "Can be renewed annually",
      "No work permit needed",
      "Access to Thai healthcare",
      "Can bring spouse",
      "Relaxed lifestyle"
    ],
    process: [
      "Verify age and financial requirements",
      "Gather required documents",
      "Apply at Thai embassy/consulate",
      "Travel to Thailand",
      "Report to immigration within 7 days",
      "Renew annually at immigration"
    ],
    timeline: "2-4 weeks for processing, then annual renewals",
    documents: [
      "Passport with 6+ months validity",
      "Proof of age (50+)",
      "Retirement income proof OR bank deposit",
      "Medical certificate",
      "Criminal background check",
      "Accommodation proof",
      "Completed application forms"
    ],
    restrictions: [
      "Cannot work in Thailand",
      "Must maintain financial requirements",
      "Annual renewal required",
      "Must report to immigration every 90 days",
      "Limited to retirement activities"
    ],
    quiz: {
      questions: [
        {
          question: "What is the minimum age for a retirement visa?",
          options: [
            "45 years",
            "50 years",
            "55 years",
            "60 years"
          ],
          correct: 1,
          explanation: "You must be at least 50 years old to qualify for a retirement visa."
        },
        {
          question: "Can you work on a retirement visa?",
          options: [
            "Yes, part-time",
            "No, not allowed",
            "Only consulting",
            "Only remote work"
          ],
          correct: 1,
          explanation: "Retirement visas do not permit any form of work in Thailand."
        },
        {
          question: "How often must you renew a retirement visa?",
          options: [
            "Every 6 months",
            "Every year",
            "Every 2 years",
            "Never"
          ],
          correct: 1,
          explanation: "Retirement visas must be renewed annually at immigration."
        }
      ]
    },
    links: {
      government: "https://www.immigration.go.th/",
      agencies: [
        "https://www.thaievisa.go.th/",
        "https://www.retirementvisathailand.com/"
      ]
    },
    downloadUrl: "/downloads/retirement-visa-guide.pdf",
    access: "paid"
  },
  {
    id: "ltr-visa",
    title: "Long-Term Resident (LTR) Visa",
    type: "Long-Term",
    duration: "10 years",
    cost: "$1,000-2,000",
    difficulty: "Hard",
    description: "New long-term visa program for high-income individuals, retirees, and professionals. Multiple categories available.",
    requirements: [
      "High income OR significant assets",
      "Valid passport (6+ months remaining)",
      "Health insurance",
      "Criminal background check",
      "Financial statements",
      "Category-specific requirements"
    ],
    benefits: [
      "Stay up to 10 years",
      "Work permit included",
      "Tax benefits",
      "Family can join",
      "No 90-day reporting",
      "Access to healthcare"
    ],
    process: [
      "Determine LTR category eligibility",
      "Gather required documents",
      "Apply through online portal",
      "Wait for approval (8-12 weeks)",
      "Travel to Thailand",
      "Complete final registration"
    ],
    timeline: "8-12 weeks for processing, then 10-year validity",
    documents: [
      "Passport with 6+ months validity",
      "Income/asset verification",
      "Health insurance certificate",
      "Criminal background check",
      "Financial statements",
      "Category-specific documents",
      "Completed application forms"
    ],
    restrictions: [
      "High income/asset requirements",
      "Must maintain category requirements",
      "Limited to specific activities",
      "Annual reporting required",
      "Cannot change categories easily"
    ],
    quiz: {
      questions: [
        {
          question: "How long is the LTR Visa valid?",
          options: [
            "5 years",
            "10 years",
            "15 years",
            "20 years"
          ],
          correct: 1,
          explanation: "The LTR Visa is valid for up to 10 years."
        },
        {
          question: "Do LTR Visa holders need 90-day reporting?",
          options: [
            "Yes, always",
            "No, not required",
            "Only for some categories",
            "Only after 1 year"
          ],
          correct: 1,
          explanation: "LTR Visa holders are exempt from 90-day reporting requirements."
        },
        {
          question: "Is a work permit included with LTR Visa?",
          options: [
            "No, separate application",
            "Yes, included",
            "Only for some categories",
            "Only after 1 year"
          ],
          correct: 1,
          explanation: "LTR Visa includes work permit privileges for eligible categories."
        }
      ]
    },
    links: {
      government: "https://ltr.boi.go.th/",
      agencies: [
        "https://ltr.boi.go.th/",
        "https://www.thaievisa.go.th/"
      ]
    },
    downloadUrl: "/downloads/ltr-visa-guide.pdf",
    access: "paid"
  },
  {
    id: "marriage-visa",
    title: "Marriage Visa (Non-Immigrant O)",
    type: "Family",
    duration: "1 year (renewable)",
    cost: "$200-500",
    difficulty: "Medium",
    description: "For those married to Thai citizens. Allows long-term stay and work opportunities in Thailand.",
    requirements: [
      "Marriage to Thai citizen",
      "Valid passport (6+ months remaining)",
      "Marriage certificate",
      "Thai spouse's documents",
      "Financial proof",
      "Medical certificate"
    ],
    benefits: [
      "Stay up to 1 year",
      "Can work with work permit",
      "Can be renewed annually",
      "Access to Thai healthcare",
      "Can bring children",
      "Path to permanent residence"
    ],
    process: [
      "Marry Thai citizen",
      "Register marriage in Thailand",
      "Gather required documents",
      "Apply at Thai embassy/consulate",
      "Travel to Thailand",
      "Report to immigration",
      "Renew annually"
    ],
    timeline: "2-4 weeks for processing, then annual renewals",
    documents: [
      "Passport with 6+ months validity",
      "Marriage certificate",
      "Thai spouse's ID card",
      "Thai spouse's house registration",
      "Financial proof (400,000 THB)",
      "Medical certificate",
      "Completed application forms"
    ],
    restrictions: [
      "Must maintain marriage",
      "Annual renewal required",
      "Must report to immigration every 90 days",
      "Financial requirements must be met",
      "Cannot work without work permit"
    ],
    quiz: {
      questions: [
        {
          question: "What is required for a marriage visa?",
          options: [
            "Just a passport",
            "Marriage to Thai citizen",
            "Investment proof",
            "Job offer"
          ],
          correct: 1,
          explanation: "A marriage visa requires being married to a Thai citizen."
        },
        {
          question: "Can you work on a marriage visa?",
          options: [
            "No, not allowed",
            "Yes, with work permit",
            "Only part-time",
            "Only remote work"
          ],
          correct: 1,
          explanation: "Marriage visa holders can work with a proper work permit."
        },
        {
          question: "How often must you renew a marriage visa?",
          options: [
            "Every 6 months",
            "Every year",
            "Every 2 years",
            "Never"
          ],
          correct: 1,
          explanation: "Marriage visas must be renewed annually at immigration."
        }
      ]
    },
    links: {
      government: "https://www.immigration.go.th/",
      agencies: [
        "https://www.thaievisa.go.th/",
        "https://www.marriagevisathailand.com/"
      ]
    },
    downloadUrl: "/downloads/marriage-visa-guide.pdf",
    access: "paid"
  }
];
