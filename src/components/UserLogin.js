import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { myUserContext } from "../context/UserContext";
import LoginForm from "./LoginForm";

export default function UserLogin() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const [wasError, setWasError] = useState();
  const reqHeaders = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };
  const url = process.env.REACT_APP_FETCH_LOCATION
    ? process.env.REACT_APP_FETCH_LOCATION + "/login"
    : "/login";

  const sendData = async (e) => {
    e.preventDefault();
    const req = await fetch(url, reqHeaders);
    const data = await req.json();

    if (req.status === 200) {
      setCurrentUser(data);
    } else {
      setWasError(data.message);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <>
      {currentUser ? (
        history.push("/user")
      ) : (
        <LoginForm
          wasError={wasError}
          handleChange={handleChange}
          sendData={sendData}
        />
      )}
    </>
  );
}
