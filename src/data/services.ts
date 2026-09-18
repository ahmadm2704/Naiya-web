export type Package = {
  name: string;
  features: string[];
};

export type ServiceGroup = {
  id: string;
  title: string;
  packages: Package[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "social-media-marketing-management",
    title: "Social Media Marketing Management",
    packages: [
      {
        name: "Content",
        features: [
          "4 hour shoot",
          "Tailored content plan",
          "12 edited content assets",
          "Multi-location coverage (10 mile radius)",
          "Studio hire available",
          "Caption generation",
          "Monthly engagement review",
          "Comment management",
        ],
      },
      {
        name: "Growth",
        features: [
          "4 hour shoot",
          "Tailored content plan",
          "15 edited content assets",
          "Multi-location coverage",
          "Studio hire available",
          "Caption generation",
          "Content calendar",
          "Content publishing",
          "2-3 stories per week",
          "Monthly full analytics review",
          "Community engagement management",
          "2 social media platforms",
        ],
      },
      {
        name: "Social Takeover",
        features: [
          "4-6 hour shoot",
          "Tailored content plan",
          "20 edited content assets",
          "Multi-location coverage",
          "Studio hire available",
          "Caption generation",
          "Content calendar",
          "Content publishing",
          "2-3 stories per week",
          "Monthly full analytics review",
          "Community engagement management",
          "Engagement & audience growth",
          "DM management",
          "3 social media platforms",
        ],
      },
    ],
  },
  {
    id: "shoots",
    title: "Shoots",
    packages: [
      {
        name: "Content Day",
        features: [
          "Content plan/moodboard",
          "Creative strategy discussion",
          "2 hour shoot",
          "Creative direction",
          "10 edited visuals",
          "Photography and videography — posts and reels",
          "Optional 1 month review call",
        ],
      },
      {
        name: "Campaign Creation",
        features: [
          "Research & audience analysis",
          "Concept creation",
          "Creative strategy discussion",
          "Tailored visuals",
          "Tailored 2 hour photo or video shoot",
          "Logistics/location planning",
          "Edited campaign content",
          "Optional studio hire",
        ],
      },
      {
        name: "Campaign Production",
        features: [
          "Full creative concept",
          "Pre-production",
          "Professional photo/video production",
          "Scripts/storyboards",
          "Social cutdowns",
          "Campaign graphics",
          "Copywriting",
          "Campaign launch strategy",
          "Campaign performance tracking & reporting",
        ],
      },
    ],
  },
];

export const ADD_ONS = [
  "Email marketing",
  "SMS marketing",
  "Flyer design",
  "Business card design",
  "Long form videos",
  "Logo",
  "Raw footage library",
  "Additional social media platform (Instagram, TikTok, Facebook, LinkedIn)",
];

export const METHOD_STEPS = [
  {
    title: "Understand the brief",
    description:
      "We get to know your business, goals and audience so we know exactly what you need.",
  },
  {
    title: "Research & gather insights",
    description:
      "We research your market and audience to uncover opportunities and inform our approach.",
  },
  {
    title: "Define key messages & choose appropriate channels",
    description:
      "We establish what to say, who to reach and where your brand needs to show up.",
  },
  {
    title: "Develop creative direction",
    description:
      "We turn strategy into creative concepts, visuals and content that feel true to your brand.",
  },
  {
    title: "Launch & manage",
    description:
      "We bring everything to life and handle the content, social media and marketing so you don't have to.",
  },
  {
    title: "Review & refine",
    description:
      "We measure what's working and use those insights to continually improve your marketing.",
  },
];
