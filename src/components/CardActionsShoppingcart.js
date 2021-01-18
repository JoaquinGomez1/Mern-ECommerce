import React from "react";
import { Grid, Typography, Button, CardActions } from "@material-ui/core";
import useShoppingCart from "../hooks/useShoppingCart";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteButton from "./FavoriteButton";

// This component only contains the bottom part of the view for a ProductCard
// it is meant to be passed as prop to ProductCard for this to work
export default function CardActionsShoppingcart({ _id, qty }) {
  const { addItem, removeOneItem, removeItem } = useShoppingCart(_id);

  return (
    <CardActions>
      <Grid container justify="center">
        <Typography variant="h5">Quantity: {qty}</Typography>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Button onClick={removeItem}>
            <DeleteIcon />
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

            <Grid item style={{ margin: "0 5px" }}>
              <FavoriteButton _id={_id} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardActions>
  );
}
