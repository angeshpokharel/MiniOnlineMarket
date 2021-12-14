import Cart from "../cart/Cart";
import BuyerHeader from "../common/BuyerHeader";
import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import MOM, { API_URL } from "../../../../api/api";
import { LocalStorage } from "../../../../utils/storage/localStorage";
import './Checkout.css';
import Button from "@restart/ui/esm/Button";
import AddAlertMessage from "../../../../components/alert/Alert";
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Checkout = (props) => {
    const newPostForm = useRef()
    const history = useHistory
    const [cartId, setCartId] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const loginUserId = LocalStorage.getItem("LoginUserID");
    const [refresh, setRefresh] = useState(false);
    const postAPI = `http://localhost:8080/orders/${loginUserId}`;
    console.log(postAPI);
    const getCartItems = () => {
        MOM.get(API_URL.carts + loginUserId) //win - axios call for carts by login user id
            .then((response) => {
                const data = response.data;
                setCartId(data.id);
                const dataDetail = response.data.cartDetails;
                setCartItems(dataDetail);
            })
            .catch(error => console.log("Retrieving carts was failed : " + error.message))
    }

    useEffect(() => {
        getCartItems();
    }, [refresh])

    const PostDataHandler = () => {
        props.onItemStateCheck(); 
        const form = newPostForm.current
        const data = {
            shippingAddress: form['shippingAddress'].value,
            billingAddress: form['billingAddress'].value,
            paymentMode: form['paymentMode'].value,
            orderDetails: cartItems.map(item => {
                return item;
            })
        };
        console.log(data);
        axios.post(postAPI, data)
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        AddAlertMessage({ type: "success", message: "Order Successfull" });
    }

    console.log(cartItems);
    const totalPrice = cartItems.map(item => item.product.price * item.quantity).reduce((a, b) => a+b, 0);
    console.log(totalPrice); 

    return (
        <>
           {/*  <BuyerHeader name="Cart" /> */}
            <h2 className="Heading">Order Confirmation</h2>
            {/* <section className="Checkout"> */}
            <div className="Content">
                <form ref={newPostForm}>
                    <div>
                        <label>Shipping Address</label>
                        <input type="text" label={'shippingAddress'} name={'shippingAddress'} />
                    </div>

                    <div>
                        <label>Billing Address</label>
                        <input type="text" label={'billingAddress'} name={'billingAddress'} />
                    </div>

                    <label>Payment Mode</label>
                    <input type="text" label={'paymentMode'} name={'paymentMode'} />
                </form>
            </div>
            <div className="Content">
                <h3 className="Heading">Order Details</h3>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map(item => {
                                return (
                                    <TableRow>
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell>{item.product.description}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.product.price}</TableCell>
                                        <TableCell>{item.quantity * item.product.price}</TableCell>
                                    </TableRow>

                                );
                            })
                            }
                             
                        </TableBody>

                    </Table>
                </TableContainer>
                <h3 className="Total">Total: { cartItems.map(item => item.product.price * item.quantity).reduce((a, b) => a+b, 0)
                            } </h3> 
                <div>
                    <Button onClick={PostDataHandler}>Confirm Order</Button>
                </div>
            </div>
            {/*  </section> */}
        </>
    );
};

export default Checkout;