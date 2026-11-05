import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/button';
import { Dialog, DialogContent, DialogTrigger } from './dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit profile</Button>
      </DialogTrigger>
      <DialogContent title="Edit profile" description="This name is shown on your public page.">
        <div className="flex justify-end gap-token-sm">
          <Button variant="primary">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};
