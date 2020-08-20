import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Grid } from "@material-ui/core";
import { myShoppingCartContext } from "../context/ShoppingCartContext";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { myUserContext } from "../context/UserContext";

export default function Navbar() {
  const [shoppingCartItems, setShoppingCartItems] = useContext(
    myShoppingCartContext
  );

  const { currentUser } = useContext(myUserContext);
  const history = useHistory();

  const redirectTo = (route) => {
    history.push(route);
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      style={{ backgroundColor: "#141414", color: "#e2e2e2", height: "80px" }}
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
        {currentUser.isLoggedIn ? (
          <Grid item>
            {" "}
            <h3
              onClick={() => {
                redirectTo("/user");
              }}
            >
              View Profile
            </h3>
          </Grid>
        ) : (
          <>
            <Grid item style={{ padding: "0 10px" }}>
              <h3
                onClick={() => {
                  redirectTo("/login");
                }}
              >
                Login
              </h3>
            </Grid>
            <Grid item style={{ padding: "0 10px" }}>
              <h3
                onClick={() => {
                  redirectTo("/register");
                }}
              >
                Register
              </h3>
            </Grid>
          </>
        )}
      </div>
    </Grid>
  );
}
