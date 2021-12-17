import { TableRow, TableCell, Button, Table } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../../../hooks/use-http";
import { getOrderBySellerId } from "../../../../lib/api";

import { AppUtils } from "../../../../utils/appUtils";
import { LocalStorage } from "../../../../utils/storage/localStorage";
import CreatePdfReceipt from "../../../buyer/component/common/CreatePdfReceipt";
import StatusUpdate from "../OrderDetails/StatusUpdate";
import LoadingSpinner from "../UI/LoadingSpinner";
import OrderRow from "./OrderRow";

const OrderSeller = (props) => {
  /*  const [curStatus, setCurStatus] = useState(props.status); */
  const statusSelect = useRef(null);
  const loginUserId = LocalStorage.getItem("LoginUserID");
  /*   const [orderStatus, setOrderStatus] = useState(); */
  const {
    sendRequest,
    status,
    data: loadedOrders,
    error,
  } = useHttp(getOrderBySellerId, true);

  useEffect(() => {
    sendRequest(loginUserId);
  }, [sendRequest, loginUserId, statusSelect]);

  /*   const updaDataStausCallback = useCallback(() => {
     sendRequest(loginUserId);
}, [sendRequest, loginUserId]); */

  /*  useEffect(() => {
   console.log(status);
     if (status === 'completed' && !error) {
         setOrderStatus(loadedOrders.status);
     }
 }, [status]); */

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  console.log(loadedOrders);
  if (error) {
    return <p className="centered focus">{error}</p>;
  }

  if ((status === "completed" && !loadedOrders) || loadedOrders.length === 0) {
    return <h1>No orders</h1>;
  }
  console.log(loadedOrders);

  /*  const updateStatus = (value) => {
    console.log("hello" +value);
    setOrderStatus(value);
  } */

  /*  function onChangeHandler() {
     setCurStatus(statusSelect.current.value);
   } */

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order No.</th>
          <th>Product Name</th>
          <th>Ordered Date</th>
          <th>Customer Name</th>
          <th>Email</th>
          <th>Shipping Address</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Sum, $</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {loadedOrders.map((data) => {
          return <OrderRow {...data} />;
        })}
      </tbody>
    </Table>
  );
};

export default OrderSeller;
