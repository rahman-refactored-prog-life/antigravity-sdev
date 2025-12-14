import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  maxDepth?: number;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  maxDepth = 4,
  className = '',
}) => {
  const displayItems = items.length > maxDepth
    ? [items[0], { label: '...' }, ...items.slice(-(maxDepth - 2))]
    : items;

  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <li key={index} className="breadcrumbs__item">
              {isEllipsis ? (
                <span className="breadcrumbs__ellipsis">{item.label}</span>
              ) : isLast || !item.path ? (
                <span className="breadcrumbs__current">{item.label}</span>
              ) : (
                <Link to={item.path} className="breadcrumbs__link">
                  {item.label}
                </Link>
              )}
              {!isLast && <span className="breadcrumbs__separator">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
