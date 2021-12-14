import { Container, Switch } from "@material-ui/core";
import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import ProductList from "../../seller/component/Product/Product";
import Product from "../../seller/component/Product/Product";
import styles from "./style";

export default function SellerDashboard() {
  const classes = styles();
  return (
    <Container>
      <h1>Hello wWorsldkfnlkasdf</h1>
      <NavLink to="/seller/dashboard/products">Product</NavLink> &nbsp; &nbsp;
      <NavLink to="/seller/dashboard/orders">Order</NavLink>
    </Container>
  );
}
