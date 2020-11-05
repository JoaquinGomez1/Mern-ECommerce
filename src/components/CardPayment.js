import React, { useState, useContext } from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import { myUserContext } from "../context/UserContext";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import FormatedTodayDate from "../static/functions/FormatedTodayDate";

export default function CardPayment(props) {
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const { shoppingCartItems } = useContext(myShoppingCartContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
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

      const req = await fetch("/user/historyy", reqHeaders);
      const res = await req.json();
      console.log(res);

      const data = JSON.stringify({ ...currentUser, shoppingDetails });
      localStorage.setItem("user", data);
    }
    handleClose();
  };

  return (
    <>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        {props.actionName}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <form
          style={{
            margin: "0 auto",
            backgroundColor: "#eee",
            display: "grid",
            width: "350px",
            padding: "15px",
            textAlign: "center",
          }}
          noValidate
          autoComplete='off'>
          <div
            style={{
              display: "flex",
              maxWidth: "100%",
              justifyContent: "space-between",
            }}>
            <TextField id='creditCardId' label='Credit Card Number' />
            <TextField id='creditCardId' label='Full Name' />
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "100%",
              justifyContent: "space-between",
            }}>
            <TextField id='creditCardId' label='Expire Date' />
            <TextField id='creditCardId' label='CVC' />
          </div>
          <h3>
            This order will be delivered to:{" "}
            {currentUser ? (
              currentUser.address
            ) : (
              <TextField label='Enter your address' />
            )}
          </h3>
          <p style={{ opacity: 0.4 }}>
            Note: This website will NOT save any data provided in any of this
            fields, this is a dummy project for learning purposes only
          </p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant='contained' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={addToShoppingHistory}>
              Confirm
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
