import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { myShoppingCartContext } from "../context/ShoppingCartContext";

export default function BuyButton(props) {
  const { shoppingCartItems, setShoppingCartItems } = useContext(
    myShoppingCartContext
  );

  const addItem = () => {
    // Find if the item exists
    // eslint-disable-next-line
    const itemExists = shoppingCartItems.find(function (item) {
      if (item.id === props.id) return item;
    });

    if (itemExists) {
      // Get index of the item and add 1 to its quantity
      const itemIndex = shoppingCartItems.indexOf(itemExists);
      let shoppingCartCopy = [...shoppingCartItems];

      shoppingCartCopy[itemIndex] = {
        ...shoppingCartCopy[itemIndex],
        qty: shoppingCartCopy[itemIndex].qty + 1,
      };

      setShoppingCartItems(shoppingCartCopy);
    } else {
      // If the item does not exists then just added it to the shopping cart
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
      disabled={props.isInStock === true && props.qty >= 1 ? false : true} // If outOfStock make button disabled
    >
      Add To Cart
    </Button>
  );
}
