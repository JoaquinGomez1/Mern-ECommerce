import React from "react";
import useFetch from "../hooks/useFetch";
import { Grid, Typography, Box } from "@material-ui/core";
import BuyButton from "./BuyButton";

export default function ProductReview(props) {
  const url = `http://192.168.0.8:3100/products/${props.match.params.id}`;
  const { data, isLoading, errorMessage } = useFetch(url);

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  if (!isLoading && data) {
    if (data.qty <= 0) {
      data.isInStock = false;
    }
  }

  if (!data) {
    return (
      <Typography style={{ margin: "calc(25% - 80px) auto" }} variant='h3'>
        Sorry We could not find that item
      </Typography>
    );
  } else {
    return (
      <div className='componentTransition' style={{ marginTop: "50px" }}>
        {isLoading ? (
          <h1 style={{ color: "black", fontSize: "38px" }}>Loading</h1>
        ) : (
          <Grid
            container
            style={{ maxWidth: "1000px", margin: "0 auto" }}
            justify='center'>
            <Box display='flex' className='product-listing-container'>
              <img
                style={{ maxWidth: "100%" }}
                src={data.img}
                alt={data.name}
              />
              <Grid container justify='center'>
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  style={{ width: "70%" }}>
                  <h2 style={{ color: "black", fontSize: "38px" }}>
                    {data.name}
                  </h2>
                  <Typography variant='h4' style={{ opacity: ".7" }}>
                    $ {data.price}
                  </Typography>

                  {data.isInStock && (
                    <>
                      <Typography
                        variant='h6'
                        style={{
                          color:
                            data.qty < 1 || !data.isInStock
                              ? "red"
                              : "rgba(0,0,0,.5)",
                        }}>
                        Products available: {data.qty}
                      </Typography>
                      <BuyButton
                        _id={data._id}
                        image={data.img}
                        name={data.name}
                        price={data.price}
                        isInStock={data.isInStock}
                        qty={data.qty}
                      />
                    </>
                  )}

                  {!data.isInStock && (
                    <Typography variant='h4' style={{ color: "red" }}>
                      Out of stock
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Typography style={{ margin: "4rem 0" }} variant='h5'>
              {data.description ||
                "Sadly there is no description set for this item yet"}
            </Typography>
          </Grid>
        )}
      </div>
    );
  }
}
