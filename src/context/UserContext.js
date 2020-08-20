import React, { useState } from "react";

export const myUserContext = React.createContext();

export default function UserContext(props) {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <myUserContext.Provider
      value={{ currentUser, setCurrentUser }}
      {...props}
    />
  );
}
