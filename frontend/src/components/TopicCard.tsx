import React from 'react';
import { ProgressBar } from './ProgressBar';
import './TopicCard.css';

interface TopicCardProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  progress: number; // 0-100
  completedCount: number;
  totalCount: number;
  isLocked?: boolean;
  onNavigate?: (id: string) => void;
  className?: string;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  id,
  title,
  icon,
  progress,
  completedCount,
  totalCount,
  isLocked = false,
  onNavigate,
  className = '',
}) => {
  const handleClick = () => {
    if (!isLocked && onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <div
      className={`topic-card ${isLocked ? 'topic-card--locked' : ''} ${className}`}
      onClick={handleClick}
      role={isLocked ? undefined : 'button'}
      tabIndex={isLocked ? undefined : 0}
      onKeyDown={(e) => {
        if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {isLocked && (
        <div className="topic-card__lock-overlay">
          <span className="topic-card__lock-icon">🔒</span>
        </div>
      )}
      
      <div className="topic-card__header">
        {icon && <div className="topic-card__icon">{icon}</div>}
        <h3 className="topic-card__title">{title}</h3>
      </div>
      
      <div className="topic-card__progress">
        <ProgressBar
          value={progress}
          type="linear"
          color={progress === 100 ? 'success' : 'primary'}
          showLabel={false}
        />
        <div className="topic-card__stats">
          <span className="topic-card__count">
            {completedCount} / {totalCount} completed
          </span>
          <span className="topic-card__percentage">{Math.round(progress)}%</span>
        </div>
      </div>
      
      {progress === 100 && (
        <div className="topic-card__badge">
          <span className="topic-card__badge-icon">✓</span>
          Completed
        </div>
      )}
    </div>
  );
};
