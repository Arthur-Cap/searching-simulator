import React, { useState, useEffect } from "react";
import Suggesion from "../components/SearchSuggestion";
import "../styles/SearchSuggestionContainer.css";
import axios from "axios";

interface SearchSuggestionContainerProps {
  searchContent: string;
}

interface SearchSuggestionData {
  stemmedQueryTerm: string;
  suggestions: string[];
}

const SearchSuggestionContainer: React.FC<SearchSuggestionContainerProps> = ({
  searchContent,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [data, setData] = useState<SearchSuggestionData>({
    stemmedQueryTerm: "",
    suggestions: [],
  });
  useEffect(() => {
    if (searchContent.length > 2) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(() => {
        axios
          .get(
            "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json"
          )
          .then((response) => {
            setData(response.data);
            if (
              data.stemmedQueryTerm
                .toLocaleLowerCase()
                .includes(searchContent.toLowerCase())
            ) {
              setSuggestions(data.suggestions);
            } else {
              setSuggestions([]);
            }
          })
          .catch((err) => {
            console.error("Error fetching suggestions", err);
          });
      }, 500); 

      setDebounceTimeout(timeout); 
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [searchContent]); 

  return (
    <div className="search-suggestion-container">
      <ul className="suggestion-list">
        {suggestions.map((s, index) => (
          <li key={index}>
            <Suggesion content={s} highlight={searchContent} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestionContainer;
