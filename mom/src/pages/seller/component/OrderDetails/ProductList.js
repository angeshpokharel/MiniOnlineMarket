import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from './OrderDetails.module.css';
import OrderHistory from "./OrderHistory";
import Axios from "axios";
import MOM from "../../../../api/api";
import AddAlertMessage from "../../../../components/alert/Alert";

const ProductList = (props) => {
    const [orderDetailId, setOrderDetailId] = useState();
    const [viewHistory, setViewHistory] = useState(false);
    const [orderStatus, setOrderStatus] = useState(props.status)

    function cancelOrder(id){
        const url = "http://localhost:8080/orders/orderDetails/" +id;
        MOM.put(url)
        .then(res =>{
            AddAlertMessage("success", "The order has been cancelled");
        })
        .catch(err => console.error(err));
    }
    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Cancel Order</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.orderDetails.map((item) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.product.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.product.price}</TableCell>
                                    <TableCell>{item.quantity * item.product.price}</TableCell>
                                    { item.status ==="REJECTED" ? <TableCell style={{ color: "red" }}>"CANCELLED"</TableCell>
                                    :
                                    <TableCell style={{ color: "green" }}>{item.status}</TableCell>}
                                    <TableCell> <Link to={{ pathname: `/buyer/component/order//${item.id}`} } key={item.id}>
                                View History
                            </Link> </TableCell>
                            <TableCell>{item.status === "NEW" &&<Button onClick={() => cancelOrder(item.id)}>Cancel</Button>}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

           
                    
            {/* <div className="Content">
            <Link to={{ pathname: `/buyer/component/order/${props.id}/${item.id}`}}>
                                View History
                            </Link> 
                <h3 className="Heading">Order History #{props.id}</h3>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S/N</TableCell>
                                <TableCell>Last Modified Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.orderDetails.map(item => {
                                return (
                                    <TableRow>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.modifiedDate}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                    </TableRow>

                                );
                            })
                            }

                        </TableBody>

                    </Table>
                </TableContainer>
            </div> */}
        </>

    );
};

export default ProductList;