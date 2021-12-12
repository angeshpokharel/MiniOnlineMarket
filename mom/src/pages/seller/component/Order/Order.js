import React from "react";
import { Link } from "react-router-dom";

import classes from "./Order.module.css"

const Order = (props) => {
  
  return (
    <tr key={props.id}>
      <td>{props.id}</td>
      <td>{props.paymentDate}</td>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>{props.shippingAddress}</td>
      <td>{props.points}</td>
      <td style = {{color: "red"}}>{props.status}</td>
      <td>
        <Link to={{ pathname: `/orders/${props.id}` }}>
          View Details
        </Link>
      </td>
    </tr>
  );
};

export default Order;