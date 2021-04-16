import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as queries from "../graphql/queries";
import { API, Storage } from "aws-amplify";
import {
  TextField,
  Button,
  TextareaAutosize,
  InputLabel,
  Grid,
  Card,
  Typography,
} from "@material-ui/core";
import { updateBreakfast as updateBreakfastMutation } from "../graphql/mutations";
import { AddShoppingCart } from "@material-ui/icons";

const EditRecipe = () => {
  let { id } = useParams();
  const [loadedRecipe, setLoadedRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngs, setNewIngs] = useState("");

  console.log(id);
  useEffect(() => {
    fetchBreakfast();
  }, []);

  async function fetchBreakfast() {
    console.log("fetching breakfasts");
    const apiData = await API.graphql({
      query: queries.getBreakfast,
      variables: { id: id },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getBreakfast;

    recipeFromAPI.ingredients = JSON.parse(recipeFromAPI.ingredients);
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(recipeFromAPI);
    setIngredients(recipeFromAPI.ingredients);

    console.log(recipeFromAPI);
  }

  console.log(loadedRecipe);
  console.log(ingredients);

  /*    if(loadedRecipe) {
     console.log(loadedRecipe.ingredients.map((i) => console.log(i)))
   }  
  */

  async function onChange(e) {
    console.log(loadedRecipe.image);

    if (!e.target.files[0]) return;

    console.log("saving new image1");
    const file = e.target.files[0];
    setLoadedRecipe({ ...loadedRecipe, image: file.name });
    await Storage.put(file.name, file);
  }

  const recipeHandler = (e) => {
    setLoadedRecipe({
      ...loadedRecipe,
      [e.target.name]: e.target.value,
    });
  };
  const newRecipe = {
    id: loadedRecipe.id,
    title: loadedRecipe.title,
    ingredients: ingredients,
    instructions: loadedRecipe.instructions,
    image: loadedRecipe.image,
  };
  console.log(newRecipe);
  console.log(newRecipe.ingredients);
  /*      console.log(ingredients) */

  const ingHandler = (e, index) => {
    loadedRecipe.ingredients[index] = e.target.value;

    console.log(index);
    setIngredients([...loadedRecipe.ingredients]);
  };

  async function saveRecipe() {
    console.log("new data saved");
    newRecipe.ingredients = JSON.stringify(newRecipe.ingredients);

    let savedRecipe = await API.graphql({
      query: updateBreakfastMutation,
      variables: { input: newRecipe },
    });
    console.log(savedRecipe);

    if (newRecipe.image !== loadedRecipe.image) {
      console.log("saving new img2");
      const image = await Storage.get(newRecipe.image);
      savedRecipe.image = image;
    }
    console.log(newRecipe);
    alert("tallenenttu!");
  }

  return (
    <Card style={{ margin: "2rem" }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item></Grid>
        <Grid item>
          <InputLabel>Reseptin nimi</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="title"
            value={loadedRecipe.title}
            onChange={recipeHandler}
          ></TextField>
        </Grid>
        <Grid item>
          <InputLabel>Ainesosat</InputLabel>

          {loadedRecipe &&
            loadedRecipe.ingredients.map((i, index) => {
              return (
                <TextField
                  key={index}
                  variant="outlined"
                  size="small"
                  type="text"
                  name="ingredients"
                  value={i}
                  onChange={(e) => ingHandler(e, index)}
                ></TextField>
              );
            })}

          {/*            <Button onClick={addIng}>Lisää listaan</Button> */}
        </Grid>
        {/*       {newRecipe.ingredients.map((i) => (
        <div>
          <li value={i.ingredients}>{i.ingredients}</li>
          <button onClick={() => removeIng(i.ingredients)}>poista</button>
        </div>
      ))} */}
        <Grid item>
          <InputLabel>Ohjeet</InputLabel>
          <TextareaAutosize
            style={{ width: 300 }}
            rowsMin={10}
            type="text"
            name="instructions"
            value={loadedRecipe.instructions}
            onChange={recipeHandler}
          ></TextareaAutosize>
        </Grid>
        <Grid item>
          <img src={loadedRecipe.image} alt={loadedRecipe.title} />
          <InputLabel>Muokkaa kuvaa:</InputLabel>

          <input type="file" onChange={onChange} />
        </Grid>
        <Grid item>
          <Button
            onClick={saveRecipe}
            /*        variant="outlined"
            className={classes.button} */
          >
            Tallenna muutokset
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EditRecipe;
