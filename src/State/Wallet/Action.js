import axios from "axios";
import {
  FETCH_WALLET_REQUEST,
  FETCH_WALLET_SUCCESS,
  FETCH_WALLET_FAILURE,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  CREATE_PAYMENT_LINK_REQUEST,
  CREATE_PAYMENT_LINK_SUCCESS,
  CREATE_PAYMENT_LINK_FAILURE,
  WALLET_TRANSFER_REQUEST,
  WALLET_TRANSFER_SUCCESS,
  WALLET_TRANSFER_FAILURE,
  WALLET_DEPOSIT_REQUEST,
  WALLET_DEPOSIT_SUCCESS,
  WALLET_DEPOSIT_FAILURE,
} from "./ActionTypes";
import { API_BASE_URL } from "@/config/api";

// Fetch user wallet
export const fetchWallet = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_WALLET_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/wallet`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("Wallet Data:", data);
    dispatch({ type: FETCH_WALLET_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error fetching wallet:", error);
    dispatch({
      type: FETCH_WALLET_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Fetch wallet transactions
export const fetchTransactions = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_TRANSACTIONS_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/transactions`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("Transactions Data:", data);
    dispatch({ type: FETCH_TRANSACTIONS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    dispatch({
      type: FETCH_TRANSACTIONS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Create payment link (Razorpay or Stripe)
export const createPaymentLink = (paymentMethod, amount, jwt) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_LINK_REQUEST });

  try {
    // Ensure payment method is uppercase to match backend enum
    const method = paymentMethod.toUpperCase();
    // Backend expects amount in base currency (not cents/paise)
    // It will multiply by 100 internally for payment gateways
    // Ensure amount is a whole number (Long type in backend)
    const amountValue = Math.round(parseFloat(amount));
    const url = `${API_BASE_URL}/api/payment/${method}/amount/${amountValue}`;
    
    console.log("Creating payment link:", { 
      method, 
      amount: amountValue, 
      originalAmount: amount,
      url,
      jwt: jwt ? "Present" : "Missing"
    });
    
    const { data } = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Payment Link Response:", data);
    dispatch({ type: CREATE_PAYMENT_LINK_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error creating payment link:", error);
    console.error("Error details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url
    });
    
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.response?.data?.errorMessage ||
                        error.message || 
                        "Failed to create payment link";
    dispatch({
      type: CREATE_PAYMENT_LINK_FAILURE,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

// Wallet to wallet transfer
export const walletTransfer = (walletId, amount, purpose, jwt) => async (dispatch) => {
  dispatch({ type: WALLET_TRANSFER_REQUEST });

  try {
    // Backend expects WalletTransaction object with amount and purpose
    const { data } = await axios.put(
      `${API_BASE_URL}/api/wallet/${walletId}/transfer`,
      {
        amount: amount, // Amount in smallest currency unit (cents/paise)
        purpose: purpose,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Transfer Result:", data);
    dispatch({ type: WALLET_TRANSFER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error transferring money:", error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to transfer money";
    dispatch({
      type: WALLET_TRANSFER_FAILURE,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

// Deposit money to wallet (after payment success)
export const walletDeposit = (orderId, paymentId, jwt) => async (dispatch) => {
  dispatch({ type: WALLET_DEPOSIT_REQUEST });

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/wallet/deposit?order_id=${orderId}&payment_id=${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Deposit Result:", data);
    dispatch({ type: WALLET_DEPOSIT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error depositing money:", error);
    dispatch({
      type: WALLET_DEPOSIT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

