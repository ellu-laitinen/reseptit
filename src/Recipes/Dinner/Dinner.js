import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { listDinners } from "../../graphql/queries";
import { API, Storage } from "aws-amplify";
import {
  deleteDinner as deleteDinnerMutation,
  createDinner as createDinnerMutation,
} from "../../graphql/mutations";
import RecipeCard from "../RecipeCard";

import AddDinner from "../AddRecipe/AddDinner";

import FullRecipe from "../FullRecipe/FullRecipe";
import { Grid, Typography } from "@material-ui/core";

const Dinner = () => {
  const [dinner, setDinner] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  let match = useRouteMatch();

  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [dinnerData, setDinnerData] = useState(initialState);

  const saveData = ({ name, value }) => {
    setDinnerData({
      ...dinnerData,
      [name]: value,
    });
  };

  const changeIngHandler = (e) => {
    setIngredients({
      [e.target.name]: e.target.value,
    });
  };
  const addIng = (e) => {
    e.preventDefault();
    saveData({
      name: "ingredients",
      value: [...dinnerData.ingredients, ingredients.ingredients],
    });
  };

  useEffect(() => {
    async function fetchDinners() {
      const apiData = await API.graphql({ query: listDinners });
      const dinnerFromAPI = apiData.data.listDinners.items;
      await Promise.all(
        dinnerFromAPI.map(async (recipe) => {
          if (recipe.image) {
            const image = await Storage.get(recipe.image);
            recipe.image = image;
            //      console.log(recipe.image);
          }
        })
      );
      setDinner(dinnerFromAPI);
      //  console.log(breakfastFromAPI);
    }
    fetchDinners();
  }, []);
  // DELETE dinner
  console.log(dinner);
  async function deleteDinner({ id }) {
    const newDinnerArray = dinner.filter((recipe) => recipe.id !== id);
    setDinner(newDinnerArray);
    await API.graphql({
      query: deleteDinnerMutation,
      variables: { input: { id } },
    });
  }

  // create a new recipe
  async function createDinner() {
    if (
      !dinnerData.title ||
      !dinnerData.ingredients ||
      !dinnerData.instructions
    )
      return;
    let savedDinner = await API.graphql({
      query: createDinnerMutation,
      variables: { input: dinnerData },
    });
    if (dinnerData.image) {
      const image = await Storage.get(dinnerData.image);
      savedDinner.data.createDinner.image = image;
    }
    setDinner([...dinner, savedDinner.data.createDinner]);

    setDinnerData(initialState);
  }

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
                <Typography variant="h5">Päiväruuat</Typography>
              </Grid>
              {dinner.map((item) => {
                return (
                  <Grid item xs={12} sm={4}>
                    <RecipeCard
                      title={item.title}
                      img={item.image}
                      link={`${match.url}/${item.id}`}
                      remove={() => deleteDinner(item)}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <AddDinner category={"päiväruoca"} />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Dinner;
