import React, { useState, useEffect } from "react";
import "./SearchResults.css";
import { useAppContext } from "../../context/ContextProvider";
import SearchResultComponent from "./Result";

const SearchResultContainer: React.FC = () => {
  const { searchResult } = useAppContext();

  useEffect(() => {}, [searchResult]);
  const isShowPaginationInformation = searchResult.TotalNumberOfResults != 0 ? "" : "hidden";

  return (
    <div className="search-result-container">
      <h2
        className={`pagination-infomation ${isShowPaginationInformation}`}
      >
        Showing {searchResult.Page}-{searchResult.Page * searchResult.PageSize}{" "}
        of {searchResult.TotalNumberOfResults} results
      </h2>
      {searchResult.ResultItems.map((resultItem) => (
        <SearchResultComponent
          documentItem={resultItem}
        ></SearchResultComponent>
      ))}
    </div>
  );
};

export default SearchResultContainer;
