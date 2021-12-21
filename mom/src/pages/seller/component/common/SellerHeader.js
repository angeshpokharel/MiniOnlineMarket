import React from "react";
import { NavLink } from "react-router-dom";
import '../../../buyer/component/common/BuyerHeader.css';

function SellerHeader(props){
    //console.log(props.name);
    switch(props.name){
      case "Order" : {
        return (
          <ul className="buyerHeaderUl">
            <li className="buyerHeaderLi active"><NavLink to="/seller/dashboard/products">Product</NavLink></li>
            <li className="buyerHeaderLi"><NavLink to="/seller/dashboard/orders">Order</NavLink></li>
          </ul>
        );
      } 
      case "Dashboard" : {
        return (
          <ul className="buyerHeaderUl">
            <li className="buyerHeaderLi active"><NavLink to="/seller/dashboard/products">Product</NavLink></li>
            <li className="buyerHeaderLi"><NavLink to="/seller/dashboard/orders">Order</NavLink></li>
          </ul>
        );
      } 
      default: {
        return (
          <ul className="buyerHeaderUl">
            <li className="buyerHeaderLi active"><NavLink to="/seller/dashboard/products">Product</NavLink></li>
            <li className="buyerHeaderLi"><NavLink to="/seller/dashboard/orders">Order</NavLink></li>
            
          </ul>
        );
      }
    }
}

export default SellerHeader;