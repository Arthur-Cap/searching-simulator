import React from "react";
import SearchBar from "../../components/SearchBar";
import "./SearchPage.css";
import SearchResult from "../../components/SearchResults";

const Search: React.FC = () => {


  return (
    <div className="search">
      <SearchBar />
      <SearchResult />
    </div>
  );
};

export default Search;
