import React from "react";
import useFetch from "../hooks/useFetch";
import { Grid, Typography, Box, Paper } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import BuyButton from "./BuyButton";
import LoadingComponent from "./LoadingComponent";

export default function ProductReview(props) {
  const url = process.env.REACT_APP_FETCH_LOCATION
    ? process.env.REACT_APP_FETCH_LOCATION +
      `/products/${props.match.params.id}`
    : `/products/${props.match.params.id}`;
  const { data, isLoading, errorMessage } = useFetch(url);
  const theme = useTheme();

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  if (!isLoading && data) {
    if (data.qty <= 0) {
      data.isInStock = false;
    }
  }

  if (!data && !isLoading) {
    return (
      <Typography style={{ margin: "calc(25% - 80px) auto" }} variant="h3">
        Sorry We could not find that item
      </Typography>
    );
  }

  return (
    <div style={{ marginTop: "50px" }}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Grid
          container
          style={{ maxWidth: "1000px", margin: "0 auto" }}
          justify="center"
          className="componentTransition"
        >
          <Paper
            style={{
              padding: "30px",
              width: "80vw",
              maxWidth: theme.breakpoints.values.md,
            }}
          >
            <Box display="flex" className="product-listing-container">
              <img
                style={{ maxWidth: "100%" }}
                src={data.img}
                alt={data.name}
              />
              <Grid container justify="center">
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  style={{ width: "70%" }}
                >
                  <h2 style={{ color: "black", fontSize: "38px" }}>
                    {data.name}
                  </h2>
                  <Typography variant="h4" style={{ opacity: ".7" }}>
                    $ {data.price}
                  </Typography>

                  {data.isInStock && (
                    <>
                      <Typography
                        variant="h6"
                        style={{
                          color:
                            data.qty < 1 || !data.isInStock
                              ? "red"
                              : "rgba(0,0,0,.5)",
                          margin: "32px 0",
                        }}
                      >
                        Products available: {data.qty}
                      </Typography>
                      <BuyButton itemObject={data} />
                    </>
                  )}

                  {!data.isInStock && (
                    <Typography variant="h4" style={{ color: "red" }}>
                      Out of stock
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Typography style={{ margin: "4rem 0" }} variant="h5">
              {data.description ||
                "Sadly there is no description set for this item yet"}
            </Typography>
          </Paper>
        </Grid>
      )}
    </div>
  );
}
