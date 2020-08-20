import React from "react";

import {
  Container,
  Grid,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import countries from "../static/contries.json";

export default function UserRegister() {
  return (
    <>
      <Container className="componentTransition">
        <form id="UserRegister">
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ height: "calc(100vh - 80px)" }}
          >
            <TextField label="Username" />
            <TextField label="Password" type="password" />
            <TextField label="Email" type="email" />

            {/*TODO: Optimize mapping speed */}
            <InputLabel id="country-select">Country</InputLabel>
            <Select labelId="country-select">
              {countries.map((country) => {
                return <MenuItem value={country.name}>{country.name}</MenuItem>;
              })}
            </Select>
            <TextField label="Address" />
            <TextField label="Phone Number" />
            <Button
              color="secondary"
              variant="contained"
              style={{ marginTop: "50px" }}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
}
