import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import RecipeCard from "../RecipeCard";
import { listRecipes } from "../../graphql/queries";
import { API } from "aws-amplify";
import { deleteRecipe as deleteRecipeMutation } from "../../graphql/mutations";

import AddRecipe from "../../AddRecipe";
import FullRecipe from "../FullRecipe";
import axios from "axios";
import { Grid } from "@material-ui/core";

const Breakfasts = () => {
  const [breakfast, setBreakfast] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listRecipes });
    setBreakfast(apiData.data.listRecipes.items);
    console.log(apiData.data.listRecipes.items);
  }

  async function deleteNote({ id }) {
    const newBreakfastArray = breakfast.filter((recipe) => recipe.id !== id);
    setBreakfast(newBreakfastArray);
    await API.graphql({
      query: deleteRecipeMutation,
      variables: { input: { id } },
    });
  }

  /*   useEffect(() => {
    axios.get("http://localhost:3001/breakfast").then((response) => {
      setBreakfast(response.data);
      console.log(response.data);
    });
  }, []);

  const removeHandler = (id) => {
    console.log(id);

    axios
      .delete("http://localhost:3001/breakfast/" + id)
      .then(() => {
        return axios.get("http://localhost:3001/breakfast");
      })
      .then((response) => {
        setBreakfast(response.data);
      });
  }; */

  const recipeList = breakfast.map((item) => {
    return (
      <Grid item xs={12} sm={4}>
        <RecipeCard
          title={item.title}
          img={item.img}
          link={`${match.url}/${item.id}`}
          remove={() => deleteNote(item)}
          // <Button onClick={() => deleteNote(recipe)}>Poista resepti</Button>
        />
      </Grid>
    );
  });

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/:recipe/:postId"}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              {recipeList}
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Breakfasts;
