import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Grid, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const URL = "/products?search=";
  const history = useHistory();
  const inputStyle = {
    width: "100%",
    padding: "18px 5px",
    border: "none",
    backgroundColor: "#f1f1f1",
    fontSize: "22px",
    margin: "20px 0",
    color: "rgba(0,0,0,.7)",
  };

  const fetchProduct = async () => {
    if (!searchInput) return null;
    const searchUrl = URL + searchInput;
    history.push(searchUrl);
  };

  return (
    <Grid container className='SearchBar' justify='center'>
      <Grid item style={{ display: "flex" }}>
        <TextField
          label='Search'
          variant='outlined'
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />

        <div id='searchIconWrapper' onClick={fetchProduct}>
          <SearchIcon id='searchIcon' />
        </div>
      </Grid>
    </Grid>
  );
}
