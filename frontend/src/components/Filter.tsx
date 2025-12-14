import React, { useState } from 'react';
import './Filter.css';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

export interface SortOption {
  id: string;
  label: string;
  value: string;
}

interface FilterProps {
  filterGroups: FilterGroup[];
  sortOptions: SortOption[];
  selectedFilters: Record<string, string[]>;
  selectedSort: string;
  onFilterChange: (groupId: string, values: string[]) => void;
  onSortChange: (sortId: string) => void;
  onClearAll: () => void;
  className?: string;
}

export const Filter: React.FC<FilterProps> = ({
  filterGroups,
  sortOptions,
  selectedFilters,
  selectedSort,
  onFilterChange,
  onSortChange,
  onClearAll,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterToggle = (groupId: string, optionValue: string, multiSelect: boolean) => {
    const current = selectedFilters[groupId] || [];
    
    if (multiSelect) {
      const newValues = current.includes(optionValue)
        ? current.filter(v => v !== optionValue)
        : [...current, optionValue];
      onFilterChange(groupId, newValues);
    } else {
      onFilterChange(groupId, [optionValue]);
    }
  };

  const hasActiveFilters = Object.values(selectedFilters).some(values => values.length > 0);

  return (
    <div className={`filter ${className}`}>
      <div className="filter__header">
        <button
          className="filter__toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          Filters {hasActiveFilters && `(${Object.values(selectedFilters).flat().length})`}
        </button>
        
        <div className="filter__sort">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {hasActiveFilters && (
          <button className="filter__clear" onClick={onClearAll}>
            Clear All
          </button>
        )}
      </div>

      {isOpen && (
        <div className="filter__panel">
          {filterGroups.map(group => (
            <div key={group.id} className="filter__group">
              <h4 className="filter__group-title">{group.label}</h4>
              <div className="filter__options">
                {group.options.map(option => {
                  const isSelected = (selectedFilters[group.id] || []).includes(option.value);
                  return (
                    <label key={option.id} className="filter__option">
                      <input
                        type={group.multiSelect ? 'checkbox' : 'radio'}
                        name={group.id}
                        checked={isSelected}
                        onChange={() => handleFilterToggle(group.id, option.value, group.multiSelect || false)}
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
