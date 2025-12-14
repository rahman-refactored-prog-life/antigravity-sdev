import React from 'react';
import './Badge.css';

export type BadgeVariant = 'filled' | 'outlined' | 'dot';
export type BadgeColor = 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'filled',
  color = 'neutral',
  size = 'medium',
  className = '',
}) => {
  const classes = `badge badge--${variant} badge--${color} badge--${size} ${className}`.trim();

  return (
    <span className={classes}>
      {variant === 'dot' && <span className="badge__dot" />}
      {children}
    </span>
  );
};

// Difficulty badge helpers
export const DifficultyBadge: React.FC<{ difficulty: 'Easy' | 'Medium' | 'Hard' }> = ({ difficulty }) => {
  const colorMap: Record<string, BadgeColor> = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'danger',
  };

  return (
    <Badge color={colorMap[difficulty]} size="small">
      {difficulty}
    </Badge>
  );
};
