import React, { useContext, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  CardActions,
  Snackbar,
  Box,
} from "@material-ui/core";
import useShoppingCart from "../hooks/useShoppingCart";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";

import { useTheme } from "@material-ui/core/styles";
import { myUserContext } from "../context/UserContext";

// This component only contains the bottom part of the view for a ProductCard
// it is meant to be passed as prop to ProductCard for this to work
export default function CardActionsShoppingcart({ _id, qty }) {
  const {
    addItem,
    removeOneItem,
    removeItem,
    addToFav,
    isInFavorites,
    removeFromFav,
  } = useShoppingCart(_id);
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const secondaryMainColor = theme.palette.secondary.main;
  const { currentUser } = useContext(myUserContext);
  const [showAlert, setShowAlert] = useState(false);

  const boxStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 30px",
    borderRadius: "5px",
    boxShadow: "4px 6px 4px rgba(0,0,0,.2)",
    backgroundColor: secondaryMainColor,
    color: "#fff",
  };

  const handleLogedIn = () => {
    if (!currentUser) setShowAlert(true);
    else setShowAlert(false);
  };

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
          </Grid>

          <Grid item style={{ margin: "0 5px" }}>
            {isInFavorites() ? (
              <Button onClick={removeFromFav}>
                <FavoriteIcon
                  onClick={removeFromFav}
                  style={{ color: primaryMainColor }}
                />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleLogedIn();
                  addToFav();
                }}
              >
                <FavoriteBorderIcon />
              </Button>
            )}
          </Grid>
        </Grid>
        <Snackbar
          open={showAlert}
          autoHideDuration={5000}
          onClose={() => setShowAlert(false)}
        >
          <Box style={boxStyle}>
            <ErrorIcon />
            <Typography variant="p">
              You must be logged in to perform this action
            </Typography>
            <ClearIcon
              onClick={() => setShowAlert(false)}
              style={{ marginLeft: "20px", cursor: "pointer" }}
            />
          </Box>
        </Snackbar>
      </Grid>
    </CardActions>
  );
}
