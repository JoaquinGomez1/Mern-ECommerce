import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import useFetch from "../hooks/useFetch";
import { useHistory } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import { useTheme } from "@material-ui/core/styles";

import { HEADERS_GET } from "../headers";
const url = process.env.REACT_APP_FETCH_LOCATION
  ? process.env.REACT_APP_FETCH_LOCATION + "/user/favorites"
  : "/user/favorites";

export default function ViewFavorites() {
  const { data, isLoading, errorMessage } = useFetch(url, HEADERS_GET);
  const history = useHistory();

  const theme = useTheme();
  const secondaryMainColor = theme.palette.secondary.main;

  const redirectTo = (url) => {
    history.push(url);
  };

  return (
    <>
      <Container style={{ minWidth: "80%" }}>
        <Grid container>
          {!isLoading ? (
            data?.length > 0 ? (
              <Pagination>
                {data &&
                  data?.map((each) => (
                    <ProductCard
                      key={each._id}
                      itemObject={each}
                      onCardAreaClick={() =>
                        redirectTo(`/products/${each._id}`)
                      }
                      image={each.img}
                    />
                  ))}
              </Pagination>
            ) : (
              <Typography
                variant="h5"
                style={{ color: secondaryMainColor, margin: "40px auto" }}
              >
                {" "}
                There are no favorites in your account yet{" "}
              </Typography>
            )
          ) : (
            <LoadingComponent />
          )}

          {errorMessage && (
            <Typography variant="h5" style={{ margin: "0 auto", color: "red" }}>
              {errorMessage}
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}
