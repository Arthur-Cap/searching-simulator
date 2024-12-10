import React, { useState, useEffect } from "react";
import "../styles/SearchResultContainer.css";
import { useAppContext } from '../context/ContextProvider';
import SearchResultComponent from "./SearchResult";
import { SearchResult } from '../interface/SearchResult';



const SearchResultContainer: React.FC = () => {
  const {searchResult} = useAppContext();
  
  useEffect(() => { 

  }, [searchResult]);

  return (
    <div className="search-result-container">
      <h2 className={`pagination-infomation ${searchResult.TotalNumberOfResults!=0?"":"hidden"}`}> Showing {searchResult.Page}-{searchResult.Page*searchResult.PageSize} of {searchResult.TotalNumberOfResults} results</h2>
      {searchResult.ResultItems.map((resultItem) =>(
        <SearchResultComponent documentItem = {resultItem}></SearchResultComponent>
      ))}
    </div>
  );
};

export default SearchResultContainer;