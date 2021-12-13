import React, { useEffect } from "react";
import Order from "../Order/Order";
import classes from './Orders.module.css';
import { Route } from "react-router";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Link } from 'react-router-dom';
import useHttp from '../../../../hooks/use-http'
import { getAllOrders } from '../../../../lib/api'
import { Paper, TableBody, TableContainer } from "@material-ui/core";
import { Table } from "react-bootstrap";

const Orders = () => {
    const { sendRequest, status, data: loadedOrders, error } = useHttp(getAllOrders, true);
    useEffect(() => {
        sendRequest();
    }, [sendRequest])


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

    if (status === 'completed' && (!loadedOrders) || loadedOrders.length === 0) {
        return <h1>No orders</h1>
    }
    return (
        <>

            <section className={classes.Orders}>
                <h3>List of orders</h3>
                <TableContainer component={Paper}>

                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Order No.</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Shipping Address</TableCell>
                                <TableCell>Sum, $</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loadedOrders.map((order) => {
                                return (
                                    <Order key={order.id}
                                        id={order.id}
                                        {...order}
                                    />
                                );
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>


            </section>
        </>
    );
};

export default Orders;