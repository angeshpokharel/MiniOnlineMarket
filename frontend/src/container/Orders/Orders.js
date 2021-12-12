import React from "react";
import Order from "../Order/Order";
import classes from './Orders.module.css';
import { Route } from "react-router";

import { Link } from 'react-router-dom';
import { Table } from "react-bootstrap";

const DUMMY_DATA = [
    {
        id: '1',
        date : 'Juen 5 2021',
        customer : "John Wick",
        email : "john@gmail.com",
        sum : 50,
        status: "Shipped"

    },
    {
        id: '2',
        date : 'Juen 5 2021',
        customer : "John Wick",
        email : "john@gmail.com",
        sum : 50,
        status: "Pending"
        
    },
    {
        id: '3',
        date : 'Juen 5 2021',
        customer : "John Wick",
        email : "john@gmail.com",
        sum : 50,
        status: "Cancelled"
        
    }
];

const Orders = () => {
    return (
        <>
            
            <section className={classes.Orders}>
            <h3>List of orders</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order No.</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Sum, $</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {DUMMY_DATA.map((order) => {
                            return (
                                <Order key={order.id}
                            id = {order.id}
                            {...order}
                            />
                            );
                        }
                        )}
                    </tbody>
                </Table>


                {/* <Link to='/orders/p1'> <Order /></Link>
           <Link to='/orders/p2'> <Order /></Link>
           <Link to='/orders/p3'> <Order /></Link>
           <Route path='/orders/newOrder'>
                <p>Welcome, new User</p>
                </Route> */}
            </section>
        </>
    );
};

export default Orders;