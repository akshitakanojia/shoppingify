import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

import itemReducer from "./item/item.reducer";
import rightpanelReducer from "./rightpanelstate/rightpanel.reducer";
import cartReducer from './cart/cart.reducer'
import authReducer from "./auth/auth.reducer";


const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token']
}

const cartConfig = {
  key: 'cart',
  storage,
  whitelist: ['name', 'cartItems']
}

export const rootReducer = combineReducers({
  items: itemReducer,
  rightPanel: rightpanelReducer,
  cart: persistReducer(cartConfig, cartReducer),
  auth: persistReducer(authConfig, authReducer)
})
