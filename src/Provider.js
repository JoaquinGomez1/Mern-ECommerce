import React from "react";
import MainProductsContext from "./context/MainProductsContext";
import SlideshowContext from "./context/SlideshowContext";
import ShoppingCartContext from "./context/ShoppingCartContext";
import UserContext from "./context/UserContext";

import App from "./App";

export default function Provider() {
  return (
    <React.Fragment>
      <MainProductsContext>
        <SlideshowContext>
          <ShoppingCartContext>
            <UserContext>
              <App />
            </UserContext>
          </ShoppingCartContext>
        </SlideshowContext>
      </MainProductsContext>
    </React.Fragment>
  );
}
