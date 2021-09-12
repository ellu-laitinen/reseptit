import React, { useEffect, useState } from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { listLunchs } from "../../graphql/queries";
import { deleteLunch as deleteLunchMutation } from "../../graphql/mutations";
import { API, Storage } from "aws-amplify";
import RecipeCard from "../RecipeCard";

import FullRecipe from "../FullRecipe/FullRecipe";

import { Grid, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Pagination from "../../Pagination";

const Lunch = () => {
  const [lunch, setLunch] = useState([]);

  let match = useRouteMatch();

  const [nextToken, setNextToken] = useState(undefined);
  const [newNextToken, setNewNextToken] = useState();
  const [prevToken, setPrevToken] = useState([]);
  console.log(match);

  useEffect(() => {
    fetchLunches();
  }, [nextToken]);

  async function fetchLunches() {
    const apiData = await API.graphql({
      query: listLunchs,
      variables: { nextToken, limit: 10 },
    });
    setNewNextToken(apiData.data.listLunchs.nextToken);
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

  return (
    <div>
      <Helmet>
        <title>Lounaat</title>
        <meta name="description" content="lounaat" />

        <meta property="og:type" content="lounaat" />
        <meta property="og:description" content="lounasreseptit" />
        <meta
          property="og:image"
          content="https://source.unsplash.com/dlfknldfkiSkw"
        />
      </Helmet>
      <Router>
        <Switch>
          <Route path={"/:category/:postId"}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Lounaat</Typography>
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
              </Grid>
              {lunch.map((item) => {
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
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Lunch;
