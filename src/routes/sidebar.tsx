import {
  AlignLeft,
  Calendar,
  CheckSquare,
  ChevronDown,
  Hash,
  Mail,
  Radio,
  Type,
  Rows,
  Columns,
} from 'lucide-react';

import type { DragItemProps } from '@dnd';

export const defaultItems: DragItemProps = {
  Layout: [
    {
      type: 'row',
      icon: <Rows className="h-4 w-4" />,
      label: 'Row',
      description: 'Horizontal container for columns',
    },
    {
      type: 'column',
      icon: <Columns className="h-4 w-4" />,
      label: 'Column',
      description: 'Vertical container for form fields',
    },
  ],
  'Form Field': [
    {
      type: 'field',
      fieldType: 'text',
      label: 'Text Input',
      icon: <Type className="h-4 w-4" />,
      description: 'Single line text input field',
    },
    {
      type: 'field',
      fieldType: 'number',
      label: 'Number Input',
      icon: <Hash className="h-4 w-4" />,
      description: 'Number input field',
    },
    {
      type: 'field',
      fieldType: 'email',
      label: 'Email Input',
      icon: <Mail className="h-4 w-4" />,
      description: 'Email input field',
    },
    {
      type: 'field',
      fieldType: 'textarea',
      label: 'Textarea',
      icon: <AlignLeft className="h-4 w-4" />,
      description: 'Multi-line text input field',
    },
    {
      type: 'field',
      fieldType: 'select',
      label: 'Select Dropdown',
      icon: <ChevronDown className="h-4 w-4" />,
      description: 'Dropdown selection field',
    },
    {
      type: 'field',
      fieldType: 'date',
      label: 'Date Picker',
      icon: <Calendar className="h-4 w-4" />,
      description: 'Date selection field',
    },
    {
      type: 'field',
      fieldType: 'checkbox',
      label: 'Checkbox',
      icon: <CheckSquare className="h-4 w-4" />,
      description: 'Checkbox selection field',
    },
    {
      type: 'field',
      fieldType: 'radio',
      label: 'Radio Button',
      icon: <Radio className="h-4 w-4" />,
      description: 'Radio button selection field',
    },
  ],
};
