import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Button, Link } from "@material-ui/core";

import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import { ThemeProvider } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";

import NavBar from "./NavBar/NavBar";
import Breakfasts from "./Recipes/Breakfasts/Breakfasts";
import Snacks from "./Recipes/Snacks/Snacks";
import Lunch from "./Recipes/Lunch/Lunch";
import Dinner from "./Recipes/Dinner/Dinner";
import AddRecipe from "./Recipes/AddRecipe/AddRecipe";
import Login from "./components/Login";

import theme from "./Theme/theme";
import ProtectedRoute from "./components/ProtectedRoute";
import AllRecipes from "./components/AllRecipes";

function App() {
  return (
    <>
      <div style={{ minHeight: "calc(95vh - 20px)" }}>
        <Helmet>
          <title>ReseptiAppi</title>

          <meta name="theme-color" content="#e2e2e2" />
          <meta name="description" content="reseptiappi" />
          <meta property="og:type" content="aamupalat" />
          <meta property="og:description" content="Aamupalareseptit" />
          <meta
            property="og:image"
            content="https://source.unsplash.com/jw3GOzxiSkw"
          />
        </Helmet>
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
              <Route path="/admin" component={ProtectedRoute}></Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
      <div>
        <Link href="/admin" style={{ textDecoration: "none" }}>
          {" "}
          <Button style={{ color: "darkGrey", textTransform: "lowercase" }}>
            admin
          </Button>
        </Link>
      </div>
    </>
  );
}

export default App;
