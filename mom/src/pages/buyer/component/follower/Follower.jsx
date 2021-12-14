import { TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import MOM, { API_URL } from "../../../../api/api";
import { LocalStorage } from "../../../../utils/storage/localStorage";
import BuyerHeader from "../common/BuyerHeader";
import './Follower.css';

function Follwer(){
  //getting login user id - win
  const loginUserId =LocalStorage.getItem("LoginUserID");

  //state to control effect - win
  const [refresh, setRefresh] = useState(false);

  //states to use in this component
  const [sellers, setSellers] = useState([]); 
  const [followings, setFollowings] = useState([]); 

  //getting seller who are not followed yet
  const getUnfollowing = ()=>{
                        MOM.get(API_URL.followers + "unfollowing/" + loginUserId) 
                        .then((response) => {
                            const data = response.data;
                            console.log(data);
                            var result = data.filter(user => user.role === 'ROLE_SELLER');
                            setSellers(result);
                        })
                        .catch(error=>console.log("Retrieving unfollowing sellers was failed : " + error.message))
                      }

  //following by current login user
  const followTo= (toUserId)=>{
    var url = API_URL.followers + "?by="+loginUserId+"&to="+toUserId;
      console.log(url);
       MOM.post(url) 
           .then((response) => {
             console.log("Successfully follwed to "+ toUserId + " by "+ loginUserId);
             setRefresh(!refresh);
           })
           .catch(error=>console.log("Following was failed : " + error.message))
  }

  //unfollowing by current login user
  const unFollowTo= (toUserId)=>{
    var url = API_URL.followers + "?by="+loginUserId+"&to="+toUserId;
      console.log(url);
       MOM.delete(url) 
           .then((response) => {
             console.log("Successfully unfollwed to "+ toUserId + " by "+ loginUserId);
             setRefresh(!refresh);
           })
           .catch(error=>console.log("Unfollowing was failed : " + error.message))
  }

  const getFollowing = ()=>{
    MOM.get(API_URL.followers + "following/" + loginUserId) 
      .then((response) => {
          const data = response.data;
          setFollowings(data);
      })
      .catch(error=>console.log("Retrieving following sellers was failed : " + error.message))
  }

useEffect(() => {
getUnfollowing();
getFollowing();
}, [refresh]);  

  return (
    <div>
      <BuyerHeader name="Follower"/>
      <section className="Sellers">
            <h3>List of sellers in the online store</h3> 
            <Table striped bordered hover className="SellerTable">
                <thead>
                    <tr>
                        <th className="thSellerID">Seller ID </th>
                        <th className="thName">Name</th>
                        <th className="thEmail">Email</th>
                        <th className="thAddress">Address</th>
                        <th className="thPhone">Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    sellers.map(seller => {
                      return (
                        <TableRow key={seller.id}>
                          <TableCell>{seller.id}</TableCell>
                          <TableCell>{seller.name}</TableCell>
                          <TableCell>{seller.email}</TableCell>
                          <TableCell>{seller.address}</TableCell>
                          <TableCell>{seller.phone}</TableCell>
                          <TableCell><button id="btnFollow" onClick={()=>followTo(seller.id)}> Follow</button></TableCell>
                      </TableRow>
                      );
                    })
                  }
                </tbody>
            </Table>
            <br/>
            <hr />
            <br/>
            <h3>List of my following sellers in the online store</h3> 
            <Table striped bordered hover className="SellerTable">
                <thead>
                    <tr>
                        <th className="thSellerID">Seller ID </th>
                        <th className="thName">Name</th>
                        <th className="thEmail">Email</th>
                        <th className="thAddress">Address</th>
                        <th className="thPhone">Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    followings.map(seller => {
                      return (
                        <TableRow key={seller.id}>
                          <TableCell>{seller.id}</TableCell>
                          <TableCell>{seller.name}</TableCell>
                          <TableCell>{seller.email}</TableCell>
                          <TableCell>{seller.address}</TableCell>
                          <TableCell>{seller.phone}</TableCell>
                          <TableCell><button id="btnUnFollow" onClick={()=>unFollowTo(seller.id)}> Unfollow</button></TableCell>
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

export default Follwer;