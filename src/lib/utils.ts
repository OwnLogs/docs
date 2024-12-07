import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { NestedPage, Page } from './pages';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function flattenPages(tree: NestedPage[]): Page[] {
  const newPages: Page[] = [];
  function traverse(items: NestedPage[]) {
    for (const item of items) {
      if (item.url) {
        newPages.push(item as Page);
      }
      if (item.children) {
        traverse(item.children);
      }
    }
  }
  traverse(tree);
  return newPages;
}

export function slugify(path: string): string {
  return path.replace(/ /g, '-');
}

export function formatDate(
  date: Date,
  dateStyle: 'full' | 'long' | 'medium' | 'short' = 'medium',
  locales: string = 'en'
) {
  // Safari is mad about dashes in the date
  const dateFormatter = new Intl.DateTimeFormat(locales, {
    dateStyle,
    timeZone: 'UTC'
  });
  return dateFormatter.format(date);
}
