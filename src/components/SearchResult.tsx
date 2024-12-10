import React, { useState, useEffect } from "react";
import "../styles/SearchResult.css";
import { DocumentItem, HighlightedText, Highlight } from '../interface/SearchResult';

const SearchResult: React.FC<{documentItem:DocumentItem}> = ({documentItem }) => {
  const { DocumentId, DocumentTitle, DocumentExcerpt, DocumentURI } = documentItem;
  return (
    <div className="search-result">
      <a href={DocumentURI} className="result-title">{DocumentTitle.Text}</a>
      <span className="result-brief-content">1 Sep 2021 - {DocumentExcerpt.Text}</span>
      <a href={DocumentURI} className="result-link">{DocumentURI}</a>
    </div>
  );
};

export default SearchResult;
