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
import {
  deleteBreakfast as deleteBreakfastMutation,
  createBreakfast as createBreakfastMutation,
} from "../../graphql/mutations";

import FullRecipe from "../FullRecipe";
import { Grid, Typography } from "@material-ui/core";
import AddRecipe from "../AddRecipe";

const Breakfasts = () => {
  const [breakfast, setBreakfast] = useState([]);
  let match = useRouteMatch();

  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [breakfastData, setBreakfastData] = useState(initialState);

  useEffect(() => {
    fetchBreakfasts();
  }, []);

  // get all brekfasts
  async function fetchBreakfasts() {
    const apiData = await API.graphql({ query: listBreakfasts });
    const breakfastFromAPI = apiData.data.listBreakfasts.items;
    await Promise.all(
      breakfastFromAPI.map(async (recipe) => {
        if (recipe.image) {
          const image = await Storage.get(recipe.image);
          recipe.image = image;
          //      console.log(recipe.image);
        }
      })
    );
    setBreakfast(breakfastFromAPI);
    //  console.log(breakfastFromAPI);
  }

  // delete a recipe
  async function deleteBreakfast({ id }) {
    const newBreakfastArray = breakfast.filter((recipe) => recipe.id !== id);
    // filter: take every recipe from the existing array ->
    // check if the id's match to the id of the chosen recipe ->
    //if it's NOT a match, it's kept in the nre array

    setBreakfast(newBreakfastArray);
    await API.graphql({
      query: deleteBreakfastMutation,
      variables: { input: { id } },
    });
  }

  // create a new recipe
  async function createBreakfast() {
    if (
      !breakfastData.title ||
      !breakfastData.ingredients ||
      !breakfastData.instructions
    )
      return;
    await API.graphql({
      query: createBreakfastMutation,
      variables: { input: breakfastData },
    });
    if (breakfastData.image) {
      const image = await Storage.get(breakfastData.image);
      breakfastData.image = image;
    }
    setBreakfast([...breakfast, breakfastData]);

    // fetch all breakfasts again -> user is able to view FullRecipe of the newest recipe
    fetchBreakfasts();
    setBreakfastData(initialState);
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
  // console.log(breakfast[0]);
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
              </Grid>
              {breakfast.map((item) => {
                return (
                  <Grid item xs={12} sm={4}>
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
                <AddRecipe
                  recipeData={breakfastData}
                  setRecipeData={setBreakfastData}
                  createRecipe={createBreakfast}
                  category={"aamupala"}
                />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Breakfasts;
