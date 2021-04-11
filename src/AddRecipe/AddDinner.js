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
import { listDinners } from "../graphql/queries";
import { createDinner as createDinnerMutation } from "../graphql/mutations";

const AddDinner = () => {
  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [dinners, setDinners] = useState([]);
  const [dinnerData, setDinnerData] = useState(initialState);

  useEffect(() => {
    fetchDinners();
  }, []);

  // DINNER
  async function fetchDinners() {
    const apiData = await API.graphql({ query: listDinners });
    setDinners(apiData.data.listDinners.items);
  }

  async function createDinner() {
    if (
      !dinnerData.title ||
      !dinnerData.ingredients ||
      !dinnerData.instructions
    )
      return;
    await API.graphql({
      query: createDinnerMutation,
      variables: { input: dinnerData },
    });
    setDinners([...dinners, dinnerData]);
    setDinnerData(initialState);
    console.log(dinnerData);
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
            value={dinnerData.title}
            onChange={(e) =>
              setDinnerData({ ...dinnerData, title: e.target.value })
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
            value={dinnerData.ingredients}
            onChange={(e) =>
              setDinnerData({
                ...dinnerData,
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
            value={dinnerData.instructions}
            onChange={(e) =>
              setDinnerData({
                ...dinnerData,
                instructions: e.target.value,
              })
            }
          ></TextareaAutosize>
        </Grid>
        <Button type="submit" onClick={createDinner}>
          Lisää resepti
        </Button>
      </Grid>
    </Card>
  );
};

export default AddDinner;
