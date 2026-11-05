import type { ComponentProps } from 'react';
import { cx } from '../../lib/cx';
import { focusClass } from '../../lib/styles';
import { FieldError, FieldHint, describedBy, useFieldIds } from '../field/field';

export type CheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'size'> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Checkbox({ label, hint, error, id, className, ...props }: CheckboxProps) {
  const ids = useFieldIds(id);
  const description = describedBy(hint, error, ids.hintId, ids.errorId);

  return (
    <div data-slot="checkbox" className={cx('flex w-full flex-col gap-token-xs', className)}>
      <label htmlFor={ids.id} className="inline-flex items-center gap-token-sm text-sm font-medium text-fg">
        <input
          {...props}
          id={ids.id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={description}
          className={cx('m-0 size-4 accent-accent', focusClass)}
        />
        {label}
      </label>
      {hint ? <FieldHint id={ids.hintId}>{hint}</FieldHint> : null}
      {error ? <FieldError id={ids.errorId}>{error}</FieldError> : null}
    </div>
  );
}
