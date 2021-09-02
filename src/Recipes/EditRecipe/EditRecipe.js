import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import * as queries from "../../graphql/queries";
import { API, Storage } from "aws-amplify";
import {
  updateBreakfast as updateBreakfastMutation,
  updateDinner as updateDinnerMutation,
  updateLunch as updateLunchMutation,
  updateSnack as updateSnackMutation,
} from "../../graphql/mutations";
import EditRecipeCard from "./EditRecipeCard";

const EditRecipe = ({ token }) => {
  let { category, id } = useParams();
  const { data } = useParams();
  console.log(data);
  console.log(category);
  const match = useRouteMatch();
  console.log(match);
  const [loadedRecipe, setLoadedRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [mutation, setMutation] = useState(null);

  console.log(window.location.href);
  console.log("");

  console.log(id);
  /*   useEffect(() => {
    fetchBreakfast();
  }, []); */
  useEffect(() => {
    try {
      if (category === "breakfast") {
        console.log("this is a breakfast recipe");
        setMutation(updateBreakfastMutation);
        fetchBreakfast();
      }
      if (category === "lunch") {
        console.log("this is lunch");
        setMutation(updateLunchMutation);
        fetchLunch();
      }
      if (category === "dinner") {
        console.log("this is dinnah");
        setMutation(updateDinnerMutation);
        fetchDinner();
      }
      if (category === "snacks") {
        console.log("this is snacks");
        setMutation(updateSnackMutation);
        fetchSnack();
      }
    } catch (err) {
      console.log("Error happened", err);
    }
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
  async function fetchDinner() {
    console.log("fetching dinners");
    const apiData = await API.graphql({
      query: queries.getDinner,
      variables: { id: id },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getDinner;

    /*    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    } */
    setLoadedRecipe(recipeFromAPI);
    setIngredients(recipeFromAPI.ingredients);
  }
  async function fetchLunch() {
    console.log("fetching lunches");
    const apiData = await API.graphql({
      query: queries.getLunch,
      variables: { id: id },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getLunch;

    /*    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    } */
    setLoadedRecipe(recipeFromAPI);
    setIngredients(recipeFromAPI.ingredients);
  }
  async function fetchSnack() {
    console.log("fetching snacks");
    const apiData = await API.graphql({
      query: queries.getSnack,
      variables: { id: id },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getSnack;

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
    image: loadedRecipe.image,
  };
  console.log(newRecipe);

  async function onChange(e) {
    console.log(loadedRecipe.image);

    if (!e.target.files[0]) return;
    console.log("saving new image1");
    const file = e.target.files[0];
    setLoadedRecipe({ ...newRecipe, image: file.name });
    await Storage.put(file.name, file);
    /*      const img = await Storage.get(key.key)  */
  }

  const ingHandler = (e, index) => {
    loadedRecipe.ingredients[index] = e.target.value;

    console.log(index);
    setIngredients([...loadedRecipe.ingredients]);
  };

  const saveData = ({ name, value }) => {
    setNewIngredient({
      ...newIngredient,
      [name]: value,
    });
  };

  const addIngHandler = () => {
    saveData({
      name: "ingredients",
      value: [...ingredients, newIngredient.ingredient],
    });
    setIngredients([...ingredients, newIngredient.ingredient]);
  };

  const changeIngHandler = (e) => {
    console.log("changeIngHandler");
    setNewIngredient({
      [e.target.name]: e.target.value,
    });
  };

  const removeIngHandler = (id) => {
    console.log("remove");

    console.log(id);
    const newIngArray = ingredients.filter((item) => item !== id);
    console.log(newIngArray);
    saveData({
      name: "ingredients",
      value: [...newIngArray],
    });
    setIngredients(newIngArray);
  };

  console.log("newingredient");
  console.log(newIngredient);
  console.log("ingredients");
  console.log(ingredients);
  console.log(newRecipe);

  async function saveRecipe() {
    console.log("new data saved");

    await API.graphql({
      query: mutation,
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

  async function removeImg() {
    const img = await Storage.get(loadedRecipe.image);

    // image name/key is too long, must be shortened
    const image = img.slice(0, 300);

    await Storage.remove(image);
    setLoadedRecipe({ ...newRecipe, image: "" });
  }

  console.log(loadedRecipe);

  return (
    <>
      {token ? (
        <EditRecipeCard
          loadedRecipe={loadedRecipe}
          recipeHandler={recipeHandler}
          ingHandler={ingHandler}
          onChange={onChange}
          removeImg={removeImg}
          addIngHandler={addIngHandler}
          add
          saveRecipe={saveRecipe}
          removeIngHandler={removeIngHandler}
          changeIngHandler={changeIngHandler}
          ingredients={ingredients}
        />
      ) : (
        <h2>You are unauthorised</h2>
      )}
    </>
  );
};

export default EditRecipe;
