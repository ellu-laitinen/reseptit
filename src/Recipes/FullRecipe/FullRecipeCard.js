import React from "react";
import {
  Grid,
  Card,
  Button,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles({
  link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  button: {
    textDecoration: "none",
    marginTop: "2rem",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
});

const FullRecipeCard = ({ loadedRecipe, link, remove, category }) => {
  const classes = useStyles();
  const history = useHistory();

  const instructions = loadedRecipe.instructions;
  return (
    <Card>
      <Grid container direction="column" spacing={3}>
        <Grid container>
          <Grid item xs={9} sm={11}>
            <Typography variant="h4">{loadedRecipe.title}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {loadedRecipe.image ? (
            <Grid item xs={12} md={6}>
              <img
                src={loadedRecipe.image}
                alt={loadedRecipe.title}
                style={{ width: "100%" }}
              />
            </Grid>
          ) : (
            ""
          )}

          <Grid item xs={12} sm={6}>
            <Typography>Ainesosat:</Typography>
            <ul style={{ listStyleType: "circle" }}>
              {loadedRecipe &&
                loadedRecipe.ingredients.map((i) => (
                  <>
                    <li key={i}>{i}</li>
                    <Divider style={{ width: "80%", marginBottom: "0.5rem" }} />
                  </>
                ))}
            </ul>
            <Typography></Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography>Ohje:</Typography>
          <Typography>
            {instructions &&
              instructions.split("\n").map((item) => {
                return (
                  <span>
                    {item}
                    <br></br>
                  </span>
                );
              })}
          </Typography>
        </Grid>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            {/*    <Link
              to={`${link}/edit/${loadedRecipe.id}`}
              className={classes.button}
            > */}
            <Button
              className={classes.button}
              onClick={() =>
                history.push(`/edit/${category}/${loadedRecipe.id}`)
              }
            >
              {" "}
              Muokkaa <EditOutlinedIcon />
            </Button>
            {/*  </Link> */}
          </Grid>
          {/*    <Grid item>
            <Button
              onClick={remove}
              color="secondary"
              className={classes.button}
            >
              Poista <DeleteOutlineIcon size="small" />
            </Button>
          </Grid> */}
        </Grid>
      </Grid>
    </Card>
  );
};

export default FullRecipeCard;
