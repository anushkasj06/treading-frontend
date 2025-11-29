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

const initialState = {
  wallet: null,
  transactions: [],
  paymentLink: null,
  loading: false,
  error: null,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WALLET_REQUEST:
    case FETCH_TRANSACTIONS_REQUEST:
    case CREATE_PAYMENT_LINK_REQUEST:
    case WALLET_TRANSFER_REQUEST:
    case WALLET_DEPOSIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_WALLET_SUCCESS:
    case WALLET_TRANSFER_SUCCESS:
    case WALLET_DEPOSIT_SUCCESS:
      return {
        ...state,
        wallet: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_PAYMENT_LINK_SUCCESS:
      return {
        ...state,
        paymentLink: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_WALLET_FAILURE:
    case FETCH_TRANSACTIONS_FAILURE:
    case CREATE_PAYMENT_LINK_FAILURE:
    case WALLET_TRANSFER_FAILURE:
    case WALLET_DEPOSIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default walletReducer;

