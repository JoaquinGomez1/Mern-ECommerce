import React, {
  useContext,
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

import NavbarView from "./NavbarView";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import { myUserContext } from "../context/UserContext";
import "../static/css/Navbar.css";

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const { shoppingCartItems } = useContext(myShoppingCartContext);
  const { currentUser, setCurrentUser } = useContext(myUserContext);
  const history = useHistory();

  const pRef = useRef();
  const modalRef = useRef();
  const menuIconRef = useRef();
  const liRef = useRef();

  const redirectTo = (route) => {
    history.push(route);
  };

  useLayoutEffect(() => {
    // Since navbar is the only consistent component throughout the entire website.
    // I'll use it to check if there is currently a user logged in and to set the current user into the context
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    if (parsedUser) {
      setCurrentUser(parsedUser);
    }
  }, [setCurrentUser]);

  useEffect(() => {
    // check if there is any items in the shopping cart and change its styling
    if (shoppingCartItems.length >= 1) {
      pRef.current.style.backgroundColor = "#ed0c5b";
      pRef.current.style.display = "block";
    } else pRef.current.style.display = "none";
  }, [shoppingCartItems]);

  useEffect(() => {
    if (modalOpen) modalRef.current.style.display = "grid";
    else modalRef.current.style.display = "none";
  }, [modalOpen]);

  const handleModal = (e) => {
    if (e.target === menuIconRef.current) setModalOpen(true);
    if (e.target === modalRef.current || e.target === liRef.current)
      setModalOpen(false);
  };

  return (
    <NavbarView
      handleModal={handleModal}
      redirectTo={redirectTo}
      currentUser={currentUser}
      modalRef={modalRef}
      pRef={pRef}
      shoppingCartItems={shoppingCartItems}
      menuIconRef={menuIconRef}
    ></NavbarView>
  );
}
