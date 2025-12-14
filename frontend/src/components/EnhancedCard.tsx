import React from 'react';
import './EnhancedCard.css';

/**
 * Enhanced Card Component
 * Base card with smooth hover effects and animations
 */

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  style?: React.CSSProperties;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className = '',
  onClick,
  hover = true,
  style,
}) => {
  const cardClasses = [
    'enhanced-card',
    hover && 'enhanced-card--hover',
    onClick && 'enhanced-card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={cardClasses}
      onClick={onClick}
      style={style}
      {...(onClick && { type: 'button' })}
    >
      {children}
    </Component>
  );
};

/**
 * ModuleCard - For displaying learning modules
 */

interface ModuleCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  difficulty?: string;
  progress?: number;
  topicCount?: number;
  estimatedHours?: number;
  onClick?: () => void;
  className?: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  difficulty,
  progress,
  topicCount,
  estimatedHours,
  onClick,
  className = '',
}) => {
  return (
    <EnhancedCard className={`module-card ${className}`} onClick={onClick}>
      <div className="module-card__header">
        {icon && <div className="module-card__icon">{icon}</div>}
        {difficulty && <span className="module-card__difficulty">{difficulty}</span>}
      </div>

      <h3 className="module-card__title">{title}</h3>
      <p className="module-card__description">{description}</p>

      {progress !== undefined && (
        <div className="module-card__progress">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}>
              <div className="progress-shimmer" />
            </div>
          </div>
          <span className="progress-text">{progress}%</span>
        </div>
      )}

      {(topicCount !== undefined || estimatedHours !== undefined) && (
        <div className="module-card__meta">
          {topicCount !== undefined && <span>📚 {topicCount} topics</span>}
          {estimatedHours !== undefined && <span>⏱️ {estimatedHours}h</span>}
        </div>
      )}
    </EnhancedCard>
  );
};

/**
 * StatCard - For dashboard statistics
 */

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  trend = 'neutral',
  color,
  className = '',
}) => {
  return (
    <EnhancedCard className={`stat-card ${className}`} hover={true}>
      <div className="stat-card__header">
        {icon && (
          <div className="stat-card__icon" style={{ color }}>
            {icon}
          </div>
        )}
        {change && <div className={`stat-card__change stat-card__change--${trend}`}>{change}</div>}
      </div>
      <div className="stat-card__content">
        <div className="stat-card__value">{value}</div>
        <div className="stat-card__title">{title}</div>
      </div>
    </EnhancedCard>
  );
};

/**
 * QuickActionCard - For common user actions
 */

interface QuickActionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  color?: string;
  className?: string;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon,
  onClick,
  color,
  className = '',
}) => {
  return (
    <EnhancedCard className={`quick-action-card ${className}`} onClick={onClick}>
      {icon && (
        <div className="quick-action-card__icon" style={{ color }}>
          {icon}
        </div>
      )}
      <div className="quick-action-card__content">
        <h4 className="quick-action-card__title">{title}</h4>
        {description && <p className="quick-action-card__description">{description}</p>}
      </div>
    </EnhancedCard>
  );
};

/**
 * ProgressCard - For milestone tracking
 */

interface ProgressCardProps {
  title: string;
  description?: string;
  progress: number;
  target?: number;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  className?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  description,
  progress,
  target = 100,
  dueDate,
  priority = 'medium',
  className = '',
}) => {
  const progressPercentage = (progress / target) * 100;

  return (
    <EnhancedCard className={`progress-card ${className}`} hover={true}>
      <div className="progress-card__header">
        <h4 className="progress-card__title">{title}</h4>
        <span className={`progress-card__priority progress-card__priority--${priority}`}>
          {priority}
        </span>
      </div>
      {description && <p className="progress-card__description">{description}</p>}

      <div className="progress-card__progress">
        <div className="progress-enhanced">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}>
            <div className="progress-shimmer" />
          </div>
        </div>
        <div className="progress-card__stats">
          <span className="progress-text">
            {progress}/{target}
          </span>
          {dueDate && <span className="due-date">📅 {dueDate}</span>}
        </div>
      </div>
    </EnhancedCard>
  );
};

/**
 * AchievementCard - For user achievements
 */

interface AchievementCardProps {
  title: string;
  description: string;
  icon?: string;
  date?: string;
  type?: string;
  className?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  icon,
  date,
  className = '',
}) => {
  return (
    <EnhancedCard className={`achievement-card ${className}`} hover={true}>
      {icon && <div className="achievement-card__icon">{icon}</div>}
      <div className="achievement-card__content">
        <h4 className="achievement-card__title">{title}</h4>
        <p className="achievement-card__description">{description}</p>
        {date && <span className="achievement-card__date">{date}</span>}
      </div>
    </EnhancedCard>
  );
};

export default EnhancedCard;
