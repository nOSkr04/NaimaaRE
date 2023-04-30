import { createContext } from "react";

interface FilteredDataContextProps<T> {
  data?: T;
  key?: string,
  setAction?: (key:string, data: T) => void
  removeAction? :(key: string) => void;
  setData?: any
}

export const FilteredDataContext = createContext<FilteredDataContextProps<any>>({
  data        : undefined,
  key         : undefined,
  setAction   : (_key,_data) => null,
  removeAction: (_key) => null,
  setData     : undefined
});


