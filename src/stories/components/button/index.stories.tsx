import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
import { Heart, Download, Settings } from 'lucide-react';
import { buttonArgTypes } from './argTypes';

const meta: Meta<typeof Button> = {
  title: 'Ui/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: buttonArgTypes,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default button
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants with their distinct visual styles.',
      },
    },
  },
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Settings />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes including the icon-only variant.',
      },
    },
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Heart />
        Like
      </Button>
      <Button variant="outline">
        <Download />
        Download
      </Button>
      <Button variant="secondary">
        Settings
        <Settings />
      </Button>
      <Button size="icon" variant="ghost">
        <Settings />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons positioned before and after text, plus icon-only buttons.',
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled Default</Button>
      <Button variant="destructive" disabled>
        Disabled Destructive
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
      <Button size="icon" disabled>
        <Settings />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state for all button variants.',
      },
    },
  },
};

// Loading state
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Processing
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state using disabled prop and a spinner icon.',
      },
    },
  },
};

// As child (using Radix Slot)
export const AsChild: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="#button-as-link">Button as Link</a>
      </Button>
      <Button variant="outline" asChild>
        <a href="#button-as-link">Outline as Link</a>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using the asChild prop to render the button as a different element (like a link).',
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different button configurations.',
      },
    },
  },
};
