import React, {
  useContext,
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

// Material UI
import { Grid } from "@material-ui/core";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

// Context
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { myUserContext } from "../context/UserContext";

// CSS
import "../static/css/Navbar.css";

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const { shoppingCartItems } = useContext(myShoppingCartContext);
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const history = useHistory();

  const pRef = useRef();
  const modalRef = useRef();
  const menuIconRef = useRef();
  const liRef = useRef();

  const redirectTo = (route) => {
    history.push(route);
  };

  useLayoutEffect(() => {
    // Since navbar is the only consistent component trought the entire website.
    // We use it to check if there is currently a user logged in and to set the current user into the context
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    if (parsedUser) {
      setCurrentUser(parsedUser);
    }
  }, [setCurrentUser]);

  useEffect(() => {
    // check if there is any items in the shopping cart and change its styling
    if (shoppingCartItems.length >= 1) {
      pRef.current.style.backgroundColor = "#ed0c5b";
      pRef.current.style.display = "block";
    } else pRef.current.style.display = "none";
  }, [shoppingCartItems]);

  useEffect(() => {
    if (modalOpen) modalRef.current.style.display = "grid";
    else modalRef.current.style.display = "none";
  }, [modalOpen]);

  const handleModal = (e) => {
    if (e.target === menuIconRef.current) setModalOpen(true);
    if (e.target === modalRef.current || e.target === liRef.current)
      setModalOpen(false);
  };

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
