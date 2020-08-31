import React, { useState, useLayoutEffect } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import BuyButton from "./BuyButton";
import { useHistory } from "react-router-dom";
import useShoppingCart from "../hooks/useShoppingCart";

export default function ProductCard(props) {
  const history = useHistory();
  const { title, subtitle, image, id, inShoppingCart, qty, isInStock } = props;
  const { addItem, removeOneItem, removeItem, addToFav } = useShoppingCart(id);
  const [compName, setCompName] = useState("transition");

  const redirectTo = (url) => {
    history.push(url);
  };

  const CheckForShoppingCart = () => {
    if (inShoppingCart) {
      return (
        <CardActions style={{ padding: "20px 5px", marginTop: "10px" }}>
          <Grid container justify="center">
            <Typography variant="h5">Quantity: {qty}</Typography>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <Button onClick={removeItem}>
                <DeleteIcon></DeleteIcon>
              </Button>
              <Grid item style={{ display: "flex" }}>
                <Button
                  style={{ margin: "0px 10px" }}
                  onClick={removeOneItem}
                  size="large"
                >
                  <RemoveCircleIcon />
                </Button>
                <Button color="secondary" size="large" onClick={addItem}>
                  <AddCircleIcon />
                </Button>
              </Grid>

              <Grid item style={{ margin: "0 5px" }}>
                <Button>
                  <FavoriteBorderIcon onClick={addToFav} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      );
    } else {
      return (
        <CardActions>
          <BuyButton
            isInStock={isInStock}
            id={id}
            name={title}
            price={subtitle}
            image={image}
            qty={qty}
          />
        </CardActions>
      );
    }
  };

  useLayoutEffect(() => {
    return setCompName("");
  }, []);

  return (
    <Card className={`transition`} style={{ width: 310, margin: "10px" }}>
      <CardActionArea
        onClick={() => {
          redirectTo(`/products/${id}`);
        }}
      >
        <CardMedia style={{ height: 180 }} image={image} title={title} />
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
