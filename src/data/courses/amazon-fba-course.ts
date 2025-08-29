import { LessonContent } from "@/components/lesson/lesson-viewer";

export const amazonFBACourse: LessonContent[] = [
  {
    id: "amazon-fba-lesson-1",
    title: "Amazon FBA Fundamentals",
    description: "Understanding the Amazon FBA business model and opportunity in Thailand",
    duration: "15 minutes",
    videoUrl: "/videos/amazon-fba/lesson-1.mp4",
    keyPoints: [
      "Amazon FBA allows you to sell products without handling inventory directly",
      "Thailand's strategic location makes it perfect for sourcing products",
      "You can start with as little as $1,000-$3,000 in initial investment",
      "The key is finding products with good demand and low competition",
      "Amazon handles storage, packing, shipping, and customer service for you"
    ],
    quiz: [
      {
        id: "q1",
        question: "What does FBA stand for in Amazon FBA?",
        options: [
          "Fast Business Amazon",
          "Fulfillment By Amazon", 
          "Full Business Analytics",
          "Foreign Business Access"
        ],
        correctAnswer: 1,
        explanation: "FBA stands for Fulfillment By Amazon, where Amazon handles storage and shipping of your products."
      },
      {
        id: "q2", 
        question: "What is the main advantage of Amazon FBA for digital nomads?",
        options: [
          "You need to be physically present to ship products",
          "Amazon handles storage, packing, and shipping for you",
          "You can only sell in your home country",
          "It requires a large warehouse"
        ],
        correctAnswer: 1,
        explanation: "The main advantage is that Amazon handles all the logistics, allowing you to run the business from anywhere."
      },
      {
        id: "q3",
        question: "What makes Thailand a good location for Amazon FBA sellers?",
        options: [
          "High labor costs",
          "Strategic location for sourcing products",
          "Limited internet access",
          "Complex shipping regulations"
        ],
        correctAnswer: 1,
        explanation: "Thailand's strategic location in Southeast Asia makes it ideal for sourcing products from China and other Asian manufacturers."
      }
    ],
    homework: {
      id: "hw1",
      title: "Research Your Niche",
      description: "Identify 3 potential product categories you're interested in selling on Amazon. Research the competition and demand for each category.",
      estimatedTime: "2 hours",
      deliverable: "A document listing 3 product categories with basic research notes",
      tips: [
        "Use Amazon's search bar to see what products come up when you type keywords",
        "Look at the number of reviews products have - this indicates demand",
        "Check if there are sponsored ads - this shows commercial interest",
        "Consider your own interests and expertise",
        "Think about products you use or would like to improve"
      ]
    },
    nextLesson: "amazon-fba-lesson-2"
  },
  {
    id: "amazon-fba-lesson-2",
    title: "Product Research Mastery",
    description: "Learn proven methods to find profitable products with low competition",
    duration: "25 minutes", 
    videoUrl: "/videos/amazon-fba/lesson-2.mp4",
    keyPoints: [
      "Use tools like Helium 10, Jungle Scout, or AMZScout for product research",
      "Look for products with 3,000-10,000 monthly searches and fewer than 500 reviews on page 1",
      "Calculate your potential profit margin: aim for at least 30% after all costs",
      "Avoid seasonal products, oversized items, and highly regulated categories",
      "Validate demand using Google Trends and keyword research tools"
    ],
    quiz: [
      {
        id: "q1",
        question: "What's the ideal monthly search volume range for a new product?",
        options: [
          "100-1,000 searches",
          "3,000-10,000 searches",
          "50,000-100,000 searches", 
          "1,000,000+ searches"
        ],
        correctAnswer: 1,
        explanation: "3,000-10,000 monthly searches indicates good demand without being overly competitive."
      },
      {
        id: "q2",
        question: "What minimum profit margin should you aim for?",
        options: [
          "10%",
          "20%", 
          "30%",
          "50%"
        ],
        correctAnswer: 2,
        explanation: "A 30% profit margin after all costs provides a healthy buffer for your Amazon FBA business."
      },
      {
        id: "q3",
        question: "Which product categories should beginners typically avoid?",
        options: [
          "Home and garden items",
          "Seasonal products and oversized items",
          "Kitchen accessories",
          "Pet supplies"
        ],
        correctAnswer: 1,
        explanation: "Seasonal products have inconsistent demand, and oversized items have higher storage and shipping costs."
      }
    ],
    homework: {
      id: "hw2",
      title: "Complete Product Analysis",
      description: "Using the criteria from this lesson, analyze 10 specific products in your chosen niches. Create a spreadsheet ranking them by opportunity score.",
      estimatedTime: "3 hours",
      deliverable: "Spreadsheet with 10 products analyzed for search volume, competition, and profit potential",
      tips: [
        "Use free tools like AMZ One Step or paid tools if available",
        "Check the Best Seller Rank (BSR) - lower numbers mean higher sales",
        "Look at competitor pricing and review count",
        "Calculate estimated monthly revenue using BSR estimator tools",
        "Factor in Amazon fees, product cost, and shipping when calculating profit"
      ]
    },
    previousLesson: "amazon-fba-lesson-1",
    nextLesson: "amazon-fba-lesson-3"
  },
  {
    id: "amazon-fba-lesson-3",
    title: "Finding Reliable Suppliers",
    description: "How to source quality products from manufacturers, especially in Asia",
    duration: "30 minutes",
    videoUrl: "/videos/amazon-fba/lesson-3.mp4", 
    keyPoints: [
      "Alibaba is the primary platform for finding manufacturers in China",
      "Always order samples before placing large orders",
      "Verify supplier credentials through trade assurance and certifications",
      "Negotiate MOQs (Minimum Order Quantities) and payment terms",
      "Consider using a sourcing agent for quality control and communication"
    ],
    quiz: [
      {
        id: "q1",
        question: "What should you always do before placing a large order with a supplier?",
        options: [
          "Trust their product photos",
          "Order samples first",
          "Place the largest order possible",
          "Skip quality checks to save time"
        ],
        correctAnswer: 1,
        explanation: "Always order samples to verify product quality, packaging, and specifications before committing to large orders."
      },
      {
        id: "q2",
        question: "What does MOQ stand for in supplier negotiations?",
        options: [
          "Maximum Order Quality",
          "Minimum Order Quantity", 
          "Monthly Order Quota",
          "Manufacturer Order Quality"
        ],
        correctAnswer: 1,
        explanation: "MOQ stands for Minimum Order Quantity - the smallest order a supplier will accept."
      },
      {
        id: "q3",
        question: "What's a key benefit of using Alibaba's Trade Assurance?",
        options: [
          "Free shipping",
          "Payment protection if order terms aren't met",
          "Guaranteed profit margins",
          "Automatic product photos"
        ],
        correctAnswer: 1,
        explanation: "Trade Assurance protects your payment if the supplier doesn't meet the agreed order terms."
      }
    ],
    homework: {
      id: "hw3",
      title: "Supplier Outreach & Sampling",
      description: "Contact 5 suppliers for your top product choice. Request quotes, MOQs, and order 2-3 samples to compare quality.",
      estimatedTime: "4 hours",
      deliverable: "Supplier comparison sheet and 2-3 physical product samples",
      tips: [
        "Ask for certifications relevant to your product (CE, FCC, etc.)",
        "Inquire about customization options and branding",
        "Get quotes for different order quantities",
        "Ask about production time and shipping options",
        "Request references from other international clients"
      ]
    },
    previousLesson: "amazon-fba-lesson-2",
    nextLesson: "amazon-fba-lesson-4"
  },
  {
    id: "amazon-fba-lesson-4", 
    title: "Amazon Seller Account Setup",
    description: "Setting up your professional seller account and understanding Amazon's requirements",
    duration: "20 minutes",
    videoUrl: "/videos/amazon-fba/lesson-4.mp4",
    keyPoints: [
      "You need a Professional Seller account ($39.99/month) for FBA",
      "Prepare required documents: passport, bank statements, and business registration",
      "Choose your primary marketplace based on your target customers",
      "Understand Amazon's terms of service and seller policies",
      "Set up your tax information correctly for international sellers"
    ],
    quiz: [
      {
        id: "q1",
        question: "How much does an Amazon Professional Seller account cost monthly?",
        options: [
          "$0 (free)",
          "$19.99",
          "$39.99",
          "$99.99"
        ],
        correctAnswer: 2,
        explanation: "Amazon Professional Seller accounts cost $39.99 per month and are required for FBA selling."
      },
      {
        id: "q2",
        question: "Which documents are typically required for account verification?",
        options: [
          "Only an email address",
          "Passport, bank statements, and business registration",
          "Just a credit card",
          "Social media profiles"
        ],
        correctAnswer: 1,
        explanation: "Amazon requires identity verification through official documents for security and compliance."
      },
      {
        id: "q3",
        question: "What should international sellers pay special attention to during setup?",
        options: [
          "Profile photos",
          "Tax information and compliance",
          "Social media links",
          "Color preferences"
        ],
        correctAnswer: 1,
        explanation: "Tax information and international compliance requirements are crucial for international sellers."
      }
    ],
    homework: {
      id: "hw4",
      title: "Account Setup & Verification",
      description: "Create your Amazon Seller Central account, complete verification, and familiarize yourself with the dashboard.",
      estimatedTime: "2 hours",
      deliverable: "Verified Amazon Seller Central account with completed business profile",
      tips: [
        "Have all required documents ready before starting",
        "Use a professional business name and email",
        "Take screenshots of important settings for reference",
        "Set up two-factor authentication for security",
        "Explore all sections of Seller Central to familiarize yourself"
      ]
    },
    previousLesson: "amazon-fba-lesson-3",
    nextLesson: "amazon-fba-lesson-5"
  },
  {
    id: "amazon-fba-lesson-5",
    title: "Product Listing Optimization",
    description: "Creating compelling product listings that convert browsers into buyers",
    duration: "35 minutes",
    videoUrl: "/videos/amazon-fba/lesson-5.mp4",
    keyPoints: [
      "Your main product image must be on a white background with no text",
      "Include relevant keywords in your title, bullets, and description",
      "Use high-quality lifestyle images showing the product in use",
      "Write compelling bullet points focusing on benefits, not just features",
      "Optimize your backend search terms for maximum discoverability"
    ],
    quiz: [
      {
        id: "q1",
        question: "What's required for your main product image?",
        options: [
          "Colorful background with marketing text",
          "White background with no text overlay",
          "Multiple products in one image",
          "Cartoon-style illustration"
        ],
        correctAnswer: 1,
        explanation: "Amazon requires main images to have a pure white background (RGB 255,255,255) with no text."
      },
      {
        id: "q2",
        question: "What should bullet points focus on?",
        options: [
          "Technical specifications only",
          "Benefits to the customer",
          "Company history",
          "Shipping information"
        ],
        correctAnswer: 1,
        explanation: "Bullet points should focus on customer benefits and how the product solves their problems."
      },
      {
        id: "q3",
        question: "How many characters can you use in your product title?",
        options: [
          "50 characters",
          "100 characters",
          "200 characters",
          "Unlimited"
        ],
        correctAnswer: 2,
        explanation: "Amazon allows up to 200 characters for product titles, though shorter, keyword-rich titles often perform better."
      }
    ],
    homework: {
      id: "hw5",
      title: "Create Your Product Listing",
      description: "Draft a complete product listing including title, bullets, description, and gather/create 7 high-quality product images.",
      estimatedTime: "4 hours",
      deliverable: "Complete product listing draft with professional images",
      tips: [
        "Research competitor listings for inspiration",
        "Use tools like Helium 10's Scribbles for keyword optimization",
        "Take professional photos or hire a photographer",
        "Include size comparison images if relevant",
        "Write in a customer-focused tone, not corporate jargon"
      ]
    },
    previousLesson: "amazon-fba-lesson-4",
    nextLesson: "amazon-fba-lesson-6"
  },
  {
    id: "amazon-fba-lesson-6",
    title: "Inventory Management & FBA Shipment",
    description: "How to prepare and send your first inventory shipment to Amazon warehouses",
    duration: "25 minutes",
    videoUrl: "/videos/amazon-fba/lesson-6.mp4",
    keyPoints: [
      "Use Amazon's FBA calculator to estimate fees before ordering inventory",
      "Prepare products according to Amazon's packaging requirements",
      "Create shipment plans and print FBA labels correctly",
      "Understand Amazon's receiving limits and storage fees",
      "Track your shipments and monitor inventory levels regularly"
    ],
    quiz: [
      {
        id: "q1",
        question: "What should you do before ordering large quantities of inventory?",
        options: [
          "Guess the demand",
          "Use Amazon's FBA calculator to estimate fees",
          "Order the maximum possible",
          "Skip fee calculations"
        ],
        correctAnswer: 1,
        explanation: "The FBA calculator helps you understand all costs involved and ensure profitability."
      },
      {
        id: "q2",
        question: "What happens if products aren't packaged according to Amazon's requirements?",
        options: [
          "Nothing - Amazon is flexible",
          "Free repackaging by Amazon",
          "Products may be rejected or you'll be charged prep fees",
          "Automatic refund"
        ],
        correctAnswer: 2,
        explanation: "Improperly packaged products can be rejected or result in additional prep service fees."
      },
      {
        id: "q3",
        question: "How often should you monitor your inventory levels?",
        options: [
          "Once per year",
          "Once per month",
          "Weekly or bi-weekly",
          "Never - Amazon handles it"
        ],
        correctAnswer: 2,
        explanation: "Regular monitoring prevents stockouts and helps you plan reorders effectively."
      }
    ],
    homework: {
      id: "hw6",
      title: "Prepare Your First Shipment",
      description: "Create a shipment plan in Seller Central, properly package your samples, and calculate all associated costs.",
      estimatedTime: "3 hours",
      deliverable: "Completed shipment plan with cost breakdown and packaged products",
      tips: [
        "Double-check Amazon's packaging requirements for your product category",
        "Consider using Amazon's prep service if packaging is complex",
        "Take photos of your packaging process for future reference",
        "Keep detailed records of all costs for tax purposes",
        "Start with a smaller test shipment before ordering large quantities"
      ]
    },
    previousLesson: "amazon-fba-lesson-5",
    nextLesson: "amazon-fba-lesson-7"
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
