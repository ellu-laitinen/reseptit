import React, { useState, useEffect } from "react";
import {
  listBreakfasts,
  listDinners,
  listLunchs,
  listSnacks,
} from "../graphql/queries";
import { API, Storage } from "aws-amplify";
import {
  deleteBreakfast as deleteBreakfastMutation,
  deleteDinner as deleteDinnerMutation,
  deleteLunch as deleteLunchMutation,
  deleteSnack as deleteSnackMutation,
} from "../graphql/mutations";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { Button } from "@material-ui/core";
import RemoveRecipe from "./RemoveRecipe";

const AllRecipes = ({ token }) => {
  const [breakfast, setBreakfast] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchBreakfasts();
    fetchSnacks();
    fetchDinners();
    fetchLunches();
  }, []);

  async function fetchBreakfasts() {
    const apiData = await API.graphql({
      query: listBreakfasts,
    });

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

  async function fetchDinners() {
    const apiData = await API.graphql({
      query: listDinners,
    });

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

  async function fetchSnacks() {
    const apiData = await API.graphql({
      query: listSnacks,
    });

    const snackFromAPI = apiData.data.listSnacks.items;
    await Promise.all(
      snackFromAPI.map(async (recipe) => {
        if (recipe.image) {
          const image = await Storage.get(recipe.image);
          recipe.image = image;
          //      console.log(recipe.image);
        }
      })
    );
    setSnacks(snackFromAPI);
    console.log(apiData.data.listSnacks.items);
  }

  async function fetchLunches() {
    const apiData = await API.graphql({
      query: listLunchs,
    });

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

  console.log(category);
  return (
    <div>
      {token ? (
        <RemoveRecipe
          breakfast={breakfast}
          setBreakfast={setBreakfast}
          lunch={lunch}
          setLunch={setLunch}
          dinner={dinner}
          setDinner={setDinner}
          snacks={snacks}
          setSnacks={setSnacks}
          category={category}
        />
      ) : (
        <p>you are unauthorised!</p>
      )}
    </div>
  );
};

export default AllRecipes;
