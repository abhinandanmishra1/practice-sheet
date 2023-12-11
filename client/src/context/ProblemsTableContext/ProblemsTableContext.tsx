import React, { useEffect, useState } from "react";

type func = (prev: number) => number;
const ProblemsTableContext = React.createContext({
  limit: 20,
  offset: 0,
  pageIndex: 0,
  setLimit: (limit: number) => {},
  setOffset: (offset: number) => {},
  setPageIndex: (fn: func) => {},
});

export const ProblemsTableContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  const [value, setValue] = useState({
    limit,
    offset,
    pageIndex,
    setLimit,
    setOffset,
    setPageIndex,
  });

  useEffect(() => {
    setValue((prev) => ({ ...prev, pageIndex, offset: 10 * pageIndex }));
  }, [pageIndex]);

  return (
    <ProblemsTableContext.Provider value={value}>
      {children}
    </ProblemsTableContext.Provider>
  );
};

export const useProblemTableContext = () => {
  return React.useContext(ProblemsTableContext);
};
