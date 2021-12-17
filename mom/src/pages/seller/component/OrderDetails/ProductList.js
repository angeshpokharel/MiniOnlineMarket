import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from './OrderDetails.module.css';
import OrderHistory from "./OrderHistory";

const ProductList = (props) => {
    const [orderDetailId, setOrderDetailId] = useState();
    const [viewHistory, setViewHistory] = useState(false);

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
                                    <TableCell style={{ color: "green" }}>{item.status}</TableCell>
                                    <TableCell> <Link to={{ pathname: `/buyer/component/order/orderHistory/${item.id}`} } key={item.id}>
                                View History
                            </Link> </TableCell>
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