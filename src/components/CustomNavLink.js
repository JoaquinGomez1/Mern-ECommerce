import React from "react";
import { NavLink } from "react-router-dom";

export default function CustomNavLink({ route, text, exact, onClick }) {
  return (
    <NavLink activeClassName='activeLink' exact={exact} to={route}>
      <li onClick={onClick}>{text}</li>
    </NavLink>
  );
  
}
