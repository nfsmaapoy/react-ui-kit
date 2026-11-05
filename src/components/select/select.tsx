import * as SelectPrimitive from '@radix-ui/react-select';
import { cx } from '../../lib/cx';
import { useControllable } from '../../lib/use-controllable';
import { Field, controlClass } from '../field/field';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  name?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-muted" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Select({
  label,
  options,
  placeholder = 'Choose one',
  hint,
  error,
  name,
  id,
  className,
  disabled,
  value,
  defaultValue,
  onValueChange,
}: SelectProps) {
  const [current, setCurrent] = useControllable({
    value,
    defaultValue: defaultValue ?? '',
    onChange: onValueChange,
  });

  return (
    <Field id={id} label={label} hint={hint} error={error} className={className}>
      {(field) => (
        <SelectPrimitive.Root value={current === '' ? undefined : current} onValueChange={setCurrent} disabled={disabled}>
          {name ? <input type="hidden" name={name} value={current} /> : null}
          <SelectPrimitive.Trigger
            {...field}
            data-slot="select"
            className={cx(controlClass, 'inline-flex h-10 items-center justify-between gap-token-sm text-left')}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon>
              <Chevron />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position="popper"
              sideOffset={4}
              className="z-50 max-h-60 w-[var(--radix-select-trigger-width)] overflow-auto rounded-md border border-border bg-surface p-token-xs text-fg shadow-pop"
            >
              <SelectPrimitive.Viewport>
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className="flex cursor-pointer items-center rounded-sm px-token-sm py-token-xs text-sm outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[highlighted]:bg-surface-2"
                  >
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      )}
    </Field>
  );
}
