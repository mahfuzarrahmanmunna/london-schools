// src/app/types/navbar.ts

export interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  accent?: string;
}

export interface MenuColumn {
  title: string;
  items: SubMenuItem[];
}

export interface FeaturedItem {
  title: string;
  description: string;
  image: string;
  href: string;
  ctaText?: string;
}

export interface MenuItem {
  label: string;
  href: string;
  external?: boolean; // Added this for external links like Google Forms
  columns?: MenuColumn[];
  featured?: FeaturedItem;
}
