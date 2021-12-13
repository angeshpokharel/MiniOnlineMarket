import React from "react";
import { NavLink } from "react-router-dom";
import './BuyerHeader.css';

function BuyerHeader(){
    return (
        <ul className="buyerHeaderUl">
          <li className="buyerHeaderLi"><NavLink to="/buyer/component/follower">Follower</NavLink></li>
          <li className="buyerHeaderLi"><NavLink to="/buyer/component/product">Product</NavLink></li>
          <li className="buyerHeaderLi"><NavLink to="/buyer/component/cart">Cart</NavLink></li>
          <li className="buyerHeaderLi"><NavLink to="/buyer/component/order">Order</NavLink></li>
      </ul>
    )
}

export default BuyerHeader;