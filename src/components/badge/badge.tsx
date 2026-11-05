import type { ComponentProps, ReactNode } from 'react';
import { cx } from '../../lib/cx';

type Variant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

const variantClass: Record<Variant, string> = {
  neutral: 'bg-surface-2 text-fg',
  accent: 'bg-accent text-accent-fg',
  success: 'bg-success text-success-fg',
  warning: 'bg-warning text-warning-fg',
  danger: 'bg-danger text-danger-fg',
};

export type BadgeProps = ComponentProps<'span'> & {
  variant?: Variant;
  children: ReactNode;
};

export function Badge({ variant = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      data-slot="badge"
      className={cx(
        'inline-flex items-center rounded-full px-token-sm py-token-xs text-xs font-medium',
        variantClass[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
