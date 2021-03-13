import "./App.css";
import NavBar from "./NavBar/NavBar";

import Recipes from "./Recipes/Recipes";

import BreakfastContextProvider from "./_Contexts/BreakfastContext";

function App() {
  return (
    <BreakfastContextProvider>
      <div className="App">
        <NavBar />

        <Recipes />
      </div>
    </BreakfastContextProvider>
  );
}

export default App;
