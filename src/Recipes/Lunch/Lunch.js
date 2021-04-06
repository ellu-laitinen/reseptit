import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { listLunchs } from "../../graphql/queries";
import { deleteLunch as deleteLunchMutation } from "../../graphql/mutations";
import { API } from "aws-amplify";
import RecipeCard from "../RecipeCard";

import AddRecipe from "../../AddRecipe/AddBreakfast";
import FullRecipe from "../FullRecipe";
import axios from "axios";
import { Grid } from "@material-ui/core";
import AddDinner from "../../AddRecipe/AddDinner";
import AddLunch from "../../AddRecipe/AddLunch";

const Lunch = () => {
  const [lunch, setLunch] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    fetchLunches();
  }, []);

  async function fetchLunches() {
    const apiData = await API.graphql({ query: listLunchs });
    setLunch(apiData.data.listLunchs.items);
    console.log(apiData.data.listLunchs.items);
  }

  async function deleteLunch({ id }) {
    const newBreakfastArray = lunch.filter((recipe) => recipe.id !== id);
    setLunch(newBreakfastArray);
    await API.graphql({
      query: deleteLunchMutation,
      variables: { input: { id } },
    });
  }

  /*   const category = "dinner";
  useEffect(() => {
    axios.get(`http://localhost:3001/${category}`).then((response) => {
      const dinnerList = response.data;
      setLunch(dinnerList);
    });
  }, []);
  const removeHandler = (id) => {
    console.log(id);

    axios
      .delete(`http://localhost:3001/${category}/` + id)
      .then(() => {
        return axios.get(`http://localhost:3001/${category}`);
      })
      .then((response) => {
        setLunch(response.data);
      });
  }; */

  const recipeList = lunch.map((item) => {
    return (
      <Grid item xs={12} sm={4}>
        <RecipeCard
          title={item.title}
          img={item.img}
          link={`${match.url}/${item.id}`}
          remove={() => deleteLunch(item)}
        />
      </Grid>
    );
  });

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/:recipe/:postId"}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              {recipeList}
            </Grid>
          </Route>
        </Switch>
      </Router>
      <AddLunch />
    </div>
  );
};

export default Lunch;
