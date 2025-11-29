import axios from "axios";
import {
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COINLIST_FAILURE,
  FETCH_COINLIST_REQUEST,
  FETCH_COINLIST_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_TOP_50_COINS_FAILURE,
  FETCH_TOP_50_COINS_REQUEST,
  FETCH_TOP_50_COINS_SUCCESS,
  SEARCH_COIN_FAILURE,
  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS,
} from "./ActionTypes";
import { API_BASE_URL } from "@/config/api";

// ✅ getCoinList
export const getCoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_COINLIST_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/coins?page=${page}`);
    console.log("Coin List Data:", data);

    dispatch({ type: FETCH_COINLIST_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: FETCH_COINLIST_FAILURE, payload: error.message });
  }
};

// ✅ getTop50CoinList
export const getTop50CoinList = () => async (dispatch) => {
  dispatch({ type: FETCH_TOP_50_COINS_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/coins/top50`);
    console.log("Top 50 Coins:", data);

    dispatch({ type: FETCH_TOP_50_COINS_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: FETCH_TOP_50_COINS_FAILURE, payload: error.message });
  }
};

// ✅ fetchMarketChart
export const fetchMarketChart = ({ coinId, days, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_MARKET_CHART_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/coins/${coinId}/chart?days=${days}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("Market Chart:", data);
    dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message });
  }
};

// ✅ fetchCoinById
export const fetchCoinById = (coinId) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_BY_ID_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/coins/${coinId}`);
    console.log("Coin By ID:", data);

    dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message });
  }
};

// ✅ fetchCoinDetails
export const fetchCoinDetails = ({ coinId, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/coins/details/${coinId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("Coin Details:", data);
    dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: error.message });
  }
};

// ✅ searchCoin
export const searchCoin = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_COIN_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/coins/search?q=${keyword}`);
    console.log("Search Coin:", data);

    dispatch({ type: SEARCH_COIN_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: SEARCH_COIN_FAILURE, payload: error.message });
  }
};
