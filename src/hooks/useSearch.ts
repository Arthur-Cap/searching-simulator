// Input : searchKey

import { useState } from "react";

// Output => list da search + fucntion call api
const useSearch = (key: string) => {
  const [result, setResults] = useState([]);
  const getData = () => {
    setResults([]);
    // axios...
  };
  return [result, getData];
};
