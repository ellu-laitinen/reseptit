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

import FullRecipe from "../FullRecipe";

import { Grid } from "@material-ui/core";

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

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/:recipe/:postId"}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              {lunch.map((item) => {
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
              })}

              <Grid item xs={12}>
                <AddLunch />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Lunch;
