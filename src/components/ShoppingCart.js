import React, { useContext, useState, useEffect } from "react";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import ProductCard from "./ProductCard";
import { Grid, Typography, Button, SwipeableDrawer } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CheckoutView from "./CheckoutView";
import CardActionsShoppingCart from "./CardActionsShoppingcart";

export default function ShoppingCart() {
  const { shoppingCartItems } = useContext(myShoppingCartContext);
  const [isSwipeableDrawerOpen, setIsSwipeableDrawerOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();

  const calculatePrice = () => {
    if (shoppingCartItems.length <= 0) return 0;
    let arrayOfPrices = shoppingCartItems.map((item) => item.qty * item.price); // Returns an array of total price per item
    return arrayOfPrices.reduce((acc, el) => {
      return acc + el;
    });
  };

  const handleSwipeableDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsSwipeableDrawerOpen(!isSwipeableDrawerOpen);
  };

  const redirectTo = (id) => {
    history.push(`/products/${id}`);
  };

  useEffect(() => {
    setTotalPrice(calculatePrice());
    //eslint-disable-next-line
  }, [shoppingCartItems]);

  return (
    <React.Fragment>
      <div
        className="componentTransition"
        style={{
          height: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container justify="center">
          <Typography variant="h4" style={{ marginTop: "2rem" }}>
            Shopping Cart <hr />
          </Typography>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginBottom: "auto" }}
          >
            {/* Push Elements bellow this to the bottom */}
            {shoppingCartItems.length <= 0 ? (
              <h1 style={{ color: "#f50057" }}>
                The are no items in the Shopping Cart yet
              </h1>
            ) : (
              shoppingCartItems.map((each) => (
                <ProductCard
                  key={each._id}
                  itemObject={each}
                  onCardAreaClick={() => redirectTo(each._id)}
                >
                  <CardActionsShoppingCart _id={each._id} qty={each.qty} />
                </ProductCard>
              ))
            )}
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: "auto" }}>
          <h1>Total price: ${totalPrice}</h1>
          <Grid container justify="center">
            {shoppingCartItems.length >= 1 && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{ marginBottom: "6rem" }}
                  onClick={handleSwipeableDrawer}
                >
                  Proceed To Checkout
                </Button>
                <SwipeableDrawer
                  className="MuiDrawer-modal"
                  anchor="right"
                  open={isSwipeableDrawerOpen}
                  onClose={handleSwipeableDrawer}
                  onOpen={handleSwipeableDrawer}
                >
                  <CheckoutView />
                </SwipeableDrawer>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
