import React from "react";
import SearchBar from "../components/SearchBar";
import "../styles/Search.css";

const Search: React.FC = () => {
  return (
    <div className="search">
      <SearchBar></SearchBar>
    </div>
  );
};

export default Search;
