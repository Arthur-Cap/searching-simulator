import React from "react";
import "../styles/SearchResult.css";
import { DocumentItem, HighlightedText } from "../interface/SearchResult";

const SearchResult: React.FC<{ documentItem: DocumentItem }> = ({ documentItem }) => {
  const { DocumentTitle, DocumentExcerpt, DocumentURI } = documentItem;

  const renderHighlightedText = (rawContent: HighlightedText) => {
    const { Text, Highlights } = rawContent;

    return Highlights.reduce<React.ReactNode[]>((acc, highlight, index) => {
      const { BeginOffset, EndOffset } = highlight;
      const lastEnd = index > 0 ? Highlights[index - 1].EndOffset : 0;

      acc.push(Text.slice(lastEnd, BeginOffset));
      acc.push(
        <strong key={index}>{Text.slice(BeginOffset, EndOffset)}</strong>
      );

      if (index === Highlights.length - 1) {
        acc.push(Text.slice(EndOffset));
      }

      return acc;
    }, []);
  };

  return (
    <div className="search-result">
      <a href={DocumentURI} className="result-title">
        {DocumentTitle.Text}
      </a>
      <span className="result-brief-content">
        1 Sep 2021 - {renderHighlightedText(DocumentExcerpt)}
      </span>
      <a href={DocumentURI} className="result-link">
        {DocumentURI}
      </a>
    </div>
  );
};

export default SearchResult;
