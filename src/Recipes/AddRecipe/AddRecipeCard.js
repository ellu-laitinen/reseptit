import React from "react";
import {
  Card,
  Grid,
  Button,
  InputLabel,
  TextField,
  TextareaAutosize,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
const useStyles = makeStyles({
  button: {
    color: "black",
    backgroundColor: "lightgrey",
    boxShadow: "2px 2px  grey ",
    borderRadius: "10px",
  },
});

const AddRecipeCard = ({
  recipeData,
  ingredients,
  createRecipe,
  category,
  addIng,
  changeIngHandler,
  onChange,
  recipeHandler,
  removeIng,
  image,
}) => {
  console.log(recipeData);
  const classes = useStyles();
  return (
    <div>
      <Card style={{ margin: "2rem" }}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Lisää {category}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel>Reseptin nimi</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              type="text"
              name="title"
              value={recipeData.title}
              onChange={recipeHandler}
              style={{ width: "100%" }}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel>Ainesosat</InputLabel>
            <Grid container>
              <Grid item xs={10} sm={11}>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  name="ingredients"
                  value={ingredients.value}
                  onChange={changeIngHandler}
                  style={{ width: "100%" }}
                ></TextField>
              </Grid>
              <Grid item xs={2} sm={1}>
                <Button
                  color="primary"
                  onClick={addIng}
                  style={{ paddingLef: 0 }}
                >
                  <AddCircleOutlineOutlinedIcon
                    style={{ fontSize: "xx-large" }}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Typography>Lisätyt ainesosat:</Typography>
          <Grid item xs={12}>
            {recipeData.ingredients &&
              recipeData.ingredients.map((i) => (
                <Grid container alignItems="center">
                  <Grid item xs={8}>
                    <Typography key={i}>{i}</Typography>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => removeIng(i)} color="secondary">
                      <RemoveCircleOutlineOutlinedIcon />
                    </Button>
                  </Grid>
                </Grid>
              ))}
          </Grid>
          <Grid item>
            <InputLabel>Ohjeet</InputLabel>
            <TextareaAutosize
              multiline
              style={{ width: "90%", whiteSpace: "pre-wrap" }}
              rowsMin={10}
              type="text"
              name="instructions"
              value={recipeData.instructions}
              onChange={recipeHandler}
            ></TextareaAutosize>
          </Grid>
          <Grid item>
            <InputLabel>Lisää kuva:</InputLabel>

            <input type="file" onChange={onChange} />
            <Grid item>
              <img
                src={image}
                alt={recipeData.title}
                style={{ width: "80%", marginTop: "2rem" }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Button
              onClick={createRecipe}
              variant="outlined"
              className={classes.button}
            >
              Lisää resepti
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default AddRecipeCard;
