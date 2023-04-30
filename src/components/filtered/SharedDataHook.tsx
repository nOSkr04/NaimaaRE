import { useContext } from "react";
import { FilteredDataContext } from "./FilteredDataContextProps";


export const useFilteredData = () => {
  const context = useContext(FilteredDataContext);
  if (context === undefined) {
    throw new Error("useBackgroundService must be used within a BackgroundServiceProvider");
  }
  return context;
};
