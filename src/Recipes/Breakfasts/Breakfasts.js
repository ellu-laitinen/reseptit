import React, { useEffect, useState } from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import RecipeCard from "../RecipeCard";
import { listBreakfasts } from "../../graphql/queries";
import { API, Storage } from "aws-amplify";
import { deleteBreakfast as deleteBreakfastMutation } from "../../graphql/mutations";

import FullRecipe from "../FullRecipe/FullRecipe";
import { Grid, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Pagination from "../../Pagination";

const Breakfasts = () => {
  const [breakfast, setBreakfast] = useState([]);

  //TOKENS
  const [nextToken, setNextToken] = useState(undefined);
  const [newNextToken, setNewNextToken] = useState();
  const [prevToken, setPrevToken] = useState([]);

  let match = useRouteMatch();

  // get all brekfasts
  useEffect(() => {
    async function fetchBreakfasts() {
      const apiData = await API.graphql({
        query: listBreakfasts,
        variables: { nextToken, limit: 10 },
      });
      setNewNextToken(apiData.data.listBreakfasts.nextToken);
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
  }, [nextToken]); // re-renders when nextToken changes

  console.log(nextToken);

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/:category/:postId"}>
            <FullRecipe />
          </Route>

          <Route path={match.path}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Aamupalat</Typography>
                {newNextToken && (
                  <Pagination
                    nextToken={nextToken}
                    setNextToken={setNextToken}
                    newNextToken={newNextToken}
                    setNewNextToken={setNewNextToken}
                    prevToken={prevToken}
                    setPrevToken={setPrevToken}
                  />
                )}

                {/*      <Grid item xs={12} style={{ marginLeft: "1rem" }}>
                  <Button onClick={getPrev}>Edelliset 10</Button>
                  <Button onClick={getNext}>Seuraavat 10</Button>
                </Grid> */}
              </Grid>
              {breakfast.map((item) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={item.id}>
                    <RecipeCard
                      title={item.title}
                      img={item.image}
                      link={`${match.url}/${item.id}`}
                    />
                  </Grid>
                );
              })}
              {/*     <Grid item xs={12}>
                <AddRecipe category="aamupala" />
              </Grid> */}
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Breakfasts;
