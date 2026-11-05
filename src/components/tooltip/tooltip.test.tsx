import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('shows the tip when the trigger is focused', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Saved items" delay={0}>
        <button type="button">Inbox</button>
      </Tooltip>,
    );

    await user.tab();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Saved items');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
