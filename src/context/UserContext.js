import React, { useState } from "react";

export const myUserContext = React.createContext();

export default function UserContext(props) {
  const [currentUser, setCurrentUser] = useState({
    id: "qwe1",
    name: "Juan Perez",
    address: "8th street and lincoln apt 4b",
    country: "United states of america",
    email: "qqwqe@ggg.cw",
    isLoggedIn: true,
  });
  return (
    <myUserContext.Provider
      value={{ currentUser, setCurrentUser }}
      {...props}
    />
  );
}
