import React, { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import RecipeCard from "../RecipeCard";
import { listBreakfasts } from "../../graphql/queries";
import { API } from "aws-amplify";
import { deleteBreakfast as deleteBreakfastMutation } from "../../graphql/mutations";

import FullRecipe from "../FullRecipe";
import axios from "axios";
import { Grid } from "@material-ui/core";
import AddBreakfast from "../../AddRecipe/AddBreakfast";

const Breakfasts = () => {
  const [breakfast, setBreakfast] = useState([]);
  let match = useRouteMatch();
  let { recipe } = useParams();

  console.log(recipe);

  useEffect(() => {
    fetchBreakfasts();
  }, []);

  async function fetchBreakfasts() {
    const apiData = await API.graphql({ query: listBreakfasts });
    setBreakfast(apiData.data.listBreakfasts.items);
    console.log(apiData.data.listBreakfasts.items);
  }

  async function deleteBreakfast({ id }) {
    const newBreakfastArray = breakfast.filter((recipe) => recipe.id !== id);
    setBreakfast(newBreakfastArray);
    await API.graphql({
      query: deleteBreakfastMutation,
      variables: { input: { id } },
    });
  }

  /*   useEffect(() => {
    axios.get("http://localhost:3001/breakfast").then((response) => {
      setBreakfast(response.data);
      console.log(response.data);
    });
  }, []);

  const removeHandler = (id) => {
    console.log(id);

    axios
      .delete("http://localhost:3001/breakfast/" + id)
      .then(() => {
        return axios.get("http://localhost:3001/breakfast");
      })
      .then((response) => {
        setBreakfast(response.data);
      });
  }; */


  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/:recipe/:postId"}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              {breakfast.map((item) => {
    return (
      <Grid item xs={12} sm={4}>
        <RecipeCard
          title={item.title}
          img={item.img}
          link={`${match.url}/${item.id}`}
          remove={() => deleteBreakfast(item)}
      
        />
      </Grid>
    );
  })}
              <Grid item xs={12}>
                <AddBreakfast />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Breakfasts;
