import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
