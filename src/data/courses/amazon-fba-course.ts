import { LessonContent } from "@/components/lesson/lesson-viewer";

export const amazonFBACourse: LessonContent[] = [
  {
    id: "amazon-fba-lesson-1",
    title: "Amazon FBA Wholesale Overview",
    description: "Understanding the Amazon FBA wholesale business model and opportunity in Thailand",
    duration: "20 minutes",
    videoUrl: "/videos/amazon-fba/lesson-1.mp4",
    keyPoints: [
      "Amazon FBA wholesale allows you to buy products in bulk and resell them on Amazon",
      "Thailand's strategic location makes it perfect for sourcing wholesale products from Asia",
      "You can start with $5,000-$10,000 in initial investment for wholesale operations",
      "The key is finding products with consistent demand and good profit margins",
      "Amazon handles storage, packing, shipping, and customer service for you"
    ],
    quiz: [
      {
        id: "q1",
        question: "What is the main difference between FBA wholesale and private label?",
        options: [
          "Wholesale requires more capital",
          "Wholesale involves buying existing products vs. creating new ones",
          "Wholesale is only for large corporations",
          "Wholesale doesn't use Amazon FBA"
        ],
        correctAnswer: 1,
        explanation: "Wholesale involves buying existing products in bulk and reselling them, while private label creates new branded products."
      },
      {
        id: "q2", 
        question: "What makes Thailand ideal for Amazon FBA wholesale?",
        options: [
          "Low internet costs",
          "Strategic location for sourcing products from China and Asia",
          "Free warehouse space",
          "No import taxes"
        ],
        correctAnswer: 1,
        explanation: "Thailand's strategic location in Southeast Asia makes it ideal for sourcing wholesale products from China and other Asian manufacturers."
      },
      {
        id: "q3",
        question: "What's the typical initial investment range for wholesale FBA?",
        options: [
          "$500-$1,000",
          "$5,000-$10,000",
          "$50,000-$100,000",
          "$1,000,000+"
        ],
        correctAnswer: 1,
        explanation: "Wholesale FBA typically requires $5,000-$10,000 to start due to bulk purchasing requirements."
      }
    ],
    homework: {
      id: "hw1",
      title: "Wholesale Market Research",
      description: "Research 5 potential wholesale product categories. Identify the top 3 suppliers for each category and estimate minimum order quantities.",
      estimatedTime: "3 hours",
      deliverable: "Market research document with supplier analysis and MOQ estimates",
      tips: [
        "Focus on products with consistent year-round demand",
        "Look for products with 3+ suppliers to ensure competition",
        "Calculate potential profit margins after Amazon fees",
        "Consider storage costs and Amazon's receiving limits",
        "Research seasonal trends to avoid inventory issues"
      ]
    },
    nextLesson: "amazon-fba-lesson-2"
  },
  {
    id: "amazon-fba-lesson-2",
    title: "How to Use AMZ Seller Central",
    description: "Master Amazon Seller Central for efficient wholesale operations",
    duration: "25 minutes",
    videoUrl: "/videos/amazon-fba/lesson-2.mp4",
    keyPoints: [
      "Navigate the Seller Central dashboard efficiently for wholesale operations",
      "Use the Inventory Management section to track stock levels and reorder points",
      "Monitor the Reports section for sales analytics and performance metrics",
      "Set up automated repricing tools for competitive pricing strategies",
      "Utilize the Business Reports to identify top-performing products and opportunities"
    ],
    quiz: [
      {
        id: "q1",
        question: "Which section of Seller Central is most important for wholesale inventory management?",
        options: [
          "Marketing",
          "Inventory Management",
          "Customer Service",
          "Settings"
        ],
        correctAnswer: 1,
        explanation: "The Inventory Management section is crucial for tracking stock levels and planning reorders in wholesale operations."
      },
      {
        id: "q2",
        question: "What should you monitor in the Reports section?",
        options: [
          "Only sales numbers",
          "Sales analytics, performance metrics, and business insights",
          "Just customer feedback",
          "Only Amazon fees"
        ],
        correctAnswer: 1,
        explanation: "The Reports section provides comprehensive business insights including sales analytics and performance metrics."
      },
      {
        id: "q3",
        question: "Why are automated repricing tools important for wholesale?",
        options: [
          "They're required by Amazon",
          "They help maintain competitive pricing and maximize profits",
          "They reduce customer service workload",
          "They're free to use"
        ],
        correctAnswer: 1,
        explanation: "Automated repricing tools help maintain competitive pricing and maximize profits in the competitive wholesale market."
      }
    ],
    homework: {
      id: "hw2",
      title: "Seller Central Mastery",
      description: "Spend 2 hours exploring every section of Seller Central. Create a custom dashboard and set up key reports for monitoring your wholesale business.",
      estimatedTime: "2 hours",
      deliverable: "Custom dashboard setup and key reports configuration",
      tips: [
        "Explore all sections to understand their functionality",
        "Set up inventory alerts for low stock levels",
        "Configure business reports for weekly review",
        "Create custom views for your most important metrics",
        "Practice navigating between different sections quickly"
      ]
    },
    previousLesson: "amazon-fba-lesson-1",
    nextLesson: "amazon-fba-lesson-3"
  },
  {
    id: "amazon-fba-lesson-3",
    title: "Shipping to Amazon",
    description: "Master the logistics of shipping wholesale inventory to Amazon warehouses",
    duration: "30 minutes",
    videoUrl: "/videos/amazon-fba/lesson-3.mp4",
    keyPoints: [
      "Understand Amazon's receiving limits and storage fees for wholesale operations",
      "Prepare products according to Amazon's packaging requirements for bulk shipments",
      "Create efficient shipment plans to minimize costs and maximize speed",
      "Use Amazon's prep service when needed for complex packaging requirements",
      "Track shipments and monitor receiving status to ensure smooth operations"
    ],
    quiz: [
      {
        id: "q1",
        question: "What should you check before creating a shipment plan?",
        options: [
          "Only product prices",
          "Amazon's receiving limits and storage fees",
          "Just shipping costs",
          "Only supplier information"
        ],
        correctAnswer: 1,
        explanation: "Always check Amazon's receiving limits and storage fees to avoid unexpected costs and delays."
      },
      {
        id: "q2",
        question: "When should you use Amazon's prep service?",
        options: [
          "For every shipment",
          "When packaging requirements are complex or time-consuming",
          "Only for expensive products",
          "Never - it's too expensive"
        ],
        correctAnswer: 1,
        explanation: "Use Amazon's prep service when packaging requirements are complex or when you want to save time on preparation."
      },
      {
        id: "q3",
        question: "Why is tracking shipments important for wholesale?",
        options: [
          "It's required by Amazon",
          "It helps ensure smooth operations and timely inventory updates",
          "It reduces shipping costs",
          "It's just for customer satisfaction"
        ],
        correctAnswer: 1,
        explanation: "Tracking shipments ensures smooth operations and helps you plan inventory management and reorders effectively."
      }
    ],
    homework: {
      id: "hw3",
      title: "Shipment Planning Practice",
      description: "Create a detailed shipment plan for a hypothetical wholesale order. Include all costs, packaging requirements, and timeline estimates.",
      estimatedTime: "2 hours",
      deliverable: "Complete shipment plan with cost breakdown and timeline",
      tips: [
        "Use real product examples to make the exercise practical",
        "Calculate all costs including prep, shipping, and Amazon fees",
        "Consider different shipping options and their trade-offs",
        "Plan for potential delays and have backup options",
        "Document the process for future reference"
      ]
    },
    previousLesson: "amazon-fba-lesson-2",
    nextLesson: "amazon-fba-lesson-4"
  },
  {
    id: "amazon-fba-lesson-4",
    title: "Product Sourcing",
    description: "Strategies for finding reliable wholesale suppliers and products",
    duration: "35 minutes",
    videoUrl: "/videos/amazon-fba/lesson-4.mp4",
    keyPoints: [
      "Use multiple sourcing channels: Alibaba, ThomasNet, trade shows, and direct manufacturer relationships",
      "Always order samples before placing large wholesale orders",
      "Verify supplier credentials through trade assurance, certifications, and references",
      "Negotiate favorable terms including MOQs, payment terms, and lead times",
      "Build long-term relationships with reliable suppliers for better pricing and priority"
    ],
    quiz: [
      {
        id: "q1",
        question: "What's the most important step before placing a large wholesale order?",
        options: [
          "Getting the lowest price",
          "Ordering samples to verify quality",
          "Signing a long-term contract",
          "Paying upfront"
        ],
        correctAnswer: 1,
        explanation: "Always order samples to verify product quality, packaging, and specifications before committing to large wholesale orders."
      },
      {
        id: "q2",
        question: "Why is building long-term supplier relationships important?",
        options: [
          "It's required by law",
          "It leads to better pricing, priority, and reliability",
          "It reduces shipping costs",
          "It's just a nice thing to do"
        ],
        correctAnswer: 1,
        explanation: "Long-term relationships lead to better pricing, priority treatment, and more reliable service from suppliers."
      },
      {
        id: "q3",
        question: "What should you verify about suppliers?",
        options: [
          "Only their prices",
          "Credentials, trade assurance, and third-party verification",
          "Just their location",
          "Only their product photos"
        ],
        correctAnswer: 1,
        explanation: "Always verify supplier credentials through trade assurance and third-party verification services."
      }
    ],
    homework: {
      id: "hw4",
      title: "Supplier Research & Outreach",
      description: "Research 10 potential suppliers for your chosen wholesale products. Contact 5 of them for quotes, samples, and terms negotiation.",
      estimatedTime: "4 hours",
      deliverable: "Supplier comparison sheet and initial communication records",
      tips: [
        "Use multiple sourcing platforms to find suppliers",
        "Ask for detailed quotes including all costs",
        "Request samples from your top 3 choices",
        "Negotiate terms including quality guarantees",
        "Document all communications and terms"
      ]
    },
    previousLesson: "amazon-fba-lesson-3",
    nextLesson: "amazon-fba-lesson-5"
  },
  {
    id: "amazon-fba-lesson-5",
    title: "Sales Validation",
    description: "How to validate product demand and sales potential before large wholesale investments",
    duration: "25 minutes",
    videoUrl: "/videos/amazon-fba/lesson-5.mp4",
    keyPoints: [
      "Use Amazon's Best Seller Rank (BSR) to estimate sales volume and demand",
      "Analyze competitor listings to understand market saturation and pricing strategies",
      "Research keyword search volume and trends to validate market interest",
      "Test with small quantities before committing to large wholesale orders",
      "Monitor seasonal trends and market changes that could affect demand"
    ],
    quiz: [
      {
        id: "q1",
        question: "What does BSR (Best Seller Rank) indicate?",
        options: [
          "Product quality",
          "Sales volume and demand relative to other products",
          "Shipping speed",
          "Customer satisfaction"
        ],
        correctAnswer: 1,
        explanation: "BSR indicates how well a product sells compared to other products in the same category."
      },
      {
        id: "q2",
        question: "Why should you test with small quantities first?",
        options: [
          "To save money on initial orders",
          "To validate demand before large investments",
          "To avoid Amazon's receiving limits",
          "To get faster shipping"
        ],
        correctAnswer: 1,
        explanation: "Testing with small quantities validates demand and reduces risk before committing to large wholesale investments."
      },
      {
        id: "q3",
        question: "What should you monitor for market changes?",
        options: [
          "Only your own sales",
          "Seasonal trends, competitor actions, and market shifts",
          "Just Amazon fees",
          "Only supplier prices"
        ],
        correctAnswer: 1,
        explanation: "Monitor all factors that could affect demand including seasonal trends, competitor actions, and market shifts."
      }
    ],
    homework: {
      id: "hw5",
      title: "Market Validation Analysis",
      description: "Conduct comprehensive market validation for 3 wholesale products. Analyze BSR, competition, and seasonal trends.",
      estimatedTime: "3 hours",
      deliverable: "Market validation report with demand analysis and risk assessment",
      tips: [
        "Use multiple tools to cross-reference data",
        "Analyze at least 6 months of historical data",
        "Consider both online and offline market factors",
        "Document your assumptions and methodology",
        "Create a risk assessment for each product"
      ]
    },
    previousLesson: "amazon-fba-lesson-4",
    nextLesson: "amazon-fba-lesson-6"
  },
  {
    id: "amazon-fba-lesson-6",
    title: "Competition Management",
    description: "Strategies for competing effectively in the wholesale Amazon marketplace",
    duration: "30 minutes",
    videoUrl: "/videos/amazon-fba/lesson-6.mp4",
    keyPoints: [
      "Monitor competitor pricing and inventory levels to stay competitive",
      "Use automated repricing tools to maintain optimal pricing strategies",
      "Differentiate through superior customer service and fast shipping",
      "Build relationships with suppliers for exclusive deals and better pricing",
      "Focus on products where you can add unique value or better service"
    ],
    quiz: [
      {
        id: "q1",
        question: "What's the best way to stay competitive in wholesale?",
        options: [
          "Always have the lowest price",
          "Monitor competitors and differentiate through service and relationships",
          "Copy competitor strategies exactly",
          "Ignore the competition completely"
        ],
        correctAnswer: 1,
        explanation: "Stay competitive by monitoring competitors and differentiating through superior service and supplier relationships."
      },
      {
        id: "q2",
        question: "Why are supplier relationships important for competition?",
        options: [
          "They're required by law",
          "They provide exclusive deals and better pricing advantages",
          "They reduce shipping costs",
          "They're just nice to have"
        ],
        correctAnswer: 1,
        explanation: "Strong supplier relationships provide exclusive deals and better pricing that competitors can't match."
      },
      {
        id: "q3",
        question: "What should you focus on to differentiate from competitors?",
        options: [
          "Only product quality",
          "Unique value, better service, and exclusive supplier relationships",
          "Just lower prices",
          "Only faster shipping"
        ],
        correctAnswer: 1,
        explanation: "Differentiate through unique value propositions, superior service, and exclusive supplier relationships."
      }
    ],
    homework: {
      id: "hw6",
      title: "Competitive Analysis & Strategy",
      description: "Analyze 5 main competitors in your wholesale niche. Develop a competitive strategy based on your findings.",
      estimatedTime: "3 hours",
      deliverable: "Competitive analysis report and strategy document",
      tips: [
        "Monitor competitor pricing, inventory, and customer service",
        "Identify gaps in the market you can fill",
        "Analyze competitor strengths and weaknesses",
        "Develop unique value propositions",
        "Create a plan for building competitive advantages"
      ]
    },
    previousLesson: "amazon-fba-lesson-5",
    nextLesson: "amazon-fba-lesson-7"
  },
  {
    id: "amazon-fba-lesson-7",
    title: "Scaling to Other Countries",
    description: "Expanding your wholesale FBA business to international Amazon marketplaces",
    duration: "25 minutes",
    videoUrl: "/videos/amazon-fba/lesson-7.mp4",
    keyPoints: [
      "Research different Amazon marketplaces for demand and competition levels",
      "Understand tax implications and compliance requirements for each country",
      "Adapt your product selection and pricing for local market preferences",
      "Use Amazon's Global Selling program to manage multiple marketplaces efficiently",
      "Start with English-speaking markets before expanding to non-English markets"
    ],
    quiz: [
      {
        id: "q1",
        question: "What should you research before expanding to new countries?",
        options: [
          "Only shipping costs",
          "Demand, competition, tax implications, and compliance requirements",
          "Just product prices",
          "Only language requirements"
        ],
        correctAnswer: 1,
        explanation: "Research all aspects including demand, competition, tax implications, and compliance requirements before expanding."
      },
      {
        id: "q2",
        question: "Why start with English-speaking markets?",
        options: [
          "They're always more profitable",
          "Easier communication and fewer language barriers",
          "Lower competition",
          "Faster shipping times"
        ],
        correctAnswer: 1,
        explanation: "English-speaking markets have fewer language barriers and are easier to navigate initially."
      },
      {
        id: "q3",
        question: "What program helps manage multiple marketplaces?",
        options: [
          "Amazon Prime",
          "Amazon's Global Selling program",
          "Amazon Business",
          "Amazon Fresh"
        ],
        correctAnswer: 1,
        explanation: "Amazon's Global Selling program helps manage multiple international marketplaces efficiently."
      }
    ],
    homework: {
      id: "hw7",
      title: "International Expansion Research",
      description: "Research 3 potential international Amazon marketplaces. Analyze demand, competition, and compliance requirements for each.",
      estimatedTime: "3 hours",
      deliverable: "International expansion analysis report",
      tips: [
        "Focus on markets with strong demand for your products",
        "Research tax and compliance requirements thoroughly",
        "Analyze local competition and pricing",
        "Consider cultural and language differences",
        "Create a prioritized expansion roadmap"
      ]
    },
    previousLesson: "amazon-fba-lesson-6",
    nextLesson: "amazon-fba-lesson-8"
  },
  {
    id: "amazon-fba-lesson-8",
    title: "Chinese Product Sourcing Method",
    description: "Advanced strategies for sourcing wholesale products directly from Chinese manufacturers",
    duration: "35 minutes",
    videoUrl: "/videos/amazon-fba/lesson-8.mp4",
    keyPoints: [
      "Use Alibaba, Made-in-China, and Global Sources for comprehensive supplier research",
      "Always verify supplier credentials through trade assurance and third-party verification",
      "Visit factories in person when possible for quality control and relationship building",
      "Negotiate favorable terms including MOQs, payment terms, and quality guarantees",
      "Use sourcing agents for complex negotiations and quality control when needed"
    ],
    quiz: [
      {
        id: "q1",
        question: "What platforms are best for finding Chinese suppliers?",
        options: [
          "Only Alibaba",
          "Alibaba, Made-in-China, and Global Sources",
          "Just Google",
          "Only trade shows"
        ],
        correctAnswer: 1,
        explanation: "Use multiple platforms including Alibaba, Made-in-China, and Global Sources for comprehensive supplier research."
      },
      {
        id: "q2",
        question: "When should you visit factories in person?",
        options: [
          "Never - it's too expensive",
          "When possible, for quality control and relationship building",
          "Only for very large orders",
          "Only if you speak Chinese"
        ],
        correctAnswer: 1,
        explanation: "Visiting factories in person helps with quality control and building stronger supplier relationships."
      },
      {
        id: "q3",
        question: "What should you always verify about Chinese suppliers?",
        options: [
          "Only their prices",
          "Credentials, trade assurance, and third-party verification",
          "Just their location",
          "Only their product photos"
        ],
        correctAnswer: 1,
        explanation: "Always verify supplier credentials through trade assurance and third-party verification services."
      }
    ],
    homework: {
      id: "hw8",
      title: "Chinese Supplier Research & Outreach",
      description: "Research 15 Chinese suppliers for your wholesale products. Contact 8 of them for quotes and samples.",
      estimatedTime: "4 hours",
      deliverable: "Chinese supplier analysis and communication records",
      tips: [
        "Use multiple sourcing platforms for comprehensive research",
        "Verify all supplier credentials thoroughly",
        "Request detailed quotes and samples",
        "Negotiate terms including quality guarantees",
        "Document all communications and terms"
      ]
    },
    previousLesson: "amazon-fba-lesson-7",
    nextLesson: "amazon-fba-lesson-9"
  },
  {
    id: "amazon-fba-lesson-9",
    title: "Legality and Forming a Company",
    description: "Legal requirements and business structure for Amazon FBA wholesale operations",
    duration: "30 minutes",
    videoUrl: "/videos/amazon-fba/lesson-9.mp4",
    keyPoints: [
      "Choose the right business structure: LLC, Corporation, or Sole Proprietorship based on your needs",
      "Understand tax implications for international business operations",
      "Comply with Amazon's seller policies and terms of service",
      "Obtain necessary business licenses and permits for your operations",
      "Consider consulting with legal and tax professionals for complex international operations"
    ],
    quiz: [
      {
        id: "q1",
        question: "What factors should influence your business structure choice?",
        options: [
          "Only personal preference",
          "Liability protection, tax implications, and operational needs",
          "Just the cost of formation",
          "Only the name you want"
        ],
        correctAnswer: 1,
        explanation: "Choose business structure based on liability protection, tax implications, and operational requirements."
      },
      {
        id: "q2",
        question: "Why is understanding tax implications important?",
        options: [
          "It's required by law",
          "It affects profitability and compliance requirements",
          "It's just good practice",
          "It reduces competition"
        ],
        correctAnswer: 1,
        explanation: "Understanding tax implications is crucial for profitability and legal compliance in international business."
      },
      {
        id: "q3",
        question: "When should you consult legal professionals?",
        options: [
          "Never - it's too expensive",
          "For complex international operations and compliance issues",
          "Only if you get sued",
          "Only for large companies"
        ],
        correctAnswer: 1,
        explanation: "Consult legal professionals for complex international operations and compliance issues to avoid costly mistakes."
      }
    ],
    homework: {
      id: "hw9",
      title: "Business Structure & Legal Compliance",
      description: "Research business structure options and legal requirements for your Amazon FBA wholesale business. Create a compliance checklist.",
      estimatedTime: "3 hours",
      deliverable: "Business structure analysis and compliance checklist",
      tips: [
        "Research different business structures and their implications",
        "Identify all required licenses and permits",
        "Understand tax obligations for international operations",
        "Create a compliance timeline and checklist",
        "Consider consulting with professionals for complex issues"
      ]
    },
    previousLesson: "amazon-fba-lesson-8"
  }
];

