import type { ComponentProps } from 'react';
import { cx } from '../../lib/cx';
import { Field, controlClass } from '../field/field';

export type TextareaProps = ComponentProps<'textarea'> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Textarea({ label, hint, error, id, className, ...props }: TextareaProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} className={className}>
      {(field) => (
        <textarea
          {...props}
          {...field}
          data-slot="textarea"
          className={cx(controlClass, 'min-h-24 resize-y py-token-sm')}
        />
      )}
    </Field>
  );
}
