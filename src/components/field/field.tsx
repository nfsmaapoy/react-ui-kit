import { useId, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { focusClass } from '../../lib/styles';

export type FieldControlProps = {
  id: string;
  'aria-invalid'?: true;
  'aria-describedby'?: string;
};

type FieldProps = {
  id?: string | undefined;
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  className?: string | undefined;
  children: (props: FieldControlProps) => ReactNode;
};

export function useFieldIds(idProp?: string) {
  const generated = useId();
  const id = idProp ?? generated;
  return {
    id,
    hintId: `${id}-hint`,
    errorId: `${id}-error`,
  };
}

export function describedBy(hint: string | undefined, error: string | undefined, hintId: string, errorId: string) {
  const ids = [hint ? hintId : undefined, error ? errorId : undefined].filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
}

export function FieldHint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="m-0 text-sm text-hint">
      {children}
    </p>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="m-0 text-sm text-danger">
      {children}
    </p>
  );
}

export const controlClass = cx(
  'box-border m-0 w-full rounded-md border border-border bg-surface px-token-md font-sans text-sm text-fg shadow-none transition-colors placeholder:text-hint disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger',
  focusClass,
);

export function Field({ id, label, hint, error, className, children }: FieldProps) {
  const ids = useFieldIds(id);
  const description = describedBy(hint, error, ids.hintId, ids.errorId);

  return (
    <div data-slot="field" className={cx('flex w-full flex-col gap-token-xs', className)}>
      <label htmlFor={ids.id} className="text-sm font-medium text-fg">
        {label}
      </label>
      {children({
        id: ids.id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': description,
      })}
      {hint ? <FieldHint id={ids.hintId}>{hint}</FieldHint> : null}
      {error ? <FieldError id={ids.errorId}>{error}</FieldError> : null}
    </div>
  );
}
