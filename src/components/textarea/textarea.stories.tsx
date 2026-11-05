import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    label: 'Notes',
    hint: 'Visible to people on your team.',
    placeholder: 'What changed?',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Add a short note.' },
};
