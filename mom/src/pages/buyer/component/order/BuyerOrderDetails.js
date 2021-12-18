import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormControl, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import useHttp from '../../../../hooks/use-http'
import { getOrderDetailsByOrderId } from '../../../../lib/api'
import LoadingSpinner from '../../../seller/component/UI/LoadingSpinner';
import ProductList from '../../../seller/component/OrderDetails/ProductList';
import BuyerHeader from '../common/BuyerHeader';
//import ProductList from './ProductList';


const BuyerOrderDetails = () => {
    const params = useParams();
    const { orderId } = params;
    const { sendRequest, status, data: loadedOrder, error } = useHttp(getOrderDetailsByOrderId, true);
    
    useEffect(() => {
        sendRequest(orderId);
    }, [sendRequest, orderId]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className='centered focus'>{error}</p>
    }

    if (!loadedOrder) {
        return <h1>No orders</h1>
    }
    console.log(loadedOrder.orderDetails);
    return (
        <>
        <BuyerHeader  name="Order"/>
            <div className="Content">
                <ProductList {...loadedOrder} />
                <h3 className="Total">Total: {loadedOrder.orderDetails.map(item => item.product.price * item.quantity).reduce((a, b) => a + b, 0)
                } </h3>
            </div>


            

        </>
    );
}

export default BuyerOrderDetails;