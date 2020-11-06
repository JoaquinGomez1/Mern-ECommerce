import React, { useContext, useRef, useEffect } from "react";

import NavbarView from "./NavbarView";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import { myUserContext } from "../context/UserContext";
import "../static/css/Navbar.css";

export default function Navbar() {
  const { shoppingCartItems } = useContext(myShoppingCartContext);
  const { currentUser } = useContext(myUserContext);

  const pRef = useRef();

  useEffect(() => {
    // check if there is any items in the shopping cart and change its styling
    if (shoppingCartItems.length >= 1) {
      pRef.current.style.backgroundColor = "#ed0c5b";
      pRef.current.style.display = "block";
    } else pRef.current.style.display = "none";
  }, [shoppingCartItems]);

  return (
    <NavbarView
      currentUser={currentUser}
      pRef={pRef}
      shoppingCartItems={shoppingCartItems}
    />
  );
}
