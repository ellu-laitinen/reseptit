import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";

const Pagination = ({
  nextToken,
  setNextToken,
  newNextToken,
  setNewNextToken,
  prevToken,
  setPrevToken,
}) => {
  const getNext = () => {
    console.log("get next");
    setPrevToken((prev) => [...prev, nextToken]);
    setNextToken(newNextToken);
    setNewNextToken(null);
  };

  const getPrev = () => {
    // console.log("get previous")
    setNextToken(prevToken.pop());
    setPrevToken([...prevToken]);
    setNewNextToken(null);
  };

  return (
    <div>
      {" "}
      <Grid item xs={12} style={{ marginLeft: "1rem" }}>
        <Button onClick={getPrev}>Edelliset 10</Button>
        <Button onClick={getNext}>Seuraavat 10</Button>
      </Grid>
    </div>
  );
};

export default Pagination;
