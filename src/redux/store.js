import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import { rootReducer } from './root-reducer'

const middleware = [thunk];

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

const persistor = persistStore(store)

export { store, persistor }