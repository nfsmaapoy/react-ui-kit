import { createContext, useContext, useId, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { useControllable } from '../../lib/use-controllable';
import { focusClass } from '../../lib/styles';

type TabsContextValue = {
  value: string;
  setValue: (next: string) => void;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs');
  }
  return context;
}

export type TabsProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
};

export function Tabs({ value, defaultValue = '', onValueChange, children, className }: TabsProps) {
  const [current, setCurrent] = useControllable({
    value,
    defaultValue,
    onChange: onValueChange,
  });
  const baseId = useId();

  return (
    <TabsContext.Provider value={{ value: current, setValue: setCurrent, baseId }}>
      <div data-slot="tabs" className={cx('flex flex-col gap-token-md', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  const { setValue } = useTabs();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    if (tabs.length === 0) return;

    const index = tabs.findIndex((tab) => tab === document.activeElement);
    if (index < 0) return;

    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const next = tabs[nextIndex];
    if (!next) return;
    next.focus();
    if (next.dataset.value) setValue(next.dataset.value);
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={onKeyDown}
      className={cx('inline-flex gap-token-xs rounded-lg bg-surface-2 p-token-xs', className)}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  disabled,
  className,
}: {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  const tabs = useTabs();
  const selected = tabs.value === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${tabs.baseId}-tab-${value}`}
      aria-controls={`${tabs.baseId}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      data-value={value}
      onClick={() => tabs.setValue(value)}
      className={cx(
        'cursor-pointer rounded-md border-0 px-token-md py-token-xs font-sans text-sm font-medium text-muted disabled:cursor-not-allowed disabled:opacity-50',
        focusClass,
        selected && 'bg-surface text-fg shadow-card',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsPanel({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const tabs = useTabs();
  const selected = tabs.value === value;

  return (
    <div
      role="tabpanel"
      id={`${tabs.baseId}-panel-${value}`}
      aria-labelledby={`${tabs.baseId}-tab-${value}`}
      hidden={!selected}
      className={cx('text-sm text-fg', className)}
    >
      {children}
    </div>
  );
}
