import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import useFetch from "../hooks/useFetch";
import { useHistory } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";

export default function ViewFavorites() {
  const url = "/user/favorites";
  const { data, isLoading, errorMessage } = useFetch(url);
  const history = useHistory();

  const redirectTo = (url) => {
    history.push(url);
  };

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
                    onCardAreaClick={() => redirectTo(`/products/${each._id}`)}
                    image={each.img}
                  />
                ))}
            </Pagination>
          ) : (
            <LoadingComponent />
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
