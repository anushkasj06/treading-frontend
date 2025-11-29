import {
  FETCH_PAYMENT_DETAILS_REQUEST,
  FETCH_PAYMENT_DETAILS_SUCCESS,
  FETCH_PAYMENT_DETAILS_FAILURE,
  ADD_PAYMENT_DETAILS_REQUEST,
  ADD_PAYMENT_DETAILS_SUCCESS,
  ADD_PAYMENT_DETAILS_FAILURE,
} from "./ActionTypes";

const initialState = {
  paymentDetails: null,
  loading: false,
  error: null,
};

const paymentDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENT_DETAILS_REQUEST:
    case ADD_PAYMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PAYMENT_DETAILS_SUCCESS:
    case ADD_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        paymentDetails: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_PAYMENT_DETAILS_FAILURE:
    case ADD_PAYMENT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default paymentDetailsReducer;

