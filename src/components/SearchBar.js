import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState({ value: "" });

  const inputStyle = {
    width: "100%",
    padding: "18px 5px",
    border: "none",
    backgroundColor: "#f1f1f1",
    fontSize: "22px",
    margin: "20px 0",
    color: "rgba(0,0,0,.7)",
  };

  const showProduct = () => {};

  return (
    <Grid container className="SearchBar" justify="center">
      <Grid item style={{ display: "flex" }}>
        <input
          className="SearchBar-input"
          onChange={(e) => {
            setSearchInput({ ...searchInput, value: e.target.value });
          }}
          style={inputStyle}
        ></input>
        <SearchIcon
          onClick={showProduct}
          style={{ backgroundColor: "#f1f1f1", padding: "18.7px" }}
        ></SearchIcon>
      </Grid>
    </Grid>
  );
}
