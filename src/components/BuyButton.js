import React, { useContext, useEffect } from "react";

import { Button } from "@material-ui/core";

import { myShoppingCartContext } from "../context/ShoppingCartContext";

export default function BuyButton(props) {
  const [shoppingCartItems, setShoppingCartItems] = useContext(
    myShoppingCartContext
  );

  const addItem = () => {
    // Find if the item exists
    const itemExists = shoppingCartItems.find(function (item) {
      if (item.id == props.id) return item;
    });

    if (itemExists) {
      const itemIndex = shoppingCartItems.indexOf(itemExists);
      let shoppingCartCopy = [...shoppingCartItems];

      shoppingCartCopy[itemIndex] = {
        ...shoppingCartCopy[itemIndex],
        qty: shoppingCartCopy[itemIndex].qty + 1,
      };

      setShoppingCartItems(shoppingCartCopy);
    } else {
      setShoppingCartItems([
        ...shoppingCartItems,
        {
          id: props.id,
          name: props.name,
          qty: 1,
          price: props.price,
          image: props.image,
        },
      ]);
    }
  };

  return (
    <Button
      size="large"
      variant="contained"
      color="secondary"
      onClick={addItem}
    >
      Buy
    </Button>
  );
}
