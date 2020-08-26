import React, { useContext } from "react";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import ProductCard from "./ProductCard";
import { Grid, Container } from "@material-ui/core";

export default function ShoppingCart() {
  const { shoppingCartItems } = useContext(myShoppingCartContext);

  const calculatePrice = () => {
    let arrayOfPrices = shoppingCartItems.map((item) => item.qty * item.price); // Returns an array of total price per item
    return arrayOfPrices.reduce((a, b) => {
      return a + b;
    });
  };

  return (
    <React.Fragment>
      <Container className="componentTransition">
        <Grid container justify="center">
          {shoppingCartItems.map((each) => (
            <>
              <ProductCard
                id={each.id}
                title={each.name}
                subtitle={each.price}
                image={each.image}
                qty={each.qty}
                inShoppingCart
              ></ProductCard>
            </>
          ))}
        </Grid>
        <Grid container>
          <h1>Total price:</h1>
          <p>
            {" "}
            {shoppingCartItems.length > 0 ? (
              <span>${calculatePrice()} </span>
            ) : null}
          </p>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
