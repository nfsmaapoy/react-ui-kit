import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './select';

const options = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Frequency',
    hint: 'How often we send a summary.',
    options,
    placeholder: 'Choose a schedule',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Pick a schedule.' },
};
