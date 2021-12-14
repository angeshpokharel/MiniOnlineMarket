import React, { useEffect } from "react";
import Order from "../Order/Order";
import classes from './Orders.module.css';
import { Route } from "react-router";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Link } from 'react-router-dom';
import { Table } from "react-bootstrap";
import useHttp from '../../../../hooks/use-http'
import { getOrderByUserId } from '../../../../lib/api'
import { AppUtils } from "../../../../utils/appUtils";
import SellerHeader from "../Common/SellerHeader";
import { LocalStorage } from "../../../../utils/storage/localStorage";

const Orders = (props) => {
    const loginUserId = LocalStorage.getItem("LoginUserID");
    //custom hook using useReducer and callBack
    const { sendRequest, status, data: loadedOrders, error } = useHttp(getOrderByUserId, true);

    useEffect(() => {
        sendRequest(loginUserId);
    }, [sendRequest, loginUserId]);


    if (status === 'pending') {
        return (
              <div className='centered'>
                 <LoadingSpinner />
             </div> 
        );
    }
    console.log("Hello");
    console.log(loadedOrders);
    if (error) {
        return <p className='centered focus'>{error}</p>
    }

    if (status === 'completed' && (!loadedOrders) || loadedOrders.length === 0) {
        return <h1>No orders</h1>
    } 
    return (
        <>
        {AppUtils.getUserRole() === "ROLE_SELLER" &&<SellerHeader name="Orders"/>}
            <section className={classes.Orders}>
                <h3>List of orders</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order No.</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Shipping Address</th>
                            <th>Sum, $</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadedOrders.map((order) => {
                            return (
                                <Order key={order.id}
                                    id={order.id}
                                    {...order}
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

export default Orders;