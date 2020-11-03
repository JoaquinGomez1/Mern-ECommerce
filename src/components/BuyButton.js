import React from "react";
import { Button } from "@material-ui/core";
import useShoppingCart from "../hooks/useShoppingCart";

export default function BuyButton(props) {
  const { _id, name, price, image } = props;
  const itemObject = { _id, name, price, image };
  const { addToShoppingCart } = useShoppingCart(_id, itemObject);

  return (
    <Button
      size='large'
      variant='contained'
      color='secondary'
      onClick={addToShoppingCart}
      disabled={props.isInStock && props.qty >= 1 ? false : true} // If outOfStock make button disabled
    >
      Add To Cart
    </Button>
  );
}
