import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './switch';

describe('Switch', () => {
  it('toggles with the keyboard', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Airplane mode" onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch', { name: 'Airplane mode' });
    expect(control).toHaveAttribute('aria-checked', 'false');
    control.focus();
    await user.keyboard(' ');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(control).toHaveAttribute('aria-checked', 'true');
  });
});
