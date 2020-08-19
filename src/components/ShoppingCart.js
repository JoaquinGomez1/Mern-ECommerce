import React, { useContext } from "react";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useContext(myShoppingCartContext);

  const calculatePrice = () => {
    let arrayOfPrices = shoppingCart.map((item) => item.qty * item.price); // Returns an array of total price per item
    return arrayOfPrices.reduce((a, b) => {
      return a + b;
    });
  };

  return (
    <React.Fragment>
      <Grid container justify="center">
        {shoppingCart.map((each) => (
          <>
            <ProductCard
              id={each.id}
              title={each.name}
              subtitle={each.price}
              image={each.image}
              buyer
            ></ProductCard>
            <p>{each.qty}</p>
          </>
        ))}
      </Grid>
      <Grid container>
        <h1>Total price:</h1>
        <p>{shoppingCart.length > 0 ? calculatePrice() : null}</p>
      </Grid>
    </React.Fragment>
  );
}
