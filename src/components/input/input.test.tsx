import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  it('connects the label, hint and error to the field', async () => {
    const user = userEvent.setup();
    render(<Input label="Email" hint="Work email" error="Required" />);

    const input = screen.getByLabelText('Email');
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription(/Work email/);
    expect(input).toHaveAccessibleDescription(/Required/);
    await user.type(input, 'a@b.co');
    expect(input).toHaveValue('a@b.co');
  });
});
