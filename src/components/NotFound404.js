import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function NotFound404() {
  const history = useHistory();

  return (
    <Grid container direction="column" className="componentTransition">
      <Typography style={{ marginTop: "120px", color: "red" }} variant="h2">
        404 Page not found
      </Typography>
      <Grid item style={{ marginTop: "50px" }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => history.push("/")}
        >
          Back To home page
        </Button>
      </Grid>
    </Grid>
  );
}
