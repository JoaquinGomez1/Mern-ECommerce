import React from "react";
import { Typography, Avatar, useTheme } from "@material-ui/core";
import useFetch from "../hooks/useFetch";
import Pagination from "./Pagination";
import "../static/css/ShoppingHistory.css";
import LoadingComponent from "./LoadingComponent";

export default function ShoppingHistory() {
  const url = "/user/history";
  const { data, isLoading, errorMessage } = useFetch(url);
  const theme = useTheme();
  const secondaryMainColor = theme.palette.secondary.main;

  return (
    <div className="shoppingHistory-page">
      <Typography className="componentTransition" variant="h2">
        Shopping History
      </Typography>
      {isLoading ? (
        <LoadingComponent />
      ) : data.length > 0 ? (
        <Pagination>
          {!isLoading && data && data.map((each) => <DateCard data={each} />)}
        </Pagination>
      ) : (
        <Typography
          variant="h4"
          style={{ color: secondaryMainColor, margin: "30px 0" }}
        >
          You have not bougth anything yet
        </Typography>
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
          products.map(({ img, image, name, price, qty }) => (
            <div className="date-card-row">
              <Avatar
                className="date-card-avatar"
                src={img || image}
                alt={name}
              />
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
      <Typography variant="p" className="date-card-date">
        Bought on Date: {date}
      </Typography>
    </div>
  );
};
