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
import { listSnacks } from "../graphql/queries";
import { createSnack as createSnackMutation } from "../graphql/mutations";

const AddSnack = () => {
  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [snacks, setSnacks] = useState([]);
  const [snackData, setSnackData] = useState(initialState);

  useEffect(() => {
    fetchSnacks();
  }, []);

  // DINNER
  async function fetchSnacks() {
    const apiData = await API.graphql({ query: listSnacks });
    setSnacks(apiData.data.listSnacks.items);
  }

  async function createSnack() {
    if (!snackData.title || !snackData.ingredients || !snackData.instructions)
      return;
    await API.graphql({
      query: createSnackMutation,
      variables: { input: snackData },
    });
    setSnacks([...snacks, snackData]);
    setSnackData(initialState);
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
            value={snackData.title}
            onChange={(e) =>
              setSnackData({ ...snackData, title: e.target.value })
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
            value={snackData.ingredients}
            onChange={(e) =>
              setSnackData({
                ...snackData,
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
            value={snackData.instructions}
            onChange={(e) =>
              setSnackData({
                ...snackData,
                instructions: e.target.value,
              })
            }
          ></TextareaAutosize>
        </Grid>
        <Button type="submit" onClick={createSnack}>
          Lisää resepti
        </Button>
      </Grid>
    </Card>
  );
};

export default AddSnack;
