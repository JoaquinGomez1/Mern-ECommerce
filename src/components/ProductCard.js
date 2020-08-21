import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import BuyButton from "./BuyButton";
import { myShoppingCartContext } from "../context/ShoppingCartContext";

const useStyles = makeStyles({
  root: {
    minWidth: 310,
  },
  media: {
    height: 180,
  },
});

export default function ProductCard(props) {
  const classes = useStyles();

  const { title, subtitle, image, id, buyer, qty } = props;
  const { shoppingCartItems, setShoppingCartItems } = useContext(
    myShoppingCartContext
  );

  // Add one element
  const addItem = () => {
    // eslint-disable-next-line
    const thisItem = shoppingCartItems.find((item) => {
      if (item.id === id) return item;
    });
    const itemIndex = shoppingCartItems.indexOf(thisItem);
    let shoppingCartCopy = [...shoppingCartItems];

    shoppingCartCopy[itemIndex] = {
      ...shoppingCartCopy[itemIndex],
      qty: shoppingCartCopy[itemIndex].qty + 1,
    };

    setShoppingCartItems(shoppingCartCopy);
  };

  // Remove one element from any given item
  const removeItem = () => {
    // eslint-disable-next-line
    const thisItem = shoppingCartItems.find(function (item) {
      if (item.id === id) return item;
    });

    const itemIndex = shoppingCartItems.indexOf(thisItem);
    let shoppingCartCopy = [...shoppingCartItems];

    // Should be thisItem.qty (withouth substracting 1) TODO: // Fix this issue later
    if (thisItem.qty - 1 < 1) {
      const filteredCart = shoppingCartItems.filter((each) => each.id !== id);
      setShoppingCartItems(filteredCart);
    } else {
      shoppingCartCopy[itemIndex] = {
        ...shoppingCartCopy[itemIndex],
        qty: shoppingCartCopy[itemIndex].qty - 1,
      };
      setShoppingCartItems(shoppingCartCopy);
    }
  };

  const CheckForShoppingCart = () => {
    if (buyer) {
      return (
        <CardActions>
          <Grid container justify="center">
            <Typography variant="h4">Quantity: {qty}</Typography>
            <Grid container justify="center">
              <Button
                style={{ margin: "10px" }}
                variant="contained"
                onClick={removeItem}
              >
                -
              </Button>
              <Button
                style={{ margin: "10px" }}
                color="secondary"
                variant="contained"
                onClick={addItem}
              >
                +
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      );
    } else {
      return (
        <CardActions>
          <BuyButton id={id} name={title} price={subtitle} image={image} />
        </CardActions>
      );
    }
  };

  return (
    <Card
      className={"productCard transition"}
      style={{ minWidth: 310, margin: "10px" }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>

      {CheckForShoppingCart()}
    </Card>
  );
}
