import React, { useContext, useState } from "react";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Paper,
} from "@material-ui/core";
import { myUserContext } from "../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";

import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import AdminPanel from "./AdminPanel";
import ViewFavorites from "./ViewFavorites";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    },
  },
  list: {
    margin: theme.spacing(4),

    "& > *:hover": {
      backgroundColor: "#e2e2e2",
      cursor: "pointer",
      transition: "all .2s ease",
      transform: "translateY(-2px)",
      boxShadow: "4px 4px 4px rgba(0,0,0,.2)",
    },
    "& > *:hover > .MuiListItemIcon-root": {
      color: theme.palette.secondary.main,
    },
  },
  mainView: {
    padding: theme.spacing(2),
  },
}));

export default function UserView() {
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const classes = useStyles();

  const handleLogout = () => {
    setCurrentUser(); // ---> Sets current user to undefined
    fetch("/logout");
  };
  const views = [
    {
      name: "Account Info",
      Icon: PermIdentityIcon,
      mustBeAdmin: false,
      View: undefined,
    },
    {
      name: "Admin Panel",
      Icon: SupervisorAccountIcon,
      mustBeAdmin: true,
      View: AdminPanel,
    },
    {
      name: "View Favorites",
      Icon: FavoriteIcon,
      mustBeAdmin: false,
      View: ViewFavorites,
    },
  ];

  // Set state MUST be a function returning an object for React to consider it a component
  const [CurrentView, setCurrentView] = useState(() => views[2].View);

  return (
    <>
      <Container className="componentTransition">
        <List>
          <Grid container>
            <List className={classes.list}>
              <Paper elevation={2} className={classes.root}>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <Typography variant="p">
                    Hello{" "}
                    <Typography variant="h6">{currentUser.username}</Typography>
                  </Typography>
                </ListItem>
              </Paper>
              {views.map(({ name, Icon, mustBeAdmin, View }) => {
                if (currentUser.role !== "admin" && mustBeAdmin) return null;
                else
                  return (
                    <ListItem onClick={() => setCurrentView(() => View)}>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <Typography variant="p">{name}</Typography>
                    </ListItem>
                  );
              })}

              <ListItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <Typography variant="p">Log out</Typography>
              </ListItem>
            </List>

            <Grid item xs={8}>
              <Paper className={classes.mainView}>
                <CurrentView />
              </Paper>
            </Grid>
          </Grid>
        </List>
      </Container>
    </>
  );
}
