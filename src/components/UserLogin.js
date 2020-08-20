import React from "react";

import { Container, Grid, Button, TextField } from "@material-ui/core";

export default function UserLogin() {
  const sendData = () => {
    console.log("data sent");
  };

  return (
    <>
      <Container className="componentTransition">
        <Grid
          container
          direction="column"
          justify="center"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <h1>Log in</h1>
          <form onSubmit={sendData}>
            <Grid container direction="column" alignItems="center">
              <TextField
                id="login-username"
                label="Username"
                style={{ width: "40%", marginBottom: "20px" }}
              />
              <TextField
                id="login-password"
                label="Password"
                style={{ width: "40%" }}
              />

              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: "40px" }}
              >
                {" "}
                Log In
              </Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
}
