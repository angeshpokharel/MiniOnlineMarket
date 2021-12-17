import { TableRow, TableCell, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { AppUtils } from "../../../../utils/appUtils";
import CreatePdfReceipt from "../../../buyer/component/common/CreatePdfReceipt";

const Order = (props) => {
  
  const downloadRecipt = () => {
    CreatePdfReceipt(props.orderDetails);
  }
  

  return (
    <TableRow key={props.id}>
      <TableCell>{props.id}</TableCell>
      <TableCell>{props.paymentDate}</TableCell>
      <TableCell>{props.user.name}</TableCell>
      <TableCell>{props.user.email}</TableCell>
      <TableCell>{props.shippingAddress}</TableCell>
      <TableCell>{props.points}</TableCell>
      {/* <TableCell style = {{color: "red"}}>{props.status}</TableCell> */}
      <TableCell>
        {AppUtils.getUserRole() === 'ROLE_SELLER' &&<Link to={{ pathname: `/seller/dashboard/orders/${props.id}` }}>
          View Details
        </Link>}
        {AppUtils.getUserRole() === 'ROLE_BUYER' &&<Link to={{ pathname: `/buyer/component/order/${props.id}` }}>
          View More
        </Link>}
      </TableCell>
      {AppUtils.getUserRole() === 'ROLE_BUYER' &&<TableCell> <Button variant="contained" color="success" onClick={downloadRecipt}>Reciept</Button></TableCell>}
    </TableRow>
  );
};

export default Order;
