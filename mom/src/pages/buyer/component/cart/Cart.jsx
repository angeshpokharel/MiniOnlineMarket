import { TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import MOM, { API_URL } from "../../../../api/api";
import { LocalStorage } from "../../../../utils/storage/localStorage";
import Checkout from "../checkout/Checkout";
import BuyerHeader from "../common/BuyerHeader";
import './Cart.css';

function Cart(){
  //getting login user id - win
  const loginUserId =LocalStorage.getItem("LoginUserID");

  //states to use in this component - win 
  const [cartId, setCartId]=useState(0); 
  const [cartItems, setCartItems] = useState([]); 
  const [showCart, setShowCart] = useState(false);
  const [selectedItem, setSelectedItem]=useState({
    productId : 0,
    qty : 0
  })   
  //state to control effect - win
  const [refresh, setRefresh] = useState(false);

  const getCartItems = ()=>{
                        MOM.get(API_URL.carts +  loginUserId) //win - axios call for carts by login user id
                          .then((response) => {
                              const data = response.data;
                              setCartId(data.id);
                              //console.log(cartId);
                              const dataDetail = response.data.cartDetails;
                              setCartItems(dataDetail);
                          })
                          .catch(error=>console.log("Retrieving carts was failed : " + error.message))
                      }

                      console.log(cartItems);
  //processing increasing or decreasing item qty - win
  const process=(newQty)=>{
      if(selectedItem.qty != newQty){
      //console.log("gonna update with --> "+cartId+"___"+selectedItem.productId+"___"+newQty);
      var url = API_URL.carts + cartId + "?productId="+selectedItem.productId+"&qty="+(newQty-selectedItem.qty);
      //console.log(url);
      MOM.put(url) 
          .then((response) => {
            console.log("Successfully updated");
          })
          .catch(error=>console.log("Updating cart item was failed : " + error.message))
    }
  }

  //deleting item from cart - win
  const deleteItem= (productId, qty)=>{

    var url = API_URL.carts + cartId + "?productId="+productId+"&qty="+(-qty);
      //console.log(url);
       MOM.put(url) 
           .then((response) => {
             console.log("Successfully deleted");
             setRefresh(true);
           })
           .catch(error=>console.log("Deleting cart item was failed : " + error.message))
  }

  useEffect(() => {
      getCartItems();
  }, [refresh]);  

  const showCheckout = () => {
    setShowCart(true);
  };

  const setItemStateCheck = () => {
    setCartItems("");
    setShowCart(false);
    console.log(cartItems);
  }
  if(cartItems === ""){
    return (
      <>
      <BuyerHeader name="Cart"/>
      <section className="CartItems">
        <h2>Order Successfull</h2>
      </section>
      </>
    );
  }

  //cartItems.map(cartItem => {console.log(cartItem); return true;});
  return (
    <div>
      <BuyerHeader name="Cart"/>
     
      {!showCart &&<section className="CartItems">
            <h3>List of items in the cart</h3> 
            <Table striped bordered hover className="CartItemTable">
                <thead>
                    <tr>
                        <th className="thProductID">Product ID </th>
                        <th className="thName">Name</th>
                        <th className="thDescripiton">Description</th>
                        <th className="thPrice">Unit Price</th>
                        <th className="thQty">Quantity</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    cartItems.map(item => {
                      return (
                         
                         <TableRow key={item.id} onMouseOver={()=>{ setSelectedItem({...selectedItem, 'productId': item.product.id, 'qty': item.quantity}) }}>
                          <TableCell>{item.product.id}</TableCell>
                          <TableCell>{item.product.name}</TableCell>
                          <TableCell>{item.product.description}</TableCell>
                          <TableCell>{item.product.price}</TableCell>
                          <TableCell>
                            <input type="number" defaultValue={item.quantity} min={1} onMouseLeave={(event) => { process(event.target.value);} } />
                          </TableCell>
                          <TableCell><button id="btnRemove" onClick={()=>deleteItem(item.product.id, item.quantity)}> Remove</button></TableCell>
                          {/* <TableCell><button id="btnCheckout"> CheckOut</button></TableCell> */}
                        </TableRow>
                      );
                    })
                  }
                </tbody>
            </Table>
           {/*  <button id="btnCheckout" > <Link to={{ pathname: `/buyer/component/checkout` }}>
            Checkout
        </Link></button> */}
         <button id="btnCheckout" onClick={showCheckout}> Checkoout </button>
        </section>}
        
       
        {showCart &&<section>
          <Checkout onItemStateCheck = {setItemStateCheck} />
          </section>}
     
    </div>
    )
}

export default Cart;