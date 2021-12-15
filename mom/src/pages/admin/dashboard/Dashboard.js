import React, {useState, useEffect} from "react";
import styles from "./style";
import UserList from "./UserList";
import AddAlertMessage from "../../../components/alert/Alert";
import { SOMETHING_WENT_WRONG } from "../../../utils/constants";
import MOM, { API_URL } from "../../../api/api";

export default function AdminDashboard() {
  const classes = styles();
  const [tableData, setTableData] = useState();


  const getAllUnApprovedSellerList = () => {
    MOM.get(API_URL.user + "/un-approved")
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => {
        AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
      });
  }

  const deleteRow = id => {
    MOM.delete(API_URL.user + "/" + id)
      .then(response => {
        getAllUnApprovedSellerList();
        AddAlertMessage({
          type: "success",
          message: "User Deleted"
        });
      }).catch(error => {
        AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
      })
  }
  
  const approveUser = id => {
    MOM.put(API_URL.user +"/approve" + "/" + id)
    .then(response => {
      getAllUnApprovedSellerList();
        AddAlertMessage({
          type: "success",
          message: "User Approved"
        });
    }).catch(error => {
      AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
    })
  }

  useEffect(() => {
    getAllUnApprovedSellerList();
  }, []);

  return (
    <>
      <UserList tableData={tableData} 
      showActionColumn={true}
       deleteRow={deleteRow.bind(this)}
       approveUser={approveUser.bind(this)}/>
    </>
  );
}
