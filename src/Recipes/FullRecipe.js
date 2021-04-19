import React, { useEffect, useState } from "react";
import { useParams, Switch, useRouteMatch, Link, Route, BrowserRouter as Router } from "react-router-dom";
import { Card, Grid, Typography, Button } from "@material-ui/core";

import * as queries from "../graphql/queries";
import { API, Storage } from "aws-amplify";

import EditRecipe from "./EditRecipe";

const FullRecipe = () => {
  const [loadedRecipe, setLoadedRecipe] = useState("");
  let match= useRouteMatch();

 

  // useParams checks the parameters of the URL that match,
  // e.g.  /:category/:postId
  let { postId, category } = useParams();

  console.log(category);
  console.log(postId);

  // try switch case??
  useEffect(() => {
    if (category === "breakfast") {
      console.log(category);
      fetchBreakfast();
    }
    if (category === "dinner") {
      fetchDinner();
    }
    if (category === "lunch") {
      fetchLunch();
    }
    if (category === "snacks") {
      fetchSnack();
    }
  }, []);

  async function fetchBreakfast() {
    console.log("fetching breakfasts");
    const apiData = await API.graphql({
      query: queries.getBreakfast,
      variables: { id: postId },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getBreakfast;

/*     console.log(JSON.parse(recipeFromAPI.ingredients));
   recipeFromAPI.ingredients = JSON.parse(recipeFromAPI.ingredients)
  recipeFromAPI.ingredients.forEach(function(item){
     console.log(item)
   }) */
   recipeFromAPI.ingredients =  JSON.parse(recipeFromAPI.ingredients)
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(recipeFromAPI);
  
    console.log(recipeFromAPI);
  }

  console.log("loaded recipe")
  console.log(loadedRecipe.title)
 //loadedRecipe.ingredients.forEach((i) => console.log(i))


  async function fetchDinner() {
    const apiData = await API.graphql({
      query: queries.getDinner,
      variables: { id: postId },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getDinner;
    console.log(recipeFromAPI);
    recipeFromAPI.ingredients =  JSON.parse(recipeFromAPI.ingredients)
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(apiData.data.getDinner);
    console.log(apiData.data.getDinner);
  }

  async function fetchLunch() {
    const apiData = await API.graphql({
      query: queries.getLunch,
      variables: { id: postId },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getLunch;
    console.log(recipeFromAPI);
    recipeFromAPI.ingredients =  JSON.parse(recipeFromAPI.ingredients)
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(apiData.data.getLunch);
    console.log(apiData.data.getLunch);
  }

  async function fetchSnack() {
    const apiData = await API.graphql({
      query: queries.getSnack,
      variables: { id: postId },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getSnack;
    console.log(recipeFromAPI);
    recipeFromAPI.ingredients =  JSON.parse(recipeFromAPI.ingredients)
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(apiData.data.getSnack);
    console.log(apiData.data.getSnack);
  }

  /*   useEffect(() => {
    if (!loadedRecipe) {
      axios
        .get("http://localhost:3001/" + recipe + "/" + postId)
        .then((response) => {
          console.log(response.data);
          setLoadedRecipe(response.data);
        });
    }
  }); */

/*   console.log(loadedRecipe.ingredients.map((p)=> console.log(p))); */
console.log(match.url)
  return (
    <Router>
      <Switch>
        <Route path= {`${match.url}/edit/:id`}>
<EditRecipe/>
        </Route>
        <Route path={match.path}>
    <Card>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h4">{loadedRecipe.title}</Typography>
        </Grid>
        <Grid item>
          <img
            src={loadedRecipe.image}
            alt={loadedRecipe.title}
            style={{ width: 400 }}
          />
        </Grid>
        <Grid item>
          {/*   {loadedRecipe.ingredients.map((ing) => (
          <ul>
            <li>{ing.ingredients}</li>
          </ul>
        ))} */}
          <Typography>Ainesosat:</Typography>
          <ul>
          {loadedRecipe && loadedRecipe.ingredients.map((i) =><li>{i}</li>)}
          </ul>
          <Typography></Typography>
        </Grid>
        <Grid item>
          <Typography>Ohje:</Typography>
          <Typography>{loadedRecipe.instructions}</Typography>
        </Grid>
        <Grid item>
          <Link to={`${match.url}/edit/${loadedRecipe.id}`}>
          <Button >Muokkaa</Button>
          </Link>
          
        </Grid>
      </Grid>
    </Card>
    </Route>
    </Switch>
    </Router>
  );
};

export default FullRecipe;
