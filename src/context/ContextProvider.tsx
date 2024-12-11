import React, { createContext, useContext, useState } from "react";
import { SearchResult } from "../interfaces/SearchResult";

interface AppContextType {
  searchContent: string;
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
  searchResult: SearchResult;
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResult>>;
  suggestions: string[];
  setSuggestions:React.Dispatch<React.SetStateAction<string[]>>;
  focusedIndex: number;
  setFocusedIndex:React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [searchContent, setSearchContent] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResult>({
    TotalNumberOfResults: 0,
    Page: 1,
    PageSize: 10,
    ResultItems: [],
  });

  return (
    <AppContext.Provider
      value={{ searchContent, setSearchContent, searchResult, setSearchResult, suggestions, setSuggestions, focusedIndex, setFocusedIndex }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an Context Provider");
  }
  return context;
};
