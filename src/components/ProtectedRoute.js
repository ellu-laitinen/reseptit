import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import {
  Route,
  Redirect,
  Link,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import Login from "./Login";
import AddRecipe from "../Recipes/AddRecipe/AddRecipe";
import AllRecipes from "./AllRecipes";
import EditRecipe from "../Recipes/EditRecipe/EditRecipe";

const ProtectedRoute = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState(false);
  async function signIn() {
    try {
      console.log("signing in?");
      const user = await Auth.signIn(username, password);

      if (user) {
        console.log("recognised");
        setToken(true);
      } else {
        console.log("unknown user");
      }
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  /*   const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      let user = null;
      try {
        user = await Auth.currentAuthenticatedUser();
        if (user) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        setIsAuthenticated(false);
      }
    })();
  }); */
  return (
    <div>
      <Router>
        <Switch>
          {token === true ? (
            <>
              <Link to="/add">Lisää resepti</Link>
              <Link to="/delete">Poista reseptejä</Link>
              <Route path="/add">
                <AddRecipe token={token} />
              </Route>
              <Route path="/delete">
                <AllRecipes token={token} />
              </Route>
              <Route path="/edit/:category/:id">
                <EditRecipe token={token} />
              </Route>
            </>
          ) : (
            <Login
              setUsername={setUsername}
              setPassword={setPassword}
              signIn={signIn}
            />
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default ProtectedRoute;
