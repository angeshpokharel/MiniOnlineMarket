import { TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import MOM, { API_URL } from "../../../../api/api";
import { LocalStorage } from "../../../../utils/storage/localStorage";
import SellerHeader from "../Common/SellerHeader";

import './Follower.css';

function Follwer(){
  //getting login user id - win
  const loginUserId =LocalStorage.getItem("LoginUserID");

  //state to control effect - win
  const [refresh, setRefresh] = useState(false);

  //states to use in this component
  const [followers, setFollowers] = useState([]); 

  //getting follower who are not followed yet
  const getUnfollower = ()=>{
                        MOM.get(API_URL.followers + loginUserId) 
                        .then((response) => {
                            const data = response.data;
                            console.log(data);
                            setFollowers(data);
                        })
                        .catch(error=>console.log("Retrieving unfollowing followers was failed : " + error.message))
                      }

    useEffect(() => {
    getUnfollower();
    }, [refresh]);  

  return (
    <div>
      <SellerHeader name="Follower"/>
      <section className="Followers">
            <h3>List of followers in the online store</h3> 
            <Table striped bordered hover className="FollowerTable">
                <thead>
                    <tr>
                        <th className="thFollowerID">Follower ID </th>
                        <th className="thName">Name</th>
                        <th className="thEmail">Email</th>
                        <th className="thAddress">Address</th>
                        <th className="thPhone">Phone</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    followers.map(follower => {
                      return (
                        <TableRow key={follower.id}>
                          <TableCell>{follower.id}</TableCell>
                          <TableCell>{follower.name}</TableCell>
                          <TableCell>{follower.email}</TableCell>
                          <TableCell>{follower.address}</TableCell>
                          <TableCell>{follower.phone}</TableCell>
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