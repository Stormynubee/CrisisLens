'use client';

import clsx from 'clsx';
import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-label-md transition-all duration-200 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]',
          variant === 'primary' && 'bg-primary text-on-primary hover:opacity-90 active:opacity-80 rounded',
          variant === 'secondary' &&
            'bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low rounded',
          variant === 'ghost' && 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded',
          size === 'sm' && 'px-3 py-1.5 text-body-sm',
          size === 'md' && 'px-4 py-2 text-body-sm',
          size === 'lg' && 'px-6 py-3 text-body-base w-full',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
