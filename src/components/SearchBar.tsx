import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { close, heart, search } from "ionicons/icons";
import SearchInputContainer from "./SearchInputContainer";
import "../styles/SearchBar.css";
import { useAppContext } from '../context/ContextProvider';


const SearchBar: React.FC = () => {
  const {searchContent, setSearchContent} = useAppContext();

  const clearText = ()=>{
    setSearchContent("");
  }
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <SearchInputContainer></SearchInputContainer>
        <button className= {`clear-text ${searchContent.length >= 1 ? '' : 'hidden'}`} onClick={clearText}>
          <IonIcon className="flex-centered-horizontal icon" icon={close} />
        </button>
        <button className="search-button">
          <IonIcon className="flex-centered-horizontal icon" icon={search} />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
