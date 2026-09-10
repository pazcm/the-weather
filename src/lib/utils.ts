import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// helper function used by shadcn/ui components
// combines clsx and tailwind-merge to merge class names and handle tailwind class conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
