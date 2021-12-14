import { Button, Table, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../../../hooks/use-http";
import { getAllProductDetailss, getAllProducts } from "../../../../lib/api";
import LoadingSpinner from "../../../seller/component/UI/LoadingSpinner";
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
  }, [sendRequest]);

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
    //Add Here
  };

  const handleFollowSeller = (id) => {
    //Add Here
  };
  //{classes.Orders}
  return (
    <>
      <>
        <section className="">
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
