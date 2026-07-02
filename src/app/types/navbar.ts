export interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface MenuColumn {
  title: string;
  items: SubMenuItem[];
}

export interface MenuItem {
  label: string;
  href: string;
  columns?: MenuColumn[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image: string;
    ctaText?: string;
  };
}
