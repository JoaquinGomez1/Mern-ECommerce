import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { myUserContext } from "../context/UserContext";

export default function UserView() {
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const history = useHistory();

  const handleLogout = () => {
    setCurrentUser(); // ---> Sets current user to undefined
    fetch("/logout");
    localStorage.removeItem("user");
  };

  return (
    <>
      {/* Check if the user is logged in*/}
      {!currentUser ? (
        history.push("/")
      ) : (
        <Container className='componentTransition'>
          <Grid container direction='column'>
            <h2>Welcome, {currentUser.username}</h2>

            <Grid item>
              <Button
                variant='contained'
                color='primary'
                style={{ marginBottom: "50px" }}
                onClick={() => {
                  history.push("/user/favorites");
                }}>
                View Favorites
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                style={{ marginBottom: "50px" }}
                onClick={() => {
                  history.push("/user/history");
                }}>
                View Shopping History
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleLogout}>
                Log Out
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
