import React from "react";
import SearchBar from "../components/SearchBar";
import "../styles/Search.css";
import SearchResult from "../components/SearchResultContainer";

const Search: React.FC = () => {
  return (
    <div className="search">
      <SearchBar></SearchBar>
      <SearchResult></SearchResult>
    </div>
  );
};

export default Search;
