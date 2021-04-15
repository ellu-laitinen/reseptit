import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import * as queries from "../graphql/queries";
import { API, Storage } from "aws-amplify";
import { TextField, Button, TextareaAutosize, InputLabel, Grid, Card, Typography} from '@material-ui/core'
import {   updateBreakfast as updateBreakfastMutation } from '../graphql/mutations';


const EditRecipe = () => {
    const [editRecipe, setEditRecipe] = useState("")

    let { id} = useParams();


    console.log(id);
    useEffect(() => {
        fetchBreakfast()
    }, [])

    async function fetchBreakfast() {
        console.log("fetching breakfasts");
        const apiData = await API.graphql({
          query: queries.getBreakfast,
          variables: { id: id },
        });
        console.log(apiData);
        const recipeFromAPI = apiData.data.getBreakfast;
    
       recipeFromAPI.ingredients =  JSON.parse(recipeFromAPI.ingredients)
        if (recipeFromAPI.image) {
          console.log(recipeFromAPI);
          const image = await Storage.get(recipeFromAPI.image);
          recipeFromAPI.image = image;
        }
        setEditRecipe(recipeFromAPI);
      
        console.log(recipeFromAPI);
      }
      console.log(editRecipe.title)

   

      const recipeHandler = (e) => {
        setEditRecipe({
          ...editRecipe,
          [e.target.name]: e.target.value,
        });
      };

      async function saveRecipe () {

      console.log("new data saved")

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
        <Grid item>
         
        </Grid>
        <Grid item>
          <InputLabel>Reseptin nimi</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="title"
           value={editRecipe.title}
             onChange={recipeHandler}
          ></TextField>
        </Grid>
 {/*        <Grid item>
          <InputLabel>Ainesosat</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="ingredients"
            value={recipeData.ingredients.ingredients}
            onChange={changeIngHandler}
          ></TextField>
           <Button onClick={addIng}>Lisää listaan</Button>
        </Grid> */}
        {/*       {newRecipe.ingredients.map((i) => (
        <div>
          <li value={i.ingredients}>{i.ingredients}</li>
          <button onClick={() => removeIng(i.ingredients)}>poista</button>
        </div>
      ))} */}
 {/*        <Grid item>
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
        </Grid>*/}
        <Grid item>
          <Button
            onClick={saveRecipe}
     /*        variant="outlined"
            className={classes.button} */
          >
            Lisää resepti
          </Button>
        </Grid> 
      </Grid>
    </Card>
    );
}

export default EditRecipe;
