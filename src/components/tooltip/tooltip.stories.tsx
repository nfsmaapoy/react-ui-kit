import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/button';
import { Tooltip } from './tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Saves the profile and sends a receipt.',
    children: <Button>Save</Button>,
  },
};
