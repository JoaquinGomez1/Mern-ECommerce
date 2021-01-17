import React from "react";
import { Grid } from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MobileMenu from "./MobileMenu";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "./ShoppingCartIcon";

export default function NavbarView({ currentUser, shoppingCartItems }) {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      style={{ backgroundColor: "#141414", color: "#e2e2e2", height: "80px" }}
      className="NavBarContainer"
    >
      <Grid item>
        <NavLink to="/" exact activeClassName="activeLink">
          <h2 className="navLogo">Electroniks</h2>
        </NavLink>
      </Grid>

      <Grid item className="NavProducts categories">
        <NavLink to="/products" activeClassName="activeLink">
          <h3>Products</h3>
        </NavLink>
      </Grid>

      <Grid item className="categories">
        <NavLink to="/categories" activeClassName="activeLink">
          <h3>Categories</h3>
        </NavLink>
      </Grid>

      <Grid item>
        <NavLink activeClassName="activeLink" to="/shoppingCart">
          <ShoppingCartIcon
            badgeContent={shoppingCartItems.length}
            className="shoppingCartIcon"
          />
        </NavLink>
      </Grid>
      <div
        className="navbar-userSection"
        style={{ display: "flex", alignItems: "center" }}
      >
        {currentUser ? (
          <Grid item style={{ display: "grid", placeItems: "center" }}>
            <NavLink activeClassName="activeLink" to="/user">
              <h3>
                <AccountCircleIcon style={{ transform: "scale(1.2)" }} />
              </h3>
            </NavLink>
          </Grid>
        ) : (
          <>
            <Grid item style={{ padding: "0 10px" }}>
              <NavLink to="/login" activeClassName="activeLink">
                <h3>Login</h3>
              </NavLink>
            </Grid>
            <Grid item style={{ padding: "0 10px" }}>
              <NavLink to="/register" activeClassName="activeLink">
                <h3>Register</h3>
              </NavLink>
            </Grid>
          </>
        )}
      </div>

      <MobileMenu currentUser={currentUser} />
    </Grid>
  );
}
