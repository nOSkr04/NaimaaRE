import React, { useState } from "react";
import { SharedDataContext } from "./SharedDataContext";

type SharedDataProviderProps = {
  children: React.ReactNode
}

export const SharedDataProvider = ({ children }:SharedDataProviderProps) => {

  const [data, setData] = useState<Map<string, any>>();

  const setAction = (key, _data) => {
    if(typeof _data === "function") {
      setData((e) => {
        console.log("e =>", e);
        console.log("data =>", _data(e && e[`${key}`]));
     
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

      console.log("res =>", res);
    });
  };

  return (
    <SharedDataContext.Provider
      value={{
        data,
        setAction,
        removeAction,
        setData
      }}
    >
      {children}
    </SharedDataContext.Provider>
  );
};