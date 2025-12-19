/**
 * Core TypeScript interfaces for SOC Analyst Portfolio
 */

export type ProjectCategory = 'threat-hunting' | 'incident-response' | 'siem' | 'malware-analysis' | 'network-security' | 'labs';

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: AspectRatio;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  coverImage: string;
  images: ProjectImage[];
  description: string;
  tools?: string;
  platform?: string;
  location?: string;
  slug: string;
}

export interface AnalystInfo {
  name: string;
  tagline: string;
  heroIntroduction: string;
  biography: string;
  approach: string;
  certifications: string[];
  skills: string[];
  education: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    tryhackme?: string;
  };
  portraitImage: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  inquiryType: 'job-opportunity' | 'collaboration' | 'mentorship' | 'general';
  message: string;
  timestamp: Date;
}

// Keep backward compatibility alias
export type PhotographerInfo = AnalystInfo;
