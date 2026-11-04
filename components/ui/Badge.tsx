import { HTMLAttributes, forwardRef } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'secondary', className = '', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`${variantClasses[variant]} ${className}`.trim()}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';