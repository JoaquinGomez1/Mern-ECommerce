import React, { useState, useEffect } from "react";

export const myUserContext = React.createContext();

export default function UserContext(props) {
  const [currentUser, setCurrentUser] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // At this point we are trying to determine if the user is already logged in the server or not
  // the data.email condition verifies that the response from the server is in fact a user and not a message
  useEffect(() => {
    if (!currentUser && !isLoading && data?.email) setCurrentUser(data);

    // eslint-disable-next-line
  }, [data, isLoading, setCurrentUser]);

  const fetchCurrentlyLoggedIn = async () => {
    const req = await fetch("/user");
    const res = await req.json();
    setData(res);
    setIsLoading(false);
  };

  // Fetch request must be in a separate useEffect.
  // otherwise the conditions to verify that the user is not logged in will never be true
  useEffect(() => {
    fetchCurrentlyLoggedIn();
  }, []);

  return (
    <myUserContext.Provider
      value={{ currentUser, setCurrentUser }}
      {...props}
    />
  );
}
