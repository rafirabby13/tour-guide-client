import { LucideIcon } from 'lucide-react';

export type GridItemType = 'feature' | 'stat' | 'cta' | 'image';

export interface GridItem {
  id: string;
  type: GridItemType;
  title?: string;
  subtitle?: string;
  image?: string;
  icon?: LucideIcon;
  colSpan?: string; // e.g., "md:col-span-2"
  rowSpan?: string; // e.g., "md:row-span-2"
  href?: string;
  ctaText?: string;
  theme?: 'dark' | 'light' | 'primary' | 'slate';
}