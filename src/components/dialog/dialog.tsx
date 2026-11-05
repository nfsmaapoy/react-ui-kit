import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentProps, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { focusClass } from '../../lib/styles';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  title: string;
  description?: string;
  children?: ReactNode;
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DialogContent({ title, description, children, className, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-overlay" />
      <DialogPrimitive.Content
        {...props}
        className={cx(
          'fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface p-token-lg text-fg shadow-pop',
          focusClass,
          className,
        )}
      >
        <div className="flex flex-col gap-token-xs pr-token-xl">
          <DialogPrimitive.Title className="m-0 text-lg font-semibold">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Description className={description ? 'm-0 text-sm text-muted' : 'sr-only'}>
            {description ?? title}
          </DialogPrimitive.Description>
        </div>
        <div className="mt-token-lg">{children}</div>
        <DialogPrimitive.Close
          aria-label="Close"
          className={cx(
            'absolute top-token-md right-token-md inline-flex size-8 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 text-fg hover:bg-surface-2',
            focusClass,
          )}
        >
          <CloseIcon />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
