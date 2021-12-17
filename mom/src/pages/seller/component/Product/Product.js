import React, { useEffect, useState } from "react";
import classes from "../Order/Order.module.css";
import useHttp from "../../../../hooks/use-http";
import {
  getAllProducts,
  HTTPClient,
  PRODUCT_BASE_DOMAIN,
} from "../../../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import { TableRow, TableCell, Button } from "@material-ui/core";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddAlertMessage from "../../../../components/alert/Alert";
import { LocalStorage } from "../../../../utils/storage/localStorage";
import MOM from "../../../../api/api";

const ProductList = () => {
  const [prodId, setProdId] = useState(0);
  const {
    sendRequest,
    status,
    data: loadedProducts,
    error,
  } = useHttp(getAllProducts, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const loginUserId = LocalStorage.getItem("LoginUserID");

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

  console.log(loadedProducts);

  const filteredProducts = loadedProducts.filter((product) => {
    return product.sellerId === loginUserId;
  });

  const handleDelete = (id) => {
    MOM.delete(PRODUCT_BASE_DOMAIN + "/" + id).then((res) => {
      if (res.status === 200) {
        sendRequest();
        AddAlertMessage({
          type: "success",
          message: "Deleted Successfully",
        });
      } else {
        AddAlertMessage({
          type: "error",
          message: "Sorry , Something went wrong",
        });
      }
    });
  };

  return (
    <>
      <section className={classes.Orders}>
        <h1>Products</h1>
        <h3>
          <Link to={"/seller/dashboard/products/add"}>Add New Product</Link>
        </h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product No.</th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((prod) => {
              return (
                <TableRow key={prod.id}>
                  <TableCell>{prod.id} </TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.price} </TableCell>
                  <TableCell>
                    <Link to={"/seller/dashboard/products/" + prod.id}>
                      Edit
                    </Link>
                    &nbsp; &nbsp;
                    <Button
                      onClick={() => handleDelete(prod.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default ProductList;
