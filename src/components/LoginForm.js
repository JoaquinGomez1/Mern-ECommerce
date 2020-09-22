import React from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";

export default function LoginForm({ wasError, sendData, handleChange }) {
  return (
    <Container className="componentTransition">
      <Grid
        container
        direction="column"
        justify="center"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <h1>Log in</h1>
        <form onSubmit={sendData} onChange={handleChange}>
          <Grid container direction="column" alignItems="center">
            <TextField
              id="login-username"
              label="Username"
              style={{ width: "40%", marginBottom: "20px" }}
              name="username"
            />
            <TextField
              id="login-password"
              label="Password"
              style={{ width: "40%", padding: "1rem 0 " }}
              type="password"
              name="password"
            />
            {wasError && (
              <Typography
                className="errorMessage"
                variant="h5"
                style={{ color: "#f02b66" }}
              >
                {wasError}
              </Typography>
            )}
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "40px" }}
              type="submit"
            >
              Log In
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}
