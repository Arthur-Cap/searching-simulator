import { IonIcon } from "@ionic/react";
import axios from "axios";
import { close, search } from "ionicons/icons";
import React from "react";
import { useAppContext } from "../../context/ContextProvider";
import SearchInputContainer from "./SearchInput";
import "./SearchBar.css";
import SearchSuggestionContainer from "./Suggesions";

import { QUERY_RESULT_URL } from "../../constants/constant";

const SearchBar: React.FC = () => {
  const {
    searchContent,
    setSearchContent,
    setSuggestions,
    setSearchResult,
    suggestions,
    focusedIndex,
    setFocusedIndex,
  } = useAppContext();

  const clearText = () => {
    setSearchContent("");
  };

  const getSearchResult = () => {
    axios
      .get(QUERY_RESULT_URL)
      .then((response) => {
        setSearchResult(response.data);
      })
      .catch((err) => {
        console.error("Error fetching suggestions", err);
      });
  };

  const executeSearch = () => {
    getSearchResult();
    setSuggestions([]);
  };
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <SearchInputContainer onSearch={getSearchResult}></SearchInputContainer>
        <button
          className={`clear-text ${searchContent.length >= 1 ? "" : "hidden"}`}
          onClick={clearText}
        >
          <IonIcon className="flex-centered-horizontal icon" icon={close} />
        </button>
        <button className="search-button" onClick={executeSearch}>
          <IonIcon className="flex-centered-horizontal icon" icon={search} />
          Search
        </button>
        <SearchSuggestionContainer
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          focusedIndex={focusedIndex}
          onSearch={getSearchResult}
        />
      </div>
    </div>
  );
};

export default SearchBar;
