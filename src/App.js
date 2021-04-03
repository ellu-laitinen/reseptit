import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Recipes from "./Recipes/Recipes";
import Breakfasts from "./Recipes/Breakfasts/Breakfasts";

import Snacks from "./Recipes/Snacks/Snacks";
import Lunch from "./Recipes/Lunch/Lunch";
import Dinner from "./Recipes/Dinner/Dinner";

import AddRecipeContextProvider from "./_Contexts/AddRecipeContext";

function App() {
  return (
    <AddRecipeContextProvider>
      <Router>
        <Link to="/breakfast">Aamupala</Link>
        <Link to="/snacks">Väli- ja iltapalat</Link>
        <Link to="/lunch">Lounaat</Link>
        <Link to="/dinner">PÄiväruuat</Link>
        <NavBar />
        <Switch>
          <Route path="/breakfast" exact component={Breakfasts}></Route>
          <Route path="/snacks" exact component={Snacks}></Route>
          <Route path="/lunch" exact component={Lunch}></Route>
          <Route path="/dinner" exact component={Dinner}></Route>
        </Switch>
      </Router>
    </AddRecipeContextProvider>
  );
}

export default App;
