import type { ArgTypes } from '@storybook/react';

export const argTypes: ArgTypes = {
  className: {
    description: 'Additional CSS classes to apply to the header',
    control: { type: 'text' },
  },
  children: {
    description: 'Custom content to render in the right section of the header',
    control: false,
  },
  showThemeToggle: {
    description: 'Whether to show the theme toggle component',
    control: { type: 'boolean' },
  },
  showNavigation: {
    description: 'Whether to show the navigation menu',
    control: { type: 'boolean' },
  },
  logo: {
    description: 'Custom logo component to display',
    control: false,
  },
  navigationItems: {
    description: 'Array of navigation items to display',
    control: { type: 'object' },
  },
  navigationAlign: {
    description: 'Alignment of the navigation menu',
    control: { type: 'select' },
    options: ['left', 'center', 'right'],
  },
};
