import {Container} from "@material-ui/core";
import React from "react";
import BuyerHeader from "../component/common/BuyerHeader";
import styles from "./style";

export default function BuyerDashboard() {
  const classes = styles();
  return <BuyerHeader name="Dashboard"/>
}
