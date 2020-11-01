import React from "react";

import {
  Grid,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
} from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import BuyButton from "./BuyButton";
import useShoppingCart from "../hooks/useShoppingCart";

export default function ProductCard(props) {
  const { title, subtitle, image, _id, inShoppingCart, qty, isInStock } = props;
  const { addItem, removeOneItem, removeItem, addToFav } = useShoppingCart(_id);

  const CheckForShoppingCart = () => {
    if (inShoppingCart) {
      return (
        <CardActions style={{ padding: "20px 5px", marginTop: "10px" }}>
          <Grid container justify='center'>
            <Typography variant='h5'>Quantity: {qty}</Typography>
            <Grid
              container
              direction='row'
              alignItems='center'
              justify='space-between'>
              <Button onClick={removeItem}>
                <DeleteIcon></DeleteIcon>
              </Button>
              <Grid item style={{ display: "flex" }}>
                <Button
                  style={{ margin: "0px 10px" }}
                  onClick={removeOneItem}
                  size='large'>
                  <RemoveCircleIcon />
                </Button>
                <Button color='secondary' size='large' onClick={addItem}>
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
            _id={_id}
            name={title}
            price={subtitle}
            image={image}
            qty={qty}
          />
        </CardActions>
      );
    }
  };

  return (
    <Card className='transition' style={{ width: 310, margin: "10px" }}>
      <CardActionArea onClick={props.onCardAreaClick}>
        <CardMedia style={{ height: 180 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {subtitle ? `$${subtitle}` : null}
          </Typography>
        </CardContent>
      </CardActionArea>

      {CheckForShoppingCart()}
    </Card>
  );
}
