import React, { useState, useEffect } from "react";
import { listBreakfasts } from "../graphql/queries";
import { API, Storage } from "aws-amplify";
import { deleteBreakfast as deleteBreakfastMutation } from "../graphql/mutations";

const AllRecipes = ({ token }) => {
  const [breakfast, setBreakfast] = useState([]);
  useEffect(() => {
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
    fetchBreakfasts();
  }, []);

  console.log(breakfast);
  return (
    <div>
      {token ? (
        breakfast.map((i) => <li>{i.title}</li>)
      ) : (
        <p>you are unauthorised!</p>
      )}
    </div>
  );
};

export default AllRecipes;
