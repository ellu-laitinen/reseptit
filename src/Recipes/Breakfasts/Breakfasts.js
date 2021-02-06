import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import data from "../../breakfasts.json";

const Aamupalat = () => {
  const breakfast = data.map((item) => {
    return (
      <Grid item>
        <Card>
          <Typography>
            <ul>
              <li> {item.ingredient1}</li>
              <li> {item.ingredient2}</li>
              <li> {item.ingredient3}</li>
            </ul>
          </Typography>

          <Typography>Katso resepti</Typography>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      <Typography variant="h6">Aamupalat</Typography>

      {breakfast}
    </Grid>
  );
};

export default Aamupalat;
