import React from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import "../static/css/RegisterForm.css";

export default function LoginForm({ wasError, sendData, handleChange }) {
  return (
    <Container className='componentTransition'>
      <Grid
        container
        direction='column'
        justify='center'
        style={{ height: "calc(100vh - 80px)" }}>
        <h1>Log in</h1>
        <form
          className='flex d-column credentials-form-wrapper'
          onSubmit={sendData}
          onChange={handleChange}>
          <div className='flex d-column credentials-form-container'>
            <TextField id='login-username' label='Username' name='username' />
            <TextField
              id='login-password'
              label='Password'
              type='password'
              name='password'
            />
            {wasError && (
              <Typography
                className='errorMessage'
                variant='h5'
                style={{ color: "#f02b66" }}>
                {wasError}
              </Typography>
            )}

            <Button
              variant='contained'
              color='secondary'
              style={{ marginTop: "40px" }}
              type='submit'>
              Log In
            </Button>
          </div>
        </form>
      </Grid>
    </Container>
  );
}
