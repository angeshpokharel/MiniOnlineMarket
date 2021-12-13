import { TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import MOM, { API_URL } from "../../../../api/api";
import BuyerHeader from "../common/BuyerHeader";
import './Cart.css';

function Cart(){
    const [cartItems, setCartItems] = useState([]); //win - creating empty array 
    const getCartItems = ()=>{
                          MOM.get(API_URL.cartsOfLoginUser) //win - axios call for carts by login user id
                            .then((response) => {
                                const data = response.data;
                                const dataDetail = response.data.cartDetails;
                                //win - changing model from many raw data to only important column data
                                // dataDetail.map(cartDetails=> 
                                //   {
                                //     cartItems.push({
                                //       cartId : data.id,
                                //       productId : cartDetails.product.id,
                                //       productName : cartDetails.product.name,
                                //       productDescription: cartDetails.product.description,
                                //       price: cartDetails.product.price,
                                //       quantity: cartDetails.quantity
                                //     })
                                //     return cartItems;
                                // })
                                setCartItems(dataDetail);
                            })
                            .catch(error=>console.log("Retrieving carts was failed : " + error.message))
                        }

      useEffect(() => {
        getCartItems();
      }, []);

      //cartItems.map(cartItem => {console.log(cartItem); return true;});
      
    return (
        <div>
          <BuyerHeader name="Cart"/>
          {/* <h1>I'm buyer cart</h1> */}
          <section className="CartItems">
                <h3>List of items in the cart</h3> 
                <Table striped bordered hover className="CartItemTable">
                    <thead>
                        <tr>
                            <th className="thProductID">Product ID </th>
                            <th className="thName">Name</th>
                            <th className="thDescripiton">Description</th>
                            <th className="thPrice">Price</th>
                            <th className="thQty">Quantity</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        cartItems.map(item => {
                          return (
                            <TableRow key={item.id}>
                            <TableCell>{item.product.id}</TableCell>
                            <TableCell>{item.product.name}</TableCell>
                            <TableCell>{item.product.description}</TableCell>
                            <TableCell>{item.product.price}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell><button id="btnRemove"> Remove</button></TableCell>
                            <TableCell><button id="btnCheckout"> CheckOut</button></TableCell>
                            {/* <TableCell>
                              <Link to={{ pathname: `/seller/dashboard/orders/${props.id}` }}>
                                View Details
                              </Link>
                            </TableCell> */}
                          </TableRow>
                          );
                        })
                      }
                    </tbody>
                </Table>
            </section>
        </div>
        )
}

export default Cart;