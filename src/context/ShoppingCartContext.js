import React, { useState } from "react";

export const myShoppingCartContext = React.createContext();

export default function ShoppingCartContext(props) {
  const [shoppingCartItems, setShoppingCartItems] = useState([]);

  const calculatePrice = () => {
    if (shoppingCartItems.length <= 0) return 0;
    let arrayOfPrices = shoppingCartItems.map((item) => item.qty * item.price); // Returns an array of total price per item
    return arrayOfPrices.reduce((acc, el) => {
      return acc + el;
    });
  };

  const shoppingCartTotalPrice = calculatePrice();

  return (
    <myShoppingCartContext.Provider
      value={{
        shoppingCartItems,
        setShoppingCartItems,
        shoppingCartTotalPrice,
      }}
      {...props}
    />
  );
}
