import React from 'react';
import './EnhancedButton.css';

/**
 * Enhanced Button Component
 * Comprehensive button system with multiple variants, sizes, and states
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'left' | 'right';

interface EnhancedButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
}) => {
  const buttonClasses = [
    'enhanced-btn',
    `enhanced-btn--${variant}`,
    `enhanced-btn--${size}`,
    fullWidth && 'enhanced-btn--full-width',
    loading && 'enhanced-btn--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    onClick?.(e);
  };

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading && (
        <div className="enhanced-btn__spinner">
          <div className="spinner" />
        </div>
      )}

      {!loading && icon && iconPosition === 'left' && (
        <span className="enhanced-btn__icon enhanced-btn__icon--left">{icon}</span>
      )}

      <span className="enhanced-btn__text">{children}</span>

      {!loading && icon && iconPosition === 'right' && (
        <span className="enhanced-btn__icon enhanced-btn__icon--right">{icon}</span>
      )}
    </button>
  );
};

/**
 * Variant-specific button components
 */

export const PrimaryButton: React.FC<Omit<EnhancedButtonProps, 'variant'>> = (props) => (
  <EnhancedButton variant="primary" {...props} />
);

export const SecondaryButton: React.FC<Omit<EnhancedButtonProps, 'variant'>> = (props) => (
  <EnhancedButton variant="secondary" {...props} />
);

export const GhostButton: React.FC<Omit<EnhancedButtonProps, 'variant'>> = (props) => (
  <EnhancedButton variant="ghost" {...props} />
);

export const SuccessButton: React.FC<Omit<EnhancedButtonProps, 'variant'>> = (props) => (
  <EnhancedButton variant="success" {...props} />
);

export const WarningButton: React.FC<Omit<EnhancedButtonProps, 'variant'>> = (props) => (
  <EnhancedButton variant="warning" {...props} />
);

export const DangerButton: React.FC<Omit<EnhancedButtonProps, 'variant'>> = (props) => (
  <EnhancedButton variant="danger" {...props} />
);

/**
 * IconButton - Icon-only button with tooltip
 */

interface IconButtonProps {
  icon: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  tooltip?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  variant = 'ghost',
  tooltip,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const buttonClasses = [
    'enhanced-btn',
    `enhanced-btn--${variant}`,
    `enhanced-btn--${size}`,
    'enhanced-btn--icon-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      type={type}
      aria-label={tooltip}
    >
      {icon}
    </button>
  );
};

/**
 * FloatingActionButton - Fixed position circular button
 */

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  tooltip,
  position = 'bottom-right',
  className = '',
}) => {
  const fabClasses = [
    'enhanced-fab',
    `enhanced-fab--${position}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={fabClasses}
      onClick={onClick}
      title={tooltip}
      aria-label={tooltip}
      type="button"
    >
      {icon}
    </button>
  );
};

/**
 * ButtonGroup - Group related buttons
 */

interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  className = '',
}) => {
  const groupClasses = [
    'enhanced-btn-group',
    `enhanced-btn-group--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={groupClasses}>{children}</div>;
};

export default EnhancedButton;
