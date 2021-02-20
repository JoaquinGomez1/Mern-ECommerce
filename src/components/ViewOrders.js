import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import useFetch from "../hooks/useFetch";
import Chip from "@material-ui/core/Chip";
import green from "@material-ui/core/colors/green";
import LoadingComponent from "./LoadingComponent";
import { HEADERS_GET } from "../headers";

const url = process.env.REACT_APP_FETCH_LOCATION
  ? process.env.REACT_APP_FETCH_LOCATION + "/orders"
  : "/orders";

export default function ViewOrders() {
  const { data, isLoading } = useFetch(url, HEADERS_GET);

  return (
    <div className="componentTransition shoppingHistory-page">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Typography variant="h4" style={{ margin: "20px 0" }}>
            View orders
          </Typography>
          <table>
            <tr>
              <th>Order Id #</th>
              <th>Date of Order</th>
              <th>Client's Name</th>
              <th>Client's Address</th>
              <th>Total</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
            {data?.results?.map((order) => (
              <OrderView order={order} />
            ))}
          </table>
        </>
      )}
    </div>
  );
}

const OrderView = ({ order }) => {
  const [completed] = useState(order.completed);

  return (
    <tr>
      <td>{order._id}</td>
      <td>{order.date}</td>
      <td>{order.clientName}</td>
      <td>{order.address}</td>
      <td>$ {order.total || 0}</td>
      <td>
        <Chip
          label={completed ? "Completed" : "Not Completed"}
          color={completed ? green : "secondary"}
        >
          {" "}
        </Chip>
      </td>
      <div className="flex"></div>
    </tr>
  );
};
