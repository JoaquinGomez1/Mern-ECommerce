import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import Pagination from "./Pagination";
import useFetch from "../hooks/useFetch";

export default function ProductsListing({ location }) {
  let url = "http://192.168.0.8:3100/products";
  if (location.search) url += location.search;
  const { data, setData, isLoading } = useFetch(url);

  return (
    <Grid container direction="column" alignItems="center">
      <h1>View Our PC Products</h1>
      <Grid container direction="row" justify="center">
        <Pagination data={data} setData={setData} url={url}>
          {!isLoading &&
            data.results &&
            data.results.map((each) => (
              <ProductCard
                _id={each._id}
                title={each.name}
                subtitle={each.price}
                image={each.img}
                qty={each.qty}
                isInStock={each.isInStock}
              />
            ))}
          {isLoading && <h2>Loading</h2>}
          {!isLoading && data.results.length < 1 && <h2>Nothing Found</h2>}
        </Pagination>
      </Grid>
    </Grid>
  );
}
