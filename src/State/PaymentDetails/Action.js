import axios from "axios";
import {
  FETCH_PAYMENT_DETAILS_REQUEST,
  FETCH_PAYMENT_DETAILS_SUCCESS,
  FETCH_PAYMENT_DETAILS_FAILURE,
  ADD_PAYMENT_DETAILS_REQUEST,
  ADD_PAYMENT_DETAILS_SUCCESS,
  ADD_PAYMENT_DETAILS_FAILURE,
} from "./ActionTypes";
import { API_BASE_URL } from "@/config/api";

// Fetch user's payment details
export const fetchPaymentDetails = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_PAYMENT_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/payment-details`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("Payment Details:", data);
    dispatch({ type: FETCH_PAYMENT_DETAILS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error fetching payment details:", error);
    dispatch({ 
      type: FETCH_PAYMENT_DETAILS_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

// Add/Update payment details
export const addPaymentDetails = (paymentData, jwt) => async (dispatch) => {
  dispatch({ type: ADD_PAYMENT_DETAILS_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/payment-details`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Payment Details Added:", data);
    dispatch({ type: ADD_PAYMENT_DETAILS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error adding payment details:", error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to save payment details";
    dispatch({ 
      type: ADD_PAYMENT_DETAILS_FAILURE, 
      payload: errorMessage 
    });
    throw new Error(errorMessage);
  }
};

