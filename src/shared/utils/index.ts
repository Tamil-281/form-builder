import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { FormField } from '../dnd/type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDefaultLabel = (fieldType: FormField['type']): string => {
  switch (fieldType) {
    case 'text':
      return 'Text Field';
    case 'number':
      return 'Number Field';
    case 'email':
      return 'Email Field';
    case 'textarea':
      return 'Textarea Field';
    case 'select':
      return 'Select Field';
    case 'date':
      return 'Date Field';
    case 'checkbox':
      return 'Checkbox Field';
    case 'radio':
      return 'Radio Field';
    default:
      return 'Field';
  }
};

export const getDefaultPlaceholder = (fieldType: FormField['type']): string => {
  switch (fieldType) {
    case 'text':
      return 'Enter text...';
    case 'number':
      return 'Enter number...';
    case 'email':
      return 'Enter email...';
    case 'textarea':
      return 'Enter text...';
    case 'select':
      return 'Select an option...';
    case 'date':
      return 'Select date...';
    case 'checkbox':
      return '';
    case 'radio':
      return '';
    default:
      return '';
  }
};

export const getColSpanClass = (col: number) => {
  const colSpanMap: Record<number, string> = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  };
  return colSpanMap[col] || 'col-span-6';
};
