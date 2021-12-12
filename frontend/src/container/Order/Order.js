import React from "react";
import { Link } from "react-router-dom";
import classes from "./Order.module.css"

const Order = (props) => {
  console.log(props);
  return (
    <tr key={props.id}>
      <th>{props.id}</th>
      <th>{props.date}</th>
      <th>{props.customer}</th>
      <th>{props.email}</th>
      <th>{props.sum}</th>
      <th>{props.status}</th>
      <th>
        <Link to={{ pathname: `/orders/${props.id}` }}>
          Show more
        </Link>
      </th>
    </tr>
  );
};

export default Order;