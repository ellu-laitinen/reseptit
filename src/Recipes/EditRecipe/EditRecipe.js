import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as queries from "../../graphql/queries";
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
import { updateBreakfast as updateBreakfastMutation } from "../../graphql/mutations";
import EditRecipeCard from "./EditRecipeCard";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

const EditRecipe = () => {
  let { id } = useParams();
  const [loadedRecipe, setLoadedRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("")

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

 /*    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    } */
    setLoadedRecipe(recipeFromAPI);
    setIngredients(recipeFromAPI.ingredients);

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
   image:loadedRecipe.image 

  };
  console.log(newRecipe)

  
  async function onChange(e) {
    console.log(loadedRecipe.image);

    if (!e.target.files[0]) return;
    console.log("saving new image1");
    const file = e.target.files[0];
      setLoadedRecipe({ ...newRecipe, image: file.name});
    await Storage.put(file.name, file);
/*      const img = await Storage.get(key.key)  */
  }

  const ingHandler = (e, index) => {
    loadedRecipe.ingredients[index] = e.target.value;

    console.log(index);
    setIngredients([...loadedRecipe.ingredients]);
  };

  const saveData = ({name, value}) => {
    setNewIngredient({
...newIngredient,
      [name]: value 
    })
  }
  const addIngHandler = () => {
    saveData({
      name:"ingredients",
      value:[...ingredients, newIngredient.ingredient]
 
    })
    setIngredients([...ingredients, newIngredient.ingredient])
  }

  const addIngredient=() => {
    console.log("add ingredient")

  }

  const changeIngHandler = (e) => {
    setNewIngredient({

      [e.target.name]:e.target.value

    })
  }

  console.log("newingredient")
  console.log(newIngredient)
  console.log("ingredients")
  console.log(ingredients)
  console.log(newRecipe)


  async function saveRecipe() {
    console.log("new data saved");

  
    await API.graphql({
      query: updateBreakfastMutation,
      variables: { input: newRecipe },
    });
/* 
    if (newRecipe.image) {
      console.log("saving new img2");
      const image = await Storage.get(newRecipe.image);
      console.log(image)
      newRecipe.image = image;
      console.log(image);
    } */
    console.log(newRecipe); 
    console.log(newRecipe.image); 

    alert("tallenenttu!");
  }
  
  //Remove image

  async function removeImg () {
  const img = await Storage.get(loadedRecipe.image);

// image name/key is too long, must be shortened
  const image = img.slice(0, 300)
    
   await Storage.remove(image)
   setLoadedRecipe({ ...newRecipe, image:"" });

  }
  
  console.log(loadedRecipe)

  return (
  <EditRecipeCard loadedRecipe={loadedRecipe} recipeHandler={recipeHandler} ingHandler={ingHandler} 
  onChange={onChange} removeImg={removeImg} addIngHandler={addIngHandler} add saveRecipe={saveRecipe} changeIngHandler={changeIngHandler} />
  );
};

export default EditRecipe;
