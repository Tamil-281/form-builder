import { Type, Calendar, CheckSquare, Settings, Users, Database } from 'lucide-react';

import { sidebarArgTypes } from './argTypes';
import { Sidebar } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Sidebar> = {
  title: 'Ui/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A dynamic sidebar component for displaying categorized items with search and filtering capabilities.',
      },
    },
  },
  argTypes: sidebarArgTypes,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default sidebar with form components
export const Default: Story = {
  args: {
    title: 'Form Components',
    subtitle: 'Drag and drop components to build your form',
  },
};

// Sidebar with custom items
export const CustomItems: Story = {
  args: {
    title: 'Custom Components',
    subtitle: 'Your custom component library',
    items: [
      {
        Layout: [
          {
            type: 'row',
            label: 'Custom Row',
            icon: <Type className="w-4 h-4" />,
            description: 'A custom row component',
          },
          {
            type: 'column',
            label: 'Custom Column',
            icon: <Database className="w-4 h-4" />,
            description: 'A custom column component',
          },
        ],
        'Form Field': [
          {
            type: 'field',
            fieldType: 'text',
            label: 'Custom Text',
            icon: <Users className="w-4 h-4" />,
            description: 'Custom text input field',
          },
          {
            type: 'field',
            fieldType: 'select',
            label: 'Custom Select',
            icon: <Settings className="w-4 h-4" />,
            description: 'Custom select dropdown',
          },
        ],
      },
    ],
  },
};

// Collapsible sidebar
export const Collapsible: Story = {
  args: {
    title: 'Collapsible Sidebar',
    subtitle: 'Click the chevron to collapse',
    collapsible: true,
    collapsed: false,
  },
};

// Collapsed state
export const Collapsed: Story = {
  args: {
    title: 'Collapsed Sidebar',
    subtitle: 'Minimal width view',
    collapsible: true,
    collapsed: true,
  },
};

// Without search
export const WithoutSearch: Story = {
  args: {
    title: 'No Search',
    subtitle: 'Search functionality disabled',
    showSearch: false,
  },
};

// Without categories
export const WithoutCategories: Story = {
  args: {
    title: 'No Categories',
    subtitle: 'Category filtering disabled',
    showCategories: false,
  },
};

// Different width
export const WideSidebar: Story = {
  args: {
    title: 'Wide Sidebar',
    subtitle: 'Extra wide layout',
    width: 'w-96',
  },
};

// With disabled items
export const WithDisabledItems: Story = {
  args: {
    title: 'With Disabled Items',
    subtitle: 'Some items are disabled',
    items: [
      {
        Layout: [
          {
            type: 'row',
            label: 'Enabled Row',
            icon: <Type className="w-4 h-4" />,
            description: 'This item is clickable',
          },
          {
            type: 'column',
            label: 'Disabled Column',
            icon: <Calendar className="w-4 h-4" />,
            description: 'This item is disabled',
          },
        ],
        'Form Field': [
          {
            type: 'field',
            fieldType: 'checkbox',
            label: 'Another Enabled',
            icon: <CheckSquare className="w-4 h-4" />,
            description: 'This item is also clickable',
          },
        ],
      },
    ],
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    title: 'Empty Sidebar',
    subtitle: 'No components available',
    items: [],
    emptyState: (
      <div className="text-center py-8">
        <div className="w-12 h-12 mx-auto bg-builder-sidebar-hover rounded-full flex items-center justify-center mb-4">
          <Type className="w-6 h-6 text-builder-sidebar-foreground/30" />
        </div>
        <h3 className="text-sm font-medium text-builder-sidebar-foreground mb-2">No Components</h3>
        <p className="text-xs text-builder-sidebar-foreground/60">
          Add some components to get started
        </p>
      </div>
    ),
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    title: 'Playground',
    subtitle: 'Test different configurations',
    collapsible: true,
    collapsed: false,
    showSearch: true,
    showCategories: true,
    width: 'w-80',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different sidebar configurations.',
      },
    },
  },
};
