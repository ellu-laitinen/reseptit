import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Recipes from "./Recipes/Recipes";

import BreakfastContextProvider from "./_Contexts/BreakfastContext";
import AddRecipeContextProvider from "./_Contexts/AddRecipeContext";
import SnackContextProvider from "./_Contexts/SnackContext";

function App() {
  return (
    <BreakfastContextProvider>
      <SnackContextProvider>
        <AddRecipeContextProvider>
          <Router>
            <NavBar />
            <Switch>
              <Route path="/" exact component={Recipes} />
            </Switch>
          </Router>
        </AddRecipeContextProvider>
      </SnackContextProvider>
    </BreakfastContextProvider>
  );
}

export default App;
