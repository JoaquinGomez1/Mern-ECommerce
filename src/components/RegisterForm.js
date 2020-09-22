import React from "react";
import {
  Container,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import countries from "../static/contries.json";

export default function RegisterForm({
  handleChange,
  handleSubmit,
  errorMessage,
}) {
  return (
    <Container className="componentTransition" style={{ minHeigth: "100vh" }}>
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
                return <MenuItem value={country.name}>{country.name}</MenuItem>;
              })}
            </Select>
            <TextField label="Address" name="address" onChange={handleChange} />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
            />
            {errorMessage && (
              <Typography
                className="errorMessage"
                variant="h5"
                style={{ marginTop: "20px", color: "#ed0c5b" }}
              >
                {errorMessage}
              </Typography>
            )}

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
  );
}
