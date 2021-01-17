import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import useFetch from "../hooks/useFetch";
import Pagination from "./Pagination";
import "../static/css/ShoppingHistory.css";
import LoadingComponent from "./LoadingComponent";

export default function ShoppingHistory() {
  const url = "/user/history";
  const { data, isLoading, errorMessage } = useFetch(url);

  return (
    <div className="shoppingHistory-page">
      <Typography className="componentTransition" variant="h4">
        Shopping History
      </Typography>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Pagination>
          {!isLoading && data && data.map((each) => <DateCard data={each} />)}
        </Pagination>
      )}
      {errorMessage && <Typography variant="h4">{errorMessage}</Typography>}
    </div>
  );
}

const DateCard = ({ data }) => {
  const { products, date } = data;

  return (
    <div className="date-card-container full-width">
      <div>
        {products &&
          products.map(({ image, name, price, qty }) => (
            <div className="date-card-row">
              <Avatar className="date-card-avatar" src={image} alt={name} />
              <h4 className="date-card-text" variant="h6">
                {name}
              </h4>
              <h4 className="date-card-text" variant="h6">
                ${price}
              </h4>
              <h4 className="date-card-text" variant="h6">
                x{qty}
              </h4>
            </div>
          ))}
      </div>
      <Typography variant="h5" className="date-card-date">
        Bought on Date: {date}
      </Typography>
    </div>
  );
};
