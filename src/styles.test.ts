import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('design tokens', () => {
  it('defines color, spacing, radius and type tokens, plus a dark theme', () => {
    const css = readFileSync('src/styles.css', 'utf8');
    expect(css).toContain('--rui-color-bg');
    expect(css).toContain('--rui-space-md');
    expect(css).toContain('--rui-radius-md');
    expect(css).toContain('--rui-text-base');
    expect(css).toContain('.dark');
  });
});
