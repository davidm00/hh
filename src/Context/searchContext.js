import React, { useMemo, useState } from "react";

export const SearchContext = React.createContext();

const SearchContextProvider = (props) => {
  // Initial Provider State
  const [localInfo, setLocalInfo] = useState([]);

  const providerValue = useMemo(
    () => ({
        localInfo,
        setLocalInfo,
    }),
    [localInfo, setLocalInfo]
  );

  return (
    <SearchContext.Provider value={providerValue}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
