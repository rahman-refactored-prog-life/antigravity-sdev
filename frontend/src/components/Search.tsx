import React, { useState, useEffect, useRef } from 'react';
import './Search.css';

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  suggestions?: string[];
  debounceMs?: number;
  showRecentSearches?: boolean;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  placeholder = 'Search...',
  onSearch,
  suggestions = [],
  debounceMs = 300,
  showRecentSearches = true,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (showRecentSearches) {
      const stored = localStorage.getItem('recentSearches');
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse recent searches', e);
        }
      }
    }
  }, [showRecentSearches]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query) {
      debounceRef.current = window.setTimeout(() => {
        onSearch(query);
      }, debounceMs);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, debounceMs, onSearch]);

  const handleSubmit = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = query ? suggestions : recentSearches;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && items[selectedIndex]) {
        setQuery(items[selectedIndex]);
        handleSubmit(items[selectedIndex]);
      } else {
        handleSubmit(query);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`search ${className}`}>
      <input
        ref={inputRef}
        type="text"
        className="search__input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (query || recentSearches.length > 0) && (
        <div className="search__suggestions">
          {query ? (
            suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`search__suggestion ${selectedIndex === index ? 'search__suggestion--selected' : ''}`}
                  onClick={() => {
                    setQuery(suggestion);
                    handleSubmit(suggestion);
                  }}
                >
                  {suggestion}
                </div>
              ))
            ) : null
          ) : (
            <>
              <div className="search__suggestions-title">Recent Searches</div>
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className={`search__suggestion ${selectedIndex === index ? 'search__suggestion--selected' : ''}`}
                  onClick={() => {
                    setQuery(search);
                    handleSubmit(search);
                  }}
                >
                  {search}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
