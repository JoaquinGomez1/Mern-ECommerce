import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";

import countries from "../static/contries.json";
import { myUserContext } from "../context/UserContext";

export default function UserRegister() {
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    const field = event.target.name;
    const content = event.target.value;
    setRegisterData({ ...registerData, [field]: content });
  };

  const handleSubmit = async () => {
    const req = await fetch("http://localhost:3100/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    const response = await req.json();

    if (req.status < 300) {
      setCurrentUser(response);
      localStorage.setItem("user", JSON.stringify(response));
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <>
      {currentUser.isLoggedIn ? (
        history.push("/user")
      ) : (
        <Container className="componentTransition">
          <form id="UserRegister">
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              style={{ height: "calc(100vh - 80px)" }}
            >
              <Grid container direction="column" style={{ width: "40%" }}>
                <TextField
                  label="Username"
                  name="username"
                  onChange={handleChange}
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                />

                {/*TODO: Optimize mapping speed */}
                <InputLabel id="country-select">Country</InputLabel>
                <Select
                  labelId="country-select"
                  defaultValue="-"
                  name="country"
                  onChange={handleChange}
                >
                  {countries.map((country) => {
                    return (
                      <MenuItem value={country.name}>{country.name}</MenuItem>
                    );
                  })}
                </Select>
                <TextField
                  label="Address"
                  name="address"
                  onChange={handleChange}
                />
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={handleChange}
                />
                {errorMessage ? (
                  <Typography
                    className="errorMessage"
                    variant="h5"
                    style={{ marginTop: "20px", color: "#ed0c5b" }}
                  >
                    {" "}
                    {errorMessage}
                  </Typography>
                ) : null}

                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ marginTop: "50px" }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </>
  );
}
