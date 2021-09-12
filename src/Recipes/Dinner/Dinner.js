import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { listDinners } from "../../graphql/queries";
import { API, Storage } from "aws-amplify";
import { deleteDinner as deleteDinnerMutation } from "../../graphql/mutations";
import RecipeCard from "../RecipeCard";
import FullRecipe from "../FullRecipe/FullRecipe";
import { Grid, Typography } from "@material-ui/core";
import Pagination from "../../Pagination";

const Dinner = () => {
  const [dinner, setDinner] = useState([]);
  let match = useRouteMatch();

  const [nextToken, setNextToken] = useState(undefined);
  const [newNextToken, setNewNextToken] = useState();
  const [prevToken, setPrevToken] = useState([]);

  console.log("dinners length", dinner);
  console.log("next token", newNextToken);

  useEffect(() => {
    async function fetchDinners() {
      const apiData = await API.graphql({
        query: listDinners,
        variables: { nextToken, limit: 10 },
      });
      setNewNextToken(apiData.data.listDinners.nextToken);
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
    fetchDinners();
  }, [nextToken]);
  // DELETE dinner
  console.log(dinner);

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
                <Typography variant="h4">Päiväruuat</Typography>
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
              {dinner.map((item) => {
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
                <AddRecipe category={"päiväruoca"} />
              </Grid> */}
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Dinner;
