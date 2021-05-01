import React, { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import RecipeCard from "../RecipeCard";
import { listBreakfasts } from "../../graphql/queries";
import { API, Storage } from "aws-amplify";
import { deleteBreakfast as deleteBreakfastMutation } from "../../graphql/mutations";

import FullRecipe from "../FullRecipe/FullRecipe";
import { Grid, Typography, Button } from "@material-ui/core";
import AddRecipe from "../AddRecipe/AddRecipe";

const Breakfasts = () => {
  const [breakfast, setBreakfast] = useState([]);

  //TOKENS
  const [nextToken, setNextToken] = useState(undefined);
  const [newNextToken, setNewNextToken] = useState();
  const [prevToken, setPrevToken] = useState([]);

  let match = useRouteMatch();

  // get all brekfasts
  useEffect(() => {
    async function fetchBreakfasts() {
      const apiData = await API.graphql({
        query: listBreakfasts,
        variables: { nextToken, limit: 3 },
      });
      setNewNextToken(apiData.data.listBreakfasts.nextToken);
      // console.log(apiData.data.listBreakfasts.nextToken)
      const breakfastFromAPI = apiData.data.listBreakfasts.items;
      //   console.log(breakfastFromAPI)
      await Promise.all(
        breakfastFromAPI.map(async (recipe) => {
          if (recipe.image) {
            const image = await Storage.get(recipe.image);
            recipe.image = image;
            console.log(recipe.image);
            console.log(image);
          }
        })
      );
      setBreakfast(breakfastFromAPI);
    }
    fetchBreakfasts();
  }, [nextToken]); // re-renders when nextToken changes

  console.log(breakfast);

  const getNext = () => {
    console.log("get next");
    setPrevToken((prev) => [...prev, nextToken]);
    setNextToken(newNextToken);
    setNewNextToken(null);
  };

  const getPrev = () => {
    // console.log("get previous")
    setNextToken(prevToken.pop());
    setPrevToken([...prevToken]);
    setNewNextToken(null);
  };

  // delete a recipe
  async function deleteBreakfast({ id }) {
    // filter: take every recipe from the existing array ->
    // check if the id's match to the id of the chosen recipe ->
    // if it's NOT a match, it's kept in the new array
    const newBreakfastArray = breakfast.filter((recipe) => recipe.id !== id);
    setBreakfast(newBreakfastArray);
    //removes recipe from database
    await API.graphql({
      query: deleteBreakfastMutation,
      variables: { input: { id } },
    });
  }

  // create a new recipe

  //console.log(breakfast)

  // UPDATE recipe

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/:category/:postId"}>
            <FullRecipe />
          </Route>

          <Route path={match.path}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">Aamupalat</Typography>
                <Grid item xs={12} style={{ marginLeft: "1rem" }}>
                  <Button onClick={getPrev}>Edelliset 3</Button>
                  <Button onClick={getNext}>Seuraavat 3</Button>
                </Grid>
              </Grid>
              {breakfast.map((item) => {
                return (
                  <Grid item xs={12} sm={4} key={item.id}>
                    <RecipeCard
                      title={item.title}
                      img={item.image}
                      link={`${match.url}/${item.id}`}
                      remove={() => deleteBreakfast(item)}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <AddRecipe />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Breakfasts;
