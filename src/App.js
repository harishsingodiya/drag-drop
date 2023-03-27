import "./App.css";
import { NavBar } from "./pages/componentTree";
import "bootstrap/dist/css/bootstrap.min.css";
import DndLayoutContainer from "./pages";

function App() {
  return (
    <div className="App-container">
      <NavBar />
      <DndLayoutContainer />
    </div>
  );
}

export default App;
