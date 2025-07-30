import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { FormColumn, FormField, FormLayout, FormRow } from '../../components/type';

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

export const getAllFieldLabels = (layout: FormLayout): string[] => {
  const labels: string[] = [];

  const extractLabelsFromRows = (rows: FormRow[]) => {
    rows.forEach(row => {
      row.columns.forEach((column: FormColumn) => {
        // Add labels from regular fields
        column.fields.forEach((field: FormField) => {
          labels.push(field.label);
        });

        // Add labels from nested rows
        if (column.nestedRows) {
          column.nestedRows.forEach((nestedRow: FormRow) => {
            nestedRow.columns.forEach((nestedColumn: FormColumn) => {
              nestedColumn.fields.forEach((field: FormField) => {
                labels.push(field.label);
              });
            });
          });
        }
      });
    });
  };

  extractLabelsFromRows(layout.rows);
  return labels;
};

// Function to check if a label is duplicate (excluding the current field)
export const isDuplicateLabel = (
  layout: FormLayout,
  newLabel: string,
  currentFieldId?: string,
): boolean => {
  const allLabels = getAllFieldLabels(layout);

  if (currentFieldId) {
    // Remove the current field's label from the check
    const currentField = findFieldById(layout, currentFieldId);
    if (currentField) {
      const index = allLabels.indexOf(currentField.label);
      if (index > -1) {
        allLabels.splice(index, 1);
      }
    }
  }

  return allLabels.includes(newLabel);
};

// Helper function to find a field by ID
export const findFieldById = (layout: FormLayout, fieldId: string): FormField | null => {
  for (const row of layout.rows) {
    for (const column of row.columns) {
      // Check regular fields
      const field = column.fields.find((f: FormField) => f.id === fieldId);
      if (field) return field;

      // Check nested row fields
      if (column.nestedRows) {
        for (const nestedRow of column.nestedRows) {
          for (const nestedColumn of nestedRow.columns) {
            const nestedField = nestedColumn.fields.find((f: FormField) => f.id === fieldId);
            if (nestedField) return nestedField;
          }
        }
      }
    }
  }
  return null;
};
