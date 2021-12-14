import {Container, Switch} from "@material-ui/core";
import React from "react";
// import { Route } from "react-router";
// import { BrowserRouter, Link, NavLink } from "react-router-dom";
// import Product from "../../seller/component/Product/Product";
import SellerHeader from "../component/common/SellerHeader";
import styles from "./style";

export default function SellerDashboard() {
  const classes = styles();

  // return (
  //   <Container>
  //     <h1>Hello wWorsldkfnlkasdf</h1>
  //                 <NavLink to="/seller/dashboard/products">Product</NavLink>
  //                 <NavLink to="/seller/dashboard/orders">Order</NavLink>              
  //   </Container>
  // );

  return <SellerHeader name="Dashboard"/>
}
