import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";


const ProductList = (props) => {
    console.log(props);
    return (
        <TableRow key={props.id}>
             <TableCell>{props.id}</TableCell>
            <TableCell>{props.product.name}</TableCell>
            <TableCell>{props.quantity}</TableCell>
            <TableCell>{props.product.price}</TableCell>
            <TableCell>{props.quantity * props.product.price}</TableCell>
           
        </TableRow>
    );
};

export default ProductList;