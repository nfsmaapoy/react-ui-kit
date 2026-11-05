import { useState } from 'react';

type ControllableOptions<T> = {
  value: T | undefined;
  defaultValue: T;
  onChange?: ((next: T) => void) | undefined;
};

export function useControllable<T>({
  value,
  defaultValue,
  onChange,
}: ControllableOptions<T>): [T, (next: T) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const current = value !== undefined ? value : internal;

  const set = (next: T) => {
    if (value === undefined) {
      setInternal(next);
    }
    onChange?.(next);
  };

  return [current, set];
}
