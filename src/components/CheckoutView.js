import React, { useContext, useState, useEffect } from "react";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import {
  ListItem,
  ListItemText,
  List,
  Avatar,
  Button,
  Typography,
} from "@material-ui/core";
import CardPayment from "./CardPayment";

export default function CheckoutView() {
  const { shoppingCartItems, setShoppingCartItems } = useContext(
    myShoppingCartContext
  );
  const [totalPrice, setTotalPrice] = useState();

  const calculatePrice = () => {
    if (shoppingCartItems.length <= 0) return 0;
    let arrayOfPrices = shoppingCartItems.map((item) => item.qty * item.price); // Returns an array of total price per item
    return arrayOfPrices.reduce((acc, el) => {
      return acc + el;
    });
  };

  const calcBachPrice = (qty, unitPrice) => {
    return qty * unitPrice;
  };

  useEffect(() => {
    setTotalPrice(calculatePrice());
    //eslint-disable-next-line
  }, [shoppingCartItems]);

  return (
    <div
      className="shoppingcart-drawer"
      style={{
        padding: "1rem",
        height: "100%",
        width: "calc(100% - 2rem)", // minus padding and margin of children
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Items Quantity: {shoppingCartItems.length} </h2>
      <h3>
        Item List: <hr />
      </h3>
      <List style={{ flex: 1 }}>
        {shoppingCartItems.map((each) => (
          <ListItem key={each._id}>
            <Avatar
              alt={each.name}
              src={each.img}
              style={{ marginRight: ".8rem" }}
            />
            <ListItemText primary={each.name} secondary={`x${each.qty}`} />
            <Typography>${calcBachPrice(each.qty, each.price)}</Typography>
          </ListItem>
        ))}
      </List>

      <div
        className="checkout-bottom"
        style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
      >
        <h4 style={{ margin: "0 1rem 0" }}>Total Price: ${totalPrice}</h4>
        <Button
          onClick={() => setShoppingCartItems([])}
          variant="contained"
          color="secondary"
          size="small"
          style={{ margin: "0 1rem 0" }}
        >
          Clear Cart
        </Button>
        <CardPayment actionName="Buy Now" />
      </div>
    </div>
  );
}
