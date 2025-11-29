import axios from "axios";
import {
  FETCH_ASSETS_REQUEST,
  FETCH_ASSETS_SUCCESS,
  FETCH_ASSETS_FAILURE,
  FETCH_ASSET_BY_COIN_REQUEST,
  FETCH_ASSET_BY_COIN_SUCCESS,
  FETCH_ASSET_BY_COIN_FAILURE,
} from "./ActionTypes";
import { API_BASE_URL } from "@/config/api";

// Fetch all user assets
// Backend endpoint: GET /api/asset
export const fetchAssets = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_ASSETS_REQUEST });

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/asset`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Assets:", data);
    dispatch({ type: FETCH_ASSETS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error fetching assets:", error);
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        "Failed to fetch assets";
    dispatch({
      type: FETCH_ASSETS_FAILURE,
      payload: errorMessage,
    });
    throw error;
  }
};

// Fetch asset by coin ID
// Backend endpoint: GET /api/asset/coin/{coinId}/user
export const fetchAssetByCoinId = (coinId, jwt) => async (dispatch) => {
  dispatch({ type: FETCH_ASSET_BY_COIN_REQUEST });

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/asset/coin/${coinId}/user`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Asset by coin:", data);
    dispatch({ type: FETCH_ASSET_BY_COIN_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error fetching asset by coin:", error);
    // If asset not found (404), return null instead of error
    if (error.response?.status === 404) {
      dispatch({ type: FETCH_ASSET_BY_COIN_SUCCESS, payload: null });
      return null;
    }
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        "Failed to fetch asset";
    dispatch({
      type: FETCH_ASSET_BY_COIN_FAILURE,
      payload: errorMessage,
    });
    throw error;
  }
};

