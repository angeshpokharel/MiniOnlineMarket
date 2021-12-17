import axios from "axios";
import MOM from "../api/api";
import AddAlertMessage from "../components/alert/Alert";

const BASE_URL = "http://localhost:8080/";

const API_URL = {
  order: BASE_URL + "orders",
  user: BASE_URL + "users",
};

export async function getAllOrders() {
  const response = await axios
  MOM.get(API_URL.order)
    .catch((err) => console.log(err, "Couldnot fetch data"));

  const data = response.data;

  const transformedOrders = [];

  for (const key in data) {
    const loadedOrder = {
      id: key,
      ...data[key],
    };

    transformedOrders.push(loadedOrder);
  }

  return transformedOrders;
}

export async function getOrderByUserId(userId) {
  const response = await axios.get(`${API_URL.order}/${userId}/orders`);
  
  const data = response.data;

  if (response.Error) {
    throw new Error(data.message || "Could not fetch orders.");
  }

  const transformedOrders = [];

  for (const key in data) {
    const loadedOrder = {
      id: key,
      ...data[key],
    };
    transformedOrders.push(loadedOrder);
  }

  return transformedOrders;
}

export async function getOrderBySellerId(userId) {
  const response = await axios.get(`${API_URL.order}/${userId}/sellerOrders`);

  const data = response.data;

  if (response.Error) {
    throw new Error(data.message || 'Could not fetch orders.');
  }

  const transformedOrders = [];

  for (const key in data) {
    const loadedOrder = {
      id: key,
      ...data[key],
    };
    transformedOrders.push(loadedOrder);
  }

  return transformedOrders;
}



export async function getUserById(userId) {
  const response = await axios(`${API_URL.order}/${userId}`);
  const data = response.data;
  if (response.Error) {
    throw new Error(data.message || 'Could not fetch orders.');
  }
  const loadedUser = {
    id: userId,
    ...data,
  };
  

  return loadedUser;
}

export async function getOrderDetailsByOrderId(orderId) {
  const response = await axios(`${API_URL.order}/${orderId}`);
  const data = response.data;

  if (response.Error) {
    throw new Error(data.message || 'Could not fetch orders.');
  }

  const loadedOrder = {
    id: orderId,
    ...data,
  };

  return loadedOrder;
}



export async function getOrderHistoryByDetailId(orderDetailId) {
  console.log(`${API_URL.order}/orderHistory/${orderDetailId}`);
   const response = await axios(`${API_URL.order}/orderHistory/${orderDetailId}`);
  const data = response.data;

  if (response.Error) {
    throw new Error(data.message || 'Could not fetch orders.');
  }
  const loadedUser = {
    id: orderDetailId,
    ...data,
  };

  return loadedUser;
}

export async function getOrderDetailsByOrderId(orderId) {
  const response = await axios(`${API_URL.order}/${orderId}`);
  const data = response.data;

  if (response.Error) {
    throw new Error(data.message || "Could not fetch orders.");
  }

  const loadedOrder = {
    id: orderId,
    ...data,
  };

  return loadedOrder;
}


export async function updateOrderStatus(statusData, orderId) {
  console.log(statusData.orderId);
  const response = await fetch(`${API_URL.order}/${statusData.orderId}`, {
    method: 'PUT',
    body: JSON.stringify(statusData.status.text),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not update status.');
  }
  if(response.ok){
    AddAlertMessage({ type: "success", message: "Status updated" });
  }

  /* return { orerId: data.name }; */
  return null;
}

export const PRODUCT_BASE_DOMAIN = "http://localhost:8080/products";
export const CART_BASE_DOMAIN = "http://localhost:8080/carts";
 
export const  CART_URL = "http://localhost:8080/carts";

export const CATEGORY_BASE_DOMAIN = "http://localhost:8080/categories";
export const REVIEW_BASE_DOMAIN = "http://localhost:8080/reviews";

export const HTTPClient = axios.create({
  baseURL: PRODUCT_BASE_DOMAIN,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function getAllProducts() {
  const response = await fetch(`${PRODUCT_BASE_DOMAIN}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Products.");
  }

  const transformedProducts = [];

  for (const key in data) {
    //  console.log(data);
    //console.log(key);
    //console.log(...data[key]);
    const prodObj = {
      id: key,
      ...data[key],
    };

    transformedProducts.push(prodObj);
  }

  return transformedProducts;
}

export async function getAllProductDetailss() {
  const response = await fetch(`${PRODUCT_BASE_DOMAIN}/details`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Products.");
  }

  const transformedProducts = [];

  for (const key in data) {
    //  console.log(data);
    //console.log(key);
    //console.log(...data[key]);
    const prodObj = {
      id: key,
      ...data[key],
    };

    transformedProducts.push(prodObj);
  }

  return transformedProducts;
}

export async function deleteProduct(id) {
  const response = await fetch(`${PRODUCT_BASE_DOMAIN} + ${id}`, {
    method: "DELETE",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Products.");
  }

  const transformedProducts = [];

  for (const key in data) {
    //  console.log(data);
    //console.log(key);
    //console.log(...data[key]);
    const prodObj = {
      id: key,
      ...data[key],
    };

    transformedProducts.push(prodObj);
  }

  return transformedProducts;
}
