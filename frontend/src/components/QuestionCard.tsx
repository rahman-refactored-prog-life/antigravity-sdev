import React from 'react';
import { Badge, DifficultyBadge } from './Badge';
import './QuestionCard.css';

interface QuestionCardProps {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies?: string[];
  isCompleted?: boolean;
  isBookmarked?: boolean;
  onView?: (id: string) => void;
  onBookmark?: (id: string) => void;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  title,
  difficulty,
  companies = [],
  isCompleted = false,
  isBookmarked = false,
  onView,
  onBookmark,
  className = '',
}) => {
  return (
    <div className={`question-card ${isCompleted ? 'question-card--completed' : ''} ${className}`}>
      <div className="question-card__header">
        <h3 className="question-card__title">{title}</h3>
        <button
          className={`question-card__bookmark ${isBookmarked ? 'question-card__bookmark--active' : ''}`}
          onClick={() => onBookmark?.(id)}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? '★' : '☆'}
        </button>
      </div>
      
      <div className="question-card__meta">
        <DifficultyBadge difficulty={difficulty} />
        
        {companies.length > 0 && (
          <div className="question-card__companies">
            {companies.slice(0, 3).map((company, index) => (
              <Badge key={index} variant="outlined" color="info" size="small">
                {company}
              </Badge>
            ))}
            {companies.length > 3 && (
              <span className="question-card__more">+{companies.length - 3} more</span>
            )}
          </div>
        )}
      </div>
      
      <div className="question-card__actions">
        <button
          className="question-card__button"
          onClick={() => onView?.(id)}
        >
          {isCompleted ? 'Review' : 'Solve'}
        </button>
        {isCompleted && (
          <span className="question-card__status">✓ Completed</span>
        )}
      </div>
    </div>
  );
};