export const aiAutomationCourse: LessonContent[] = [
  {
    id: "ai-automation-lesson-1",
    title: "AI Business Landscape & Opportunities",
    description: "Understanding the current AI market and identifying profitable automation opportunities",
    duration: "20 minutes",
    videoUrl: "/videos/ai-automation/lesson-1.mp4",
    keyPoints: [
      "AI automation is a $15+ billion market growing at 25% annually",
      "Small businesses need AI solutions but lack technical expertise",
      "You can start with no-code tools and scale to custom development",
      "Focus on solving specific business problems, not just using cool technology",
      "Thailand's growing tech scene offers great networking opportunities"
    ],
    quiz: [
      {
        id: "q1",
        question: "What's the key to success in AI automation business?",
        options: [
          "Using the newest AI technology",
          "Solving specific business problems",
          "Charging the highest prices",
          "Working with only large corporations"
        ],
        correctAnswer: 1,
        explanation: "Focus on solving real business problems rather than just showcasing technology."
      },
      {
        id: "q2",
        question: "What's the annual growth rate of the AI automation market?",
        options: [
          "5%",
          "15%", 
          "25%",
          "50%"
        ],
        correctAnswer: 2,
        explanation: "The AI automation market is growing at approximately 25% annually, indicating strong demand."
      },
      {
        id: "q3",
        question: "What advantage do small businesses have in AI adoption?",
        options: [
          "They have unlimited budgets",
          "They need solutions but lack technical expertise",
          "They don't need AI",
          "They prefer complex solutions"
        ],
        correctAnswer: 1,
        explanation: "Small businesses represent a huge opportunity because they need AI solutions but often lack the technical expertise to implement them."
      }
    ],
    homework: {
      id: "hw1",
      title: "Market Research & Opportunity Identification",
      description: "Research 5 local businesses or online companies and identify 3 specific processes that could be automated with AI.",
      estimatedTime: "3 hours",
      deliverable: "Business analysis document with automation opportunities",
      tips: [
        "Look for repetitive, time-consuming tasks",
        "Focus on data entry, customer service, and content creation",
        "Interview business owners about their biggest time wasters",
        "Research what competitors are doing for automation",
        "Quantify the potential time/cost savings for each opportunity"
      ]
    },
    nextLesson: "ai-automation-lesson-2"
  },
  {
    id: "ai-automation-lesson-2",
    title: "No-Code AI Tools Mastery",
    description: "Learn to use Zapier, Make.com, and other platforms to build automation without coding",
    duration: "30 minutes",
    videoUrl: "/videos/ai-automation/lesson-2.mp4",
    keyPoints: [
      "Zapier connects 5,000+ apps with simple if-then automation",
      "Make.com (formerly Integromat) offers more complex visual workflows",
      "AI tools like ChatGPT, Claude, and Midjourney can be integrated",
      "Start with simple 2-3 step automations before building complex workflows",
      "Test thoroughly and build error handling into your automations"
    ],
    quiz: [
      {
        id: "q1",
        question: "What's the main advantage of no-code automation platforms?",
        options: [
          "They're completely free",
          "No technical skills required to get started",
          "They only work with Google products",
          "They're only for large companies"
        ],
        correctAnswer: 1,
        explanation: "No-code platforms allow anyone to create automations without programming knowledge."
      },
      {
        id: "q2",
        question: "Which platform is better for complex visual workflows?",
        options: [
          "Zapier",
          "Make.com (Integromat)",
          "Gmail",
          "Excel"
        ],
        correctAnswer: 1,
        explanation: "Make.com offers more sophisticated visual workflow builders for complex automations."
      },
      {
        id: "q3",
        question: "What should you always include in your automations?",
        options: [
          "Complex branching logic",
          "Error handling and testing",
          "As many steps as possible",
          "Expensive premium tools"
        ],
        correctAnswer: 1,
        explanation: "Error handling and thorough testing prevent automations from breaking and causing client issues."
      }
    ],
    homework: {
      id: "hw2",
      title: "Build Your First Automation",
      description: "Create 3 working automations using Zapier or Make.com for common business tasks like lead capture, email follow-up, or social media posting.",
      estimatedTime: "4 hours",
      deliverable: "3 functioning automations with documentation",
      tips: [
        "Start with your own business processes or personal workflows",
        "Document each step with screenshots for client presentations",
        "Test with real data, not just dummy information",
        "Time how long the manual process takes vs. the automated version",
        "Create templates you can customize for different clients"
      ]
    },
    previousLesson: "ai-automation-lesson-1",
    nextLesson: "ai-automation-lesson-3"
  },
  {
    id: "ai-automation-lesson-3",
    title: "Client Acquisition & Pricing Strategies",
    description: "How to find and price AI automation projects for maximum profitability",
    duration: "25 minutes",
    videoUrl: "/videos/ai-automation/lesson-3.mp4",
    keyPoints: [
      "Start with your network and offer free pilot projects to build case studies",
      "Price based on value delivered, not time spent",
      "Offer monthly retainers for ongoing automation maintenance",
      "Use LinkedIn and cold email to reach decision makers",
      "Partner with web designers and business consultants for referrals"
    ],
    quiz: [
      {
        id: "q1",
        question: "How should you price AI automation projects?",
        options: [
          "Always charge by the hour",
          "Price based on value delivered",
          "Use the lowest possible rates",
          "Copy competitor pricing exactly"
        ],
        correctAnswer: 1,
        explanation: "Value-based pricing captures more of the ROI you create for clients and is more profitable."
      },
      {
        id: "q2",
        question: "What's the best way to start getting clients?",
        options: [
          "Only use paid advertising",
          "Start with your network and offer pilot projects",
          "Wait for clients to find you",
          "Only work with Fortune 500 companies"
        ],
        correctAnswer: 1,
        explanation: "Starting with your network and offering pilot projects builds case studies and testimonials."
      },
      {
        id: "q3",
        question: "Why are monthly retainers valuable?",
        options: [
          "They're easier to calculate",
          "They provide recurring revenue and ongoing support",
          "Clients always prefer them",
          "They require less work"
        ],
        correctAnswer: 1,
        explanation: "Retainers provide predictable recurring revenue and help maintain client relationships."
      }
    ],
    homework: {
      id: "hw3",
      title: "Create Your Pricing Strategy",
      description: "Develop a comprehensive pricing strategy including project rates, retainer options, and value proposition for different client types.",
      estimatedTime: "3 hours",
      deliverable: "Pricing strategy document and client outreach plan",
      tips: [
        "Research what similar services cost in your market",
        "Calculate the ROI your automations provide to clients",
        "Create different packages for different business sizes",
        "Include setup fees and ongoing maintenance costs",
        "Prepare clear explanations of your value proposition"
      ]
    },
    previousLesson: "ai-automation-lesson-2",
    nextLesson: "ai-automation-lesson-4"
  }
];

