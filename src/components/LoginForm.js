import React from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import "../static/css/RegisterForm.css";
import { Link } from "react-router-dom";

export default function LoginForm({ wasError, sendData, handleChange }) {
  return (
    <Container className="componentTransition">
      <Grid
        container
        direction="column"
        justify="center"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <form
          className="flex d-column credentials-form-wrapper"
          onSubmit={sendData}
          onChange={handleChange}
        >
          <div className="flex d-column credentials-form-container">
            <h1>Log in</h1>
            <TextField id="login-username" label="Username" name="username" />
            <TextField
              id="login-password"
              label="Password"
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
            <Typography style={{ marginTop: "20px" }} variant="p">
              Need an account?{" "}
              <Link to="register" style={{ color: "red" }}>
                {" "}
                Create one!{" "}
              </Link>
            </Typography>
          </div>
        </form>
      </Grid>
    </Container>
  );
}
