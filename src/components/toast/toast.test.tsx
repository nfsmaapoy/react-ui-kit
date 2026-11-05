import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ToastProvider, useToast } from './toast';

function Demo() {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast({ title: 'Profile saved', description: 'Your changes are live.' })}>
      Save
    </button>
  );
}

describe('Toast', () => {
  it('shows a message from the hook and dismisses it', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Demo />
      </ToastProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Profile saved');
    expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('throws when useToast is called outside the provider', () => {
    expect(() => render(<Demo />)).toThrow(/ToastProvider/);
  });
});
