import { Container } from "@material-ui/core";
import React from "react";

import { NavLink } from "react-router-dom";

import BuyerHeader from "../component/common/BuyerHeader";

import styles from "./style";

export default function BuyerDashboard() {
  const classes = styles();

  return (
    <>
      <BuyerHeader name="Dashboard" />
      <Container>
        <NavLink to="/buyer/dashboard/products">Product</NavLink> &nbsp; &nbsp;
        <NavLink to="/buyer/dashboard/orders">Order</NavLink>
      </Container>
    </>
  );
}
