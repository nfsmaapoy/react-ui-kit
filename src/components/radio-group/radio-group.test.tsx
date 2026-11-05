import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { RadioGroup } from './radio-group';

const options = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
];

describe('RadioGroup', () => {
  it('selects one option and reports the value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup label="Plan" name="plan" options={options} defaultValue="free" onValueChange={onValueChange} />,
    );

    const free = screen.getByRole('radio', { name: 'Free' });
    const pro = screen.getByRole('radio', { name: 'Pro' });
    expect(free).toBeChecked();
    expect(free).toHaveAttribute('name', 'plan');
    expect(pro).toHaveAttribute('name', 'plan');

    await user.click(pro);
    expect(onValueChange).toHaveBeenCalledWith('pro');
    expect(pro).toBeChecked();
    expect(free).not.toBeChecked();
  });

  it('moves the selection with arrow keys', async () => {
    const user = userEvent.setup();
    render(<RadioGroup label="Plan" options={options} defaultValue="free" />);

    const free = screen.getByRole('radio', { name: 'Free' });
    free.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
  });
});
