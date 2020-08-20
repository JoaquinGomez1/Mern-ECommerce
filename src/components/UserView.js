import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Container, Grid, Button } from "@material-ui/core";
import { myUserContext } from "../context/UserContext";

export default function UserView() {
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const history = useHistory();

  const handleLogout = () => {
    setCurrentUser({});
  };

  return (
    <>
      {/* Check if the user is logged in*/}
      {!currentUser.isLoggedIn ? (
        history.push("/login")
      ) : (
        <Container>
          <Grid container direction="column">
            <h1>Welcome, {currentUser.name}</h1>

            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
