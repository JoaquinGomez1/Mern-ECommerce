import React, { useState, useContext } from "react";
import { Button, Box, Typography, Snackbar } from "@material-ui/core";
import useShoppingCart from "../hooks/useShoppingCart";
import { useTheme } from "@material-ui/core/styles";
import { myUserContext } from "../context/UserContext";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import ErrorIcon from "@material-ui/icons/Error";
import ClearIcon from "@material-ui/icons/Clear";

export default function FavoriteButton({ _id }) {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const secondaryMainColor = theme.palette.secondary.main;
  const { currentUser } = useContext(myUserContext);
  const [showAlert, setShowAlert] = useState(false);
  const { addToFav, isInFavorites, removeFromFav } = useShoppingCart(_id);

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
    <>
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
            addToFav(_id);
          }}
        >
          <FavoriteBorderIcon />
        </Button>
      )}

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
    </>
  );
}
