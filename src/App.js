import React from "react";
import "./App.css";
import "./transition.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import ShoppingCart from "./components/ShoppingCart";
import ProductReview from "./components/ProductReview";

// Context
import MainProductsContext from "./context/MainProductsContext";
import SlideshowContext from "./context/SlideshowContext";
import ShoppingCartContext from "./context/ShoppingCartContext";
import ProductsListing from "./components/ProductsListing";
import NotFound404 from "./components/NotFound404";

function App() {
  return (
    <MainProductsContext>
      <SlideshowContext>
        <ShoppingCartContext>
          <div className="App">
            <Router>
              <Navbar />

              <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/shoppingcart" exact component={ShoppingCart} />
                <Route path="/products" exact component={ProductsListing} />
                <Route path="/products/:id" component={ProductReview} />
                <Route path="*" component={NotFound404} />
              </Switch>
            </Router>
          </div>
        </ShoppingCartContext>
      </SlideshowContext>
    </MainProductsContext>
  );
}

export default App;
