import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Table } from "./components/Table";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Layout>
      <SignedIn>
        <Table />
      </SignedIn>
      <SignedOut>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Practice Sheet</h2>
          <p className="text-gray-600">Please sign in to access your practice problems.</p>
        </div>
      </SignedOut>
    </Layout>
  );
}

export default App;
