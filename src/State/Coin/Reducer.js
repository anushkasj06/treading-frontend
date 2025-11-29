// src/State/Coin/CoinReducer.js
import {
  FETCH_COINLIST_FAILURE,
  FETCH_COINLIST_REQUEST,
  FETCH_COINLIST_SUCCESS,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_TOP_50_COINS_REQUEST,
  FETCH_TOP_50_COINS_SUCCESS,
  FETCH_TOP_50_COINS_FAILURE,
  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS,
  SEARCH_COIN_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
} from "./ActionTypes";

const initialState = {
  coinList: [],
  top50: [],
  searchCoinList: [],
  marketChart: { data: [], loading: false },
  coinById: null,
  coinDetails: null,
  loading: false,
  error: null,
};

const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---- Request ----
    case FETCH_COINLIST_REQUEST:
    case FETCH_COIN_BY_ID_REQUEST:
    case FETCH_COIN_DETAILS_REQUEST:
    case FETCH_TOP_50_COINS_REQUEST:
    case SEARCH_COIN_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_MARKET_CHART_REQUEST:
      return { ...state, marketChart: { loading: true, data: [] } };

    // ---- Success ----
    case FETCH_COINLIST_SUCCESS:
      return { ...state, coinList: action.payload, loading: false };

    case FETCH_TOP_50_COINS_SUCCESS:
      return { ...state, top50: action.payload, loading: false };

    case FETCH_MARKET_CHART_SUCCESS:
      return {
        ...state,
        marketChart: { data: action.payload.prices, loading: false },
      };

    case SEARCH_COIN_SUCCESS:
      return {
        ...state,
        searchCoinList: action.payload.coins,
        loading: false,
      };

    case FETCH_COIN_DETAILS_SUCCESS:
      return { ...state, coinDetails: action.payload, loading: false };

    // ---- Failure ----
    case FETCH_MARKET_CHART_FAILURE:
      return { ...state, marketChart: { loading: false, data: [] } };

    case FETCH_COINLIST_FAILURE:
    case SEARCH_COIN_FAILURE:
    case FETCH_COIN_BY_ID_FAILURE:
    case FETCH_COIN_DETAILS_FAILURE:
    case FETCH_TOP_50_COINS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default coinReducer;
