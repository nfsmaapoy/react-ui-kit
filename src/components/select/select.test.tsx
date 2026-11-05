import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Select } from './select';

const options = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
];

describe('Select', () => {
  it('opens from the keyboard and selects an option', async () => {
    const user = userEvent.setup();
    render(<Select label="Frequency" options={options} placeholder="Choose a schedule" />);

    const trigger = screen.getByRole('combobox', { name: 'Frequency' });
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    const option = await screen.findByRole('option', { name: 'Weekly' });
    await user.click(option);
    expect(trigger).toHaveTextContent('Weekly');
  });

  it('exposes the error text to the trigger', () => {
    render(<Select label="Frequency" options={options} error="Pick a schedule." />);
    const trigger = screen.getByRole('combobox', { name: 'Frequency' });
    expect(trigger).toBeInvalid();
    expect(trigger).toHaveAccessibleDescription('Pick a schedule.');
  });
});
