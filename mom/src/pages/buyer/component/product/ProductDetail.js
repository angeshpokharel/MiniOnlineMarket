import { Button, Card, Table, TableCell, TableRow } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AddAlertMessage from "../../../../components/alert/Alert";
import {
  HTTPClient,
  PRODUCT_BASE_DOMAIN,
  REVIEW_BASE_DOMAIN,
} from "../../../../lib/api";
import BuyerHeader from "../common/BuyerHeader";

export const ProductDetail = () => {
  const form = useRef(null);
  const history = useHistory();
  const product = {
    id: 0,
    name: "",
    price: 0,
    description: "",
    image: "",
    sellerId: 0,
    categoryId: 0,
  };
  const [model, setModel] = useState(product);
  const { id } = useParams();

  const getProduct = async () => {
    HTTPClient.get(PRODUCT_BASE_DOMAIN + "/detail/" + id).then((res) => {
      if (res.status === 200) {
        setModel(res.data);
      } else {
        history.push("/buyer/dashboard/products");
        AddAlertMessage({
          type: "error",
          message: "Sorry , Could not get product details",
        });
      }
    });
  };

  const [loadedReviews, setloadedReviews] = useState([]);

  const getReviews = async () => {
    HTTPClient.get(REVIEW_BASE_DOMAIN).then((res) => {
      if (res.status === 200) {
        setloadedReviews(res.data);
      } else {
        // history.push("/buyer/dashboard/products");
        AddAlertMessage({
          type: "error",
          message: "Sorry , Could not get product reviews",
        });
      }
    });
  };

  useEffect(() => {
    getProduct();
    getReviews();
  }, []);

  const reviews = [];
  const handleAddToCart = (id) => {};

  const handleFollowSeller = (id) => {};

  return (
    <>
      <>
        <BuyerHeader />
        <section className="">
          <h1> Product Detail</h1>
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
              <TableRow key={model.id}>
                <TableCell>{model.id} </TableCell>
                <TableCell>{model.categoryName} catName </TableCell>
                <TableCell>{model.name}</TableCell>
                <TableCell>{model.price} </TableCell>
                <TableCell>
                  {model.sellerName}
                  {/* <button>Follow</button> */}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleAddToCart(model.id)}>
                    Add to Cart
                  </Button>
                  &nbsp; &nbsp;
                  <Button onClick={() => handleFollowSeller(model.id)}>
                    Follow Seller
                  </Button>
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
        </section>
        <section>
          <h2>REVIEWS</h2>
          <Card>
            <Table striped bordered hover>
              <tbody>
                {reviews.map((review) => {
                  return (
                    <TableRow key={review.id}>
                      <TableCell>{review.message} </TableCell>
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </section>
      </>
    </>
  );
};
