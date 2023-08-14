import { EntriesList } from "./EntriesList";
import { Entry } from "./Entry";

function App() {
  return (
    <main className="mx-auto p-4 space-y-4 flex h-screen flex-col bg-slate-100 md:my-8 md:h-auto md:max-w-2xl">
      <Entry />
      <EntriesList />
    </main>
  );
}

export default App;
