import { cx } from '../../lib/cx';
import { useControllable } from '../../lib/use-controllable';
import { focusClass } from '../../lib/styles';
import { FieldError, FieldHint, describedBy, useFieldIds } from '../field/field';

export type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  label: string;
  options: RadioOption[];
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  hint?: string;
  error?: string;
  className?: string;
};

export function RadioGroup({
  label,
  options,
  name,
  value,
  defaultValue,
  onValueChange,
  hint,
  error,
  className,
}: RadioGroupProps) {
  const ids = useFieldIds();
  const groupName = name ?? ids.id;
  const controlled = value !== undefined;
  const [current, setCurrent] = useControllable({
    value,
    defaultValue: defaultValue ?? '',
    onChange: onValueChange,
  });
  const description = describedBy(hint, error, ids.hintId, ids.errorId);

  return (
    <fieldset
      data-slot="radio-group"
      aria-describedby={description}
      className={cx('m-0 flex w-full min-w-0 flex-col gap-token-xs border-0 p-0', className)}
    >
      <legend className="px-0 text-sm font-medium text-fg">{label}</legend>
      <div className="flex flex-col gap-token-xs">
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center gap-token-sm text-sm text-fg">
            <input
              type="radio"
              name={groupName}
              value={option.value}
              disabled={option.disabled}
              onChange={() => setCurrent(option.value)}
              className={cx('m-0 size-4 accent-accent', focusClass)}
              {...(controlled
                ? { checked: current === option.value }
                : { defaultChecked: defaultValue === option.value })}
            />
            {option.label}
          </label>
        ))}
      </div>
      {hint ? <FieldHint id={ids.hintId}>{hint}</FieldHint> : null}
      {error ? <FieldError id={ids.errorId}>{error}</FieldError> : null}
    </fieldset>
  );
}
