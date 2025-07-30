import type { ArgTypes } from '@storybook/react';

export const sidebarArgTypes: ArgTypes = {
  title: {
    control: { type: 'text' },
    description: 'The main title displayed in the sidebar header.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'Components' },
    },
  },
  subtitle: {
    control: { type: 'text' },
    description: 'The subtitle displayed below the main title.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'Drag and drop components to build your form' },
    },
  },
  items: {
    control: { type: 'object' },
    description:
      'Array of sidebar items to display. Each item should have an id, label, and optional icon, description, category, and disabled properties.',
    table: {
      type: { summary: 'SidebarItem[]' },
    },
  },
  showCategories: {
    control: { type: 'boolean' },
    description: 'Whether to show category filters at the top of the sidebar.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'true' },
    },
  },
  collapsible: {
    control: { type: 'boolean' },
    description: 'Whether the sidebar can be collapsed to a narrow width.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  collapsed: {
    control: { type: 'boolean' },
    description: 'The current collapsed state of the sidebar.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  showSearch: {
    control: { type: 'boolean' },
    description: 'Whether to show the search input field.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'true' },
    },
  },
  searchPlaceholder: {
    control: { type: 'text' },
    description: 'Placeholder text for the search input.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'Search components...' },
    },
  },
  width: {
    control: { type: 'text' },
    description: 'CSS width class for the sidebar (e.g., "w-80", "w-96").',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'w-80' },
    },
  },
  className: {
    control: { type: 'text' },
    description: 'Additional CSS classes to apply to the sidebar.',
    table: {
      type: { summary: 'string' },
    },
  },
  onToggleCollapse: {
    action: 'toggleCollapse',
    description: 'Callback function triggered when the collapse toggle button is clicked.',
    table: {
      type: { summary: '(collapsed: boolean) => void' },
    },
  },
  onItemClick: {
    action: 'itemClick',
    description: 'Callback function triggered when a sidebar item is clicked.',
    table: {
      type: { summary: '(item: SidebarItem) => void' },
    },
  },
};
