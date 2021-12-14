import {
  Button,
  Card,
  Table,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import MOM, { API_URL } from "../../../../api/api";
import AddAlertMessage from "../../../../components/alert/Alert";
import {
  CART_BASE_DOMAIN,
  CATEGORY_BASE_DOMAIN,
  HTTPClient,
  PRODUCT_BASE_DOMAIN,
  REVIEW_BASE_DOMAIN,
} from "../../../../lib/api";
import { LocalStorage } from "../../../../utils/storage/localStorage";
import BuyerHeader from "../common/BuyerHeader";

export const ProductDetail = () => {
  const form = useRef(null);
  const history = useHistory();
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

  const review = {
    id: 0,
    productId: id,
    message: "",
    rating: 0,
    isApproved: false,
  };

  const [reviewModel, setReviewModel] = useState(review);
  const handleChange = (e) => {
    setReviewModel({ ...reviewModel, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    HTTPClient.post(REVIEW_BASE_DOMAIN, reviewModel).then((res) => {
      if (res.status == 200) {
        setReviewModel(review);
        getReviews();
        AddAlertMessage({
          type: "success",
          message: "Review added successfully",
        });
      } else {
        AddAlertMessage({
          type: "error",
          message: "Sorry , Could not add review",
        });
      }
    });
  };

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
    HTTPClient.get(REVIEW_BASE_DOMAIN + "/productId/" + id).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        const filteredReviews = res.data.filter((review) => {
          return review.isApproved === true;
        });
        setloadedReviews(filteredReviews);
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
    getCart();
  }, []);

  const handleAddToCart = (id) => {
    HTTPClient.put(
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
                  {/* <Button onClick={() => handleFollowSeller(model.id)}>
                    Follow Seller
                  </Button> */}
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
                {loadedReviews.map((review) => {
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

        <section>
          <h2>Post review</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              size="medium"
              onChange={handleChange}
              name="message"
              variant="outlined"
              label="message"
              value={reviewModel.message}
              required
              fullWidth
            />

            <br />
            <br />

            <button type="submit">Submit</button>
          </form>
        </section>
      </>
    </>
  );
};
