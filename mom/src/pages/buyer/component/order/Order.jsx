import React from "react";
import { LocalStorage } from "../../../../utils/storage/localStorage";
import Orders from "../../../seller/component/Orders/Orders";
import BuyerHeader from "../common/BuyerHeader";

function Order(){
  const loginUserId = LocalStorage.getItem("LoginUserID");
    return (
        <div>
          <BuyerHeader  name="Order"/>
          <Orders loginUserId/>
        </div>
    )
}

export default Order;