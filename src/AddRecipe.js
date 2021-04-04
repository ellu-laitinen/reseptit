import axios from "axios";
import React, { useState } from "react";
import {
  Grid,
  Card,
  Typography,
  InputLabel,
  TextField,
  TextareaAutosize,
  Button,
} from "@material-ui/core";

const AddRecipe = () => {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: [],
    instructions: "",
  });

  const changeHandler = (e) => {
    setNewRecipe({
      [e.target.name]: e.target.value,
    });
  };

  const addIng = () => {
    setNewRecipe({});
  };

  const addRecipe = (e) => {
    console.log("new recipe added");
    console.log(newRecipe);
    axios
      .post(`http://localhost:3001/breakfast`, newRecipe)
      .then((response) => {
        console.log(response.data);
      });
  };

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
            onChange={changeHandler}
          ></TextField>
        </Grid>
        <Grid item>
          <InputLabel>Ainesosat</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="ingredients"
            onChange={changeHandler}
          ></TextField>
          <Button onClick={addIng}>Lisää listaan</Button>
        </Grid>
        <Grid item>
          <InputLabel>Ohjeet</InputLabel>
          <TextareaAutosize
            rowsMin={10}
            type="text"
            name="instructions"
            onChange={changeHandler}
          ></TextareaAutosize>
        </Grid>
        <Button type="submit" onClick={addRecipe}>
          Lisää resepti
        </Button>
      </Grid>
    </Card>
  );
};

export default AddRecipe;
