import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import AddBreakfast from "./AddRecipe/AddBreakfast";
import Breakfasts from "./Recipes/Breakfasts/Breakfasts";

import Snacks from "./Recipes/Snacks/Snacks";
import Lunch from "./Recipes/Lunch/Lunch";
import Dinner from "./Recipes/Dinner/Dinner";
import Recipes from "./Recipes/Recipes";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/breakfast" exact component={Breakfasts}></Route>
        <Route path="/snacks" exact component={Snacks}></Route>
        <Route path="/lunch" exact component={Lunch}></Route>
        <Route path="/dinner" exact component={Dinner}></Route>
      </Switch>
    </Router>
  );
}

export default App;
