import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { listLunchs } from "../../graphql/queries";
import {
  deleteLunch as deleteLunchMutation,
  createLunch as createLunchMutation,
} from "../../graphql/mutations";
import { API, Storage } from "aws-amplify";
import RecipeCard from "../RecipeCard";

import FullRecipe from "../FullRecipe";

import { Grid, Typography } from "@material-ui/core";

import AddRecipe from "../AddRecipe";

const Lunch = () => {
  const [lunch, setLunch] = useState([]);
  const [ingredients, setIngredients] = useState([])
  let match = useRouteMatch();
  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [lunchData, setLunchData] = useState(initialState);
  const saveData = ({name, value}) => {
    setLunchData({
      ...lunchData,
      [name]: value //stringify here separates all letters into individual strings, no errors
    })
  }

  const changeIngHandler = (e) => {
    setIngredients({
     
      [e.target.name]:e.target.value
    })
  }
  const addIng = (e) =>  {

    e.preventDefault();
    saveData({
      name:"ingredients",
      value: [...lunchData.ingredients, ingredients.ingredients]  //stringify here: error, can't parse
    })

  /*   const ings = breakfastData.ingredients.map((i) => {
      return (
        i.ingredients
      )
      
    }) */

  }

  useEffect(() => {
    fetchLunches();
  }, []);

  async function fetchLunches() {
    const apiData = await API.graphql({ query: listLunchs });
    const lunchFromAPI = apiData.data.listLunchs.items;
    console.log(apiData.data.listLunchs.items);
    await Promise.all(
      lunchFromAPI.map(async (recipe) => {
        if (recipe.image) {
          const image = await Storage.get(recipe.image);
          recipe.image = image;
          //      console.log(recipe.image);
        }
      })
    );
    setLunch(lunchFromAPI);
  }

  async function deleteLunch({ id }) {
    const newLunchArray = lunch.filter((recipe) => recipe.id !== id);
    setLunch(newLunchArray);
    await API.graphql({
      query: deleteLunchMutation,
      variables: { input: { id } },
    });
  }

  // create a new recipe
  async function createLunch() {
    if (!lunchData.title || !lunchData.ingredients || !lunchData.instructions)
      return;
      lunchData.ingredients = JSON.stringify(lunchData.ingredients)
    let savedLunch = await API.graphql({
      query: createLunchMutation,
      variables: { input: lunchData },
    });
    if (lunchData.image) {
      const savedImage = await Storage.get(lunchData.image);
      savedLunch.data.createLunch.image = savedImage;
    }
    setLunch([...lunch, savedLunch.data.createLunch]);

    setLunchData(initialState);
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
                <Typography variant="h5">Lounaat</Typography>
              </Grid>
              {lunch.map((item) => {
                return (
                  <Grid item xs={12} sm={4}>
                    <RecipeCard
                      title={item.title}
                      img={item.image}
                      link={`${match.url}/${item.id}`}
                      remove={() => deleteLunch(item)}
                    />
                  </Grid>
                );
              })}

              <Grid item xs={12}>
                <AddRecipe
                  recipeData={lunchData}
                  setRecipeData={setLunchData}
                  createRecipe={createLunch}
                  category={"lounas"}
                  addIng={addIng}
                  changeIngHandler={changeIngHandler}
               
                />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Lunch;
