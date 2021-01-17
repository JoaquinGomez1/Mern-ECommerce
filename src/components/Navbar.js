import React, { useContext } from "react";

import NavbarView from "./NavbarView";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import { myUserContext } from "../context/UserContext";
import "../static/css/Navbar.css";

export default function Navbar() {
  const { shoppingCartItems } = useContext(myShoppingCartContext);
  const { currentUser } = useContext(myUserContext);

  return (
    <NavbarView
      currentUser={currentUser}
      shoppingCartItems={shoppingCartItems}
    />
  );
}
