import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/button';
import { ToastProvider, useToast } from './toast';

function Demo() {
  const { toast } = useToast();
  return (
    <div className="flex gap-token-sm">
      <Button
        onClick={() =>
          toast({ title: 'Profile saved', description: 'Your changes are live.', variant: 'success' })
        }
      >
        Save
      </Button>
      <Button
        variant="danger"
        onClick={() => toast({ title: 'Could not save', description: 'Try again in a moment.', variant: 'danger' })}
      >
        Fail
      </Button>
    </div>
  );
}

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
