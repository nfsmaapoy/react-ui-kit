import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Email',
    hint: 'We only use this for receipts.',
    placeholder: 'you@example.com',
    type: 'email',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: 'Enter a valid email.',
    defaultValue: 'not-an-email',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'you@example.com' },
};
