import React, { useState } from 'react';
import SearchSuggestionContainer from './SearchSuggestionContainer';
import '../styles/SearchInputContainer.css';
import { useAppContext } from '../context/ContextProvider';

const SearchInputContainer: React.FC = () => {
  const {searchContent, setSearchContent} = useAppContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(event.target.value);
  };

  return (
    <div className='search-input-container'>
      <input
        className='search-input'
        type="text"
        value={searchContent}
        onChange={handleInputChange} 
      />
      <SearchSuggestionContainer searchContent={searchContent} />
    </div>
  );
};

export default SearchInputContainer;
