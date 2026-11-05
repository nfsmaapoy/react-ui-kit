import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './radio-group';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'Plan',
    hint: 'You can change this later.',
    defaultValue: 'pro',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'team', label: 'Team' },
    ],
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { defaultValue: undefined, error: 'Choose a plan.' },
};
