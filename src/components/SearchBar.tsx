import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { close, heart, search } from "ionicons/icons";
import SearchInputContainer from "./SearchInputContainer";
import "../styles/SearchBar.css";
import { useAppContext } from '../context/ContextProvider';
import axios from "axios";



const SearchBar: React.FC = () => {
  const {searchContent, setSearchContent} = useAppContext();
  const {searchResult, setSearchResult} = useAppContext();

  const clearText = ()=>{
    setSearchContent("");
  }

  const getSearchResult = ()=>{
    axios
            .get(
              "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json"
            )
            .then((response) => {
              setSearchResult(response.data);
            })
            .catch((err) => {
              console.error("Error fetching suggestions", err);
            });
  }

  const executeSearch = ()=>{
    getSearchResult();
  }
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <SearchInputContainer onSearch={getSearchResult}></SearchInputContainer>
        <button className= {`clear-text ${searchContent.length >= 1 ? '' : 'hidden'}`} onClick={clearText}>
          <IonIcon className="flex-centered-horizontal icon" icon={close} />
        </button>
        <button className="search-button"
          onClick={executeSearch}
        >
          <IonIcon className="flex-centered-horizontal icon" icon={search} />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
