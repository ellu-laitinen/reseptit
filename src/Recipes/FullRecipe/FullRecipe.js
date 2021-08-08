import React, { useEffect, useState } from "react";
import {
  useParams,
  Switch,
  useRouteMatch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import * as queries from "../../graphql/queries";
import { API, Storage } from "aws-amplify";

import EditRecipe from "../EditRecipe/EditRecipe";
import FullRecipeCard from "./FullRecipeCard";

import Modal from "@material-ui/core/Modal";
import RemoveModal from "../../components/RemoveModal";
const FullRecipe = () => {
  const [loadedRecipe, setLoadedRecipe] = useState("");
  const [showModal, setShowModal] = useState(false);
  let match = useRouteMatch();

  // useParams checks the parameters of the URL that match,
  // e.g.  /:category/:postId
  let { postId, category } = useParams();
  console.log(category);

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

    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(recipeFromAPI);
  }

  async function fetchDinner() {
    const apiData = await API.graphql({
      query: queries.getDinner,
      variables: { id: postId },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getDinner;
    console.log(recipeFromAPI);
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(apiData.data.getDinner);
  }

  async function fetchLunch() {
    const apiData = await API.graphql({
      query: queries.getLunch,
      variables: { id: postId },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getLunch;
    console.log(recipeFromAPI);
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
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(apiData.data.getSnack);
    console.log(apiData.data.getSnack);
  }

  console.log(match.url);
  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <>
          <RemoveModal />
        </>
      </Modal>
      <Router>
        <Switch>
          <Route path={`/edit/:category/:id`}>
            <EditRecipe />
          </Route>
          <Route path={match.path}>
            <FullRecipeCard
              category={category}
              link={match.url}
              loadedRecipe={loadedRecipe}
              remove={() => setShowModal(true)}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default FullRecipe;
