import { useMemo, useState } from "react";
import "./App.css";
import { useFetchProblems } from "./hooks/problems";
import { Table } from "./components/Table";
import { getProblemLink } from "./helpers/main";

interface Problem {
  name: string;
  problemId: string;
}

function App() {
  const { queryResult, setLimit, setOffset } = useFetchProblems();

  const { data, isLoading, error } = queryResult;

  const problems = useMemo(() => {
    return data?.problems.map((problem: Problem) => {
      return { ...problem, link: getProblemLink(problem.problemId) };
    });
  }, [data?.problems]);
  console.log(problems);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <p>Error </p>;
  }

  return (
    <div className="App">
      <Table data={problems} />
    </div>
  );
}

export default App;
