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
import axios from "axios";
import { Grid } from "@material-ui/core";
import AddRecipe from "../../AddRecipe/AddRecipe";

const Breakfasts = () => {
  const [breakfast, setBreakfast] = useState([]);
  let match = useRouteMatch();
  /* let { recipe } = useParams(); */

  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [breakfastData, setBreakfastData] = useState(initialState);

  useEffect(() => {
    fetchBreakfasts();
  }, []);

  // get all recipes
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
          <Route path={"/:recipe/:postId"}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
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
