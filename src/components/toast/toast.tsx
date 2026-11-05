import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../lib/cx';
import { focusClass } from '../../lib/styles';

export type ToastInput = {
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'danger';
};

type ToastRecord = ToastInput & { id: string };

type ToastContextValue = {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

const borderClass = {
  info: 'border-border',
  success: 'border-success',
  danger: 'border-danger',
} as const;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const nextId = useRef(1);

  const api = useMemo<ToastContextValue>(
    () => ({
      toast: (input) => {
        const id = `toast-${nextId.current}`;
        nextId.current += 1;
        setToasts((current) => [...current, { ...input, id }]);
        return id;
      },
      dismiss: (id) => {
        setToasts((current) => current.filter((item) => item.id !== id));
      },
    }),
    [],
  );

  const viewport = (
    <div
      aria-label="Notifications"
      role="region"
      className="pointer-events-none fixed right-token-lg bottom-token-lg z-50 flex w-full max-w-sm flex-col gap-token-sm"
    >
      {toasts.map((item) => (
        <div
          key={item.id}
          role="status"
          className={cx(
            'pointer-events-auto rounded-md border bg-surface p-token-md text-fg shadow-pop',
            borderClass[item.variant ?? 'info'],
          )}
        >
          <div className="flex items-start justify-between gap-token-sm">
            <div>
              <p className="m-0 text-sm font-medium">{item.title}</p>
              {item.description ? <p className="m-0 mt-token-xs text-sm text-muted">{item.description}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => api.dismiss(item.id)}
              className={cx(
                'shrink-0 cursor-pointer border-0 bg-transparent p-0 font-sans text-sm text-muted underline-offset-2 hover:underline',
                focusClass,
              )}
            >
              Dismiss
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {typeof document === 'undefined' ? null : createPortal(viewport, document.body)}
    </ToastContext.Provider>
  );
}
