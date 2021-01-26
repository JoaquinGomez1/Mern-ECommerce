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
import HistoryIcon from "@material-ui/icons/History";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import AdminPanel from "./AdminPanel";
import ViewFavorites from "./ViewFavorites";
import UserInformation from "./UserInformation";
import ShoppingHistory from "./ShoppingHistory";
import ViewOrders from "./ViewOrders";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    },
  },
  list: {
    margin: theme.spacing(4),
    userSelect: "none",

    "& > *:hover": {
      backgroundColor: "#eaeaea",
      cursor: "pointer",
      transition: "all .2s ease",
    },
    "& > *:hover > .MuiListItemIcon-root": {
      color: theme.palette.secondary.main,
    },
  },
  mainView: {
    padding: theme.spacing(2),
    width: "100%",
  },
  active: {
    "& > .MuiListItemIcon-root": { color: theme.palette.secondary.main },
    borderRight: `solid 3px ${theme.palette.secondary.main}`,
    boxShadow: "4px 4px 4px rgba(0,0,0,.2)",
    backgroundColor: "#f0f0f0",
  },
}));

export default function UserView() {
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const classes = useStyles();

  const handleLogout = () => {
    setCurrentUser(); // ---> Sets current user to undefined
    fetch("/logout");
  };
  const [views, setViews] = useState([
    {
      name: "Account Info",
      Icon: PermIdentityIcon,
      mustBeAdmin: false,
      View: UserInformation,
      active: true,
    },
    {
      name: "Admin Panel",
      Icon: SupervisorAccountIcon,
      mustBeAdmin: true,
      View: AdminPanel,
      active: false,
    },
    {
      name: "Orders",
      Icon: LocalShippingIcon,
      mustBeAdmin: true,
      View: ViewOrders,
      active: false,
    },
    {
      name: "Favorites",
      Icon: FavoriteIcon,
      mustBeAdmin: false,
      View: ViewFavorites,
      active: false,
    },
    {
      name: "Shopping history",
      Icon: HistoryIcon,
      mustBeAdmin: false,
      View: ShoppingHistory,
      active: false,
    },
  ]);

  // Set state MUST be a function returning an object for React to consider it a component
  const [CurrentView, setCurrentView] = useState(() => views[0].View);

  const handleActiveChange = (index, view) => {
    setCurrentView(() => view);
    const viewsCopy = [...views];
    viewsCopy.forEach((object) => {
      object.active = false;
    });
    viewsCopy[index].active = true;
    setViews(viewsCopy);
  };

  return (
    <>
      <Container className="componentTransition">
        <List>
          <Grid container>
            <Grid item md={4} sm={12} alignContent="flex-start">
              <List className={classes.list}>
                <Paper elevation={2} className={classes.root}>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <Typography variant="p">
                      Hello{" "}
                      <Typography variant="h6">
                        {currentUser.username}
                      </Typography>
                    </Typography>
                  </ListItem>
                </Paper>
                {views.map(
                  ({ name, Icon, mustBeAdmin, View, active }, index) => {
                    if (currentUser.role !== "admin" && mustBeAdmin)
                      return null;
                    else
                      return (
                        <ListItem
                          className={active && classes.active}
                          onClick={() => handleActiveChange(index, View)}
                        >
                          <ListItemIcon>
                            <Icon />
                          </ListItemIcon>
                          <Typography variant="p">{name}</Typography>
                        </ListItem>
                      );
                  }
                )}

                <ListItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <Typography variant="p">Log out</Typography>
                </ListItem>
              </List>
            </Grid>

            <Grid item md={8} ms={12}>
              <Paper style={{ width: "100%" }} className={classes.mainView}>
                <CurrentView />
              </Paper>
            </Grid>
          </Grid>
        </List>
      </Container>
    </>
  );
}
