import React from "react";
import {
  Container,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import "../static/css/RegisterForm.css";

export default function RegisterForm({
  handleChange,
  handleSubmit,
  errorMessage,
}) {
  const genders = ["Male", "Female", "Other"];
  return (
    <Container className="componentTransition">
      <form id="UserRegister">
        <div
          className="flex d-column credentials-form-wrapper"
          style={{ minHeight: "calc(100vh - 80px)" }}
        >
          <div className="flex d-column credentials-form-container">
            <h2 className="register-form-title">Sign up for free!</h2>
            <div className="flex d-column credentials-inputs">
              <TextField
                style={{ marginTop: "10px" }}
                label="Username"
                name="username"
                onChange={handleChange}
              />
              <TextField
                style={{ marginTop: "10px" }}
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
              />
              <TextField
                style={{ marginTop: "10px" }}
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
              />

              {/*TODO: Optimize mapping speed */}
              <InputLabel id="gender-select" style={{ marginTop: "10px" }}>
                Gender
              </InputLabel>
              <Select
                labelId="gender-select"
                defaultValue="-"
                name="gender"
                onChange={handleChange}
              >
                {genders.map((gender) => {
                  return (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                style={{ marginTop: "15px" }}
                label="Address"
                name="address"
                onChange={handleChange}
              />
              <TextField
                style={{ marginTop: "15px" }}
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
            </div>

            <Button
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
              style={{ marginTop: "50px" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}