export const consultingCourse: LessonContent[] = [
  {
    id: "consulting-lesson-1",
    title: "Expertise Assessment & Positioning",
    description: "Identify your unique expertise and position yourself as a premium consultant",
    duration: "25 minutes",
    videoUrl: "/videos/consulting/lesson-1.mp4",
    keyPoints: [
      "Your expertise doesn't need to be world-class, just better than your target clients",
      "Combine multiple skills to create unique positioning",
      "Past corporate experience often translates to valuable consulting expertise",
      "Document your wins, case studies, and client results from day one",
      "Confidence and communication skills matter as much as technical expertise"
    ],
    quiz: [
      {
        id: "q1",
        question: "What level of expertise do you need to start consulting?",
        options: [
          "World-class expert level",
          "Better than your target clients",
          "PhD in your field",
          "20+ years of experience"
        ],
        correctAnswer: 1,
        explanation: "You only need to be more knowledgeable than your target clients, not a world expert."
      },
      {
        id: "q2",
        question: "What's the best way to create unique positioning?",
        options: [
          "Copy successful competitors",
          "Be the cheapest option",
          "Combine multiple skills into unique expertise",
          "Focus only on one narrow skill"
        ],
        correctAnswer: 2,
        explanation: "Combining multiple skills creates unique positioning that's harder for competitors to replicate."
      },
      {
        id: "q3",
        question: "When should you start documenting case studies?",
        options: [
          "After 5 years in business",
          "From day one",
          "Only for big clients",
          "Never - focus on new clients"
        ],
        correctAnswer: 1,
        explanation: "Document everything from the beginning - even small wins become powerful testimonials."
      }
    ],
    homework: {
      id: "hw1",
      title: "Expertise Audit & Positioning Statement",
      description: "Complete a comprehensive audit of your skills, experience, and knowledge. Create a unique positioning statement and identify your ideal client profile.",
      estimatedTime: "3 hours",
      deliverable: "Expertise audit document and one-page positioning statement",
      tips: [
        "List every job, project, and skill you've ever had",
        "Ask former colleagues what you're known for",
        "Look for intersections between different areas of expertise",
        "Research what specific problems your target market faces",
        "Write your positioning as if explaining to a potential client"
      ]
    },
    nextLesson: "consulting-lesson-2"
  },
  {
    id: "consulting-lesson-2",
    title: "Premium Pricing & Value Communication",
    description: "Learn to price your consulting services based on value and communicate your worth effectively",
    duration: "30 minutes",
    videoUrl: "/videos/consulting/lesson-2.mp4",
    keyPoints: [
      "Price based on the value you create, not the time you spend",
      "High prices often increase perceived value and attract better clients",
      "Package your expertise into clearly defined outcomes",
      "Use case studies and ROI examples to justify your rates",
      "Avoid competing on price - compete on results and expertise"
    ],
    quiz: [
      {
        id: "q1",
        question: "How should you price your consulting services?",
        options: [
          "Based on what competitors charge",
          "Based on the value you create for clients",
          "Always use hourly rates",
          "Start with the lowest possible price"
        ],
        correctAnswer: 1,
        explanation: "Value-based pricing allows you to capture more of the ROI you create for clients."
      },
      {
        id: "q2",
        question: "What effect do higher prices often have?",
        options: [
          "They always scare away clients",
          "They increase perceived value and attract better clients",
          "They make you less credible",
          "They only work for large companies"
        ],
        correctAnswer: 1,
        explanation: "Higher prices often signal higher quality and attract clients who value expertise over low cost."
      },
      {
        id: "q3",
        question: "What should you compete on instead of price?",
        options: [
          "Speed of delivery only",
          "Results and expertise",
          "Number of hours worked",
          "Lowest cost guarantee"
        ],
        correctAnswer: 1,
        explanation: "Competing on results and expertise allows you to maintain premium pricing and attract quality clients."
      }
    ],
    homework: {
      id: "hw2",
      title: "Develop Your Pricing Strategy",
      description: "Create a comprehensive pricing strategy with different service packages and clear value propositions for each level.",
      estimatedTime: "4 hours",
      deliverable: "Pricing strategy document with 3 service packages",
      tips: [
        "Research what outcomes are worth to your target clients",
        "Create bronze, silver, and gold packages with different value levels",
        "Include ROI calculations and success stories",
        "Practice explaining your value proposition out loud",
        "Test your pricing with a few trusted contacts first"
      ]
    },
    previousLesson: "consulting-lesson-1",
    nextLesson: "consulting-lesson-3"
  },
  {
    id: "consulting-lesson-3",
    title: "Client Acquisition & Professional Network Building",
    description: "Build a powerful professional network and systematic approach to finding high-value clients",
    duration: "35 minutes",
    videoUrl: "/videos/consulting/lesson-3.mp4",
    keyPoints: [
      "LinkedIn is your most powerful tool for B2B consulting",
      "Create valuable content to demonstrate your expertise",
      "Warm introductions convert 10x better than cold outreach",
      "Speaking at industry events establishes thought leadership",
      "Past colleagues and clients are your best referral sources"
    ],
    quiz: [
      {
        id: "q1",
        question: "What's the most effective way to get consulting clients?",
        options: [
          "Cold calling random companies",
          "Warm introductions through your network",
          "Paid advertising only",
          "Waiting for referrals"
        ],
        correctAnswer: 1,
        explanation: "Warm introductions have much higher conversion rates and build trust faster."
      },
      {
        id: "q2",
        question: "Why is creating content important for consultants?",
        options: [
          "It's required by law",
          "It demonstrates expertise and attracts clients",
          "It's free advertising",
          "Everyone else is doing it"
        ],
        correctAnswer: 1,
        explanation: "Content marketing demonstrates your expertise and helps potential clients find and trust you."
      },
      {
        id: "q3",
        question: "Who are typically your best referral sources?",
        options: [
          "Random strangers",
          "Past colleagues and clients",
          "Competitors",
          "Social media followers"
        ],
        correctAnswer: 1,
        explanation: "People who have worked with you know your capabilities and are most likely to refer quality clients."
      }
    ],
    homework: {
      id: "hw3",
      title: "Network Mapping & Outreach Plan",
      description: "Create a comprehensive map of your professional network and develop a systematic outreach plan to reactivate dormant connections.",
      estimatedTime: "3 hours",
      deliverable: "Network map and 30-day outreach plan",
      tips: [
        "Use LinkedIn to identify and reconnect with past colleagues",
        "Create a spreadsheet of all professional contacts",
        "Craft personalized messages that offer value first",
        "Set up Google alerts for your contacts' companies",
        "Plan to reach out to 5 people per week consistently"
      ]
    },
    previousLesson: "consulting-lesson-2"
  }
];
