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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  const sendData = async (e) => {
    e.preventDefault();
    const req = await fetch("http://192.168.0.8:3100/login", reqHeaders);
    const data = await req.json();

    if (req.status < 300) {
      setCurrentUser(data);
      localStorage.setItem("user", JSON.stringify(data));
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
        ></LoginForm>
      )}
    </>
  );
}
