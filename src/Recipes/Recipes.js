import React, { useState } from "react";
// import { makeStyles } from '@material-ui/core/styles'
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Grid from "@material-ui/core/Grid";

import Breakfasts from "./Breakfasts/Breakfasts";
import AddRecipe from "../AddRecipe";
import Snacks from "./Snacks/Snacks";

const Recipes = () => {
  const [value, setValue] = useState(0);
  let match = useRouteMatch();

  // välilehtien sisältö
  const TabPanel = (props) => {
    const { children, value, index } = props;
    return (
      <div hidden={value !== index}>
        {value === index && <div>{children}</div>}
      </div>
    );
  };

  const showTabHandler = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={showTabHandler}>
          <Tab label="Aamupalat"></Tab>
          <Tab label="Lounaat"></Tab>
          <Tab label="Väli- ja iltapalat"></Tab>
          <Tab label="Päiväruuat"></Tab>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Breakfasts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Lounaat
      </TabPanel>
      <TabPanel value={value} index={2}>
        Väli- ja iltapalat
        <Snacks />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Päiväruuat
      </TabPanel>
      <AddRecipe />
    </div>
  );
};

export default Recipes;
