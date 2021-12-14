import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Table } from 'react-bootstrap';
import React from "react";
import { Link } from "react-router-dom";
import classes from './OrderDetails.module.css';


const ProductList = (props) => {
    console.log(props.orderDetails);
    return (
       
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.orderDetails.map((item) => {
                        return(
                        <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.product.price}</TableCell>
                        <TableCell>{item.quantity * item.product.price}</TableCell>
                    </TableRow>
                    )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
       
    );
};

export default ProductList;