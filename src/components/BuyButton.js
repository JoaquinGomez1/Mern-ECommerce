import React from "react";
import { Button } from "@material-ui/core";
import useShoppingCart from "../hooks/useShoppingCart";

export default function BuyButton(props) {
  const { itemObject } = props;
  const { isInStock, qty } = itemObject;
  const { addToShoppingCart } = useShoppingCart(itemObject._id, itemObject);

  return (
    <Button
      size="large"
      variant="contained"
      color="secondary"
      onClick={addToShoppingCart}
      disabled={isInStock && qty >= 1 ? false : true} // If outOfStock make button disabled
    >
      Add To Cart
    </Button>
  );
}
