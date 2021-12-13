import { TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import MOM, { API_URL } from "../../../../api/api";
import BuyerHeader from "../common/BuyerHeader";
import './Follower.css';

function Follwer(){
  //state to control effect - win
  const [refresh, setRefresh] = useState(false);

  const [sellers, setSellers] = useState([]); 

  const getSellers = ()=>{
                        MOM.get(API_URL.user) 
                          .then((response) => {
                              const data = response.data;
                              //got all users. so filtered with role ROLE_SELLER
                              var result = data.filter(user => user.role === 'ROLE_SELLER');
                              setSellers(result);
                          })
                          .catch(error=>console.log("Retrieving sellers was failed : " + error.message))
                      }

  useEffect(() => {
    getSellers();
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
                          <TableCell><button id="btnFollow"> Follow</button></TableCell>
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