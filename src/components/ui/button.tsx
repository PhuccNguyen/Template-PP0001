import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md hover:from-primary-700 hover:to-primary-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
        secondary: "bg-white text-secondary-700 border border-secondary-200 shadow-sm hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-md hover:-translate-y-0.5",
        outline: "border border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 hover:border-primary-700",
        ghost: "text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900",
        gradient: "bg-gradient-to-r from-primary-600 via-ai-600 to-blockchain-600 text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-1",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <span className={cn(buttonVariants({ variant, size, className }))}>
          {children}
        </span>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };