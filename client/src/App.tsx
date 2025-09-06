import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SheetsList } from "./components/Sheets/SheetsList";
import { SheetProblems } from "./components/Sheets/SheetProblems";

function App() {
  return (
    <Router>
      <Layout>
        <SignedIn>
          <Routes>
            <Route path="/" element={<SheetsList />} />
            <Route path="/sheets/:sheetId" element={<SheetProblems />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SignedIn>
        <SignedOut>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Practice Sheet</h2>
            <p className="text-gray-600">Please sign in to access your practice problems.</p>
          </div>
        </SignedOut>
      </Layout>
    </Router>
  );
}

export default App;
