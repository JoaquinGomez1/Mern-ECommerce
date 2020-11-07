import React, { useContext } from "react";
import "./App.css";
import "./transition.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

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
import ShoppingHistory from "./components/ShoppingHistory";

// Context
import MainProductsContext from "./context/MainProductsContext";
import SlideshowContext from "./context/SlideshowContext";
import ShoppingCartContext from "./context/ShoppingCartContext";
import UserContext from "./context/UserContext";
import UserView from "./components/UserView";
import ViewFavorites from "./components/ViewFavorites";
import AdminPanel from "./components/AdminPanel";

import { myUserContext } from "./context/UserContext";

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
                  <Route
                    path='/products'
                    key='products'
                    exact
                    component={ProductsListing}
                  />
                  <Route path='/products/:id' component={ProductReview} />
                  <Route path='/login' component={UserLogin} />
                  <Route path='/register' component={UserRegister} />
                  <ProtRoute path='/user' exact component={UserView} />
                  <ProtRoute path='/user/favorites' component={ViewFavorites} />
                  <Route
                    path='/categories'
                    exact
                    key='categories'
                    component={CategoriesPage}
                  />
                  <Route
                    path='/categories/search'
                    key='catSearch'
                    component={CategoriesPage}
                  />
                  <ProtRoute path='/user/history' component={ShoppingHistory} />
                  <ProtRoute path='/user/admin' component={AdminPanel} />
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

const ProtRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(myUserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to='/' />;
      }}
    />
  );
};

export default App;
