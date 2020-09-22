import React from "react";
import useFetch from "../hooks/useFetch";
import { Grid, Typography } from "@material-ui/core";
import BuyButton from "./BuyButton";

export default function ProductReview(props) {
  const url = `http://192.168.0.8:3100/products/${props.match.params.id}`;
  const { data, isLoading, errorMessage } = useFetch(url);

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  if (!isLoading) {
    if (data.qty <= 0) {
      data.isInStock = false;
    }
  }

  return (
    <div className="componentTransition" style={{ marginTop: "50px" }}>
      {isLoading ? (
        <h1 style={{ color: "black", fontSize: "38px" }}>Loading</h1>
      ) : (
        <>
          <img src={data.img} alt={data.name} />
          <Grid container justify="center">
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ width: "70%" }}
            >
              <h2 style={{ color: "black", fontSize: "38px" }}>{data.name}</h2>
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
                    }}
                  >
                    Products available: {data.qty}
                  </Typography>
                  <BuyButton
                    _id={data._id}
                    image={data.img}
                    name={data.name}
                    price={data.price}
                    isInStock={data.isInStock}
                    qty={data.qty}
                  ></BuyButton>
                </>
              )}

              {!data.isInStock && (
                <Typography variant="h4" style={{ color: "red" }}>
                  Out of stock
                </Typography>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
