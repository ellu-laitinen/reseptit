import axios from "axios";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import {
  Grid,
  Card,
  Typography,
  InputLabel,
  TextField,
  TextareaAutosize,
  Button,
  Divider,
} from "@material-ui/core";
import { listLunchs } from "../graphql/queries";
import {
  createLunch as createLunchMutation,
  deleteLunch as deleteLunchutation,
} from "../graphql/mutations";

const AddLunch = () => {
  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [lunches, setLunches] = useState([]);
  const [lunchData, setLunchData] = useState(initialState);

  useEffect(() => {
    fetchLunches();
  }, []);

  // DINNER
  async function fetchLunches() {
    const apiData = await API.graphql({ query: listLunchs });
    setLunches(apiData.data.listLunchs.items);
  }

  async function createLunch() {
    if (!lunchData.title || !lunchData.ingredients || !lunchData.instructions)
      return;
    await API.graphql({
      query: createLunchMutation,
      variables: { input: lunchData },
    });
    setLunches([...lunches, lunchData]);
    setLunchData(initialState);
  }

  return (
    <Card style={{ margin: "2rem" }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <InputLabel>Reseptin nimi</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="title"
            value={lunchData.title}
            onChange={(e) =>
              setLunchData({ ...lunchData, title: e.target.value })
            }
          ></TextField>
        </Grid>
        <Grid item>
          <InputLabel>Ainesosat</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="ingredients"
            value={lunchData.ingredients}
            onChange={(e) =>
              setLunchData({
                ...lunchData,
                ingredients: e.target.value,
              })
            }
          ></TextField>
          {/*  <Button onClick={addIng}>Lisää listaan</Button> */}
        </Grid>
        {/*       {newRecipe.ingredients.map((i) => (
          <div>
            <li value={i.ingredients}>{i.ingredients}</li>
            <button onClick={() => removeIng(i.ingredients)}>poista</button>
          </div>
        ))} */}
        <Grid item>
          <InputLabel>Ohjeet</InputLabel>
          <TextareaAutosize
            rowsMin={10}
            type="text"
            name="instructions"
            value={lunchData.instructions}
            onChange={(e) =>
              setLunchData({
                ...lunchData,
                instructions: e.target.value,
              })
            }
          ></TextareaAutosize>
        </Grid>
        <Button type="submit" onClick={createLunch}>
          Lisää resepti
        </Button>
      </Grid>
    </Card>
  );
};

export default AddLunch;
