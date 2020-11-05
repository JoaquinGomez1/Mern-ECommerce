import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import useFetch from "../hooks/useFetch";

export default function ViewFavorites() {
  const url = "/user/favorites";
  const { data, isLoading, errorMessage } = useFetch(url);

  return (
    <>
      <Container style={{ minWidth: "80%" }}>
        <Grid container>
          {!isLoading ? (
            <Pagination>
              {data &&
                data.map((each) => (
                  <ProductCard
                    key={each._id}
                    _id={each._id}
                    title={each.name}
                    subtitle={each.price}
                    qty={1}
                    isInStock={true}
                    image={each.img}></ProductCard>
                ))}
            </Pagination>
          ) : (
            <h1 style={{ margin: "0 auto" }}>Loading...</h1>
          )}

          {errorMessage && (
            <Typography variant='h5' style={{ margin: "0 auto", color: "red" }}>
              {errorMessage}
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}
