import React, { useContext } from "react";
import { Container, Grid, TextField, Typography } from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { makeStyles } from "@material-ui/core/styles";

import { myUserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  header: {},
  headerIcon: {
    padding: theme.spacing(4),
  },
}));

export default function UserInformation() {
  const classes = useStyles();
  const { currentUser } = useContext(myUserContext);

  return (
    <Container className="componentTransition">
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item className={classes.headerIcon}>
              <PermIdentityIcon
                color="secondary"
                style={{ fontSize: "30px" }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6"> Account's Information</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant="filled"
            disabled
            label={"Username"}
            value={currentUser?.username}
          ></TextField>
          <TextField
            variant="filled"
            disabled
            label="Address"
            value={currentUser?.address}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="filled"
            disabled
            label="Email"
            value={currentUser?.email}
          ></TextField>
          <TextField
            variant="filled"
            disabled
            label="Gender"
            value={currentUser?.gender}
          ></TextField>
        </Grid>
      </Grid>
    </Container>
  );
}
