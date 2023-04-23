import { createContext } from "react";

interface SharedDataContextProps<T> {
  data?: T;
  key?: string,
  setAction?: (key:string, data: T) => void
  removeAction? :(key: string) => void;
  setData?: any
}

export const SharedDataContext = createContext<SharedDataContextProps<any>>({
  data        : undefined,
  key         : undefined,
  setAction   : (_key,_data) => null,
  removeAction: (_key) => null,
  setData     : undefined
});


