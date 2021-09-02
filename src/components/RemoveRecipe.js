import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
  Switch,
  useRouteMatch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Button } from "@material-ui/core";
import {
  listBreakfasts,
  listDinners,
  listLunchs,
  listSnacks,
} from "../graphql/queries";
import { API, Storage } from "aws-amplify";
import {
  deleteBreakfast as deleteBreakfastMutation,
  deleteDinner as deleteDinnerMutation,
  deleteLunch as deleteLunchMutation,
  deleteSnack as deleteSnacksMutation,
} from "../graphql/mutations";
import EditRecipe from "../Recipes/EditRecipe/EditRecipe";

const RemoveRecipe = ({
  breakfast,
  setBreakfast,
  lunch,
  setLunch,
  snacks,
  setSnacks,
  dinner,
  setDinner,
  category,
}) => {
  const history = useHistory();
  const match = useRouteMatch();
  async function deleteBreakfast({ id }) {
    console.log("remove", id);
    if (window.confirm("poista resepti?")) {
      const newBreakfastArray = breakfast.filter((recipe) => recipe.id !== id);
      setBreakfast(newBreakfastArray);
      //removes recipe from database
      await API.graphql({
        query: deleteBreakfastMutation,
        variables: { input: { id } },
      });
    } else {
      console.log("not removed");
    }
  }
  async function deleteSnack({ id }) {
    if (window.confirm("poista resepti?")) {
      const newSnackArray = snacks.filter((recipe) => recipe.id !== id);
      setSnacks(newSnackArray);
      await API.graphql({
        query: deleteSnacksMutation,
        variables: { input: { id } },
      });
    } else {
      console.log("not removed");
    }
  }

  async function deleteLunch({ id }) {
    if (window.confirm("poista resepti?")) {
      const newLunchArray = lunch.filter((recipe) => recipe.id !== id);
      setLunch(newLunchArray);
      await API.graphql({
        query: deleteLunchMutation,
        variables: { input: { id } },
      });
    } else {
      console.log("not removed");
    }
  }

  async function deleteDinner({ id }) {
    if (window.confirm("poista resepti?")) {
      const newDinnerArray = dinner.filter((recipe) => recipe.id !== id);
      setDinner(newDinnerArray);
      await API.graphql({
        query: deleteDinnerMutation,
        variables: { input: { id } },
      });
    } else {
      console.log("not removed");
    }
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route path={`/edit/:category/:id`}>
            <EditRecipe />
          </Route>
          <Route path={match.path}>
            <div>
              {breakfast.map((i) => (
                <li>
                  {i.title}{" "}
                  <Button>
                    <DeleteOutline onClick={() => deleteBreakfast(i)} />
                  </Button>
                  <Button
                    /*    className={classes.button} */
                    onClick={() => history.push(`/edit/breakfast/${i.id}`)}
                  >
                    {" "}
                    Muokkaa <EditOutlinedIcon />
                  </Button>
                </li>
              ))}
            </div>
            <div>
              {lunch.map((i) => (
                <li>
                  {i.title}{" "}
                  <Button>
                    <DeleteOutline onClick={() => deleteLunch(i)} />
                  </Button>
                  <Button
                    /*    className={classes.button} */
                    onClick={() => history.push(`/edit/lunch/${i.id}`)}
                  >
                    {" "}
                    Muokkaa <EditOutlinedIcon />
                  </Button>
                </li>
              ))}
            </div>
            <div>
              {snacks.map((i) => (
                <li>
                  {i.title}{" "}
                  <Button>
                    <DeleteOutline onClick={() => deleteSnack(i)} />
                  </Button>
                  <Button
                    /*    className={classes.button} */
                    onClick={() => history.push(`/edit/snack/${i.id}`)}
                  >
                    {" "}
                    Muokkaa <EditOutlinedIcon />
                  </Button>
                </li>
              ))}
            </div>
            <div>
              {dinner.map((i) => (
                <li>
                  {i.title}{" "}
                  <Button>
                    <DeleteOutline onClick={() => deleteDinner(i)} />
                  </Button>
                  <Button
                    /*    className={classes.button} */
                    onClick={() => history.push(`/edit/dinner/${i.id}`)}
                  >
                    {" "}
                    Muokkaa <EditOutlinedIcon />
                  </Button>
                </li>
              ))}{" "}
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default RemoveRecipe;
