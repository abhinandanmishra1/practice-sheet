import { useQuery } from "react-query";
import { fetchProblems } from "../api/problems";
import { useState } from "react";
import { useProblemTableContext } from "../context/ProblemsTableContext/ProblemsTableContext";

export const useFetchProblems = () => {
  const {limit, offset} = useProblemTableContext()

  return useQuery({
    queryKey: ["problems", limit, offset],
    queryFn: () => fetchProblems(offset, limit),
  });
};
