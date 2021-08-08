import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { deleteBreakfast as deleteBreakfastMutation } from "../graphql/mutations";

const RemoveModal = ({ open, close }) => {
  const recipe = useParams();
  const history = useHistory();
  const id = recipe.postId;
  console.log(id);

  const recipeId = id;
  const [breakfast, setBreakfast] = useState();

  async function deleteBreakfast({ id }) {
    // filter: take every recipe from the existing array ->
    // check if the id's match to the id of the chosen recipe ->
    // if it's NOT a match, it's kept in the new array
    /*    const newBreakfastArray = breakfast.filter((recipe) => recipe.id !== id);
    setBreakfast(newBreakfastArray); */
    //removes recipe from database
    await API.graphql({
      query: deleteBreakfastMutation,
      variables: { input: { id } },
    });
  }

  const remove = (id) => {
    console.log("removing...", id);
    if (recipe.category === "breakfast") {
      console.log("breakfast recipe", recipe);
      deleteBreakfast(id);
      history.replace("/");
    } else {
      console.log("what's this category?");
    }
  };
  return (
    <Container>
      <h2>Poista resepti?</h2>
      <Button onClick={() => remove(recipeId)}>poista</Button>
    </Container>
  );
};

export default RemoveModal;
