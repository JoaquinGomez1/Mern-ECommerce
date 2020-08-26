import React from "react";
import { Grid } from "@material-ui/core";

export default function SearchBar() {
  const inputStyle = {
    width: "100%",
    padding: "18px 0",
    border: "none",
    backgroundColor: "#f1f1f1",
    fontSize: "22px",
    margin: "20px 0",
    color: "rgba(0,0,0,.7)",
  };
  return (
    <Grid container className="SearchBar" justify="center">
      <Grid item>
        <input className="SearchBar-input" style={inputStyle}></input>
      </Grid>
    </Grid>
  );
}
