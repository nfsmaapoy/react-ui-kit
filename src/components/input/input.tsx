import type { ComponentProps } from 'react';
import { cx } from '../../lib/cx';
import { Field, controlClass } from '../field/field';

export type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Input({ label, hint, error, id, className, ...props }: InputProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} className={className}>
      {(field) => <input {...props} {...field} data-slot="input" className={cx(controlClass, 'h-10')} />}
    </Field>
  );
}
