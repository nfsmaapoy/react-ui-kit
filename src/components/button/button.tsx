import type { ComponentProps, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { focusClass } from '../../lib/styles';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type ButtonOwn = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
};

type NativeButtonProps = ButtonOwn & Omit<ComponentProps<'button'>, keyof ButtonOwn>;
type LinkButtonProps = ButtonOwn &
  Omit<ComponentProps<'a'>, keyof ButtonOwn | 'href'> & { href: string };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

const variantClass: Record<Variant, string> = {
  primary: 'border-transparent bg-accent text-accent-fg hover:bg-accent-hover',
  secondary: 'border-border bg-surface text-fg hover:bg-surface-2',
  ghost: 'border-transparent bg-transparent text-fg hover:bg-surface-2',
  danger: 'border-transparent bg-danger text-danger-fg hover:bg-danger-hover',
};

const sizeClass: Record<Size, string> = {
  sm: 'h-8 px-token-md text-sm',
  md: 'h-10 px-token-lg text-sm',
  lg: 'h-12 px-token-xl text-base',
};

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function classes(props: ButtonOwn, inactive: boolean) {
  return cx(
    'inline-flex cursor-pointer items-center justify-center gap-token-sm whitespace-nowrap rounded-md border font-sans font-medium no-underline box-border transition-colors disabled:cursor-not-allowed aria-disabled:cursor-not-allowed',
    focusClass,
    variantClass[props.variant ?? 'primary'],
    sizeClass[props.size ?? 'md'],
    inactive && 'opacity-50',
    props.className,
  );
}

function isLink(props: ButtonProps): props is LinkButtonProps {
  return typeof (props as LinkButtonProps).href === 'string';
}

function LinkButton({
  href,
  variant,
  size,
  loading = false,
  disabled = false,
  className,
  children,
  onClick,
  tabIndex,
  ...rest
}: LinkButtonProps) {
  const inactive = disabled || loading;

  return (
    <a
      {...rest}
      data-slot="button"
      href={href}
      className={classes({ variant, size, className }, inactive)}
      aria-disabled={inactive || undefined}
      aria-busy={loading || undefined}
      tabIndex={inactive ? -1 : tabIndex}
      onClick={(event) => {
        if (inactive) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
    >
      {loading ? <Spinner /> : null}
      {children}
    </a>
  );
}

function NativeButton({
  variant,
  size,
  loading = false,
  disabled = false,
  className,
  children,
  type,
  ...rest
}: NativeButtonProps) {
  const inactive = disabled || loading;

  return (
    <button
      {...rest}
      data-slot="button"
      type={type ?? 'button'}
      className={classes({ variant, size, className }, inactive)}
      disabled={inactive}
      aria-busy={loading || undefined}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}

export function Button(props: ButtonProps) {
  if (isLink(props)) {
    return <LinkButton {...props} />;
  }
  return <NativeButton {...props} />;
}
