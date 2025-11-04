import { createContext, useState, useContext, type ReactNode } from "react";

export type IPData = {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
  readme?: string;
};

type MapContextType = {
  ipData: IPData | null;
  setIpData: (data: IPData) => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [ipData, setIpData] = useState<IPData | null>(null);

  return <MapContext.Provider value={{ ipData, setIpData }}>{children}</MapContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
