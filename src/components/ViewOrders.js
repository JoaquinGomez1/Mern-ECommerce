import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import useFetch from "../hooks/useFetch";
import Chip from "@material-ui/core/Chip";
import green from "@material-ui/core/colors/green";

export default function ViewOrders() {
  const url = "/orders";
  const { data } = useFetch(url);

  return (
    <div className="componentTransition">
      <Typography variant="h4">View orders</Typography>
      <table>
        <tr>
          <th>Order Id #</th>
          <th>Date of Order</th>
          <th>Client's Name</th>
          <th>Total</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
        {data?.results?.map((order) => (
          <OrderView order={order} />
        ))}
      </table>
    </div>
  );
}

const OrderView = ({ order }) => {
  const [completed, setCompleted] = useState(order.completed);

  return (
    <tr>
      <td>{order._id}</td>
      <td>{order.date}</td>
      <td>{order.clientName}</td>
      <td>{order.total}</td>
      <td>
        <Chip
          label={completed ? "Completed" : "Not Completed"}
          color={completed ? green : "secondary"}
        >
          {" "}
        </Chip>
      </td>
    </tr>
  );
};
