import React, { useState } from 'react';
import './Accordion.css';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultExpanded?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(items.filter(item => item.defaultExpanded).map(item => item.id))
  );

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map(item => (
        <div key={item.id} className="accordion__item">
          <button
            className={`accordion__header ${expandedItems.has(item.id) ? 'accordion__header--expanded' : ''}`}
            onClick={() => toggleItem(item.id)}
            aria-expanded={expandedItems.has(item.id)}
          >
            <span className="accordion__title">{item.title}</span>
            <span className="accordion__icon">{expandedItems.has(item.id) ? '−' : '+'}</span>
          </button>
          {expandedItems.has(item.id) && (
            <div className="accordion__content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};
