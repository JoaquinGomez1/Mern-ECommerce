import React from "react";
import { Grid } from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MobileMenu from "./MobileMenu";
import { NavLink } from "react-router-dom";

export default function NavbarView({
  redirectTo,
  currentUser,
  pRef,
  shoppingCartItems,
}) {
  return (
    <Grid
      container
      direction='row'
      justify='space-around'
      style={{ backgroundColor: "#141414", color: "#e2e2e2", height: "80px" }}
      className='NavBarContainer'>
      <Grid item>
        <h2
          onClick={() => {
            redirectTo("/");
          }}
          className='navLogo'>
          Electroniks
        </h2>
      </Grid>

      <Grid item className='NavProducts categories'>
        <h3 onClick={() => redirectTo("/products")}>Products</h3>
      </Grid>

      <Grid item className='categories'>
        <NavLink
          to='/categories'
          style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>
          <h3>Categories</h3>{" "}
        </NavLink>
      </Grid>

      <Grid
        item
        onClick={() => {
          redirectTo("/shoppingcart");
        }}
        className='shoppingCartNav'>
        <p ref={pRef} style={{ fontWeight: "bold" }}>
          {shoppingCartItems.length > 0 ? shoppingCartItems.length : null}
        </p>
        <ShoppingCartIcon className='shoppingCartIcon' />
      </Grid>
      <div
        className='navbar-userSection'
        style={{ display: "flex", alignItems: "center" }}>
        {currentUser ? (
          <Grid item style={{ display: "grid", placeItems: "center" }}>
            <h3
              onClick={() => {
                redirectTo("/user");
              }}>
              <AccountCircleIcon style={{ transform: "scale(1.2)" }} />
            </h3>
          </Grid>
        ) : (
          <>
            <Grid item style={{ padding: "0 10px" }}>
              <h3
                onClick={() => {
                  redirectTo("/login");
                }}>
                Login
              </h3>
            </Grid>
            <Grid item style={{ padding: "0 10px" }}>
              <h3
                onClick={() => {
                  redirectTo("/register");
                }}>
                Register
              </h3>
            </Grid>
          </>
        )}
      </div>

      <MobileMenu currentUser={currentUser} />
    </Grid>
  );
}
