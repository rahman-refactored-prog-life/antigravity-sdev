import React from 'react';
import './ProgressBar.css';

export type ProgressBarType = 'linear' | 'circular';
export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'danger';

interface ProgressBarProps {
  value: number; // 0-100
  type?: ProgressBarType;
  color?: ProgressBarColor;
  showLabel?: boolean;
  label?: string;
  size?: number; // for circular type
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  type = 'linear',
  color = 'primary',
  showLabel = true,
  label,
  size = 120,
  className = '',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  if (type === 'circular') {
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedValue / 100) * circumference;

    return (
      <div className={`progress-circular progress-circular--${color} ${className}`} style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            className="progress-circular__track"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth="8"
          />
          <circle
            className="progress-circular__fill"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        {showLabel && (
          <div className="progress-circular__label">
            {label || `${Math.round(clampedValue)}%`}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`progress-linear progress-linear--${color} ${className}`}>
      <div className="progress-linear__track">
        <div
          className="progress-linear__fill"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <div className="progress-linear__label">
          {label || `${Math.round(clampedValue)}%`}
        </div>
      )}
    </div>
  );
};
