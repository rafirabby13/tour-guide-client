import { LucideIcon } from "lucide-react";

export interface Category {
  id: number;
  label: string;
  count: string;
  icon: LucideIcon; // Ensure this type is set
  image: string;
}