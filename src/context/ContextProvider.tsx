import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  searchContent: string;
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [searchContent, setSearchContent] = useState('');

  return (
    <AppContext.Provider value={{ searchContent, setSearchContent }}>
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
