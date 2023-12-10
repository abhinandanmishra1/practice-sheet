import React, { useEffect, useState } from "react";

type func = (prev: number) => number;
const ProblemsContext = React.createContext({});

export const ProblemsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  
  const [value, setValue] = useState({});


  return (
    <ProblemsContext.Provider value={value}>
      {children}
    </ProblemsContext.Provider>
  );
};

export const useProblemTableContext = () => {
  return React.useContext(ProblemsContext);
};
