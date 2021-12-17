import { Table, TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import StatusUpdate from "../OrderDetails/StatusUpdate";
const OrderRow = (data) => {

    const [orderStatus, setOrderStatus] = useState(data.status);

    const updateStatus = (value) => {
      console.log("hello" +value);
      setOrderStatus(value);
    }

    return (

            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.productName}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.customerName}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.shippingAddress}</TableCell>
              <TableCell>{data.quantity}</TableCell>
              <TableCell>{data.price}</TableCell>
              <TableCell>{data.amount}</TableCell>
              <TableCell style={{ color: "red" }}>{orderStatus}</TableCell>
              <TableCell>{
                <StatusUpdate {...data} onStatusChange = {updateStatus} />}
                </TableCell>
            </TableRow>
          );

}

export default OrderRow;