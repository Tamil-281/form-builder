import type { ArgTypes } from '@storybook/react';

export const buttonArgTypes: ArgTypes = {
  variant: {
    control: { type: 'select' },
    options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    description: 'The visual style variant of the button. Each variant has distinct styling and use cases.',
    table: {
      type: { summary: 'ButtonVariant' },
      defaultValue: { summary: 'default' },
    },
  },
  size: {
    control: { type: 'select' },
    options: ['default', 'sm', 'lg', 'icon'],
    description: 'The size of the button. Icon size is specifically for buttons containing only an icon.',
    table: {
      type: { summary: 'ButtonSize' },
      defaultValue: { summary: 'default' },
    },
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'When true, the button becomes non-interactive and visually indicates the disabled state.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  asChild: {
    control: { type: 'boolean' },
    description: 'When true, renders the button as a child component using Radix Slot. Useful for creating custom button elements while maintaining accessibility.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  children: {
    control: { type: 'text' },
    description: 'The content to display inside the button. Can be text, icons, or any React nodes.',
    table: {
      type: { summary: 'ReactNode' },
    },
  },
  className: {
    control: { type: 'text' },
    description: 'Additional CSS classes to apply to the button. Will be merged with the component\'s base styles.',
    table: {
      type: { summary: 'string' },
    },
  },
  onClick: {
    action: 'clicked',
    description: 'Callback function triggered when the button is clicked. Only fires when button is not disabled.',
    table: {
      type: { summary: '(event: React.MouseEvent<HTMLButtonElement>) => void' },
    },
  },
  type: {
    control: { type: 'select' },
    options: ['button', 'submit', 'reset'],
    description: 'The HTML button type attribute. Important for form submission behavior.',
    table: {
      type: { summary: 'button | submit | reset' },
      defaultValue: { summary: 'button' },
    },
  },
}; 