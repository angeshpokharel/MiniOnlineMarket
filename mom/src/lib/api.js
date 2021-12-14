import axios from "axios";

const BASE_URL = "http://localhost:8080/";

const API_URL = {
  order: BASE_URL + "orders",
  user: BASE_URL + "users",
};

export async function getAllOrders() {
  const response = await axios
    .get(API_URL.order)
    .catch((err) => console.log(err, "Couldnot fetch data"));

  /*  const response = await fetch(`${BASE_DOMAIN}`);*/
  const data = response.data;

  /* if (!response.ok) {
    throw new Error(data.message || 'Could not fetch orders.');
  } */

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getOrderByUserId(userId) {
  const response = await axios.get(`${API_URL.order}/${userId}/orders`);

  const data = response.data;

  if (response.Error) {
    throw new Error(data.message || "Could not fetch orders.");
  }

  const loadedOrder = {
    id: userId,
    ...data,
  };

  return loadedOrder;
}

export async function getUserById(userId) {
  const response = await axios(`${API_URL.order}/${userId}`);
  const data = response.data;
  if (response.Error) {
    throw new Error(data.message || "Could not fetch orders.");
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
    method: "PUT",
    body: JSON.stringify(statusData.status.text),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not update status.");
  }

  /* return { orerId: data.name }; */
  return null;
}

/* return { orerId: data.name }; */
// return null;
// }

/* export async function addQuote(statusData) {
  const response = await fetch(`${BASE_DOMAIN}/quotes.json`, {
    method: 'PUT',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
} */

/* export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments; 
} */

/// For Product

export const PRODUCT_BASE_DOMAIN = "http://localhost:8080/products";
export const CART_BASE_DOMAIN = "http://localhost:8080/carts";
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
