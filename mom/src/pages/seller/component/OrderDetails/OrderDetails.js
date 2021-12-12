import React, { useCallback, useEffect, useRef } from 'react';
import { FormControl, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import useHttp from '../../../../hooks/use-http'
import { getOrderDetailsByOrderId } from '../../../../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './OrderDetails.module.css';
import ProductList from './ProductList';
import StatusUpdate from './StatusUpdate'

const OderDetails = () => {
    const params = useParams();
    const statusSelect = useRef(null);

    const { orderId } = params;
    const { sendRequest, status, data: loadedOrder, error } = useHttp(getOrderDetailsByOrderId, true);


    useEffect(() => {
        sendRequest(orderId);
    }, [sendRequest, orderId, statusSelect]);

    const updaDataStausCallback = useCallback(() => {
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
    console.log(loadedOrder);

    

    return (
        <>
            <section className={classes.Details}>
                <h3>Order #{orderId}</h3>
                <div className={classes.CustDetails}>
                    <p><strong>Name:</strong> {loadedOrder.user.name}</p>
                    <p><strong>Address:</strong> {loadedOrder.user.address}</p>
                    <p><strong>Email:</strong> {loadedOrder.user.email}</p>
                    <p><strong>Billing Address:</strong> {loadedOrder.billingAddress}</p>
                    <p><strong>Phone:</strong> {loadedOrder.user.phone}</p>
                </div>
                <div className={classes.CustDetails}>
                    <p><strong>Order Id:</strong> {orderId}</p>
                    <p><strong>Payment Mode:</strong> {loadedOrder.paymentMode}</p>
                    <p><strong>Order Date:</strong> {loadedOrder.paymentDate}</p>
                    <p><strong>Status:</strong> {loadedOrder.status}</p>
                    <h4><strong>Order Summary: </strong>{loadedOrder.points}$</h4>
                    <h5><strong>Change Status: </strong></h5>
                    <StatusUpdate {...loadedOrder}  onStatusUpdate = {updaDataStausCallback} orderId/>
                </div>

            </section>

            <section className={classes.Details}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadedOrder.orderDetails.map((product) => {
                            return (
                                <ProductList key={product.id}

                                    {...product}
                                />
                            );
                        }
                        )}
                    </tbody>
                </Table>
            </section>
        </>
    );
};

export default OderDetails;