import { useQuery } from "react-query";
import { fetchProblems } from "../api/problems";
import { useState } from "react";

export const useFetchProblems = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const queryResult = useQuery({
    queryKey: ["problems"],
    queryFn: () => fetchProblems(offset, limit),
  });

  return {
    setLimit,
    setOffset,
    queryResult,
  };
};
