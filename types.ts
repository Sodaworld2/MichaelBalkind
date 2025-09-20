export enum Screen {
  HOME,
  MAIN_MENU,
  ABOUT,
  SERVICES,
  POSITIONING,
  PORTFOLIO,
  CONTACT,
  SPARK_IDEA,
}

export interface Service {
  title: string;
  description: string;
}

export interface ClientPosition {
  audience: string;
  role: string;
  description: string;
}

export interface PortfolioProject {
  title: string;
  description: string;
  tags: string[];
  longDescription: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface AIGeneratedIdea {
  title: string;
  description: string;
  imageUrl?: string;
}