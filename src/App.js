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
import UserView from "./components/UserView";
import ViewFavorites from "./components/ViewFavorites";
import AdminPanel from "./components/AdminPanel";
import EditProducts from "./components/EditProducts";

import LoadingPage from "./components/LoadingPage";

import { myUserContext } from "./context/UserContext";
import { MainProductsListContext } from "./context/MainProductsContext";

function App() {
  const { isLoading } = useContext(MainProductsListContext);
  return (
    <div className="App">
      {!isLoading ? (
        <Router>
          <Navbar />

          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/shoppingcart" exact component={ShoppingCart} />
            <Route
              path="/products"
              key="products"
              exact
              component={ProductsListing}
            />
            <Route path="/products/:id" component={ProductReview} />
            <Route path="/login" component={UserLogin} />
            <Route path="/register" component={UserRegister} />
            <ProtRoute path="/user" exact component={UserView} />
            <ProtRoute path="/user/favorites" component={ViewFavorites} />
            <Route
              path="/categories"
              key="categories"
              exact
              component={CategoriesPage}
            />

            <Route
              path="/categories/search"
              key="categories-search"
              component={CategoriesPage}
            />
            <ProtRoute path="/user/history" component={ShoppingHistory} />
            <ProtRoute path="/user/admin" exact component={AdminPanel} />
            <ProtRoute
              path="/user/admin/edit-products"
              component={EditProducts}
            />
            <Route path="*" component={NotFound404} />
          </Switch>
        </Router>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}

const ProtRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(myUserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default App;
