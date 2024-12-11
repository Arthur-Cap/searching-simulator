import React, { useState, useEffect, useRef } from "react";
import Suggesion from "./Suggesion";
import axiosInstance from "../../../configs/axiosConfig";
import { useAppContext } from "../../../context/ContextProvider";
import { QUERY_SUGGESTIONS_URL } from "../../../constants/constant";

interface SearchSuggestionContainerProps {
  suggestions: string[];
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
  focusedIndex: number;
  onSearch: () => void;
}

interface SearchSuggestionData {
  stemmedQueryTerm: string;
  suggestions: string[];
}

const SearchSuggestionContainer: React.FC<SearchSuggestionContainerProps> = ({
  suggestions,
  setSuggestions,
  focusedIndex,
  onSearch,
}) => {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [data, setData] = useState<SearchSuggestionData>({
    stemmedQueryTerm: "",
    suggestions: [],
  });
  const { searchContent, setSearchContent } = useAppContext();

  const suggestionRefs = useRef<Array<HTMLLIElement | null>>([]);
  useEffect(() => {
    if (focusedIndex != -1) {
    } else if (searchContent.length > 2) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(() => {
        axiosInstance
          .get(QUERY_SUGGESTIONS_URL)
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
          <li
            className="suggestion-item"
            key={index}
            onClick={(event) => {
              onSearch();
              setSearchContent(s);
              setSuggestions([]);
            }}
            style={{
              backgroundColor: focusedIndex === index ? "#ddd" : "transparent",
              padding: "5px",
              cursor: "pointer",
            }}
            ref={(el) => {
              suggestionRefs.current[index] = el;
            }}
          >
            <Suggesion content={s} highlight={searchContent} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestionContainer;
