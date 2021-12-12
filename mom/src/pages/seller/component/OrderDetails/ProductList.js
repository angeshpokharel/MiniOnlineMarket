import React from "react";
import { Link } from "react-router-dom";


const ProductList = (props) => {
    console.log(props);
    return (
        <tr key={props.id}>
             <th>{props.id}</th>
            <th>{props.product.name}</th>
            <th>{props.quantity}</th>
            <th>{props.product.price}</th>
            <th>{props.quantity * props.product.price}</th>
           
        </tr>
    );
};

export default ProductList;