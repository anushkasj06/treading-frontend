import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";  // ✅ named import
import authReducer from "./Auth/Reducer";
import coinReducer from "./Coin/Reducer";
import paymentDetailsReducer from "./PaymentDetails/Reducer";
import walletReducer from "./Wallet/Reducer";
import orderReducer from "./Order/Reducer";
import assetReducer from "./Asset/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  coin: coinReducer,
  paymentDetails: paymentDetailsReducer,
  wallet: walletReducer,
  order: orderReducer,
  asset: assetReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
