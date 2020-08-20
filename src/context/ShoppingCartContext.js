import React, { useState } from "react";

export const myShoppingCartContext = React.createContext();

export default function ShoppingCartContext(props) {
  const [shoppingCartItems, setShoppingCartItems] = useState([]);

  return (
    <myShoppingCartContext.Provider
      value={{ shoppingCartItems, setShoppingCartItems }}
      {...props}
    />
  );
}
