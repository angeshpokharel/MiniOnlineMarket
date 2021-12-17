import axios from "axios";
import AddAlertMessage from "../components/alert/Alert";

const BASE_URL = 'http://localhost:8080/';

const API_URL = {
  order: BASE_URL + "orders",
  user: BASE_URL + "users",
};

export async function getAllOrders() {

  const response = await axios.get(API_URL.order)
    .catch(err => console.log(err, "Couldnot fetch data"));

  /*  const response = await fetch(`${BASE_DOMAIN}`);*/
  const data = response.data;

  /* if (!response.ok) {
    throw new Error(data.message || 'Could not fetch orders.');
  } */

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
