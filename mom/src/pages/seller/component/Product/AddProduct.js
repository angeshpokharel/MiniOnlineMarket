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
import {
  CATEGORY_BASE_DOMAIN,
  HTTPClient,
  PRODUCT_BASE_DOMAIN,
} from "../../../../lib/api";
import { LocalStorage } from "../../../../utils/storage/localStorage";

export const AddProduct = () => {
  const form = useRef(null);
  const history = useHistory();
  const loginUserId = LocalStorage.getItem("LoginUserID");

  const product = {
    id: 0,
    name: "",
    price: 0,
    description: "",
    image: "",
    sellerId: loginUserId,
    categoryId: 1,
  };
  const [model, setModel] = useState(product);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    MOM.get(CATEGORY_BASE_DOMAIN).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setCategories(res.data);
      } else {
        AddAlertMessage({
          type: "error",
          message: "Sorry , Could not get categories",
        });
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []);
  const handleChange = (e) => {
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    MOM.post(PRODUCT_BASE_DOMAIN, model).then((res) => {
      debugger;
      if (res.status == 200) {
        debugger;
        history.push("/seller/dashboard/products");
        AddAlertMessage({
          type: "success",
          message: "Product added successfully",
        });
      } else {
        AddAlertMessage({
          type: "error",
          message: "Sorry , Could not add product",
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
      {/* <div>
        <h1>Add Product</h1>
      </div> */}

      <Container>
        <h1>Add Product</h1>
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

          <TextField
            size="large"
            onChange={handleChange}
            name="description"
            value={model.description}
            variant="outlined"
            label="Description"
            rows={4}
            multiline
            required
          />
          {/* <select name="categoryId" onChange={handleChange}>
            {categories.map((category) => (
              <option value={category.id}>{category.categoryName}</option>
            ))}
          </select> */}
          <button type="submit">Submit</button>
        </form>
      </Container>
    </>
  );
};
