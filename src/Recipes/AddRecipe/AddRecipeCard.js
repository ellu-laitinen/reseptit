import React from 'react';
import {Card, Grid, Button, InputLabel ,TextField, TextareaAutosize, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    button: {
      color: "black",
      backgroundColor: "lightgrey",
    },
  });

const AddRecipeCard = (  {recipeData,
   ingredients,
    createRecipe,
    category,
    addIng,
    changeIngHandler,
onChange,
recipeHandler,
removeIng}) => {
    const classes = useStyles();
    return (
        <Card style={{ margin: "2rem" }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h6">Lisää {category}</Typography>
          </Grid>
          <Grid item>
            <InputLabel>Reseptin nimi</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              type="text"
              name="title"
              value={recipeData.title}
              onChange={recipeHandler}
            ></TextField>
          </Grid>
          <Grid item>
            <InputLabel>Ainesosat</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              type="text"
              name="ingredients"
              value={ingredients.value}
              onChange={changeIngHandler}
            ></TextField>
            <Button onClick={addIng}>Lisää listaan</Button>
          </Grid>
          <Typography>Lisätyt ainesosat:</Typography>
                {recipeData.ingredients && recipeData.ingredients.map((i) => (
          <div>
            <li value={i}>{i}</li>
            <button onClick={() => removeIng(i)}>poista</button>
          </div>
        ))}
          <Grid item>
            <InputLabel>Ohjeet</InputLabel>
            <TextareaAutosize
              style={{ width: 300 }}
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
    );
}

export default AddRecipeCard;
