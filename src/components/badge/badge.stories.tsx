import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: { children: 'Draft' },
};

export const Accent: Story = {
  args: { children: 'New', variant: 'accent' },
};

export const Success: Story = {
  args: { children: 'Active', variant: 'success' },
};

export const Warning: Story = {
  args: { children: 'Pending', variant: 'warning' },
};

export const Danger: Story = {
  args: { children: 'Failed', variant: 'danger' },
};
