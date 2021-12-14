import React from "react";
import { NavLink } from "react-router-dom";
import "./SellerHeader.css"

function SellerHeader(props){
    switch(props.name){
      case "Follower" : {
        return (
          <ul className="sellerHeaderUl">
            <li className="sellerHeaderLi active"><NavLink to="/seller/dashboard/followers">Follower</NavLink></li>
            <li className="sellerHeaderLi"><NavLink to="/seller/dashboard/products">Product</NavLink></li>
            <li className="sellerHeaderLi"><NavLink to="/seller/dashboard/orders">Order</NavLink></li>
          </ul>
        );
      }
      case "Product" : {
        return (
          <ul className="sellerHeaderUl">
            <li className="sellerHeaderLi"><NavLink to="/seller/dashboard/followers">Follower</NavLink></li>
            <li className="sellerHeaderLi active"><NavLink to="/seller/dashboard/products">Product</NavLink></li>
            <li className="sellerHeaderLi"><NavLink to="/seller/dashboard/orders">Order</NavLink></li>
          </ul>
        );
      } 
      case "Order" : {
        return (
          <ul className="sellerHeaderUl">
            <li className="sellerHeaderLi"><NavLink to="/seller/dashboard/followers">Follower</NavLink></li>
            <li className="sellerHeaderLi"><NavLink to="/seller/dashboard/products">Product</NavLink></li>
            <li className="sellerHeaderLi active"><NavLink to="/seller/dashboard/orders">Order</NavLink></li>
          </ul>
        );
      } 
      default: {
        return (
          <ul className="sellerHeaderUl">
            <li className="sellerHeaderLi"><NavLink to="/seller/dashboard/followers">Follower</NavLink></li>
            <li className="sellerHeaderLi"><NavLink to="/seller/dashboard/products">Product</NavLink></li>
            <li className="sellerHeaderLi"><NavLink to="/seller/dashboard/orders">Order</NavLink></li>
          </ul>
        );
      }
    }
}

export default SellerHeader;