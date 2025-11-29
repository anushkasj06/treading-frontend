import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
} from "./ActionTypes";
import { API_BASE_URL } from "@/config/api";

// Create and pay for order in one step (BUY or SELL)
// Backend endpoint: POST /api/orders/pay
export const createOrder = (orderData, jwt) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    // Backend expects: coinId (String), quantity (double), orderType (OrderType enum)
    const requestData = {
      coinId: orderData.coinId,
      quantity: parseFloat(orderData.quantity),
      orderType: orderData.orderType, // BUY or SELL
    };

    console.log("Creating and paying for order:", requestData);

    const { data } = await axios.post(
      `${API_BASE_URL}/api/orders/pay`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Order Created and Paid:", data);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        "Failed to create order";
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

// Pay for order (deduct/add from wallet)
export const payOrder = (orderId, jwt) => async (dispatch) => {
  dispatch({ type: PAY_ORDER_REQUEST });

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/wallet/order/${orderId}/pay`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Order Payment Result:", data);
    dispatch({ type: PAY_ORDER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error paying order:", error);
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        "Failed to pay order";
    dispatch({
      type: PAY_ORDER_FAILURE,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

// Fetch user orders
export const fetchOrders = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Orders:", data);
    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        "Failed to fetch orders";
    dispatch({
      type: FETCH_ORDERS_FAILURE,
      payload: errorMessage,
    });
    throw error;
  }
};

