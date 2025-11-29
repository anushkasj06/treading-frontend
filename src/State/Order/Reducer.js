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

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case PAY_ORDER_REQUEST:
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: action.payload,
        loading: false,
        error: null,
      };

    case PAY_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: null, // Clear after payment
        loading: false,
        error: null,
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_ORDER_FAILURE:
    case PAY_ORDER_FAILURE:
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;

