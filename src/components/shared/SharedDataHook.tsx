import { useContext } from "react";
import { SharedDataContext } from "./SharedDataContext";


export const useSharedData = () => {
  const context = useContext(SharedDataContext);
  if (context === undefined) {
    throw new Error("useBackgroundService must be used within a BackgroundServiceProvider");
  }
  return context;
};
