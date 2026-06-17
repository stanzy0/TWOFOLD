export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  nav?: { title: string; href: string }[];
  links?: {
    github?: string;
    twitter?: string;
  };
}
