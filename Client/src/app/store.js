import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";
import userSlice from "../features/userSlice";
import appApi from "../services/appApi";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage"
import thunk from "redux-thunk"
const reducer = combineReducers({
  user: userSlice,
  products: productSlice,
  [appApi.reducerPath]: appApi.reducer,
});
const persistConfig = {
  key: "root",
  storage,
  blackList: [appApi.reducerPath, "products"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware:[thunk,appApi.middleware]
});

export default store
