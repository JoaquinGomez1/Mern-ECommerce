import React, { useState, useContext } from "react";
import {
  Modal,
  Button,
  TextField,
  Snackbar,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { myUserContext } from "../context/UserContext";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import FormatedTodayDate from "../static/functions/FormatedTodayDate";

import ErrorIcon from "@material-ui/icons/Error";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import Alert from "./Alert";

export default function CardPayment(props) {
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const { shoppingCartItems } = useContext(myShoppingCartContext);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [wasSuccess, setWasSuccess] = useState(false); // Determines which snackbar to show to the user
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState(
    currentUser?.address || ""
  );

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const addToShoppingHistory = async () => {
    if (currentUser) {
      const { shoppingHistory } = currentUser;
      const today = FormatedTodayDate();
      const shoppingDetails = {
        products: [...shoppingCartItems],
        date: today,
      };

      const shoppingHistoryCopy = Array.isArray(shoppingHistory)
        ? [...shoppingHistory]
        : [];
      shoppingHistoryCopy.push(shoppingDetails);

      setCurrentUser({
        ...currentUser,
        shoppingHistory: shoppingHistoryCopy,
      });

      const reqHeaders = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shoppingHistory: shoppingDetails }),
      };

      fetch("/user/historyy", reqHeaders);
    }
  };

  const processOrder = async () => {
    setIsLoading(true);
    const data = {
      clientName,
      products: shoppingCartItems,
      address: clientAddress,
    };
    const reqHeaders = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const url = "/orders/new";
    const req = await fetch(url, reqHeaders);
    const successfullResponse = req.status === 200;

    setShowSnackbar(true);
    addToShoppingHistory();
    setIsLoading(false);
    if (successfullResponse) {
      setWasSuccess(true);
      handleModalClose();
    } else setWasSuccess(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleModalOpen}>
        {props.actionName}
      </Button>
      <Modal open={open} onClose={handleModalClose}>
        <form
          className="transition"
          style={{
            margin: "4rem auto",
            backgroundColor: "#eee",
            display: "grid",
            width: "400px",
            padding: "15px",
            textAlign: "center",
            borderRadius: "5px",
          }}
          noValidate
          autoComplete="off"
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField id="creditCardId" label="Credit Card Number" />
            <TextField
              id="creditCardId"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              label="Credit card's name"
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField id="creditCardId" label="Expire Date" />
            <TextField id="creditCardId" label="CVC" />
          </div>
          <h3>
            This order will be delivered to:{" "}
            {currentUser ? (
              currentUser.address
            ) : (
              <TextField
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                label="Enter your address"
              />
            )}
          </h3>
          <p style={{ opacity: 0.4 }}>
            Note: This website will NOT save any data provided in any of this
            fields, this is a project for learning purposes only
          </p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={processOrder}
                >
                  Confirm
                </Button>
              </>
            )}
          </div>
        </form>
      </Modal>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
      >
        {wasSuccess ? (
          <Alert success={wasSuccess}>
            <CheckIcon />
            <Typography variant="p">Order registered succesfully !</Typography>
            <ClearIcon
              onClick={() => setShowSnackbar(false)}
              style={{ marginLeft: "20px", cursor: "pointer" }}
            />
          </Alert>
        ) : (
          <Alert success={wasSuccess}>
            <ErrorIcon />
            <Typography variant="p">Something failed</Typography>
            <ClearIcon
              onClick={() => setShowSnackbar(false)}
              style={{ marginLeft: "20px", cursor: "pointer" }}
            />
          </Alert>
        )}
      </Snackbar>
    </>
  );
}
