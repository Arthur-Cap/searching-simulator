import React, { useState, useEffect} from 'react';
import './SearchInput.css';
import { useAppContext } from '../../../context/ContextProvider';

interface SearchInputProps {
  onSearch: () => void; 
}

const SearchInputContainer: React.FC<SearchInputProps> = ({ onSearch }) => {
  const {searchContent, setSearchContent, suggestions, setSuggestions, focusedIndex, setFocusedIndex} = useAppContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(event.target.value);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) =>
        prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } 
    else if (e.key === 'Enter' && focusedIndex ===-1) {
      setFocusedIndex(-1);
      onSearch();
      setSuggestions([]);
    }
    else if (e.key === 'Enter' && focusedIndex >= 0) {
      setSearchContent(suggestions[focusedIndex]);
      setFocusedIndex(-1);
      onSearch();
      setSuggestions([]);
    }
  };

  useEffect(() => {
    setFocusedIndex(-1);
  }, [suggestions]);

  return (
    <div className='search-input-container'>
      <input
        className='search-input'
        type="text"
        value={searchContent}
        onChange={handleInputChange} 
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchInputContainer;
