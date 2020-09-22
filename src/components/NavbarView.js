import React from "react";
import { Grid } from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function NavbarView({
  redirectTo,
  currentUser,
  handleModal,
  modalRef,
  pRef,
  shoppingCartItems,
  setModalOpen,
  menuIconRef,
}) {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      style={{ backgroundColor: "#141414", color: "#e2e2e2", height: "80px" }}
      className="NavBarContainer"
    >
      <Grid item>
        <h2
          onClick={() => {
            redirectTo("/");
          }}
          className="navLogo"
        >
          E-Commerce
        </h2>
      </Grid>

      <Grid item className="NavProducts categories">
        <h3 onClick={() => redirectTo("/products")}>Products</h3>
      </Grid>

      <Grid item className="categories">
        <h3>Categories</h3>
      </Grid>

      <Grid
        item
        onClick={() => {
          redirectTo("/shoppingcart");
        }}
        className="shoppingCartNav"
      >
        <p ref={pRef} style={{ fontWeight: "bold" }}>
          {shoppingCartItems.length > 0 ? shoppingCartItems.length : null}
        </p>
        <ShoppingCartIcon className="shoppingCartIcon"></ShoppingCartIcon>
      </Grid>
      <div
        className="navbar-userSection"
        style={{ display: "flex", alignItems: "center" }}
      >
        {currentUser ? (
          <Grid item style={{ display: "grid", placeItems: "center" }}>
            <h3
              onClick={() => {
                redirectTo("/user");
              }}
            >
              <AccountCircleIcon
                style={{ transform: "scale(1.2)" }}
              ></AccountCircleIcon>
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
      <Grid item className="sideMenuContainer">
        <MenuIcon
          onClick={handleModal}
          ref={menuIconRef}
          className="MenuIcon"
        ></MenuIcon>

        <div className="modalContainer" onClick={handleModal} ref={modalRef}>
          <div className="modalContent">
            <ul>
              <li
                onClick={() => {
                  setModalOpen(false);
                  redirectTo("/products");
                }}
              >
                Products
              </li>
              <li>Categories</li>
              {currentUser ? (
                <li
                  onClick={() => {
                    setModalOpen(false);
                    redirectTo("/user");
                  }}
                >
                  Profile
                </li>
              ) : (
                <>
                  <li
                    onClick={() => {
                      setModalOpen(false);
                      redirectTo("/login");
                    }}
                  >
                    Log in
                  </li>
                  <li
                    onClick={() => {
                      setModalOpen(false);
                      redirectTo("/register");
                    }}
                  >
                    Sign Up
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
