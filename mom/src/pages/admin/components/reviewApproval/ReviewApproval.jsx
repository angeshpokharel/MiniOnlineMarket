import { TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import MOM, { API_URL } from "../../../../api/api";
import { LocalStorage } from "../../../../utils/storage/localStorage";
import AdminHeader from "../common/AdminHeader";
import './ReviewApproval.css';

function ReviewApproval(){
  //getting login user id - win
  const loginUserId =LocalStorage.getItem("LoginUserID");

  //state to control effect - win
  const [refresh, setRefresh] = useState(false);

  //states to use in this component
  const [reviews, setReviews] = useState([]); 
  const [oldReviews, setOldReviews] = useState([]); 

  //getting reviews
   const getUnApprovedReviews = ()=>{
                         MOM.get(API_URL.reviews + "unapproved") 
                         .then((response) => {
                             const data = response.data;
                             setReviews(data);
                         })
                         .catch(error=>console.log("Retrieving un-approved reviews was failed : " + error.message))
                       }

  //getting reviews
  const getApprovedReviews = ()=>{
                      MOM.get(API_URL.reviews + "approved") 
                      .then((response) => {
                          const data = response.data;
                          setOldReviews(data);
                      })
                      .catch(error=>console.log("Retrieving approved reviews was failed : " + error.message))
  }

  //following by current login user
  const approve= (reviewId)=>{
    var url = API_URL.reviews + reviewId;
      MOM.put(url) 
            .then((response) => {
              console.log("Successfully approved ");
              setRefresh(!refresh);
            })
            .catch(error=>console.log("Approval was failed : " + error.message))
  }

 useEffect(() => {
  getUnApprovedReviews();
  getApprovedReviews();
 }, [refresh]);  

  return (
    <div>
      <AdminHeader name="ReviewApproval"/>
      <section className="Reviews">
            <h3>List of review requests</h3> 
            <Table striped bordered hover className="ReviewTable">
                <thead>
                    <tr>
                        <th className="thReviewID">Review ID </th>
                        <th className="thProductName">Product Name</th>
                        <th className="thMessage">Message</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    reviews.map(review => {
                      return (
                        <TableRow key={review.id}>
                          <TableCell>{review.id}</TableCell>
                          <TableCell>{review.productName}</TableCell>
                          <TableCell>{review.message}</TableCell>
                          <TableCell><button id="btnApprove" onClick={()=>approve(review.id)}>Approve</button></TableCell>
                      </TableRow>
                      );
                    })
                  } 
                </tbody>
            </Table>
            <br/>
            <hr />
            <br/>
            <h3>List of old reviews</h3> 
            <Table striped bordered hover className="ReviewTable">
                <thead>
                    <tr>
                        <th className="thReviewID">Review ID </th>
                        <th className="thProductName">Product Name</th>
                        <th className="thMessage">Message</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    oldReviews.map(review => {
                      return (
                        <TableRow key={review.id}>
                          <TableCell>{review.id}</TableCell>
                          <TableCell>{review.productName}</TableCell>
                          <TableCell>{review.message}</TableCell>
                      </TableRow>
                      );
                    })
                  } 
                </tbody>
            </Table>
          
        </section>
    </div>
    )
}

export default ReviewApproval;