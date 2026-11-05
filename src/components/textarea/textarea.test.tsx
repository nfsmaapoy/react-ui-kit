import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('connects the label and error, and accepts text', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Notes" error="Add a short note." />);

    const field = screen.getByLabelText('Notes');
    expect(field).toBeInvalid();
    expect(field).toHaveAccessibleDescription('Add a short note.');
    await user.type(field, 'Shipped the form.');
    expect(field).toHaveValue('Shipped the form.');
  });
});
