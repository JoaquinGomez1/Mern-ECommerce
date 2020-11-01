import React, { useContext } from "react";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import ProductCard from "./ProductCard";
import { Grid, Container, Typography, Button, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function ShoppingCart() {
  const { shoppingCartItems } = useContext(myShoppingCartContext);
  const history = useHistory();

  const calculatePrice = () => {
    let arrayOfPrices = shoppingCartItems.map((item) => item.qty * item.price); // Returns an array of total price per item
    return arrayOfPrices.reduce((acc, el) => {
      return acc + el;
    });
  };

  const redirectTo = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <React.Fragment>
      <Container
        className='componentTransition'
        style={{ height: "calc(100vh - 80px)" }}>
        <Grid container justify='center'>
          <Typography
            variant='h4'
            style={{ marginTop: "2rem", marginBottom: "auto" }}>
            Shopping Cart <hr />
          </Typography>
          <Grid container justify='center'>
            {shoppingCartItems.map((each) => (
              <>
                <ProductCard
                  _id={each._id}
                  title={each.name}
                  subtitle={each.price}
                  image={each.image}
                  qty={each.qty}
                  inShoppingCart
                  isInStock={each.isInStock}
                  onCardAreaClick={() => redirectTo(each._id)}
                />
              </>
            ))}
          </Grid>
        </Grid>
        <Grid container justify='center'>
          <h1>
            Total price:{" "}
            {shoppingCartItems.length > 0 && " - " && (
              <span>${calculatePrice()}</span>
            )}
          </h1>
          <Grid container justify='center'>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              style={{ marginBottom: "2rem" }}>
              Proceed To Checkout
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
