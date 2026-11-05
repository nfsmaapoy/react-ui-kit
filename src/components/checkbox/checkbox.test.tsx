import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('toggles from the label and announces the error', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Email me" error="Required" />);

    const box = screen.getByRole('checkbox', { name: 'Email me' });
    expect(box).toBeInvalid();
    expect(box).toHaveAccessibleDescription('Required');
    await user.click(screen.getByText('Email me'));
    expect(box).toBeChecked();
  });
});
