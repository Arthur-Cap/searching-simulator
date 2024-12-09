import React, { useState, useEffect } from 'react';
import '../styles/SearchSuggestion.css';

interface SuggesionProps {
  content: string;
  highlight: string;
}

const SearchSuggesion: React.FC<SuggesionProps> = ({ content, highlight }) => {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, 'gi'); 
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div className='suggesion'>
      <p>{highlightText(content, highlight)}</p>
    </div>
  );
};

export default SearchSuggesion;
