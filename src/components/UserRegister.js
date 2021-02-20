import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { myUserContext } from "../context/UserContext";
import RegisterForm from "./RegisterForm";
import { HEADERS_POST } from "../headers";

const url = process.env.REACT_APP_FETCH_LOCATION
  ? process.env.REACT_APP_FETCH_LOCATION + "/register"
  : "/register";

export default function UserRegister() {
  // Container - view Pattern --- Container component
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const [errorMessage, setErrorMessage] = useState();
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
    gender: "",
    address: "",
    phoneNumber: "",
  });
  const history = useHistory();
  const reqHeaders = HEADERS_POST;
  reqHeaders.body = JSON.stringify(registerData);

  const handleChange = (event) => {
    const field = event.target.name;
    const content = event.target.value;
    setRegisterData({ ...registerData, [field]: content });
  };

  const handleSubmit = async () => {
    const req = await fetch(url, reqHeaders);
    const response = await req.json();

    if (req.status < 300) {
      setCurrentUser(response);
      localStorage.setItem("user", JSON.stringify(response));
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <>
      {currentUser ? (
        history.push("/user")
      ) : (
        <RegisterForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errorMessage={errorMessage}
        ></RegisterForm>
      )}
    </>
  );
}
