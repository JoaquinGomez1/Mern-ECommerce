import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Grid } from "@material-ui/core";
import { myShoppingCartContext } from "../context/ShoppingCartContext";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function Navbar() {
  const [shoppingCartItems, setShoppingCartItems] = useContext(
    myShoppingCartContext
  );
  const history = useHistory();

  const redirectTo = (route) => {
    history.push(route);
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      style={{ backgroundColor: "#141414", color: "#e2e2e2" }}
    >
      <Grid item>
        <h2
          onClick={() => {
            redirectTo("/");
          }}
        >
          E-Commerce
        </h2>
      </Grid>

      <Grid item>
        <h3>Categories</h3>
      </Grid>

      <Grid
        item
        onClick={() => {
          redirectTo("/shoppingcart");
        }}
      >
        <p style={{ fontWeight: "bold" }}>{shoppingCartItems.length}</p>
        <ShoppingCartIcon></ShoppingCartIcon>
      </Grid>
      <div
        className="navbar-userSection"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Grid item style={{ padding: "0 10px" }}>
          <h3>Login</h3>
        </Grid>
        <Grid item style={{ padding: "0 10px" }}>
          <h3>Register</h3>
        </Grid>
      </div>
    </Grid>
  );
}
