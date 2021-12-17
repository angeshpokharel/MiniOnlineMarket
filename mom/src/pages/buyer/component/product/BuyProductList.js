import { Button, Table, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MOM, { API_URL } from "../../../../api/api";
import AddAlertMessage from "../../../../components/alert/Alert";
import useHttp from "../../../../hooks/use-http";
import {
  CART_BASE_DOMAIN,
  getAllProductDetailss,
  getAllProducts,
  HTTPClient,
} from "../../../../lib/api";
import { LocalStorage } from "../../../../utils/storage/localStorage";
import LoadingSpinner from "../../../seller/component/UI/LoadingSpinner";
import BuyerHeader from "../common/BuyerHeader";
// import classes from "../../../seller//component/OrderList/OrderList.module.css";

export const BuyProductList = (props) => {
  const {
    sendRequest,
    status,
    data: loadedProducts,
    error,
  } = useHttp(getAllProductDetailss, true);

  useEffect(() => {
    sendRequest();
    getCart();
  }, [sendRequest]);

  //getting login user id - win
  const loginUserId = LocalStorage.getItem("LoginUserID");

  //states to use in this component - win
  const [cartId, setCartId] = useState(0);

  const getCart = () => {
    MOM.get(API_URL.carts + loginUserId) //win - axios call for carts by login user id
      .then((response) => {
        const data = response.data;
        setCartId(data.id);
      })
      .catch((error) =>
        console.log("Retrieving carts was failed : " + error.message)
      );
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focus">{error} Here </p>;
  }

  if (
    (status === "completed" && !loadedProducts) ||
    loadedProducts.length === 0
  ) {
    return <h1>No Products</h1>;
  }

  const handleAddToCart = (id) => {
    MOM.put(
      CART_BASE_DOMAIN + "/" + cartId + "?productId=" + id + "&qty=1"
    ).then((res) => {
      if (res.status === 200 || res.status === 202) {
        AddAlertMessage({
          type: "success",
          message: "Product added to cart",
        });
      } else {
        AddAlertMessage({
          type: "error",
          message: "Sorry , Could not add product to cart",
        });
      }
    });
  };

  const handleFollowSeller = (id) => {
    //Add Here
  };
  //{classes.Orders}
  return (
    <>
      <>
        <section className="">
          <BuyerHeader name="Product" />
          <h1> Buy Products</h1>
          <h3></h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product No.</th>
                <th>Category</th>
                <th>Name</th>
                <th>Price</th>
                <th>Seller</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {loadedProducts.map((prod) => {
                return (
                  <TableRow key={prod.id}>
                    <TableCell>{prod.id} </TableCell>
                    <TableCell>{prod.categoryName} </TableCell>
                    <TableCell>{prod.name}</TableCell>
                    <TableCell>{prod.price} </TableCell>
                    <TableCell>
                      {prod.sellerName} &nbsp; &nbsp;
                      {/* <button onClick={() => handleFollowSeller(prod.sellerId)}>
                        Follow
                      </button> */}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleAddToCart(prod.id)}
                        variant="danger"
                      >
                        Add To Cart
                      </Button>
                      &nbsp; &nbsp;
                      <Link
                        to={{
                          pathname: `/buyer/dashboard/productDetail/${prod.id}`,
                        }}
                      >
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </section>
      </>
    </>
  );
};
