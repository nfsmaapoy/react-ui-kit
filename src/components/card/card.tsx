import type { ComponentProps } from 'react';
import { cx } from '../../lib/cx';

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      data-slot="card"
      className={cx('rounded-lg border border-border bg-surface text-fg shadow-card', className)}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('flex flex-col gap-token-xs p-token-lg', className)} />;
}

export function CardTitle({ className, ...props }: ComponentProps<'h2'>) {
  return <h2 {...props} className={cx('m-0 text-lg font-semibold', className)} />;
}

export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p {...props} className={cx('m-0 text-sm text-muted', className)} />;
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('px-token-lg pb-token-lg', className)} />;
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('flex items-center gap-token-sm px-token-lg pb-token-lg', className)} />;
}
