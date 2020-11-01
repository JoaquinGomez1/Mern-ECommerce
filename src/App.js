import React from "react";
import "./App.css";
import "./transition.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import ShoppingCart from "./components/ShoppingCart";
import ProductReview from "./components/ProductReview";
import ProductsListing from "./components/ProductsListing";
import NotFound404 from "./components/NotFound404";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import CategoriesPage from "./components/CategoriesPage";

// Context
import MainProductsContext from "./context/MainProductsContext";
import SlideshowContext from "./context/SlideshowContext";
import ShoppingCartContext from "./context/ShoppingCartContext";
import UserContext from "./context/UserContext";
import UserView from "./components/UserView";
import ViewFavorites from "./components/ViewFavorites";

function App() {
  return (
    <MainProductsContext>
      <SlideshowContext>
        <ShoppingCartContext>
          <UserContext>
            <div className='App'>
              <Router>
                <Navbar />
                <Switch>
                  <Route path='/' exact component={Landing} />
                  <Route path='/shoppingcart' exact component={ShoppingCart} />
                  <Route path='/products' exact component={ProductsListing} />
                  <Route path='/products/:id' component={ProductReview} />
                  <Route path='/login' component={UserLogin} />
                  <Route path='/register' component={UserRegister} />
                  <Route path='/user' exact component={UserView} />
                  <Route path='/user/favorites' component={ViewFavorites} />
                  <Route path='/categories' component={CategoriesPage} />
                  <Route path='*' component={NotFound404} />
                </Switch>
              </Router>
            </div>
          </UserContext>
        </ShoppingCartContext>
      </SlideshowContext>
    </MainProductsContext>
  );
}

export default App;
