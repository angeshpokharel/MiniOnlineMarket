import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminHeader.css"

function AdminHeader(props){
    switch(props.name){
      case "SellerApproval" : {
        return (
          <ul className="adminHeaderUl">
            <li className="adminHeaderLi active"><NavLink to="/admin/component/accountapproval">SellerApproval</NavLink></li>
            <li className="adminHeaderLi"><NavLink to="/admin/component/reviewapproval">ReviewApproval</NavLink></li>
          </ul>
        );
      }
      case "ReviewApproval" : {
        return (
          <ul className="adminHeaderUl">
            <li className="adminHeaderLi"><NavLink to="/admin/component/accountapproval">SellerApproval</NavLink></li>
            <li className="adminHeaderLi active"><NavLink to="/admin/component/reviewapproval">ReviewApproval</NavLink></li>
          </ul>
        );
      } 
      default: {
        return (
          <ul className="adminHeaderUl">
            <li className="adminHeaderLi"><NavLink to="/admin/component/accountapproval">SellerApproval</NavLink></li>
            <li className="adminHeaderLi"><NavLink to="/admin/component/reviewapproval">ReviewApproval</NavLink></li>
          </ul>
        );
      }
    }
}

export default AdminHeader;