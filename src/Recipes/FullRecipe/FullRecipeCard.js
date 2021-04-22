import React from 'react';
import {Grid, Card, Button, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'

const FullRecipeCard = ({loadedRecipe, link}) => {
    return (
        <Card>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h4">{loadedRecipe.title}</Typography>
          </Grid>
          {loadedRecipe.image ?   <Grid item>
            <img
              src={loadedRecipe.image}
              alt={loadedRecipe.title}
              style={{ width: 400 }}
            />
          </Grid> : ""}
        
          <Grid item>        
            <Typography>Ainesosat:</Typography>
            <ul>
            {loadedRecipe && loadedRecipe.ingredients.map((i) =><li key={i}>{i}</li>)}
            </ul>
            <Typography></Typography>
          </Grid>
          <Grid item>
            <Typography>Ohje:</Typography>
            <Typography>{loadedRecipe.instructions}</Typography>
          </Grid>
          <Grid item>
            <Link to={`${link}/edit/${loadedRecipe.id}`}>
            <Button >Muokkaa</Button>
            </Link>
            
          </Grid>
        </Grid>
      </Card>
    );
}

export default FullRecipeCard;
