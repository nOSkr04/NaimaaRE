import React, { useState } from "react";
import { FilteredDataContext } from "./FilteredDataContextProps";

type FilteredDataProviderProps = {
  children: React.ReactNode
}

export const FilteredDataProvider = ({ children }:FilteredDataProviderProps) => {

  const [data, setData] = useState<Map<string, any>>();

  const setAction = (key, _data) => {
    if(typeof _data === "function") {
      setData((e) => {
     
        // if(e && e[`${key}`]) {
        //   return {};
        // }

        return {
          ...(e || {}),
          [key]: _data(e && e[`${key}`])
        };
     
      });
    }
    
   
  };

  const removeAction = (key: string) => {
    setData((values: any) => {
      const res = Object.keys(values).filter(item => item !== key);

    });
  };

  return (
    <FilteredDataContext.Provider
      value={{
        data,
        setAction,
        removeAction,
        setData
      }}
    >
      {children}
    </FilteredDataContext.Provider>
  );
};