import {Container, Switch} from "@material-ui/core";
import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import BuyerHeader from "../../buyer/component/common/BuyerHeader";
import Product from "../../seller/component/Product/Product";
import SellerHeader from "../component/Common/SellerHeader";
import styles from "./style";

export default function SellerDashboard() {
  const classes = styles();
  return (
    <Container>
       <SellerHeader name="Dashboard"/>
             {/* <NavLink to="/seller/dashboard/products">Product</NavLink>
            <NavLink to="/seller/dashboard/orders">Order</NavLink>  */}           
    </Container>
  );
}
