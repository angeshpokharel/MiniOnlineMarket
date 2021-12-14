import React from "react";
import { NavLink } from "react-router-dom";
import "./BuyerHeader.css";

function BuyerHeader(props) {
  //console.log(props.name);
  switch (props.name) {
    case "Follower": {
      return (
        <ul className="buyerHeaderUl">
          <li className="buyerHeaderLi active">
            <NavLink to="/buyer/component/follower">Follower</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/product">Product</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/cart">Cart</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/order">Order</NavLink>
          </li>
        </ul>
      );
    }
    case "Product": {
      return (
        <ul className="buyerHeaderUl">
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/follower">Follower</NavLink>
          </li>
          <li className="buyerHeaderLi active">
            <NavLink to="/buyer/component/product">Product</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/cart">Cart</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/order">Order</NavLink>
          </li>
        </ul>
      );
    }
    case "Cart": {
      return (
        <ul className="buyerHeaderUl">
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/follower">Follower</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/product">Product</NavLink>
          </li>
          <li className="buyerHeaderLi active">
            <NavLink to="/buyer/component/cart">Cart</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/order">Order</NavLink>
          </li>
        </ul>
      );
    }
    case "Order": {
      return (
        <ul className="buyerHeaderUl">
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/follower">Follower</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/product">Product</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/cart">Cart</NavLink>
          </li>
          <li className="buyerHeaderLi active">
            <NavLink to="/buyer/component/order">Order</NavLink>
          </li>
        </ul>
      );
    }
    default: {
      return (
        <ul className="buyerHeaderUl">
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/follower">Follower</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/product">Product</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/cart">Cart</NavLink>
          </li>
          <li className="buyerHeaderLi">
            <NavLink to="/buyer/component/order">Order</NavLink>
          </li>
        </ul>
      );
    }
  }
}

export default BuyerHeader;
