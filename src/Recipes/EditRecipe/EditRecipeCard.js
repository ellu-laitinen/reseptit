import React, {useState} from 'react';
import {Grid, Card, Button, InputLabel, TextField, TextareaAutosize} from '@material-ui/core'

const EditRecipeCard = ({loadedRecipe, recipeHandler, ingHandler, addIngHandler, onChange, changeIngHandler, removeImg, saveRecipe}) => {

  const[addIng, setAddIng] = useState(false)

  const addIngredient=()=> {
    setAddIng(!addIng)
  }
    return (
        <Card style={{ margin: "2rem" }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item></Grid>
          <Grid item>
            <InputLabel>Reseptin nimi</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              type="text"
              name="title"
              value={loadedRecipe.title}
              onChange={recipeHandler}
            ></TextField>
          </Grid>
          <Grid item>
            <InputLabel>Ainesosat</InputLabel>
  
            {loadedRecipe &&
              loadedRecipe.ingredients.map((i, index) => {
                return (
                  <TextField
                    key={index}
                    variant="outlined"
                    size="small"
                    type="text"
                    name="ingredients"
                    value={i}
                    onChange={(e) => ingHandler(e, index)}
                  ></TextField>
                );
              })}
              <Button onClick={addIngredient}>Lisää uusi ainesosa</Button>
              {addIng && <Grid item> <TextField size="small" name="ingredient" onChange={ changeIngHandler}/>
              <Button onClick={addIngHandler}>Lisää</Button>  </Grid>}
  
            {/*            <Button onClick={addIng}>Lisää listaan</Button> */}
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
              style={{ width: 300 }}
              rowsMin={10}
              type="text"
              name="instructions"
              value={loadedRecipe.instructions}
              onChange={recipeHandler}
            ></TextareaAutosize>
          </Grid>
          {loadedRecipe.image ? <Grid item>
            <img src={loadedRecipe.image} alt={loadedRecipe.title} />
        
  
            <Grid item><Button color="secondary" onClick={removeImg}>Poista kuva</Button>
            <InputLabel>Vaihda kuva</InputLabel>
          <input type="file" onChange={onChange} /></Grid>
          </Grid> : <Grid item> <InputLabel>Lisää kuva</InputLabel>
          <input type="file" onChange={onChange} /> </Grid> }
         
          <Grid item>
          
            <Button
              onClick={saveRecipe}
              /*        variant="outlined"
              className={classes.button} */
            >
              Tallenna muutokset
            </Button>
          </Grid>
        </Grid>
      </Card>
    );
}

export default EditRecipeCard;
