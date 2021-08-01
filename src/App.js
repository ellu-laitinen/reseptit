import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { ThemeProvider } from "@material-ui/core/styles";

import NavBar from "./NavBar/NavBar";
import Breakfasts from "./Recipes/Breakfasts/Breakfasts";
import Snacks from "./Recipes/Snacks/Snacks";
import Lunch from "./Recipes/Lunch/Lunch";
import Dinner from "./Recipes/Dinner/Dinner";
import AddRecipe from "./Recipes/AddRecipe/AddRecipe";

import theme from "./Theme/theme";
require("dotenv").config();

function App() {
  console.log(process.env);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/breakfast" />
          </Route>
          <Route path="/breakfast" exact component={Breakfasts}></Route>
          <Route path="/snacks" exact component={Snacks}></Route>
          <Route path="/lunch" exact component={Lunch}></Route>
          <Route path="/dinner" exact component={Dinner}></Route>
          <Route path="/add" exact component={AddRecipe}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
