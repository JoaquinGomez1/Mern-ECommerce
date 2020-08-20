import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { Container, Grid, Button, TextField } from "@material-ui/core";
import { myUserContext } from "../context/UserContext";

export default function UserLogin() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(myUserContext);

  const sendData = async (e) => {
    // Prevent Default Behaviour
    e.preventDefault();

    // Send post request to the server
    const req = await fetch("http://localhost:3100/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await req.json();

    setCurrentUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    console.log(data);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <>
      {currentUser.isLoggedIn ? (
        history.push("/user")
      ) : (
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
                  style={{ width: "40%" }}
                  type="password"
                  name="password"
                />

                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: "40px" }}
                  type="submit"
                >
                  {" "}
                  Log In
                </Button>
              </Grid>
            </form>
          </Grid>
        </Container>
      )}
    </>
  );
}
