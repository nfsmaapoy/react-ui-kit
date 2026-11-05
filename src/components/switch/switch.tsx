import { cx } from '../../lib/cx';
import { useControllable } from '../../lib/use-controllable';
import { focusClass } from '../../lib/styles';
import { useFieldIds } from '../field/field';

export type SwitchProps = {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
};

export function Switch({
  label,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  id,
  name,
  className,
}: SwitchProps) {
  const ids = useFieldIds(id);
  const [current, setCurrent] = useControllable({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <div data-slot="switch" className={cx('flex items-center justify-between gap-token-md', className)}>
      <label htmlFor={ids.id} className="text-sm font-medium text-fg">
        {label}
      </label>
      <button
        id={ids.id}
        type="button"
        role="switch"
        aria-checked={current}
        disabled={disabled}
        onClick={() => setCurrent(!current)}
        className={cx(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent p-0.5 box-border disabled:cursor-not-allowed disabled:opacity-50',
          focusClass,
          current ? 'bg-accent' : 'bg-border',
        )}
      >
        <span
          aria-hidden="true"
          className={cx(
            'pointer-events-none block size-5 rounded-full bg-thumb shadow-card transition-transform',
            current ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
      {name ? (
        <input type="checkbox" name={name} checked={current} readOnly hidden tabIndex={-1} aria-hidden="true" />
      ) : null}
    </div>
  );
}
