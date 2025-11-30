import axios from "axios";
import { 
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, 
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
  LOGOUT
} from "../Auth/ActionTypes";
import { API_BASE_URL } from "@/config/api";


export const register = ({ data, navigate }) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    const user = response.data;
    console.log(user);

    dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
    localStorage.setItem("jwt", user.jwt);

    // ✅ Correct navigation call
    navigate("/");
  } catch (error) {
    console.error("Registration error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Registration failed";
    console.error("Error details:", error.response?.data);
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
  }
};

export const login = (userData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    console.log(user);

    dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
    localStorage.setItem("jwt", user.jwt);

    // ✅ Correct navigation after successful login
    navigate("/");
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Login failed";
    console.error("Error details:", error.response?.data);
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
  }
};


export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const user = response.data;
    console.log(user);
    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};
