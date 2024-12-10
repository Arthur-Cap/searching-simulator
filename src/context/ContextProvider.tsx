import React, { createContext, useContext, useState } from 'react';
import { SearchResult } from '../interface/SearchResult';

interface AppContextType {
  searchContent: string;
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
  searchResult: SearchResult;
  setSearchResult : React.Dispatch<React.SetStateAction<SearchResult>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [searchContent, setSearchContent] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult>({
    TotalNumberOfResults: 0,
    Page: 1,
    PageSize: 10,
    ResultItems: [],
  });

  return (
    <AppContext.Provider value={{ searchContent, setSearchContent, searchResult, setSearchResult }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an Context Provider');
  }
  return context;
};
