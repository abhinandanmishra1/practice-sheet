import "./App.css";
import { Table } from "./components/Table";

interface Problem {
  name: string;
  problemId: string;
}

function App() {
  return (
    <div className="h-[80dvh] p-4 bg-[#282828] rounded-[8px] text-white w-[90vw] flex flex-col items-center">
      <h1 className="font-bold">Practice Sheet</h1>
      <Table />
    </div>
  );
}

export default App;
