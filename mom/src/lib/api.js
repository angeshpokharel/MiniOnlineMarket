import axios from "axios";

const BASE_DOMAIN = 'http://localhost:8080/orders';

export async function getAllOrders() {

  const response = await axios.get(BASE_DOMAIN)
    .catch(err => console.log(err, "Couldnot fetch data"));

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
  const response = await axios.get(`${BASE_DOMAIN}/${userId}/orders`)
    .catch(err => console.log(err));

  const data = response.data;

  if (response.Error) {
    throw new Error(data.message || 'Could not fetch orders.');
  }

  const loadedOrder = {
    id: userId,
    ...data,
  };

  return loadedOrder;
}

export async function getOrderDetailsByOrderId(orderId) {
    const response = await axios(`${BASE_DOMAIN}/${orderId}`)
      .catch(err => console(err));
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
    const response = await fetch(`${BASE_DOMAIN}/${statusData.orderId}`, {
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
 