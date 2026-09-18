export type HeroContent = {
  tagline: string;
  headline: string;
  subheadline: string;
};

export type AboutContent = {
  lead: string;
  paragraph_1: string;
  paragraph_2: string;
  closing_line: string;
  founders_intro: string;
};

export type SettingsContent = {
  contact_email: string;
  instagram_url: string;
  linkedin_url: string;
};

export type FeaturedWorkItem = {
  id: string;
  name: string;
  tag: string;
  image_url?: string | null;
};

export type Founder = {
  id: string;
  name: string;
  role: string;
  image_url?: string | null;
};

export type CoreValue = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  body: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type ServicePackage = {
  id: string;
  name: string;
  features: string[];
};

export type ServiceGroupWithPackages = {
  id: string;
  title: string;
  packages: ServicePackage[];
};

export const DEFAULT_HERO: HeroContent = {
  tagline: "The home for creative visuals",
  headline: "We create visuals that make brands impossible to ignore.",
  subheadline: "You run your business. We'll create the content.",
};

export const DEFAULT_ABOUT: AboutContent = {
  lead: "We create what makes people stop, look and remember.",
  paragraph_1:
    "Content Casa is a creative marketing agency built for ambitious businesses that want to grow without the constant pressure of managing their own marketing. We combine visual creativity with proven strategy to create bespoke content and marketing that makes brands more memorable, authentic and impactful.",
  paragraph_2:
    "From content creation and creative direction to social media management and campaign strategy, we take care of the process from concept to execution. We get to know your business, understand what you need and bring forward creative solutions that make your life easier and your marketing work harder.",
  closing_line: "Creative without the chaos. Strategy with purpose. Marketing you can rely on.",
  founders_intro:
    "10 years combined experience, First Class BA (Hons) Advertising and Marketing Communications, and two awards for creative media production.",
};

export const DEFAULT_SETTINGS: SettingsContent = {
  contact_email: "hello@contentcasa.co",
  instagram_url: "#",
  linkedin_url: "#",
};

export const DEFAULT_WORK_CATEGORIES = [
  { id: "beauty", label: "Beauty & Aesthetics" },
  { id: "hotels", label: "Hotels & Experiences" },
  { id: "food", label: "Food & Hospitality" },
  { id: "health", label: "Health & Wellness" },
  { id: "lifestyle", label: "Lifestyle & Independent Brands" },
];

export const DEFAULT_ADD_ONS = [
  { id: "email", label: "Email marketing" },
  { id: "sms", label: "SMS marketing" },
  { id: "flyer", label: "Flyer design" },
  { id: "business-card", label: "Business card design" },
  { id: "long-form", label: "Long form videos" },
  { id: "logo", label: "Logo" },
  { id: "raw-footage", label: "Raw footage library" },
  { id: "extra-platform", label: "Additional social media platform (Instagram, TikTok, Facebook, LinkedIn)" },
];

export const DEFAULT_FEATURED_WORK: FeaturedWorkItem[] = [
  { id: "atomic", name: "The Atomic Growth Club", tag: "Influencer campaigns" },
  { id: "feathered-lane", name: "Feathered Lane Studios", tag: "Social strategy & creation" },
  { id: "lazy-cow", name: "The Lazy Cow Cocktails", tag: "Social strategy & creation" },
];

export const DEFAULT_FOUNDERS: Founder[] = [
  { id: "rochelle", name: "Rochelle", role: "Co-founder, Content Casa" },
  { id: "ria", name: "Ria", role: "Co-founder, Content Casa" },
  { id: "naiya", name: "Naiya", role: "Co-founder, Content Casa" },
];

export const DEFAULT_CORE_VALUES: CoreValue[] = [
  {
    id: "creativity",
    number: "01",
    title: "Creativity & Innovation",
    tagline: "Challenging the ordinary.",
    body: "We believe in challenging the expected. We champion forward-thinking, fresh perspectives and creative approaches that are uniquely tailored to every brand we work with.",
  },
  {
    id: "trust",
    number: "02",
    title: "Trust & Partnerships",
    tagline: "Your brand is our business.",
    body: "We believe sustainable collaboration is built on transparency, trust and reliability. Becoming an extension of your team, we treat every project with the same care and commitment as our own.",
  },
  {
    id: "strategy",
    number: "03",
    title: "Strategy & Excellence",
    tagline: "Good isn't good enough.",
    body: "We believe in doing things properly. Every idea is backed by purpose and every detail matters, combining strategic thinking with high quality execution.",
  },
];

export const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  {
    id: "brief",
    title: "Understand the brief",
    description: "We get to know your business, goals and audience so we know exactly what you need.",
  },
  {
    id: "research",
    title: "Research & gather insights",
    description: "We research your market and audience to uncover opportunities and inform our approach.",
  },
  {
    id: "messages",
    title: "Define key messages & choose appropriate channels",
    description: "We establish what to say, who to reach and where your brand needs to show up.",
  },
  {
    id: "creative",
    title: "Develop creative direction",
    description: "We turn strategy into creative concepts, visuals and content that feel true to your brand.",
  },
  {
    id: "launch",
    title: "Launch & manage",
    description: "We bring everything to life and handle the content, social media and marketing so you don't have to.",
  },
  {
    id: "review",
    title: "Review & refine",
    description: "We measure what's working and use those insights to continually improve your marketing.",
  },
];

export const DEFAULT_SERVICE_GROUPS: ServiceGroupWithPackages[] = [
  {
    id: "smm",
    title: "Social Media Marketing Management",
    packages: [
      {
        id: "content",
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
        id: "growth",
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
        id: "social-takeover",
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
        id: "content-day",
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
        id: "campaign-creation",
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
        id: "campaign-production",
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
