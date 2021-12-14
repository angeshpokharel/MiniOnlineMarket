import { TableRow, TableCell } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Order = (props) => {
  console.log(props.id);
  return (
    <TableRow key={props.id}>
      <TableCell>{props.id}</TableCell>
      <TableCell>{props.paymentDate}</TableCell>
      <TableCell>{props.user.name}</TableCell>
      <TableCell>{props.user.email}</TableCell>
      <TableCell>{props.shippingAddress}</TableCell>
      <TableCell>{props.points}</TableCell>
      <TableCell style = {{color: "red"}}>{props.status}</TableCell>
      <TableCell>
        <Link to={{ pathname: `/seller/dashboard/orders/${props.id}` }}>
          View Details
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default Order;