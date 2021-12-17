import {
  Button,
  Container,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import MOM from "../../../../api/api";
import AddAlertMessage from "../../../../components/alert/Alert";
import { HTTPClient, PRODUCT_BASE_DOMAIN } from "../../../../lib/api";

export const UpdateProduct = () => {
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
    HTTPClient.get(PRODUCT_BASE_DOMAIN + "/" + id).then((res) => {
      if (res.status === 200) {
        setModel(res.data);
      } else {
        history.push("/seller/dashboard/products");
        AddAlertMessage({
          type: "error",
          message: "Sorry , Could not get product details",
        });
      }
    });
  };

  // const getCategories = async () => {
  //   HTTPClient.get(PRODUCT_BASE_DOMAIN + "/categories").then((res) => {
  //     if (res.status === 200) {
  //       setCategories(res.data);
  //     } else {
  //       AddAlertMessage({
  //         type: "error",
  //         message: "Sorry , Could not get categories",
  //       });
  //     }
  //   });
  // };

  useEffect(() => {
    getProduct();
  }, []);

  const handleChange = (e) => {
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    MOM.put(PRODUCT_BASE_DOMAIN + "/" + id, model).then((res) => {
      if (res.status == 200) {
        history.push("/seller/dashboard/products");
        AddAlertMessage({
          type: "success",
          message: "Product updated successfully",
        });
      } else {
        AddAlertMessage({
          type: "error",
          message: "Sorry , Could not update product",
        });
      }
    });
  };

  const onSubmit = (e) => {
    // console.log(model);
    // console.log("Submit ON");
  };

  return (
    <>
      <div>
        <h1>Update Product</h1>
      </div>

      <Container>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            onChange={handleChange}
            value={model.name}
            variant="outlined"
            label="Name"
            required
          />

          <TextField
            type="number"
            name="price"
            value={model.price}
            onChange={handleChange}
            variant="outlined"
            label="Price"
            required
          />

          <TextareaAutosize
            size="large"
            onChange={handleChange}
            name="description"
            value={model.description}
            variant="outlined"
            label="Description"
            required
          />

          {/* <select name="category" onChange={handleChange}>
            <option value="Laptop"> Laptop </option>
            <option value="Desktop"> Desktop </option>
            <option value="Tablet"> Tablet </option>
            <option value="Smartphone"> Smartphone </option>
          </select> */}
          <button type="submit">Submit</button>
        </form>
      </Container>
    </>
  );
};
