import React, { createContext, useState, ReactNode } from "react";

interface HistoryContextProps {
  history: string[];
  addToHistory: (item: string) => void;
  clearHistory: () => void;
}

export const HistoryContext = createContext<HistoryContextProps | undefined>(
  undefined
);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<string[]>([]);

  const addToHistory = (item: string) => {
    setHistory((prevHistory) => [item, ...prevHistory]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
