import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';
export type TooltipTrigger = 'hover' | 'focus' | 'click';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  trigger?: TooltipTrigger;
  maxWidth?: number;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  maxWidth = 300,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && position === 'auto' && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Determine best position based on available space
      const spaceTop = triggerRect.top;
      const spaceBottom = window.innerHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = window.innerWidth - triggerRect.right;
      
      if (spaceTop > tooltipRect.height) {
        setActualPosition('top');
      } else if (spaceBottom > tooltipRect.height) {
        setActualPosition('bottom');
      } else if (spaceRight > tooltipRect.width) {
        setActualPosition('right');
      } else if (spaceLeft > tooltipRect.width) {
        setActualPosition('left');
      } else {
        setActualPosition('top');
      }
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') setIsVisible(false);
  };

  const handleFocus = () => {
    if (trigger === 'focus') setIsVisible(true);
  };

  const handleBlur = () => {
    if (trigger === 'focus') setIsVisible(false);
  };

  const handleClick = () => {
    if (trigger === 'click') setIsVisible(!isVisible);
  };

  return (
    <div className={`tooltip-wrapper ${className}`}>
      <div
        ref={triggerRef}
        className="tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        tabIndex={trigger === 'focus' ? 0 : undefined}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`tooltip tooltip--${actualPosition}`}
          style={{ maxWidth }}
          role="tooltip"
          aria-hidden={!isVisible}
        >
          <div className="tooltip__content">{content}</div>
          <div className="tooltip__arrow" />
        </div>
      )}
    </div>
  );
};
