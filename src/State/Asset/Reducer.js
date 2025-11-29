import {
  FETCH_ASSETS_REQUEST,
  FETCH_ASSETS_SUCCESS,
  FETCH_ASSETS_FAILURE,
  FETCH_ASSET_BY_COIN_REQUEST,
  FETCH_ASSET_BY_COIN_SUCCESS,
  FETCH_ASSET_BY_COIN_FAILURE,
} from "./ActionTypes";

const initialState = {
  assets: [],
  assetByCoin: null,
  loading: false,
  error: null,
};

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSETS_REQUEST:
    case FETCH_ASSET_BY_COIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ASSETS_SUCCESS:
      return {
        ...state,
        assets: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_ASSET_BY_COIN_SUCCESS:
      return {
        ...state,
        assetByCoin: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_ASSETS_FAILURE:
    case FETCH_ASSET_BY_COIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default assetReducer;

