import React, { useLayoutEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import Pagination from "./Pagination";

export default function ProductsListing() {
  return (
    <Grid container direction="column" alignItems="center">
      <h1>View Our PC Products</h1>
      <Grid container direction="row" justify="center">
        <Pagination></Pagination>
      </Grid>
    </Grid>
  );
}
