// Add React import to fix JSX errors
import React from 'react';
import { Service, ClientPosition, PortfolioProject } from '../types';

export const WHO_YOU_ARE = {
  title: "Creative Technologist & Cultural Futurist",
  summary: "For over two decades, I’ve been building platforms, festivals, and technologies that rewire the relationship between audiences, artists, and culture. My work sits at the intersection of storytelling, technology, and community impact—spanning XR, AI, festivals, theatre, and global cultural innovation.",
  points: [
    "Builder of Hybrid Worlds at the intersection of storytelling, tech, and community.",
    "Expertise in XR, AI, festivals, theatre, and global cultural innovation.",
    "Pioneered platforms like JHBLive and SodaWorld, reaching millions globally.",
    "Recognized by MIT, Accenture, and featured on the BBC."
  ]
};

export const SERVICES: Service[] = [
  {
    title: "Creative Production with AI",
    description: "Teach teams how to produce entire campaigns using AI (text, video, design, voice)."
  },
  {
    title: "AI Ecosystem for Productivity",
    description: "Build and integrate custom AI workflows to supercharge organizational efficiency."
  },
  {
    title: "Design Thinking for the AI Era",
    description: "Apply design thinking frameworks to ideation and problem-solving, enhanced by AI."
  },
  {
    title: "On-Demand Facilitation & Idea Rescue",
    description: "Be the 'ideas ninja' for agencies/teams when they’re stuck, offering rapid ideation and facilitation."
  },
  {
    title: "Immersive Experience Design",
    description: "Designing and building unforgettable hybrid experiences that merge physical and digital worlds using XR, interactive installations, and narrative design."
  },
  {
    title: "Future Skills & Youth Training",
    description: "Developing and delivering high-impact workshops and training programs in XR, AI, and virtual production for the next generation of creators."
  }
];

export const CLIENT_POSITIONING: ClientPosition[] = [
  {
    audience: "For Corporates/Brands",
    role: "Innovation Catalyst",
    description: "Helping unlock creativity, build AI capacity, and future-proof strategy."
  },
  {
    audience: "For NGOs & Government",
    role: "Cultural Transformation Strategist",
    description: "Bringing inclusive design and social impact into innovation."
  },
  {
    audience: "For Festivals & Creatives",
    role: "Experience Designer",
    description: "Bridging performance, storytelling, and technology."
  },
  {
    audience: "For Investors & Partners",
    role: "Ecosystem Builder",
    description: "Designing scalable platforms and IP that merge culture, technology, and community for long-term value creation."
  },
  {
    audience: "For Youth & Communities",
    role: "Capacity Builder",
    description: "Empowering the next generation through XR, AI, and creative training, building pathways into the future economy."
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: "Road to Amapiano – Hybrid Narrative Festival",
    description: "A festival merging live music and immersive narrative, reimagining 30 years of South African music history.",
    tags: ["Festivals", "Hybrid Events", "Narrative", "Music", "Culture"],
    longDescription: "A new kind of festival that merges live music and immersive narrative. Each edition unfolds like a story across physical stages and virtual worlds, reimagining 30 years of South African music history.",
    videoUrl: "https://youtu.be/pJunKw0lO_s",
  },
  {
    title: "Smart Theatre Programme",
    description: "Training South African youth in XR, AI, and virtual production with the Arts & Culture Trust.",
    tags: ["Training", "Empowerment", "XR", "AI", "Youth", "Theatre"],
    longDescription: "Launched to train South African youth in XR, AI, and virtual production, transforming traditional theatre into a future-facing engine of opportunity.",
    videoUrl: "https://youtu.be/ce5rGZpLTw4",
  },
   {
    title: "SodaWorld",
    description: "A cultural technology platform blending live events, XR/AI, and virtual worlds.",
    tags: ["Mixed Reality", "Metaverse", "Platform", "Innovation", "Culture"],
    longDescription: "SodaWorld is a cultural technology platform blending live events, XR/AI, and virtual worlds — with a growing fan base across South Africa, Japan, the US, and Europe.",
    videoUrl: "https://youtu.be/vqF_n2QfMjY?si=it_-94iRXvlmjzAJ",
  },
  {
    title: "JHBlive TV",
    description: "Globally-recognized publication reaching millions with edgy cultural content from Johannesburg.",
    tags: ["Media", "Community", "Publishing", "Culture", "Johannesburg"],
    longDescription: "For 20 years, JHBLive was the go-to community publication, reaching millions with edgy content from the wonderful city of Johannesburg. It became globally recognized for its unique editorial style.",
    videoUrl: "https://www.youtube.com/watch?v=3XTfD3bsse0",
  },
  {
    title: "Human Rights Festival",
    description: "Among the world’s first human rights festivals in the metaverse.",
    tags: ["Human Rights", "Metaverse", "Festival", "Social Impact", "Global"],
    longDescription: "Among the world’s first human rights festivals in the metaverse, enabling global participation in performances, dialogues, and cultural interventions.",
    videoUrl: "https://youtu.be/S7S_rn3Swng",
  },
  {
    title: "Experiential Technology Innovation",
    description: "Building innovative systems from social media kiosks to real-time AI diffusion installations.",
    tags: ["Technology", "Innovation", "XR", "AI", "Interactive"],
    longDescription: "Built innovative systems including:\n• Interactive Social Media Kiosks\n• Festival Wristband Systems\n• Spatial XR & VR Activations\n• Multi-Camera Virtual Broadcast Systems\n• Real-Time AI Diffusion Installations",
    videoUrl: "https://youtu.be/TAuDwDkkaLU",
  }
];

export const NARRATIVE = {
  title: "Legacy & Vision",
  points: [
    "My career has always been about building bridges between creativity, community, and technology—from Johannesburg to global stages.",
    "Whether through Smart Theatre, SodaWorld, or Rise Atlantis, my goal is to empower youth, amplify African creativity, and design hybrid systems that blend real-world and digital futures.",
    "At the core: I build platforms where culture evolves, audiences participate, and the future comes alive."
  ]
};

export const TAGLINES = [
  "Where Ideas Meet AI.",
  "Turning creativity into ecosystems of impact.",
  "Design Thinking, AI, and Ideation – brought to life."
];

export const CONTACT_PROMPT = {
  title: "Get In Touch",
  body: "You’re not just a facilitator—you’re a global innovation partner who helps big brands, NGOs, and governments harness design thinking + AI to unlock creativity, solve complex problems, and scale impact. Let's connect.",
  email: "mic@sodaworld.tv"
};

export const SOCIAL_LINKS = [
    {
        name: 'X',
        url: 'https://x.com/mbalkind',
        // FIX: Replaced JSX with React.createElement to avoid JSX syntax errors in a .ts file.
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "currentColor" },
                React.createElement('path', { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
            )
        ),
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/michaelbalkind/',
        // FIX: Replaced JSX with React.createElement to avoid JSX syntax errors in a .ts file.
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "currentColor" },
                React.createElement('path', { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" })
            )
        ),
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/michaelbalkind/',
        // FIX: Replaced JSX with React.createElement to avoid JSX syntax errors in a .ts file.
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "currentColor" },
                React.createElement('path', { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" })
            )
        ),
    },
];