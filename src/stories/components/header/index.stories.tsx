import { argTypes } from './argTypes';
import { Header } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Header> = {
  title: 'Ui/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive header component with navigation, theme toggle, and customizable logo. Optimized with React.memo and useMemo for better performance.',
      },
    },
  },
  argTypes,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample navigation items for consistent testing
const sampleNavigationItems = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Settings', href: '/settings' },
];

export const Default: Story = {
  args: {
    navigationItems: sampleNavigationItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default header with navigation items, theme toggle, and default logo.',
      },
    },
  },
};

export const NavigationLeft: Story = {
  args: {
    navigationAlign: 'left',
    navigationItems: sampleNavigationItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with left-aligned navigation.',
      },
    },
  },
};

export const NavigationCenter: Story = {
  args: {
    navigationAlign: 'center',
    navigationItems: sampleNavigationItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with center-aligned navigation (default behavior).',
      },
    },
  },
};

export const NavigationRight: Story = {
  args: {
    navigationAlign: 'right',
    navigationItems: sampleNavigationItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with right-aligned navigation.',
      },
    },
  },
};

export const WithoutThemeToggle: Story = {
  args: {
    showThemeToggle: false,
    navigationItems: sampleNavigationItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header without the theme toggle component.',
      },
    },
  },
};

export const WithoutNavigation: Story = {
  args: {
    showNavigation: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal header without navigation menu.',
      },
    },
  },
};

export const CustomLogo: Story = {
  args: {
    logo: (
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <span className="text-xl font-bold text-gray-900 dark:text-white">CustomBrand</span>
      </div>
    ),
    navigationItems: sampleNavigationItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with a custom logo component instead of the default Form Builder logo.',
      },
    },
  },
};

export const CustomNavigation: Story = {
  args: {
    navigationItems: [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with custom navigation items showing different active states.',
      },
    },
  },
};

export const WithCustomContent: Story = {
  args: {
    children: (
      <>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Sign In
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Sign Up
        </button>
      </>
    ),
    navigationItems: sampleNavigationItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with custom content in the right section (sign in/sign up buttons).',
      },
    },
  },
};

export const MinimalHeader: Story = {
  args: {
    showNavigation: false,
    showThemeToggle: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal header with just the logo, useful for simple layouts.',
      },
    },
  },
};

export const ComplexNavigation: Story = {
  args: {
    navigationItems: [
      { label: 'Products', href: '/products', active: true },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Resources', href: '/resources' },
      { label: 'Support', href: '/support' },
      { label: 'Company', href: '/company' },
    ],
    children: (
      <>
        <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Contact Sales
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex header with many navigation items and custom action buttons.',
      },
    },
  },
};
