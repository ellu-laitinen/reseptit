import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import AddRecipe from "./AddRecipe";
import Breakfasts from "./Recipes/Breakfasts/Breakfasts";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import Snacks from "./Recipes/Snacks/Snacks";
import Lunch from "./Recipes/Lunch/Lunch";
import Dinner from "./Recipes/Dinner/Dinner";

function App() {
  return (
    <Router>
      <Link to="/breakfast">Aamupalat</Link>
      <Link to="/snacks">Väli- ja iltapalat</Link>
      <Link to="/lunch">Lounaat</Link>
      <Link to="/dinner">Päiväruuat</Link>
      <Link to="/new">Lisää uusi resepti</Link>
      <NavBar />
      <Switch>
        <Route path="/breakfast" exact component={Breakfasts}></Route>
        <Route path="/snacks" exact component={Snacks}></Route>
        <Route path="/lunch" exact component={Lunch}></Route>
        <Route path="/dinner" exact component={Dinner}></Route>
        <Route path="/new" exact component={AddRecipe}></Route>
      </Switch>
      {/*      <AddRecipe /> */}
      <AmplifySignOut />
    </Router>
  );
}

export default withAuthenticator(App);
